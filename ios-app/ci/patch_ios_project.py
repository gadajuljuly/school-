#!/usr/bin/env python3
"""Adjusts the generated Capacitor iOS project (ios-app/ios, recreated on
every CI build by `npx cap add ios`) for ITASK:

- Info.plist: the usage descriptions iOS requires before the app may touch
  contacts, the camera, photos, the microphone or speech recognition (the
  site uses them all - contact picker, report/diary photos, voice
  messages, voice commands; without them iOS
  kills the app the moment it asks), Hebrew as the development region, and
  ITSAppUsesNonExemptEncryption=false (no export-compliance prompt per
  build).
- With push (a GoogleService-Info.plist was provided): copies it in, adds
  the aps-environment entitlement, the remote-notification background
  mode, and the AppDelegate hooks @capacitor-firebase/messaging needs
  (FirebaseApp.configure + forwarding the APNs token).

Usage: patch_ios_project.py <ios-app dir> [--push]
"""
import plistlib
import sys
from pathlib import Path

root = Path(sys.argv[1]).resolve()
push = "--push" in sys.argv[2:]
app_dir = root / "ios" / "App" / "App"
info_path = app_dir / "Info.plist"

with open(info_path, "rb") as f:
    info = plistlib.load(f)

info.update({
    "CFBundleDisplayName": "ITASK",
    "CFBundleDevelopmentRegion": "he",
    "ITSAppUsesNonExemptEncryption": False,
    "NSContactsUsageDescription": "ITASK משתמשת באנשי הקשר כדי לבחור משתתפים לפרויקט ולהציג את שמותיהם בצ'אט.",
    "NSCameraUsageDescription": "ITASK משתמשת במצלמה לצילום תמונות לדוחות וליומן העבודה.",
    "NSPhotoLibraryUsageDescription": "ITASK משתמשת בתמונות כדי לצרף אותן לדוחות, ליומן ולצ'אט.",
    "NSPhotoLibraryAddUsageDescription": "ITASK שומרת קבצים ותמונות שבחרת לשמור.",
    "NSMicrophoneUsageDescription": "ITASK משתמשת במיקרופון להקלטת הודעות קוליות בצ'אט ולפקודות קוליות.",
    "NSSpeechRecognitionUsageDescription": "ITASK הופכת פקודות קוליות לטקסט כדי להוסיף משימות ותזכורות.",
})

if push:
    modes = info.get("UIBackgroundModes", [])
    if "remote-notification" not in modes:
        modes.append("remote-notification")
    info["UIBackgroundModes"] = modes

with open(info_path, "wb") as f:
    plistlib.dump(info, f)

entitlements = {"aps-environment": "production"} if push else {}
with open(app_dir / "App.entitlements", "wb") as f:
    plistlib.dump(entitlements, f)

if push:
    delegate_path = app_dir / "AppDelegate.swift"
    src = delegate_path.read_text()
    if "FirebaseCore" not in src:
        src = src.replace("import Capacitor", "import Capacitor\nimport FirebaseCore", 1)
        marker = "didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {"
        if marker not in src:
            sys.exit("AppDelegate.swift: didFinishLaunching not found - Capacitor template changed")
        src = src.replace(marker, marker + "\n        FirebaseApp.configure()", 1)
        hooks = '''
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
    }
'''
        last = src.rstrip().rfind("}")
        src = src[:last] + hooks + "}\n"
        delegate_path.write_text(src)

print("patched", info_path, "(push)" if push else "(no push)")
