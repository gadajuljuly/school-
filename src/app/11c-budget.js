
  // ---------------------------------------------------------------------
  // בקרה תקציבית: a project's money (project_finance - see
  // supabase/sql/team_and_finance.sql), from its tile in the diary. The
  // tile shows only to whoever may see that money: the project's owner -
  // the user, for a private project; its creator, for a shared one - and
  // the engineers on the owner's team (financeOwnerPhones, 10b-team.js).
  // ---------------------------------------------------------------------
  var budgetView = document.getElementById("budgetView");
  var siteLogBudgetBtn = document.getElementById("siteLogBudgetBtn");

  // whose money a project's is, when this phone may see it (else null)
  function budgetOwnerFor(sheet) {
    if (!sheet || !myPhoneNumber) return null;
    var owner = sheet.shared ? sheet.createdBy : myPhoneNumber;
    return owner && financeOwnerPhones().indexOf(owner) !== -1 ? owner : null;
  }
  function updateBudgetTile() {
    siteLogBudgetBtn.hidden = !budgetOwnerFor(activeSheet());
  }

  function openBudgetView() {
    var sheet = activeSheet();
    if (!budgetOwnerFor(sheet)) return;
    document.getElementById("budgetProjectName").textContent = sheet.name;
    var body = document.getElementById("budgetBody");
    body.innerHTML = "";
    var soon = document.createElement("p");
    soon.className = "budget-soon";
    soon.textContent = tr("budgetComingSoon");
    body.appendChild(soon);
    budgetView.hidden = false;
  }
  siteLogBudgetBtn.addEventListener("click", openBudgetView);
  document.getElementById("budgetBackBtn").addEventListener("click", function () { budgetView.hidden = true; });
