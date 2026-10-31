
  // ---------------------------------------------------------------------
  // הצוות: the engineers and site managers a user keeps, by phone number
  // (typed in, or picked from the phone's contacts) - the team_roles table,
  // see supabase/sql/team_and_finance.sql. Engineers see and edit the
  // projects' finances (project_finance); site managers don't. The server
  // enforces it (RLS); here the list is kept, and the app learns which
  // teams this phone is on (teamMemberships) - so it knows whose finances
  // it may show (financeOwnerPhones).
  // ---------------------------------------------------------------------
  var TEAM_TABLE = "team_roles";
  var teamView = document.getElementById("teamView");
  var teamError = document.getElementById("teamError");
  var myTeam = [];          // { phone, name, role } - the people on my team
  var teamMemberships = []; // { owner, role } - the teams I'm on

  // whose finances this phone may see: its own, and those of the teams it's an engineer on
  function financeOwnerPhones() {
    if (!myPhoneNumber) return [];
    return [myPhoneNumber].concat(teamMemberships.filter(function (m) { return m.role === "engineer"; })
      .map(function (m) { return m.owner; }));
  }

  function loadTeam() {
    if (!supabaseClient || !myPhoneNumber) return Promise.resolve();
    return supabaseClient.from(TEAM_TABLE).select("owner_phone, phone, name, role").then(function (result) {
      if (result && result.error) throw result.error;
      var rows = (result && result.data) || [];
      myTeam = rows.filter(function (r) { return r.owner_phone === myPhoneNumber; })
        .map(function (r) { return { phone: r.phone, name: r.name || "", role: r.role }; });
      teamMemberships = rows.filter(function (r) { return r.phone === myPhoneNumber && r.owner_phone !== myPhoneNumber; })
        .map(function (r) { return { owner: r.owner_phone, role: r.role }; });
      teamError.hidden = true;
      renderTeamMyRoles();
      if (!teamView.hidden) renderTeam();
      if (state.viewMode === "diary") updateBudgetTile();
    }).catch(function () {
      teamError.textContent = tr("teamLoadError");
      teamError.hidden = false;
    });
  }

  function teamPersonName(phone, stored) {
    return getDeviceContactName(phone) || stored || teamLocalPhone(phone);
  }
  function teamLocalPhone(phone) {
    return String(phone || "").replace(/^\+972/, "0");
  }

  // in the menu, under the button: the teams this phone is on
  function renderTeamMyRoles() {
    var el = document.getElementById("teamMyRoles");
    el.textContent = teamMemberships.map(function (m) {
      return tr(m.role === "engineer" ? "teamIAmEngineer" : "teamIAmSiteManager").replace("{name}", teamPersonName(m.owner, ""));
    }).join("\n");
    el.hidden = !teamMemberships.length;
  }

  function teamEl(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  }
  function renderTeam() {
    [["engineer", "teamEngineerList", "teamMakeSiteManager", "site_manager"],
      ["site_manager", "teamSiteManagerList", "teamMakeEngineer", "engineer"]].forEach(function (g) {
      var list = document.getElementById(g[1]);
      list.innerHTML = "";
      var people = myTeam.filter(function (p) { return p.role === g[0]; });
      if (!people.length) list.appendChild(teamEl("p", "team-empty", tr("teamEmpty")));
      people.forEach(function (p) {
        var row = teamEl("div", "team-row");
        var who = teamEl("div", "team-who");
        who.appendChild(teamEl("b", "", teamPersonName(p.phone, p.name)));
        who.appendChild(teamEl("small", "", teamLocalPhone(p.phone)));
        row.appendChild(who);
        var move = teamEl("button", "", tr(g[2]));
        move.type = "button";
        move.addEventListener("click", function () { teamSetRole(p, g[3]); });
        row.appendChild(move);
        var del = teamEl("button", "team-del", "✕");
        del.type = "button";
        del.title = tr("deleteBtn");
        del.addEventListener("click", function () {
          askConfirm(tr("teamRemoveConfirm").replace("{name}", teamPersonName(p.phone, p.name)), function () { teamRemove(p); });
        });
        row.appendChild(del);
        list.appendChild(row);
      });
    });
  }

  function teamFailed() {
    alert(tr("teamSaveError"));
    loadTeam();
  }
  function teamAdd(rawPhone, name, role) {
    var phone = normalizePhoneDigits(rawPhone);
    if (!phone) { alert(tr("teamBadPhone")); return false; }
    var existing = myTeam.find(function (p) { return p.phone === phone; });
    if (existing) { showToast(tr("teamAlready").replace("{name}", teamPersonName(phone, existing.name))); return true; }
    var person = { phone: phone, name: (name || "").trim(), role: role };
    myTeam.push(person);
    renderTeam();
    supabaseClient.from(TEAM_TABLE).insert({ owner_phone: myPhoneNumber, phone: phone, name: person.name || null, role: role })
      .then(function (r) { if (r && r.error) teamFailed(); }, teamFailed);
    return true;
  }
  function teamSetRole(person, role) {
    person.role = role;
    renderTeam();
    supabaseClient.from(TEAM_TABLE).update({ role: role }).eq("owner_phone", myPhoneNumber).eq("phone", person.phone)
      .then(function (r) { if (r && r.error) teamFailed(); }, teamFailed);
  }
  function teamRemove(person) {
    myTeam = myTeam.filter(function (p) { return p !== person; });
    renderTeam();
    supabaseClient.from(TEAM_TABLE).delete().eq("owner_phone", myPhoneNumber).eq("phone", person.phone)
      .then(function (r) { if (r && r.error) teamFailed(); }, teamFailed);
  }

  // each list's add buttons: from the phone's contacts, or typed in
  function teamPickContacts(role) {
    if (capacitorContactsAvailable) {
      pickOneNativeContact().then(function (picked) { if (picked) teamAdd(picked.tel, picked.name, role); });
      return;
    }
    navigator.contacts.select(["name", "tel"], { multiple: true }).then(function (contacts) {
      contacts.forEach(function (c) {
        var tel = (c.tel && c.tel[0]) || "";
        if (tel) teamAdd(tel, (c.name && c.name[0]) || "", role);
      });
    }).catch(function () {});
  }
  function teamTypeForm(box, role) {
    var old = box.querySelector(".team-type");
    if (old) { old.remove(); return; }
    var form = teamEl("form", "team-type");
    var name = teamEl("input");
    name.placeholder = tr("teamNamePh");
    name.maxLength = 60;
    var phone = teamEl("input");
    phone.type = "tel";
    phone.placeholder = tr("teamPhonePh");
    phone.maxLength = 20;
    var save = teamEl("button", "", tr("teamAddBtn"));
    save.type = "submit";
    form.appendChild(name);
    form.appendChild(phone);
    form.appendChild(save);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (teamAdd(phone.value, name.value, role)) form.remove();
    });
    box.appendChild(form);
    name.focus();
  }
  Array.prototype.forEach.call(teamView.querySelectorAll(".team-add"), function (box) {
    var role = box.getAttribute("data-role");
    if (contactPickerSupported) {
      var pick = teamEl("button", "", tr("teamFromContacts"));
      pick.type = "button";
      pick.className = "team-pick-btn";
      pick.setAttribute("data-i18n", "teamFromContacts");
      pick.addEventListener("click", function () { teamPickContacts(role); });
      box.appendChild(pick);
    }
    var type = teamEl("button", "", tr("teamTypeNumber"));
    type.type = "button";
    type.className = "team-type-btn";
    type.setAttribute("data-i18n", "teamTypeNumber");
    type.addEventListener("click", function () { teamTypeForm(box, role); });
    box.appendChild(type);
  });

  function openTeamView() {
    loadDeviceContactsIfNeeded();
    renderTeam();
    teamView.hidden = false;
    loadTeam();
  }
  document.getElementById("teamBtn").addEventListener("click", function () {
    state.menuOpen = false;
    render();
    openTeamView();
  });
  document.getElementById("teamBackBtn").addEventListener("click", function () { teamView.hidden = true; });
