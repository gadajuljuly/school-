package com.gadajuljuly.itask;

import android.Manifest;
import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

// Schedules per-task reminders as real alarm clocks: AlarmManager wakes the
// phone at the exact minute, and the notification is FLAG_INSISTENT on an
// alarm-sound channel, so it keeps ringing and vibrating until the user
// presses "כבה" or "נודניק" (or ten minutes pass).
// Each alarm is {id, title, body, at (epoch ms), repeatMinutes?, snooze?}.
public final class TaskAlarmScheduler {
    static final String ACTION_FIRE = "com.gadajuljuly.itask.ALARM_FIRE";
    static final String ACTION_STOP = "com.gadajuljuly.itask.ALARM_STOP";
    static final String ACTION_SNOOZE = "com.gadajuljuly.itask.ALARM_SNOOZE";
    static final String EXTRA_ID = "alarmId";
    static final String EXTRA_TITLE = "alarmTitle";
    static final String EXTRA_BODY = "alarmBody";

    private static final String PREFS = "itask_task_alarms";
    private static final String KEY = "alarms";
    private static final String CHANNEL_ID = "task_alarm_ring";
    private static final String SNOOZE_SUFFIX = "#snooze";
    private static final long SNOOZE_MS = 5 * 60 * 1000L;
    private static final long RING_TIMEOUT_MS = 10 * 60 * 1000L;
    // a one-shot sent a little late (page re-sync around its minute) still rings
    private static final long LATE_GRACE_MS = 60 * 1000L;

    private TaskAlarmScheduler() {}

    static boolean canScheduleExact(Context c) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return true;
        return c.getSystemService(AlarmManager.class).canScheduleExactAlarms();
    }

    // The page's set replaces everything except snoozes still pending.
    static synchronized void replaceAll(Context c, JSONArray incoming) throws JSONException {
        JSONArray old = load(c);
        JSONArray next = new JSONArray();
        for (int i = 0; i < old.length(); i++) {
            JSONObject a = old.getJSONObject(i);
            cancel(c, a.getString("id"));
            if (a.optBoolean("snooze")) next.put(a);
        }
        for (int i = 0; i < incoming.length(); i++) next.put(incoming.getJSONObject(i));
        scheduleAllAndSave(c, next);
    }

    // After a reboot, an app update, or the exact-alarm permission changing.
    static synchronized void rescheduleAll(Context c) {
        scheduleAllAndSave(c, load(c));
    }

    static synchronized void onFired(Context c, String id) {
        JSONArray alarms = load(c);
        JSONArray next = new JSONArray();
        for (int i = 0; i < alarms.length(); i++) {
            JSONObject a = alarms.optJSONObject(i);
            if (a == null) continue;
            if (!id.equals(a.optString("id"))) { next.put(a); continue; }
            showRinging(c, id, a.optString("title"), a.optString("body"));
            long repeatMinutes = a.optLong("repeatMinutes", 0);
            if (repeatMinutes > 0) {
                // move past this ring; scheduleAllAndSave skips any further missed slots
                try { a.put("at", a.optLong("at", 0) + repeatMinutes * 60000L); } catch (JSONException ignored) {}
                next.put(a);
            }
        }
        scheduleAllAndSave(c, next);
    }

    static synchronized void snooze(Context c, String id, String title, String body) {
        stopRinging(c, id);
        String baseId = id.endsWith(SNOOZE_SUFFIX) ? id.substring(0, id.length() - SNOOZE_SUFFIX.length()) : id;
        try {
            JSONObject a = new JSONObject();
            a.put("id", baseId + SNOOZE_SUFFIX);
            a.put("title", title);
            a.put("body", body);
            a.put("at", System.currentTimeMillis() + SNOOZE_MS);
            a.put("snooze", true);
            JSONArray alarms = load(c);
            JSONArray next = new JSONArray();
            for (int i = 0; i < alarms.length(); i++) {
                JSONObject o = alarms.optJSONObject(i);
                if (o != null && !a.getString("id").equals(o.optString("id"))) next.put(o);
            }
            next.put(a);
            scheduleAllAndSave(c, next);
        } catch (JSONException ignored) {
        }
    }

    static void stopRinging(Context c, String id) {
        c.getSystemService(NotificationManager.class).cancel(id.hashCode());
    }

    // Schedules each alarm at its next due time (advancing repeating ones past
    // "now", dropping one-shots that are already over) and saves what's left.
    private static void scheduleAllAndSave(Context c, JSONArray alarms) {
        long now = System.currentTimeMillis();
        JSONArray kept = new JSONArray();
        for (int i = 0; i < alarms.length(); i++) {
            JSONObject a = alarms.optJSONObject(i);
            if (a == null) continue;
            String id = a.optString("id");
            long at = a.optLong("at", 0);
            long repeatMs = a.optLong("repeatMinutes", 0) * 60000L;
            if (at <= now) {
                if (repeatMs > 0) {
                    at += ((now - at) / repeatMs + 1) * repeatMs;
                } else if (now - at < LATE_GRACE_MS) {
                    at = now + 1000;
                } else {
                    continue;
                }
            }
            try { a.put("at", at); } catch (JSONException ignored) {}
            schedule(c, id, at);
            kept.put(a);
        }
        c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString(KEY, kept.toString()).apply();
    }

    private static void schedule(Context c, String id, long at) {
        AlarmManager am = c.getSystemService(AlarmManager.class);
        PendingIntent fire = fireIntent(c, id, PendingIntent.FLAG_UPDATE_CURRENT);
        try {
            PendingIntent show = PendingIntent.getActivity(c, 0, launchIntent(c), PendingIntent.FLAG_IMMUTABLE);
            am.setAlarmClock(new AlarmManager.AlarmClockInfo(at, show), fire);
        } catch (SecurityException noExactAlarmPermission) {
            // "Alarms & reminders" not granted yet: still rings, possibly a few minutes late
            am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, fire);
        }
    }

    private static void cancel(Context c, String id) {
        PendingIntent fire = fireIntent(c, id, PendingIntent.FLAG_NO_CREATE);
        if (fire != null) c.getSystemService(AlarmManager.class).cancel(fire);
    }

    private static PendingIntent fireIntent(Context c, String id, int flags) {
        Intent i = new Intent(c, TaskAlarmReceiver.class)
                .setAction(ACTION_FIRE)
                .setData(Uri.parse("itask-alarm://" + Uri.encode(id)))
                .putExtra(EXTRA_ID, id);
        return PendingIntent.getBroadcast(c, 0, i, flags | PendingIntent.FLAG_IMMUTABLE);
    }

    private static PendingIntent actionIntent(Context c, String action, String id, String title, String body) {
        Intent i = new Intent(c, TaskAlarmReceiver.class)
                .setAction(action)
                .setData(Uri.parse("itask-alarm://" + Uri.encode(id)))
                .putExtra(EXTRA_ID, id)
                .putExtra(EXTRA_TITLE, title)
                .putExtra(EXTRA_BODY, body);
        return PendingIntent.getBroadcast(c, 0, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    private static Intent launchIntent(Context c) {
        Intent i = c.getPackageManager().getLaunchIntentForPackage(c.getPackageName());
        if (i == null) i = new Intent(c, MainActivity.class);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return i;
    }

    private static void showRinging(Context c, String id, String title, String body) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
                c.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        ensureChannel(c);
        PendingIntent open = PendingIntent.getActivity(c, 0, launchIntent(c),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification n = new NotificationCompat.Builder(c, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
                .setContentTitle(title)
                .setContentText(body)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(body))
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setCategory(NotificationCompat.CATEGORY_ALARM)
                .setContentIntent(open)
                .setAutoCancel(true)
                .setTimeoutAfter(RING_TIMEOUT_MS)
                .addAction(0, "נודניק 5 דק׳", actionIntent(c, ACTION_SNOOZE, id, title, body))
                .addAction(0, "כבה", actionIntent(c, ACTION_STOP, id, title, body))
                .build();
        n.flags |= Notification.FLAG_INSISTENT;
        c.getSystemService(NotificationManager.class).notify(id.hashCode(), n);
    }

    private static void ensureChannel(Context c) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager nm = c.getSystemService(NotificationManager.class);
        if (nm.getNotificationChannel(CHANNEL_ID) != null) return;
        NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "שעון מעורר למשימות",
                NotificationManager.IMPORTANCE_HIGH);
        channel.setDescription("מצלצל עד שלוחצים כבה או נודניק");
        channel.enableVibration(true);
        channel.setVibrationPattern(new long[]{0, 600, 400, 600, 400, 600});
        channel.setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM),
                new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_ALARM)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                        .build());
        nm.createNotificationChannel(channel);
    }

    private static JSONArray load(Context c) {
        SharedPreferences prefs = c.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        try {
            return new JSONArray(prefs.getString(KEY, "[]"));
        } catch (JSONException e) {
            return new JSONArray();
        }
    }
}
