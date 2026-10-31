package com.gadajuljuly.itask;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ServiceInfo;
import android.media.AudioAttributes;
import android.media.MediaPlayer;
import android.media.VolumeProvider;
import android.media.session.MediaSession;
import android.media.session.PlaybackState;
import android.net.Uri;
import android.os.SystemClock;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.VibrationEffect;
import android.os.Vibrator;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

// Plays a ringing reminder the way an alarm clock does: a soft 1.5-second
// "ding-dong" with a double buzz every CHIME_INTERVAL_MS, on the alarm
// stream (alarm volume, heard even when the phone is on vibrate/silent),
// until "כבה"/"נודניק". The service itself may only run a few minutes
// (shortService), so after RING_MS it hands over to an exact alarm that
// starts it again moments later - the chiming just carries on until it's
// turned off. Like an alarm clock, a side button while it rings snoozes it
// for 5 minutes: volume up/down, or power pressed to turn the screen OFF -
// not the screen coming ON (that's someone picking the phone up to press
// "כבה", which used to snooze it from under their finger). Its
// notification, "כבה" included, shows on the lock screen too. A short
// foreground service, because a broadcast receiver can't keep a player
// alive; starting it from an exact alarm is allowed.
public class TaskAlarmRingingService extends Service {
    private static final String ACTION_START = "com.gadajuljuly.itask.RING_START";
    private static final String CHANNEL_ID = "task_alarm_ringing";
    private static final long RING_MS = 2 * 60 * 1000L; // inside shortService's 3-minute limit
    private static final long CHIME_INTERVAL_MS = 10 * 1000L;
    // the alarm itself may light the screen up as it starts - not a button press
    private static final long BUTTON_GRACE_MS = 2000L;

    private static String ringingId = null;

    private MediaPlayer player;
    private Vibrator vibrator;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable timeout = this::continueAfterServiceLimit;
    private final Runnable chime = this::chime;
    private AudioAttributes alarmAudio;
    private String ringingTitle = "";
    private String ringingBody = "";
    private long ringStartedAt = 0;
    private MediaSession volumeKeys;
    private BroadcastReceiver powerKey;

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
        ringingTitle = title != null ? title : "";
        ringingBody = body != null ? body : "";
        Notification n = buildNotification(id, title != null ? title : "", body != null ? body : "");
        if (Build.VERSION.SDK_INT >= 34) {
            startForeground(id.hashCode(), n, ServiceInfo.FOREGROUND_SERVICE_TYPE_SHORT_SERVICE);
        } else {
            startForeground(id.hashCode(), n);
        }
        startSound();
        listenForSideButtons();
        handler.removeCallbacks(timeout);
        handler.postDelayed(timeout, RING_MS);
        return START_NOT_STICKY;
    }

    // shortService ran out of time (Android 14+)
    @Override
    public void onTimeout(int startId, int fgsType) {
        continueAfterServiceLimit();
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

    // Still unanswered when this run of the service has to end: re-arm the
    // same reminder for the next chime slot, so it keeps going until "כבה".
    private void continueAfterServiceLimit() {
        String id = ringingId;
        if (id == null) {
            stopSelf();
            return;
        }
        TaskAlarmScheduler.snoozeFor(this, id, ringingTitle, ringingBody, CHIME_INTERVAL_MS);
    }

    private void startSound() {
        alarmAudio = new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_ALARM)
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build();
        try {
            player = new MediaPlayer();
            player.setAudioAttributes(alarmAudio);
            player.setDataSource(this, Uri.parse("android.resource://" + getPackageName() + "/raw/task_alarm_dingdong"));
            player.prepare();
        } catch (Exception e) {
            if (player != null) player.release();
            player = null;
        }
        vibrator = getSystemService(Vibrator.class);
        chime();
    }

    // One "ding-dong" + double buzz, then again in CHIME_INTERVAL_MS.
    private void chime() {
        if (player != null) {
            try {
                player.seekTo(0);
                player.start();
            } catch (IllegalStateException ignored) {
            }
        }
        if (vibrator != null && vibrator.hasVibrator() && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            vibrator.vibrate(VibrationEffect.createWaveform(TaskAlarmScheduler.DING_DONG_VIBRATION, -1), alarmAudio);
        }
        handler.removeCallbacks(chime);
        handler.postDelayed(chime, CHIME_INTERVAL_MS);
    }

    // Power button: the screen turning off (not on - see above). Volume buttons: an active
    // media session with its own (remote) volume control receives the volume
    // keys even from the lock screen, instead of them changing a volume.
    private void listenForSideButtons() {
        ringStartedAt = SystemClock.elapsedRealtime();
        if (powerKey == null) {
            powerKey = new BroadcastReceiver() {
                @Override
                public void onReceive(Context context, Intent intent) {
                    snoozeFromButton();
                }
            };
            IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_OFF);
            if (Build.VERSION.SDK_INT >= 33) {
                registerReceiver(powerKey, filter, Context.RECEIVER_NOT_EXPORTED);
            } else {
                registerReceiver(powerKey, filter);
            }
        }
        if (volumeKeys == null) {
            volumeKeys = new MediaSession(this, "itask-alarm");
            volumeKeys.setPlaybackToRemote(new VolumeProvider(VolumeProvider.VOLUME_CONTROL_RELATIVE, 10, 5) {
                @Override
                public void onAdjustVolume(int direction) {
                    snoozeFromButton();
                }
            });
            volumeKeys.setPlaybackState(new PlaybackState.Builder()
                    .setState(PlaybackState.STATE_PLAYING, 0, 1f)
                    .build());
            volumeKeys.setActive(true);
        }
    }

    private void stopListeningForSideButtons() {
        if (powerKey != null) {
            try { unregisterReceiver(powerKey); } catch (IllegalArgumentException ignored) {}
            powerKey = null;
        }
        if (volumeKeys != null) {
            volumeKeys.setActive(false);
            volumeKeys.release();
            volumeKeys = null;
        }
    }

    private void snoozeFromButton() {
        String id = ringingId;
        if (id == null || SystemClock.elapsedRealtime() - ringStartedAt < BUTTON_GRACE_MS) return;
        TaskAlarmScheduler.snooze(this, id, ringingTitle, ringingBody);
    }

    private void stopSound() {
        stopListeningForSideButtons();
        handler.removeCallbacks(chime);
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
        PendingIntent open = TaskAlarmScheduler.openFor(this, id);
        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
                .setContentTitle(title)
                .setContentText(body)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(body))
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setCategory(NotificationCompat.CATEGORY_ALARM)
                .setContentIntent(open)
                .setDeleteIntent(TaskAlarmScheduler.actionIntent(this, TaskAlarmScheduler.ACTION_STOP, id, title, body))
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
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
