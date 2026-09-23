// Deploy with: supabase functions deploy mint-session-token --no-verify-jwt
// Required secret (in addition to the ones already used by the other
// functions): SUPABASE_JWT_SECRET (the project's own "JWT Secret" from
// Project Settings -> API -> JWT Settings - NOT the service role key, and
// NOT provided automatically like SUPABASE_URL is).
//
// Called directly by the client right after Firebase phone auth succeeds.
// The app has no real Supabase Auth session (it authenticates via Firebase
// phone auth instead), so Postgres RLS policies that rely on auth.uid()
// would otherwise never match any request - which is exactly why RLS had
// to stay disabled on every table until now, leaving them readable/writable
// by anyone holding the public anon key. This function closes that gap
// without touching any table's business logic: it verifies the caller
// really does hold a Firebase-issued phone credential, then mints a short
// separate JWT - signed with this Supabase project's own JWT secret - whose
// `sub` claim is the same phoneToUuid(phone) the app already uses as every
// private row's id. The client swaps its Supabase client's Authorization
// header to this token, and everyday RLS policies (auth.uid() = ...) then
// work exactly as the built-in auth system was designed for.

import * as jose from "npm:jose@5";

// Same value as FIREBASE_CONFIG.projectId in tasks.html - not a secret
// (it's already public in the client bundle), so it's hardcoded here
// rather than requiring one more secret to configure.
const FIREBASE_PROJECT_ID = "itask-93f4f";
const SUPABASE_JWT_SECRET = Deno.env.get("SUPABASE_JWT_SECRET")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Same derivation as phoneToUuid() in tasks.html - must stay in sync.
async function phoneToUuid(phone: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("itask-phone:" + phone));
  const bytes = Array.from(new Uint8Array(digest)).slice(0, 16);
  const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-4" + hex.slice(13, 16) + "-a" + hex.slice(17, 20) + "-" + hex.slice(20, 32);
}

const FIREBASE_ISSUER = "https://securetoken.google.com/" + FIREBASE_PROJECT_ID;
const firebaseJWKS = jose.createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"),
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let body: { idToken?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "invalid json body" }, 400);
  }

  if (!body.idToken) {
    return jsonResponse({ error: "missing idToken" }, 400);
  }

  let payload: jose.JWTPayload;
  try {
    const verified = await jose.jwtVerify(body.idToken, firebaseJWKS, {
      issuer: FIREBASE_ISSUER,
      audience: FIREBASE_PROJECT_ID,
    });
    payload = verified.payload;
  } catch (err) {
    return jsonResponse({ error: "invalid Firebase ID token: " + (err as Error).message }, 401);
  }

  const phoneNumber = payload.phone_number as string | undefined;
  const signInProvider = (payload.firebase as { sign_in_provider?: string } | undefined)?.sign_in_provider;
  if (!phoneNumber || signInProvider !== "phone") {
    return jsonResponse({ error: "token is not a verified phone credential" }, 401);
  }

  const userId = await phoneToUuid(phoneNumber);
  const secret = new TextEncoder().encode(SUPABASE_JWT_SECRET);
  const now = Math.floor(Date.now() / 1000);

  const token = await new jose.SignJWT({
    role: "authenticated",
    phone_number: phoneNumber,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(userId)
    .setIssuedAt(now)
    .setExpirationTime(now + 30 * 24 * 60 * 60) // 30 days - re-minted on every app open anyway
    .sign(secret);

  return jsonResponse({ token, userId });
});
