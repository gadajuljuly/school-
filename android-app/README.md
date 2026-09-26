# ITASK native Android wrapper

This is a **separate** Android build from the Play Store TWA already
published (via PWABuilder). It wraps the exact same live site
(`https://gadajuljuly.github.io/school-/tasks.html`, unchanged) in a
Capacitor shell instead of a bare TWA, purely to get real native contact
access — the web Contact Picker API the site otherwise uses is unavailable
inside a TWA (no browser chrome to show its permission prompt).

Nothing here touches the site's own files (`tasks.html`, `tasks-sw.js`,
etc.) or the unrelated survey app at the repo root — this folder only
contains the native wrapper project, and `capacitor.config.json` points it
at the already-deployed live URL. Ship a fix to the site as usual; this
wrapper will pick it up automatically since it just loads that URL, no
rebuild needed for ordinary app changes. A rebuild here is only needed if
this wrapper project itself changes (e.g. a new native plugin).

## One-time setup (run these once)

```
cd android-app
npm install
npx cap add android
npx cap sync android
npx cap open android
```

The last command opens the generated `android-app/android` folder in
Android Studio.

## Building a signed release (each time you want to publish an update)

In Android Studio: **Build → Generate Signed Bundle / APK → Android App
Bundle**, then on the signing step choose **"choose existing..."** and
point it at the SAME `signing.keystore` file downloaded earlier from
PWABuilder (same package name `com.gadajuljuly.itask`, same key — this
makes Play Console treat it as a new version of the SAME already-published
app, not a new one, and keeps `assetlinks.json`'s fingerprint valid with no
changes needed there).

Upload the resulting `.aab` as a new release in Play Console, under the
same Internal testing track already set up.

## Contacts permission

`@capacitor-community/contacts`'s native contact picker (`pickContact()`)
uses Android's own system contact-picker intent, which - like a native
app - does not need `READ_CONTACTS` declared for picking a single contact
this way. If a future version of the plugin does request it, Android will
show its own native permission dialog the first time it's used; no
website-side change is needed for that.

## Push notifications (one-time Firebase setup)

The Android WebView this app runs in has no Web Push API support at all, so
reminders/chat notifications use `@capacitor/push-notifications` (Firebase
Cloud Messaging) here instead - the website code already detects this and
switches channels automatically (see `capacitorPushAvailable` in
`tasks.html`). This needs a one-time setup in the SAME Firebase project
already used for phone-number login:

1. **Register the Android app in Firebase**: Firebase Console → Project
   settings (gear icon) → your existing project → **Add app → Android**.
   Package name must be exactly `com.gadajuljuly.itask` (same as
   `applicationId` in `android-app/android/app/build.gradle`). Download the
   `google-services.json` file it generates.
2. Place that file at `android-app/android/app/google-services.json` (next
   to `build.gradle (:app)`).
3. **Generate a service account key** for the server side: Firebase Console
   → Project settings → **Service accounts** tab → **Generate new private
   key**. This downloads a second JSON file - keep it private, it's not
   committed anywhere in this repo.
4. From that service account JSON, set three Supabase secrets (Supabase
   Dashboard → Edge Functions → Manage secrets, or `supabase secrets set`):
   - `FCM_PROJECT_ID` = the `project_id` field
   - `FCM_CLIENT_EMAIL` = the `client_email` field
   - `FCM_PRIVATE_KEY` = the `private_key` field (paste it exactly as-is,
     `\n` escapes included)
5. Run `supabase/sql/fcm_push_column.sql` once in the Supabase SQL Editor
   (adds the `fcm_token` column `push_subscriptions` needs alongside the
   existing Web Push columns).
6. Redeploy the three notification functions so they pick up the FCM
   sending code: `supabase functions deploy send-reminders`,
   `send-chat-notification --no-verify-jwt`, and
   `send-project-invite-notification --no-verify-jwt`.
7. `npm install` (picks up the new `@capacitor/push-notifications`
   dependency), then `npx cap sync android`, then rebuild and publish a new
   signed release as above.

Notification tap-through (opening the right task/chat/invite from a
notification while the app was closed) is already wired up in `tasks.html`
via a `pushNotificationActionPerformed` listener, matching what the service
worker does for the browser/TWA build.
