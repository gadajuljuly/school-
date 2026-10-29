package com.gadajuljuly.itask;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

// AlarmManager forgets everything on reboot and app update - put the saved
// alarms back. Also re-runs when the exact-alarm permission is granted so
// alarms scheduled inexactly before switch to the exact minute. The
// floating task's quarter-hour round starts again too.
public class TaskAlarmRestoreReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        TaskAlarmScheduler.rescheduleAll(context);
        ItaskFloatReceiver.schedule(context);
    }
}
