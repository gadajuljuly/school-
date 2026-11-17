package com.gadajuljuly.itask;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.DashPathEffect;
import android.graphics.Paint;
import android.graphics.RectF;
import android.graphics.Typeface;
import android.opengl.GLES11Ext;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.opengl.Matrix;
import android.os.Build;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.ar.core.Anchor;
import com.google.ar.core.ArCoreApk;
import com.google.ar.core.Camera;
import com.google.ar.core.Config;
import com.google.ar.core.Coordinates2d;
import com.google.ar.core.DepthPoint;
import com.google.ar.core.Frame;
import com.google.ar.core.HitResult;
import com.google.ar.core.Plane;
import com.google.ar.core.Point;
import com.google.ar.core.Pose;
import com.google.ar.core.Session;
import com.google.ar.core.Trackable;
import com.google.ar.core.TrackingState;
import com.google.ar.core.exceptions.CameraNotAvailableException;
import com.google.ar.core.exceptions.UnavailableUserDeclinedInstallationException;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.util.ArrayList;
import java.util.List;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

// The camera tape (version 33, ItaskAlarmPlugin.measureAR): ARCore finds the
// floor / walls / things in the camera; a cross in the middle of the screen
// shows where a point would go; ⊕ puts one there, the next ⊕ draws the line
// from it with its length, and so on; "קו חדש" starts another line. ✓ hands
// the measured lengths back to the page. The camera picture is drawn with
// OpenGL (ARCore needs it); the points, lines and lengths on a plain view
// above it.
public class ItaskMeasureActivity extends Activity implements GLSurfaceView.Renderer {
    public static final String EXTRA_LINES = "lines";
    private static final int CAMERA_REQUEST = 7301;

    private GLSurfaceView surface;
    private Overlay overlay;
    private TextView status;
    private Session session;
    private boolean installRequested;
    private boolean he = true;

    // the measured lines: each a list of anchors (touched on the GL thread only)
    private final List<List<Anchor>> chains = new ArrayList<>();
    private volatile boolean addRequested, undoRequested, newLineRequested;
    private volatile boolean viewportChanged;
    private int viewW, viewH;

    // camera picture
    private int cameraTexture = -1, bgProgram, bgPos, bgTex;
    private FloatBuffer quadPos, quadTex;
    private static final float[] QUAD = { -1f, -1f, 1f, -1f, -1f, 1f, 1f, 1f };

    private final float[] proj = new float[16], view = new float[16], vp = new float[16];

    // what the overlay draws (made on the GL thread, drawn on the UI thread)
    static class Snapshot {
        List<float[]> points = new ArrayList<>();      // x, y on screen (NaN: behind)
        List<float[]> segments = new ArrayList<>();    // x1, y1, x2, y2, metres
        float[] live;                                  // x1, y1, x2, y2, metres (last point -> the cross)
        boolean aim;                                   // the cross is on something
        boolean tracking;
    }
    private volatile Snapshot snap = new Snapshot();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String lang = getIntent().getStringExtra("lang");
        he = lang == null || lang.equals("he");
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.BLACK);
        surface = new GLSurfaceView(this);
        surface.setPreserveEGLContextOnPause(true);
        surface.setEGLContextClientVersion(2);
        surface.setEGLConfigChooser(8, 8, 8, 8, 16, 0);
        surface.setRenderer(this);
        surface.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
        root.addView(surface, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        overlay = new Overlay();
        root.addView(overlay, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

        // top: ✕ and ✓, the status between them
        LinearLayout top = new LinearLayout(this);
        top.setOrientation(LinearLayout.HORIZONTAL);
        top.setGravity(Gravity.CENTER_VERTICAL);
        int pad = dp(12);
        top.setPadding(pad, dp(36), pad, pad);
        Button close = pill("✕", false);
        close.setOnClickListener(v -> finishWithLines(false));
        status = new TextView(this);
        status.setTextColor(Color.WHITE);
        status.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        status.setGravity(Gravity.CENTER);
        status.setShadowLayer(4, 0, 1, Color.BLACK);
        Button done = pill(he ? "✓ סיום" : "✓ Done", true);
        done.setOnClickListener(v -> finishWithLines(true));
        LinearLayout.LayoutParams mid = new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
        // right to left in Hebrew: ✓ on the right... keep ✕ at the start side
        top.addView(close);
        top.addView(status, mid);
        top.addView(done);
        root.addView(top, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.TOP));

        // bottom: ↶, the big ⊕, a new line
        LinearLayout bottom = new LinearLayout(this);
        bottom.setOrientation(LinearLayout.HORIZONTAL);
        bottom.setGravity(Gravity.CENTER);
        bottom.setPadding(pad, pad, pad, dp(40));
        Button undo = pill(he ? "↶ ביטול" : "↶ Undo", false);
        undo.setOnClickListener(v -> undoRequested = true);
        Button add = new Button(this);
        add.setText("+");
        add.setTextSize(TypedValue.COMPLEX_UNIT_SP, 34);
        add.setTextColor(Color.parseColor("#2c2a24"));
        add.setTypeface(Typeface.DEFAULT_BOLD);
        add.setPadding(0, 0, 0, 0);
        android.graphics.drawable.GradientDrawable addBg = new android.graphics.drawable.GradientDrawable();
        addBg.setShape(android.graphics.drawable.GradientDrawable.OVAL);
        addBg.setColor(Color.WHITE);
        addBg.setStroke(dp(4), Color.parseColor("#ffd23f"));
        add.setBackground(addBg);
        add.setOnClickListener(v -> addRequested = true);
        LinearLayout.LayoutParams addLp = new LinearLayout.LayoutParams(dp(78), dp(78));
        addLp.setMargins(dp(22), 0, dp(22), 0);
        Button newLine = pill(he ? "קו חדש" : "New line", false);
        newLine.setOnClickListener(v -> newLineRequested = true);
        bottom.addView(undo);
        bottom.addView(add, addLp);
        bottom.addView(newLine);
        root.addView(bottom, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.BOTTOM));

        setContentView(root);
        setStatus(he ? "מזיזים את הטלפון לאט כדי לזהות את המשטח" : "Move the phone slowly to find the surface");
    }

    private Button pill(String text, boolean primary) {
        Button b = new Button(this);
        b.setText(text);
        b.setAllCaps(false);
        b.setTextSize(TypedValue.COMPLEX_UNIT_SP, 15);
        b.setTypeface(Typeface.DEFAULT_BOLD);
        b.setTextColor(primary ? Color.WHITE : Color.parseColor("#2c2a24"));
        android.graphics.drawable.GradientDrawable bg = new android.graphics.drawable.GradientDrawable();
        bg.setCornerRadius(dp(22));
        bg.setColor(primary ? Color.parseColor("#2f5d8a") : Color.parseColor("#F2FFFFFF"));
        b.setBackground(bg);
        b.setPadding(dp(16), dp(8), dp(16), dp(8));
        b.setMinHeight(dp(44));
        b.setMinimumHeight(dp(44));
        return b;
    }

    private int dp(float v) { return Math.round(v * getResources().getDisplayMetrics().density); }

    private void setStatus(final String text) {
        runOnUiThread(() -> status.setText(text));
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (session == null) {
            try {
                ArCoreApk.InstallStatus st = ArCoreApk.getInstance().requestInstall(this, !installRequested);
                if (st == ArCoreApk.InstallStatus.INSTALL_REQUESTED) { installRequested = true; return; }
                if (checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                    requestPermissions(new String[] { Manifest.permission.CAMERA }, CAMERA_REQUEST);
                    return;
                }
                session = new Session(this);
                Config config = new Config(session);
                config.setPlaneFindingMode(Config.PlaneFindingMode.HORIZONTAL_AND_VERTICAL);
                config.setFocusMode(Config.FocusMode.AUTO);
                config.setUpdateMode(Config.UpdateMode.LATEST_CAMERA_IMAGE);
                if (session.isDepthModeSupported(Config.DepthMode.AUTOMATIC)) config.setDepthMode(Config.DepthMode.AUTOMATIC);
                session.configure(config);
            } catch (UnavailableUserDeclinedInstallationException e) {
                fail(he ? "צריך את Google Play Services for AR כדי למדוד" : "Google Play Services for AR is needed");
                return;
            } catch (Exception e) {
                failUnsupported();
                return;
            }
        }
        try {
            session.resume();
        } catch (CameraNotAvailableException e) {
            fail(he ? "המצלמה תפוסה. סגרו אפליקציות אחרות ונסו שוב." : "The camera is busy.");
            session = null;
            return;
        }
        surface.onResume();
        viewportChanged = true;
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (session != null) {
            surface.onPause();
            session.pause();
        }
    }

    @Override
    protected void onDestroy() {
        if (session != null) { session.close(); session = null; }
        super.onDestroy();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] results) {
        super.onRequestPermissionsResult(requestCode, permissions, results);
        if (requestCode != CAMERA_REQUEST) return;
        if (results.length == 0 || results[0] != PackageManager.PERMISSION_GRANTED) {
            fail(he ? "צריך אישור למצלמה כדי למדוד" : "Camera permission is needed");
        }
        // granted: onResume runs again and starts
    }

    private void fail(String text) {
        Toast.makeText(this, text, Toast.LENGTH_LONG).show();
        setResult(RESULT_CANCELED);
        finish();
    }

    private void failUnsupported() {
        Intent out = new Intent();
        out.putExtra("unsupported", true);
        setResult(RESULT_OK, out);
        finish();
    }

    // ---- the GL thread ---------------------------------------------------------------------
    @Override
    public void onSurfaceCreated(GL10 gl, EGLConfig config) {
        GLES20.glClearColor(0f, 0f, 0f, 1f);
        int[] t = new int[1];
        GLES20.glGenTextures(1, t, 0);
        cameraTexture = t[0];
        GLES20.glBindTexture(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, cameraTexture);
        GLES20.glTexParameteri(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, GLES20.GL_TEXTURE_WRAP_S, GLES20.GL_CLAMP_TO_EDGE);
        GLES20.glTexParameteri(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, GLES20.GL_TEXTURE_WRAP_T, GLES20.GL_CLAMP_TO_EDGE);
        GLES20.glTexParameteri(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, GLES20.GL_TEXTURE_MIN_FILTER, GLES20.GL_LINEAR);
        GLES20.glTexParameteri(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, GLES20.GL_TEXTURE_MAG_FILTER, GLES20.GL_LINEAR);
        String vs = "attribute vec4 a_Position; attribute vec2 a_TexCoord; varying vec2 v_TexCoord;"
                + "void main() { gl_Position = a_Position; v_TexCoord = a_TexCoord; }";
        String fs = "#extension GL_OES_EGL_image_external : require\n"
                + "precision mediump float; varying vec2 v_TexCoord; uniform samplerExternalOES sTexture;"
                + "void main() { gl_FragColor = texture2D(sTexture, v_TexCoord); }";
        bgProgram = GLES20.glCreateProgram();
        GLES20.glAttachShader(bgProgram, shader(GLES20.GL_VERTEX_SHADER, vs));
        GLES20.glAttachShader(bgProgram, shader(GLES20.GL_FRAGMENT_SHADER, fs));
        GLES20.glLinkProgram(bgProgram);
        bgPos = GLES20.glGetAttribLocation(bgProgram, "a_Position");
        bgTex = GLES20.glGetAttribLocation(bgProgram, "a_TexCoord");
        quadPos = ByteBuffer.allocateDirect(QUAD.length * 4).order(ByteOrder.nativeOrder()).asFloatBuffer();
        quadPos.put(QUAD).position(0);
        quadTex = ByteBuffer.allocateDirect(QUAD.length * 4).order(ByteOrder.nativeOrder()).asFloatBuffer();
    }

    private static int shader(int type, String code) {
        int s = GLES20.glCreateShader(type);
        GLES20.glShaderSource(s, code);
        GLES20.glCompileShader(s);
        return s;
    }

    @Override
    public void onSurfaceChanged(GL10 gl, int width, int height) {
        GLES20.glViewport(0, 0, width, height);
        viewW = width;
        viewH = height;
        viewportChanged = true;
    }

    @Override
    public void onDrawFrame(GL10 gl) {
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
        Session s = session;
        if (s == null || cameraTexture < 0) return;
        if (viewportChanged) {
            int rotation = Build.VERSION.SDK_INT >= 30 ? getDisplay().getRotation() : getWindowManager().getDefaultDisplay().getRotation();
            s.setDisplayGeometry(rotation, viewW, viewH);
            viewportChanged = false;
        }
        s.setCameraTextureName(cameraTexture);
        Frame frame;
        try {
            frame = s.update();
        } catch (Exception e) {
            return;
        }
        drawBackground(frame);

        Camera camera = frame.getCamera();
        Snapshot next = new Snapshot();
        next.tracking = camera.getTrackingState() == TrackingState.TRACKING;

        // undo / a new line (whatever the tracking)
        if (undoRequested) {
            undoRequested = false;
            if (!chains.isEmpty()) {
                List<Anchor> last = chains.get(chains.size() - 1);
                if (!last.isEmpty()) last.remove(last.size() - 1).detach();
                if (last.isEmpty()) chains.remove(chains.size() - 1);
            }
        }
        if (newLineRequested) {
            newLineRequested = false;
            if (!chains.isEmpty() && !chains.get(chains.size() - 1).isEmpty()) chains.add(new ArrayList<>());
        }

        if (!next.tracking) {
            setStatus(he ? "מזיזים את הטלפון לאט כדי לזהות את המשטח" : "Move the phone slowly to find the surface");
            addRequested = false;
            snap = next;
            overlay.postInvalidate();
            return;
        }
        camera.getProjectionMatrix(proj, 0, 0.05f, 100f);
        camera.getViewMatrix(view, 0);
        Matrix.multiplyMM(vp, 0, proj, 0, view, 0);

        // what the cross in the middle is on
        HitResult aim = null;
        List<HitResult> hits = frame.hitTest(viewW / 2f, viewH / 2f);
        if (hits != null) {
            for (HitResult h : hits) {
                Trackable t = h.getTrackable();
                if ((t instanceof Plane && ((Plane) t).isPoseInPolygon(h.getHitPose()))
                        || t instanceof DepthPoint
                        || (t instanceof Point && ((Point) t).getOrientationMode() == Point.OrientationMode.ESTIMATED_SURFACE_NORMAL)) {
                    aim = h;
                    break;
                }
            }
        }
        next.aim = aim != null;
        if (addRequested) {
            addRequested = false;
            if (aim != null) {
                if (chains.isEmpty()) chains.add(new ArrayList<>());
                chains.get(chains.size() - 1).add(aim.createAnchor());
            }
        }

        // to the screen
        for (List<Anchor> chain : chains) {
            float[] prev = null;
            Pose prevPose = null;
            for (Anchor a : chain) {
                Pose p = a.getPose();
                float[] sc = toScreen(p.tx(), p.ty(), p.tz());
                next.points.add(sc);
                if (prev != null) {
                    next.segments.add(new float[] { prev[0], prev[1], sc[0], sc[1], dist(prevPose, p) });
                }
                prev = sc;
                prevPose = p;
            }
        }
        if (aim != null && !chains.isEmpty()) {
            List<Anchor> last = chains.get(chains.size() - 1);
            if (!last.isEmpty()) {
                Pose lp = last.get(last.size() - 1).getPose();
                Pose hp = aim.getHitPose();
                float[] a = toScreen(lp.tx(), lp.ty(), lp.tz());
                next.live = new float[] { a[0], a[1], viewW / 2f, viewH / 2f, dist(lp, hp) };
            }
        }
        if (aim == null) setStatus(he ? "מכוונים את הצלב אל המשטח" : "Aim the cross at a surface");
        else if (chains.isEmpty() || chains.get(chains.size() - 1).isEmpty()) setStatus(he ? "לוחצים + בנקודת ההתחלה" : "Tap + at the start point");
        else setStatus(he ? "זזים לנקודה הבאה ולוחצים +" : "Move to the next point and tap +");
        snap = next;
        overlay.postInvalidate();
    }

    private void drawBackground(Frame frame) {
        if (frame.hasDisplayGeometryChanged()) {
            quadPos.position(0);
            quadTex.position(0);
            frame.transformCoordinates2d(Coordinates2d.OPENGL_NORMALIZED_DEVICE_COORDINATES, quadPos, Coordinates2d.TEXTURE_NORMALIZED, quadTex);
        }
        if (frame.getTimestamp() == 0) return;
        quadPos.position(0);
        quadTex.position(0);
        GLES20.glDisable(GLES20.GL_DEPTH_TEST);
        GLES20.glDepthMask(false);
        GLES20.glUseProgram(bgProgram);
        GLES20.glActiveTexture(GLES20.GL_TEXTURE0);
        GLES20.glBindTexture(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, cameraTexture);
        GLES20.glVertexAttribPointer(bgPos, 2, GLES20.GL_FLOAT, false, 0, quadPos);
        GLES20.glVertexAttribPointer(bgTex, 2, GLES20.GL_FLOAT, false, 0, quadTex);
        GLES20.glEnableVertexAttribArray(bgPos);
        GLES20.glEnableVertexAttribArray(bgTex);
        GLES20.glDrawArrays(GLES20.GL_TRIANGLE_STRIP, 0, 4);
        GLES20.glDisableVertexAttribArray(bgPos);
        GLES20.glDisableVertexAttribArray(bgTex);
        GLES20.glDepthMask(true);
        GLES20.glEnable(GLES20.GL_DEPTH_TEST);
    }

    private float[] toScreen(float x, float y, float z) {
        float[] in = { x, y, z, 1f }, out = new float[4];
        Matrix.multiplyMV(out, 0, vp, 0, in, 0);
        if (out[3] <= 0.0001f) return new float[] { Float.NaN, Float.NaN };
        return new float[] { (out[0] / out[3] + 1f) / 2f * viewW, (1f - out[1] / out[3]) / 2f * viewH };
    }

    private static float dist(Pose a, Pose b) {
        float dx = a.tx() - b.tx(), dy = a.ty() - b.ty(), dz = a.tz() - b.tz();
        return (float) Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    private String fmt(float m) {
        if (m < 1f) return Math.round(m * 100f) + (he ? " ס\"מ" : " cm");
        return String.format(java.util.Locale.US, "%.2f", m) + (he ? " מ'" : " m");
    }

    // ✓: the lengths back to the page (each segment; a line of several: its total too)
    private void finishWithLines(boolean keep) {
        if (!keep) { setResult(RESULT_CANCELED); finish(); return; }
        final ArrayList<String> lines = new ArrayList<>();
        surface.queueEvent(() -> {
            int n = 1;
            for (List<Anchor> chain : chains) {
                if (chain.size() < 2) continue;
                float total = 0f;
                StringBuilder parts = new StringBuilder();
                for (int i = 1; i < chain.size(); i++) {
                    float d = dist(chain.get(i - 1).getPose(), chain.get(i).getPose());
                    total += d;
                    if (parts.length() > 0) parts.append(" + ");
                    parts.append(fmt(d));
                }
                String label = (he ? "קו " : "Line ") + n++ + ": ";
                lines.add(chain.size() > 2 ? label + parts + " = " + fmt(total) : label + fmt(total));
            }
            runOnUiThread(() -> {
                Intent out = new Intent();
                out.putStringArrayListExtra(EXTRA_LINES, lines);
                setResult(RESULT_OK, out);
                finish();
            });
        });
    }

    // ---- the points, lines and lengths, over the camera ------------------------------------------
    private class Overlay extends View {
        private final Paint line = new Paint(Paint.ANTI_ALIAS_FLAG);
        private final Paint dashed = new Paint(Paint.ANTI_ALIAS_FLAG);
        private final Paint dot = new Paint(Paint.ANTI_ALIAS_FLAG);
        private final Paint ring = new Paint(Paint.ANTI_ALIAS_FLAG);
        private final Paint label = new Paint(Paint.ANTI_ALIAS_FLAG);
        private final Paint labelBg = new Paint(Paint.ANTI_ALIAS_FLAG);
        private final Paint cross = new Paint(Paint.ANTI_ALIAS_FLAG);

        Overlay() {
            super(ItaskMeasureActivity.this);
            line.setColor(Color.WHITE);
            line.setStrokeWidth(dp(3));
            line.setStrokeCap(Paint.Cap.ROUND);
            line.setShadowLayer(dp(2), 0, 0, Color.BLACK);
            dashed.set(line);
            dashed.setColor(Color.parseColor("#ffd23f"));
            dashed.setPathEffect(new DashPathEffect(new float[] { dp(8), dp(6) }, 0));
            dot.setColor(Color.WHITE);
            ring.setColor(Color.parseColor("#bf4e30"));
            ring.setStyle(Paint.Style.STROKE);
            ring.setStrokeWidth(dp(3));
            label.setColor(Color.parseColor("#2c2a24"));
            label.setTextSize(dp(15));
            label.setTypeface(Typeface.DEFAULT_BOLD);
            label.setTextAlign(Paint.Align.CENTER);
            labelBg.setColor(Color.WHITE);
            cross.setStrokeWidth(dp(2.5f));
            cross.setStyle(Paint.Style.STROKE);
            setLayerType(LAYER_TYPE_SOFTWARE, null); // shadows
        }

        private boolean ok(float[] p) { return !Float.isNaN(p[0]) && !Float.isNaN(p[1]); }

        private void pillAt(Canvas c, float x, float y, String text, int bg) {
            float w = label.measureText(text) + dp(16), h = dp(26);
            labelBg.setColor(bg);
            c.drawRoundRect(new RectF(x - w / 2, y - h / 2, x + w / 2, y + h / 2), h / 2, h / 2, labelBg);
            c.drawText(text, x, y + label.getTextSize() * 0.35f, label);
        }

        @Override
        protected void onDraw(Canvas c) {
            Snapshot s = snap;
            for (float[] g : s.segments) {
                if (ok(new float[] { g[0], g[1] }) && ok(new float[] { g[2], g[3] })) c.drawLine(g[0], g[1], g[2], g[3], line);
            }
            if (s.live != null && ok(new float[] { s.live[0], s.live[1] })) c.drawLine(s.live[0], s.live[1], s.live[2], s.live[3], dashed);
            for (float[] p : s.points) {
                if (!ok(p)) continue;
                c.drawCircle(p[0], p[1], dp(7), dot);
                c.drawCircle(p[0], p[1], dp(7), ring);
            }
            for (float[] g : s.segments) {
                if (ok(new float[] { g[0], g[1] }) && ok(new float[] { g[2], g[3] })) pillAt(c, (g[0] + g[2]) / 2, (g[1] + g[3]) / 2, fmt(g[4]), Color.WHITE);
            }
            // the cross in the middle, and the length to it
            float cx = getWidth() / 2f, cy = getHeight() / 2f, r = dp(16);
            cross.setColor(s.aim ? Color.parseColor("#ffd23f") : Color.argb(170, 255, 255, 255));
            c.drawCircle(cx, cy, r, cross);
            c.drawLine(cx - r * 1.6f, cy, cx - r * 0.5f, cy, cross);
            c.drawLine(cx + r * 0.5f, cy, cx + r * 1.6f, cy, cross);
            c.drawLine(cx, cy - r * 1.6f, cx, cy - r * 0.5f, cross);
            c.drawLine(cx, cy + r * 0.5f, cx, cy + r * 1.6f, cross);
            if (s.live != null) pillAt(c, cx, cy - r * 2.6f, fmt(s.live[4]), Color.parseColor("#ffd23f"));
        }
    }
}
