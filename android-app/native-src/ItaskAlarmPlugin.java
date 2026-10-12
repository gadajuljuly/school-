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
import androidx.core.content.pm.ShortcutInfoCompat;
import androidx.core.content.pm.ShortcutManagerCompat;
import androidx.core.graphics.drawable.IconCompat;
import org.json.JSONArray;

// Bridge for tasks.html. Alarms (syncNativeTaskAlarms there): the page sends
// the full set of active per-task reminders and this replaces whatever was
// scheduled before, so the native side never needs to know about tasks.
// Widget (syncNativeWidget): the page sends the open-tasks list for the
// home-screen widget. Launch view: the widget and the icon's "המשימות שלי"
// shortcut start the app with EXTRA_VIEW, which the page picks up to open its
// full-screen tasks-only view.
@CapacitorPlugin(name = "ItaskAlarm")
public class ItaskAlarmPlugin extends Plugin {
    static final String EXTRA_VIEW = "itask_view";
    static final String ACTION_OPEN_FOCUS = "com.gadajuljuly.itask.OPEN_FOCUS";
    private static final String SHORTCUT_ID = "my_tasks";

    private String pendingLaunchView = null;

    static Intent focusViewIntent(android.content.Context c) {
        return new Intent(c, MainActivity.class)
                .setAction(ACTION_OPEN_FOCUS)
                .putExtra(EXTRA_VIEW, "focus")
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
    }

    @Override
    public void load() {
        if (getActivity() != null) takeViewFromIntent(getActivity().getIntent());
        ShortcutInfoCompat shortcut = new ShortcutInfoCompat.Builder(getContext(), SHORTCUT_ID)
                .setShortLabel("המשימות שלי")
                .setIcon(IconCompat.createWithResource(getContext(), R.mipmap.ic_launcher))
                .setIntent(focusViewIntent(getContext()))
                .build();
        ShortcutManagerCompat.pushDynamicShortcut(getContext(), shortcut);
    }

    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);
        if (takeViewFromIntent(intent)) {
            JSObject event = new JSObject();
            event.put("view", pendingLaunchView);
            notifyListeners("launchView", event);
        }
    }

    private boolean takeViewFromIntent(Intent intent) {
        if (intent == null || intent.getStringExtra(EXTRA_VIEW) == null) return false;
        pendingLaunchView = intent.getStringExtra(EXTRA_VIEW);
        intent.removeExtra(EXTRA_VIEW); // so a later reload doesn't reopen it
        return true;
    }

    @PluginMethod
    public void takeLaunchView(PluginCall call) {
        JSObject result = new JSObject();
        result.put("view", pendingLaunchView);
        pendingLaunchView = null;
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
