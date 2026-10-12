package com.gadajuljuly.itask;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.media.AudioAttributes;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.VibrationEffect;
import android.os.Vibrator;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

// Plays a ringing reminder the way an alarm clock does: the Morse clip loops
// on the alarm stream (alarm volume, heard even when the phone is on
// vibrate/silent) with a repeating vibration, until "כבה"/"נודניק" or
// RING_MS. A short foreground service, because a broadcast receiver can't
// keep a player alive; starting it from an exact alarm is allowed.
public class TaskAlarmRingingService extends Service {
    private static final String ACTION_START = "com.gadajuljuly.itask.RING_START";
    private static final String CHANNEL_ID = "task_alarm_ringing";
    private static final long RING_MS = 2 * 60 * 1000L; // inside shortService's 3-minute limit

    private static String ringingId = null;

    private MediaPlayer player;
    private Vibrator vibrator;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable timeout = this::stopRingingKeepNotification;

    static boolean start(Context c, String id, String title, String body) {
        Intent i = new Intent(c, TaskAlarmRingingService.class)
                .setAction(ACTION_START)
                .putExtra(TaskAlarmScheduler.EXTRA_ID, id)
                .putExtra(TaskAlarmScheduler.EXTRA_TITLE, title)
                .putExtra(TaskAlarmScheduler.EXTRA_BODY, body);
        try {
            ContextCompat.startForegroundService(c, i);
            return true;
        } catch (RuntimeException notAllowedNow) {
            return false;
        }
    }

    static void stopIfRinging(Context c, String id) {
        if (id.equals(ringingId)) c.stopService(new Intent(c, TaskAlarmRingingService.class));
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent == null || !ACTION_START.equals(intent.getAction())) {
            stopSelf();
            return START_NOT_STICKY;
        }
        String id = intent.getStringExtra(TaskAlarmScheduler.EXTRA_ID);
        String title = intent.getStringExtra(TaskAlarmScheduler.EXTRA_TITLE);
        String body = intent.getStringExtra(TaskAlarmScheduler.EXTRA_BODY);
        if (id == null) {
            stopSelf();
            return START_NOT_STICKY;
        }
        stopSound(); // a newer alarm replaces one still ringing
        ringingId = id;
        Notification n = buildNotification(id, title != null ? title : "", body != null ? body : "");
        if (Build.VERSION.SDK_INT >= 34) {
            startForeground(id.hashCode(), n, ServiceInfo.FOREGROUND_SERVICE_TYPE_SHORT_SERVICE);
        } else {
            startForeground(id.hashCode(), n);
        }
        startSound();
        handler.removeCallbacks(timeout);
        handler.postDelayed(timeout, RING_MS);
        return START_NOT_STICKY;
    }

    // shortService ran out of time (Android 14+)
    @Override
    public void onTimeout(int startId, int fgsType) {
        stopRingingKeepNotification();
    }

    @Override
    public void onDestroy() {
        handler.removeCallbacks(timeout);
        stopSound();
        ringingId = null;
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    // Time's up without an answer: go quiet but leave the notification (and
    // its buttons) in place.
    private void stopRingingKeepNotification() {
        stopSound();
        stopForeground(STOP_FOREGROUND_DETACH);
        ringingId = null;
        stopSelf();
    }

    private void startSound() {
        AudioAttributes alarm = new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_ALARM)
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build();
        try {
            player = new MediaPlayer();
            player.setAudioAttributes(alarm);
            player.setDataSource(this, Uri.parse("android.resource://" + getPackageName() + "/raw/task_alarm_morse"));
            player.setLooping(true);
            player.prepare();
            player.start();
        } catch (Exception e) {
            if (player != null) player.release();
            player = null;
        }
        vibrator = getSystemService(Vibrator.class);
        if (vibrator != null && vibrator.hasVibrator() && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            vibrator.vibrate(VibrationEffect.createWaveform(TaskAlarmScheduler.MORSE_VIBRATION, 0), alarm);
        }
    }

    private void stopSound() {
        if (player != null) {
            try { player.stop(); } catch (IllegalStateException ignored) {}
            player.release();
            player = null;
        }
        if (vibrator != null) {
            vibrator.cancel();
            vibrator = null;
        }
    }

    private Notification buildNotification(String id, String title, String body) {
        ensureChannel();
        PendingIntent open = PendingIntent.getActivity(this, 0, TaskAlarmScheduler.launchIntent(this),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
                .setContentTitle(title)
                .setContentText(body)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(body))
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setCategory(NotificationCompat.CATEGORY_ALARM)
                .setContentIntent(open)
                .setDeleteIntent(TaskAlarmScheduler.actionIntent(this, TaskAlarmScheduler.ACTION_STOP, id, title, body))
                .setOngoing(true)
                .addAction(0, "נודניק 5 דק׳", TaskAlarmScheduler.actionIntent(this, TaskAlarmScheduler.ACTION_SNOOZE, id, title, body))
                .addAction(0, "כבה", TaskAlarmScheduler.actionIntent(this, TaskAlarmScheduler.ACTION_STOP, id, title, body))
                .build();
    }

    // Silent channel - the service plays the sound and vibration itself.
    private void ensureChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager nm = getSystemService(NotificationManager.class);
        if (nm.getNotificationChannel(CHANNEL_ID) != null) return;
        NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "תזכורת משימה מצלצלת",
                NotificationManager.IMPORTANCE_HIGH);
        channel.setDescription("מצלצל בצלצול טלגרף בעוצמת השעון המעורר, עד שלוחצים כבה או נודניק");
        channel.setSound(null, null);
        channel.enableVibration(false);
        nm.createNotificationChannel(channel);
    }
}
