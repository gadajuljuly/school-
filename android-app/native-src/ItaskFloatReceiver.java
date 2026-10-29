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
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

// The floating task (version 25): every quarter hour from 06:00 to 18:00 a
// small bar - "project: task" - shows over whatever is on screen for 8
// seconds, then goes. Each time it's the next open task (today's and
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
    private static final int FIRST_HOUR = 6, LAST_HOUR = 18;
    private static final long SHOW_MS = 8000;
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

    // the next quarter hour from 06:00 to 18:00
    static long nextTime(long now) {
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(now);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        cal.add(Calendar.MINUTE, 15 - cal.get(Calendar.MINUTE) % 15);
        int h = cal.get(Calendar.HOUR_OF_DAY);
        if (h < FIRST_HOUR || h > LAST_HOUR || (h == LAST_HOUR && cal.get(Calendar.MINUTE) > 0)) {
            if (h >= FIRST_HOUR) cal.add(Calendar.DAY_OF_MONTH, 1);
            cal.set(Calendar.HOUR_OF_DAY, FIRST_HOUR);
            cal.set(Calendar.MINUTE, 0);
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
        if (!isOn(c) || !canDraw(c)) return;
        PowerManager pm = c.getSystemService(PowerManager.class);
        if (pm != null && !pm.isInteractive()) return;
        String[] task = nextTask(c);
        if (task == null) return;
        show(c, task, goAsync());
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

        int type = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                : WindowManager.LayoutParams.TYPE_PHONE;
        WindowManager.LayoutParams lp = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT, WindowManager.LayoutParams.WRAP_CONTENT, type,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
                PixelFormat.TRANSLUCENT);
        lp.gravity = Gravity.TOP | Gravity.RIGHT;
        float dp = c.getResources().getDisplayMetrics().density;
        lp.x = Math.round(6 * dp);
        lp.y = Math.round(30 * dp);

        final boolean[] gone = { false };
        final Runnable remove = new Runnable() {
            @Override
            public void run() {
                if (gone[0]) return;
                gone[0] = true;
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
        new Handler(Looper.getMainLooper()).postDelayed(remove, SHOW_MS);
    }
}
