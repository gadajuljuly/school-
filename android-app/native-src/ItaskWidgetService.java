package com.gadajuljuly.itask;

import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;

// Supplies the widget's scrolling list: a project-name row followed by that
// project's open tasks, for each project.
public class ItaskWidgetService extends RemoteViewsService {
    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new Factory(getApplicationContext());
    }

    private static class Row {
        final boolean project;
        final String text;
        final int status;
        Row(boolean project, String text, int status) {
            this.project = project;
            this.text = text;
            this.status = status;
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

        @Override
        public void onDataSetChanged() {
            rows.clear();
            JSONArray projects = ItaskWidgetProvider.loadData(context).optJSONArray("projects");
            if (projects == null) return;
            for (int i = 0; i < projects.length(); i++) {
                JSONObject p = projects.optJSONObject(i);
                if (p == null) continue;
                rows.add(new Row(true, p.optString("name"), 0));
                JSONArray tasks = p.optJSONArray("tasks");
                if (tasks == null) continue;
                for (int j = 0; j < tasks.length(); j++) {
                    JSONObject t = tasks.optJSONObject(j);
                    if (t != null) rows.add(new Row(false, t.optString("text"), t.optInt("status", 0)));
                }
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
                views.setTextViewText(R.id.itask_widget_row_mark, row.status == 1 ? "◐" : "○");
                views.setTextViewText(R.id.itask_widget_row_text, row.text);
            }
            views.setOnClickFillInIntent(R.id.itask_widget_row_root, new Intent());
            return views;
        }

        @Override public RemoteViews getLoadingView() { return null; }
        @Override public int getViewTypeCount() { return 2; }
        @Override public long getItemId(int position) { return position; }
        @Override public boolean hasStableIds() { return false; }
    }
}
