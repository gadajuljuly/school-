@echo off
rem Run before every Android build (double-click, or run from any folder).
rem Pulls the latest code and copies the native sources in android-app\native-src
rem into the local android\ project, which isn't in git.
setlocal
cd /d "%~dp0"

echo === git pull ===
git -C .. pull || goto :error

echo === npm install ===
call npm install || goto :error

echo === npx cap sync android ===
call npx cap sync android || goto :error

echo === copying native sources ===
copy /Y native-src\*.java android\app\src\main\java\com\gadajuljuly\itask\ || goto :error
xcopy /E /Y /I native-src\res android\app\src\main\res || goto :error
rem Gemini Nano plugin - only once enable-gemini-nano.bat has added it
if exist android\app\src\main\java\com\gadajuljuly\itask\ItaskAIPlugin.kt copy /Y native-src-ai\*.kt android\app\src\main\java\com\gadajuljuly\itask\ || goto :error
echo === assistant widget in AndroidManifest.xml (added once) ===
rem the ITASK assistant home-screen bar (version 23): its receiver goes in just before the closing application tag
powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='android\app\src\main\AndroidManifest.xml'; $x=[IO.File]::ReadAllText($f); if ($x -notmatch 'ItaskAssistantWidget') { $r=[IO.File]::ReadAllText('native-src\manifest-assistant-widget.xml'); $i=$x.LastIndexOf('</application>'); $x=$x.Substring(0,$i)+$r+$x.Substring($i); [IO.File]::WriteAllText($f,$x); Write-Host 'added' } else { Write-Host 'already there' }" || goto :error
echo === floating task in AndroidManifest.xml (added once) ===
rem the floating task (version 25): its receiver, and the display-over-other-apps permission
powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='android\app\src\main\AndroidManifest.xml'; $x=[IO.File]::ReadAllText($f); if ($x -notmatch 'ItaskFloatReceiver') { $r=[IO.File]::ReadAllText('native-src\manifest-float.xml'); $i=$x.LastIndexOf('</application>'); $x=$x.Substring(0,$i)+$r+$x.Substring($i); Write-Host 'receiver added' } if ($x -notmatch 'SYSTEM_ALERT_WINDOW') { $i=$x.IndexOf('<application'); $p=[IO.File]::ReadAllText('native-src\manifest-float-permission.xml'); $x=$x.Substring(0,$i)+$p+$x.Substring($i); Write-Host 'permission added' } [IO.File]::WriteAllText($f,$x)" || goto :error

echo === assistant bubble in AndroidManifest.xml (added once) ===
rem the assistant's floating bubble (version 29): its foreground service, and the special-use foreground permission
powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='android\app\src\main\AndroidManifest.xml'; $x=[IO.File]::ReadAllText($f); if ($x -notmatch 'ItaskBubbleService') { $r=[IO.File]::ReadAllText('native-src\manifest-bubble.xml'); $i=$x.LastIndexOf('</application>'); $x=$x.Substring(0,$i)+$r+$x.Substring($i); Write-Host 'service added' } if ($x -notmatch 'FOREGROUND_SERVICE_SPECIAL_USE') { $i=$x.IndexOf('<application'); $p=[IO.File]::ReadAllText('native-src\manifest-bubble-permission.xml'); $x=$x.Substring(0,$i)+$p+$x.Substring($i); Write-Host 'permission added' } [IO.File]::WriteAllText($f,$x)" || goto :error

echo === share to ITASK in AndroidManifest.xml (added once) ===
rem ITASK in Android's share sheet for text (a WhatsApp message): an intent-filter inside MainActivity
powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='android\app\src\main\AndroidManifest.xml'; $x=[IO.File]::ReadAllText($f); if ($x -notmatch 'android.intent.action.SEND') { $a=$x.IndexOf('.MainActivity'); $e=$x.IndexOf('</activity>', $a); $r=[IO.File]::ReadAllText('native-src\manifest-share.xml'); $x=$x.Substring(0,$e)+$r+$x.Substring($e); [IO.File]::WriteAllText($f,$x); Write-Host 'share added' } else { Write-Host 'already there' }" || goto :error
rem ...and files: photos, PDFs, documents (version 31+)
powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='android\app\src\main\AndroidManifest.xml'; $x=[IO.File]::ReadAllText($f); if ($x -notmatch 'android.intent.action.SEND_MULTIPLE') { $a=$x.IndexOf('.MainActivity'); $e=$x.IndexOf('</activity>', $a); $r=[IO.File]::ReadAllText('native-src\manifest-share-files.xml'); $x=$x.Substring(0,$e)+$r+$x.Substring($e); [IO.File]::WriteAllText($f,$x); Write-Host 'share files added' } else { Write-Host 'already there' }" || goto :error

echo === camera tape (ARCore) in AndroidManifest.xml and build.gradle (added once) ===
rem the camera tape (version 33): its activity, ARCore as optional, the camera permission
powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='android\app\src\main\AndroidManifest.xml'; $x=[IO.File]::ReadAllText($f); if ($x -notmatch 'ItaskMeasureActivity') { $r=[IO.File]::ReadAllText('native-src\manifest-ar.xml'); $i=$x.LastIndexOf('</application>'); $x=$x.Substring(0,$i)+$r+$x.Substring($i); Write-Host 'activity added' } if ($x -notmatch 'android.hardware.camera.ar') { $i=$x.IndexOf('<application'); $p=[IO.File]::ReadAllText('native-src\manifest-ar-permission.xml'); $x=$x.Substring(0,$i)+$p+$x.Substring($i); Write-Host 'permission added' } [IO.File]::WriteAllText($f,$x)" || goto :error
rem ...ARCore itself, and Android 7+ (ARCore needs it)
powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='android\app\build.gradle'; $x=[IO.File]::ReadAllText($f); if ($x -notmatch 'com.google.ar:core') { $i=$x.IndexOf('dependencies {'); $x=$x.Substring(0,$i+14)+[Environment]::NewLine+'    implementation \"com.google.ar:core:1.46.0\"'+$x.Substring($i+14); [IO.File]::WriteAllText($f,$x); Write-Host 'ARCore added' } else { Write-Host 'already there' }" || goto :error
powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='android\variables.gradle'; $x=[IO.File]::ReadAllText($f); $y=[regex]::Replace($x,'minSdkVersion\s*=\s*2[0-3]\b','minSdkVersion = 24'); if ($y -ne $x) { [IO.File]::WriteAllText($f,$y); Write-Host 'minSdk 24' } else { Write-Host 'minSdk ok' }" || goto :error

echo.
echo Done. Now in Android Studio: raise versionCode/versionName in build.gradle (:app), Sync, then Build ^> Generate Signed App Bundle.
pause
exit /b 0

:error
echo.
echo *** Something failed above - send a screenshot. ***
pause
exit /b 1
