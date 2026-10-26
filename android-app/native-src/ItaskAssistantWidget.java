package com.gadajuljuly.itask;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;

// Home-screen "עוזר ITASK" bar, shaped like the Google search bar: the
// ITASK mark, "מה לעשות?" and a microphone. A home-screen widget can't hold
// a real text field, so (as Google's own bar does) tapping it opens the app
// on its assistant chat with the keyboard up (launch view "assistant"),
// and the microphone opens it already listening ("assistant-listen").
public class ItaskAssistantWidget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context c, AppWidgetManager manager, int[] ids) {
        for (int id : ids) {
            RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.itask_assistant_widget);
            v.setOnClickPendingIntent(R.id.itask_assistant_bar, open(c, "assistant", 7101));
            v.setOnClickPendingIntent(R.id.itask_assistant_mic, open(c, "assistant-listen", 7102));
            manager.updateAppWidget(id, v);
        }
    }

    private static PendingIntent open(Context c, String view, int requestCode) {
        return PendingIntent.getActivity(c, requestCode, ItaskAlarmPlugin.openAppIntent(c, view),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }
}
