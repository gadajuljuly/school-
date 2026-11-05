/* Server settings (Supabase). Leave empty to keep everything on this device only.
 * Both values are in Supabase: Project Settings → API ("Project URL" and the "anon public" key).
 * The anon key is meant to be public; access to the data is enforced by the rules in supabase/schema.sql. */
window.TALA_CONFIG = {
  supabaseUrl: 'https://tecmncvrojzhuxmzsfrv.supabase.co',
  // Name of the Edge Function of the ✨ writing helper (supabase/functions/tala-ai).
  aiFunction: 'bright-service',
  supabaseAnonKey: 'sb_publishable_U3BiJ4BxccEfDD2hcr9lOQ_wcxq9rDs',
};
