package com.gadajuljuly.itask;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.widget.RemoteViews;
import org.json.JSONException;
import org.json.JSONObject;

// Home-screen "המשימות שלי" widget: every open task grouped by project.
// It can't reach Supabase itself, so tasks.html (syncNativeWidget) hands it
// the list through ItaskAlarmPlugin.setWidgetData whenever it changes; it
// shows the last list the app saw. Tapping anywhere opens the app's
// full-screen tasks-only view.
public class ItaskWidgetProvider extends AppWidgetProvider {
    static final String PREFS = "itask_widget";
    static final String KEY_DATA = "data";

    static void saveAndRefresh(Context c, String json) {
        c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString(KEY_DATA, json).apply();
        AppWidgetManager manager = AppWidgetManager.getInstance(c);
        int[] ids = manager.getAppWidgetIds(new ComponentName(c, ItaskWidgetProvider.class));
        if (ids.length == 0) return;
        updateAll(c, manager, ids);
        manager.notifyAppWidgetViewDataChanged(ids, R.id.itask_widget_list);
    }

    static JSONObject loadData(Context c) {
        try {
            return new JSONObject(c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString(KEY_DATA, "{}"));
        } catch (JSONException e) {
            return new JSONObject();
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
        updateAll(context, manager, ids);
    }

    private static void updateAll(Context c, AppWidgetManager manager, int[] ids) {
        JSONObject data = loadData(c);
        String title = data.optString("title", "");
        String emptyText = data.optString("emptyText", "");
        PendingIntent open = PendingIntent.getActivity(c, 0, ItaskAlarmPlugin.focusViewIntent(c),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        // list rows only add an (empty) fill-in to this, so it must be mutable
        PendingIntent openTemplate = PendingIntent.getActivity(c, 1, ItaskAlarmPlugin.focusViewIntent(c),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_MUTABLE);
        for (int id : ids) {
            RemoteViews views = new RemoteViews(c.getPackageName(), R.layout.itask_widget);
            if (!title.isEmpty()) views.setTextViewText(R.id.itask_widget_title, title);
            if (!emptyText.isEmpty()) views.setTextViewText(R.id.itask_widget_empty, emptyText);
            Intent service = new Intent(c, ItaskWidgetService.class)
                    .putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, id)
                    .setData(Uri.parse("itask-widget://" + id));
            views.setRemoteAdapter(R.id.itask_widget_list, service);
            views.setEmptyView(R.id.itask_widget_list, R.id.itask_widget_empty);
            views.setOnClickPendingIntent(R.id.itask_widget_header, open);
            views.setOnClickPendingIntent(R.id.itask_widget_empty, open);
            views.setPendingIntentTemplate(R.id.itask_widget_list, openTemplate);
            manager.updateAppWidget(id, views);
        }
    }
}
