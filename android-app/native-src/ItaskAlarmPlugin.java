package com.gadajuljuly.itask;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import androidx.core.content.pm.ShortcutManagerCompat;
import java.util.Collections;
import org.json.JSONArray;

// Bridge for tasks.html. Alarms (syncNativeTaskAlarms there): the page sends
// the full set of active per-task reminders and this replaces whatever was
// scheduled before, so the native side never needs to know about tasks.
// Widget (syncNativeWidget): the page sends the open-tasks list for the
// home-screen widget. Launch view: tapping the widget starts the app with
// EXTRA_VIEW ("task|sheetId|date|taskId"), which the page picks up to open
// that project/task; text shared into ITASK from another app (Android's
// share sheet - a WhatsApp message...) arrives as view "share" plus the text,
// and the page opens it as a new task.
@CapacitorPlugin(name = "ItaskAlarm")
public class ItaskAlarmPlugin extends Plugin {
    static final String EXTRA_VIEW = "itask_view";
    static final String ACTION_OPEN_TASK = "com.gadajuljuly.itask.OPEN_TASK";
    // the "המשימות שלי" shortcut versions 13-14 added (that screen is gone)
    private static final String OLD_SHORTCUT_ID = "my_tasks";

    private String pendingLaunchView = null;
    private String pendingSharedText = null;

    // Opens the app on a project ("task|sheetId||") or a task
    // ("task|sheetId|date|taskId"); null just opens the app.
    static Intent openAppIntent(android.content.Context c, String view) {
        Intent i = new Intent(c, MainActivity.class)
                .setAction(ACTION_OPEN_TASK)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        if (view != null) i.putExtra(EXTRA_VIEW, view);
        return i;
    }

    @Override
    public void load() {
        if (getActivity() != null) takeViewFromIntent(getActivity().getIntent());
        ShortcutManagerCompat.removeDynamicShortcuts(getContext(), Collections.singletonList(OLD_SHORTCUT_ID));
    }

    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);
        if (takeViewFromIntent(intent)) {
            JSObject event = new JSObject();
            event.put("view", pendingLaunchView);
            if (pendingSharedText != null) event.put("text", pendingSharedText);
            notifyListeners("launchView", event);
        }
    }

    private boolean takeViewFromIntent(Intent intent) {
        if (intent != null && Intent.ACTION_SEND.equals(intent.getAction())
                && intent.getStringExtra(Intent.EXTRA_TEXT) != null) {
            pendingLaunchView = "share";
            pendingSharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
            // so a later reload doesn't offer the same text again
            intent.setAction(Intent.ACTION_MAIN);
            intent.removeExtra(Intent.EXTRA_TEXT);
            return true;
        }
        if (intent == null || intent.getStringExtra(EXTRA_VIEW) == null) return false;
        pendingSharedText = null;
        pendingLaunchView = intent.getStringExtra(EXTRA_VIEW);
        intent.removeExtra(EXTRA_VIEW); // so a later reload doesn't reopen it
        return true;
    }

    @PluginMethod
    public void takeLaunchView(PluginCall call) {
        JSObject result = new JSObject();
        result.put("view", pendingLaunchView);
        if (pendingSharedText != null) result.put("text", pendingSharedText);
        pendingLaunchView = null;
        pendingSharedText = null;
        call.resolve(result);
    }

    @PluginMethod
    public void setWidgetData(PluginCall call) {
        ItaskWidgetProvider.saveAndRefresh(getContext(), call.getData().toString());
        call.resolve();
    }

    @PluginMethod
    public void setAlarms(PluginCall call) {
        JSArray alarms = call.getArray("alarms");
        try {
            TaskAlarmScheduler.replaceAll(getContext(), alarms != null ? alarms : new JSONArray());
            call.resolve();
        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    }

    // Reminders whose ringing was turned off ("כבה") since the last call,
    // as "sheetId:taskId" ids - the page removes them from their tasks.
    @PluginMethod
    public void takeTurnedOffAlarms(PluginCall call) {
        JSObject result = new JSObject();
        result.put("ids", TaskAlarmScheduler.takeTurnedOff(getContext()));
        call.resolve(result);
    }

    @PluginMethod
    public void canScheduleExact(PluginCall call) {
        JSObject result = new JSObject();
        result.put("value", TaskAlarmScheduler.canScheduleExact(getContext()));
        call.resolve(result);
    }

    @PluginMethod
    public void openExactAlarmSettings(PluginCall call) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            Intent intent = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM,
                    Uri.parse("package:" + getContext().getPackageName()));
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(intent);
        }
        call.resolve();
    }
}
