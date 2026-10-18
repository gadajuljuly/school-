@echo off
rem One-time, after prepare-android.bat: adds Gemini Nano (on-device AI for
rem voice commands) to the local android\ project. See README "Voice commands".
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0enable-gemini-nano.ps1" || goto :error
echo.
echo Done. Now in Android Studio: File ^> Sync Project with Gradle Files, raise versionCode/versionName, then Build ^> Generate Signed App Bundle.
pause
exit /b 0

:error
echo.
echo *** Something failed above - send a screenshot. ***
pause
exit /b 1
