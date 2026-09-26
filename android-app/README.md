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
