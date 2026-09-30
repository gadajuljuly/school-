# ITASK native iOS wrapper

This mirrors `android-app/` but for iPhone: it wraps the exact same live
site (`https://gadajuljuly.github.io/school-/tasks.html`, unchanged) in a
Capacitor shell, to get native contacts access, native sharing, and push
notifications on iOS the same way the Android wrapper does.

Nothing here touches the site's own files (`tasks.html`, `tasks-sw.js`,
etc.) or the unrelated survey app at the repo root - this folder only
contains the native wrapper project config. A rebuild here is only needed
when this wrapper project itself changes (a new native plugin); an
ordinary website update is picked up automatically since the app just
loads the live URL.

**Everything below requires a Mac with Xcode installed** (Xcode only runs
on macOS - there's no Windows equivalent, unlike Android Studio). Building
for a real iPhone (not just the Simulator) and submitting to the App Store
also requires an **Apple Developer Program** membership (\$99/year,
enrolled at developer.apple.com with an Apple ID).

## One-time setup (run these once, on the Mac)

```
cd ios-app
npm install
npx cap add ios
npx cap sync ios
npx cap open ios
```

The last command opens the generated `ios-app/ios/App/App.xcworkspace` in
Xcode (open the `.xcworkspace`, not the `.xcodeproj` - Capacitor uses
CocoaPods, which needs the workspace).

In Xcode, under the project's **Signing & Capabilities** tab, pick your
Apple Developer **Team** and let Xcode manage signing automatically -
this is the iOS equivalent of Android's signing keystore step.

## Contacts permission

Unlike Android, iOS doesn't need a manifest permission list - instead,
`@capacitor-community/contacts`'s `pickContact()` requires a usage-
description string in `Info.plist`, or the picker throws immediately
without ever prompting the user. In Xcode, open `Info.plist` (or the
**Info** tab of the App target) and add:

- Key: `Privacy - Contacts Usage Description`
  (raw key name: `NSContactsUsageDescription`)
- Value: a short sentence explaining why, e.g. "ITASK uses your contacts
  to let you invite people to a shared project."

iOS then shows its own native permission dialog the first time the picker
is used - no website-side change needed for that part (same as Android).

## Push notifications (Firebase, one-time setup)

Same `@capacitor-firebase/messaging` plugin as Android, added to the SAME
Firebase project already used for phone-number login and Android push:

1. **Register the iOS app in Firebase**: Firebase Console → Project
   settings → **Add app → iOS**. Bundle ID must be exactly
   `com.gadajuljuly.itask` (same as Android's package name, and the same
   as `appId` in `ios-app/capacitor.config.json`). Download the
   `GoogleService-Info.plist` file it generates.
2. In Xcode, drag that file into the `App` folder inside the `App` target
   (check "Copy items if needed" and make sure the `App` target is
   checked) - it needs to sit next to `Info.plist`, not just anywhere in
   the project.
3. **Get an APNs key for Firebase**: Apple Developer site → **Certificates,
   Identifiers & Profiles → Keys → +** → check "Apple Push Notifications
   service (APNs)" → create. Download the resulting `.p8` file - it can
   only be downloaded once, so save it somewhere safe.
4. In Firebase Console → Project settings → **Cloud Messaging** tab →
   under "Apple app configuration" → **Upload** that `.p8` key, along with
   your Apple **Team ID** (found on developer.apple.com → Membership) and
   the **Key ID** (shown next to the key on the Keys page).
5. In Xcode, under **Signing & Capabilities**, click **+ Capability** and
   add both **Push Notifications** and **Background Modes** (then check
   "Remote notifications" under Background Modes).
6. Push notifications only work on a **real iPhone**, never the Simulator
   - Apple's push service has no simulator support.
7. The Supabase-side secrets (`FCM_PROJECT_ID`, `FCM_CLIENT_EMAIL`,
   `FCM_PRIVATE_KEY`) and the `fcm_push_column.sql` migration are already
   shared with Android - nothing to redo there, the same Firebase Cloud
   Messaging backend serves both platforms' tokens.

## Sharing PDFs/files

`@capacitor/filesystem` + `@capacitor/share` work on iOS with no extra
native setup beyond `npm install` + `npx cap sync ios` - the website code
already detects and uses them automatically (`capacitorShareAvailable` in
`tasks.html`, shared with Android).

## App icons and launch screen

Unlike Android's many manually-exported icon densities, Capacitor's
`@capacitor/assets` tool generates the entire iOS icon set and launch
screen from a single 1024×1024 source image in one command:

```
npx capacitor-assets generate --ios
```

`ios-app/assets/icon.png` already has a 1024×1024, no-transparency version
of the existing ITASK icon (upscaled from the 512×512 source used for
Android, since no larger original was available) - good enough to get
started, but swap it for a genuinely high-resolution 1024×1024 source if
one exists, for a crisper App Store icon. Then run the command above
before opening Xcode.

## Status bar / safe areas

iOS (unlike Android 15+) doesn't force edge-to-edge rendering, so no
equivalent of `@capawesome/capacitor-android-edge-to-edge-support` is
needed here - `capacitor.config.json` already sets `contentInset: always`
so the web content isn't drawn under the status bar/notch by default.
If the status bar area looks wrong once actually running on a device,
add `@capacitor/status-bar` and set its style/color to match
`#35618f` (same as Android and the web `theme-color` meta tag).

## Building and publishing (each time you want to release/update)

1. In Xcode: **Product → Archive** (only works with a real device or
   "Any iOS Device" selected as the build target, not the Simulator).
2. When the Organizer window opens after archiving, click **Distribute
   App → App Store Connect → Upload**.
3. In **App Store Connect** (appstoreconnect.apple.com), create the app
   record once (bundle ID `com.gadajuljuly.itask`, same as Android's
   `com.gadajuljuly.itask` conceptually, but iOS and Android are
   completely separate app store listings - nothing carries over
   automatically).
4. Fill in the store listing (name, description, screenshots per device
   size, pricing = Free, age rating, and the "App Privacy" data-collection
   questionnaire - this is Apple's equivalent of Google Play's Data Safety
   form, and can reuse the same answers already worked out there).
5. Optional but recommended: use **TestFlight** first (same build, no
   extra upload) to test on a real device before public release - unlike
   Google Play, Apple has no mandatory multi-tester/14-day waiting period
   for a new developer account.
6. Submit for review - Apple's review is typically 24-48 hours, much
   faster than Google Play's process.
