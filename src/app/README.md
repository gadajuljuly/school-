# ITASK app script sources

`tasks.html` loads `tasks-app.js`, which is **built** from the files here:

```
node tools/build-app.js
```

joins `src/app/*.js` in name order into `tasks-app.js` and re-stamps the
`?v=` URLs in `tasks.html` / `tasks-sw.js` (so phones fetch the new code).
Edit these files, never `tasks-app.js` itself; CI fails if it's out of date.

The files are consecutive slices of one `(function () { ... })();` — the
first opens it, the last closes it — so everything still shares one scope,
exactly as when it was a single `<script>`. Order matters: code that runs
at load time can only use variables defined in earlier files.

| file | what's in it |
|---|---|
| 00-translations | all UI texts (he/en/ar/ru) |
| 01-core-data-sync | language, data model, local/Supabase save & sync, backups, dialogs, task long-press menu |
| 02-reminders-native-alarms | reminder state, native alarms (ItaskAlarm), calendar links, widget data, launch views |
| 03-calendar | the לוח שנה screen (ItaskCalendar): views, editor, copy to task, date picker |
| 04-share-in-and-task-reminder-ui | WhatsApp/share-to-ITASK, reminder icons and dialog |
| 05-projects-sharing-invites | tabs/projects, shared projects, invites, contacts picker, logos |
| 06-chat | project chat: messages, voice, replies/quotes, mentions |
| 07-library-files | file library and storage |
| 08-reports-list-dashboard | report list actions, company dashboard, language menu |
| 09-settings-push-notifications | reminders/push settings, chat notifications |
| 10-head-office-groups | head office mode, office groups |
| 11-diary-site-log | diary (יומן): attendance, tools, contractors, works, procurement |
| 12-office-reports | head-office combined reports |
| 13-meeting-reports-pdf | meeting/tour reports, PDF building |
| 14-render-task-list | archive view, render(), task list, editing |
| 15-startup-auth-loading | loading, shared sheets, sign-in, session, startup |
