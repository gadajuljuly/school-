# One-time: adds the on-device model plugin (native-src-ai\ItaskAIPlugin.kt,
# Gemini Nano through Android AICore) to the local android\ project.
# Run enable-gemini-nano.bat AFTER prepare-android.bat. Safe to run twice.
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$android = Join-Path $root 'android'
$pkgDir = Join-Path $android 'app\src\main\java\com\gadajuljuly\itask'
$utf8 = New-Object System.Text.UTF8Encoding $false

function Edit-File([string]$path, [scriptblock]$change) {
    $text = [System.IO.File]::ReadAllText($path)
    $new = & $change $text
    if ($new -ne $text) {
        [System.IO.File]::WriteAllText($path, $new, $utf8)
        Write-Host "updated   $path"
    } else {
        Write-Host "unchanged $path"
    }
}

# 1) the Kotlin compiler (the plugin is Kotlin; the rest of the app is Java)
Edit-File (Join-Path $android 'build.gradle') {
    param($t)
    if ($t -match 'kotlin-gradle-plugin') { return $t }
    $out = ([regex]"(classpath\s+['""]com\.android\.tools\.build:gradle:[^'""]+['""])").Replace($t,
        "`$1`r`n        classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:2.3.0'", 1)
    if ($out -eq $t) { throw "android\build.gradle: Android Gradle plugin classpath line not found" }
    return $out
}

# 2) app: Kotlin plugin, Java 21 target, ML Kit GenAI Prompt API
Edit-File (Join-Path $android 'app\build.gradle') {
    param($t)
    if ($t -match 'genai-prompt') { return $t }
    $out = ([regex]"(apply plugin:\s*['""]com\.android\.application['""])").Replace($t,
        "`$1`r`napply plugin: 'kotlin-android'", 1)
    $out = ([regex]"(?m)^android\s*\{").Replace($out,
        "android {`r`n    kotlinOptions { jvmTarget = '21' }", 1)
    $out = ([regex]"(?m)^dependencies\s*\{").Replace($out,
        "dependencies {`r`n    implementation 'com.google.mlkit:genai-prompt:1.0.0-beta4'`r`n    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.10.2'", 1)
    if ($out -notmatch 'kotlin-android' -or $out -notmatch 'jvmTarget' -or $out -notmatch 'genai-prompt') {
        throw "app\build.gradle: couldn't find where to add the Kotlin / ML Kit lines"
    }
    return $out
}

# 3) ML Kit GenAI needs Android 12+, the app supports older phones: allow
#    the library anyway (the plugin checks the Android version itself)
Edit-File (Join-Path $android 'app\src\main\AndroidManifest.xml') {
    param($t)
    if ($t -match 'overrideLibrary') { return $t }
    $out = $t
    if ($out -notmatch 'xmlns:tools=') {
        $out = ([regex]'<manifest\b').Replace($out, '<manifest xmlns:tools="http://schemas.android.com/tools"', 1)
    }
    $out = ([regex]'(<manifest\b[^>]*>)').Replace($out, "`$1`r`n    <uses-sdk tools:overrideLibrary=""com.google.mlkit.genai.prompt,com.google.mlkit.genai.common"" />", 1)
    return $out
}

# 4) register the plugin next to the alarm plugin
Edit-File (Join-Path $pkgDir 'MainActivity.java') {
    param($t)
    if ($t -match 'ItaskAIPlugin') { return $t }
    $out = $t.Replace('registerPlugin(ItaskAlarmPlugin.class);',
        "registerPlugin(ItaskAlarmPlugin.class);`r`n        registerPlugin(ItaskAIPlugin.class);")
    if ($out -eq $t) { throw "MainActivity.java: registerPlugin(ItaskAlarmPlugin.class); not found" }
    return $out
}

# 5) the plugin source itself (prepare-android.bat keeps it updated from now on)
Copy-Item (Join-Path $root 'native-src-ai\ItaskAIPlugin.kt') $pkgDir -Force
Write-Host "copied    ItaskAIPlugin.kt"
