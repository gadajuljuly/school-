package com.gadajuljuly.itask;

import android.Manifest;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.ContentValues;
import android.database.Cursor;
import android.net.Uri;
import android.provider.CalendarContract;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import java.util.TimeZone;

// The phone's own calendars (Google, Samsung, and Outlook when the Outlook
// app's "Sync calendars" is on), read and written through Android's
// CalendarContract - the same store the phone's calendar app uses, so
// every change syncs out through that calendar's own account. Backs the
// לוח שנה screen in tasks.html. Times are epoch milliseconds; all-day
// events use UTC midnights, as Android requires.
@CapacitorPlugin(
        name = "ItaskCalendar",
        permissions = {
                @Permission(alias = "calendar", strings = {
                        Manifest.permission.READ_CALENDAR,
                        Manifest.permission.WRITE_CALENDAR
                })
        }
)
public class ItaskCalendarPlugin extends Plugin {

    private boolean ensureAccess(PluginCall call) {
        if (getPermissionState("calendar") == PermissionState.GRANTED) return true;
        call.reject("calendar permission not granted", "NO_PERMISSION");
        return false;
    }

    @PluginMethod
    public void listCalendars(PluginCall call) {
        if (!ensureAccess(call)) return;
        String[] projection = {
                CalendarContract.Calendars._ID,
                CalendarContract.Calendars.CALENDAR_DISPLAY_NAME,
                CalendarContract.Calendars.ACCOUNT_NAME,
                CalendarContract.Calendars.CALENDAR_COLOR,
                CalendarContract.Calendars.CALENDAR_ACCESS_LEVEL,
                CalendarContract.Calendars.IS_PRIMARY,
                CalendarContract.Calendars.VISIBLE
        };
        JSArray calendars = new JSArray();
        try (Cursor c = getContext().getContentResolver().query(
                CalendarContract.Calendars.CONTENT_URI, projection, null, null, null)) {
            while (c != null && c.moveToNext()) {
                if (c.getInt(6) == 0) continue; // hidden in the phone's own calendar settings
                JSObject o = new JSObject();
                o.put("id", c.getLong(0));
                o.put("name", c.getString(1));
                o.put("account", c.getString(2));
                o.put("color", c.getInt(3));
                o.put("writable", c.getInt(4) >= CalendarContract.Calendars.CAL_ACCESS_CONTRIBUTOR);
                o.put("primary", !c.isNull(5) && c.getInt(5) == 1);
                calendars.put(o);
            }
        } catch (Exception e) {
            call.reject(e.getMessage());
            return;
        }
        JSObject result = new JSObject();
        result.put("calendars", calendars);
        call.resolve(result);
    }

    // Every occurrence (recurring events expanded) overlapping [from, to).
    @PluginMethod
    public void listEvents(PluginCall call) {
        if (!ensureAccess(call)) return;
        long from = call.getLong("from", 0L);
        long to = call.getLong("to", 0L);
        Uri.Builder uri = CalendarContract.Instances.CONTENT_URI.buildUpon();
        ContentUris.appendId(uri, from);
        ContentUris.appendId(uri, to);
        String[] projection = {
                CalendarContract.Instances.EVENT_ID,
                CalendarContract.Instances.TITLE,
                CalendarContract.Instances.BEGIN,
                CalendarContract.Instances.END,
                CalendarContract.Instances.ALL_DAY,
                CalendarContract.Instances.CALENDAR_ID,
                CalendarContract.Instances.DISPLAY_COLOR,
                CalendarContract.Instances.EVENT_LOCATION,
                CalendarContract.Instances.RRULE
        };
        JSArray events = new JSArray();
        try (Cursor c = getContext().getContentResolver().query(
                uri.build(), projection, CalendarContract.Instances.VISIBLE + "=1", null,
                CalendarContract.Instances.BEGIN + " ASC")) {
            while (c != null && c.moveToNext()) {
                JSObject o = new JSObject();
                o.put("eventId", c.getLong(0));
                o.put("title", c.getString(1));
                o.put("begin", c.getLong(2));
                o.put("end", c.getLong(3));
                o.put("allDay", c.getInt(4) == 1);
                o.put("calendarId", c.getLong(5));
                o.put("color", c.getInt(6));
                o.put("location", c.getString(7));
                o.put("rrule", c.getString(8));
                events.put(o);
            }
        } catch (Exception e) {
            call.reject(e.getMessage());
            return;
        }
        JSObject result = new JSObject();
        result.put("events", events);
        call.resolve(result);
    }

    // The event itself (its series start/end, not one occurrence) plus its
    // reminder offsets in minutes.
    @PluginMethod
    public void getEvent(PluginCall call) {
        if (!ensureAccess(call)) return;
        long eventId = call.getLong("eventId", -1L);
        ContentResolver cr = getContext().getContentResolver();
        String[] projection = {
                CalendarContract.Events.TITLE,
                CalendarContract.Events.DTSTART,
                CalendarContract.Events.DTEND,
                CalendarContract.Events.DURATION,
                CalendarContract.Events.ALL_DAY,
                CalendarContract.Events.CALENDAR_ID,
                CalendarContract.Events.EVENT_LOCATION,
                CalendarContract.Events.DESCRIPTION,
                CalendarContract.Events.RRULE
        };
        JSObject o = new JSObject();
        try (Cursor c = cr.query(ContentUris.withAppendedId(CalendarContract.Events.CONTENT_URI, eventId),
                projection, null, null, null)) {
            if (c == null || !c.moveToFirst()) {
                call.reject("event not found");
                return;
            }
            o.put("eventId", eventId);
            o.put("title", c.getString(0));
            o.put("dtstart", c.getLong(1));
            if (!c.isNull(2)) o.put("dtend", c.getLong(2));
            if (!c.isNull(3)) o.put("durationMs", parseDurationMs(c.getString(3)));
            o.put("allDay", c.getInt(4) == 1);
            o.put("calendarId", c.getLong(5));
            o.put("location", c.getString(6));
            o.put("description", c.getString(7));
            o.put("rrule", c.getString(8));
        } catch (Exception e) {
            call.reject(e.getMessage());
            return;
        }
        JSArray reminders = new JSArray();
        try (Cursor r = CalendarContract.Reminders.query(cr, eventId,
                new String[]{CalendarContract.Reminders.MINUTES})) {
            while (r != null && r.moveToNext()) reminders.put(r.getInt(0));
        } catch (Exception ignored) {
        }
        o.put("reminders", reminders);
        call.resolve(o);
    }

    // Creates the event, or updates it when eventId is given (a repeating
    // event is changed as a whole series). Returns its eventId.
    @PluginMethod
    public void saveEvent(PluginCall call) {
        if (!ensureAccess(call)) return;
        long eventId = call.getLong("eventId", -1L);
        boolean allDay = Boolean.TRUE.equals(call.getBoolean("allDay", false));
        long start = call.getLong("start", 0L);
        long end = call.getLong("end", 0L);
        String rrule = call.getString("rrule", "");
        int reminder = call.getInt("reminderMinutes", -1);

        ContentValues v = new ContentValues();
        v.put(CalendarContract.Events.CALENDAR_ID, call.getLong("calendarId", 0L));
        v.put(CalendarContract.Events.TITLE, call.getString("title", ""));
        v.put(CalendarContract.Events.EVENT_LOCATION, call.getString("location", ""));
        v.put(CalendarContract.Events.DESCRIPTION, call.getString("description", ""));
        v.put(CalendarContract.Events.ALL_DAY, allDay ? 1 : 0);
        v.put(CalendarContract.Events.EVENT_TIMEZONE, allDay ? "UTC" : TimeZone.getDefault().getID());
        v.put(CalendarContract.Events.DTSTART, start);
        if (rrule != null && !rrule.isEmpty()) {
            // a repeating event is stored as a rule plus a duration, not an end
            v.put(CalendarContract.Events.RRULE, rrule);
            long seconds = Math.max(60, (end - start) / 1000);
            v.put(CalendarContract.Events.DURATION, allDay ? "P" + Math.max(1, seconds / 86400) + "D" : "P" + seconds + "S");
            v.putNull(CalendarContract.Events.DTEND);
        } else {
            v.put(CalendarContract.Events.DTEND, end);
            v.putNull(CalendarContract.Events.RRULE);
            v.putNull(CalendarContract.Events.DURATION);
        }
        v.put(CalendarContract.Events.HAS_ALARM, reminder >= 0 ? 1 : 0);

        ContentResolver cr = getContext().getContentResolver();
        try {
            if (eventId >= 0) {
                cr.update(ContentUris.withAppendedId(CalendarContract.Events.CONTENT_URI, eventId), v, null, null);
                cr.delete(CalendarContract.Reminders.CONTENT_URI,
                        CalendarContract.Reminders.EVENT_ID + "=?", new String[]{String.valueOf(eventId)});
            } else {
                Uri created = cr.insert(CalendarContract.Events.CONTENT_URI, v);
                if (created == null) {
                    call.reject("insert failed");
                    return;
                }
                eventId = ContentUris.parseId(created);
            }
            if (reminder >= 0) {
                ContentValues r = new ContentValues();
                r.put(CalendarContract.Reminders.EVENT_ID, eventId);
                r.put(CalendarContract.Reminders.MINUTES, reminder);
                r.put(CalendarContract.Reminders.METHOD, CalendarContract.Reminders.METHOD_ALERT);
                cr.insert(CalendarContract.Reminders.CONTENT_URI, r);
            }
        } catch (Exception e) {
            call.reject(e.getMessage());
            return;
        }
        JSObject result = new JSObject();
        result.put("eventId", eventId);
        call.resolve(result);
    }

    @PluginMethod
    public void deleteEvent(PluginCall call) {
        if (!ensureAccess(call)) return;
        long eventId = call.getLong("eventId", -1L);
        try {
            getContext().getContentResolver().delete(
                    ContentUris.withAppendedId(CalendarContract.Events.CONTENT_URI, eventId), null, null);
        } catch (Exception e) {
            call.reject(e.getMessage());
            return;
        }
        call.resolve();
    }

    // RFC 5545 durations as Android stores them: "P3600S", "PT1H30M", "P1D", "P1W".
    private static long parseDurationMs(String d) {
        if (d == null) return 0;
        long total = 0, num = 0;
        for (char ch : d.toCharArray()) {
            if (Character.isDigit(ch)) {
                num = num * 10 + (ch - '0');
                continue;
            }
            switch (ch) {
                case 'W': total += num * 7 * 86400; break;
                case 'D': total += num * 86400; break;
                case 'H': total += num * 3600; break;
                case 'M': total += num * 60; break;
                case 'S': total += num; break;
                default: break;
            }
            num = 0;
        }
        return total * 1000;
    }
}
