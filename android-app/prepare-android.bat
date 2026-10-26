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

echo.
echo Done. Now in Android Studio: raise versionCode/versionName in build.gradle (:app), Sync, then Build ^> Generate Signed App Bundle.
pause
exit /b 0

:error
echo.
echo *** Something failed above - send a screenshot. ***
pause
exit /b 1
