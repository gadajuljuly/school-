package com.gadajuljuly.itask;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.view.View;
import android.widget.RemoteViews;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

// Home-screen "המשימות שלי" widget, shaped like the app: project tabs on
// top (the current project plus its neighbours - tapping a side tab moves
// to it) and that project's open tasks on the page below. Tapping a task
// opens the app on that task, tapping the current tab on that project.
// It can't reach Supabase itself, so tasks.html (syncNativeWidget) hands it
// the list through ItaskAlarmPlugin.setWidgetData whenever it changes; it
// shows the last list the app saw.
public class ItaskWidgetProvider extends AppWidgetProvider {
    static final String PREFS = "itask_widget";
    static final String KEY_DATA = "data";
    static final String KEY_PROJECT = "project";
    private static final String ACTION_PREV = "com.gadajuljuly.itask.WIDGET_PREV";
    private static final String ACTION_NEXT = "com.gadajuljuly.itask.WIDGET_NEXT";

    static void saveAndRefresh(Context c, String json) {
        c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString(KEY_DATA, json).apply();
        refresh(c);
        ItaskAssistantWidget.refresh(c); // the morning-report bar's line
    }

    private static void refresh(Context c) {
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

    // The project currently shown, kept in range as projects come and go.
    static int currentProject(Context c, int count) {
        if (count == 0) return 0;
        int i = c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getInt(KEY_PROJECT, 0);
        return Math.max(0, Math.min(i, count - 1));
    }

    private static String tabLabel(JSONObject project) {
        if (project == null) return "";
        return (project.optBoolean("shared") ? "👥 " : "") + project.optString("name");
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        if (ACTION_PREV.equals(action) || ACTION_NEXT.equals(action)) {
            JSONArray projects = loadData(context).optJSONArray("projects");
            int count = projects != null ? projects.length() : 0;
            int i = currentProject(context, count) + (ACTION_NEXT.equals(action) ? 1 : -1);
            if (i >= 0 && i < count) {
                context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putInt(KEY_PROJECT, i).apply();
                refresh(context);
            }
            return;
        }
        super.onReceive(context, intent);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
        updateAll(context, manager, ids);
    }

    private static void updateAll(Context c, AppWidgetManager manager, int[] ids) {
        JSONObject data = loadData(c);
        JSONArray projects = data.optJSONArray("projects");
        int count = projects != null ? projects.length() : 0;
        int index = currentProject(c, count);
        JSONObject project = count > 0 ? projects.optJSONObject(index) : null;
        String title = project != null ? tabLabel(project) : data.optString("title", "");
        String prevLabel = index > 0 ? tabLabel(projects.optJSONObject(index - 1)) : "";
        String nextLabel = index < count - 1 ? tabLabel(projects.optJSONObject(index + 1)) : "";
        String emptyText = data.optString("emptyText", "");

        String projectView = project != null ? "task|" + project.optString("id") + "||" : null;
        PendingIntent open = PendingIntent.getActivity(c, 0, ItaskAlarmPlugin.openAppIntent(c, projectView),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        // each list row fills in its own task, so this must be mutable
        PendingIntent openTemplate = PendingIntent.getActivity(c, 1, ItaskAlarmPlugin.openAppIntent(c, null),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_MUTABLE);
        PendingIntent prev = PendingIntent.getBroadcast(c, 2,
                new Intent(c, ItaskWidgetProvider.class).setAction(ACTION_PREV), PendingIntent.FLAG_IMMUTABLE);
        PendingIntent next = PendingIntent.getBroadcast(c, 3,
                new Intent(c, ItaskWidgetProvider.class).setAction(ACTION_NEXT), PendingIntent.FLAG_IMMUTABLE);

        for (int id : ids) {
            RemoteViews views = new RemoteViews(c.getPackageName(), R.layout.itask_widget);
            if (!title.isEmpty()) views.setTextViewText(R.id.itask_widget_title, title);
            if (!emptyText.isEmpty()) views.setTextViewText(R.id.itask_widget_empty, emptyText);
            views.setTextViewText(R.id.itask_widget_prev, prevLabel);
            views.setTextViewText(R.id.itask_widget_next, nextLabel);
            // no neighbour on that side: keep the tab's space, hide the tab
            views.setViewVisibility(R.id.itask_widget_prev, prevLabel.isEmpty() ? View.INVISIBLE : View.VISIBLE);
            views.setViewVisibility(R.id.itask_widget_next, nextLabel.isEmpty() ? View.INVISIBLE : View.VISIBLE);
            views.setOnClickPendingIntent(R.id.itask_widget_prev, prev);
            views.setOnClickPendingIntent(R.id.itask_widget_next, next);
            Intent service = new Intent(c, ItaskWidgetService.class)
                    .putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, id)
                    .setData(Uri.parse("itask-widget://" + id));
            views.setRemoteAdapter(R.id.itask_widget_list, service);
            views.setEmptyView(R.id.itask_widget_list, R.id.itask_widget_empty);
            views.setOnClickPendingIntent(R.id.itask_widget_title, open);
            views.setOnClickPendingIntent(R.id.itask_widget_empty, open);
            views.setPendingIntentTemplate(R.id.itask_widget_list, openTemplate);
            manager.updateAppWidget(id, views);
        }
    }
}
