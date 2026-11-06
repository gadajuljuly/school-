package com.gadajuljuly.itask;

import android.animation.ValueAnimator;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ServiceInfo;
import android.graphics.Color;
import android.graphics.PixelFormat;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.os.IBinder;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.view.animation.DecelerateInterpolator;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

// The ITASK assistant's floating bubble (version 29): a round ITASK mark that
// stays over every app, like a chat head. A tap opens the app on the
// assistant chat (launch view "chat"); dragging moves it, and it settles
// against the nearer side; dragged onto the ✕ that shows at the bottom while
// dragging, it goes away (switched off - the menu brings it back). It hides
// while ITASK itself is on screen. It runs as a foreground service with a
// quiet, ongoing notification so Android doesn't kill it, and needs the same
// "display over other apps" permission as the floating task.
public class ItaskBubbleService extends Service {
    private static final String PREFS = "itask_bubble";
    private static final String KEY_ON = "on", KEY_RIGHT = "right", KEY_Y = "y";
    private static final String CHANNEL = "itask_bubble";
    private static final int NOTIFICATION_ID = 7401;
    private static final String ACTION_HIDE = "com.gadajuljuly.itask.BUBBLE_HIDE";
    private static final String ACTION_APP_VISIBLE = "com.gadajuljuly.itask.BUBBLE_APP_VISIBLE";
    private static final int SIZE_DP = 56;

    private WindowManager wm;
    private FrameLayout bubble;
    private WindowManager.LayoutParams lp;
    private TextView closeTarget;
    private WindowManager.LayoutParams closeLp;
    private boolean appVisible = false;

    private static SharedPreferences prefs(Context c) {
        return c.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }
    static boolean isOn(Context c) {
        return prefs(c).getBoolean(KEY_ON, false);
    }
    static void setOn(Context c, boolean on) {
        prefs(c).edit().putBoolean(KEY_ON, on).apply();
        sync(c);
    }
    // starts or stops the service to match the switch and the permission
    static void sync(Context c) {
        Intent i = new Intent(c, ItaskBubbleService.class);
        if (isOn(c) && ItaskFloatReceiver.canDraw(c)) {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) c.startForegroundService(i);
                else c.startService(i);
            } catch (Exception e) {
                // not allowed to start right now; the next app open retries
            }
        } else {
            c.stopService(i);
        }
    }
    // ITASK came on / went off screen: the bubble hides while the app shows
    static void appVisible(Context c, boolean visible) {
        if (!isOn(c) || !ItaskFloatReceiver.canDraw(c)) return;
        Intent i = new Intent(c, ItaskBubbleService.class).setAction(ACTION_APP_VISIBLE).putExtra("visible", visible);
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) c.startForegroundService(i);
            else c.startService(i);
        } catch (Exception e) {
            // ignore
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        goForeground();
        String action = intent == null ? null : intent.getAction();
        if (ACTION_HIDE.equals(action)) {
            prefs(this).edit().putBoolean(KEY_ON, false).apply();
            stopSelf();
            return START_NOT_STICKY;
        }
        if (!isOn(this) || !ItaskFloatReceiver.canDraw(this)) {
            stopSelf();
            return START_NOT_STICKY;
        }
        if (ACTION_APP_VISIBLE.equals(action)) appVisible = intent.getBooleanExtra("visible", false);
        if (bubble == null) addBubble();
        bubble.setVisibility(appVisible ? View.GONE : View.VISIBLE);
        return START_STICKY;
    }

    private void goForeground() {
        NotificationManager nm = getSystemService(NotificationManager.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && nm.getNotificationChannel(CHANNEL) == null) {
            NotificationChannel ch = new NotificationChannel(CHANNEL, getString(R.string.itask_bubble_channel),
                    NotificationManager.IMPORTANCE_MIN);
            ch.setShowBadge(false);
            nm.createNotificationChannel(ch);
        }
        PendingIntent open = PendingIntent.getActivity(this, 7402, ItaskAlarmPlugin.openAppIntent(this, "chat"),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        PendingIntent hide = PendingIntent.getService(this, 7403,
                new Intent(this, ItaskBubbleService.class).setAction(ACTION_HIDE),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification.Builder b = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                ? new Notification.Builder(this, CHANNEL) : new Notification.Builder(this);
        Notification n = b.setSmallIcon(getApplicationInfo().icon)
                .setContentTitle(getString(R.string.itask_bubble_title))
                .setContentText(getString(R.string.itask_bubble_text))
                .setContentIntent(open)
                .addAction(new Notification.Action.Builder((android.graphics.drawable.Icon) null, getString(R.string.itask_bubble_hide), hide).build())
                .setOngoing(true)
                .setShowWhen(false)
                .build();
        if (Build.VERSION.SDK_INT >= 34) {
            startForeground(NOTIFICATION_ID, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE);
        } else {
            startForeground(NOTIFICATION_ID, n);
        }
    }

    private int dp(float v) {
        return Math.round(v * getResources().getDisplayMetrics().density);
    }
    private int overlayType() {
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                : WindowManager.LayoutParams.TYPE_PHONE;
    }

    private void addBubble() {
        wm = getSystemService(WindowManager.class);
        final int size = dp(SIZE_DP);
        bubble = new FrameLayout(this);
        GradientDrawable circle = new GradientDrawable();
        circle.setShape(GradientDrawable.OVAL);
        circle.setColor(Color.WHITE);
        circle.setStroke(dp(2), 0xFF3D5A3E);
        bubble.setBackground(circle);
        bubble.setElevation(dp(6));
        ImageView mark = new ImageView(this);
        mark.setImageResource(R.drawable.itask_assistant_logo);
        mark.setScaleType(ImageView.ScaleType.FIT_CENTER);
        int pad = dp(7);
        mark.setPadding(pad, pad, pad, pad);
        bubble.addView(mark, new FrameLayout.LayoutParams(size, size));

        lp = new WindowManager.LayoutParams(size, size, overlayType(),
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
                PixelFormat.TRANSLUCENT);
        lp.gravity = Gravity.TOP | Gravity.LEFT;
        final DisplayMetrics dm = getResources().getDisplayMetrics();
        boolean right = prefs(this).getBoolean(KEY_RIGHT, true);
        lp.x = right ? dm.widthPixels - size - dp(4) : dp(4);
        lp.y = prefs(this).getInt(KEY_Y, Math.round(dm.heightPixels * 0.35f));

        bubble.setOnTouchListener(new View.OnTouchListener() {
            float downX, downY;
            int startX, startY;
            boolean dragging;
            long downAt;

            @Override
            public boolean onTouch(View v, MotionEvent e) {
                switch (e.getActionMasked()) {
                    case MotionEvent.ACTION_DOWN:
                        downX = e.getRawX();
                        downY = e.getRawY();
                        startX = lp.x;
                        startY = lp.y;
                        dragging = false;
                        downAt = System.currentTimeMillis();
                        return true;
                    case MotionEvent.ACTION_MOVE:
                        float dx = e.getRawX() - downX, dy = e.getRawY() - downY;
                        if (!dragging && Math.hypot(dx, dy) > dp(8)) {
                            dragging = true;
                            showCloseTarget(true);
                        }
                        if (dragging) {
                            lp.x = startX + Math.round(dx);
                            lp.y = startY + Math.round(dy);
                            wm.updateViewLayout(bubble, lp);
                            highlightClose(overClose(e.getRawX(), e.getRawY()));
                        }
                        return true;
                    case MotionEvent.ACTION_UP:
                    case MotionEvent.ACTION_CANCEL:
                        if (!dragging) {
                            if (e.getActionMasked() == MotionEvent.ACTION_UP && System.currentTimeMillis() - downAt < 600) openChat();
                            return true;
                        }
                        boolean close = overClose(e.getRawX(), e.getRawY());
                        showCloseTarget(false);
                        if (close) {
                            prefs(ItaskBubbleService.this).edit().putBoolean(KEY_ON, false).apply();
                            stopSelf();
                            return true;
                        }
                        settle();
                        return true;
                }
                return false;
            }
        });
        wm.addView(bubble, lp);
    }

    private void openChat() {
        startActivity(ItaskAlarmPlugin.openAppIntent(this, "chat"));
    }

    // against the nearer side, and remembered
    private void settle() {
        DisplayMetrics dm = getResources().getDisplayMetrics();
        int size = dp(SIZE_DP);
        final boolean right = lp.x + size / 2 > dm.widthPixels / 2;
        int target = right ? dm.widthPixels - size - dp(4) : dp(4);
        lp.y = Math.max(dp(24), Math.min(lp.y, dm.heightPixels - size - dp(48)));
        prefs(this).edit().putBoolean(KEY_RIGHT, right).putInt(KEY_Y, lp.y).apply();
        ValueAnimator anim = ValueAnimator.ofInt(lp.x, target);
        anim.setDuration(220);
        anim.setInterpolator(new DecelerateInterpolator());
        anim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator a) {
                if (bubble == null) return;
                lp.x = (Integer) a.getAnimatedValue();
                try { wm.updateViewLayout(bubble, lp); } catch (Exception e) { /* gone */ }
            }
        });
        anim.start();
    }

    private void showCloseTarget(boolean show) {
        if (show) {
            if (closeTarget != null) return;
            closeTarget = new TextView(this);
            closeTarget.setText("✕");
            closeTarget.setTextColor(Color.WHITE);
            closeTarget.setTextSize(22);
            closeTarget.setGravity(Gravity.CENTER);
            GradientDrawable c = new GradientDrawable();
            c.setShape(GradientDrawable.OVAL);
            c.setColor(0xCC333333);
            closeTarget.setBackground(c);
            int s = dp(60);
            closeLp = new WindowManager.LayoutParams(s, s, overlayType(),
                    WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE,
                    PixelFormat.TRANSLUCENT);
            closeLp.gravity = Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL;
            closeLp.y = dp(48);
            try { wm.addView(closeTarget, closeLp); } catch (Exception e) { closeTarget = null; }
        } else if (closeTarget != null) {
            try { wm.removeView(closeTarget); } catch (Exception e) { /* gone */ }
            closeTarget = null;
        }
    }
    private void highlightClose(boolean over) {
        if (closeTarget == null) return;
        closeTarget.setScaleX(over ? 1.25f : 1f);
        closeTarget.setScaleY(over ? 1.25f : 1f);
    }
    // the finger is over the ✕ (bottom centre)
    private boolean overClose(float rawX, float rawY) {
        DisplayMetrics dm = getResources().getDisplayMetrics();
        float cx = dm.widthPixels / 2f, cy = dm.heightPixels - dp(48) - dp(30);
        return Math.hypot(rawX - cx, rawY - cy) < dp(70);
    }

    @Override
    public void onDestroy() {
        showCloseTarget(false);
        if (bubble != null) {
            try { wm.removeView(bubble); } catch (Exception e) { /* gone */ }
            bubble = null;
        }
        super.onDestroy();
    }
}
