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

echo.
echo Done. Now in Android Studio: raise versionCode/versionName in build.gradle (:app), Sync, then Build ^> Generate Signed App Bundle.
pause
exit /b 0

:error
echo.
echo *** Something failed above - send a screenshot. ***
pause
exit /b 1
