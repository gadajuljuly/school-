package com.gadajuljuly.itask;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

// Not exported: only this app's own AlarmManager and notification buttons
// send these.
public class TaskAlarmReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String id = intent.getStringExtra(TaskAlarmScheduler.EXTRA_ID);
        if (id == null) return;
        String action = intent.getAction();
        if (TaskAlarmScheduler.ACTION_FIRE.equals(action)) {
            TaskAlarmScheduler.onFired(context, id);
        } else if (TaskAlarmScheduler.ACTION_SNOOZE.equals(action)) {
            TaskAlarmScheduler.snooze(context, id,
                    intent.getStringExtra(TaskAlarmScheduler.EXTRA_TITLE),
                    intent.getStringExtra(TaskAlarmScheduler.EXTRA_BODY));
        } else if (TaskAlarmScheduler.ACTION_STOP.equals(action)) {
            TaskAlarmScheduler.stopRinging(context, id);
        }
    }
}
