  // ---------------------------------------------------------------------
  // The ITASK bot on WhatsApp: what the user wrote it waits in whatsapp_inbox
  // (supabase/functions/whatsapp-webhook decided the actions and already
  // answered on WhatsApp). The app applies them here, through the in-app
  // assistant's own code (assistantApply, 14h) - the diary lines on the day
  // the message was sent - and shows the exchange in the assistant's chat,
  // marked 📱, with ↶ to undo. Each message is claimed first (pending ->
  // applying), so a phone and a computer open together don't both apply it.
  // ---------------------------------------------------------------------
  var waPulling = false;
  function pullWhatsAppInbox() {
    if (waPulling || !supabaseClient || !myPhoneNumber || dataLoadBlocked || !privateDataSettled || !sharedSheetsLoadedOnce) return;
    waPulling = true;
    supabaseClient.from("whatsapp_inbox").select("id, text, reply, actions, day, created_at")
      .eq("phone", myPhoneNumber).eq("status", "pending").order("created_at", { ascending: true }).limit(20)
      .then(function (res) {
        var rows = (res && !res.error && res.data) || [];
        return rows.reduce(function (p, row) {
          return p.then(function () { return waApplyRow(row); });
        }, Promise.resolve());
      })
      .then(null, function () {})
      .then(function () { waPulling = false; });
  }

  function waApplyRow(row) {
    // claim it: only one device moves it from pending
    return supabaseClient.from("whatsapp_inbox").update({ status: "applying" })
      .eq("id", row.id).eq("status", "pending").select("id")
      .then(function (claim) {
        if (!claim || claim.error || !claim.data || !claim.data.length) return;
        var actions = Array.isArray(row.actions) ? row.actions : [];
        var undos = [];
        return actions.reduce(function (p, a) {
          return p.then(function () {
            return assistantApply(a, row.day).then(function (u) { if (u) undos.push(u); }, function () {});
          });
        }, Promise.resolve()).then(function () {
          render();
          var at = Date.parse(row.created_at) || Date.now();
          assistantChat.push({ role: "user", text: "📱 " + String(row.text || ""), at: at });
          assistantUndo = undos.length ? function () { undos.slice().reverse().forEach(function (u) { u(); }); } : null;
          var reply = String(row.reply || "").split("\n\n📱")[0].trim() || tr(undos.length ? "assistantDone" : "assistantNothing");
          assistantChat.push({ role: "assistant", text: reply, at: Date.now(), undoable: !!undos.length });
          assistantSaveChat();
          if (!assistantView.hidden) renderAssistant();
          if (undos.length) showToast(tr("waAppliedToast"));
          return supabaseClient.from("whatsapp_inbox").update({ status: "applied", applied_at: new Date().toISOString() }).eq("id", row.id);
        });
      });
  }

  setInterval(function () { if (!document.hidden) pullWhatsAppInbox(); }, 30000);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) pullWhatsAppInbox();
  });
  setTimeout(pullWhatsAppInbox, 4000);
