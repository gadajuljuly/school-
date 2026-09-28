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
does need `READ_CONTACTS` and `WRITE_CONTACTS` declared in
`AndroidManifest.xml` - without them, `pickContact()` rejects immediately
with "Missing the following permissions..." (confirmed at runtime; an
earlier version of this doc assumed the system picker intent didn't need
them, which turned out to be wrong). Add both as `<uses-permission>`
elements directly under the opening `<manifest ...>` tag, before
`<application>`:
```xml
<uses-permission android:name="android.permission.READ_CONTACTS" />
<uses-permission android:name="android.permission.WRITE_CONTACTS" />
```
Android still shows its own native runtime permission dialog the first
time the picker is used; no website-side change is needed for that part.

## Push notifications (one-time Firebase setup)

The Android WebView this app runs in has no Web Push API support at all, so
reminders/chat notifications use `@capacitor-firebase/messaging` (Firebase
Cloud Messaging) here instead - the website code already detects this and
switches channels automatically (see `capacitorPushAvailable` in
`tasks.html`). Not `@capacitor/push-notifications`: that plugin's
`register()` call is a documented, widely-reported source of silent hangs
on Android (its `registration`/`registrationError` events sometimes never
fire at all, with no native error) - reproduced here even with a correctly
configured Firebase project, verified `google-services.json`, and the
required Cloud APIs enabled. `@capacitor-firebase/messaging`'s `getToken()`
is a real Promise instead of an unreliable one-shot event pair. This needs
a one-time setup in the SAME Firebase project already used for phone-number
login:

1. **Register the Android app in Firebase**: Firebase Console → Project
   settings (gear icon) → your existing project → **Add app → Android**.
   Package name must be exactly `com.gadajuljuly.itask` (same as
   `applicationId` in `android-app/android/app/build.gradle`). Download the
   `google-services.json` file it generates.
2. Place that file at `android-app/android/app/google-services.json` (next
   to `build.gradle (:app)`).
3. **Apply the Google Services Gradle plugin** - this is the step that's
   easy to miss (`npx cap sync` does NOT add it automatically, even though
   it does add the project-level classpath for it): open `build.gradle
   (:app)` and add this as the very last line of the file:
   ```
   apply plugin: 'com.google.gms.google-services'
   ```
   Without this line, Firebase never actually initializes and
   `FirebaseMessaging` silently doesn't show up in
   `window.Capacitor.Plugins` at all - `npm install`/`npx cap sync` still
   report the plugin found, and the build still succeeds, so nothing
   about this failure is visible until you check that at runtime.
5. **Generate a service account key** for the server side: Firebase Console
   → Project settings → **Service accounts** tab → **Generate new private
   key**. This downloads a second JSON file - keep it private, it's not
   committed anywhere in this repo.
6. From that service account JSON, set three Supabase secrets (Supabase
   Dashboard → Edge Functions → Manage secrets, or `supabase secrets set`):
   - `FCM_PROJECT_ID` = the `project_id` field
   - `FCM_CLIENT_EMAIL` = the `client_email` field
   - `FCM_PRIVATE_KEY` = the `private_key` field (paste it exactly as-is,
     `\n` escapes included)
7. Run `supabase/sql/fcm_push_column.sql` once in the Supabase SQL Editor
   (adds the `fcm_token` column `push_subscriptions` needs alongside the
   existing Web Push columns).
8. Redeploy the three notification functions so they pick up the FCM
   sending code: `supabase functions deploy send-reminders`,
   `send-chat-notification --no-verify-jwt`, and
   `send-project-invite-notification --no-verify-jwt`.
9. `npm install` (picks up the `@capacitor-firebase/messaging` dependency),
   then `npx cap sync android`, then rebuild and publish a new signed
   release as above.

Notification tap-through (opening the right task/chat/invite from a
notification while the app was closed) is already wired up in `tasks.html`
via a `notificationActionPerformed` listener, matching what the service
worker does for the browser/TWA build.

## Status bar / navigation bar color

Android 15+ enforces edge-to-edge display and ignores the classic
`android:statusBarColor`/`android:navigationBarColor` theme attributes and
`Window.setStatusBarColor()`/`setNavigationBarColor()` calls entirely, even
with `android:windowOptOutEdgeToEdgeEnforcement="true"` set (tried first;
didn't work) - this isn't a bug in this project, it's a real platform
change with no way to opt back into the old behavior. The fix is
`@capawesome/capacitor-android-edge-to-edge-support`, configured in
`capacitor.config.json` under `plugins.EdgeToEdge` (`backgroundColor`,
`statusBarColor`, `navigationBarColor`, currently all `#35618f` to match
`tasks.html`'s `theme-color` meta tag). No native code needed -
`MainActivity.java` stays the default `BridgeActivity` subclass with no
overrides. After changing the color here, `npm install` + `npx cap sync
android` + rebuild.

## Sharing PDFs/files (reports, site logs, library files)

The Android System WebView this app runs in doesn't implement
`navigator.share()` at all - every share button (reports, site logs, library
file long-press) silently fell back to just saving the file locally with a
"share isn't available here" toast, since that's `tasks.html`'s own web
fallback for a browser with no Web Share API. Two native plugins fix this
here - `@capacitor/filesystem` (writes the generated blob to a real file the
OS can hand off) and `@capacitor/share` (hands that file to Android's native
share sheet) - the website code already detects them and switches to that
path automatically (see `capacitorShareAvailable` in `tasks.html`). This is a
**new native plugin**, so it needs `npm install` (picks up both packages),
then `npx cap sync android`, then rebuild and reinstall - a plain website
update alone won't add this.
