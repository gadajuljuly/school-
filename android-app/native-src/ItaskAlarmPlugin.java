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
import org.json.JSONArray;

// Bridge for tasks.html (see syncNativeTaskAlarms there): the page sends the
// full set of active per-task reminders and this replaces whatever was
// scheduled before, so the native side never needs to know about tasks.
@CapacitorPlugin(name = "ItaskAlarm")
public class ItaskAlarmPlugin extends Plugin {

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
