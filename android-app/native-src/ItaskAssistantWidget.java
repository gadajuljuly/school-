package com.gadajuljuly.itask;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.widget.RemoteViews;

import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

// Home-screen "דוח בוקר" bar: the ITASK mark, its title and today's line
// ("היום: 3 משימות, 1 פעילויות באיחור" - handed over by the app with the
// task widget's data, see ItaskWidgetProvider.saveAndRefresh). Tapping it
// opens the app on its morning report (launch view "morning"). On a day
// the app hasn't been opened yet, the line is a plain prompt. (The class
// keeps its name from when it was the assistant bar, so placed widgets stay.)
public class ItaskAssistantWidget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context c, AppWidgetManager manager, int[] ids) {
        update(c, manager, ids);
    }

    static void refresh(Context c) {
        AppWidgetManager manager = AppWidgetManager.getInstance(c);
        int[] ids = manager.getAppWidgetIds(new ComponentName(c, ItaskAssistantWidget.class));
        if (ids.length > 0) update(c, manager, ids);
    }

    private static void update(Context c, AppWidgetManager manager, int[] ids) {
        JSONObject data = ItaskWidgetProvider.loadData(c);
        String today = new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(new Date());
        String line = today.equals(data.optString("morningDate")) ? data.optString("morningLine", "") : "";
        if (line.isEmpty()) line = c.getString(R.string.itask_assistant_hint);
        for (int id : ids) {
            RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.itask_assistant_widget);
            v.setTextViewText(R.id.itask_morning_line, line);
            v.setOnClickPendingIntent(R.id.itask_assistant_bar, PendingIntent.getActivity(c, 7101,
                    ItaskAlarmPlugin.openAppIntent(c, "morning"),
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE));
            manager.updateAppWidget(id, v);
        }
    }
}
