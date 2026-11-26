package com.gadajuljuly.itask;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.PixelFormat;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.os.PowerManager;
import android.provider.Settings;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.style.ForegroundColorSpan;
import android.text.style.StyleSpan;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ValueAnimator;
import android.view.animation.LinearInterpolator;
import com.airbnb.lottie.LottieAnimationView;
import com.airbnb.lottie.LottieDrawable;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

// The floating task (version 25): round the clock - every quarter hour (now 10 minutes) from
// 06:00 to 18:00 (every 10 minutes since version 36), every half hour through the evening and night - a small bar - "project: task" - shows over whatever is on screen: since
// version 35 a construction machine (a Lottie animation: loader, roller,
// excavator - a different one each time) drives slowly across the screen
// from right to left in 12 seconds (version 36), pulling the bar behind it on a chain. Each time it's the next open task (today's and
// earlier) of the next project, round and round: the 1st task of every
// project, then the 2nd of every project... It reads the same open-tasks
// list the home-screen widget gets from the app (ItaskWidgetProvider), and
// needs Android's "display over other apps" permission (asked for once by
// the app). Nothing open, the screen off, or switched off in the menu:
// nothing shows. Tapping it opens that task.
public class ItaskFloatReceiver extends BroadcastReceiver {
    private static final String PREFS = "itask_float";
    private static final String KEY_ON = "on";
    private static final String KEY_LAST = "lastTask";
    private static final int DAY_FROM = 6, DAY_TO = 18; // every 10 minutes; else every 30
    private static final long CROSS_MS = 12000; // right edge to left edge, one slow steady drive
    private static final String KEY_LAST_VEHICLE = "lastVehicle";
    private static final String[] VEHICLES = { "lottie/itask_loader.json", "lottie/itask_roller.json", "lottie/itask_excavator.json", "lottie/itask_worker.json" };
    private static final int REQUEST_CODE = 7301;

    private static SharedPreferences prefs(Context c) {
        return c.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }
    static boolean isOn(Context c) {
        return prefs(c).getBoolean(KEY_ON, true);
    }
    static void setOn(Context c, boolean on) {
        prefs(c).edit().putBoolean(KEY_ON, on).apply();
        schedule(c);
    }
    static boolean canDraw(Context c) {
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.canDrawOverlays(c);
    }

    // the next quarter hour from 06:00 to 18:00; out of those hours, the
    // next half hour
    static long nextTime(long now) {
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(now);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        cal.add(Calendar.MINUTE, 10 - cal.get(Calendar.MINUTE) % 10);
        // the evening and night: on the half hours only
        for (int i = 0; i < 3; i++) {
            int h = cal.get(Calendar.HOUR_OF_DAY), m = cal.get(Calendar.MINUTE);
            boolean day = h >= DAY_FROM && (h < DAY_TO || (h == DAY_TO && m == 0));
            if (day || m % 30 == 0) break;
            cal.add(Calendar.MINUTE, 10);
        }
        return cal.getTimeInMillis();
    }

    static void schedule(Context c) {
        AlarmManager am = c.getSystemService(AlarmManager.class);
        PendingIntent fire = PendingIntent.getBroadcast(c, REQUEST_CODE, new Intent(c, ItaskFloatReceiver.class),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        am.cancel(fire);
        if (!isOn(c)) return;
        long at = nextTime(System.currentTimeMillis());
        if (TaskAlarmScheduler.canScheduleExact(c)) {
            try {
                am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, fire);
                return;
            } catch (SecurityException e) {
                // falls through to the inexact one
            }
        }
        am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, fire);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        Context c = context.getApplicationContext();
        schedule(c); // the next one
        if (!isOn(c)) return;
        PowerManager pm = c.getSystemService(PowerManager.class);
        android.app.KeyguardManager km = c.getSystemService(android.app.KeyguardManager.class);
        boolean screenOff = pm != null && !pm.isInteractive();
        boolean locked = km != null && km.isKeyguardLocked();
        // the screen off or locked (an overlay can't show there): a quiet
        // notification instead, like a WhatsApp message - shown on the lock
        // screen and the always-on display (version 36)
        if (screenOff || locked) {
            String[] task = nextTask(c);
            if (task != null) showLockScreen(c, task);
            return;
        }
        if (!canDraw(c)) return;
        // the screen is on again: the lock-screen notice has done its job
        android.app.NotificationManager nm = c.getSystemService(android.app.NotificationManager.class);
        if (nm != null) nm.cancel(LOCK_NOTICE_ID);
        String[] task = nextTask(c);
        if (task == null) return;
        show(c, task, goAsync());
    }

    // the screen off or locked: the task as a notification - one at a time
    // (each replaces the last), a heads-up one (drops in from the top for a
    // few seconds, like WhatsApp's) but with no sound, gone before the next, on the lock
    // screen and the always-on display; tapping it opens the task
    private static final String LOCK_CHANNEL_ID = "itask_float_lock";
    private static final int LOCK_NOTICE_ID = 7302;
    private static void showLockScreen(Context c, String[] task) {
        if (Build.VERSION.SDK_INT >= 33 &&
                c.checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
            return;
        }
        android.app.NotificationManager nm = c.getSystemService(android.app.NotificationManager.class);
        if (nm == null) return;
        if (Build.VERSION.SDK_INT >= 26 && nm.getNotificationChannel(LOCK_CHANNEL_ID) == null) {
            android.app.NotificationChannel ch = new android.app.NotificationChannel(LOCK_CHANNEL_ID, "משימה צפה (מסך כבוי)",
                    android.app.NotificationManager.IMPORTANCE_HIGH);
            ch.setDescription("כשהמסך כבוי או נעול: המשימה הבאה, בשקט, על מסך הנעילה ובמסך הכבוי");
            ch.setSound(null, null);
            ch.enableVibration(false);
            ch.setLockscreenVisibility(android.app.Notification.VISIBILITY_PUBLIC);
            nm.createNotificationChannel(ch);
        }
        PendingIntent open = PendingIntent.getActivity(c, LOCK_NOTICE_ID, ItaskAlarmPlugin.openAppIntent(c, task[2]),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        androidx.core.app.NotificationCompat.Builder b = new androidx.core.app.NotificationCompat.Builder(c, LOCK_CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_menu_agenda)
                .setContentTitle(task[0])
                .setContentText(task[1])
                .setStyle(new androidx.core.app.NotificationCompat.BigTextStyle().bigText(task[1]))
                .setPriority(androidx.core.app.NotificationCompat.PRIORITY_HIGH)
                .setCategory(androidx.core.app.NotificationCompat.CATEGORY_REMINDER)
                .setVisibility(androidx.core.app.NotificationCompat.VISIBILITY_PUBLIC)
                .setSound(null)
                .setVibrate(null)
                .setOnlyAlertOnce(true)
                .setTimeoutAfter(9 * 60 * 1000L)
                .setContentIntent(open)
                .setAutoCancel(true);
        nm.notify(LOCK_NOTICE_ID, b.build());
    }

    // the worker pulls the card on a rope he holds at chest height: the rope
    // goes on from his hands (the canvas's 256 x 256, at 84dp, from 21dp
    // down), and the card hangs higher than behind a machine
    private static void pullWithRope(Context c, View view) {
        float dp = c.getResources().getDisplayMetrics().density;
        View rope = view.findViewById(R.id.itask_float_chain);
        rope.setBackgroundResource(R.drawable.itask_float_rope);
        android.widget.LinearLayout.LayoutParams rl = (android.widget.LinearLayout.LayoutParams) rope.getLayoutParams();
        rl.setMarginStart(Math.round(-23 * dp));
        rl.topMargin = Math.round(14 * dp);
        rope.setLayoutParams(rl);
        View card = view.findViewById(R.id.itask_float_card);
        android.widget.LinearLayout.LayoutParams cl = (android.widget.LinearLayout.LayoutParams) card.getLayoutParams();
        cl.topMargin = Math.round(14 * dp);
        card.setLayoutParams(cl);
    }

    // { project, task text, launch view, task id } - the one after the last shown
    static String[] nextTask(Context c) {
        JSONArray projects = ItaskWidgetProvider.loadData(c).optJSONArray("projects");
        if (projects == null) return null;
        String today = new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(new Date());
        List<List<String[]>> byProject = new ArrayList<>();
        int longest = 0;
        for (int p = 0; p < projects.length(); p++) {
            JSONObject project = projects.optJSONObject(p);
            JSONArray tasks = project == null ? null : project.optJSONArray("tasks");
            if (tasks == null) continue;
            List<String[]> open = new ArrayList<>();
            for (int t = 0; t < tasks.length(); t++) {
                JSONObject task = tasks.optJSONObject(t);
                if (task == null || task.optInt("status") == 2) continue;
                String date = task.optString("date", "");
                String text = task.optString("text", "").trim();
                if (text.isEmpty() || date.compareTo(today) > 0) continue;
                String id = task.optString("id");
                open.add(new String[] { project.optString("name"), text,
                        "task|" + project.optString("id") + "|" + date + "|" + id, id });
            }
            if (open.isEmpty()) continue;
            byProject.add(open);
            longest = Math.max(longest, open.size());
        }
        List<String[]> round = new ArrayList<>();
        for (int k = 0; k < longest; k++) {
            for (List<String[]> open : byProject) if (k < open.size()) round.add(open.get(k));
        }
        if (round.isEmpty()) return null;
        String last = prefs(c).getString(KEY_LAST, "");
        int next = 0;
        for (int i = 0; i < round.size(); i++) {
            if (round.get(i)[3].equals(last)) { next = (i + 1) % round.size(); break; }
        }
        String[] task = round.get(next);
        prefs(c).edit().putString(KEY_LAST, task[3]).apply();
        return task;
    }

    private static void show(final Context c, final String[] task, final PendingResult pending) {
        final WindowManager wm = c.getSystemService(WindowManager.class);
        final View view = LayoutInflater.from(c).inflate(R.layout.itask_float, null);
        SpannableStringBuilder line = new SpannableStringBuilder(task[0] + ": ");
        line.setSpan(new ForegroundColorSpan(0xFF35618F), 0, line.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        line.append(task[1]);
        line.setSpan(new StyleSpan(Typeface.BOLD), 0, line.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        ((TextView) view.findViewById(R.id.itask_float_text)).setText(line);

        // the machine: a different one from last time
        final LottieAnimationView vehicle = (LottieAnimationView) view.findViewById(R.id.itask_float_vehicle);
        try {
            String last = prefs(c).getString(KEY_LAST_VEHICLE, "");
            List<String> choices = new ArrayList<>();
            for (String v : VEHICLES) if (!v.equals(last)) choices.add(v);
            String pick = choices.get((int) (Math.random() * choices.size()));
            prefs(c).edit().putString(KEY_LAST_VEHICLE, pick).apply();
            vehicle.setAnimation(pick);
            if (pick.contains("worker")) pullWithRope(c, view);
            vehicle.setRepeatCount(LottieDrawable.INFINITE);
            vehicle.playAnimation();
        } catch (Throwable t) {
            // no machine (the animation couldn't load): the bar alone
            vehicle.setVisibility(View.GONE);
            view.findViewById(R.id.itask_float_chain).setVisibility(View.GONE);
        }

        int type = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                : WindowManager.LayoutParams.TYPE_PHONE;
        // the window is only as big as the machine and the bar (touches
        // elsewhere go on to the app below), and it itself drives across
        final WindowManager.LayoutParams lp = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT, WindowManager.LayoutParams.WRAP_CONTENT, type,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN
                        | WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
                PixelFormat.TRANSLUCENT);
        lp.gravity = Gravity.TOP | Gravity.LEFT;
        float dp = c.getResources().getDisplayMetrics().density;
        final int screenW = c.getResources().getDisplayMetrics().widthPixels;
        lp.x = screenW; // off the right edge to start
        lp.y = Math.round(24 * dp);

        final boolean[] gone = { false };
        final ValueAnimator[] drive = { null };
        final Runnable remove = new Runnable() {
            @Override
            public void run() {
                if (gone[0]) return;
                gone[0] = true;
                if (drive[0] != null) drive[0].cancel();
                vehicle.cancelAnimation();
                try { wm.removeView(view); } catch (Exception e) { /* already gone */ }
                pending.finish();
            }
        };
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                remove.run();
                c.startActivity(ItaskAlarmPlugin.openAppIntent(c, task[2]));
            }
        });
        try {
            wm.addView(view, lp);
        } catch (Exception e) {
            pending.finish();
            return;
        }
        // once measured: from just off the right edge to just off the left one, steadily
        view.post(new Runnable() {
            @Override
            public void run() {
                if (gone[0]) return;
                int w = view.getWidth();
                ValueAnimator a = ValueAnimator.ofInt(screenW, -w);
                a.setDuration(CROSS_MS);
                a.setInterpolator(new LinearInterpolator());
                a.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                    @Override
                    public void onAnimationUpdate(ValueAnimator va) {
                        if (gone[0]) return;
                        lp.x = (Integer) va.getAnimatedValue();
                        try { wm.updateViewLayout(view, lp); } catch (Exception e) { /* gone */ }
                    }
                });
                a.addListener(new AnimatorListenerAdapter() {
                    @Override
                    public void onAnimationEnd(Animator animation) { remove.run(); }
                });
                drive[0] = a;
                a.start();
            }
        });
        // in any case: gone a little after the drive
        new Handler(Looper.getMainLooper()).postDelayed(remove, CROSS_MS + 1500);
    }
}
