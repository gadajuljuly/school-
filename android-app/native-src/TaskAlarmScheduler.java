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
import android.net.Uri;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

// Schedules per-task reminders like an alarm clock: AlarmManager wakes the
// phone at the exact minute, and the notification is FLAG_INSISTENT on a
// channel whose sound is a Morse-telegraph clip (res/raw/task_alarm_morse),
// so it keeps tapping out and vibrating until the user presses "כבה" or
// "נודניק" (or ten minutes pass). "כבה" (or swiping it away) turns the
// reminder off for good: it's unscheduled here and queued for tasks.html
// to remove from the task (takeTurnedOff).
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
    private static final String KEY_FIRED = "fired";
    private static final String KEY_TURNED_OFF = "turnedOff";
    private static final String CHANNEL_ID = "task_alarm_morse";
    private static final int MAX_FIRED_KEYS = 200;
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
        java.util.HashSet<String> wanted = new java.util.HashSet<>();
        for (int i = 0; i < incoming.length(); i++) wanted.add(incoming.getJSONObject(i).getString("id"));
        JSONArray old = load(c);
        JSONArray next = new JSONArray();
        for (int i = 0; i < old.length(); i++) {
            JSONObject a = old.getJSONObject(i);
            String id = a.getString("id");
            cancel(c, id);
            if (wanted.contains(baseId(id))) {
                if (a.optBoolean("snooze")) next.put(a);
            } else {
                // its task was marked done or the reminder removed: hush it now
                stopRinging(c, id);
            }
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
            markFired(c, id, a.optLong("at", 0));
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
        try {
            JSONObject a = new JSONObject();
            a.put("id", baseId(id) + SNOOZE_SUFFIX);
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

    // "כבה": silence it, unschedule the alarm (and any pending snooze of it),
    // and queue it so the page removes the reminder from the task itself.
    static synchronized void turnOff(Context c, String id) {
        String base = baseId(id);
        stopRinging(c, id);
        JSONArray alarms = load(c);
        JSONArray next = new JSONArray();
        for (int i = 0; i < alarms.length(); i++) {
            JSONObject a = alarms.optJSONObject(i);
            if (a == null) continue;
            if (base.equals(baseId(a.optString("id")))) {
                cancel(c, a.optString("id"));
                stopRinging(c, a.optString("id"));
            } else {
                next.put(a);
            }
        }
        scheduleAllAndSave(c, next);
        JSONArray off = loadArray(c, KEY_TURNED_OFF);
        off.put(base);
        saveArray(c, KEY_TURNED_OFF, off);
    }

    static synchronized JSONArray takeTurnedOff(Context c) {
        JSONArray off = loadArray(c, KEY_TURNED_OFF);
        saveArray(c, KEY_TURNED_OFF, new JSONArray());
        return off;
    }

    static String baseId(String id) {
        return id.endsWith(SNOOZE_SUFFIX) ? id.substring(0, id.length() - SNOOZE_SUFFIX.length()) : id;
    }

    // The page keeps re-sending a one-shot until it's turned off, so remember
    // which (id, time) pairs already rang and never ring those again.
    private static void markFired(Context c, String id, long at) {
        JSONArray fired = loadArray(c, KEY_FIRED);
        fired.put(id + "@" + at);
        JSONArray trimmed = new JSONArray();
        for (int i = Math.max(0, fired.length() - MAX_FIRED_KEYS); i < fired.length(); i++) trimmed.put(fired.optString(i));
        saveArray(c, KEY_FIRED, trimmed);
    }

    private static boolean hasFired(JSONArray fired, String id, long at) {
        String key = id + "@" + at;
        for (int i = 0; i < fired.length(); i++) if (key.equals(fired.optString(i))) return true;
        return false;
    }

    // Schedules each alarm at its next due time (advancing repeating ones past
    // "now", dropping one-shots that are already over) and saves what's left.
    private static void scheduleAllAndSave(Context c, JSONArray alarms) {
        long now = System.currentTimeMillis();
        JSONArray fired = loadArray(c, KEY_FIRED);
        JSONArray kept = new JSONArray();
        for (int i = 0; i < alarms.length(); i++) {
            JSONObject a = alarms.optJSONObject(i);
            if (a == null) continue;
            String id = a.optString("id");
            long at = a.optLong("at", 0);
            long repeatMs = a.optLong("repeatMinutes", 0) * 60000L;
            if (repeatMs == 0 && hasFired(fired, id, at)) continue;
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
        saveArray(c, KEY, kept);
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
                .setDeleteIntent(actionIntent(c, ACTION_STOP, id, title, body))
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
        NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "תזכורות משימה (מורס)",
                NotificationManager.IMPORTANCE_HIGH);
        channel.setDescription("מצלצל בצלצול טלגרף עד שלוחצים כבה או נודניק");
        channel.enableVibration(true);
        // ".. - .- ... -.-" (ITASK), matching the sound
        channel.setVibrationPattern(new long[]{0, 80, 80, 80, 240, 240, 240, 80, 80, 240, 240, 80, 80, 80, 80, 80, 240, 240, 80, 80, 80, 240});
        channel.setSound(Uri.parse("android.resource://" + c.getPackageName() + "/raw/task_alarm_morse"),
                new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_ALARM)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                        .build());
        nm.createNotificationChannel(channel);
    }

    private static JSONArray load(Context c) {
        return loadArray(c, KEY);
    }

    private static JSONArray loadArray(Context c, String key) {
        SharedPreferences prefs = c.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        try {
            return new JSONArray(prefs.getString(key, "[]"));
        } catch (JSONException e) {
            return new JSONArray();
        }
    }

    private static void saveArray(Context c, String key, JSONArray value) {
        c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString(key, value.toString()).apply();
    }
}
