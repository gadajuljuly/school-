package com.gadajuljuly.itask;

import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;

// Supplies the widget's scrolling list: the open tasks of the project
// currently shown in its header.
public class ItaskWidgetService extends RemoteViewsService {
    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new Factory(getApplicationContext());
    }

    private static class Row {
        final boolean project;
        final String text;
        final int status;
        final String view; // what tapping it opens in the app
        Row(boolean project, String text, int status, String view) {
            this.project = project;
            this.text = text;
            this.status = status;
            this.view = view;
        }
    }

    private static class Factory implements RemoteViewsFactory {
        private final Context context;
        private final List<Row> rows = new ArrayList<>();

        Factory(Context context) {
            this.context = context;
        }

        @Override public void onCreate() {}
        @Override public void onDestroy() { rows.clear(); }

        // Only the project the header currently shows (ItaskWidgetProvider).
        @Override
        public void onDataSetChanged() {
            rows.clear();
            JSONArray projects = ItaskWidgetProvider.loadData(context).optJSONArray("projects");
            if (projects == null || projects.length() == 0) return;
            JSONObject p = projects.optJSONObject(ItaskWidgetProvider.currentProject(context, projects.length()));
            JSONArray tasks = p != null ? p.optJSONArray("tasks") : null;
            if (tasks == null) return;
            String sheetId = p.optString("id");
            for (int j = 0; j < tasks.length(); j++) {
                JSONObject t = tasks.optJSONObject(j);
                if (t == null) continue;
                String view = "task|" + sheetId + "|" + t.optString("date") + "|" + t.optString("id");
                rows.add(new Row(false, t.optString("text"), t.optInt("status", 0), view));
            }
        }

        @Override public int getCount() { return rows.size(); }

        @Override
        public RemoteViews getViewAt(int position) {
            if (position >= rows.size()) return null;
            Row row = rows.get(position);
            RemoteViews views;
            if (row.project) {
                views = new RemoteViews(context.getPackageName(), R.layout.itask_widget_project_row);
                views.setTextViewText(R.id.itask_widget_row_text, row.text);
            } else {
                views = new RemoteViews(context.getPackageName(), R.layout.itask_widget_task_row);
                views.setImageViewResource(R.id.itask_widget_row_mark,
                        row.status == 1 ? R.drawable.itask_mark_partial : R.drawable.itask_mark_open);
                views.setTextViewText(R.id.itask_widget_row_text, row.text);
            }
            views.setOnClickFillInIntent(R.id.itask_widget_row_root,
                    new Intent().putExtra(ItaskAlarmPlugin.EXTRA_VIEW, row.view));
            return views;
        }

        @Override public RemoteViews getLoadingView() { return null; }
        @Override public int getViewTypeCount() { return 2; }
        @Override public long getItemId(int position) { return position; }
        @Override public boolean hasStableIds() { return false; }
    }
}
