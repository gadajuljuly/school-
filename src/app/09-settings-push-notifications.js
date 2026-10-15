  function showReminderStatus(msg) {
    reminderStatus.textContent = msg;
    reminderStatus.hidden = false;
  }

  var chatNotifSelect = document.getElementById("chatNotifSelect");
  var chatNotifStatus = document.getElementById("chatNotifStatus");
  function showChatNotifStatus(msg) {
    chatNotifStatus.textContent = msg;
    chatNotifStatus.hidden = false;
  }

  // A single push subscription (one per device) is shared by both task
  // reminders and chat notifications - frequency_minutes and chat_enabled
  // are independent flags on that same row, so turning one off must never
  // delete the row or unsubscribe the device out from under the other.
  function ensurePushSubscription() {
    return navigator.serviceWorker.ready.then(function (reg) {
      return reg.pushManager.getSubscription().then(function (existing) {
        return existing || reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });
      });
    });
  }

  function fcmTokenStorageKey() {
    return "itask-fcm-token:" + SUPABASE_ROW_ID;
  }

  function getStoredFcmToken() {
    try { return localStorage.getItem(fcmTokenStorageKey()); } catch (e) { return null; }
  }

  // Same one-per-device idea as ensurePushSubscription() above, but for the
  // native app: getToken() is a real Promise (unlike @capacitor/push-
  // notifications' event-based register(), which was a documented,
  // widely-reported source of silent hangs), so this just wraps it with a
  // timeout and caches the resulting FCM token locally (it's stable across
  // app restarts) to avoid re-registering on every call.
  function ensureFcmToken() {
    var cached = getStoredFcmToken();
    if (cached) return Promise.resolve(cached);
    var FM = window.Capacitor.Plugins.FirebaseMessaging;
    return withTimeout(FM.getToken(), 15000, "FCM getToken").then(function (result) {
      var token = result && result.token;
      if (!token) throw new Error("FCM getToken returned no token");
      try { localStorage.setItem(fcmTokenStorageKey(), token); } catch (e) {}
      return token;
    });
  }

  // Unified across both push channels (Web Push in a browser/TWA, Capacitor
  // FCM in the native app) so the reminder/chat-notification UI below never
  // has to branch on which one it's talking to.
  function pushSupported() {
    return (("serviceWorker" in navigator) && ("PushManager" in window)) || capacitorPushAvailable;
  }

  function pushPermissionDenied() {
    if (capacitorPushAvailable) {
      return window.Capacitor.Plugins.FirebaseMessaging.checkPermissions().then(function (s) { return s.receive === "denied"; });
    }
    return Promise.resolve(Notification.permission === "denied");
  }

  function requestPushPermissionGranted() {
    if (capacitorPushAvailable) {
      var FM = window.Capacitor.Plugins.FirebaseMessaging;
      return FM.checkPermissions().then(function (status) {
        if (status.receive === "granted") return true;
        return FM.requestPermissions().then(function (r) { return r.receive === "granted"; });
      });
    }
    return Notification.requestPermission().then(function (p) { return p === "granted"; });
  }

  // Resolves the fields to upsert into push_subscriptions for this device,
  // creating a subscription/token if one doesn't exist yet - column names
  // match the table so callers can spread { conflictColumn, fields } directly
  // into a Supabase upsert.
  function ensurePushIdentity() {
    if (capacitorPushAvailable) {
      return ensureFcmToken().then(function (token) {
        return { conflictColumn: "fcm_token", fields: { fcm_token: token } };
      });
    }
    return ensurePushSubscription().then(function (sub) {
      var keys = sub.toJSON().keys;
      return { conflictColumn: "endpoint", fields: { endpoint: sub.endpoint, p256dh: keys.p256dh, auth: keys.auth } };
    });
  }

  // On the native app, this is the single source of truth for the
  // account's notifications - any other row for the same account (a Web
  // Push subscription from having opened the site directly in a phone
  // browser like Chrome/Samsung Internet before or alongside installing
  // the app, or a stale duplicate fcm_token row from an earlier lost
  // local-token cache - see getExistingPushMatch above) is redundant and
  // makes the same message arrive multiple times, each showing that
  // browser's icon instead of the app's. Delete every other row for this
  // account and keep/create exactly one, matching the app's own current
  // token. Only reached in the native app; Web Push endpoints (browser
  // installs) keep their simpler per-endpoint upsert, since two different
  // browsers on two different devices are legitimately two subscriptions.
  function upsertPushSubscriptionRow(extraFields, identity) {
    var row = Object.assign({ user_id: SUPABASE_ROW_ID }, extraFields, identity.fields);
    if (!capacitorPushAvailable) {
      return supabaseClient.from("push_subscriptions").upsert(row, { onConflict: identity.conflictColumn });
    }
    return supabaseClient.from("push_subscriptions").select("id, fcm_token").eq("user_id", SUPABASE_ROW_ID)
      .then(function (result) {
        var rows = (result && result.data) || [];
        var keepId = null;
        var deleteIds = [];
        rows.forEach(function (r) {
          if (r.fcm_token && r.fcm_token === identity.fields.fcm_token) keepId = r.id;
          else deleteIds.push(r.id);
        });
        var cleanup = deleteIds.length ? supabaseClient.from("push_subscriptions").delete().in("id", deleteIds) : Promise.resolve();
        return cleanup.then(function () {
          if (keepId) return supabaseClient.from("push_subscriptions").update(row).eq("id", keepId);
          return supabaseClient.from("push_subscriptions").upsert(row, { onConflict: identity.conflictColumn });
        });
      });
  }

  // Same idea but read-only - used to find this device's existing row
  // (to check its current settings, or to turn a flag off) without ever
  // creating a new subscription/token as a side effect.
  function getExistingPushMatch() {
    if (capacitorPushAvailable) {
      // Matching by user_id (not by the locally-cached fcm_token) so this
      // restore never depends on that local write having survived - on
      // Android, backgrounding the app moments after the token was first
      // written can lose that localStorage write before it's flushed to
      // disk, even though older, already-settled keys (like the login
      // session) survive fine. The server-side row is the reliable source
      // of truth for "is push already set up for this account."
      return SUPABASE_ROW_ID ? Promise.resolve({ column: "user_id", value: SUPABASE_ROW_ID }) : Promise.resolve(null);
    }
    if (!("serviceWorker" in navigator)) return Promise.resolve(null);
    return navigator.serviceWorker.ready.then(function (reg) {
      return reg.pushManager.getSubscription();
    }).then(function (sub) {
      return sub ? { column: "endpoint", value: sub.endpoint } : null;
    });
  }

  function chatNotifDisabledKey() {
    return "itask-chat-notif-disabled:" + SUPABASE_ROW_ID;
  }

  // Chat notifications are opt-out, not opt-in: try to enable them
  // automatically on every load (silently reusing an already-granted
  // permission, or asking once if permission was never decided), unless the
  // user explicitly turned them off before via the menu toggle.
  function autoEnableChatNotifications() {
    if (!supabaseClient || !SUPABASE_ROW_ID) return;
    if (!pushSupported() || (!capacitorPushAvailable && !("Notification" in window))) return;
    var userDisabled = false;
    try { userDisabled = localStorage.getItem(chatNotifDisabledKey()) === "1"; } catch (e) {}
    if (userDisabled) return;
    pushPermissionDenied().then(function (denied) {
      if (denied) return;
      return requestPushPermissionGranted().then(function (granted) {
        if (!granted) return;
        return ensurePushIdentity().then(function (identity) {
          return upsertPushSubscriptionRow({ chat_enabled: true }, identity);
        }).then(function (result) {
          if (result && result.error) return;
          chatNotifSelect.value = "on";
          showChatNotifStatus(tr("chatNotifActive"));
        });
      });
    }).catch(function () {});
  }

  function initReminderSettings() {
    if (!supabaseClient || !pushSupported()) {
      if (reminderFrequencySelect) reminderFrequencySelect.disabled = true;
      if (chatNotifSelect) chatNotifSelect.disabled = true;
      return;
    }
    getExistingPushMatch().then(function (match) {
      if (!match) return;
      // Not .maybeSingle(): earlier app-restarts that lost their locally
      // cached fcm_token each registered a fresh one server-side, so a
      // given account can have several rows here. Any one of them having
      // the flag set counts as "on" for that flag.
      return supabaseClient.from("push_subscriptions").select("frequency_minutes, chat_enabled").eq(match.column, match.value)
        .then(function (result) {
          var rows = result && result.data;
          if (result && result.error) return;
          if (!rows || !rows.length) return;
          var freq = rows.map(function (r) { return r.frequency_minutes; }).find(function (v) { return v; });
          var chatOn = rows.some(function (r) { return r.chat_enabled; });
          if (freq) {
            reminderFrequencySelect.value = String(freq);
            showReminderStatus(tr("remindersActive"));
          }
          if (chatOn) {
            chatNotifSelect.value = "on";
            showChatNotifStatus(tr("chatNotifActive"));
          }
        });
    }).catch(function () {});
  }

  reminderFrequencySelect.addEventListener("change", function () {
    var value = reminderFrequencySelect.value;
    reminderStatus.hidden = true;
    if (!supabaseClient || !SUPABASE_ROW_ID) return;

    if (!pushSupported()) {
      showReminderStatus(tr("notificationsNotSupported"));
      reminderFrequencySelect.value = "";
      return;
    }

    if (!value) {
      getExistingPushMatch().then(function (match) {
        if (match) {
          return supabaseClient.from("push_subscriptions").update({ frequency_minutes: null }).eq(match.column, match.value);
        }
      }).then(function () {
        showReminderStatus(tr("remindersOffStatus"));
      }).catch(function () {});
      return;
    }

    pushPermissionDenied().then(function (denied) {
      if (denied) {
        showReminderStatus(tr("notificationsBlocked"));
        reminderFrequencySelect.value = "";
        return;
      }
      return requestPushPermissionGranted().then(function (granted) {
        if (!granted) {
          showReminderStatus(tr("notificationPermissionDenied"));
          reminderFrequencySelect.value = "";
          return;
        }
        return ensurePushIdentity().then(function (identity) {
          return upsertPushSubscriptionRow({ frequency_minutes: Number(value), last_sent_at: null }, identity);
        }).then(function (result) {
          if (result && result.error) {
            console.error("push_subscriptions upsert failed:", result.error);
            showReminderStatus(tr("errorSavingSubscription") + result.error.message);
            reminderFrequencySelect.value = "";
            return;
          }
          showReminderStatus(tr("remindersActive"));
        });
      });
    }).catch(function (err) {
      console.error("reminder subscribe failed:", err);
      showReminderStatus(tr("errorEnablingReminders") + (err && err.message ? err.message : err));
      reminderFrequencySelect.value = "";
    });
  });

  chatNotifSelect.addEventListener("change", function () {
    var value = chatNotifSelect.value;
    chatNotifStatus.hidden = true;
    if (!supabaseClient || !SUPABASE_ROW_ID) return;

    if (!pushSupported()) {
      showChatNotifStatus(tr("notificationsNotSupported"));
      chatNotifSelect.value = "";
      return;
    }

    if (!value) {
      try { localStorage.setItem(chatNotifDisabledKey(), "1"); } catch (e) {}
      getExistingPushMatch().then(function (match) {
        if (match) {
          return supabaseClient.from("push_subscriptions").update({ chat_enabled: false }).eq(match.column, match.value);
        }
      }).then(function () {
        showChatNotifStatus(tr("chatNotifOffStatus"));
      }).catch(function () {});
      return;
    }

    try { localStorage.removeItem(chatNotifDisabledKey()); } catch (e) {}

    pushPermissionDenied().then(function (denied) {
      if (denied) {
        showChatNotifStatus(tr("notificationsBlocked"));
        chatNotifSelect.value = "";
        return;
      }
      return requestPushPermissionGranted().then(function (granted) {
        if (!granted) {
          showChatNotifStatus(tr("notificationPermissionDenied"));
          chatNotifSelect.value = "";
          return;
        }
        return ensurePushIdentity().then(function (identity) {
          return upsertPushSubscriptionRow({ chat_enabled: true }, identity);
        }).then(function (result) {
          if (result && result.error) {
            console.error("push_subscriptions upsert failed:", result.error);
            showChatNotifStatus(tr("errorSavingSubscription") + result.error.message);
            chatNotifSelect.value = "";
            return;
          }
          showChatNotifStatus(tr("chatNotifActive"));
        });
      });
    }).catch(function (err) {
      console.error("chat notification subscribe failed:", err);
      showChatNotifStatus(tr("errorEnablingReminders") + (err && err.message ? err.message : err));
      chatNotifSelect.value = "";
    });
  });

  var shareAppBtn = document.getElementById("shareAppBtn");
  shareAppBtn.addEventListener("click", function () {
    state.menuOpen = false;
    render();
    var url = location.origin + location.pathname;
    var shareData = { title: "ITASK", text: tr("shareAppText"), url: url };
    if (navigator.share) {
      navigator.share(shareData).catch(function () {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () {
        alert(tr("linkCopied") + url);
      }, function () {
        alert(tr("installLink") + url);
      });
    } else {
      alert(tr("installLink") + url);
    }
  });

  var addLogoBtn = document.getElementById("addLogoBtn");
  var logoFileInput = document.getElementById("logoFileInput");
  var sheetTitleLogo = document.getElementById("sheetTitleLogo");
  var logoPickerOverlay = document.getElementById("logoPickerOverlay");
  var logoPickerGrid = document.getElementById("logoPickerGrid");
  var logoPickerCancelBtn = document.getElementById("logoPickerCancelBtn");

  addLogoBtn.addEventListener("click", function () {
    state.menuOpen = false;
    render();
    logoFileInput.value = "";
    logoFileInput.click();
  });

  // Head Office eligibility is now fully self-service and server-verified
  // (office_groups table, see office_groups.sql) instead of a developer-
  // hardcoded phone number: any user can set up a "group" (officeGroupCreateBtn
  // below) naming one phone number as that group's Head Office and a list
  // of member numbers whose shared projects it should see. Whoever created
  // the group AND whoever was named its Head Office both get the toggle
  // below in their own menu - the real read/write access itself comes from
  // shared_projects' own RLS (office_groups.sql), not from this toggle,
  // which is just a per-device "show me that view right now" preference.
  var isHeadOfficeMode = false;
  var canBeHeadOffice = false;
