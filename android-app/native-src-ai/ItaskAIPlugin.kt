package com.gadajuljuly.itask

import android.os.Build
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.google.mlkit.genai.common.DownloadStatus
import com.google.mlkit.genai.common.FeatureStatus
import com.google.mlkit.genai.prompt.Generation
import com.google.mlkit.genai.prompt.GenerativeModel
import com.google.mlkit.genai.prompt.TextPart
import com.google.mlkit.genai.prompt.generateContentRequest
import com.google.mlkit.genai.prompt.generationConfig
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch

/**
 * The phone's on-device model (Gemini Nano through Android AICore, ML Kit
 * GenAI Prompt API) for voice commands - see src/app/14b-voice-commands.js.
 *
 *   available() -> { available, status: available|downloadable|downloading|unavailable }
 *   download()  -> resolves when the model is on the phone ("downloadProgress" events)
 *   generate({ prompt }) -> { text }
 *
 * Only phones with AICore and Android 12+ have it; everywhere else
 * available() says unavailable and the app uses its own offline parser.
 */
@CapacitorPlugin(name = "ItaskAI")
class ItaskAIPlugin : Plugin() {
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    private var model: GenerativeModel? = null
    private var downloading = false

    private fun model(): GenerativeModel? {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return null
        return model ?: Generation.getClient(generationConfig {}).also { model = it }
    }

    private fun statusName(status: Int): String = when (status) {
        FeatureStatus.AVAILABLE -> "available"
        FeatureStatus.DOWNLOADABLE -> "downloadable"
        FeatureStatus.DOWNLOADING -> "downloading"
        else -> "unavailable"
    }

    @PluginMethod
    fun available(call: PluginCall) {
        val m = model()
        if (m == null) {
            call.resolve(JSObject().put("available", false).put("status", "unavailable"))
            return
        }
        scope.launch {
            try {
                val status = m.checkStatus()
                call.resolve(JSObject()
                    .put("available", status == FeatureStatus.AVAILABLE)
                    .put("status", if (downloading) "downloading" else statusName(status)))
            } catch (e: Exception) {
                call.resolve(JSObject().put("available", false).put("status", "unavailable")
                    .put("error", e.message ?: e.toString()))
            }
        }
    }

    @PluginMethod
    fun download(call: PluginCall) {
        val m = model()
        if (m == null) {
            call.reject("unavailable", "UNAVAILABLE")
            return
        }
        if (downloading) {
            call.reject("already downloading", "DOWNLOADING")
            return
        }
        downloading = true
        scope.launch {
            try {
                var total = 0L
                m.download().collect { status ->
                    when (status) {
                        is DownloadStatus.DownloadStarted -> {
                            total = status.bytesToDownload
                            notifyListeners("downloadProgress", JSObject().put("bytes", 0).put("total", total))
                        }
                        is DownloadStatus.DownloadProgress ->
                            notifyListeners("downloadProgress", JSObject()
                                .put("bytes", status.totalBytesDownloaded).put("total", total))
                        is DownloadStatus.DownloadFailed -> {
                            downloading = false
                            call.reject(status.e.message ?: "download failed", "FAILED")
                        }
                        is DownloadStatus.DownloadCompleted -> {
                            downloading = false
                            call.resolve()
                        }
                    }
                }
            } catch (e: Exception) {
                downloading = false
                call.reject(e.message ?: e.toString(), "FAILED")
            }
        }
    }

    @PluginMethod
    fun generate(call: PluginCall) {
        val prompt = call.getString("prompt")
        val m = model()
        if (prompt.isNullOrEmpty() || m == null) {
            call.reject("unavailable", "UNAVAILABLE")
            return
        }
        scope.launch {
            try {
                val response = m.generateContent(generateContentRequest(TextPart(prompt)) {
                    temperature = 0.1f
                    topK = 1
                    maxOutputTokens = 256
                })
                val text = response.candidates.firstOrNull()?.text ?: ""
                call.resolve(JSObject().put("text", text))
            } catch (e: Exception) {
                call.reject(e.message ?: e.toString(), "FAILED")
            }
        }
    }

    override fun handleOnDestroy() {
        scope.cancel()
        model?.close()
        model = null
        super.handleOnDestroy()
    }
}
