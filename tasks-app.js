// GENERATED from src/app/*.js by tools/build-app.js - edit those files, not this one.
(function () {
  var TRANSLATIONS = {
    authSubtitle: { he: "התחברו כדי לראות את המשימות שלכם", en: "Log in to see your tasks", ar: "سجّل الدخول لرؤية مهامك", ru: "Войдите, чтобы увидеть свои задачи" },
    appLoadingText: { he: "טוען...", en: "Loading...", ar: "جارٍ التحميل...", ru: "Загрузка..." },
    dataErrorText: {
      he: "לא הצלחנו לטעון את הנתונים שלך מהשרת. כדי להגן על המידע שלך, העריכה חסומה עד שהחיבור יחזור.",
      en: "We couldn't load your data from the server. To protect your information, editing is disabled until the connection is back.",
      ar: "لم نتمكن من تحميل بياناتك من الخادم. لحماية معلوماتك، تم تعطيل التعديل حتى يعود الاتصال.",
      ru: "Не удалось загрузить ваши данные с сервера. Чтобы защитить вашу информацию, редактирование отключено до восстановления соединения."
    },
    dataErrorRetryBtn: { he: "נסה שוב", en: "Try again", ar: "حاول مرة أخرى", ru: "Повторить" },
    authPhonePlaceholder: { he: "50-1234567", en: "50-1234567", ar: "50-1234567", ru: "50-1234567" },
    authSendCodeBtn: { he: "שליחת קוד", en: "Send code", ar: "إرسال الرمز", ru: "Отправить код" },
    authCodePlaceholder: { he: "קוד בן 6 ספרות", en: "6-digit code", ar: "رمز مكوّن من 6 أرقام", ru: "6-значный код" },
    authVerifyCodeBtn: { he: "אישור קוד", en: "Verify code", ar: "تأكيد الرمز", ru: "Подтвердить код" },
    authChangePhoneBtn: { he: "שינוי מספר טלפון", en: "Change phone number", ar: "تغيير رقم الهاتف", ru: "Изменить номер телефона" },
    authCodeSentTo: { he: "קוד נשלח אל ", en: "Code sent to ", ar: "تم إرسال الرمز إلى ", ru: "Код отправлен на " },
    invalidPhoneNumber: { he: "יש להזין מספר טלפון נייד תקין, לדוגמה 501234567", en: "Please enter a valid mobile number, e.g. 501234567", ar: "يرجى إدخال رقم هاتف نقّال صالح، مثال 501234567", ru: "Введите корректный номер мобильного телефона, например 501234567" },
    sendCodeError: { he: "שגיאה בשליחת הקוד. בדקו את מספר הטלפון ונסו שוב.", en: "Error sending the code. Check the phone number and try again.", ar: "خطأ في إرسال الرمز. تحقق من رقم الهاتف وحاول مرة أخرى.", ru: "Ошибка отправки кода. Проверьте номер телефона и попробуйте снова." },
    invalidCode: { he: "יש להזין קוד בן 6 ספרות", en: "Please enter a 6-digit code", ar: "يرجى إدخال رمز مكوّن من 6 أرقام", ru: "Введите 6-значный код" },
    wrongCode: { he: "הקוד שהוזן שגוי", en: "The code you entered is incorrect", ar: "الرمز الذي أدخلته غير صحيح", ru: "Введённый код неверен" },
    signedInElsewhere: { he: "התחברת למספר הזה ממכשיר אחר, ולכן התנתקת כאן. אפשר להתחבר שוב.", en: "This number was signed in on another device, so you were signed out here. You can sign in again.", ar: "تم تسجيل الدخول بهذا الرقم من جهاز آخر، لذا تم تسجيل خروجك هنا. يمكنك تسجيل الدخول مجددًا.", ru: "Этот номер вошёл на другом устройстве, поэтому вы были выведены здесь. Можно войти снова." },
    dateInputTitle: { he: "לחצו לבחירת תאריך", en: "Click to pick a date", ar: "اضغط لاختيار التاريخ", ru: "Нажмите, чтобы выбрать дату" },
    todayBtn: { he: "היום", en: "Today", ar: "اليوم", ru: "Сегодня" },
    menuBtnTitle: { he: "תפריט", en: "Menu", ar: "القائمة", ru: "Меню" },
    menuLabelReminders: { he: "תזכורות משימות", en: "Task reminders", ar: "تذكيرات المهام", ru: "Напоминания о задачах" },
    reminderOff: { he: "כבוי", en: "Off", ar: "إيقاف", ru: "Выкл" },
    menuLabelChatNotif: { he: "התראות הודעות צ'אט", en: "Chat message notifications", ar: "إشعارات رسائل الدردشة", ru: "Уведомления о сообщениях в чате" },
    chatNotifOn: { he: "פעיל", en: "On", ar: "مفعّل", ru: "Вкл" },
    chatNotifActive: { he: "התראות צ'אט פעילות", en: "Chat notifications active", ar: "إشعارات الدردشة نشطة", ru: "Уведомления чата включены" },
    chatNotifOffStatus: { he: "התראות הצ'אט כבויות", en: "Chat notifications are off", ar: "إشعارات الدردشة متوقفة", ru: "Уведомления чата выключены" },
    reminderEvery1: { he: "כל דקה", en: "Every minute", ar: "كل دقيقة", ru: "Каждую минуту" },
    reminderEvery5: { he: "כל 5 דקות", en: "Every 5 minutes", ar: "كل 5 دقائق", ru: "Каждые 5 минут" },
    reminderEvery15: { he: "כל 15 דקות", en: "Every 15 minutes", ar: "كل 15 دقيقة", ru: "Каждые 15 минут" },
    reminderEvery30: { he: "כל 30 דקות", en: "Every 30 minutes", ar: "كل 30 دقيقة", ru: "Каждые 30 минут" },
    reminderEveryHour: { he: "כל שעה", en: "Every hour", ar: "كل ساعة", ru: "Каждый час" },
    reminderEvery2Hours: { he: "כל שעתיים", en: "Every 2 hours", ar: "كل ساعتين", ru: "Каждые 2 часа" },
    reminderEvery4Hours: { he: "כל 4 שעות", en: "Every 4 hours", ar: "كل 4 ساعات", ru: "Каждые 4 часа" },
    menuLabelApp: { he: "האפליקציה", en: "App", ar: "التطبيق", ru: "Приложение" },
    headOfficeToggleOnBtn: { he: "מעבר למצב משרד ראשי", en: "Switch to Head Office mode", ar: "التبديل إلى وضع المكتب الرئيسي", ru: "Перейти в режим главного офиса" },
    headOfficeToggleOffBtn: { he: "יציאה ממצב משרד ראשי", en: "Exit Head Office mode", ar: "الخروج من وضع المكتب الرئيسي", ru: "Выйти из режима главного офиса" },
    officeGroupCreateBtn: { he: "הקמת קבוצת משרד", en: "Create office group", ar: "إنشاء مجموعة مكتب", ru: "Создать офисную группу" },
    officeGroupMembersTitle: { he: "חברי הקבוצה", en: "Group members", ar: "أعضاء المجموعة", ru: "Участники группы" },
    officeGroupHeadOfficeTitle: { he: "הגדרת משרד ראשי", en: "Set Head Office", ar: "تحديد المكتب الرئيسي", ru: "Назначить главный офис" },
    officeGroupHeadOfficeHint: { he: "השאירו ריק כדי להיות המשרד הראשי של הקבוצה בעצמכם", en: "Leave empty to be the group's Head Office yourself", ar: "اتركه فارغًا لتكون أنت المكتب الرئيسي للمجموعة", ru: "Оставьте пустым, чтобы самому стать главным офисом группы" },
    officeGroupFinishBtn: { he: "סיום", en: "Finish", ar: "إنهاء", ru: "Готово" },
    officeGroupNoMembersMsg: { he: "יש להוסיף לפחות חבר אחד לקבוצה", en: "Add at least one group member", ar: "أضف عضوًا واحدًا على الأقل", ru: "Добавьте хотя бы одного участника" },
    officeGroupCreatedMsg: { he: "הקבוצה נוצרה, ההזמנות נשלחו וימתינו לאישור", en: "Group created, invites sent and awaiting approval", ar: "تم إنشاء المجموعة، تم إرسال الدعوات وهي بانتظار الموافقة", ru: "Группа создана, приглашения отправлены и ждут подтверждения" },
    officeGroupCreateErrorMsg: { he: "לא הצלחנו ליצור את הקבוצה, נסו שוב", en: "Couldn't create the group, try again", ar: "لم نتمكن من إنشاء المجموعة، حاول مرة أخرى", ru: "Не удалось создать группу, попробуйте снова" },
    officeGroupInviteMemberMsgTemplate: { he: "{name} רוצה להוסיף אותך לקבוצת משרד, כך שהפרויקטים השיתופיים שלך יהיו חשופים למשרד הראשי של הקבוצה - לאשר?", en: "{name} wants to add you to an office group, so your shared projects will be visible to its Head Office - approve?", ar: "يريد {name} إضافتك إلى مجموعة مكتب، بحيث تكون مشاريعك المشتركة مرئية للمكتب الرئيسي للمجموعة - هل توافق؟", ru: "{name} хочет добавить вас в офисную группу, чтобы ваши общие проекты были видны её главному офису - подтвердить?" },
    officeGroupInviteHeadOfficeMsgTemplate: { he: "{name} רוצה שתהיה המשרד הראשי של קבוצת משרד - לאשר?", en: "{name} wants you to be the Head Office of an office group - approve?", ar: "يريد {name} أن تكون المكتب الرئيسي لمجموعة مكتب - هل توافق؟", ru: "{name} хочет, чтобы вы стали главным офисом офисной группы - подтвердить?" },
    officeGroupInviteApprovedMsg: { he: "אושר", en: "Approved", ar: "تمت الموافقة", ru: "Подтверждено" },
    officeGroupInviteDeclinedMsg: { he: "ההזמנה נדחתה", en: "The invite was declined", ar: "تم رفض الدعوة", ru: "Приглашение отклонено" },
    officeGroupManageBtn: { he: "ניהול קבוצת המשרד", en: "Manage office group", ar: "إدارة مجموعة المكتب", ru: "Управление офисной группой" },
    officeGroupLabel: { he: "קבוצה", en: "Group", ar: "مجموعة", ru: "Группа" },
    officeGroupHeadOfficeLabel: { he: "משרד ראשי:", en: "Head Office:", ar: "المكتب الرئيسي:", ru: "Главный офис:" },
    officeGroupStatusPending: { he: "ממתין לאישור", en: "awaiting approval", ar: "بانتظار الموافقة", ru: "ожидает подтверждения" },
    officeGroupStatusApproved: { he: "אושר", en: "approved", ar: "تمت الموافقة", ru: "подтверждено" },
    officeGroupStatusDeclined: { he: "נדחה", en: "declined", ar: "مرفوض", ru: "отклонено" },
    nextBtn: { he: "הבא", en: "Next", ar: "التالي", ru: "Далее" },
    headOfficeMemberAddPlaceholder: { he: "05XXXXXXXX", en: "05XXXXXXXX", ar: "05XXXXXXXX", ru: "05XXXXXXXX" },
    headOfficeMemberInvalidMsg: { he: "מספר טלפון לא תקין", en: "Invalid phone number", ar: "رقم هاتف غير صالح", ru: "Неверный номер телефона" },
    officeReportsBtnTitle: { he: "דוחות מרוכזים", en: "Combined reports", ar: "تقارير مجمعة", ru: "Сводные отчёты" },
    headOfficeMainProjectName: { he: "הזמנות רכש", en: "Procurement Orders", ar: "طلبات الشراء", ru: "Заказы на закупку" },
    headOfficeProcurementTaskPrefix: { he: "הזמנת רכש ל", en: "Procurement order for ", ar: "طلب شراء لـ", ru: "Заказ на закупку для " },
    officeCombinedReportFileNamePrefix: { he: "דוח מרוכז", en: "Combined report", ar: "تقرير مجمّع", ru: "Сводный отчёт" },
    officeCombinedReportEmptyMsg: { he: "אף פרויקט לא שיגר דוח מסוג זה היום", en: "No project has sent this type of report today", ar: "لم يرسل أي مشروع هذا النوع من التقارير اليوم", ru: "Ни один проект не отправил такой отчёт сегодня" },
    officeReportDailyBtn: { he: "הפקת דוח יומי", en: "Generate daily report", ar: "إصدار تقرير يومي", ru: "Создать дневной отчёт" },
    officeReportMonthlyBtn: { he: "הפקת דוח חודשי", en: "Generate monthly report", ar: "إصدار تقرير شهري", ru: "Создать месячный отчёт" },
    officeReportCustomBtn: { he: "הפקת דוח מוגדר", en: "Generate custom report", ar: "إصدار تقرير مخصص", ru: "Создать произвольный отчёт" },
    officeNameReportNameLabel: { he: "שם", en: "Name", ar: "الاسم", ru: "Имя" },
    officeNameReportNamePlaceholder: { he: "הזינו שם", en: "Enter a name", ar: "أدخل اسمًا", ru: "Введите имя" },
    officeNameReportMonthLabel: { he: "חודש", en: "Month", ar: "الشهر", ru: "Месяц" },
    officeNameReportGenerateBtn: { he: "הפקה", en: "Generate", ar: "إصدار", ru: "Создать" },
    officeNameReportModalMessageMonthly: { he: "דוח חודשי לפי שם", en: "Monthly report by name", ar: "تقرير شهري حسب الاسم", ru: "Месячный отчёт по имени" },
    officeNameReportModalMessageCustom: { he: "דוח מוגדר לפי שם וטווח תאריכים", en: "Custom report by name and date range", ar: "تقرير مخصص حسب الاسم ونطاق التواريخ", ru: "Произвольный отчёт по имени и диапазону дат" },
    officeRangeReportModalMessageMonthly: { he: "דוח חודשי", en: "Monthly report", ar: "تقرير شهري", ru: "Месячный отчёт" },
    officeRangeReportModalMessageCustom: { he: "דוח מוגדר לפי טווח תאריכים", en: "Custom report by date range", ar: "تقرير مخصص حسب نطاق التواريخ", ru: "Произвольный отчёт по диапазону дат" },
    officeNameReportMissingNameMsg: { he: "יש להזין שם", en: "Please enter a name", ar: "الرجاء إدخال اسم", ru: "Пожалуйста, введите имя" },
    officeNameReportMissingMonthMsg: { he: "יש לבחור חודש", en: "Please choose a month", ar: "الرجاء اختيار شهر", ru: "Пожалуйста, выберите месяц" },
    officeReportColDate: { he: "תאריך", en: "Date", ar: "التاريخ", ru: "Дата" },
    officeReportColProject: { he: "פרויקט", en: "Project", ar: "مشروع", ru: "Проект" },
    officeReportColTool: { he: "כלי", en: "Tool", ar: "المعدة", ru: "Оборудование" },
    shareAppBtn: { he: "שיתוף קישור להתקנה", en: "Share install link", ar: "مشاركة رابط التثبيت", ru: "Поделиться ссылкой на установку" },
    addLogoBtn: { he: "הוספת לוגו", en: "Add logo", ar: "إضافة شعار", ru: "Добавить логотип" },
    chooseLogoTitle: { he: "בחר לוגו", en: "Choose logo", ar: "اختر شعارًا", ru: "Выберите логотип" },
    logoNoneOption: { he: "ללא לוגו", en: "No logo", ar: "بدون شعار", ru: "Без логотипа" },
    logoPickerEmptyMsg: { he: "אין לוגואים שמורים עדיין - ניתן להוסיף דרך התפריט העליון", en: "No saved logos yet - add one from the top menu", ar: "لا توجد شعارات محفوظة بعد - يمكن إضافة واحد من القائمة العلوية", ru: "Пока нет сохранённых логотипов - добавьте через верхнее меню" },
    logoAddedToast: { he: "הלוגו נוסף בהצלחה", en: "Logo added successfully", ar: "تمت إضافة الشعار بنجاح", ru: "Логотип успешно добавлен" },
    logoInvalidFileMsg: { he: "יש לבחור קובץ תמונה תקין", en: "Please choose a valid image file", ar: "الرجاء اختيار ملف صورة صالح", ru: "Пожалуйста, выберите корректный файл изображения" },
    menuLabelLanguage: { he: "שפה", en: "Language", ar: "اللغة", ru: "Язык" },
    searchBtnTitle: { he: "חיפוש משימות", en: "Search tasks", ar: "البحث عن المهام", ru: "Поиск задач" },
    headOfficeIconBtnTitle: { he: "מעבר למצב משרד ראשי", en: "Switch to Head Office mode", ar: "التبديل إلى وضع المكتب الرئيسي", ru: "Перейти в режим главного офиса" },
    searchInputPlaceholder: { he: "חיפוש משימות בכל הפרויקטים...", en: "Search tasks across all projects...", ar: "ابحث عن المهام في جميع المشاريع...", ru: "Поиск задач по всем проектам..." },
    searchEmptyPrompt: { he: "הקלידו כדי לחפש", en: "Type to search", ar: "اكتب للبحث", ru: "Введите текст для поиска" },
    searchNoResults: { he: "לא נמצאו תוצאות", en: "No results found", ar: "لم يتم العثور على نتائج", ru: "Ничего не найдено" },
    emptyStateToday: { he: "אין שורות בפרויקט הזה עדיין", en: "No rows in this project yet", ar: "لا توجد عناصر في هذا المشروع بعد", ru: "В этом проекте пока нет записей" },
    emptyStateFuture: { he: "אין עדיין משימות מתוכננות לתאריך הזה", en: "No tasks planned for this date yet", ar: "لا توجد مهام مخططة لهذا التاريخ بعد", ru: "На эту дату пока нет запланированных задач" },
    emptyStatePast: { he: "אין שורות מהתאריך הזה בפרויקט הזה", en: "No rows from this date in this project", ar: "لا توجد عناصر من هذا التاريخ في هذا المشروع", ru: "Нет записей за эту дату в этом проекте" },
    emptyStateCompleted: { he: "אין עדיין משימות שבוצעו בפרויקט הזה", en: "No completed tasks in this project yet", ar: "لا توجد مهام مكتملة في هذا المشروع بعد", ru: "В этом проекте пока нет выполненных задач" },
    showCompletedTasksBtn: { he: "משימות שבוצעו", en: "Completed tasks", ar: "المهام المكتملة", ru: "Выполненные задачи" },
    showActiveTasksBtn: { he: "משימות לא בוצעו", en: "Tasks not done", ar: "المهام غير المنجزة", ru: "Невыполненные задачи" },
    taskInputPlaceholder: { he: "חדש...", en: "New...", ar: "جديد...", ru: "Новое..." },
    addBtnTitle: { he: "הוספה", en: "Add", ar: "إضافة", ru: "Добавить" },
    addTypeModalMessage: { he: "איך להוסיף את השורה?", en: "How would you like to add this row?", ar: "كيف تريد إضافة هذا العنصر؟", ru: "Как добавить эту запись?" },
    addTypeTaskBtn: { he: "משימה", en: "Task", ar: "مهمة", ru: "Задача" },
    addTypeNoteBtn: { he: "מזכרת", en: "Note", ar: "ملاحظة", ru: "Заметка" },
    cancelBtn: { he: "ביטול", en: "Cancel", ar: "إلغاء", ru: "Отмена" },
    sheetActionModalMessage: { he: "מה לעשות עם הפרויקט?", en: "What would you like to do with this project?", ar: "ماذا تريد أن تفعل بهذا المشروع؟", ru: "Что сделать с этим проектом?" },
    deleteBtn: { he: "מחיקה", en: "Delete", ar: "حذف", ru: "Удалить" },
    shareBtn: { he: "שיתוף", en: "Share", ar: "مشاركة", ru: "Поделиться" },
    saveBtnTitle: { he: "שמירת קובץ", en: "Save file", ar: "حفظ الملف", ru: "Сохранить файл" },
    editReportBtnTitle: { he: "עריכת הדוח", en: "Edit report", ar: "تعديل التقرير", ru: "Изменить отчёт" },
    reportActionAddTasksBtn: { he: "הוספת המשימות לרשימה", en: "Add tasks to the list", ar: "إضافة المهام إلى القائمة", ru: "Добавить задачи в список" },
    reportTasksAddedMsg: { he: "נוספו {count} משימות לרשימת המשימות", en: "{count} tasks added to the task list", ar: "تمت إضافة {count} مهام إلى قائمة المهام", ru: "Добавлено задач: {count}" },
    reportTasksNoneToAdd: { he: "אין שורות עם תוכן להוספה", en: "There are no rows with content to add", ar: "لا توجد عناصر تحتوي على محتوى لإضافتها", ru: "Нет строк с содержимым для добавления" },
    reportTaskDueSuffix: { he: "עד", en: "due", ar: "حتى", ru: "до" },
    sheetActionEndBtn: { he: "הפרויקט הסתיים", en: "Project finished", ar: "انتهى المشروع", ru: "Проект завершён" },
    sheetActionReactivateBtn: { he: "הפעלת הפרויקט", en: "Reactivate project", ar: "إعادة تفعيل المشروع", ru: "Возобновить проект" },
    sheetActionMembersBtn: { he: "ניהול משתתפים", en: "Manage members", ar: "إدارة المشاركين", ru: "Управление участниками" },
    sheetActionMakeSharedBtn: { he: "הפיכה לפרויקט משותף", en: "Make into a shared project", ar: "تحويل إلى مشروع مشترك", ru: "Сделать общим проектом" },
    confirmYesBtn: { he: "כן", en: "Yes", ar: "نعم", ru: "Да" },
    confirmNoBtn: { he: "לא", en: "No", ar: "لا", ru: "Нет" },
    moveTaskModalMessage: { he: "מה לעשות עם המשימה?", en: "What to do with the task?", ar: "ماذا تفعل بالمهمة؟", ru: "Что сделать с задачей?" },
    moveTaskProjectsTitle: { he: "בחירת פרויקט יעד", en: "Choose a destination project", ar: "اختيار المشروع الوجهة", ru: "Выберите проект назначения" },
    shareTaskBtn: { he: "שיתוף", en: "Share", ar: "مشاركة", ru: "Поделиться" },
    taskChatQuoteBtnTitle: { he: "ציטוט בצ'אט הפרויקט", en: "Quote in the project chat", ar: "اقتباس في دردشة المشروع", ru: "Цитировать в чате проекта" },
    chatQuoteTaskLabel: { he: "משימה", en: "Task", ar: "مهمة", ru: "Задача" },
    chatQuoteNoteLabel: { he: "מזכרת", en: "Note", ar: "ملاحظة", ru: "Заметка" },
    taskReminderBtn: { he: "התראה", en: "Reminder", ar: "تذكير", ru: "Напоминание" },
    taskReminderModalMessage: { he: "תדירות ההתראה", en: "Reminder frequency", ar: "تكرار التذكير", ru: "Частота напоминания" },
    taskReminderEvery30: { he: "כל חצי שעה", en: "Every half hour", ar: "كل نصف ساعة", ru: "Каждые полчаса" },
    taskReminderEveryHour: { he: "כל שעה", en: "Every hour", ar: "كل ساعة", ru: "Каждый час" },
    taskReminderSpecificTime: { he: "בחר שעה", en: "Pick a time", ar: "اختر وقتًا", ru: "Выбрать время" },
    taskReminderTurnOff: { he: "כיבוי התראה", en: "Turn off reminder", ar: "إيقاف التذكير", ru: "Выключить напоминание" },
    taskReminderSetMsg: { he: "ההתראה הופעלה", en: "Reminder set", ar: "تم تفعيل التذكير", ru: "Напоминание установлено" },
    taskReminderOffMsg: { he: "ההתראה כובתה", en: "Reminder turned off", ar: "تم إيقاف التذكير", ru: "Напоминание выключено" },
    taskReminderActiveEvery30: { he: "פעילה: כל חצי שעה", en: "Active: every half hour", ar: "نشط: كل نصف ساعة", ru: "Активно: каждые полчаса" },
    taskReminderActiveEveryHour: { he: "פעילה: כל שעה", en: "Active: every hour", ar: "نشط: كل ساعة", ru: "Активно: каждый час" },
    taskReminderActiveAt: { he: "פעילה: בשעה ", en: "Active: at ", ar: "نشط: الساعة ", ru: "Активно: в " },
    contactPickFailedMsg: { he: "לא הצלחנו לפתוח את אנשי הקשר.", en: "Couldn't open your contacts.", ar: "تعذر فتح جهات الاتصال.", ru: "Не удалось открыть контакты." },
    calCopyPickProject: { he: "לאיזה פרויקט להעתיק?", en: "Copy to which project?", ar: "النسخ إلى أي مشروع؟", ru: "В какой проект скопировать?" },
    calCopiedTaskMsg: { he: "האירוע הועתק כמשימה לפרויקט", en: "Event copied as a task to", ar: "تم نسخ الحدث كمهمة إلى", ru: "Событие скопировано как задача в" },
    calCopiedNoteMsg: { he: "האירוע הועתק כמזכרת לפרויקט", en: "Event copied as a note to", ar: "تم نسخ الحدث كملاحظة إلى", ru: "Событие скопировано как заметка в" },
    calPickPrompt: { he: "בחרו מועד להתראה:", en: "Pick a time for the reminder:", ar: "اختر موعد التذكير:", ru: "Выберите время напоминания:" },
    calReminderSetMsg: { he: "נוסף ללוח השנה - התראה רבע שעה לפני", en: "Added to the calendar - reminder 15 minutes before", ar: "أضيف إلى التقويم - تذكير قبل 15 دقيقة", ru: "Добавлено в календарь - напоминание за 15 минут" },
    removeFromCalendarBtn: { he: "הסרה מלוח השנה", en: "Remove from calendar", ar: "إزالة من التقويم", ru: "Убрать из календаря" },
    removeFromCalendarConfirm: { he: "להסיר את המשימה מלוח השנה? האירוע יימחק מלוח השנה של הטלפון", en: "Remove the task from the calendar? The event will be deleted from the phone's calendar", ar: "إزالة المهمة من التقويم؟ سيتم حذف الحدث من تقويم الهاتف", ru: "Убрать задачу из календаря? Событие будет удалено из календаря телефона" },
    removeFromCalendarMsg: { he: "הוסר מלוח השנה", en: "Removed from the calendar", ar: "أزيل من التقويم", ru: "Убрано из календаря" },
    calInviteTitle: { he: "שיתוף האירוע בלוח השנה של:", en: "Share the event to the calendar of:", ar: "مشاركة الحدث في تقويم:", ru: "Добавить событие в календарь:" },
    chatFileOpeningMsg: { he: "פותח את הקובץ...", en: "Opening the file...", ar: "جارٍ فتح الملف...", ru: "Открываю файл..." },
    chatFileSavingMsg: { he: "שומר בספריית הפרויקט...", en: "Saving to the project library...", ar: "جارٍ الحفظ في مكتبة المشروع...", ru: "Сохраняю в библиотеку проекта..." },
    officeDataTitle: { he: "הזנת נתונים", en: "Data entry", ar: "إدخال البيانات", ru: "Ввод данных" },
    officeDataNameLabel: { he: "שם", en: "Name", ar: "الاسم", ru: "Имя" },
    officeDataIdLabel: { he: "ת\"ז (לא חובה)", en: "ID no. (optional)", ar: "رقم الهوية (اختياري)", ru: "№ удостов. (необяз.)" },
    officeDataIdShort: { he: "ת\"ז", en: "ID", ar: "هوية", ru: "ID" },
    officeDataEngineers: { he: "מהנדסים", en: "Engineers", ar: "المهندسون", ru: "Инженеры" },
    officeDataForemen: { he: "מנהלי עבודה", en: "Foremen", ar: "مديرو العمل", ru: "Прорабы" },
    officeDataWorkers: { he: "פועלים", en: "Workers", ar: "العمال", ru: "Рабочие" },
    officeDataOperators: { he: "מפעילים", en: "Operators", ar: "المشغلون", ru: "Операторы" },
    officeDataCrews: { he: "צוותים", en: "Crews", ar: "الطواقم", ru: "Бригады" },
    officeDataSurveyors: { he: "מודדים", en: "Surveyors", ar: "المساحون", ru: "Геодезисты" },
    chatSaveFolderTitle: { he: "לאיזו תיקייה בספרייה לשמור?", en: "Save to which library folder?", ar: "في أي مجلد في المكتبة تريد الحفظ؟", ru: "В какую папку библиотеки сохранить?" },
    chatFileSavedToFolderMsg: { he: "נשמר בספריית הפרויקט › {folder}", en: "Saved to the project library › {folder}", ar: "تم الحفظ في مكتبة المشروع › {folder}", ru: "Сохранено в библиотеке проекта › {folder}" },
    chatFileSavedToLibraryMsg: { he: "נשמר בספריית הפרויקט › הורדות", en: "Saved to the project library › Downloads", ar: "تم الحفظ في مكتبة المشروع › التنزيلات", ru: "Сохранено в библиотеке проекта › Загрузки" },
    chatFileSaveError: { he: "לא הצלחנו לשמור את הקובץ - נסו שוב", en: "Couldn't save the file - try again", ar: "تعذر حفظ الملف - حاول مرة أخرى", ru: "Не удалось сохранить файл - попробуйте ещё раз" },
    libraryFolderDownloads: { he: "הורדות", en: "Downloads", ar: "التنزيلات", ru: "Загрузки" },
    chatFileOpenError: { he: "לא הצלחנו לפתוח את הקובץ - נסו שוב", en: "Couldn't open the file - try again", ar: "تعذر فتح الملف - حاول مرة أخرى", ru: "Не удалось открыть файл - попробуйте ещё раз" },
    calInvitePushText: { he: "{name} הוסיף/ה אותך לאירוע:", en: "{name} added you to an event:", ar: "أضافك {name} إلى حدث:", ru: "{name} добавил(а) вас в событие:" },
    calInviteNoMembers: { he: "אין עוד משתתפים בפרויקט", en: "No other members in this project", ar: "لا يوجد أعضاء آخرون في المشروع", ru: "В проекте нет других участников" },
    calInviteSentMsg: { he: "האירוע נשלח ל־{n} משתתפים", en: "Event shared with {n} members", ar: "تمت مشاركة الحدث مع {n} أعضاء", ru: "Событие отправлено участникам: {n}" },
    calInviteClearedMsg: { he: "השיתוף בוטל", en: "Sharing removed", ar: "تم إلغاء المشاركة", ru: "Общий доступ отменён" },
    calEventGoneRemovedMsg: { he: "האירוע נמחק מלוח השנה, ולכן הוסר גם מהמשימה", en: "The event was deleted from the calendar, so it was removed from the task too", ar: "حُذف الحدث من التقويم، لذا أزيل من المهمة أيضًا", ru: "Событие удалено из календаря, поэтому убрано и из задачи" },
    calEventMissingMsg: { he: "האירוע כבר לא נמצא בלוח השנה", en: "The event is no longer in the calendar", ar: "الحدث لم يعد موجودًا في التقويم", ru: "Этого события больше нет в календаре" },
    calAppName: { he: "לוח שנה", en: "Calendar", ar: "التقويم", ru: "Календарь" },
    calToday: { he: "היום", en: "Today", ar: "اليوم", ru: "Сегодня" },
    calCalendarsTitle: { he: "יומנים", en: "Calendars", ar: "التقاويم", ru: "Календари" },
    calModeMonth: { he: "חודש", en: "Month", ar: "شهر", ru: "Месяц" },
    calModeWeek: { he: "שבוע", en: "Week", ar: "أسبوع", ru: "Неделя" },
    calModeDay: { he: "יום", en: "Day", ar: "يوم", ru: "День" },
    calModeAgenda: { he: "רשימה", en: "Agenda", ar: "قائمة", ru: "Список" },
    calEvTitlePlaceholder: { he: "כותרת", en: "Title", ar: "العنوان", ru: "Название" },
    calEvAllDay: { he: "כל היום", en: "All day", ar: "طوال اليوم", ru: "Весь день" },
    calEvStart: { he: "התחלה", en: "Starts", ar: "البداية", ru: "Начало" },
    calEvEnd: { he: "סיום", en: "Ends", ar: "النهاية", ru: "Конец" },
    calEvRepeat: { he: "חזרה", en: "Repeat", ar: "التكرار", ru: "Повтор" },
    calRepeatNone: { he: "ללא", en: "Does not repeat", ar: "بدون تكرار", ru: "Не повторять" },
    calRepeatDaily: { he: "כל יום", en: "Every day", ar: "كل يوم", ru: "Каждый день" },
    calRepeatWeekly: { he: "כל שבוע", en: "Every week", ar: "كل أسبوع", ru: "Каждую неделю" },
    calRepeatMonthly: { he: "כל חודש", en: "Every month", ar: "كل شهر", ru: "Каждый месяц" },
    calRepeatYearly: { he: "כל שנה", en: "Every year", ar: "كل سنة", ru: "Каждый год" },
    calEvSeriesNote: { he: "אירוע חוזר: השינויים יחולו על כל המופעים", en: "Repeating event: changes apply to every occurrence", ar: "حدث متكرر: التغييرات تنطبق على كل التكرارات", ru: "Повторяющееся событие: изменения применятся ко всем повторам" },
    calEvReminder: { he: "תזכורת", en: "Reminder", ar: "تذكير", ru: "Напоминание" },
    calReminderNone: { he: "ללא", en: "None", ar: "بدون", ru: "Нет" },
    calReminderAtTime: { he: "בזמן האירוע", en: "At start", ar: "عند البدء", ru: "В начале" },
    calReminder5: { he: "5 דקות לפני", en: "5 minutes before", ar: "قبل 5 دقائق", ru: "За 5 минут" },
    calReminder10: { he: "10 דקות לפני", en: "10 minutes before", ar: "قبل 10 دقائق", ru: "За 10 минут" },
    calReminder15: { he: "15 דקות לפני", en: "15 minutes before", ar: "قبل 15 دقيقة", ru: "За 15 минут" },
    calReminder30: { he: "30 דקות לפני", en: "30 minutes before", ar: "قبل 30 دقيقة", ru: "За 30 минут" },
    calReminder60: { he: "שעה לפני", en: "1 hour before", ar: "قبل ساعة", ru: "За час" },
    calReminder1440: { he: "יום לפני", en: "1 day before", ar: "قبل يوم", ru: "За день" },
    calEvCalendar: { he: "יומן", en: "Calendar", ar: "التقويم", ru: "Календарь" },
    calEvLocationPlaceholder: { he: "מיקום", en: "Location", ar: "الموقع", ru: "Место" },
    calEvDescriptionPlaceholder: { he: "תיאור", en: "Description", ar: "الوصف", ru: "Описание" },
    calSave: { he: "שמירה", en: "Save", ar: "حفظ", ru: "Сохранить" },
    calEvDelete: { he: "מחיקת האירוע", en: "Delete event", ar: "حذف الحدث", ru: "Удалить событие" },
    calDone: { he: "סיום", en: "Done", ar: "تم", ru: "Готово" },
    calNoTitle: { he: "(ללא כותרת)", en: "(No title)", ar: "(بدون عنوان)", ru: "(Без названия)" },
    calNoEvents: { he: "אין אירועים בתקופה הזו", en: "No events in this period", ar: "لا توجد أحداث في هذه الفترة", ru: "Нет событий за этот период" },
    calNoCalendars: { he: "לא נמצאו יומנים במכשיר", en: "No calendars found on this device", ar: "لم يتم العثور على تقاويم على هذا الجهاز", ru: "Календари на устройстве не найдены" },
    calNoWritableCalendar: { he: "אין במכשיר יומן שאפשר לשמור בו אירועים. הוסיפו חשבון Google או הפעילו סנכרון יומנים ב-Outlook.", en: "There's no calendar on this device that events can be saved to. Add a Google account or turn on calendar sync in Outlook.", ar: "لا يوجد تقويم على هذا الجهاز يمكن حفظ الأحداث فيه. أضف حساب Google أو فعّل مزامنة التقويم في Outlook.", ru: "На устройстве нет календаря для сохранения событий. Добавьте аккаунт Google или включите синхронизацию календаря в Outlook." },
    calPermissionNeeded: { he: "כדי להציג את לוח השנה של המכשיר, ITASK צריך הרשאת גישה ליומן.", en: "To show this device's calendar, ITASK needs calendar access.", ar: "لعرض تقويم الجهاز، يحتاج ITASK إلى إذن الوصول إلى التقويم.", ru: "Чтобы показать календарь устройства, ITASK нужен доступ к календарю." },
    calGrantAccess: { he: "אישור גישה", en: "Allow access", ar: "السماح بالوصول", ru: "Разрешить доступ" },
    calLoadError: { he: "לא הצלחנו לטעון את לוח השנה", en: "Couldn't load the calendar", ar: "تعذر تحميل التقويم", ru: "Не удалось загрузить календарь" },
    calSaveError: { he: "לא הצלחנו לשמור את השינוי ביומן", en: "Couldn't save the change to the calendar", ar: "تعذر حفظ التغيير في التقويم", ru: "Не удалось сохранить изменение в календаре" },
    calEndBeforeStart: { he: "שעת הסיום חייבת להיות אחרי שעת ההתחלה", en: "The end must be after the start", ar: "يجب أن تكون النهاية بعد البداية", ru: "Окончание должно быть после начала" },
    calSavedMsg: { he: "האירוע נשמר", en: "Event saved", ar: "تم حفظ الحدث", ru: "Событие сохранено" },
    calDeletedMsg: { he: "האירוע נמחק", en: "Event deleted", ar: "تم حذف الحدث", ru: "Событие удалено" },
    calDeleteConfirm: { he: "למחוק את האירוע?", en: "Delete this event?", ar: "حذف هذا الحدث؟", ru: "Удалить это событие?" },
    voiceNoSuchTask: { he: "לא מצאתי משימה פתוחה כזו", en: "I couldn't find such an open task", ar: "لم أجد مهمة مفتوحة كهذه", ru: "Не нашёл такую открытую задачу" },
    undoBtn: { he: "↶ ביטול", en: "↶ Undo", ar: "↶ تراجع", ru: "↶ Отменить" },
    voiceUndoneMsg: { he: "בוטל", en: "Undone", ar: "تم التراجع", ru: "Отменено" },
    morningSummaryLabel: { he: "סיכום בוקר", en: "Morning summary", ar: "ملخص الصباح", ru: "Утренняя сводка" },
    morningSummaryOn: { he: "התראה כל בוקר: מה יש היום", en: "A notification each morning: what's on today", ar: "إشعار كل صباح: ماذا لديك اليوم", ru: "Уведомление каждое утро: что сегодня" },
    morningSummaryAt: { he: "בשעה", en: "At", ar: "في الساعة", ru: "В" },
    morningTitle: { he: "☀ בוקר טוב – ITASK", en: "☀ Good morning – ITASK", ar: "☀ صباح الخير – ITASK", ru: "☀ Доброе утро – ITASK" },
    morningTasks: { he: "היום: {n} משימות", en: "Today: {n} tasks", ar: "اليوم: {n} مهام", ru: "Сегодня: {n} задач" },
    morningLate: { he: "{n} פעילויות באיחור", en: "{n} late activities", ar: "{n} أنشطة متأخرة", ru: "{n} работ с опозданием" },
    morningFirst: { he: "תזכורת ב-{time} – {text}", en: "a reminder at {time} – {text}", ar: "تذكير في {time} – {text}", ru: "напоминание в {time} – {text}" },
    diaryPhotosTile: { he: "תמונות", en: "Photos", ar: "صور", ru: "Фото" },
    diaryPhotos: { he: "תמונות מהשטח", en: "Site photos", ar: "صور من الموقع", ru: "Фото с объекта" },
    diaryPhotosCamera: { he: "📷 צילום", en: "📷 Take a photo", ar: "📷 التقاط صورة", ru: "📷 Снять" },
    diaryPhotosGallery: { he: "🖼 מהגלריה", en: "🖼 From the gallery", ar: "🖼 من المعرض", ru: "🖼 Из галереи" },
    diaryPhotosEmpty: { he: "עוד אין תמונות ביום הזה", en: "No photos this day yet", ar: "لا توجد صور في هذا اليوم بعد", ru: "За этот день фото пока нет" },
    diaryPhotosSaving: { he: "שומר את התמונות...", en: "Saving the photos...", ar: "جارٍ حفظ الصور...", ru: "Сохраняю фото..." },
    diaryPhotosSaved: { he: "התמונות נשמרו ביומן ובספרייה (תמונות)", en: "Saved to the diary and the library (Photos)", ar: "تم الحفظ في اليومية والمكتبة (الصور)", ru: "Сохранено в журнал и библиотеку (Фото)" },
    diaryPhotoName: { he: "תמונה", en: "Photo", ar: "صورة", ru: "Фото" },
    diaryPhotoDeleteConfirm: { he: "להוריד את התמונה מהיומן? (העותק בספרייה נשאר)", en: "Take the photo off the diary? (the copy in the library stays)", ar: "إزالة الصورة من اليومية؟ (النسخة في المكتبة تبقى)", ru: "Убрать фото из журнала? (копия в библиотеке останется)" },
    diaryWeatherLine: { he: "מזג אוויר: {w}", en: "Weather: {w}", ar: "الطقس: {w}", ru: "Погода: {w}" },
    diaryPlaceAsk: { he: "באיזה יישוב האתר? (בשביל מזג האוויר על התמונות)", en: "Which town is the site in? (for the weather on the photos)", ar: "في أي بلدة الموقع؟ (لأجل الطقس على الصور)", ru: "В каком населённом пункте объект? (для погоды на фото)" },
    diaryPlaceSkip: { he: "בלי מזג אוויר", en: "No weather", ar: "بدون طقس", ru: "Без погоды" },
    diaryPlaceNotFound: { he: "לא מצאתי את היישוב – התמונות יישמרו בלי מזג אוויר", en: "Couldn't find that town - the photos are saved without weather", ar: "لم أجد البلدة – ستُحفظ الصور بدون طقس", ru: "Не нашёл такой пункт – фото сохранятся без погоды" },
    weatherClear: { he: "בהיר", en: "clear", ar: "صافٍ", ru: "ясно" },
    weatherPartly: { he: "מעונן חלקית", en: "partly cloudy", ar: "غائم جزئياً", ru: "переменная облачность" },
    weatherCloudy: { he: "מעונן", en: "cloudy", ar: "غائم", ru: "облачно" },
    weatherFog: { he: "ערפל", en: "fog", ar: "ضباب", ru: "туман" },
    weatherDrizzle: { he: "טפטוף", en: "drizzle", ar: "رذاذ", ru: "морось" },
    weatherRain: { he: "גשם", en: "rain", ar: "مطر", ru: "дождь" },
    weatherSnow: { he: "שלג", en: "snow", ar: "ثلج", ru: "снег" },
    weatherStorm: { he: "סופת רעמים", en: "thunderstorm", ar: "عاصفة رعدية", ru: "гроза" },
    weatherWind: { he: "רוח {n} קמ\"ש", en: "wind {n} km/h", ar: "رياح {n} كم/س", ru: "ветер {n} км/ч" },
    workPlanFilterAll: { he: "כל הפעילויות", en: "All activities", ar: "كل الأنشطة", ru: "Все работы" },
    workPlanDiaryPctTitle: { he: "אחוז הביצוע: גרור או לחץ לאורך השדה", en: "% done: drag or tap along the bar", ar: "نسبة الإنجاز: اسحب أو انقر على الشريط", ru: "% выполнения: проведите или нажмите по полосе" },
    workPlanResultClear: { he: "ניקוי הסימון של היום", en: "Clear today's mark", ar: "مسح علامة اليوم", ru: "Сбросить отметку дня" },
    voiceMenuLabel: { he: "פקודה קולית", en: "Voice command", ar: "أمر صوتي", ru: "Голосовая команда" },
    morningReportTitle: { he: "דוח בוקר", en: "Morning report", ar: "تقرير الصباح", ru: "Утренний отчёт" },
    morningAttention: { he: "שים לב", en: "Heads up", ar: "انتبه", ru: "Обратите внимание" },
    morningLateActivity: { he: "{name} באיחור – הייתה צריכה להסתיים ב-{date}", en: "{name} is late - it was due {date}", ar: "{name} متأخر – كان يجب أن ينتهي في {date}", ru: "{name} опаздывает – срок был {date}" },
    morningSlipping: { he: "{name}: לפי הקצב תסתיים ב-{date}, {n} ימים אחרי התכנון", en: "{name}: at this pace it ends {date}, {n} days late", ar: "{name}: بهذه الوتيرة سينتهي في {date}، متأخراً {n} أيام", ru: "{name}: при таком темпе закончится {date}, на {n} дн. позже" },
    morningDrags: { he: "ותגרור את: {list}", en: "and holds up: {list}", ar: "وسيؤخر: {list}", ru: "и задержит: {list}" },
    morningOlderTasks: { he: "{n} משימות מימים קודמים שעוד לא בוצעו", en: "{n} tasks from earlier days still open", ar: "{n} مهام من أيام سابقة لم تُنجز", ru: "{n} задач с прошлых дней не выполнены" },
    morningAllGood: { he: "✓ אין משהו דחוף", en: "✓ Nothing urgent", ar: "✓ لا شيء عاجل", ru: "✓ Ничего срочного" },
    morningTasksTitle: { he: "משימות", en: "Tasks", ar: "المهام", ru: "Задачи" },
    morningFrom: { he: "מ-{date}", en: "from {date}", ar: "من {date}", ru: "с {date}" },
    morningNoTasks: { he: "אין משימות פתוחות להיום", en: "No open tasks for today", ar: "لا مهام مفتوحة لليوم", ru: "Нет открытых задач на сегодня" },
    morningMoreTasks: { he: "הצג גם את השבוע הקרוב", en: "Show the coming week too", ar: "اعرض الأسبوع القادم أيضاً", ru: "Показать и ближайшую неделю" },
    morningLessTasks: { he: "רק עד היום", en: "Only up to today", ar: "حتى اليوم فقط", ru: "Только до сегодня" },
    morningPlansTitle: { he: "תוכניות עבודה", en: "Work plans", ar: "خطط العمل", ru: "Планы работ" },
    morningStarts: { he: "מתחילה ב-{date}", en: "starts {date}", ar: "تبدأ في {date}", ru: "начало {date}" },
    morningNoActivities: { he: "אין פעילויות בביצוע או בקרוב", en: "Nothing under way or coming up", ar: "لا أنشطة جارية أو قريبة", ru: "Нет текущих или ближайших работ" },
    morningWholePlan: { he: "הצג את כל התוכנית", en: "Show the whole plan", ar: "اعرض الخطة كاملة", ru: "Показать весь план" },
    morningLessPlan: { he: "רק מה שבביצוע ובקרוב", en: "Only what's under way and coming up", ar: "الجاري والقريب فقط", ru: "Только текущее и ближайшее" },
    morningNothingToday: { he: "אין משהו פתוח להיום", en: "Nothing open today", ar: "لا شيء مفتوح اليوم", ru: "На сегодня ничего" },
    morningRange: { he: "{from} עד {to}", en: "{from} to {to}", ar: "{from} حتى {to}", ru: "{from} – {to}" },
    floatLabel: { he: "הודעה צפה", en: "Floating task", ar: "رسالة عائمة", ru: "Всплывающая задача" },
    floatOn: { he: "משימה מפרויקט אחר: כל רבע שעה בין 06:00 ל-18:00, וכל חצי שעה בשאר השעות", en: "A task from the next project: every quarter hour 06:00–18:00, every half hour otherwise", ar: "مهمة من مشروع آخر: كل ربع ساعة 06:00–18:00، وكل نصف ساعة في باقي الساعات", ru: "Задача из следующего проекта: каждые 15 минут с 06:00 до 18:00, иначе каждые 30 минут" },
    floatAllowBtn: { he: "לאישור \"הצגה מעל אפליקציות אחרות\"", en: "Allow \"Display over other apps\"", ar: "السماح بـ\"الظهور فوق التطبيقات الأخرى\"", ru: "Разрешить «Поверх других приложений»" },
    floatAsk: { he: "משימה פתוחה מפרויקט אחר תקפוץ לכמה שניות מעל המסך: כל רבע שעה בין 06:00 ל-18:00, וכל חצי שעה בשאר השעות. לשם כך אנדרואיד צריך אישור חד-פעמי: \"הצגה מעל אפליקציות אחרות\". לפתוח את מסך האישור? (בחר שם ITASK והפעל)", en: "An open task from the next project pops up over the screen for a few seconds: every quarter hour 06:00–18:00, every half hour otherwise. Android needs a one-time permission for that: \"Display over other apps\". Open it now? (pick ITASK there and switch it on)", ar: "ستظهر لثوانٍ مهمة مفتوحة من مشروع آخر فوق الشاشة: كل ربع ساعة 06:00–18:00، وكل نصف ساعة في باقي الساعات. يحتاج أندرويد لإذن لمرة واحدة: \"الظهور فوق التطبيقات الأخرى\". فتح شاشة الإذن؟ (اختر ITASK وفعّله)", ru: "Поверх экрана на несколько секунд появится открытая задача из следующего проекта: каждые 15 минут с 06:00 до 18:00, иначе каждые 30 минут. Нужно разовое разрешение «Поверх других приложений». Открыть? (выберите ITASK и включите)" },
    teamMenuLabel: { he: "צוות", en: "Team", ar: "الفريق", ru: "Команда" },
    teamBtn: { he: "מהנדסים ומנהלי עבודה", en: "Engineers and site managers", ar: "مهندسون ومديرو عمل", ru: "Инженеры и прорабы" },
    teamTitle: { he: "הצוות", en: "The team", ar: "الفريق", ru: "Команда" },
    teamEngineers: { he: "מהנדסים", en: "Engineers", ar: "المهندسون", ru: "Инженеры" },
    teamEngineersHint: { he: "רואים ועורכים את הנתונים הכספיים של הפרויקטים", en: "See and edit the projects' finances", ar: "يرون ويعدّلون البيانات المالية للمشاريع", ru: "Видят и редактируют финансы проектов" },
    teamSiteManagers: { he: "מנהלי עבודה", en: "Site managers", ar: "مديرو العمل", ru: "Прорабы" },
    teamSiteManagersHint: { he: "בלי גישה לנתונים הכספיים", en: "No access to the finances", ar: "بدون وصول إلى البيانات المالية", ru: "Без доступа к финансам" },
    teamFromContacts: { he: "＋ מאנשי הקשר", en: "＋ From contacts", ar: "＋ من جهات الاتصال", ru: "＋ Из контактов" },
    teamTypeNumber: { he: "＋ הקלדת מספר", en: "＋ Type a number", ar: "＋ كتابة رقم", ru: "＋ Ввести номер" },
    teamNamePh: { he: "שם", en: "Name", ar: "الاسم", ru: "Имя" },
    teamPhonePh: { he: "מספר טלפון", en: "Phone number", ar: "رقم الهاتف", ru: "Номер телефона" },
    teamAddBtn: { he: "הוספה", en: "Add", ar: "إضافة", ru: "Добавить" },
    teamEmpty: { he: "עדיין אין אף אחד", en: "No one yet", ar: "لا أحد بعد", ru: "Пока никого" },
    teamMakeEngineer: { he: "העבר למהנדסים", en: "Make engineer", ar: "انقل إلى المهندسين", ru: "Сделать инженером" },
    teamMakeSiteManager: { he: "העבר למנהלי עבודה", en: "Make site manager", ar: "انقل إلى مديري العمل", ru: "Сделать прорабом" },
    teamRemoveConfirm: { he: "להסיר את {name} מהצוות?", en: "Remove {name} from the team?", ar: "إزالة {name} من الفريق؟", ru: "Удалить {name} из команды?" },
    teamBadPhone: { he: "מספר טלפון לא תקין", en: "Invalid phone number", ar: "رقم هاتف غير صالح", ru: "Неверный номер телефона" },
    teamAlready: { he: "{name} כבר בצוות", en: "{name} is already on the team", ar: "{name} موجود في الفريق", ru: "{name} уже в команде" },
    teamSaveError: { he: "לא הצלחתי לשמור. בדוק את החיבור לאינטרנט ונסה שוב.", en: "Couldn't save. Check the connection and try again.", ar: "تعذر الحفظ. تحقق من الاتصال وحاول مجدداً.", ru: "Не удалось сохранить. Проверьте подключение и попробуйте снова." },
    teamLoadError: { he: "לא הצלחתי לטעון את הצוות (ייתכן שצריך להריץ את team_and_finance.sql ב-Supabase)", en: "Couldn't load the team (team_and_finance.sql may need to be run in Supabase)", ar: "تعذر تحميل الفريق (قد يلزم تشغيل team_and_finance.sql في Supabase)", ru: "Не удалось загрузить команду (возможно, нужно запустить team_and_finance.sql в Supabase)" },
    teamIAmEngineer: { he: "אתה מהנדס בצוות של {name}", en: "You're an engineer on {name}'s team", ar: "أنت مهندس في فريق {name}", ru: "Вы инженер в команде {name}" },
    teamIAmSiteManager: { he: "אתה מנהל עבודה בצוות של {name}", en: "You're a site manager on {name}'s team", ar: "أنت مدير عمل في فريق {name}", ru: "Вы прораб в команде {name}" },
    budgetTile: { he: "בקרה תקציבית", en: "Budget control", ar: "الرقابة على الميزانية", ru: "Контроль бюджета" },
    budgetComingSoon: { he: "כאן תהיה הבקרה התקציבית של הפרויקט: תקציב לפי פרקים, הוצאות עם צילום חשבונית, וביצוע מול תקציב. המסך בבנייה.", en: "The project's budget control will be here: budget by chapters, expenses with the invoice photo, and actual vs budget. Being built.", ar: "هنا ستكون الرقابة على ميزانية المشروع: الميزانية حسب البنود، المصروفات مع صورة الفاتورة، والفعلي مقابل الميزانية. قيد الإنشاء.", ru: "Здесь будет контроль бюджета проекта: бюджет по разделам, расходы с фото счёта и факт против бюджета. В разработке." },
    voiceBtnTitle: { he: "פקודה קולית", en: "Voice command", ar: "أمر صوتي", ru: "Голосовая команда" },
    voiceListening: { he: "מקשיב... דבר עכשיו", en: "Listening... speak now", ar: "أستمع... تكلّم الآن", ru: "Слушаю... говорите" },
    voiceThinking: { he: "מבין...", en: "Understanding...", ar: "أفهم...", ru: "Разбираю..." },
    voiceNoSpeech: { he: "לא נשמע דיבור. לחץ על 🎤 ונסה שוב.", en: "No speech heard. Tap 🎤 to try again.", ar: "لم يُسمع كلام. اضغط 🎤 وحاول مجدداً.", ru: "Речь не услышана. Нажмите 🎤 и попробуйте снова." },
    voicePermissionMsg: { he: "צריך לאשר גישה למיקרופון כדי לתת פקודות קוליות.", en: "Allow microphone access to use voice commands.", ar: "اسمح بالوصول إلى الميكروفون لاستخدام الأوامر الصوتية.", ru: "Разрешите доступ к микрофону для голосовых команд." },
    voiceReminderDefault: { he: "תזכורת", en: "Reminder", ar: "تذكير", ru: "Напоминание" },
    voiceSaveBtn: { he: "אישור", en: "Confirm", ar: "تأكيد", ru: "Подтвердить" },
    voiceAddedMsg: { he: "נוסף", en: "Added", ar: "تمت الإضافة", ru: "Добавлено" },
    voiceAddedReminderMsg: { he: "נוסף עם תזכורת", en: "Added with a reminder", ar: "تمت الإضافة مع تذكير", ru: "Добавлено с напоминанием" },
    voiceAiLabel: { he: "בינה מלאכותית בטלפון (Gemini Nano)", en: "On-phone AI (Gemini Nano)", ar: "ذكاء اصطناعي في الهاتف (Gemini Nano)", ru: "ИИ в телефоне (Gemini Nano)" },
    voiceAiAvailable: { he: "פעיל", en: "ready", ar: "جاهز", ru: "готов" },
    voiceAiDownloading: { he: "מוריד את המודל...", en: "downloading the model...", ar: "جارٍ تنزيل النموذج...", ru: "загрузка модели..." },
    voiceAiUnavailable: { he: "לא זמין בטלפון הזה", en: "not available on this phone", ar: "غير متوفر في هذا الهاتف", ru: "недоступен на этом телефоне" },
    voiceAiFailed: { he: "ההורדה נכשלה, ינסה שוב בפעם הבאה", en: "download failed, will retry next time", ar: "فشل التنزيل، ستتم المحاولة لاحقاً", ru: "загрузка не удалась, повторим позже" },
    voicePlanAddedMsg: { he: "נוסף לתוכנית העבודה", en: "Added to the work plan", ar: "أضيف إلى خطة العمل", ru: "Добавлено в план работ" },
    voiceDoneMsg: { he: "סומן כבוצע", en: "Marked as done", ar: "تم التحديد كمنجز", ru: "Отмечено выполненной" },
    scanBtnTitle: { he: "סריקת מסמך", en: "Scan a document", ar: "مسح مستند", ru: "Сканировать документ" },
    scanTitle: { he: "סריקת מסמך", en: "Scan a document", ar: "مسح مستند", ru: "Сканирование документа" },
    scanEmpty: { he: "עדיין אין עמודים. צלם את העמוד הראשון.", en: "No pages yet. Photograph the first page.", ar: "لا توجد صفحات بعد. صوّر الصفحة الأولى.", ru: "Страниц пока нет. Сфотографируйте первую." },
    scanCaptureBtn: { he: "📷 צילום עמוד", en: "📷 Take page", ar: "📷 تصوير صفحة", ru: "📷 Снять страницу" },
    scanGalleryBtn: { he: "🖼 מהגלריה", en: "🖼 From gallery", ar: "🖼 من المعرض", ru: "🖼 Из галереи" },
    scanDocMode: { he: "מצב מסמך (רקע לבן, טקסט חד)", en: "Document mode (white paper, sharp text)", ar: "وضع المستند (خلفية بيضاء، نص واضح)", ru: "Режим документа (белый фон, чёткий текст)" },
    scanNameLabel: { he: "שם הקובץ", en: "File name", ar: "اسم الملف", ru: "Имя файла" },
    scanSaveBtn: { he: "שמירה כ-PDF", en: "Save as PDF", ar: "حفظ كـ PDF", ru: "Сохранить в PDF" },
    scanRotate: { he: "סיבוב", en: "Rotate", ar: "تدوير", ru: "Повернуть" },
    scanDefaultName: { he: "סריקה", en: "Scan", ar: "مسح", ru: "Скан" },
    scanSavingMsg: { he: "יוצר PDF ושומר...", en: "Creating the PDF and saving...", ar: "جارٍ إنشاء PDF وحفظه...", ru: "Создаём PDF и сохраняем..." },
    scanSavedMsg: { he: "נשמר בספרייה › {folder}", en: "Saved to the library › {folder}", ar: "تم الحفظ في المكتبة › {folder}", ru: "Сохранено в библиотеке › {folder}" },
    scanSaveError: { he: "השמירה נכשלה. בדוק את החיבור לאינטרנט ונסה שוב.", en: "Saving failed. Check the internet connection and try again.", ar: "فشل الحفظ. تحقق من الاتصال بالإنترنت وحاول مجدداً.", ru: "Не удалось сохранить. Проверьте интернет и попробуйте снова." },
    scanEditTitle: { he: "עריכת העמוד", en: "Edit page", ar: "تعديل الصفحة", ru: "Редактировать страницу" },
    scanCrop: { he: "✂ חיתוך", en: "✂ Crop", ar: "✂ قص", ru: "✂ Обрезка" },
    scanRotateLeft: { he: "סיבוב שמאלה", en: "Rotate left", ar: "تدوير لليسار", ru: "Повернуть влево" },
    scanRotateRight: { he: "סיבוב ימינה", en: "Rotate right", ar: "تدوير لليمين", ru: "Повернуть вправо" },
    scanFilter: { he: "🎨 מסנן", en: "🎨 Filter", ar: "🎨 فلتر", ru: "🎨 Фильтр" },
    scanLight: { he: "☀ בהירות", en: "☀ Brightness", ar: "☀ السطوع", ru: "☀ Яркость" },
    scanCropHint: { he: "גרור את הפינות לקצוות הדף", en: "Drag the corners to the page edges", ar: "اسحب الزوايا إلى حواف الصفحة", ru: "Перетащите углы к краям листа" },
    scanCropReset: { he: "כל התמונה", en: "Whole photo", ar: "الصورة كاملة", ru: "Всё фото" },
    scanFilterDoc: { he: "מסמך", en: "Document", ar: "مستند", ru: "Документ" },
    scanFilterColor: { he: "מקורי", en: "Original", ar: "الأصلي", ru: "Оригинал" },
    scanFilterGray: { he: "אפור", en: "Grey", ar: "رمادي", ru: "Серый" },
    scanFilterVivid: { he: "צבע משופר", en: "Enhanced colour", ar: "ألوان محسّنة", ru: "Яркие цвета" },
    scanEditDone: { he: "אישור", en: "Done", ar: "تأكيد", ru: "Готово" },
    scanDeletePage: { he: "מחיקת עמוד", en: "Delete page", ar: "حذف الصفحة", ru: "Удалить страницу" },
    scanDiscardConfirm: { he: "לבטל את הסריקה? העמודים שצולמו יימחקו.", en: "Discard this scan? The pages taken will be lost.", ar: "إلغاء المسح؟ ستُحذف الصفحات الملتقطة.", ru: "Отменить сканирование? Снятые страницы будут удалены." },
    workPlanTitle: { he: "תוכנית עבודה", en: "Work plan", ar: "خطة العمل", ru: "План работ" },
    workPlanOfficeTitle: { he: "תוכנית עבודה מרוכזת", en: "Combined work plan", ar: "خطة العمل الموحدة", ru: "Сводный план работ" },
    workPlanWeek: { he: "שבוע", en: "Week", ar: "أسبوع", ru: "Неделя" },
    workPlanMonth: { he: "חודש", en: "Month", ar: "شهر", ru: "Месяц" },
    workPlanAll: { he: "הכל", en: "All", ar: "الكل", ru: "Всё" },
    workPlanToday: { he: "היום", en: "Today", ar: "اليوم", ru: "Сегодня" },
    workPlanActivity: { he: "פעילות", en: "Activity", ar: "النشاط", ru: "Работа" },
    workPlanEmpty: { he: "עדיין אין פעילויות. לחץ ➕ כדי להוסיף.", en: "No activities yet. Tap ➕ to add one.", ar: "لا توجد أنشطة بعد. اضغط ➕ للإضافة.", ru: "Работ пока нет. Нажмите ➕, чтобы добавить." },
    workPlanStatusDone: { he: "הושלם", en: "Done", ar: "مكتمل", ru: "Выполнено" },
    workPlanStatusProg: { he: "בביצוע", en: "In progress", ar: "قيد التنفيذ", ru: "В работе" },
    workPlanStatusLate: { he: "באיחור", en: "Late", ar: "متأخر", ru: "Просрочено" },
    workPlanStatusTodo: { he: "טרם התחיל", en: "Not started", ar: "لم يبدأ", ru: "Не начато" },
    workPlanLateCount: { he: "{n} באיחור", en: "{n} late", ar: "{n} متأخر", ru: "{n} просрочено" },
    workPlanLateBanner: { he: "{n} פעילויות באיחור", en: "{n} activities are late", ar: "{n} أنشطة متأخرة", ru: "Просрочено работ: {n}" },
    workPlanLateBannerOffice: { he: "{n} פעילויות באיחור ב-{p} פרויקטים", en: "{n} activities late in {p} projects", ar: "{n} أنشطة متأخرة في {p} مشاريع", ru: "Просрочено работ: {n}, проектов: {p}" },
    workPlanAddTitle: { he: "הוספת פעילות", en: "Add activity", ar: "إضافة نشاط", ru: "Добавить работу" },
    workPlanEditTitle: { he: "עריכת פעילות", en: "Edit activity", ar: "تعديل النشاط", ru: "Изменить работу" },
    workPlanName: { he: "שם הפעילות", en: "Activity", ar: "اسم النشاط", ru: "Название работы" },
    workPlanFrom: { he: "מתאריך", en: "From", ar: "من تاريخ", ru: "С" },
    workPlanTo: { he: "עד תאריך", en: "To", ar: "حتى تاريخ", ru: "По" },
    workPlanBy: { he: "מבצע", en: "Carried out by", ar: "المنفّذ", ru: "Исполнитель" },
    workPlanStatus: { he: "מצב", en: "Status", ar: "الحالة", ru: "Статус" },
    workPlanProgress: { he: "התקדמות: {p}%", en: "Progress: {p}%", ar: "التقدم: {p}%", ru: "Выполнено: {p}%" },
    workPlanNote: { he: "הערה", en: "Note", ar: "ملاحظة", ru: "Примечание" },
    workPlanHammock: { he: "ערסל", en: "Hammock", ar: "مجموعة (Hammock)", ru: "Группа (hammock)" },
    workPlanNoHammock: { he: "ללא ערסל", en: "No hammock", ar: "بدون مجموعة", ru: "Без группы" },
    workPlanNoHammockOption: { he: "ללא ערסל", en: "No hammock", ar: "بدون مجموعة", ru: "Без группы" },
    workPlanHammockNew: { he: "＋ ערסל חדש…", en: "＋ New hammock…", ar: "＋ مجموعة جديدة…", ru: "＋ Новая группа…" },
    workPlanHammockNewTitle: { he: "ערסל חדש", en: "New hammock", ar: "مجموعة جديدة", ru: "Новая группа" },
    workPlanHammockEditTitle: { he: "עריכת ערסל", en: "Edit hammock", ar: "تعديل المجموعة", ru: "Изменить группу" },
    workPlanHammockPlaceholder: { he: "למשל: בניין A, חניון, פיתוח", en: "e.g. Building A, parking, landscaping", ar: "مثلاً: مبنى A، موقف، تطوير", ru: "напр.: корпус A, парковка, благоустройство" },
    workPlanHammockMenuTitle: { he: "שיוך לערסל: {name}", en: "Put in a hammock: {name}", ar: "إضافة إلى مجموعة: {name}", ru: "В группу: {name}" },
    workPlanHammockCount: { he: "{n} פעילויות", en: "{n} activities", ar: "{n} أنشطة", ru: "{n} работ" },
    workPlanBaseline: { he: "📌 קו בסיס", en: "📌 Baseline", ar: "📌 خط الأساس", ru: "📌 Базовый план" },
    workPlanBaselineLegend: { he: "קו בסיס", en: "Baseline", ar: "خط الأساس", ru: "Базовый план" },
    workPlanBaselineExplain: { he: "קו בסיס שומר את התאריכים של כל הפעילויות כמו שהם עכשיו. אחר כך הגאנט יראה מתחת לכל פעילות פס אפור של מה שתוכנן, וכמה ימים היא זזה.", en: "A baseline keeps every activity's dates as they are now; the chart then shows a grey bar of what was planned under each one, and how many days it has slipped.", ar: "خط الأساس يحفظ تواريخ كل الأنشطة كما هي الآن؛ بعدها يعرض المخطط تحت كل نشاط شريطاً رمادياً لما خُطط له، وكم يوماً تأخر.", ru: "Базовый план сохраняет текущие даты всех работ; затем под каждой работой видна серая полоса плана и на сколько дней она сдвинулась." },
    workPlanBaselineSavedOn: { he: "קו הבסיס נשמר ב-{date}", en: "Baseline saved on {date}", ar: "تم حفظ خط الأساس في {date}", ru: "Базовый план сохранён {date}" },
    workPlanBaselineSave: { he: "📌 שמירת קו בסיס", en: "📌 Save a baseline", ar: "📌 حفظ خط الأساس", ru: "📌 Сохранить базовый план" },
    workPlanBaselineUpdate: { he: "📌 עדכון קו הבסיס לתוכנית של היום", en: "📌 Update it to today's plan", ar: "📌 تحديثه إلى خطة اليوم", ru: "📌 Обновить по текущему плану" },
    workPlanBaselineHide: { he: "🙈 הסתרת קו הבסיס", en: "🙈 Hide the baseline", ar: "🙈 إخفاء خط الأساس", ru: "🙈 Скрыть базовый план" },
    workPlanBaselineShow: { he: "👁 הצגת קו הבסיס", en: "👁 Show the baseline", ar: "👁 إظهار خط الأساس", ru: "👁 Показать базовый план" },
    workPlanBaselineDelete: { he: "🗑 מחיקת קו הבסיס", en: "🗑 Delete the baseline", ar: "🗑 حذف خط الأساس", ru: "🗑 Удалить базовый план" },
    workPlanBaselineDeleteConfirm: { he: "למחוק את קו הבסיס?", en: "Delete the baseline?", ar: "حذف خط الأساس؟", ru: "Удалить базовый план?" },
    workPlanBaselineSavedMsg: { he: "קו הבסיס נשמר", en: "Baseline saved", ar: "تم حفظ خط الأساس", ru: "Базовый план сохранён" },
    workPlanSlip: { he: "+{n} ימים", en: "+{n} days", ar: "+{n} أيام", ru: "+{n} дн." },
    workPlanExcelActivity: { he: "פעילות", en: "Activity", ar: "النشاط", ru: "Работа" },
    workPlanExcelDays: { he: "ימים", en: "Days", ar: "أيام", ru: "Дней" },
    workPlanExcelDone: { he: "ביצוע", en: "Done", ar: "الإنجاز", ru: "Выполнено" },
    workPlanExcelBaseStart: { he: "קו בסיס – התחלה", en: "Baseline start", ar: "خط الأساس – البداية", ru: "База – начало" },
    workPlanExcelBaseEnd: { he: "קו בסיס – סיום", en: "Baseline end", ar: "خط الأساس – النهاية", ru: "База – конец" },
    workPlanExcelSlip: { he: "סטייה (ימים)", en: "Slip (days)", ar: "الانحراف (أيام)", ru: "Сдвиг (дн.)" },
    workPlanActualStart: { he: "התחלה בפועל", en: "Actual start", ar: "البداية الفعلية", ru: "Факт. начало" },
    workPlanActualEnd: { he: "סיום בפועל", en: "Actual finish", ar: "الانتهاء الفعلي", ru: "Факт. окончание" },
    workPlanForecast: { he: "צפי סיום", en: "Forecast finish", ar: "الانتهاء المتوقع", ru: "Прогноз окончания" },
    workPlanForecastShort: { he: "צפי: {date}", en: "Forecast: {date}", ar: "متوقع: {date}", ru: "Прогноз: {date}" },
    workPlanForecastConfirm: { he: "לפי קצב ההתקדמות, \"{name}\" צפויה להסתיים ב-{date}. לעדכן את התוכנית לפי הצפי?", en: "At its pace so far, \"{name}\" should end on {date}. Update the plan to it?", ar: "حسب وتيرة التقدم، يُتوقع أن ينتهي \"{name}\" في {date}. تحديث الخطة حسب ذلك؟", ru: "Судя по темпу, «{name}» закончится {date}. Обновить план?" },
    workPlanPullConfirm: { he: "\"{name}\" הסתיימה מוקדם. הפעילויות שאחריה יכולות להתחיל מוקדם יותר – להקדים? {list}", en: "\"{name}\" ended early. What follows it can start earlier - bring it forward? {list}", ar: "انتهى \"{name}\" مبكراً. يمكن أن تبدأ الأنشطة التالية أبكر – تقديمها؟ {list}", ru: "«{name}» закончилась раньше. Следующие работы могут начаться раньше – перенести? {list}" },
    workPlanSave: { he: "שמירה", en: "Save", ar: "حفظ", ru: "Сохранить" },
    workPlanDeleteConfirm: { he: "למחוק את הפעילות מהתוכנית?", en: "Delete this activity from the plan?", ar: "حذف هذا النشاط من الخطة؟", ru: "Удалить эту работу из плана?" },
    workPlanSaveError: { he: "השמירה נכשלה. בדוק את החיבור לאינטרנט ונסה שוב.", en: "Saving failed. Check the connection and try again.", ar: "فشل الحفظ. تحقق من الاتصال وحاول مجدداً.", ru: "Не удалось сохранить. Проверьте подключение." },
    workPlanShowInTasks: { he: "להציג כמשימה ברשימת היום בימי הביצוע", en: "Show in the day's tasks while it runs", ar: "عرضها كمهمة في قائمة اليوم أثناء التنفيذ", ru: "Показывать в задачах дня во время работ" },
    workPlanOpenItem: { he: "פתיחה בתוכנית העבודה", en: "Open in the work plan", ar: "فتح في خطة العمل", ru: "Открыть в плане работ" },
    workPlanPlannedVsDone: { he: "מתוכנן מול ביצוע", en: "Planned vs. done", ar: "المخطط مقابل المنفّذ", ru: "План и факт" },
    workPlanNothingPlanned: { he: "לא תוכננו פעילויות ליום הזה בתוכנית העבודה.", en: "Nothing in the work plan for this day.", ar: "لا أنشطة مخططة لهذا اليوم.", ru: "На этот день в плане ничего нет." },
    workPlanResultDone: { he: "בוצע", en: "Done", ar: "نُفّذ", ru: "Выполнено" },
    workPlanResultPartial: { he: "בוצע חלקית", en: "Partly done", ar: "نُفّذ جزئياً", ru: "Частично" },
    workPlanResultNot: { he: "לא בוצע", en: "Not done", ar: "لم يُنفّذ", ru: "Не выполнено" },
    workPlanResult: { he: "ביצוע", en: "Result", ar: "التنفيذ", ru: "Факт" },
    workPlanReason: { he: "סיבה", en: "Reason", ar: "السبب", ru: "Причина" },
    workPlanReasonPh: { he: "סיבה (לא הגיע בטון, גשם...)", en: "Reason (no concrete, rain...)", ar: "السبب (لم يصل الباطون، مطر...)", ru: "Причина (нет бетона, дождь...)" },
    workPlanReasons: { he: "סיבות לעיכובים", en: "Reasons for delays", ar: "أسباب التأخير", ru: "Причины задержек" },
    workPlanSummaryLine: { he: "תוכננו {n}, בוצעו {done}, חלקית {partial}, לא בוצעו {not}", en: "Planned {n}, done {done}, partly {partial}, not done {not}", ar: "خُطط {n}، نُفّذ {done}، جزئياً {partial}، لم يُنفّذ {not}", ru: "Запланировано {n}, выполнено {done}, частично {partial}, не выполнено {not}" },
    workPlanCopyWeek: { he: "העתק לשבוע הבא", en: "Copy to next week", ar: "نسخ للأسبوع القادم", ru: "Копировать на след. неделю" },
    workPlanCopyWeekConfirm: { he: "להעתיק {n} פעילויות לשבוע הבא?", en: "Copy {n} activities to next week?", ar: "نسخ {n} أنشطة للأسبوع القادم؟", ru: "Скопировать {n} работ на следующую неделю?" },
    workPlanCopiedMsg: { he: "הועתקו {n} פעילויות", en: "{n} activities copied", ar: "تم نسخ {n} أنشطة", ru: "Скопировано работ: {n}" },
    workPlanNothingToCopy: { he: "אין פעילויות בשבוע הזה", en: "No activities this week", ar: "لا أنشطة هذا الأسبوع", ru: "На этой неделе нет работ" },
    workPlanPostpone: { he: "⏩ דחייה", en: "⏩ Postpone", ar: "⏩ تأجيل", ru: "⏩ Перенести" },
    workPlanPostponeBy: { he: "לדחות ב-", en: "Postpone by", ar: "تأجيل بـ", ru: "Перенести на" },
    workPlanDays: { he: "ימים", en: "days", ar: "أيام", ru: "дн." },
    workPlanPostponeFollowing: { he: "גם את הפעילויות שאחריה", en: "and the activities after it", ar: "والأنشطة التي بعده أيضاً", ru: "и следующие работы" },
    workPlanPostponeApply: { he: "דחה", en: "Postpone", ar: "أجّل", ru: "Перенести" },
    workPlanAfter: { he: "מתחילה אחרי", en: "Starts after", ar: "يبدأ بعد", ru: "Начинается после" },
    workPlanAfterNone: { he: "— לא תלויה —", en: "— none —", ar: "— غير مرتبط —", ru: "— нет —" },
    workPlanCascadeConfirm: { he: "מתחילות אחרי \"{name}\" ועכשיו חופפות לה: {list}. לדחות אותן בהתאם?", en: "Starting after \"{name}\" and now overlapping it: {list}. Move them along?", ar: "تبدأ بعد \"{name}\" وتتداخل معه الآن: {list}. هل تؤجَّل؟", ru: "Начинаются после «{name}» и теперь пересекаются: {list}. Сдвинуть?" },
    workPlanNotifLabel: { he: "התראות תוכנית עבודה", en: "Work plan notices", ar: "تنبيهات خطة العمل", ru: "Уведомления плана работ" },
    workPlanNotifLate: { he: "פעילות באיחור", en: "An activity is late", ar: "نشاط متأخر", ru: "Работа просрочена" },
    workPlanNotifStart: { he: "פעילות שמתחילה מחר", en: "An activity starts tomorrow", ar: "نشاط يبدأ غداً", ru: "Работа начинается завтра" },
    workPlanNoticeLate: { he: "{name} באיחור – היה אמור להסתיים ב-{date}", en: "{name} is late - due {date}", ar: "{name} متأخر - كان يجب أن ينتهي في {date}", ru: "{name} просрочено - срок {date}" },
    workPlanNoticeStart: { he: "מחר מתחיל: {name}", en: "Starts tomorrow: {name}", ar: "يبدأ غداً: {name}", ru: "Завтра начинается: {name}" },
    workPlanLinkHint: { he: "\"{name}\" מהבהבת – לחץ על פעילות אחרת כדי לקשור אותן", en: "\"{name}\" is blinking - tap another activity to link them", ar: "\"{name}\" يومض - اضغط على نشاط آخر لربطهما", ru: "«{name}» мигает - нажмите на другую работу, чтобы связать" },
    workPlanLinkSameProject: { he: "אפשר לקשור רק פעילויות באותו פרויקט", en: "Only activities of the same project can be linked", ar: "يمكن ربط أنشطة نفس المشروع فقط", ru: "Связывать можно только работы одного проекта" },
    workPlanLinkTitle: { he: "קשירת פעילויות", en: "Link activities", ar: "ربط الأنشطة", ru: "Связь работ" },
    workPlanLinkFS: { he: "סיום ← התחלה", en: "Finish → Start", ar: "نهاية ← بداية", ru: "Окончание → начало" },
    workPlanLinkSS: { he: "התחלה ← התחלה", en: "Start → Start", ar: "بداية ← بداية", ru: "Начало → начало" },
    workPlanLinkFF: { he: "סיום ← סיום", en: "Finish → Finish", ar: "نهاية ← نهاية", ru: "Окончание → окончание" },
    workPlanLinkSF: { he: "התחלה ← סיום", en: "Start → Finish", ar: "بداية ← نهاية", ru: "Начало → окончание" },
    workPlanLinkFSDesc: { he: "\"{b}\" מתחילה אחרי ש\"{a}\" מסתיימת", en: "\"{b}\" starts after \"{a}\" finishes", ar: "\"{b}\" يبدأ بعد انتهاء \"{a}\"", ru: "«{b}» начинается после окончания «{a}»" },
    workPlanLinkSSDesc: { he: "\"{b}\" מתחילה כש\"{a}\" מתחילה", en: "\"{b}\" starts when \"{a}\" starts", ar: "\"{b}\" يبدأ عند بدء \"{a}\"", ru: "«{b}» начинается вместе с «{a}»" },
    workPlanLinkFFDesc: { he: "\"{b}\" מסתיימת כש\"{a}\" מסתיימת", en: "\"{b}\" finishes when \"{a}\" finishes", ar: "\"{b}\" ينتهي عند انتهاء \"{a}\"", ru: "«{b}» заканчивается вместе с «{a}»" },
    workPlanLinkSFDesc: { he: "\"{b}\" מסתיימת רק אחרי ש\"{a}\" מתחילה", en: "\"{b}\" finishes once \"{a}\" starts", ar: "\"{b}\" ينتهي بعد بدء \"{a}\"", ru: "«{b}» заканчивается после начала «{a}»" },
    workPlanLinkLag: { he: "הפרש בימים (מינוס = חפיפה)", en: "Lag in days (minus = overlap)", ar: "الفارق بالأيام (سالب = تداخل)", ru: "Сдвиг в днях (минус = нахлёст)" },
    workPlanLinkSave: { he: "קשירה", en: "Link", ar: "ربط", ru: "Связать" },
    workPlanLinkRemove: { he: "הסרת קשירה", en: "Remove link", ar: "إزالة الربط", ru: "Удалить связь" },
    workPlanLinkCycle: { he: "אי אפשר: הקשירה הזו יוצרת מעגל (הפעילות כבר תלויה בשנייה).", en: "Not possible: this link would make a loop.", ar: "غير ممكن: هذا الربط يُنشئ حلقة.", ru: "Нельзя: эта связь создаёт цикл." },
    workPlanLinkMoved: { he: "\"{name}\" הוזזה ב-{n} ימים כדי לעמוד בקשירה", en: "\"{name}\" moved {n} days to fit the link", ar: "تم تحريك \"{name}\" {n} أيام لتوافق الربط", ru: "«{name}» сдвинута на {n} дн. по связи" },
    workPlanLinks: { he: "קשירות", en: "Links", ar: "الروابط", ru: "Связи" },
    workPlanFromTask: { he: "העברה לתוכנית העבודה", en: "Move to the work plan", ar: "نقل إلى خطة العمل", ru: "Перенести в план работ" },
    workPlanPdfMsg: { he: "יוצר PDF...", en: "Creating the PDF...", ar: "جارٍ إنشاء PDF...", ru: "Создаём PDF..." },
    sketchTitle: { he: "סקיצה", en: "Sketch", ar: "رسم تخطيطي", ru: "Эскиз" },
    sketchSave: { he: "שמירה", en: "Save", ar: "حفظ", ru: "Сохранить" },
    sketchShare: { he: "שיתוף", en: "Share", ar: "مشاركة", ru: "Поделиться" },
    sketchShareHow: { he: "איך לשתף את הסקיצה?", en: "How to share the sketch?", ar: "كيف تريد مشاركة الرسم؟", ru: "Как поделиться эскизом?" },
    sketchShareToChat: { he: "💬 לצ'אט של הפרויקט", en: "💬 To the project chat", ar: "💬 إلى دردشة المشروع", ru: "💬 В чат проекта" },
    sketchShareToApps: { he: "📤 לאפליקציות אחרות", en: "📤 To other apps", ar: "📤 إلى تطبيقات أخرى", ru: "📤 В другие приложения" },
    sketchSendingToChat: { he: "שולח לצ'אט...", en: "Sending to the chat...", ar: "جارٍ الإرسال إلى الدردشة...", ru: "Отправка в чат..." },
    sketchSentToChat: { he: "הסקיצה נשלחה לצ'אט של הפרויקט", en: "The sketch was sent to the project chat", ar: "تم إرسال الرسم إلى دردشة المشروع", ru: "Эскиз отправлен в чат проекта" },
    sketchPen: { he: "עיפרון (החזק בסוף הקו ליישור)", en: "Pen (hold at the end to straighten)", ar: "قلم (اضغط مطولاً في النهاية للتسوية)", ru: "Карандаш (задержите в конце для выравнивания)" },
    sketchLine: { he: "קו ישר", en: "Straight line", ar: "خط مستقيم", ru: "Прямая" },
    sketchDim: { he: "מידה", en: "Dimension", ar: "قياس", ru: "Размер" },
    sketchLeader: { he: "חץ עם טקסט", en: "Arrow with text", ar: "سهم مع نص", ru: "Выноска с текстом" },
    sketchText: { he: "טקסט", en: "Text", ar: "نص", ru: "Текст" },
    sketchShapes: { he: "צורות", en: "Shapes", ar: "أشكال", ru: "Фигуры" },
    sketchObjects: { he: "אובייקטים", en: "Objects", ar: "عناصر", ru: "Объекты" },
    sketchObjHint: { he: "גררו את האובייקט כדי להזיז אותו. גררו את הנקודה הצהובה כדי להגדיל, להקטין ולסובב", en: "Drag the object to move it. Drag the yellow dot to resize and turn it", ar: "اسحب العنصر لتحريكه. اسحب النقطة الصفراء للتكبير والتصغير والتدوير", ru: "Перетащите объект, чтобы сдвинуть. Тяните жёлтую точку, чтобы изменить размер и повернуть" },
    skObj_tree: { he: "עץ", en: "Tree", ar: "شجرة", ru: "Дерево" },
    skObj_car: { he: "רכב", en: "Car", ar: "سيارة", ru: "Автомобиль" },
    skObj_truck: { he: "משאית", en: "Truck", ar: "شاحنة", ru: "Грузовик" },
    skObj_excavator: { he: "באגר", en: "Excavator", ar: "حفارة", ru: "Экскаватор" },
    skObj_backhoe: { he: "מחפרון", en: "Backhoe", ar: "جرافة حفارة", ru: "Экскаватор-погрузчик" },
    skObj_bobcat: { he: "בובקט", en: "Bobcat", ar: "بوبكات", ru: "Бобкэт" },
    skObj_worker: { he: "פועל", en: "Worker", ar: "عامل", ru: "Рабочий" },
    skObj_signStop: { he: "תמרור עצור", en: "Stop sign", ar: "إشارة قف", ru: "Знак «Стоп»" },
    skObj_signNoEntry: { he: "אין כניסה", en: "No entry", ar: "ممنوع الدخول", ru: "Въезд запрещён" },
    skObj_signGiveWay: { he: "תן זכות קדימה", en: "Give way", ar: "أعطِ الأولوية", ru: "Уступи дорогу" },
    skObj_signWorks: { he: "עבודות בדרך", en: "Road works", ar: "أعمال على الطريق", ru: "Дорожные работы" },
    skObj_container: { he: "קונטיינר", en: "Container", ar: "حاوية", ru: "Контейнер" },
    skObj_bridge: { he: "גשר", en: "Bridge", ar: "جسر", ru: "Мост" },
    skFill_color: { he: "צבע אחיד:", en: "Plain colour:", ar: "لون موحد:", ru: "Сплошной цвет:" },
    skFill_paving: { he: "אבן משתלבת", en: "Paving blocks", ar: "بلاط متداخل", ru: "Брусчатка" },
    skFill_road: { he: "כביש", en: "Road", ar: "شارع", ru: "Дорога" },
    skFill_grass: { he: "דשא", en: "Grass", ar: "عشب", ru: "Трава" },
    skFill_soil: { he: "אדמה גננית", en: "Garden soil", ar: "تربة زراعية", ru: "Садовая земля" },
    skFill_gravel: { he: "מצעים", en: "Base course", ar: "طبقة أساس (حصى)", ru: "Щебёночное основание" },
    skFill_water: { he: "מים", en: "Water", ar: "ماء", ru: "Вода" },
    sketchViewTop: { he: "מבט על", en: "Top view", ar: "منظر علوي", ru: "Вид сверху" },
    sketchViewSide: { he: "מבט צד", en: "Side view", ar: "منظر جانبي", ru: "Вид сбоку" },
    sketchSqm: { he: "מ״ר", en: "m²", ar: "م²", ru: "м²" },
    sketchByMe: { he: "אני", en: "me", ar: "أنا", ru: "я" },
    sketchListTitle: { he: "הסקיצות של הפרויקט", en: "The project's sketches", ar: "رسومات المشروع", ru: "Эскизы проекта" },
    sketchNew: { he: "＋ סקיצה חדשה", en: "＋ New sketch", ar: "＋ رسم جديد", ru: "＋ Новый эскиз" },
    sketchRename: { he: "שינוי שם", en: "Rename", ar: "تغيير الاسم", ru: "Переименовать" },
    sketchDeleteConfirm: { he: "למחוק את \"{name}\"? היא תימחק לכל חברי הפרויקט", en: "Delete \"{name}\"? It goes for every member", ar: "حذف \"{name}\"؟ سيُحذف لكل أعضاء المشروع", ru: "Удалить «{name}»? Он удалится у всех участников" },
    sketchFill: { he: "צביעת שטח", en: "Paint an area", ar: "تلوين مساحة", ru: "Заливка области" },
    sketchFillHint: { he: "געו בתוך שטח סגור כדי לצבוע אותו בצבע שנבחר", en: "Tap inside a closed area to paint it in the chosen colour", ar: "المس داخل مساحة مغلقة لتلوينها باللون المختار", ru: "Нажмите внутри замкнутой области, чтобы залить её выбранным цветом" },
    sketchFillOpen: { he: "השטח לא סגור – סגרו את הקווים מסביב ונסו שוב", en: "The area isn't closed - close the lines around it and try again", ar: "المساحة غير مغلقة – أغلق الخطوط حولها وحاول مرة أخرى", ru: "Область не замкнута – замкните линии вокруг и попробуйте снова" },
    sketchEraser: { he: "מחק (נגיעה בקו מוחקת אותו)", en: "Eraser (tap a line to remove it)", ar: "ممحاة (المس الخط لحذفه)", ru: "Ластик (нажмите на линию)" },
    sketchHand: { he: "הזזה", en: "Move", ar: "تحريك", ru: "Сдвиг" },
    sketchWall: { he: "▬ קיר", en: "▬ Wall", ar: "▬ جدار", ru: "▬ Стена" },
    sketchDoor: { he: "◜ דלת", en: "◜ Door", ar: "◜ باب", ru: "◜ Дверь" },
    sketchWindow: { he: "☰ חלון", en: "☰ Window", ar: "☰ نافذة", ru: "☰ Окно" },
    sketchStairs: { he: "▤ מדרגות", en: "▤ Stairs", ar: "▤ درج", ru: "▤ Лестница" },
    sketchNorth: { he: "⬆ צפון", en: "⬆ North", ar: "⬆ شمال", ru: "⬆ Север" },
    sketchBg: { he: "תמונת רקע", en: "Background picture", ar: "صورة خلفية", ru: "Фоновое изображение" },
    sketchAreaSaveTitle: { he: "מה לשמור?", en: "What to save?", ar: "ماذا تريد أن تحفظ؟", ru: "Что сохранить?" },
    sketchAreaShareTitle: { he: "מה לשתף?", en: "What to share?", ar: "ماذا تريد أن تشارك؟", ru: "Чем поделиться?" },
    sketchAreaAll: { he: "🗺 כל הסקיצה", en: "🗺 The whole sketch", ar: "🗺 الرسم كاملاً", ru: "🗺 Весь эскиз" },
    sketchAreaPick: { he: "✂ תחימת אזור", en: "✂ Mark an area", ar: "✂ تحديد منطقة", ru: "✂ Выделить область" },
    sketchAreaHint: { he: "סמנו את האזור – גררו את הנקודות הצהובות לשינוי", en: "Mark the area - drag the yellow dots to change it", ar: "حدد المنطقة – اسحب النقاط الصفراء لتغييرها", ru: "Выделите область – тяните жёлтые точки, чтобы изменить" },
    sketchAreaOk: { he: "✓ אישור", en: "✓ OK", ar: "✓ موافق", ru: "✓ Готово" },
    sketchBgLibrary: { he: "📚 מהספרייה של הפרויקט", en: "📚 From the project's library", ar: "📚 من مكتبة المشروع", ru: "📚 Из библиотеки проекта" },
    sketchLibTitle: { he: "איזה קובץ מהספרייה לשים ברקע?", en: "Which library file goes in the background?", ar: "أي ملف من المكتبة تريد وضعه في الخلفية؟", ru: "Какой файл из библиотеки поставить фоном?" },
    sketchLibBack: { he: "→ חזרה", en: "← Back", ar: "→ رجوع", ru: "← Назад" },
    sketchLibNothing: { he: "אין בתיקייה הזו תמונות או קבצי PDF", en: "No pictures or PDF files in this folder", ar: "لا توجد صور أو ملفات PDF في هذا المجلد", ru: "В этой папке нет изображений и PDF" },
    sketchBgMoveHint: { he: "לחיצה ארוכה על הרקע וגרירה מזיזות אותו בדף", en: "Long-press the background and drag to move it on the page", ar: "اضغط مطولاً على الخلفية واسحب لتحريكها في الصفحة", ru: "Нажмите и удерживайте фон, затем тяните, чтобы сдвинуть его" },
    sketchBgCamera: { he: "📷 צילום", en: "📷 Take a photo", ar: "📷 التقاط صورة", ru: "📷 Сфотографировать" },
    sketchBgFile: { he: "🖼 תמונה / PDF", en: "🖼 Picture / PDF", ar: "🖼 صورة / PDF", ru: "🖼 Изображение / PDF" },
    sketchPdfPageTitle: { he: "איזה עמוד מהקובץ לשים ברקע?", en: "Which page of the file goes in the background?", ar: "أي صفحة من الملف تريد وضعها في الخلفية؟", ru: "Какую страницу файла поставить фоном?" },
    sketchPdfPage: { he: "עמוד {n}", en: "Page {n}", ar: "صفحة {n}", ru: "Страница {n}" },
    sketchPdfLoading: { he: "פותח את הקובץ...", en: "Opening the file...", ar: "جارٍ فتح الملف...", ru: "Открываю файл..." },
    sketchPdfError: { he: "לא הצלחתי לפתוח את קובץ ה-PDF", en: "Couldn't open the PDF file", ar: "تعذر فتح ملف PDF", ru: "Не удалось открыть PDF-файл" },
    sketchBgRemove: { he: "🗑 הסרת הרקע", en: "🗑 Remove background", ar: "🗑 إزالة الخلفية", ru: "🗑 Убрать фон" },
    sketchSnap: { he: "הצמדה למשבצות", en: "Snap to grid", ar: "الالتصاق بالشبكة", ru: "Привязка к сетке" },
    sketchUndo: { he: "ביטול", en: "Undo", ar: "تراجع", ru: "Отменить" },
    sketchRedo: { he: "חזרה", en: "Redo", ar: "إعادة", ru: "Повторить" },
    sketchClear: { he: "ניקוי הדף", en: "Clear the page", ar: "مسح الصفحة", ru: "Очистить" },
    sketchClearConfirm: { he: "למחוק את כל הסקיצה?", en: "Erase the whole sketch?", ar: "حذف الرسم كله؟", ru: "Стереть весь эскиз?" },
    sketchTextTitle: { he: "טקסט", en: "Text", ar: "نص", ru: "Текст" },
    sketchDimTextHint: { he: "המידה לפי קנה המידה – אפשר לשנות למספר או מילה אחרים", en: "The length by the scale - change it to any number or word", ar: "الطول حسب المقياس - يمكن تغييره لأي رقم أو كلمة", ru: "Длина по масштабу - можно заменить" },
    sketchScaleTitle: { he: "קנה מידה", en: "Scale", ar: "مقياس الرسم", ru: "Масштаб" },
    sketchScaleSquare: { he: "משבצת אחת =", en: "One square =", ar: "مربع واحد =", ru: "Одна клетка =" },
    sketchScaleNote: { he: "קווים ישרים יראו את האורך האמיתי, ומידות יתמלאו לבד.", en: "Straight lines show their real length, dimensions fill in by themselves.", ar: "تظهر الخطوط المستقيمة طولها الحقيقي وتُملأ القياسات تلقائياً.", ru: "Прямые покажут реальную длину, размеры заполнятся сами." },
    sketchScaleOff: { he: "בלי קנה מידה", en: "No scale", ar: "بدون مقياس", ru: "Без масштаба" },
    sketchScaleNow: { he: "משבצת = {n}", en: "Square = {n}", ar: "مربع = {n}", ru: "Клетка = {n}" },
    sketchNoScale: { he: "קנה מידה: לא נקבע", en: "Scale: not set", ar: "المقياس: غير محدد", ru: "Масштаб: не задан" },
    sketchUnitCm: { he: "ס\"מ", en: "cm", ar: "سم", ru: "см" },
    sketchUnitM: { he: "מ'", en: "m", ar: "م", ru: "м" },
    sketchMeterShort: { he: "מ'", en: "m", ar: "م", ru: "м" },
    sketchLeaderHint: { he: "גרור מהנקודה אל המקום של הטקסט", en: "Drag from the point to where the text goes", ar: "اسحب من النقطة إلى مكان النص", ru: "Тяните от точки к месту текста" },
    sketchDimHint: { he: "גרור מקצה לקצה של המידה. לחיצה וגרירה על מידה מזיזה אותה", en: "Drag from one end of the dimension to the other. Press and drag a dimension to move it", ar: "اسحب من طرف القياس إلى طرفه الآخر. اضغط واسحب القياس لتحريكه", ru: "Тяните от одного конца размера к другому. Нажмите и тяните размер, чтобы сдвинуть его" },
    sketchDoorHint: { he: "גרור מהציר של הדלת לכיוון הכנף", en: "Drag from the door's hinge along its leaf", ar: "اسحب من مفصل الباب باتجاه الدرفة", ru: "Тяните от петли вдоль полотна" },
    sketchEmptyMsg: { he: "הסקיצה ריקה", en: "The sketch is empty", ar: "الرسم فارغ", ru: "Эскиз пуст" },
    shareTaskTitle: { he: "הוספת משימה", en: "Add a task", ar: "إضافة مهمة", ru: "Добавить задачу" },
    shareTaskProject: { he: "פרויקט", en: "Project", ar: "المشروع", ru: "Проект" },
    shareTaskDate: { he: "תאריך", en: "Date", ar: "التاريخ", ru: "Дата" },
    shareTaskAdd: { he: "הוספה", en: "Add", ar: "إضافة", ru: "Добавить" },
    shareTaskAddedMsg: { he: "המשימה נוספה", en: "Task added", ar: "تمت إضافة المهمة", ru: "Задача добавлена" },
    focusViewTitle: { he: "המשימות שלי", en: "My tasks", ar: "مهامي", ru: "Мои задачи" },
    focusViewEmpty: { he: "אין משימות פתוחות", en: "No open tasks", ar: "لا توجد مهام مفتوحة", ru: "Нет открытых задач" },
    taskReminderActiveOnDate: { he: "פעילה: בתאריך ", en: "Active: on ", ar: "نشط: بتاريخ ", ru: "Активно: " },
    taskReminderAtTimeWord: { he: "בשעה ", en: "at ", ar: "الساعة ", ru: "в " },
    taskReminderPastMsg: { he: "המועד שנבחר כבר עבר", en: "That time has already passed", ar: "هذا الوقت قد مضى بالفعل", ru: "Это время уже прошло" },
    exactAlarmPermissionPrompt: { he: "כדי שהשעון המעורר יצלצל בדיוק בזמן, צריך לאשר לאפליקציה \"שעונים מעוררים ותזכורות\". לפתוח את ההגדרה?", en: "For the alarm to ring exactly on time, allow \"Alarms & reminders\" for this app. Open the setting?", ar: "لكي يرن المنبه في الوقت المحدد بالضبط، اسمح لهذا التطبيق بـ \"المنبهات والتذكيرات\". فتح الإعداد؟", ru: "Чтобы будильник звонил точно вовремя, разрешите приложению «Будильники и напоминания». Открыть настройку?" },
    taskReminderNotSupportedMsg: { he: "התראות לא נתמכות או חסומות במכשיר הזה", en: "Notifications aren't supported or are blocked on this device", ar: "الإشعارات غير مدعومة أو محظورة على هذا الجهاز", ru: "Уведомления не поддерживаются или заблокированы на этом устройстве" },
    moveModeMoveBtn: { he: "העברה", en: "Move", ar: "نقل", ru: "Переместить" },
    moveModeCopyBtn: { he: "העתקה", en: "Copy", ar: "نسخ", ru: "Копировать" },
    convertToNoteBtn: { he: "הפוך למזכרת", en: "Convert to note", ar: "تحويل إلى ملاحظة", ru: "Сделать заметкой" },
    convertToTaskBtn: { he: "הפוך למשימה", en: "Convert to task", ar: "تحويل إلى مهمة", ru: "Сделать задачей" },
    projectWord: { he: "פרויקט", en: "Project", ar: "مشروع", ru: "Проект" },
    noOtherProjects: { he: "אין פרויקטים אחרים", en: "No other projects", ar: "لا توجد مشاريع أخرى", ru: "Нет других проектов" },
    mustHaveOneProject: { he: "חייב להישאר לפחות פרויקט אחד.", en: "At least one project must remain.", ar: "يجب أن يبقى مشروع واحد على الأقل.", ru: "Должен остаться хотя бы один проект." },
    mustHaveOneActiveProject: { he: "חייב להישאר לפחות פרויקט פעיל אחד.", en: "At least one active project must remain.", ar: "يجب أن يبقى مشروع نشط واحد على الأقل.", ru: "Должен остаться хотя бы один активный проект." },
    confirmDeleteProjectNamed: { he: 'למחוק את הפרויקט "{name}" ואת כל השורות שבו?', en: 'Delete the project "{name}" and all its rows?', ar: 'هل تريد حذف المشروع "{name}" وجميع عناصره؟', ru: 'Удалить проект «{name}» и все его записи?' },
    confirmDeleteProjectGeneric: { he: "למחוק את הפרויקט?", en: "Delete the project?", ar: "هل تريد حذف المشروع؟", ru: "Удалить проект?" },
    confirmDeleteSharedProjectNamed: { he: 'למחוק את הפרויקט המשותף "{name}"? הוא יימחק אצל כל המשתתפים, לא רק אצלך.', en: 'Delete the shared project "{name}"? It will be removed for every member, not just you.', ar: 'هل تريد حذف المشروع المشترك "{name}"؟ سيُحذف لدى جميع الأعضاء، وليس لديك فقط.', ru: 'Удалить общий проект «{name}»? Он будет удалён у всех участников, а не только у вас.' },
    confirmEndProjectNamed: { he: 'לסמן את הפרויקט "{name}" כמסתיים? הוא לא יופיע יותר בימים הבאים (ימשיך להופיע בימים הקודמים).', en: 'Mark the project "{name}" as finished? It will no longer appear on future days (it will still appear on past days).', ar: 'هل تريد وضع علامة "منتهٍ" على المشروع "{name}"؟ لن يظهر بعد الآن في الأيام القادمة (سيستمر بالظهور في الأيام السابقة).', ru: 'Отметить проект «{name}» как завершённый? Он больше не будет отображаться в будущие дни (но останется виден в прошедших днях).' },
    confirmEndProjectGeneric: { he: "לסמן את הפרויקט כמסתיים?", en: "Mark the project as finished?", ar: "هل تريد وضع علامة \"منتهٍ\" على هذا المشروع؟", ru: "Отметить проект как завершённый?" },
    confirmDeleteReport: { he: 'למחוק את הדוח "{name}"?', en: 'Delete the report "{name}"?', ar: 'هل تريد حذف التقرير "{name}"؟', ru: 'Удалить отчёт «{name}»?' },
    confirmDeleteReportRow: { he: "למחוק את השורה הזו?", en: "Delete this row?", ar: "هل تريد حذف هذا السطر؟", ru: "Удалить эту строку?" },
    reportActionModalMessage: { he: "מה לעשות עם הדוח?", en: "What would you like to do with this report?", ar: "ماذا تريد أن تفعل بهذا التقرير؟", ru: "Что сделать с этим отчётом?" },
    reportRowActionModalMessage: { he: "מה לעשות עם השורה?", en: "What would you like to do with this row?", ar: "ماذا تريد أن تفعل بهذا السطر؟", ru: "Что сделать с этой строкой?" },
    reportRowActionCopyBtn: { he: "העתקה", en: "Duplicate", ar: "نسخ", ru: "Дублировать" },
    remindersActive: { he: "תזכורות פעילות", en: "Reminders active", ar: "التذكيرات نشطة", ru: "Напоминания включены" },
    remindersOffStatus: { he: "התזכורות כבויות", en: "Reminders are off", ar: "التذكيرات متوقفة", ru: "Напоминания выключены" },
    notificationsNotSupported: { he: "התראות לא נתמכות בדפדפן הזה", en: "Notifications aren't supported in this browser", ar: "الإشعارات غير مدعومة في هذا المتصفح", ru: "Уведомления не поддерживаются в этом браузере" },
    notificationsBlocked: { he: "ההתראות חסומות בדפדפן - יש לאשר אותן בהגדרות", en: "Notifications are blocked - allow them in settings", ar: "الإشعارات محظورة - يجب السماح بها من الإعدادات", ru: "Уведомления заблокированы - разрешите их в настройках" },
    notificationPermissionDenied: { he: "לא אושרה הרשאת התראות", en: "Notification permission was not granted", ar: "لم يتم منح إذن الإشعارات", ru: "Разрешение на уведомления не получено" },
    errorSavingSubscription: { he: "שגיאה בשמירת המנוי: ", en: "Error saving subscription: ", ar: "خطأ في حفظ الاشتراك: ", ru: "Ошибка сохранения подписки: " },
    errorEnablingReminders: { he: "שגיאה בהפעלת תזכורות: ", en: "Error enabling reminders: ", ar: "خطأ في تفعيل التذكيرات: ", ru: "Ошибка включения напоминаний: " },
    shareAppText: { he: "אפליקציית ניהול משימות - לחצו כדי להתקין", en: "Task management app - tap to install", ar: "تطبيق لإدارة المهام - اضغط للتثبيت", ru: "Приложение для управления задачами - нажмите, чтобы установить" },
    linkCopied: { he: "הקישור הועתק ללוח: ", en: "Link copied to clipboard: ", ar: "تم نسخ الرابط إلى الحافظة: ", ru: "Ссылка скопирована в буфер обмена: " },
    installLink: { he: "הקישור להתקנה: ", en: "Install link: ", ar: "رابط التثبيت: ", ru: "Ссылка для установки: " },
    clickToRename: { he: "לחצו לשינוי שם", en: "Click to rename", ar: "اضغط لتغيير الاسم", ru: "Нажмите, чтобы переименовать" },
    addProjectTitle: { he: "הוספת פרויקט", en: "Add project", ar: "إضافة مشروع", ru: "Добавить проект" },
    addSharedProjectTitle: { he: "הוספת פרויקט משותף", en: "Add shared project", ar: "إضافة مشروع مشترك", ru: "Добавить общий проект" },
    statusPartial: { he: "לחצו כדי לסמן טיפול חלקי", en: "Click to mark as partially done", ar: "اضغط للتعليم كمنفذ جزئيًا", ru: "Нажмите, чтобы отметить как частично выполненное" },
    statusDone: { he: "לחצו כדי לסמן כהושלם", en: "Click to mark as done", ar: "اضغط للتعليم كمكتمل", ru: "Нажмите, чтобы отметить как выполненное" },
    statusReset: { he: "לחצו כדי לאפס", en: "Click to reset", ar: "اضغط لإعادة التعيين", ru: "Нажмите, чтобы сбросить" },
    unmarkUrgent: { he: "לחצו לביטול הדחיפות", en: "Click to unmark as urgent", ar: "اضغط لإلغاء وضع الاستعجال", ru: "Нажмите, чтобы снять срочность" },
    markUrgent: { he: "לחצו לסימון כדחוף", en: "Click to mark as urgent", ar: "اضغط للتعليم كعاجل", ru: "Нажмите, чтобы отметить как срочное" },
    confirmDeleteTask: { he: 'למחוק את השורה "{name}"?', en: 'Delete the row "{name}"?', ar: 'هل تريد حذف العنصر "{name}"؟', ru: 'Удалить запись «{name}»?' },
    completedOn: { he: "הושלם בתאריך ", en: "Completed on ", ar: "اكتمل بتاريخ ", ru: "Выполнено " },
    loggedInAs: { he: "מחובר/ת עם ", en: "Logged in with ", ar: "تم تسجيل الدخول برقم ", ru: "Вы вошли с номером " },
    reportsBtnTitle: { he: "דוחות פגישות וסיורים", en: "Meeting and tour reports", ar: "تقارير الاجتماعات والجولات", ru: "Отчёты о встречах и обходах" },
    tasksBtnTitle: { he: "חזרה למשימות", en: "Back to tasks", ar: "العودة إلى المهام", ru: "Назад к задачам" },
    calendarBtnTitle: { he: "בחירת תאריך", en: "Pick a date", ar: "اختيار تاريخ", ru: "Выбрать дату" },
    siteLogAttendance: { he: "נוכחות", en: "Attendance", ar: "الحضور", ru: "Присутствие" },
    siteLogTools: { he: "כלים", en: "Tools", ar: "المعدات", ru: "Оборудование" },
    siteLogContractors: { he: "קבלנים", en: "Contractors", ar: "المقاولون", ru: "Подрядчики" },
    siteLogWorks: { he: "עבודות", en: "Works", ar: "الأعمال", ru: "Работы" },
    siteLogProcurement: { he: "רכש", en: "Procurement", ar: "المشتريات", ru: "Закупки" },
    siteLogColItem: { he: "פריט", en: "Item", ar: "الصنف", ru: "Позиция" },
    siteLogColQuantity: { he: "כמות", en: "Quantity", ar: "الكمية", ru: "Количество" },
    siteLogColSupplier: { he: "ספק", en: "Supplier", ar: "المورد", ru: "Поставщик" },
    siteLogColForeman: { he: "מנהל עבודה", en: "Foreman", ar: "مدير الأعمال", ru: "Прораб" },
    siteLogColEngineer: { he: "מהנדס", en: "Engineer", ar: "مهندس", ru: "Инженер" },
    siteLogColWorkers: { he: "פועלים", en: "Workers", ar: "عمال", ru: "Рабочие" },
    siteLogColOperators: { he: "מפעילים", en: "Operators", ar: "مشغلون", ru: "Операторы" },
    siteLogColConsultants: { he: "יועצים", en: "Consultants", ar: "مستشارون", ru: "Консультанты" },
    siteLogColSurveyor: { he: "מודד", en: "Surveyor", ar: "مساح", ru: "Геодезист" },
    siteLogComingSoon: { he: "הקטגוריה הזו עוד בבנייה", en: "This category is still being built", ar: "هذه الفئة لا تزال قيد الإنشاء", ru: "Эта категория ещё в разработке" },
    siteLogCloseBtn: { he: "סגירת יומן", en: "Close log", ar: "إغلاق السجل", ru: "Закрыть журнал" },
    siteLogShareBtn: { he: "שיתוף יומן", en: "Share log", ar: "مشاركة السجل", ru: "Поделиться журналом" },
    siteLogPreviewBtn: { he: "הצגת יומן", en: "Show log", ar: "عرض السجل", ru: "Показать журнал" },
    siteLogGeneralReportTitle: { he: "יומן עבודה מס'", en: "Work Log No.", ar: "سجل العمل رقم", ru: "Рабочий журнал №" },
    siteLogPeriodicBtn: { he: "דו\"ח יומנים תקופתי", en: "Generate periodic logs report", ar: "إصدار تقرير سجلات دوري", ru: "Сформировать периодический отчёт журналов" },
    siteLogPeriodicRangeTitle: { he: "הפקת דו\"ח יומנים תקופתי", en: "Generate periodic logs report", ar: "إصدار تقرير سجلات دوري", ru: "Сформировать периодический отчёт журналов" },
    siteLogPeriodicFromLabel: { he: "מתאריך", en: "From date", ar: "من تاريخ", ru: "С даты" },
    siteLogPeriodicToLabel: { he: "עד תאריך", en: "To date", ar: "إلى تاريخ", ru: "По дату" },
    siteLogPeriodicGenerateBtn: { he: "הפקת דו\"ח", en: "Generate report", ar: "إصدار التقرير", ru: "Сформировать отчёт" },
    siteLogPeriodicMissingDatesMsg: { he: "יש לבחור תאריך התחלה ותאריך סיום", en: "Please select a start and end date", ar: "الرجاء اختيار تاريخ بداية وتاريخ نهاية", ru: "Выберите дату начала и окончания" },
    siteLogPeriodicInvalidRangeMsg: { he: "תאריך ההתחלה חייב להיות לפני תאריך הסיום", en: "The start date must be before the end date", ar: "يجب أن يكون تاريخ البداية قبل تاريخ النهاية", ru: "Дата начала должна быть раньше даты окончания" },
    siteLogPeriodicNoLogsMsg: { he: "לא נמצאו יומנים סגורים בתקופה שנבחרה", en: "No closed logs were found in the selected period", ar: "لم يتم العثور على سجلات مغلقة في الفترة المحددة", ru: "В выбранном периоде не найдено закрытых журналов" },
    siteLogPeriodicFileNamePrefix: { he: "דוח יומנים תקופתי", en: "Periodic logs report", ar: "تقرير سجلات دوري", ru: "Периодический отчёт журналов" },
    siteLogWorksTourTitle: { he: "תיאור עבודות", en: "Works Description", ar: "وصف الأعمال", ru: "Описание работ" },
    siteLogCloseFirstMsg: { he: "יש לסגור את היומן קודם", en: "Close the log first", ar: "يجب إغلاق السجل أولاً", ru: "Сначала закройте журнал" },
    siteLogCopyPrevBtn: { he: "העתקת יומן קודם", en: "Copy previous log", ar: "نسخ السجل السابق", ru: "Скопировать предыдущий журнал" },
    siteLogProcurementOrderBtn: { he: "שגר הזמנת רכש", en: "Send procurement order", ar: "إرسال طلب شراء", ru: "Отправить заказ на закупку" },
    siteLogCopyPrevConfirm: { he: "להעתיק את הנתונים מהיומן הקודם? הפעולה תחליף את התוכן הקיים כאן.", en: "Copy the data from the previous log? This will replace the content here.", ar: "هل تريد نسخ البيانات من السجل السابق؟ سيتم استبدال المحتوى الحالي هنا.", ru: "Скопировать данные из предыдущего журнала? Это заменит текущее содержимое." },
    siteLogNoPreviousLog: { he: "אין יומן קודם להעתיק ממנו", en: "No previous log to copy from", ar: "لا يوجد سجل سابق للنسخ منه", ru: "Нет предыдущего журнала для копирования" },
    siteLogAttendanceReportFileNamePrefix: { he: "דוח נוכחות פרויקט", en: "Attendance report project", ar: "تقرير حضور مشروع", ru: "Отчёт о посещаемости проекта" },
    siteLogToolsReportFileNamePrefix: { he: "דוח כלים פרויקט", en: "Tools report project", ar: "تقرير معدات مشروع", ru: "Отчёт об оборудовании проекта" },
    siteLogProcurementReportFileNamePrefix: { he: "דוח רכש פרויקט", en: "Procurement report project", ar: "تقرير مشتريات مشروع", ru: "Отчёт о закупках проекта" },
    procurementOrderFileNamePrefix: { he: "הזמנת רכש", en: "Procurement order", ar: "طلب شراء", ru: "Заказ на закупку" },
    libraryFolderProcurementOrders: { he: "הזמנות רכש", en: "Procurement orders", ar: "طلبات الشراء", ru: "Заказы на закупку" },
    procurementOrderSentMsg: { he: "ההזמנה נשמרה בתיקיית \"הזמנות רכש\" בספרייה", en: "The order was saved to the \"Procurement orders\" library folder", ar: "تم حفظ الطلب في مجلد \"طلبات الشراء\" في المكتبة", ru: "Заказ сохранён в папке «Заказы на закупку» в библиотеке" },
    siteLogAttendanceOrderBtn: { he: "שגר דוח נוכחות", en: "Send attendance report", ar: "إرسال تقرير حضور", ru: "Отправить отчёт о посещаемости" },
    libraryFolderAttendanceReports: { he: "דוחות נוכחות", en: "Attendance reports", ar: "تقارير الحضور", ru: "Отчёты о посещаемости" },
    attendanceReportSentMsg: { he: "הדוח נשמר בתיקיית \"דוחות נוכחות\" בספרייה", en: "The report was saved to the \"Attendance reports\" library folder", ar: "تم حفظ التقرير في مجلد \"تقارير الحضور\" في المكتبة", ru: "Отчёт сохранён в папке «Отчёты о посещаемости» в библиотеке" },
    siteLogToolsOrderBtn: { he: "שגר דוח כלים", en: "Send tools report", ar: "إرسال تقرير معدات", ru: "Отправить отчёт об оборудовании" },
    libraryFolderToolsReports: { he: "דוח כלים", en: "Tools report", ar: "تقرير المعدات", ru: "Отчёт об оборудовании" },
    toolsReportSentMsg: { he: "הדוח נשמר בתיקיית \"דוח כלים\" בספרייה", en: "The report was saved to the \"Tools report\" library folder", ar: "تم حفظ التقرير في مجلد \"تقرير المعدات\" في المكتبة", ru: "Отчёт сохранён в папке «Отчёт об оборудовании» в библиотеке" },
    siteLogColExcavator: { he: "מחפרון", en: "Excavator", ar: "حفارة", ru: "Экскаватор-погрузчик" },
    siteLogColLoader: { he: "שופל", en: "Loader", ar: "شيول", ru: "Погрузчик" },
    siteLogColBagger: { he: "באגר", en: "Bagger", ar: "بيجر", ru: "Экскаватор" },
    siteLogColMiniBagger: { he: "מיני באגר", en: "Mini bagger", ar: "بيجر صغير", ru: "Мини-экскаватор" },
    siteLogColBobcat: { he: "בובקט", en: "Bobcat", ar: "بوبكات", ru: "Бобкэт" },
    siteLogColRoller: { he: "מכבש", en: "Roller", ar: "مدحلة", ru: "Каток" },
    siteLogColTruck: { he: "משאית", en: "Truck", ar: "شاحنة", ru: "Грузовик" },
    siteLogColArrowCart: { he: "עגלת חץ", en: "Concrete buggy", ar: "عربة خرسانة", ru: "Бетонная тележка" },
    siteLogColWaterTanker: { he: "מכלית מים", en: "Water tanker", ar: "صهريج مياه", ru: "Автоцистерна для воды" },
    siteLogColConcretePump: { he: "משאבת בטון", en: "Concrete pump", ar: "مضخة خرسانة", ru: "Бетононасос" },
    siteLogColCrane: { he: "מנוף", en: "Crane", ar: "رافعة", ru: "Кран" },
    siteLogColTelescopic: { he: "טלסקופי", en: "Telescopic", ar: "تلسكوبي", ru: "Телескопический" },
    siteLogColDrillingMachine: { he: "מכונת קידוח", en: "Drilling machine", ar: "آلة حفر", ru: "Буровая машина" },
    siteLogColPirkit: { he: "פרקית", en: "Semi-trailer truck", ar: "شاحنة نصف مقطورة", ru: "Седельный тягач" },
    reportsListTitle: { he: "דוחות פגישות וסיורים", en: "Meeting and tour reports", ar: "تقارير الاجتماعات والجولات", ru: "Отчёты о встречах и обходах" },
    reportsListEmpty: { he: "עדיין אין דוחות", en: "No reports yet", ar: "لا توجد تقارير بعد", ru: "Пока нет отчётов" },
    newReportBtn: { he: "+ חדש", en: "+ New", ar: "+ جديد", ru: "+ Новый" },
    confirmBtn: { he: "אישור", en: "Confirm", ar: "تأكيد", ru: "Подтвердить" },
    backBtn: { he: "חזרה", en: "Back", ar: "رجوع", ru: "Назад" },
    reportTypeModalMessage: { he: "פגישה או סיור?", en: "Meeting or tour?", ar: "اجتماع أم جولة؟", ru: "Встреча или обход?" },
    reportTypeMeeting: { he: "פגישה", en: "Meeting", ar: "اجتماع", ru: "Встреча" },
    reportTypeTour: { he: "סיור", en: "Tour", ar: "جولة", ru: "Обход" },
    reportTitleModalMessage: { he: "כותרת", en: "Title", ar: "العنوان", ru: "Заголовок" },
    reportTitlePlaceholder: { he: "כותרת", en: "Title", ar: "العنوان", ru: "Заголовок" },
    reportDateModalMessage: { he: "תאריך", en: "Date", ar: "التاريخ", ru: "Дата" },
    reportParticipantsModalMessage: { he: "משתתפים", en: "Participants", ar: "المشاركون", ru: "Участники" },
    reportParticipantsPlaceholder: { he: "שמות המשתתפים", en: "Participant names", ar: "أسماء المشاركين", ru: "Имена участников" },
    reportParticipantNamePlaceholder: { he: "שם משתתף", en: "Participant name", ar: "اسم المشارك", ru: "Имя участника" },
    sharedProjectModalMessage: { he: "פרויקט משותף חדש", en: "New shared project", ar: "مشروع مشترك جديد", ru: "Новый общий проект" },
    sharedProjectEditModalMessage: { he: "ניהול משתתפים", en: "Manage members", ar: "إدارة المشاركين", ru: "Управление участниками" },
    sharedProjectConvertModalMessage: { he: "הפיכה לפרויקט משותף - המשימות הקיימות יישמרו", en: "Make into a shared project - existing tasks are kept", ar: "تحويل إلى مشروع مشترك - سيتم الاحتفاظ بالمهام الحالية", ru: "Сделать общим проектом - существующие задачи сохранятся" },
    sharedProjectPickContactsBtn: { he: "בחירה מאנשי הקשר", en: "Choose from contacts", ar: "الاختيار من جهات الاتصال", ru: "Выбрать из контактов" },
    sharedProjectNamePlaceholder: { he: "שם הפרויקט", en: "Project name", ar: "اسم المشروع", ru: "Название проекта" },
    sharedProjectMembersLabel: { he: "מספרי טלפון של המשתתפים", en: "Members' phone numbers", ar: "أرقام هواتف المشاركين", ru: "Номера телефонов участников" },
    sharedProjectPhonePlaceholder: { he: "050-1234567", en: "050-1234567", ar: "050-1234567", ru: "050-1234567" },
    sharedProjectDefaultName: { he: "פרויקט משותף", en: "Shared project", ar: "مشروع مشترك", ru: "Общий проект" },
    sharedProjectNeedMember: { he: "יש להוסיף לפחות מספר טלפון אחד של משתתף", en: "Add at least one member's phone number", ar: "أضف رقم هاتف مشارك واحد على الأقل", ru: "Добавьте хотя бы один номер телефона участника" },
    cannotDeleteSharedProject: { he: "רק מי שיצר את הפרויקט המשותף יכול למחוק אותו", en: "Only the member who created this shared project can delete it", ar: "فقط من أنشأ المشروع المشترك يمكنه حذفه", ru: "Удалить общий проект может только тот, кто его создал" },
    projectInviteSendMessagePrefix: { he: "שיתוף הפרויקט", en: "Share the project", ar: "مشاركة المشروع", ru: "Поделиться проектом" },
    projectInviteSendBtn: { he: "שליחה", en: "Send", ar: "إرسال", ru: "Отправить" },
    projectInviteNeedPhoneMsg: { he: "יש להוסיף לפחות מספר טלפון אחד", en: "Add at least one phone number", ar: "أضف رقم هاتف واحد على الأقل", ru: "Добавьте хотя бы один номер телефона" },
    projectInviteSentMsg: { he: "ההזמנה נשלחה", en: "The invite was sent", ar: "تم إرسال الدعوة", ru: "Приглашение отправлено" },
    sharedProjectInviteMsgTemplate: { he: "{name} צירף/ה אותך לפרויקט המשותף \"{project}\" - לאשר?", en: "{name} added you to the shared project \"{project}\" - approve?", ar: "أضافك {name} إلى المشروع المشترك \"{project}\" - هل توافق؟", ru: "{name} добавил(а) вас в общий проект «{project}» - подтвердить?" },
    projectInviteReceivedMsgTemplate: { he: "קיבלת פרויקט \"{project}\" מ{name} - לאשר?", en: "You received the project \"{project}\" from {name} - approve?", ar: "استلمت المشروع \"{project}\" من {name} - هل توافق؟", ru: "Вы получили проект «{project}» от {name} - подтвердить?" },
    projectInviteApprovedMsg: { he: "הצטרפת לפרויקט", en: "You joined the project", ar: "لقد انضممت إلى المشروع", ru: "Вы присоединились к проекту" },
    projectInviteDeclinedMsg: { he: "ההזמנה נדחתה", en: "The invite was declined", ar: "تم رفض الدعوة", ru: "Приглашение отклонено" },
    chatBtnTitle: { he: "צ'אט הפרויקט", en: "Project chat", ar: "دردشة المشروع", ru: "Чат проекта" },
    chatInputPlaceholder: { he: "הודעה...", en: "Message...", ar: "رسالة...", ru: "Сообщение..." },
    chatSendBtnTitle: { he: "שליחה", en: "Send", ar: "إرسال", ru: "Отправить" },
    chatMicBtnTitle: { he: "הקלטת הודעה קולית", en: "Record voice message", ar: "تسجيل رسالة صوتية", ru: "Записать голосовое сообщение" },
    chatRecordingCancelTitle: { he: "ביטול", en: "Cancel", ar: "إلغاء", ru: "Отмена" },
    voiceMessageLabel: { he: "🎤 הודעה קולית", en: "🎤 Voice message", ar: "🎤 رسالة صوتية", ru: "🎤 Голосовое сообщение" },
    chatSysTaskAdded: { he: 'משימה "{name}" נוספה ע"י {actor}', en: 'Task "{name}" was added by {actor}', ar: 'تمت إضافة المهمة "{name}" بواسطة {actor}', ru: 'Задача "{name}" добавлена пользователем {actor}' },
    chatSysTaskDeleted: { he: 'משימה "{name}" נמחקה ע"י {actor}', en: 'Task "{name}" was deleted by {actor}', ar: 'تم حذف المهمة "{name}" بواسطة {actor}', ru: 'Задача "{name}" удалена пользователем {actor}' },
    chatSysTaskDone: { he: 'משימה "{name}" בוצעה ע"י {actor}', en: 'Task "{name}" was completed by {actor}', ar: 'تم إنجاز المهمة "{name}" بواسطة {actor}', ru: 'Задача "{name}" выполнена пользователем {actor}' },
    chatSysTaskUndone: { he: 'משימה "{name}" סומנה כלא בוצעה ע"י {actor}', en: 'Task "{name}" was marked not done by {actor}', ar: 'تم تعليم المهمة "{name}" كغير منجزة بواسطة {actor}', ru: 'Задача "{name}" отмечена как невыполненная пользователем {actor}' },
    voiceNotSupported: { he: "הקלטת קול לא נתמכת בדפדפן הזה", en: "Voice recording isn't supported in this browser", ar: "تسجيل الصوت غير مدعوم في هذا المتصفح", ru: "Запись голоса не поддерживается в этом браузере" },
    voiceMicPermissionDenied: { he: "לא ניתנה הרשאה למיקרופון", en: "Microphone permission was denied", ar: "لم يتم منح إذن الميكروفون", ru: "Доступ к микрофону не предоставлен" },
    voiceUploadError: { he: "שליחת ההודעה הקולית נכשלה", en: "Failed to send the voice message", ar: "فشل إرسال الرسالة الصوتية", ru: "Не удалось отправить голосовое сообщение" },
    chatAttachBtnTitle: { he: "צירוף קובץ", en: "Attach file", ar: "إرفاق ملف", ru: "Прикрепить файл" },
    chatFileUploadError: { he: "העלאת הקובץ נכשלה", en: "File upload failed", ar: "فشل تحميل الملف", ru: "Не удалось загрузить файл" },
    chatMsgActionModalMessage: { he: "מה לעשות עם ההודעה?", en: "What would you like to do with this message?", ar: "ماذا تريد أن تفعل بهذه الرسالة؟", ru: "Что сделать с этим сообщением?" },
    chatMsgCopyBtn: { he: "העתקה", en: "Copy", ar: "نسخ", ru: "Копировать" },
    chatMsgToTaskBtn: { he: "הפיכה למשימה", en: "Turn into task", ar: "تحويل إلى مهمة", ru: "Сделать задачей" },
    chatMsgCopiedMsg: { he: "ההודעה הועתקה", en: "Message copied", ar: "تم نسخ الرسالة", ru: "Сообщение скопировано" },
    chatMsgCopyFailedMsg: { he: "לא ניתן להעתיק כרגע", en: "Couldn't copy right now", ar: "تعذر النسخ الآن", ru: "Не удалось скопировать" },
    chatMsgAddedAsTaskMsg: { he: "נוספה כמשימה בדף המשימות", en: "Added as a task on the tasks page", ar: "أُضيفت كمهمة في صفحة المهام", ru: "Добавлено как задача на странице задач" },
    chatMsgEditBtn: { he: "עריכה", en: "Edit", ar: "تعديل", ru: "Изменить" },
    chatMsgDeleteBtn: { he: "מחיקה", en: "Delete", ar: "حذف", ru: "Удалить" },
    chatScrollBottomBtnTitle: { he: "גלילה להודעה האחרונה", en: "Scroll to latest message", ar: "التمرير إلى آخر رسالة", ru: "Прокрутить к последнему сообщению" },
    chatMsgConfirmDelete: { he: "למחוק את ההודעה הזו?", en: "Delete this message?", ar: "هل تريد حذف هذه الرسالة؟", ru: "Удалить это сообщение?" },
    chatEditingLabel: { he: "עריכת הודעה", en: "Editing message", ar: "تعديل الرسالة", ru: "Редактирование сообщения" },
    chatMsgEditedMark: { he: "נערך", en: "edited", ar: "معدّلة", ru: "изменено" },
    chatEmptyPrompt: { he: "אין עדיין הודעות בצ'אט הזה", en: "No messages in this chat yet", ar: "لا توجد رسائل في هذه الدردشة بعد", ru: "В этом чате пока нет сообщений" },
    chatYou: { he: "אני", en: "You", ar: "أنا", ru: "Я" },
    chatToday: { he: "היום", en: "Today", ar: "اليوم", ru: "Сегодня" },
    chatYesterday: { he: "אתמול", en: "Yesterday", ar: "أمس", ru: "Вчера" },
    libraryBtnTitle: { he: "ספריית קבצים", en: "File library", ar: "مكتبة الملفات", ru: "Библиотека файлов" },
    archiveBtnTitle: { he: "ארכיון פרויקטים שהסתיימו", en: "Archive of finished projects", ar: "أرشيف المشاريع المنتهية", ru: "Архив завершённых проектов" },
    noArchivedProjectsMsg: { he: "אין פרויקטים שהסתיימו", en: "No finished projects", ar: "لا توجد مشاريع منتهية", ru: "Нет завершённых проектов" },
    libraryAddBtnTitle: { he: "הוספת קובץ", en: "Add file", ar: "إضافة ملف", ru: "Добавить файл" },
    libraryEmptyPrompt: { he: "אין עדיין קבצים בספרייה הזו", en: "No files in this library yet", ar: "لا توجد ملفات في هذه المكتبة بعد", ru: "В этой библиотеке пока нет файлов" },
    libraryUploadError: { he: "העלאת הקובץ נכשלה", en: "File upload failed", ar: "فشل تحميل الملف", ru: "Не удалось загрузить файл" },
    libraryConfirmDelete: { he: "למחוק את הקובץ הזה?", en: "Delete this file?", ar: "هل تريد حذف هذا الملف؟", ru: "Удалить этот файл?" },
    libraryMoveToFolderBtn: { he: "📁 העברה לתיקייה", en: "📁 Move to folder", ar: "📁 نقل إلى مجلد", ru: "📁 Переместить в папку" },
    libraryMoveToFolderTitle: { he: "לאיזו תיקייה להעביר?", en: "Move to which folder?", ar: "إلى أي مجلد تريد النقل؟", ru: "В какую папку переместить?" },
    libraryMovedToFolder: { he: "הקובץ הועבר לתיקייה {folder}", en: "The file was moved to {folder}", ar: "تم نقل الملف إلى {folder}", ru: "Файл перемещён в папку {folder}" },
    libraryAddFolderBtnTitle: { he: "הוספת תיקייה", en: "Add folder", ar: "إضافة مجلد", ru: "Добавить папку" },
    libraryNewFolderPrompt: { he: "שם התיקייה", en: "Folder name", ar: "اسم المجلد", ru: "Название папки" },
    libraryFoldersEmptyPrompt: { he: "אין עדיין תיקיות", en: "No folders yet", ar: "لا توجد مجلدات بعد", ru: "Пока нет папок" },
    libraryFolderPlans: { he: "תוכניות", en: "Plans", ar: "خطط", ru: "Планы" },
    libraryFolderPhotos: { he: "תמונות", en: "Photos", ar: "صور", ru: "Фото" },
    libraryFolderDiaries: { he: "יומנים", en: "Journals", ar: "يوميات", ru: "Дневники" },
    libraryFolderReports: { he: "דוחות", en: "Reports", ar: "تقارير", ru: "Отчёты" },
    libraryFolderGeneral: { he: "כללי", en: "General", ar: "عام", ru: "Общее" },
    libraryConfirmDeleteFolder: { he: "למחוק את התיקייה הזו וכל הקבצים שבה?", en: "Delete this folder and all its files?", ar: "هل تريد حذف هذا المجلد وجميع ملفاته؟", ru: "Удалить эту папку со всеми файлами?" },
    libraryFolderActionModalMessage: { he: "מה לעשות עם התיקייה?", en: "What would you like to do with this folder?", ar: "ماذا تريد أن تفعل بهذا المجلد؟", ru: "Что сделать с этой папкой?" },
    libraryFileActionModalMessage: { he: "מה לעשות עם הקובץ?", en: "What would you like to do with this file?", ar: "ماذا تريد أن تفعل بهذا الملف؟", ru: "Что сделать с этим файлом?" },
    libraryTitlePrefix: { he: "ספריית ", en: "Library: ", ar: "مكتبة ", ru: "Библиотека: " },
    libraryFolderCreateBtn: { he: "יצירה", en: "Create", ar: "إنشاء", ru: "Создать" },
    newSharedProjectNotifTitle: { he: "צורפת לפרויקט משותף", en: "You were added to a shared project", ar: "تمت إضافتك إلى مشروع مشترك", ru: "Вас добавили в общий проект" },
    newSharedProjectNotifBody: { he: "{name} - לחצו כדי לפתוח", en: "{name} - tap to open", ar: "{name} - انقر للفتح", ru: "{name} - нажмите, чтобы открыть" },
    newChatMessagesNotifBody: { he: "{count} הודעות חדשות בצ'אט", en: "{count} new chat messages", ar: "{count} رسائل دردشة جديدة", ru: "{count} новых сообщений в чате" },
    reportColNum: { he: "מס'", en: "No.", ar: "الرقم", ru: "№" },
    reportColTask: { he: "משימה", en: "Task", ar: "المهمة", ru: "Задача" },
    reportColResponsible: { he: "באחריות", en: "Responsible", ar: "المسؤول", ru: "Ответственный" },
    reportColStatus: { he: "סטטוס", en: "Status", ar: "الحالة", ru: "Статус" },
    reportColPriority: { he: "עדיפות", en: "Priority", ar: "الأولوية", ru: "Приоритет" },
    reportColDue: { he: "עד", en: "Due", ar: "حتى", ru: "До" },
    reportColImage: { he: "תמונה", en: "Photo", ar: "صورة", ru: "Фото" },
    imagePopupCamera: { he: "מצלמה", en: "Camera", ar: "الكاميرا", ru: "Камера" },
    imagePopupGallery: { he: "מהאלבום", en: "From gallery", ar: "من الألبوم", ru: "Из галереи" },
    imagePopupRemove: { he: "הסרת תמונה", en: "Remove photo", ar: "إزالة الصورة", ru: "Удалить фото" },
    priorityUrgent: { he: "דחוף", en: "Urgent", ar: "عاجل", ru: "Срочно" },
    priorityRegular: { he: "רגיל", en: "Regular", ar: "عادي", ru: "Обычный" },
    responsiblePlaceholder: { he: "שם...", en: "Name...", ar: "الاسم...", ru: "Имя..." },
    statusWordDone: { he: "בוצע", en: "Done", ar: "تم التنفيذ", ru: "Выполнено" },
    statusWordPartial: { he: "בביצוע חלקי", en: "Partially done", ar: "منفذ جزئيًا", ru: "Частично выполнено" },
    statusWordNotDone: { he: "לא בוצע", en: "Not done", ar: "لم يتم التنفيذ", ru: "Не выполнено" },
    reportShareParticipantsLabel: { he: "משתתפים: ", en: "Participants: ", ar: "المشاركون: ", ru: "Участники: " },
    reportShareNoRows: { he: "(אין שורות)", en: "(no rows)", ar: "(لا توجد عناصر)", ru: "(нет записей)" },
    reportPdfTitleMeeting: { he: "סיכום פגישה", en: "Meeting Summary", ar: "ملخص الاجتماع", ru: "Итоги встречи" },
    reportPdfFooter: { he: "מסמך זה הופק באמצעות ITASK", en: "This document was produced using ITASK", ar: "تم إنتاج هذا المستند باستخدام ITASK", ru: "Этот документ создан с помощью ITASK" },
    reportPdfTitleTour: { he: "סיכום סיור", en: "Tour Summary", ar: "ملخص الجولة", ru: "Итоги обхода" },
    reportPdfError: { he: "אירעה שגיאה ביצירת ה-PDF", en: "An error occurred creating the PDF", ar: "حدث خطأ أثناء إنشاء PDF", ru: "Ошибка при создании PDF" },
    shareFallbackToSaveMsg: { he: "השיתוף לא זמין כאן - הקובץ נשמר במכשיר, אפשר לשתף אותו משם", en: "Sharing isn't available here - the file was saved to your device, you can share it from there", ar: "المشاركة غير متاحة هنا - تم حفظ الملف على جهازك، يمكنك مشاركته من هناك", ru: "Здесь недоступен общий доступ - файл сохранён на устройстве, поделиться им можно оттуда" },
    offlineSyncBadgeMsg: { he: "השינויים נשמרו במכשיר וישמרו בשרת כשיהיה חיבור לאינטרנט", en: "Changes were saved on this device and will sync to the server once you're back online", ar: "تم حفظ التغييرات على هذا الجهاز وستتم مزامنتها مع الخادم عند توفر الاتصال بالإنترنت", ru: "Изменения сохранены на устройстве и будут синхронизированы с сервером при подключении к интернету" },
    menuLabelAllProjects: { he: "כל הפרויקטים", en: "All projects", ar: "جميع المشاريع", ru: "Все проекты" },
    companyDashboardBtn: { he: "תמונת מצב פרויקטים", en: "Projects status overview", ar: "نظرة عامة على حالة المشاريع", ru: "Обзор статуса проектов" },
    companyDashboardTitle: { he: "תמונת מצב פרויקטים", en: "Projects status overview", ar: "نظرة عامة على حالة المشاريع", ru: "Обзор статуса проектов" },
    companyDashboardEmpty: { he: "אין פרויקטים להצגה", en: "No projects to show", ar: "لا توجد مشاريع لعرضها", ru: "Нет проектов для отображения" },
    companyDashboardClosedToday: { he: "✓ יומן נסגר היום", en: "✓ Log closed today", ar: "✓ تم إغلاق السجل اليوم", ru: "✓ Журнал закрыт сегодня" },
    companyDashboardOpenNotClosed: { he: "יומן היום פתוח, לא נסגר", en: "Today's log is open, not closed yet", ar: "سجل اليوم مفتوح ولم يُغلق بعد", ru: "Журнал за сегодня открыт, не закрыт" },
    companyDashboardNoLogToday: { he: "אין יומן היום", en: "No log for today", ar: "لا يوجد سجل لليوم", ru: "Нет журнала за сегодня" },
    companyDashboardLastLog: { he: "יומן סגור אחרון:", en: "Last closed log:", ar: "آخر سجل مغلق:", ru: "Последний закрытый журнал:" },
    taskDoneLogPrefix: { he: "בוצע", en: "Done", ar: "تم", ru: "Выполнено" },
    taskTransferToLogBtn: { he: "העברה ליומן", en: "Transfer to log", ar: "نقل إلى السجل", ru: "Перенести в журнал" },
    taskRemoveFromLogBtn: { he: "הסרה מהיומן", en: "Remove from log", ar: "إزالة من السجل", ru: "Удалить из журнала" },
    taskTransferredToLogMsg: { he: "המשימה נוספה ליומן העבודה", en: "The task was added to the work log", ar: "تمت إضافة المهمة إلى سجل العمل", ru: "Задача добавлена в рабочий журнал" },
    taskRemovedFromLogMsg: { he: "המשימה הוסרה מיומן העבודה", en: "The task was removed from the work log", ar: "تمت إزالة المهمة من سجل العمل", ru: "Задача удалена из рабочего журнала" },
    reportCloseBtn: { he: "סגירת הדוח", en: "Close report", ar: "إغلاق التقرير", ru: "Закрыть отчёт" }
  };


  // ---------------------------------------------------------------------
  // Error reports: what breaks on someone's phone lands in the app_errors
  // table (supabase/sql/app_errors.sql) - an uncaught error, a promise
  // nobody caught, or a failure the app itself logs with console.error -
  // with who, which build and which screen, so it can be fixed before
  // anyone has to tell. At most 15 a session, each kind once, none while
  // offline; reporting never throws on its own account.
  // ---------------------------------------------------------------------
  var errorReportsSent = 0;
  var errorReportsSeen = {};
  var ERROR_REPORTS_MAX = 15;
  var ERROR_NOISE = /ResizeObserver loop|^Script error\.?$|Load failed|Failed to fetch|NetworkError|network error|AbortError|The user aborted|Share canceled/i;
  function appBuildId() {
    var s = document.querySelector("script[src*='tasks-app.js']");
    var m = s && /[?&]v=([\w-]+)/.exec(s.getAttribute("src"));
    return m ? m[1] : "";
  }
  function reportAppError(kind, message, extra) {
    try {
      message = String(message || "").slice(0, 1000);
      if (!message || ERROR_NOISE.test(message)) return;
      if (errorReportsSent >= ERROR_REPORTS_MAX || navigator.onLine === false) return;
      var key = kind + "|" + message;
      if (errorReportsSeen[key]) return;
      errorReportsSeen[key] = true;
      if (typeof supabaseClient === "undefined" || !supabaseClient) return;
      errorReportsSent++;
      extra = extra || {};
      var row = {
        kind: kind,
        message: message,
        stack: String(extra.stack || "").slice(0, 4000) || null,
        source: extra.source ? String(extra.source).slice(0, 300) : null,
        line: extra.line || null,
        col: extra.col || null,
        build: appBuildId(),
        view: (typeof state !== "undefined" && state && state.viewMode) || null,
        phone: (typeof myPhoneNumber !== "undefined" && myPhoneNumber) || null,
        native: !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()),
        lang: typeof currentLang !== "undefined" ? currentLang : null,
        ua: navigator.userAgent.slice(0, 300)
      };
      Promise.resolve(supabaseClient.from("app_errors").insert(row)).then(function () {}, function () {});
    } catch (e) {}
  }
  window.addEventListener("error", function (e) {
    reportAppError("error", e.message || (e.error && e.error.message), {
      stack: e.error && e.error.stack, source: e.filename, line: e.lineno, col: e.colno
    });
  });
  window.addEventListener("unhandledrejection", function (e) {
    var r = e.reason;
    reportAppError("promise", (r && (r.message || r.error_description || r.error)) || String(r), { stack: r && r.stack });
  });
  // failures the app catches and logs: console.error("what failed:", err)
  (function () {
    var orig = console.error;
    console.error = function () {
      try {
        var parts = Array.prototype.map.call(arguments, function (a) {
          if (a && a.message) return a.message;
          if (a && typeof a === "object") { try { return JSON.stringify(a); } catch (e) { return String(a); } }
          return String(a);
        });
        var err = Array.prototype.find.call(arguments, function (a) { return a && a.stack; });
        reportAppError("logged", parts.join(" "), { stack: err && err.stack });
      } catch (e) {}
      return orig.apply(console, arguments);
    };
  })();
  var LANG_STORAGE_KEY = "itask-lang";
  var currentLang = (function () {
    try {
      var saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved && TRANSLATIONS.authSubtitle[saved]) return saved;
    } catch (e) {}
    return "he";
  })();
  var RTL_LANGS = { he: true, ar: true };
  document.documentElement.lang = currentLang;
  document.documentElement.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";

  function tr(key) {
    var entry = TRANSLATIONS[key];
    if (!entry) return "";
    return entry[currentLang] || entry.he || "";
  }

  function applyStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = tr(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.setAttribute("placeholder", tr(el.getAttribute("data-i18n-ph")));
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.setAttribute("title", tr(el.getAttribute("data-i18n-title")));
    });
  }

  function setLang(lang) {
    if (!TRANSLATIONS.authSubtitle[lang]) lang = "he";
    currentLang = lang;
    try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) {}
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS[lang] ? "rtl" : "ltr";
    applyStaticTranslations();
    if (typeof render === "function" && typeof data !== "undefined") render();
  }

  var splashScreen = document.getElementById("splashScreen");
  function hideSplash() {
    if (!splashScreen || splashScreen.hidden) return;
    splashScreen.classList.add("splash-hide");
    setTimeout(function () { splashScreen.hidden = true; }, 500);
  }

  var STORAGE_KEY = "daily-tasks-sheets-v1";
  function localStorageKey() {
    return SUPABASE_ROW_ID ? (STORAGE_KEY + ":" + SUPABASE_ROW_ID) : STORAGE_KEY;
  }
  var ROW_MARK_BASE_D = "M4 3 L16 15 M1.5 3 L6.5 3 M13.5 3 L18.5 3 M1.5 15 L6.5 15 M13.5 15 L18.5 15";
  var ROW_MARK_HALF_D = "M16 3 L10 9";
  var ROW_MARK_FULL_D = "M16 3 L4 15";

  function rowMarkSvg(status) {
    var progressD = status === 2 ? ROW_MARK_FULL_D : status === 1 ? ROW_MARK_HALF_D : "";
    var progressPath = progressD
      ? '<path d="' + progressD + '" fill="none" stroke="var(--danger)" stroke-width="2.1" stroke-linecap="round"/>'
      : "";
    return '<svg viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg"><path d="' + ROW_MARK_BASE_D + '" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>' + progressPath + '</svg>';
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function todayISO() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }
  function addDaysToISO(iso, delta) {
    var parts = iso.split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    d.setDate(d.getDate() + delta);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }
  function isoToDisplay(iso) {
    var parts = iso.split("-");
    return parts[2] + "/" + parts[1];
  }

  function rollSheetsForward(sheets) {
    var today = todayISO();
    sheets.forEach(function (sheet) {
      (sheet.tasks || []).forEach(function (t) {
        if (typeof t.date !== "string") t.date = today;
        if (t.type !== "note" && t.status !== 2 && t.date < today) t.date = today;
      });
    });
  }

  function applyDailyRollover(data) {
    var today = todayISO();
    if (data.lastRolloverDate === today) return false;
    rollSheetsForward(data.sheets);
    data.lastRolloverDate = today;
    return true;
  }

  function defaultData() {
    var sheetId = uid();
    return {
      sheets: [{ id: sheetId, name: tr("projectWord") + " 1", tasks: [], reports: [], files: [], siteLogs: [], logoId: null }],
      activeSheetId: sheetId,
      logos: []
    };
  }

  var SITE_LOG_ATTENDANCE_COLUMNS = ["foreman", "engineer", "workers", "operators", "consultants", "surveyor"];
  var SITE_LOG_TOOLS_COLUMNS = ["excavator", "loader", "bagger", "miniBagger", "bobcat", "roller", "truck", "arrowCart", "waterTanker", "concretePump", "crane", "telescopic", "drillingMachine", "pirkit"];

  function normalizeSiteLog(log) {
    if (!log.attendance || typeof log.attendance !== "object") log.attendance = {};
    SITE_LOG_ATTENDANCE_COLUMNS.forEach(function (col) {
      if (!Array.isArray(log.attendance[col])) log.attendance[col] = [];
    });
    if (!log.tools || typeof log.tools !== "object" || Array.isArray(log.tools)) log.tools = {};
    SITE_LOG_TOOLS_COLUMNS.forEach(function (col) {
      var val = log.tools[col];
      if (Array.isArray(val)) {
        val.forEach(function (entry) {
          if (!entry.id) entry.id = uid();
          if (typeof entry.qty !== "string") entry.qty = entry.qty ? String(entry.qty) : "";
          if (typeof entry.note !== "string") entry.note = "";
        });
      } else if (typeof val === "string") {
        log.tools[col] = val.trim() ? [{ id: uid(), qty: val, note: "" }] : [];
      } else if (val && typeof val === "object") {
        var qty = typeof val.qty === "string" ? val.qty : (val.qty ? String(val.qty) : "");
        var note = typeof val.note === "string" ? val.note : "";
        log.tools[col] = (qty || note) ? [{ id: uid(), qty: qty, note: note }] : [];
      } else {
        log.tools[col] = [];
      }
    });
    if (!Array.isArray(log.contractors)) log.contractors = [];
    if (!Array.isArray(log.works)) log.works = [];
    if (!Array.isArray(log.procurement)) log.procurement = [];
    if (!Array.isArray(log.planned)) log.planned = [];
    if (!Array.isArray(log.photos)) log.photos = [];
    log.procurement.forEach(function (row) {
      if (typeof row.item !== "string") row.item = "";
      if (typeof row.quantity !== "string") row.quantity = "";
      if (typeof row.supplier !== "string") row.supplier = "";
    });
    if (typeof log.closed !== "boolean") log.closed = false;
    if (typeof log.number !== "number") log.number = null;
    if (typeof log.closedAt !== "number") log.closedAt = null;
    if (!log.closedFile || typeof log.closedFile !== "object") log.closedFile = null;
    return log;
  }

  function normalizeData(parsed) {
    if (!parsed || !Array.isArray(parsed.sheets) || !parsed.sheets.length) return null;
    parsed.sheets.forEach(function (sheet) {
      (sheet.tasks || []).forEach(function (t) {
        if (typeof t.status !== "number") {
          t.status = t.done ? 2 : 0;
        }
        if (typeof t.urgent !== "boolean") {
          t.urgent = t.priority === "high";
        }
        if (!t.logEntry || typeof t.logEntry !== "object") t.logEntry = null;
        delete t.done;
        delete t.priority;
      });
      if (!Array.isArray(sheet.reports)) sheet.reports = [];
      if (!Array.isArray(sheet.files)) sheet.files = [];
      if (!Array.isArray(sheet.siteLogs)) sheet.siteLogs = [];
      if (typeof sheet.logoId !== "string") sheet.logoId = null;
      sheet.siteLogs.forEach(normalizeSiteLog);
      sheet.reports.forEach(function (report) {
        if (!Array.isArray(report.rows)) report.rows = [];
        if (!report.closedFile || typeof report.closedFile !== "object") report.closedFile = null;
        report.rows.forEach(function (row) {
          if (typeof row.status !== "number") row.status = 0;
          if (row.priority !== "urgent" && row.priority !== "regular") row.priority = null;
          if (typeof row.dueDate !== "string") row.dueDate = null;
          if (typeof row.image !== "string") row.image = null;
        });
      });
    });
    if (!Array.isArray(parsed.logos)) parsed.logos = [];
    parsed.logos.forEach(function (logo) {
      if (typeof logo.name !== "string") logo.name = "";
      if (typeof logo.dataUrl !== "string") logo.dataUrl = "";
    });
    delete parsed.reports;
    return parsed;
  }
  function loadLocalData() {
    try {
      return normalizeData(JSON.parse(localStorage.getItem(localStorageKey())));
    } catch (e) {
      return null;
    }
  }
  function saveLocalData() {
    try {
      localStorage.setItem(localStorageKey(), JSON.stringify(data));
    } catch (e) {}
  }
  function countTasks(d) {
    var total = 0;
    (d.sheets || []).forEach(function (s) { total += (s.tasks || []).length; });
    return total;
  }
  function findLegacyLocalData() {
    try {
      var currentKey = localStorageKey();
      var prefix = STORAGE_KEY + ":";
      var best = null;
      var bestCount = 0;
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key === currentKey || (key !== STORAGE_KEY && key.indexOf(prefix) !== 0)) continue;
        var parsed = normalizeData(JSON.parse(localStorage.getItem(key)));
        var count = countTasks(parsed);
        if (count > bestCount) { best = parsed; bestCount = count; }
      }
      return best;
    } catch (e) {
      return null;
    }
  }

  var SUPABASE_URL = "https://oqvqrqhtywcqdnftaovk.supabase.co";
  var SUPABASE_KEY = "sb_publishable_K6dRlzpWSRV7O-Dy_C8ypA_Yep2P3x7";
  var SUPABASE_ROW_ID = null;
  var myPhoneNumber = null;
  var sharedSheets = [];
  var supabaseClient = (window.supabase && SUPABASE_URL && SUPABASE_KEY)
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;

  var FIREBASE_CONFIG = {
    apiKey: "AIzaSyDdOBjiG2pO7pTkRC44gLJQ_gEPiTaHTPU",
    authDomain: "itask-93f4f.firebaseapp.com",
    projectId: "itask-93f4f",
    storageBucket: "itask-93f4f.firebasestorage.app",
    messagingSenderId: "480651316688",
    appId: "1:480651316688:web:7a4378d6347fe22dc67dd5"
  };
  var firebaseAuth = (window.firebase && FIREBASE_CONFIG.apiKey)
    ? (firebase.initializeApp(FIREBASE_CONFIG), firebase.auth())
    : null;
  if (firebaseAuth) {
    firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function () {});
    // Ask the browser/WebView to keep this site's storage (where the sign-in
    // lives) instead of treating it as evictable cache when space runs low -
    // a tester was once sent back to the sign-in screen for no visible reason.
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persisted().then(function (already) {
        if (!already) return navigator.storage.persist();
      }).catch(function () {});
    }
    // Opt-in only (?e2e=1), never on for real users: automated test runners
    // (GitHub Actions, etc.) run from datacenter IPs that Google's invisible
    // reCAPTCHA routinely blocks regardless of using a Firebase test phone
    // number - that number only skips the real SMS, not this client-side
    // challenge. This is Firebase's own documented bypass for exactly that
    // case, scoped to Firebase's test phone numbers only, which already
    // require configuring them in the Firebase console - it cannot be used
    // to skip verification for a real phone number.
    if (new URLSearchParams(window.location.search).get("e2e") === "1") {
      firebaseAuth.settings.appVerificationDisabledForTesting = true;
    }
  }

  function phoneToUuid(phone) {
    return window.crypto.subtle.digest("SHA-256", new TextEncoder().encode("itask-phone:" + phone)).then(function (buf) {
      var bytes = Array.prototype.slice.call(new Uint8Array(buf), 0, 16);
      var hex = bytes.map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
      return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-4" + hex.slice(13, 16) + "-a" + hex.slice(17, 20) + "-" + hex.slice(20, 32);
    });
  }

  var SHARED_TABLE = "shared_projects";

  function saveData() {
    if (dataLoadBlocked || !privateDataSettled) return;
    editedSinceLastLoad = true;
    saveLocalData();
    if (supabaseClient) {
      markPendingSyncDirty();
      supabaseClient.from("app_state")
        .upsert({ id: SUPABASE_ROW_ID, data: data, updated_at: new Date().toISOString() })
        .then(function (result) {
          if (result && result.error) { scheduleSyncRetry(); return; }
          clearPendingSyncDirty();
        }, function () { scheduleSyncRetry(); });
    }
    saveSharedSheets();
  }

  // Merges a fresh-from-server array of {id,...} items with this device's
  // in-memory copy, using the last-confirmed-synced copy to tell "we
  // changed/added/removed this one locally" apart from "we just haven't
  // touched this since it loaded" - so an item neither side touched always
  // comes from the fresh server copy (never silently reverted), an item
  // only WE touched (added, edited, or deleted) keeps our version, and an
  // item added or removed by someone else meanwhile is preserved as such
  // even though our local copy doesn't reflect it yet.
  function mergeSharedArrayByLocalChanges(freshArr, localArr, syncedArr) {
    freshArr = freshArr || []; localArr = localArr || []; syncedArr = syncedArr || [];
    var syncedIds = {}; var syncedById = {};
    syncedArr.forEach(function (i) { syncedIds[i.id] = true; syncedById[i.id] = i; });
    var localById = {}; localArr.forEach(function (i) { localById[i.id] = i; });
    var result = [];
    var seen = {};
    freshArr.forEach(function (freshItem) {
      seen[freshItem.id] = true;
      var localItem = localById[freshItem.id];
      if (!localItem) {
        if (syncedIds[freshItem.id]) return; // we deleted it locally - keep it deleted
        result.push(freshItem); // someone else added it remotely - keep it
        return;
      }
      var weChangedIt = JSON.stringify(syncedById[freshItem.id]) !== JSON.stringify(localItem);
      result.push(weChangedIt ? localItem : freshItem);
    });
    localArr.forEach(function (localItem) {
      if (seen[localItem.id]) return;
      if (!syncedIds[localItem.id]) result.push(localItem); // a genuinely new local addition
      // else: known at last sync but fresh no longer has it - someone else
      // deleted it remotely; don't resurrect it just because our local
      // copy (loaded before that deletion) still has it.
    });
    return result;
  }

  function mergeSharedScalarByLocalChange(freshVal, localVal, syncedVal) {
    return JSON.stringify(localVal) !== JSON.stringify(syncedVal) ? localVal : freshVal;
  }

  // Only ever pushes a sheet whose tasks/reports/siteLogs/ended/logoId
  // actually differ from what we last confirmed the server holds - a save
  // triggered by editing sheet A no longer re-uploads every OTHER shared
  // sheet's possibly-stale local cache over whatever a concurrent member
  // just wrote to it. For the sheet(s) that did change, the write is
  // version-gated (updateSharedSheetDataSafely) and merged per-item
  // against fresh data on every retry, instead of blindly overwriting the
  // whole row - so two members editing the SAME shared project around the
  // same time no longer silently drop each other's changes.
  function saveSharedSheets() {
    if (!supabaseClient) return;
    sharedSheets.forEach(function (sheet) {
      if (!sheet._syncedData) {
        // Never confirmed to exist on the server (freshly created this
        // session, via "new shared project" or converting a private one) -
        // a plain insert, not the version-gated update path below, which
        // can only ever modify a row that's already there.
        supabaseClient.from(SHARED_TABLE).insert({
          id: sheet.id,
          name: sheet.name,
          data: {
            tasks: sheet.tasks || [], reports: sheet.reports || [], files: [], folders: sheet.folders || null,
            siteLogs: sheet.siteLogs || [], ended: sheet.ended || false, endedDate: sheet.endedDate || null, logoId: sheet.logoId || null,
            workPlan: sheet.workPlan || [], workHammocks: sheet.workHammocks || [], workBaseline: sheet.workBaseline || null, sketches: sheet.sketches || []
          },
          data_version: 1,
          members: sheet.members || [],
          member_names: sheet.memberNames || {},
          created_by: sheet.createdBy || myPhoneNumber,
          messages: sheet.messages || [],
          messages_version: 1,
          updated_at: new Date().toISOString()
        }).then(function (result) {
          var err = result && result.error;
          if (err) {
            // A duplicate-key error here means our own earlier insert
            // attempt actually landed but we never saw the response (a
            // dropped ack, not a real failure) - treat it as confirmed
            // rather than retrying an insert that will only conflict again.
            if (err.code !== "23505" && !/duplicate key/i.test(err.message || "")) { scheduleSyncRetry(); return; }
          }
          // Deep-cloned - see the comment on sharedRowToSheet's _syncedData
          // for why this must never alias the live sheet's own arrays.
          sheet._syncedData = JSON.parse(JSON.stringify({
            tasks: sheet.tasks || [], reports: sheet.reports || [], siteLogs: sheet.siteLogs || [],
            ended: !!sheet.ended, endedDate: sheet.endedDate || null, logoId: sheet.logoId || null
          }));
        }, function () { scheduleSyncRetry(); });
        return;
      }
      var synced = sheet._syncedData || {};
      var local = {
        tasks: sheet.tasks || [], reports: sheet.reports || [], siteLogs: sheet.siteLogs || [],
        ended: !!sheet.ended, endedDate: sheet.endedDate || null, logoId: sheet.logoId || null
      };
      var syncedComparable = {
        tasks: synced.tasks || [], reports: synced.reports || [], siteLogs: synced.siteLogs || [],
        ended: !!synced.ended, endedDate: synced.endedDate || null, logoId: synced.logoId || null
      };
      if (JSON.stringify(local) === JSON.stringify(syncedComparable)) return;

      updateSharedSheetDataSafely(sheet.id, function (freshData) {
        return {
          tasks: mergeSharedArrayByLocalChanges(freshData.tasks, local.tasks, syncedComparable.tasks),
          reports: mergeSharedArrayByLocalChanges(freshData.reports, local.reports, syncedComparable.reports),
          files: [],
          folders: freshData.folders || null,
          siteLogs: mergeSharedArrayByLocalChanges(freshData.siteLogs, local.siteLogs, syncedComparable.siteLogs),
          ended: mergeSharedScalarByLocalChange(freshData.ended || false, local.ended, syncedComparable.ended),
          endedDate: mergeSharedScalarByLocalChange(freshData.endedDate || null, local.endedDate, syncedComparable.endedDate),
          logoId: mergeSharedScalarByLocalChange(freshData.logoId || null, local.logoId, syncedComparable.logoId)
        };
      }).then(function (mergedData) {
        var liveSheet = sharedSheets.find(function (s) { return s.id === sheet.id; });
        if (liveSheet) {
          liveSheet.tasks = mergedData.tasks;
          liveSheet.reports = mergedData.reports;
          liveSheet.siteLogs = mergedData.siteLogs;
          liveSheet.ended = mergedData.ended;
          liveSheet.endedDate = mergedData.endedDate;
          liveSheet.logoId = mergedData.logoId;
          liveSheet.folders = mergedData.folders;
          // Deep-cloned - liveSheet.tasks/reports/siteLogs above are the
          // SAME array objects as mergedData's; _syncedData must not alias
          // them (see the comment on sharedRowToSheet's _syncedData).
          liveSheet._syncedData = JSON.parse(JSON.stringify({
            tasks: mergedData.tasks, reports: mergedData.reports, siteLogs: mergedData.siteLogs,
            ended: mergedData.ended, endedDate: mergedData.endedDate, logoId: mergedData.logoId
          }));
          render();
        }
      }, function () { scheduleSyncRetry(); });
    });
  }

  // Renaming a shared project, or editing its member list/names via the
  // shared-project settings modal, is rare and user-initiated (unlike
  // task/report edits, which fire on every keystroke's worth of activity) -
  // a plain fresh-read-immediately-before-write is enough here, the same
  // safe pattern chat messages already use, without needing its own
  // version column.
  function updateSharedProjectSettings(sheetId, mutateFn) {
    if (!supabaseClient) return Promise.resolve();
    return supabaseClient.from(SHARED_TABLE).select("name, members, member_names").eq("id", sheetId).maybeSingle()
      .then(function (result) {
        if (result && result.error) throw result.error;
        var row = result && result.data;
        var current = { name: row && row.name, members: (row && row.members) || [], memberNames: (row && row.member_names) || {} };
        var updated = mutateFn(current);
        return supabaseClient.from(SHARED_TABLE)
          .update({ name: updated.name, members: updated.members, member_names: updated.memberNames, updated_at: new Date().toISOString() })
          .eq("id", sheetId)
          .then(function (updateResult) {
            if (updateResult && updateResult.error) throw updateResult.error;
            var liveSheet = sharedSheets.find(function (s) { return s.id === sheetId; });
            if (liveSheet) {
              liveSheet.name = updated.name;
              liveSheet.members = updated.members;
              liveSheet.memberNames = updated.memberNames;
            }
            return updated;
          });
      });
  }

  // Offline resilience: saveLocalData() above always succeeds (it's just
  // localStorage), but the Supabase upsert can fail or never even fire
  // (no connectivity) - previously that failure was silently swallowed and
  // never retried, so an edit made offline could simply never reach the
  // server, and worse, the *next* app load's remote fetch would overwrite
  // the still-unsynced local snapshot with the older server row. This flag
  // (persisted so it survives a reload/app close) tracks "the local copy
  // may be ahead of what's confirmed saved" and drives a retry loop plus a
  // small visible badge, and startWithSupabase() below checks it to avoid
  // clobbering an unsynced local edit with a stale remote read.
  var pendingSyncDirty = false;
  var syncRetryTimer = null;
  function pendingSyncStorageKey() { return "itask-pending-sync:" + SUPABASE_ROW_ID; }
  function markPendingSyncDirty() {
    pendingSyncDirty = true;
    try { localStorage.setItem(pendingSyncStorageKey(), String(Date.now())); } catch (e) {}
    updateOfflineSyncBadge();
  }
  function clearPendingSyncDirty() {
    pendingSyncDirty = false;
    try { localStorage.removeItem(pendingSyncStorageKey()); } catch (e) {}
    updateOfflineSyncBadge();
  }
  // A pending-sync flag from days ago is more likely an abandoned device
  // whose cached data has since fallen behind (an old browser tab, a phone
  // that sat unused) than a genuine offline edit still worth pushing -
  // honoring it would silently overwrite the server with that stale
  // snapshot, wiping out real work done elsewhere in the meantime. Only
  // trust the flag while it's recent; a stale one is discarded instead of
  // acted on. This also self-heals any device already carrying the old
  // (timestamp-less) "1" marker from before this check existed, since that
  // parses as an ancient timestamp and is treated as stale too.
  var PENDING_SYNC_STALE_MS = 24 * 60 * 60 * 1000;
  function hasPendingSyncFromPreviousSession() {
    try {
      var raw = localStorage.getItem(pendingSyncStorageKey());
      if (!raw) return false;
      var ts = parseInt(raw, 10);
      if (!ts || Date.now() - ts > PENDING_SYNC_STALE_MS) {
        try { localStorage.removeItem(pendingSyncStorageKey()); } catch (e) {}
        return false;
      }
      return true;
    } catch (e) { return false; }
  }
  function scheduleSyncRetry() {
    updateOfflineSyncBadge();
    if (syncRetryTimer) return;
    syncRetryTimer = setTimeout(function () {
      syncRetryTimer = null;
      flushPendingSync();
    }, 20000);
  }
  function flushPendingSync() {
    if (!pendingSyncDirty || !supabaseClient || dataLoadBlocked || !privateDataSettled) return;
    supabaseClient.from("app_state")
      .upsert({ id: SUPABASE_ROW_ID, data: data, updated_at: new Date().toISOString() })
      .then(function (result) {
        if (result && result.error) { scheduleSyncRetry(); return; }
        clearPendingSyncDirty();
      }, function () { scheduleSyncRetry(); });
    saveSharedSheets();
  }
  var offlineSyncBadge = document.getElementById("offlineSyncBadge");
  function updateOfflineSyncBadge() {
    if (offlineSyncBadge) offlineSyncBadge.hidden = !pendingSyncDirty;
  }
  window.addEventListener("online", flushPendingSync);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") flushPendingSync();
  });

  var BACKUP_TABLE = "app_state_backups";
  var BACKUP_MIN_INTERVAL_MS = 30 * 60 * 1000;
  var BACKUP_KEEP_COUNT = 20;

  function backupStorageKey() {
    return "itask-last-backup:" + SUPABASE_ROW_ID;
  }

  function pruneOldBackups() {
    supabaseClient.from(BACKUP_TABLE).select("id").eq("row_id", SUPABASE_ROW_ID).order("created_at", { ascending: false })
      .then(function (result) {
        var rows = (result && result.data) || [];
        var toDelete = rows.slice(BACKUP_KEEP_COUNT).map(function (r) { return r.id; });
        if (toDelete.length) {
          supabaseClient.from(BACKUP_TABLE).delete().in("id", toDelete).then(function () {}, function () {});
        }
      }, function () {});
  }

  // Best-effort rolling backup: whenever we've just confirmed we're holding
  // real data (not a bare fresh default), snapshot it into a separate
  // history table at most once per BACKUP_MIN_INTERVAL_MS, so a future bug
  // or mistake has something to restore from beyond just the live row.
  function maybeBackupData() {
    if (!supabaseClient || !SUPABASE_ROW_ID || dataLoadBlocked) return;
    var lastBackupAt = 0;
    try { lastBackupAt = Number(localStorage.getItem(backupStorageKey())) || 0; } catch (e) {}
    if (Date.now() - lastBackupAt < BACKUP_MIN_INTERVAL_MS) return;
    try {
      supabaseClient.from(BACKUP_TABLE).insert({ row_id: SUPABASE_ROW_ID, data: data }).then(function (result) {
        if (result && result.error) return;
        try { localStorage.setItem(backupStorageKey(), String(Date.now())); } catch (e) {}
        try { pruneOldBackups(); } catch (e) {}
      }, function () {});
    } catch (e) {}
  }

  var data = defaultData();
  var dataLoadBlocked = false;
  // The private app_state read and the shared-projects read both fire in
  // parallel on startup (loadSharedSheets() is not awaited by
  // startWithSupabase()). If the shared read resolves first, its own
  // render() call would show a fully-interactive app with `data` still at
  // its unresolved initial default - no error overlay, since that's only
  // shown once the private read settles - and any tap before the private
  // read finishes could saveData() that empty default over the real row.
  // Gate every render() triggered by the shared-projects path behind this
  // flag so the very first paint always reflects the private read's outcome.
  var privateDataSettled = false;
  // Set whenever saveData() actually runs. Lets startWithSupabase() tell
  // whether the user made a real edit against an instantly-rendered local
  // snapshot before the authoritative server fetch came back - if so, the
  // fetch's (now possibly stale-relative-to-that-edit) result must not
  // blindly overwrite `data`, or a fast edit could be silently lost.
  var editedSinceLastLoad = false;
  var state = { renamingSheetId: null, menuOpen: false, editingTaskId: null, viewDate: todayISO(), searchOpen: false, highlightTaskId: null, viewMode: "tasks", showingCompleted: false };
  // The diary (יומן) always shows state.viewDate's own log - kept in sync
  // each render() while viewMode is "diary" (see openDiaryView() below).
  var activeSiteLogDate = null;

  var dateLabel = document.getElementById("dateLabel");
  var sheetsBarPrivate = document.getElementById("sheetsBarPrivate");
  var sheetsBarShared = document.getElementById("sheetsBarShared");
  var taskInput = document.getElementById("taskInput");
  var addForm = document.getElementById("addForm");
  var taskList = document.getElementById("taskList");
  var taskReminderIconsLayer = document.getElementById("taskReminderIconsLayer");
  var emptyState = document.getElementById("emptyState");
  var emptyStateText = document.getElementById("emptyStateText");
  var showCompletedTasksBtn = document.getElementById("showCompletedTasksBtn");
  var showActiveTasksBtn = document.getElementById("showActiveTasksBtn");
  var sheetTitle = document.getElementById("sheetTitle");
  var menuBtn = document.getElementById("menuBtn");
  var menuPanel = document.getElementById("menuPanel");
  var searchBtn = document.getElementById("searchBtn");
  var searchPanel = document.getElementById("searchPanel");
  var searchInput = document.getElementById("searchInput");
  var searchResults = document.getElementById("searchResults");
  var confirmOverlay = document.getElementById("confirmOverlay");
  var confirmMessage = document.getElementById("confirmMessage");
  var confirmYesBtn = document.getElementById("confirmYesBtn");
  var confirmNoBtn = document.getElementById("confirmNoBtn");
  var pendingConfirmYes = null;

  function askConfirm(message, onYes) {
    confirmMessage.textContent = message;
    pendingConfirmYes = onYes;
    confirmOverlay.hidden = false;
  }
  function closeConfirm() {
    confirmOverlay.hidden = true;
    pendingConfirmYes = null;
  }
  confirmYesBtn.addEventListener("click", function () {
    var action = pendingConfirmYes;
    closeConfirm();
    if (action) action();
  });
  confirmNoBtn.addEventListener("click", closeConfirm);
  confirmOverlay.addEventListener("click", function (e) {
    if (e.target === confirmOverlay) closeConfirm();
  });

  var moveTaskOverlay = document.getElementById("moveTaskOverlay");
  var moveTaskProjectsOverlay = document.getElementById("moveTaskProjectsOverlay");
  var moveTaskProjects = document.getElementById("moveTaskProjects");
  var moveTaskProjectsTitle = document.getElementById("moveTaskProjectsTitle");
  var moveTaskProjectsCancelBtn = document.getElementById("moveTaskProjectsCancelBtn");
  var moveModeMoveBtn = document.getElementById("moveModeMoveBtn");
  var moveModeCopyBtn = document.getElementById("moveModeCopyBtn");
  var shareTaskBtn = document.getElementById("shareTaskBtn");
  var taskReminderBtn = document.getElementById("taskReminderBtn");
  var taskChatQuoteBtn = document.getElementById("taskChatQuoteBtn");
  var taskCalendarReminderBtn = document.getElementById("taskCalendarReminderBtn");
  var removeFromCalendarBtn = document.getElementById("removeFromCalendarBtn");
  var taskReminderOverlay = document.getElementById("taskReminderOverlay");
  var taskReminderCurrentStatus = document.getElementById("taskReminderCurrentStatus");
  var taskReminderEvery30Btn = document.getElementById("taskReminderEvery30Btn");
  var taskReminderEvery60Btn = document.getElementById("taskReminderEvery60Btn");
  var taskReminderTimeToggleBtn = document.getElementById("taskReminderTimeToggleBtn");
  var taskReminderTimeRow = document.getElementById("taskReminderTimeRow");
  var taskReminderTimeInput = document.getElementById("taskReminderTimeInput");
  var taskReminderDateInput = document.getElementById("taskReminderDateInput");
  var taskReminderTimeConfirmBtn = document.getElementById("taskReminderTimeConfirmBtn");
  var taskReminderOffBtn = document.getElementById("taskReminderOffBtn");
  var taskReminderCancelBtn = document.getElementById("taskReminderCancelBtn");
  var convertToNoteBtn = document.getElementById("convertToNoteBtn");
  var taskWorkPlanBtn = document.getElementById("taskWorkPlanBtn");
  var taskToPlanBtn = document.getElementById("taskToPlanBtn");
  var convertToTaskBtn = document.getElementById("convertToTaskBtn");
  var transferToLogBtn = document.getElementById("transferToLogBtn");
  var removeFromLogBtn = document.getElementById("removeFromLogBtn");
  var moveTaskCancelBtn = document.getElementById("moveTaskCancelBtn");
  var pendingMoveTaskId = null;
  var longPressTimer = null;
  var lastScrolledSheetId = null;
  var moveTaskMode = "move";

  function moveOrCopyTask(taskId, targetSheetId, mode) {
    var sourceSheet = activeSheet();
    var idx = sourceSheet.tasks.findIndex(function (x) { return x.id === taskId; });
    if (idx === -1) return;
    var task = sourceSheet.tasks[idx];
    var targetSheet = allSheets().find(function (s) { return s.id === targetSheetId; });
    if (!targetSheet) return;

    if (mode === "copy") {
      targetSheet.tasks.push({
        id: uid(),
        text: task.text,
        status: task.status,
        urgent: task.urgent,
        date: task.date,
        createdAt: Date.now()
      });
    } else {
      sourceSheet.tasks.splice(idx, 1);
      // a work-plan activity's task moved elsewhere is just a task there
      if (task.planItemId) {
        workPlanTaskRemoved(sourceSheet, task);
        task = Object.assign({}, task, { id: uid() });
        delete task.planItemId;
      }
      targetSheet.tasks.push(task);
    }
    saveData();
    render();
  }

  function renderMoveTaskProjects() {
    moveTaskProjects.innerHTML = "";
    var others = allSheets().filter(function (s) { return s.id !== data.activeSheetId; });
    if (!others.length) {
      var empty = document.createElement("div");
      empty.className = "move-task-empty";
      empty.textContent = tr("noOtherProjects");
      moveTaskProjects.appendChild(empty);
      return;
    }
    others.forEach(function (s) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = s.name;
      btn.addEventListener("click", function () {
        moveOrCopyTask(pendingMoveTaskId, s.id, moveTaskMode);
        closeMoveTask();
      });
      moveTaskProjects.appendChild(btn);
    });
  }

  function openMoveTaskModal(taskId) {
    pendingMoveTaskId = taskId;
    moveTaskMode = "move";
    var task = activeSheet().tasks.find(function (t) { return t.id === taskId; });
    convertToNoteBtn.hidden = !task || task.type === "note";
    convertToTaskBtn.hidden = !task || task.type !== "note";
    taskWorkPlanBtn.hidden = !task || !task.planItemId;
    taskToPlanBtn.hidden = !task || !!task.planItemId || task.type === "note" ||
      activeSheet().id === HEAD_OFFICE_SHEET_ID || !!task.headOfficeVirtual;
    var logEligible = task && task.type === "task" && task.status === 2;
    transferToLogBtn.hidden = !logEligible || !!task.logEntry;
    removeFromLogBtn.hidden = !logEligible || !task.logEntry;
    taskChatQuoteBtn.hidden = !activeSheet().shared;
    taskCalendarReminderBtn.hidden = !calPlugin;
    var menuCalIcon = taskCalendarReminderBtn.querySelector(".cal-live-icon");
    if (task) migrateCalendarReminderToLink(task);
    var myLink = task ? getMyCalendarLink(activeSheet(), task) : null;
    var menuLink = calPlugin && isCalendarLinkShown(myLink);
    if (menuLink) menuCalIcon.dataset.at = myLink.eventAt;
    else delete menuCalIcon.dataset.at;
    removeFromCalendarBtn.hidden = !menuLink;
    updateLiveCalendarIcons();
    moveTaskOverlay.hidden = false;
  }
  function closeMoveTask() {
    moveTaskOverlay.hidden = true;
    moveTaskProjectsOverlay.hidden = true;
    taskReminderOverlay.hidden = true;
    pendingMoveTaskId = null;
  }
  function openMoveTaskProjectsModal(mode) {
    moveTaskMode = mode;
    moveTaskOverlay.hidden = true;
    moveTaskProjectsTitle.textContent = tr("moveTaskProjectsTitle");
    renderMoveTaskProjects();
    moveTaskProjectsOverlay.hidden = false;
  }
  moveModeMoveBtn.addEventListener("click", function () { openMoveTaskProjectsModal("move"); });
  moveModeCopyBtn.addEventListener("click", function () { openMoveTaskProjectsModal("copy"); });
  shareTaskBtn.addEventListener("click", function () {
    var task = activeSheet().tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    closeMoveTask();
    if (!task) return;
    var text = task.text;
    // The Android WebView this app runs in natively has no navigator.share()
    // at all (same reason file-sharing needs the Capacitor Share plugin
    // elsewhere) - without this branch the button would silently fall
    // through to a clipboard copy there instead of a real WhatsApp/etc.
    // share sheet.
    if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
        window.Capacitor.Plugins && window.Capacitor.Plugins.Share) {
      window.Capacitor.Plugins.Share.share({ title: "ITASK", text: text }).catch(function () {});
      return;
    }
    if (navigator.share) {
      navigator.share({ title: "ITASK", text: text }).catch(function () {});
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(tr("chatMsgCopiedMsg"));
      }, function () {
        alert(text);
      });
      return;
    }
    alert(text);
  });

  // Reuses the same push_subscriptions row/permission flow the general
  // "תזכורות משימות" menu setting and auto-enabled chat notifications
  // already go through - a task reminder has nowhere to deliver through
  // without an active push subscription for this device.
  function ensurePushReadyForTaskReminder() {
    if (!supabaseClient || !SUPABASE_ROW_ID || !pushSupported()) return Promise.resolve(false);
    return pushPermissionDenied().then(function (denied) {
      if (denied) return false;
      return requestPushPermissionGranted().then(function (granted) {
        if (!granted) return false;
        return ensurePushIdentity().then(function (identity) {
          return upsertPushSubscriptionRow({}, identity);
        }).then(function (result) {
          return !(result && result.error);
        });
      });
    }).catch(function () { return false; });
  }

  // A one-shot "time" alarm is finished once it has rung: the server
  // removes it then, but this device's in-memory copy only learns that on
  // its next load, so it also expires locally shortly after fireAt - the
  // alarm icon disappears and the reminder option resets on time either way.
  // In the native app it stays until the ringing is turned off ("כבה",
  // reported back by the plugin), with an hour as the outer limit in case
  // it's never touched (snoozes in between keep it alive meanwhile).
  function isTaskReminderActive(reminder) {
    if (!reminder) return false;
    if (reminder.type !== "time") return true;
    if (reminder.firedAt) return false;
    var graceMs = nativeTaskAlarmPlugin ? 60 * 60000 : 60000;
    return !reminder.fireAt || Date.parse(reminder.fireAt) + graceMs > Date.now();
  }
  // A reminder on a SHARED project's task is synced to every member, but it
  // only rings for whoever set it: it carries their phone as "by". (Older
  // shared reminders without "by" never rang anywhere and still don't.)
  function isMyTaskReminder(sheet, reminder) {
    if (!reminder) return false;
    if (!sheet || !sheet.shared) return true;
    return !!myPhoneNumber && reminder.by === myPhoneNumber;
  }
  function nextOccurrenceOfTime(hhmm) {
    var parts = hhmm.split(":");
    var d = new Date();
    d.setHours(+parts[0], +parts[1], 0, 0);
    if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1);
    return d.toISOString();
  }
  // "כבה" on a ringing native alarm turns that reminder off for good: the
  // plugin queues the ids and this removes them from the data.
  function collectNativeAlarmsTurnedOff() {
    if (!nativeTaskAlarmPlugin || dataLoadBlocked || !privateDataSettled) return;
    nativeTaskAlarmPlugin.takeTurnedOffAlarms().then(function (res) {
      var ids = (res && res.ids) || [];
      if (!ids.length) return;
      var changed = false;
      allSheets().forEach(function (sheet) {
        (sheet.tasks || []).forEach(function (t) {
          var calLink = getMyCalendarLink(sheet, t);
          if (calLink && !calLink.firedAt && ids.indexOf(sheet.id + ":" + t.id + ":cal") !== -1) {
            calLink.firedAt = new Date().toISOString();
            changed = true;
          }
          if (t.reminder && ids.indexOf(sheet.id + ":" + t.id) !== -1) {
            delete t.reminder;
            changed = true;
          }
        });
      });
      if (changed) { saveData(); render(); }
    }).catch(function () {});
  }
  // A task's link to a phone-calendar event lives apart from its regular
  // reminder: task.calendarLink {eventId, eventAt, fireAt, firedAt, by?}
  // rings 15 minutes before the event and shows the calendar icon, while
  // task.reminder (every 30/60 minutes, "בחר שעה") shows the alarm clock.
  // Turning the reminder off leaves the link; "הסרה מלוח השנה" (or
  // deleting the event) removes the link. The link and its icon stay for
  // good otherwise, past events included (and on done tasks too).
  function isCalendarLinkShown(link) {
    return !!link && !!link.eventAt;
  }
  // On a SHARED project's task every member has their own link (their own
  // phone's event), in task.calendarLinks[phone]; a member who removed an
  // event they were invited to keeps a {removed: true} marker there so it
  // isn't added back. Private projects use the single task.calendarLink.
  // (A shared task's older single calendarLink {by} still counts for "by".)
  function getMyCalendarLink(sheet, t) {
    if (sheet && sheet.shared) {
      var mine = t.calendarLinks && myPhoneNumber ? t.calendarLinks[myPhoneNumber] : null;
      if (mine) return mine.removed ? null : mine;
      return t.calendarLink && isMyTaskReminder(sheet, t.calendarLink) ? t.calendarLink : null;
    }
    return t.calendarLink || null;
  }
  // Taking my link off a task: an event I was invited to leaves a
  // "removed" marker (so the invite doesn't add it back); for an event I
  // shared with others, the invite goes too, which takes it off their
  // phones as well.
  function removeMyCalendarLink(sheet, t, link) {
    var inv = t.calendarInvite;
    if (inv && inv.by === myPhoneNumber) delete t.calendarInvite;
    if (link && link.fromInvite) setMyCalendarLink(sheet, t, { removed: true, eventAt: link.eventAt });
    else setMyCalendarLink(sheet, t, null);
  }
  // My shared event moved: everyone I invited follows.
  function calMoveMyInvite(t, startMs, endAt) {
    var inv = t.calendarInvite;
    if (!inv || inv.by !== myPhoneNumber) return;
    inv.eventAt = new Date(startMs).toISOString();
    if (endAt) inv.endAt = endAt;
    inv.title = t.text;
  }
  function setMyCalendarLink(sheet, t, link) {
    if (sheet && sheet.shared) {
      if (t.calendarLink && isMyTaskReminder(sheet, t.calendarLink)) delete t.calendarLink;
      if (!myPhoneNumber) return;
      var links = Object.assign({}, t.calendarLinks);
      if (link) links[myPhoneNumber] = link; else delete links[myPhoneNumber];
      if (Object.keys(links).length) t.calendarLinks = links; else delete t.calendarLinks;
      return;
    }
    if (link) t.calendarLink = link; else delete t.calendarLink;
  }
  function isCalendarLinkAlarmDue(link) {
    if (!isCalendarLinkShown(link) || link.firedAt || !link.fireAt) return false;
    var graceMs = nativeTaskAlarmPlugin ? 60 * 60000 : 60000;
    return Date.parse(link.fireAt) + graceMs > Date.now();
  }
  // reminders set through the calendar before the split become links
  function migrateCalendarReminderToLink(t) {
    var r = t.reminder;
    if (!r || r.calendarEventId == null) return false;
    t.calendarLink = {
      eventId: r.calendarEventId,
      eventAt: r.eventAt || r.fireAt,
      fireAt: r.fireAt,
      firedAt: r.firedAt || null
    };
    if (r.by) t.calendarLink.by = r.by;
    delete t.reminder;
    return true;
  }
  function pruneFinishedTaskReminders() {
    collectNativeAlarmsTurnedOff();
    if (isEditingActively()) return;
    var changed = false;
    allSheets().forEach(function (sheet) {
      (sheet.tasks || []).forEach(function (t) {
        if (migrateCalendarReminderToLink(t)) changed = true;
        if (!t.reminder || t.reminder.type !== "time") return;
        if (!isTaskReminderActive(t.reminder)) {
          delete t.reminder;
          changed = true;
        } else if (!t.reminder.fireAt) {
          // set before fireAt existed - pin it to its next occurrence
          t.reminder.fireAt = nextOccurrenceOfTime(t.reminder.time);
          changed = true;
        }
      });
    });
    if (changed) { saveData(); render(); }
  }
  setInterval(pruneFinishedTaskReminders, 30000);

  // In the native app, per-task reminders ring as a real alarm clock: the
  // ItaskAlarm plugin (android-app/native-src) schedules them with Android's
  // AlarmManager and shows an insistent notification that keeps ringing
  // until "כבה"/"נודניק" is pressed - something a pushed FCM notification
  // can never do. This hands it the full current set on every render (it
  // replaces whatever was scheduled before), and flags each reminder
  // nativeAlarm so send-reminders stops also pushing it to native devices.
  // Private projects, plus the reminders this user set on shared projects'
  // tasks (isMyTaskReminder) - send-reminders itself only sees private ones.
  var nativeTaskAlarmPlugin = (
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.ItaskAlarm
  ) || null;
  var lastNativeTaskAlarmsJson = null;
  function syncNativeTaskAlarms() {
    if (!nativeTaskAlarmPlugin || dataLoadBlocked || !privateDataSettled) return;
    var alarms = [];
    var flagged = false;
    allSheets().forEach(function (sheet) {
      if (sheet.ended) return;
      (sheet.tasks || []).forEach(function (t) {
        if (migrateCalendarReminderToLink(t)) flagged = true;
        var link = getMyCalendarLink(sheet, t);
        if (t.status !== 2 && isCalendarLinkAlarmDue(link)) {
          alarms.push({ id: sheet.id + ":" + t.id + ":cal", title: sheet.name, body: t.text, at: Date.parse(link.fireAt) });
        }
        var r = t.reminder;
        if (t.status === 2 || !isTaskReminderActive(r) || !isMyTaskReminder(sheet, r)) return;
        var entry = { id: sheet.id + ":" + t.id, title: sheet.name, body: t.text };
        if (r.type === "time" && r.fireAt) {
          entry.at = Date.parse(r.fireAt);
        } else if (r.type === "interval") {
          if (!r.startedAt) { r.startedAt = new Date().toISOString(); flagged = true; }
          entry.at = Date.parse(r.startedAt) + r.minutes * 60000;
          entry.repeatMinutes = r.minutes;
        } else {
          return;
        }
        if (!r.nativeAlarm) { r.nativeAlarm = true; flagged = true; }
        alarms.push(entry);
      });
    });
    if (flagged) saveData();
    alarms = alarms.concat(workPlanNativeAlarms(), morningAlarms());
    var json = JSON.stringify(alarms);
    if (json === lastNativeTaskAlarmsJson) return;
    lastNativeTaskAlarmsJson = json;
    nativeTaskAlarmPlugin.setAlarms({ alarms: alarms }).catch(function () { lastNativeTaskAlarmsJson = null; });
  }
  // Every open task (not done, not a note) of every live project, oldest
  // first - what the native home-screen widget shows.
  function openTasksByProject() {
    return allSheets().filter(function (sheet) {
      return !sheet.ended && sheet.id !== HEAD_OFFICE_SHEET_ID;
    }).map(function (sheet) {
      var tasks = (sheet.tasks || []).filter(function (t) {
        return t.type !== "note" && t.status !== 2 && !t.headOfficeVirtual && (t.text || "").trim();
      }).sort(function (a, b) {
        if (a.date !== b.date) return a.date < b.date ? -1 : 1;
        return (a.createdAt || 0) - (b.createdAt || 0);
      });
      return { sheet: sheet, tasks: tasks };
    });
  }

  // Native app: text shared into ITASK from another app (a WhatsApp
  // message...) arrives as view "share" with its text - see
  // openShareTaskModal. Tapping the home-screen widget starts the app with
  // "task|sheetId|date|taskId" (just the project when tapping its tab):
  // picked up at startup (takeLaunchView) or, when the app was already
  // running, through the "launchView" event, and opened like a tapped
  // notification. ("focus", from app versions before 15, just opens the app.)
  function openLaunchView(view, text) {
    if (view === "share") { openShareTaskModal(text); return; }
    if (view === "workplan") { openWorkPlan(); return; }
    // ("assistant..." - the widget and notifications of app versions 23-24)
    if (view === "morning" || (view && view.indexOf("assistant") === 0)) { openMorningReport(); return; }
    if (!view || view.indexOf("task|") !== 0) return;
    var parts = view.split("|");
    closeMoveTask();
    viewingArchive = false;
    state.showingCompleted = false;
    navigateToTaskLink(parts[1] || null, parts[2] || null, parts[3] || null, false);
    render();
  }
  var launchViewChecked = false;
  function checkLaunchView() {
    if (launchViewChecked || !nativeTaskAlarmPlugin) return;
    launchViewChecked = true;
    nativeTaskAlarmPlugin.takeLaunchView().then(function (res) {
      if (res) openLaunchView(res.view, res.text);
    }).catch(function () {});
    nativeTaskAlarmPlugin.addListener("launchView", function (e) {
      if (e) openLaunchView(e.view, e.text);
      nativeTaskAlarmPlugin.takeLaunchView().catch(function () {});
    });
  }

  // Hands the home-screen widget the open-tasks list (it can't read
  // Supabase itself), whenever it changes.
  var lastNativeWidgetJson = null;
  function syncNativeWidget() {
    if (!nativeTaskAlarmPlugin || dataLoadBlocked || !privateDataSettled) return;
    checkLaunchView();
    startFloatingTask();
    var projects = openTasksByProject().map(function (group) {
      return {
        id: group.sheet.id,
        name: group.sheet.name,
        shared: !!group.sheet.shared,
        tasks: group.tasks.map(function (t) {
          return { id: t.id, date: t.date, text: t.text, status: t.status || 0 };
        })
      };
    });
    // the morning-report widget's line (as of today - it shows its plain
    // title on a later day, until the app opens again)
    var morning = { morningDate: todayISO(), morningLine: morningSummaryText(todayISO()) || tr("morningNothingToday") };
    var json = JSON.stringify([projects, morning]);
    if (json === lastNativeWidgetJson) return;
    lastNativeWidgetJson = json;
    nativeTaskAlarmPlugin.setWidgetData(Object.assign({
      projects: projects,
      title: tr("focusViewTitle"),
      emptyText: tr("focusViewEmpty")
    }, morning)).catch(function () { lastNativeWidgetJson = null; });
  }


  // ---------------------------------------------------------------------
  // The floating task (app version 25+, ItaskFloatReceiver): an open task
  // of the next project shows over the screen for 8 seconds - every quarter
  // hour from 06:00 to 18:00, every half hour the rest of the day. It runs on its own once the phone lets ITASK
  // "display over other apps" - asked for once, when the app first opens
  // with it; the switch (and that permission, if still missing) is in the
  // menu. Its tasks are the home-screen widget's list (syncNativeWidget).
  // ---------------------------------------------------------------------
  var FLOAT_ASKED_KEY = "itask-float-asked";
  var floatSupported = false;
  var floatMenuSection = document.getElementById("floatMenuSection");
  var floatToggle = document.getElementById("floatToggle");
  var floatAllowBtn = document.getElementById("floatAllowBtn");

  function refreshFloatStatus(askIfMissing) {
    if (!floatSupported) return;
    nativeTaskAlarmPlugin.floatStatus().then(function (st) {
      floatMenuSection.hidden = false;
      floatToggle.checked = !!st.on;
      floatAllowBtn.hidden = !st.on || !!st.canDraw;
      if (!askIfMissing || !st.on || st.canDraw) return;
      var asked = false;
      try { asked = !!localStorage.getItem(FLOAT_ASKED_KEY); localStorage.setItem(FLOAT_ASKED_KEY, "1"); } catch (e) {}
      if (!asked) askConfirm(tr("floatAsk"), openFloatSettings);
    }).catch(function () {});
  }
  function openFloatSettings() {
    nativeTaskAlarmPlugin.openFloatSettings().catch(function () {});
  }
  // once the app is up (from syncNativeWidget, after the data has loaded)
  var floatStarted = false;
  function startFloatingTask() {
    if (floatStarted || !nativeTaskAlarmPlugin || !nativeTaskAlarmPlugin.features) return;
    floatStarted = true;
    nativeTaskAlarmPlugin.features().then(function (f) {
      floatSupported = !!(f && f.floatingTask);
      refreshFloatStatus(true);
    }).catch(function () {});
  }
  floatToggle.addEventListener("change", function () {
    if (!floatSupported) return;
    nativeTaskAlarmPlugin.setFloatOn({ on: floatToggle.checked }).then(function () {
      refreshFloatStatus(false);
    }).catch(function () {});
  });
  floatAllowBtn.addEventListener("click", openFloatSettings);
  // back from the phone's settings
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) refreshFloatStatus(false);
  });
  // ---------------------------------------------------------------------
  // לוח שנה: month / week / day / list views over the phone's own
  // calendars, read and written through the native ItaskCalendar plugin
  // (android-app/native-src) - so it shows and edits the same events as the
  // phone's calendar app, Google Calendar, and Outlook (when the Outlook
  // app's "Sync calendars" is on). Opened from the icon next to the date.
  // ---------------------------------------------------------------------
  var calPlugin = (
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.ItaskCalendar
  ) || null;
  var CAL_MODE_KEY = "itask-cal-mode";
  var CAL_HIDDEN_KEY = "itask-cal-hidden";
  var CAL_LAST_CALENDAR_KEY = "itask-cal-last-calendar";
  var CAL_HOUR_PX = 48;
  var calView = document.getElementById("calView");
  var calBody = document.getElementById("calBody");
  var calTitle = document.getElementById("calTitle");
  var calState = {
    mode: "month",
    anchor: new Date(),
    events: [],
    calendars: [],
    hidden: {},
    loadSeq: 0,
    // set while picking a task reminder's time ({sheetId, taskId, text})
    pick: null
  };
  try {
    calState.mode = localStorage.getItem(CAL_MODE_KEY) || "month";
    calState.hidden = JSON.parse(localStorage.getItem(CAL_HIDDEN_KEY) || "{}") || {};
  } catch (e) {}

  var calAppBtn = document.getElementById("calendarAppBtn");
  calAppBtn.hidden = !calPlugin;
  calAppBtn.addEventListener("click", openCalendarView);

  function calLocale() {
    return { he: "he-IL", en: "en-US", ar: "ar", ru: "ru-RU" }[currentLang] || "he-IL";
  }
  // The calendar icons (by the date, in the task menu) show today: weekday
  // in the green band and the day number, kept current across midnight.
  // An icon with data-at (a task's calendar reminder) shows that moment's
  // day instead of today.
  function updateLiveCalendarIcons() {
    document.querySelectorAll(".cal-live-icon").forEach(function (el) {
      var d = el.dataset.at ? new Date(el.dataset.at) : new Date();
      el.querySelector(".cal-live-wd").textContent = d.toLocaleDateString(calLocale(), { weekday: "short" });
      el.querySelector(".cal-live-day").textContent = d.getDate();
    });
  }
  updateLiveCalendarIcons();
  setInterval(updateLiveCalendarIcons, 60000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) updateLiveCalendarIcons(); });
  function calStartOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function calAddDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n, d.getHours(), d.getMinutes()); }
  function calSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  function calWeekStart(d) { return calAddDays(calStartOfDay(d), -calStartOfDay(d).getDay()); }
  function calYmd(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function calHm(d) { return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }
  function calParseYmd(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function calColor(n) {
    if (n === null || n === undefined) return "#35618f";
    var c = (n >>> 0) & 0xffffff;
    return "#" + c.toString(16).padStart(6, "0");
  }

  // All-day events are stored at UTC midnight (Android's rule): map them to
  // local calendar days so they land on the right date in every timezone.
  function calEventStart(ev) {
    if (!ev.allDay) return new Date(ev.begin);
    var u = new Date(ev.begin);
    return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate());
  }
  function calEventEnd(ev) {
    if (!ev.allDay) return new Date(ev.end);
    var u = new Date(ev.end);
    return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate());
  }
  function calEventsOn(day) {
    var dayStart = calStartOfDay(day), dayEnd = calAddDays(dayStart, 1);
    return calState.events.filter(function (ev) {
      var s = calEventStart(ev), e = calEventEnd(ev);
      if (e <= s) e = new Date(s.getTime() + 1);
      return s < dayEnd && e > dayStart;
    }).sort(function (a, b) {
      if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
      return a.begin - b.begin;
    });
  }

  function calRange() {
    var a = calState.anchor;
    if (calState.mode === "month") {
      var first = new Date(a.getFullYear(), a.getMonth(), 1);
      var start = calWeekStart(first);
      return { from: start, to: calAddDays(start, 42) };
    }
    if (calState.mode === "week") {
      var ws = calWeekStart(a);
      return { from: ws, to: calAddDays(ws, 7) };
    }
    if (calState.mode === "day") {
      var ds = calStartOfDay(a);
      return { from: ds, to: calAddDays(ds, 1) };
    }
    var ts = calStartOfDay(a);
    return { from: ts, to: calAddDays(ts, 60) };
  }

  // The bottom icon bar stays in view under the calendar, so the user can
  // jump straight to another screen: the calendar ends just above the bar
  // (and its divider), and tapping any of its buttons closes the calendar
  // first.
  var notebookFooterEl = document.getElementById("notebookFooter");
  function calFitAboveFooter() {
    calView.style.bottom = "";
    if (calView.hidden) return;
    var edge = notebookFooterEl.previousElementSibling || notebookFooterEl;
    var top = edge.getBoundingClientRect().top;
    if (notebookFooterEl.offsetHeight && top > window.innerHeight / 2 && top < window.innerHeight) {
      calView.style.bottom = (window.innerHeight - top) + "px";
      calView.style.paddingBottom = "0";
    }
  }
  window.addEventListener("resize", calFitAboveFooter);
  notebookFooterEl.addEventListener("click", function () {
    if (!calView.hidden) closeCalendarView();
  }, true);

  function openCalendarView() {
    if (!calPlugin) return;
    calState.anchor = new Date();
    calState.mode = "month"; // always opens on the month
    calView.hidden = false;
    calFitAboveFooter();
    calEnsurePermission(function () { calLoadCalendars().then(calLoadAndRender); });
  }
  // Task long-press -> התראה -> לוח שנה: the calendar opens on today's day
  // view; tapping a time opens the event editor with the task's text, and
  // saving puts the task in the phone's calendar AND sets the task's
  // ringing reminder (dinging, snooze...) for that same moment.
  var calPickBanner = document.getElementById("calPickBanner");
  function openCalendarForTaskReminder(sheetId, task) {
    if (!calPlugin || !task) return;
    calState.pick = { sheetId: sheetId, taskId: task.id, text: task.text };
    calState.mode = "day";
    calState.anchor = new Date();
    calView.hidden = false;
    calFitAboveFooter();
    calEnsurePermission(function () { calLoadCalendars().then(calLoadAndRender); });
  }
  document.getElementById("calPickCancelBtn").addEventListener("click", closeCalendarView);

  // The Android WebView no longer opens its own picker for the app's
  // invisible <input type="date"> overlays (tapping the date did nothing),
  // so in the native app a small month picker opens instead; picking a
  // day fills the input and fires its usual "change". Honours min/max.
  var datePickOverlay = document.getElementById("datePickOverlay");
  var datePick = { input: null, month: null };
  function openSimpleDatePicker(input) {
    datePick.input = input;
    var d = input.value ? calParseYmd(input.value) : new Date();
    datePick.month = new Date(d.getFullYear(), d.getMonth(), 1);
    renderSimpleDatePicker();
    datePickOverlay.hidden = false;
  }
  function renderSimpleDatePicker() {
    var input = datePick.input, m = datePick.month;
    var loc = calLocale();
    document.getElementById("datePickTitle").textContent =
      m.toLocaleDateString(loc, { month: "long", year: "numeric" });
    var grid = document.getElementById("datePickGrid");
    grid.innerHTML = "";
    var first = calWeekStart(m);
    for (var w = 0; w < 7; w++) {
      var h = document.createElement("span");
      h.className = "date-pick-wd";
      h.textContent = calAddDays(first, w).toLocaleDateString(loc, { weekday: "narrow" });
      grid.appendChild(h);
    }
    var today = calYmd(new Date());
    for (var i = 0; i < m.getDay(); i++) grid.appendChild(document.createElement("span"));
    var days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    for (var n = 1; n <= days; n++) {
      var ymd = calYmd(new Date(m.getFullYear(), m.getMonth(), n));
      var b = document.createElement("button");
      b.type = "button";
      b.className = "date-pick-day" + (ymd === today ? " is-today" : "") +
        (ymd === input.value ? " is-selected" : "");
      b.textContent = n;
      b.disabled = !!((input.min && ymd < input.min) || (input.max && ymd > input.max));
      b.addEventListener("click", finishSimpleDatePick.bind(null, ymd));
      grid.appendChild(b);
    }
  }
  function finishSimpleDatePick(ymd) {
    var input = datePick.input;
    datePickOverlay.hidden = true;
    datePick.input = null;
    if (!input || input.value === ymd) return;
    input.value = ymd;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }
  function shiftSimpleDatePicker(delta) {
    datePick.month = new Date(datePick.month.getFullYear(), datePick.month.getMonth() + delta, 1);
    renderSimpleDatePicker();
  }
  document.getElementById("datePickPrev").addEventListener("click", function () { shiftSimpleDatePicker(-1); });
  document.getElementById("datePickNext").addEventListener("click", function () { shiftSimpleDatePicker(1); });
  document.getElementById("datePickTodayBtn").addEventListener("click", function () {
    var t = calYmd(new Date()), input = datePick.input;
    if (input && ((input.min && t < input.min) || (input.max && t > input.max))) return;
    finishSimpleDatePick(t);
  });
  document.getElementById("datePickCancelBtn").addEventListener("click", function () {
    datePickOverlay.hidden = true;
    datePick.input = null;
  });
  datePickOverlay.addEventListener("click", function (e) {
    if (e.target === datePickOverlay) { datePickOverlay.hidden = true; datePick.input = null; }
  });
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    document.querySelectorAll(".date-click-area input[type=date]").forEach(function (input) {
      input.addEventListener("click", function (e) {
        e.preventDefault();
        openSimpleDatePicker(input);
      });
    });
  }

  // A task put in the calendar rings a quarter of an hour before its event
  // (or at the event itself when that's already less than 15 minutes away).
  var CAL_TASK_REMINDER_LEAD_MS = 15 * 60000;
  function calReminderFireMs(startMs) {
    var early = startMs - CAL_TASK_REMINDER_LEAD_MS;
    return early > Date.now() ? early : startMs;
  }
  function calApplyPickedReminder(startMs, eventId, endMs) {
    var pick = calState.pick;
    var sheet = pick && allSheets().find(function (s) { return s.id === pick.sheetId; });
    var task = sheet && (sheet.tasks || []).find(function (t) { return t.id === pick.taskId; });
    if (!task) return;
    migrateCalendarReminderToLink(task);
    var old = getMyCalendarLink(sheet, task);
    if (old && old.eventId != null && String(old.eventId) !== String(eventId)) {
      calPlugin.deleteEvent({ eventId: old.eventId }).catch(function () {});
    }
    var endAt = new Date(endMs || startMs + 3600000).toISOString();
    setMyCalendarLink(sheet, task, {
      eventId: eventId,
      eventAt: new Date(startMs).toISOString(),
      endAt: endAt,
      fireAt: new Date(calReminderFireMs(startMs)).toISOString(),
      firedAt: null
    });
    calMoveMyInvite(task, startMs, endAt);
    saveData();
    closeCalendarView();
    render();
    showToast(tr("calReminderSetMsg"));
    ensureExactAlarmPermission();
  }

  // Tapping a task's calendar icon: the calendar opens on that day and the
  // reminder's event opens in the editor (or just the day, with a note, if
  // the event was removed from the phone's calendar meanwhile).
  function openTaskCalendarEvent(link) {
    if (!calPlugin) return;
    calState.mode = "day";
    calState.anchor = new Date(link.eventAt);
    calView.hidden = false;
    calFitAboveFooter();
    calEnsurePermission(function () {
      calLoadCalendars().then(calLoadAndRender).then(function () {
        var occ = (calState.events || []).find(function (ev) {
          return String(ev.eventId) === String(link.eventId);
        });
        if (occ) { calOpenEditor(occ); return; }
        // not on its day any more: deleted, or moved in the phone's own
        // calendar app - check now, and drop or follow the link
        calVerifyLinks(true).then(function (result) {
          showToast(tr(result.removed ? "calEventGoneRemovedMsg" : "calEventMissingMsg"));
        });
      });
    });
  }
  // Editing / deleting that event in the calendar carries over to the
  // task's reminder: a new time moves it, deleting the event removes it.
  // For the member who invited others (calendarInvite.by), the change
  // carries over to everyone invited: a new time moves their copies,
  // deleting it removes them.
  function calSyncTaskRemindersForEvent(eventId, startMs, deleted, endMs) {
    var changed = false;
    allSheets().forEach(function (sheet) {
      (sheet.tasks || []).forEach(function (t) {
        if (migrateCalendarReminderToLink(t)) changed = true;
        var link = getMyCalendarLink(sheet, t);
        if (!link || link.eventId == null || String(link.eventId) !== String(eventId)) return;
        if (deleted) {
          removeMyCalendarLink(sheet, t, link);
        } else {
          var endAt = endMs ? new Date(endMs).toISOString() : link.endAt;
          if (Date.parse(link.eventAt) === startMs && link.endAt === endAt) return;
          link.eventAt = new Date(startMs).toISOString();
          link.endAt = endAt;
          link.fireAt = new Date(calReminderFireMs(startMs)).toISOString();
          link.firedAt = null;
          calMoveMyInvite(t, startMs, endAt);
        }
        changed = true;
      });
    });
    if (changed) { saveData(); render(); }
  }

  // ---- sharing a task's calendar event with project members ----
  // Long-press on a shared task's calendar icon (my own event) -> pick
  // members -> task.calendarInvite {by, title, eventAt, endAt, invitees}.
  // Each invited member's app then adds the same event to THEIR phone's
  // calendar (processCalendarInvites below) and gets the calendar icon and
  // the 15-minutes-before ring on that task too. Unticking someone, or the
  // owner removing the event, takes it off their phone again.
  var calInviteOverlay = document.getElementById("calInviteOverlay");
  var calInviteList = document.getElementById("calInviteList");
  var calInviteTarget = null;
  function openCalendarInviteModal(sheet, task) {
    var link = getMyCalendarLink(sheet, task);
    if (!sheet || !sheet.shared || !link) return;
    calInviteTarget = { sheetId: sheet.id, taskId: task.id };
    var current = (task.calendarInvite && task.calendarInvite.invitees) || [];
    calInviteList.innerHTML = "";
    var others = (sheet.members || []).filter(function (p) { return p && p !== myPhoneNumber; });
    if (!others.length) {
      var none = document.createElement("div");
      none.className = "move-task-empty";
      none.textContent = tr("calInviteNoMembers");
      calInviteList.appendChild(none);
    }
    others.forEach(function (phone) {
      var row = document.createElement("label");
      row.className = "cal-invite-row";
      var box = document.createElement("input");
      box.type = "checkbox";
      box.value = phone;
      box.checked = current.indexOf(phone) !== -1;
      var name = document.createElement("span");
      name.textContent = resolveMemberName(sheet, phone);
      row.appendChild(box);
      row.appendChild(name);
      calInviteList.appendChild(row);
    });
    document.getElementById("calInviteTaskText").textContent = task.text;
    calInviteOverlay.hidden = false;
  }
  function closeCalendarInviteModal() {
    calInviteOverlay.hidden = true;
    calInviteTarget = null;
  }
  document.getElementById("calInviteCancelBtn").addEventListener("click", closeCalendarInviteModal);
  calInviteOverlay.addEventListener("click", function (e) { if (e.target === calInviteOverlay) closeCalendarInviteModal(); });
  document.getElementById("calInviteOkBtn").addEventListener("click", function () {
    var target = calInviteTarget;
    var invitees = Array.prototype.slice.call(calInviteList.querySelectorAll("input:checked")).map(function (b) { return b.value; });
    closeCalendarInviteModal();
    var sheet = target && sharedSheets.find(function (s) { return s.id === target.sheetId; });
    var task = sheet && sheet.tasks.find(function (t) { return t.id === target.taskId; });
    var link = task && getMyCalendarLink(sheet, task);
    if (!link) return;
    var withEnd = link.endAt ? Promise.resolve(link.endAt) : calPlugin.getEvent({ eventId: link.eventId }).then(function (full) {
      var endMs = full.dtend || (full.dtstart + (full.durationMs || 3600000));
      return new Date(endMs).toISOString();
    }, function () { return new Date(Date.parse(link.eventAt) + 3600000).toISOString(); });
    var before = (task.calendarInvite && task.calendarInvite.invitees) || [];
    withEnd.then(function (endAt) {
      link.endAt = endAt;
      if (invitees.length) {
        task.calendarInvite = { by: myPhoneNumber, title: task.text, eventAt: link.eventAt, endAt: endAt, invitees: invitees };
      } else {
        delete task.calendarInvite;
      }
      saveData();
      render();
      showToast(invitees.length ? tr("calInviteSentMsg").replace("{n}", invitees.length) : tr("calInviteClearedMsg"));
      var added = invitees.filter(function (p) { return before.indexOf(p) === -1; });
      if (added.length) notifyCalendarInvitees(sheet, task, added);
    });
  });

  // A push to the newly added members only: "<name> הוסיף/ה אותך לאירוע:
  // <task> · <day date time>"; tapping it opens that task.
  function notifyCalendarInvitees(sheet, task, phones) {
    if (!supabaseClient || !supabaseClient.functions) return;
    var at = new Date(task.calendarInvite.eventAt);
    var when = at.toLocaleDateString(calLocale(), { weekday: "short", day: "numeric", month: "numeric" }) + " " + calHm(at);
    var text = tr("calInvitePushText").replace("{name}", resolveMemberName(sheet, myPhoneNumber)) + " " + task.text + " · " + when;
    try {
      supabaseClient.functions.invoke("send-chat-notification", {
        body: {
          kind: "calendarInvite", sheetId: sheet.id, senderPhone: myPhoneNumber,
          senderName: resolveMemberName(sheet, myPhoneNumber), text: text,
          recipients: phones, taskId: task.id, date: task.date
        }
      }).then(function () {}, function (err) { console.error("calendar invite push failed:", err); });
    } catch (e) {}
  }

  // Runs on every render: brings this phone's calendar in line with the
  // invites addressed to me on shared projects (add / move / take off).
  var calInviteBusy = {};
  var calInvitePermissionAsked = false;
  function calInviteCalendarId() {
    return calPlugin.checkPermissions().then(function (st) {
      if (st && st.calendar === "granted") return true;
      if (calInvitePermissionAsked) return false;
      calInvitePermissionAsked = true;
      return calPlugin.requestPermissions({ permissions: ["calendar"] }).then(function (st2) {
        return !!(st2 && st2.calendar === "granted");
      });
    }).then(function (granted) {
      if (!granted) return null;
      return calPlugin.listCalendars().then(function (res) {
        var writable = ((res && res.calendars) || []).filter(function (c) { return c.writable; });
        var last = null;
        try { last = localStorage.getItem(CAL_LAST_CALENDAR_KEY); } catch (e) {}
        var pick = writable.find(function (c) { return String(c.id) === last; }) ||
          writable.find(function (c) { return c.primary; }) || writable[0];
        return pick ? pick.id : null;
      });
    });
  }
  function processCalendarInvites() {
    if (!calPlugin || !myPhoneNumber || dataLoadBlocked) return;
    sharedSheets.forEach(function (sheet) {
      if (sheet.ended) return;
      (sheet.tasks || []).forEach(function (t) {
        var key = sheet.id + ":" + t.id;
        if (calInviteBusy[key]) return;
        var inv = t.calendarInvite;
        var mine = t.calendarLinks ? t.calendarLinks[myPhoneNumber] : null;
        var invited = inv && inv.by !== myPhoneNumber && (inv.invitees || []).indexOf(myPhoneNumber) !== -1;
        if (invited) {
          if (mine && (mine.removed || (mine.eventAt === inv.eventAt && mine.endAt === inv.endAt))) return;
          calInviteBusy[key] = true;
          calInviteCalendarId().then(function (calendarId) {
            if (calendarId == null) return;
            var start = Date.parse(inv.eventAt);
            var payload = {
              calendarId: calendarId, title: inv.title || t.text, allDay: false,
              start: start, end: Date.parse(inv.endAt) || start + 3600000,
              rrule: "", reminderMinutes: -1, location: "", description: sheet.name
            };
            if (mine && mine.eventId != null) payload.eventId = mine.eventId;
            return calPlugin.saveEvent(payload).then(function (res) {
              var live = sheet.tasks.find(function (x) { return x.id === t.id; }) || t;
              setMyCalendarLink(sheet, live, {
                eventId: (res && res.eventId != null) ? res.eventId : payload.eventId,
                eventAt: inv.eventAt, endAt: inv.endAt,
                fireAt: new Date(calReminderFireMs(start)).toISOString(), firedAt: null,
                fromInvite: true
              });
              saveData();
              render();
            });
          }).catch(function () {}).then(function () { delete calInviteBusy[key]; });
        } else if (mine && mine.fromInvite) {
          // no longer invited (unticked, or the owner removed the event)
          calInviteBusy[key] = true;
          var gone = mine.eventId != null ? calPlugin.deleteEvent({ eventId: mine.eventId }).catch(function () {}) : Promise.resolve();
          gone.then(function () {
            var live = sheet.tasks.find(function (x) { return x.id === t.id; }) || t;
            setMyCalendarLink(sheet, live, null);
            saveData();
            render();
          }).then(function () { delete calInviteBusy[key]; });
        }
      });
    });
  }

  // Events deleted (or moved) straight in the phone's calendar app never
  // tell ITASK. So, every couple of minutes while the app is in use (and
  // right away when an icon leads nowhere), each of my links is checked:
  // still on its day -> fine; found elsewhere -> the link follows it;
  // gone -> the link (calendar icon + its ring) is removed. Instances are
  // used rather than the event row itself, since a deleted event's row can
  // linger, flagged deleted, until the account syncs. Only with calendar
  // access already granted - never asks.
  var CAL_VERIFY_EVERY_MS = 2 * 60000;
  var calVerifyLastAt = 0;
  var calVerifyRunning = null;
  function calInstancesAround(ms) {
    var dayMs = 86400000;
    return calPlugin.listEvents({ from: ms - dayMs, to: ms + dayMs }).then(function (res) {
      return (res && res.events) || [];
    });
  }
  function calVerifyLinks(force) {
    if (!calPlugin) return Promise.resolve({ removed: 0 });
    if (calVerifyRunning) return calVerifyRunning;
    if (!force && Date.now() - calVerifyLastAt < CAL_VERIFY_EVERY_MS) return Promise.resolve({ removed: 0 });
    calVerifyLastAt = Date.now();
    var removed = 0, changed = false;
    calVerifyRunning = calPlugin.checkPermissions().then(function (st) {
      if (!st || st.calendar !== "granted") return;
      var checks = [];
      allSheets().forEach(function (sheet) {
        (sheet.tasks || []).forEach(function (t) {
          var link = getMyCalendarLink(sheet, t);
          if (!link || link.eventId == null || !link.eventAt) return;
          var id = String(link.eventId);
          var hasIt = function (evs) { return evs.find(function (ev) { return String(ev.eventId) === id; }); };
          checks.push(calInstancesAround(Date.parse(link.eventAt)).then(function (evs) {
            if (hasIt(evs)) return;
            return calPlugin.getEvent({ eventId: link.eventId }).then(function (full) {
              return calInstancesAround(full.dtstart).then(function (evs2) {
                var occ = hasIt(evs2);
                if (!occ) return "gone";
                // moved in the phone's calendar: follow it
                var startMs = occ.allDay ? calEventStart(occ).getTime() : occ.begin;
                link.eventAt = new Date(startMs).toISOString();
                link.endAt = new Date(occ.end).toISOString();
                link.fireAt = new Date(calReminderFireMs(startMs)).toISOString();
                link.firedAt = null;
                calMoveMyInvite(t, startMs, link.endAt);
                changed = true;
              });
            }, function () { return "gone"; }).then(function (verdict) {
              if (verdict !== "gone") return;
              var live = (sheet.tasks || []).find(function (x) { return x.id === t.id; }) || t;
              removeMyCalendarLink(sheet, live, getMyCalendarLink(sheet, live));
              removed++;
              changed = true;
            });
          }).catch(function () {}));
        });
      });
      return Promise.all(checks);
    }).catch(function () {}).then(function () {
      calVerifyRunning = null;
      if (changed) { saveData(); render(); }
      return { removed: removed };
    });
    return calVerifyRunning;
  }

  function closeCalendarView() {
    calState.pick = null;
    calView.style.bottom = "";
    calView.style.paddingBottom = "";
    calPickBanner.hidden = true;
    try { calState.mode = localStorage.getItem(CAL_MODE_KEY) || "month"; } catch (e) {}
    calView.hidden = true;
    document.getElementById("calEventOverlay").hidden = true;
    document.getElementById("calCalendarsOverlay").hidden = true;
    calCopyOverlay.hidden = true;
  }
  document.getElementById("calCloseBtn").addEventListener("click", closeCalendarView);

  function calShowMessage(text, buttonText, onButton) {
    calBody.innerHTML = "";
    var box = document.createElement("div");
    box.className = "cal-message";
    box.textContent = text;
    if (buttonText) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "modal-btn modal-btn-primary";
      btn.textContent = buttonText;
      btn.addEventListener("click", onButton);
      box.appendChild(document.createElement("br"));
      box.appendChild(btn);
    }
    calBody.appendChild(box);
  }

  function calEnsurePermission(then) {
    calPlugin.checkPermissions().then(function (st) {
      if (st && st.calendar === "granted") { then(); return; }
      calPlugin.requestPermissions({ permissions: ["calendar"] }).then(function (st2) {
        if (st2 && st2.calendar === "granted") then();
        else calShowMessage(tr("calPermissionNeeded"), tr("calGrantAccess"), function () { calEnsurePermission(then); });
      }, function () {
        calShowMessage(tr("calPermissionNeeded"), tr("calGrantAccess"), function () { calEnsurePermission(then); });
      });
    }, function () {
      calShowMessage(tr("calLoadError"));
    });
  }

  function calLoadCalendars() {
    return calPlugin.listCalendars().then(function (res) {
      calState.calendars = (res && res.calendars) || [];
    }, function () { calState.calendars = []; });
  }

  function calLoadAndRender() {
    var range = calRange();
    var seq = ++calState.loadSeq;
    calRenderTitle();
    return calPlugin.listEvents({ from: range.from.getTime(), to: range.to.getTime() }).then(function (res) {
      if (seq !== calState.loadSeq) return;
      calState.events = ((res && res.events) || []).filter(function (ev) {
        return !calState.hidden[String(ev.calendarId)];
      });
      calRender();
    }, function () {
      if (seq === calState.loadSeq) calShowMessage(tr("calLoadError"));
    });
  }

  function calRenderTitle() {
    var a = calState.anchor, loc = calLocale(), text;
    if (calState.mode === "month") {
      text = a.toLocaleDateString(loc, { month: "long", year: "numeric" });
    } else if (calState.mode === "week") {
      var ws = calWeekStart(a), we = calAddDays(ws, 6);
      text = ws.toLocaleDateString(loc, { day: "numeric", month: "short" }) + " – " +
        we.toLocaleDateString(loc, { day: "numeric", month: "short", year: "numeric" });
    } else if (calState.mode === "day") {
      text = a.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" });
    } else {
      text = tr("calModeAgenda");
    }
    calTitle.textContent = text;
    document.querySelectorAll("[data-cal-mode]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-cal-mode") === calState.mode);
    });
  }

  // Events linked to an ITASK task (a task put in the calendar, or an event
  // turned into a task) show in the app's own terracotta with a gold edge,
  // apart from the rest of the phone's events.
  var CAL_ITASK_COLOR = "#c9512c";
  var calLinkedEventIds = {};
  function calCollectLinkedEventIds() {
    var ids = {};
    allSheets().forEach(function (sheet) {
      (sheet.tasks || []).forEach(function (t) {
        var link = getMyCalendarLink(sheet, t);
        if (link && link.eventId != null) ids[String(link.eventId)] = true;
      });
    });
    calLinkedEventIds = ids;
  }
  function calIsItaskEvent(ev) { return !!calLinkedEventIds[String(ev.eventId)]; }
  function calEventColor(ev) { return calIsItaskEvent(ev) ? CAL_ITASK_COLOR : calColor(ev.color); }

  function calRender() {
    calCollectLinkedEventIds();
    calRenderTitle();
    calBody.innerHTML = "";
    if (calState.mode === "month") calRenderMonth();
    else if (calState.mode === "agenda") calRenderAgenda();
    else calRenderDays(calState.mode === "week" ? 7 : 1);
    var fab = document.createElement("button");
    fab.type = "button";
    fab.className = "cal-fab";
    fab.textContent = "+";
    fab.addEventListener("click", function () {
      var start = calSameDay(calState.anchor, new Date()) ? new Date() : calStartOfDay(calState.anchor);
      if (calSameDay(start, new Date())) start.setMinutes(0, 0, 0), start.setHours(start.getHours() + 1);
      else start.setHours(9);
      calOpenEditor(null, start);
    });
    calBody.appendChild(fab);
  }

  function calWeekdayHeaders(container, start, count) {
    for (var i = 0; i < count; i++) {
      var d = document.createElement("div");
      d.textContent = calAddDays(start, i).toLocaleDateString(calLocale(), { weekday: "short" });
      container.appendChild(d);
    }
  }

  // Month cells and all-day lanes: the title alone, like the phone's
  // calendar - a timed event gets a coloured dot, an all-day one a bar.
  function calChip(ev) {
    var chip = document.createElement("span");
    var color = calEventColor(ev);
    chip.className = "cal-chip" + (ev.allDay ? "" : " timed") + (calIsItaskEvent(ev) ? " cal-itask" : "");
    if (ev.allDay) chip.style.background = color;
    else chip.style.setProperty("--chip-color", color);
    chip.textContent = ev.title || tr("calNoTitle");
    calBindEvent(chip, ev);
    return chip;
  }

  // Tap an event to edit it; press and hold to copy it into a project as a
  // task or a מזכרת (calOpenCopy).
  function calBindEvent(el, ev) {
    var timer = null, fired = false, sx = 0, sy = 0;
    function start(e) {
      var p = e.touches ? e.touches[0] : e;
      sx = p.clientX; sy = p.clientY;
      fired = false;
      clearTimeout(timer);
      timer = setTimeout(function () { fired = true; calOpenCopy(ev); }, 600);
    }
    function cancel() { clearTimeout(timer); }
    function move(e) {
      var p = e.touches ? e.touches[0] : e;
      if (Math.abs(p.clientX - sx) > 10 || Math.abs(p.clientY - sy) > 10) cancel();
    }
    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchmove", move, { passive: true });
    el.addEventListener("mousedown", start);
    el.addEventListener("mouseup", cancel);
    el.addEventListener("mouseleave", cancel);
    el.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    el.style.webkitTouchCallout = "none";
    el.style.userSelect = "none";
    el.addEventListener("click", function (e) {
      e.stopPropagation();
      if (fired) { fired = false; return; }
      calOpenEditor(ev);
    });
  }

  // ---- copy an event into a project (task / מזכרת) ----
  var calCopyOverlay = document.getElementById("calCopyOverlay");
  var calCopyProjects = document.getElementById("calCopyProjects");
  var calCopyTypeRow = document.getElementById("calCopyTypeRow");
  var calCopyMessage = document.getElementById("calCopyMessage");
  var calCopyEvent = null, calCopyType = "task";
  function calOpenCopy(ev) {
    calCopyEvent = ev;
    calCopyMessage.textContent = ev.title || tr("calNoTitle");
    calCopyTypeRow.hidden = false;
    calCopyProjects.hidden = true;
    calCopyOverlay.hidden = false;
  }
  function calCloseCopy() {
    calCopyOverlay.hidden = true;
    calCopyEvent = null;
  }
  function calCopyChooseType(type) {
    calCopyType = type;
    calCopyTypeRow.hidden = true;
    calCopyMessage.textContent = tr("calCopyPickProject");
    calCopyProjects.innerHTML = "";
    allSheets().filter(function (s) {
      return !s.ended && s.id !== HEAD_OFFICE_SHEET_ID;
    }).forEach(function (sheet) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = (sheet.shared ? "👥 " : "") + sheet.name;
      b.addEventListener("click", function () { calCopyInto(sheet); });
      calCopyProjects.appendChild(b);
    });
    calCopyProjects.hidden = false;
  }
  // Same shape as a row added by hand (addPendingTask), dated today - the
  // day it was copied, so it shows up right away in the project's list -
  // with the event's own date (and start time, if it has one) kept in the
  // text, e.g. "פגישה עם הקבלן (18/10 09:00)".
  function calCopyInto(sheet) {
    var ev = calCopyEvent;
    if (!ev) return;
    var start = calEventStart(ev);
    var title = (ev.title || tr("calNoTitle")).trim();
    var when = isoToDisplay(calYmd(start)) + (ev.allDay ? "" : " " + calHm(start));
    var newTask = {
      id: uid(),
      text: title + " (" + when + ")",
      status: 0,
      urgent: false,
      type: calCopyType,
      date: todayISO(),
      createdAt: Date.now()
    };
    if (calCopyType === "note") newTask.time = currentTimeHHMM();
    if (isHeadOfficeMode) newTask.isHeadOffice = true;
    // a task made from a timed, upcoming event is linked to it: calendar
    // icon by the task, and a ringing reminder 15 minutes before
    var linkReminder = calCopyType === "task" && !ev.allDay && start.getTime() > Date.now() && ev.eventId != null;
    if (linkReminder) {
      setMyCalendarLink(sheet, newTask, {
        eventId: ev.eventId, eventAt: start.toISOString(), endAt: new Date(calEventEnd(ev)).toISOString(),
        fireAt: new Date(calReminderFireMs(start.getTime())).toISOString(), firedAt: null
      });
    }
    sheet.tasks.push(newTask);
    saveData();
    if (sheet.shared && calCopyType === "task") {
      sendChatSystemMessage(sheet.id, "added", newTask.text, myPhoneNumber);
    }
    calCloseCopy();
    showToast(tr(calCopyType === "task" ? "calCopiedTaskMsg" : "calCopiedNoteMsg") + " " + sheet.name);
    render();
    if (linkReminder) ensureExactAlarmPermission();
  }
  document.getElementById("calCopyTaskBtn").addEventListener("click", function () { calCopyChooseType("task"); });
  document.getElementById("calCopyNoteBtn").addEventListener("click", function () { calCopyChooseType("note"); });
  document.getElementById("calCopyCancelBtn").addEventListener("click", calCloseCopy);
  calCopyOverlay.addEventListener("click", function (e) { if (e.target === calCopyOverlay) calCloseCopy(); });

  function calRenderMonth() {
    var a = calState.anchor;
    var gridStart = calWeekStart(new Date(a.getFullYear(), a.getMonth(), 1));
    var head = document.createElement("div");
    head.className = "cal-weekdays";
    calWeekdayHeaders(head, gridStart, 7);
    calBody.appendChild(head);
    var grid = document.createElement("div");
    grid.className = "cal-month-grid";
    var today = new Date();
    for (var i = 0; i < 42; i++) {
      (function (day) {
        var cell = document.createElement("div");
        cell.className = "cal-day-cell" + (day.getMonth() !== a.getMonth() ? " other-month" : "") +
          (calSameDay(day, today) ? " today" : "");
        var num = document.createElement("span");
        num.className = "cal-day-num";
        num.textContent = day.getDate();
        cell.appendChild(num);
        var evs = calEventsOn(day);
        evs.slice(0, 3).forEach(function (ev) { cell.appendChild(calChip(ev)); });
        if (evs.length > 3) {
          var more = document.createElement("div");
          more.className = "cal-more";
          more.textContent = "+" + (evs.length - 3);
          more.dir = "ltr";
          cell.appendChild(more);
        }
        cell.addEventListener("click", function () {
          calState.anchor = day;
          calSetMode("day");
        });
        grid.appendChild(cell);
      })(calAddDays(gridStart, i));
    }
    calBody.appendChild(grid);
  }

  function calRenderDays(count) {
    var start = count === 7 ? calWeekStart(calState.anchor) : calStartOfDay(calState.anchor);
    var today = new Date();
    var head = document.createElement("div");
    head.className = "cal-cols-head";
    var g = document.createElement("div");
    g.className = "cal-gutter";
    head.appendChild(g);
    var allDayRow = document.createElement("div");
    allDayRow.className = "cal-allday-row";
    var g2 = document.createElement("div");
    g2.className = "cal-gutter";
    allDayRow.appendChild(g2);
    var days = [];
    for (var i = 0; i < count; i++) days.push(calAddDays(start, i));
    days.forEach(function (day) {
      var ch = document.createElement("div");
      ch.className = "cal-col-head" + (calSameDay(day, today) ? " today" : "");
      var nm = document.createElement("div");
      nm.className = "cal-col-name";
      nm.textContent = day.toLocaleDateString(calLocale(), { weekday: "short" });
      var nu = document.createElement("span");
      nu.className = "cal-col-num";
      nu.textContent = day.getDate();
      ch.appendChild(nm);
      ch.appendChild(nu);
      if (count === 7) ch.addEventListener("click", function () { calState.anchor = day; calSetMode("day"); });
      head.appendChild(ch);
      var ad = document.createElement("div");
      ad.className = "cal-allday-cell";
      calEventsOn(day).filter(function (ev) { return ev.allDay; }).forEach(function (ev) { ad.appendChild(calChip(ev)); });
      allDayRow.appendChild(ad);
    });
    calBody.appendChild(head);
    calBody.appendChild(allDayRow);

    var scroll = document.createElement("div");
    scroll.className = "cal-time-scroll";
    var grid = document.createElement("div");
    grid.className = "cal-time-grid";
    grid.style.height = (24 * CAL_HOUR_PX) + "px";
    var hours = document.createElement("div");
    hours.className = "cal-hours";
    for (var h = 0; h < 24; h++) {
      var hl = document.createElement("div");
      hl.className = "cal-hour-label";
      hl.textContent = h === 0 ? "" : String(h).padStart(2, "0") + ":00";
      hours.appendChild(hl);
    }
    grid.appendChild(hours);
    days.forEach(function (day) {
      var col = document.createElement("div");
      col.className = "cal-col";
      col.addEventListener("click", function (e) {
        if (e.target !== col) return;
        var rect = col.getBoundingClientRect();
        var minutes = Math.floor(((e.clientY - rect.top) / CAL_HOUR_PX) * 2) * 30;
        var s = calStartOfDay(day);
        s.setMinutes(minutes);
        calOpenEditor(null, s);
      });
      calLayoutTimed(calEventsOn(day).filter(function (ev) { return !ev.allDay; }), day).forEach(function (item) {
        var block = document.createElement("div");
        block.className = "cal-event-block" + (calIsItaskEvent(item.ev) ? " cal-itask" : "");
        block.style.background = calEventColor(item.ev);
        block.style.top = item.top + "px";
        block.style.height = Math.max(item.height, 18) + "px";
        block.style.insetInlineStart = (item.lane / item.lanes * 100) + "%";
        block.style.width = "calc(" + (100 / item.lanes) + "% - 2px)";
        block.textContent = (item.ev.title || tr("calNoTitle")) + " " + calHm(calEventStart(item.ev));
        calBindEvent(block, item.ev);
        col.appendChild(block);
      });
      if (calSameDay(day, today)) {
        var now = document.createElement("div");
        now.className = "cal-now-line";
        now.style.top = ((today.getHours() * 60 + today.getMinutes()) / 60 * CAL_HOUR_PX) + "px";
        col.appendChild(now);
      }
      grid.appendChild(col);
    });
    scroll.appendChild(grid);
    calBody.appendChild(scroll);
    var focusHour = days.some(function (d) { return calSameDay(d, today); }) ? Math.max(today.getHours() - 1, 0) : 7;
    scroll.scrollTop = focusHour * CAL_HOUR_PX;
  }

  // Side-by-side lanes for overlapping timed events within one day.
  function calLayoutTimed(evs, day) {
    var dayStart = calStartOfDay(day).getTime(), dayEnd = calAddDays(calStartOfDay(day), 1).getTime();
    var items = evs.map(function (ev) {
      var s = Math.max(ev.begin, dayStart), e = Math.min(Math.max(ev.end, ev.begin + 15 * 60000), dayEnd);
      return { ev: ev, s: s, e: e, top: (s - dayStart) / 3600000 * CAL_HOUR_PX, height: (e - s) / 3600000 * CAL_HOUR_PX };
    }).sort(function (a, b) { return a.s - b.s; });
    var cluster = [], clusterEnd = 0;
    function flush() {
      var lanesEnd = [];
      cluster.forEach(function (it) {
        var lane = lanesEnd.findIndex(function (end) { return end <= it.s; });
        if (lane === -1) { lane = lanesEnd.length; lanesEnd.push(it.e); } else lanesEnd[lane] = it.e;
        it.lane = lane;
      });
      cluster.forEach(function (it) { it.lanes = lanesEnd.length; });
      cluster = [];
    }
    items.forEach(function (it) {
      if (cluster.length && it.s >= clusterEnd) flush();
      cluster.push(it);
      clusterEnd = cluster.length === 1 ? it.e : Math.max(clusterEnd, it.e);
    });
    flush();
    return items;
  }

  function calRenderAgenda() {
    var list = document.createElement("div");
    list.className = "cal-agenda";
    var start = calStartOfDay(calState.anchor), today = new Date(), any = false;
    for (var i = 0; i < 60; i++) {
      var day = calAddDays(start, i);
      var evs = calEventsOn(day);
      if (!evs.length) continue;
      any = true;
      var h = document.createElement("div");
      h.className = "cal-agenda-day" + (calSameDay(day, today) ? " today" : "");
      h.textContent = day.toLocaleDateString(calLocale(), { weekday: "long", day: "numeric", month: "long" });
      list.appendChild(h);
      evs.forEach(function (ev) {
        var row = document.createElement("div");
        row.className = "cal-agenda-item";
        var dot = document.createElement("span");
        dot.className = "cal-agenda-dot";
        dot.style.background = calEventColor(ev);
        if (calIsItaskEvent(ev)) row.classList.add("cal-itask");
        var time = document.createElement("span");
        time.className = "cal-agenda-time";
        time.dir = "ltr";
        time.textContent = ev.allDay ? tr("calEvAllDay") : calHm(calEventStart(ev)) + "–" + calHm(calEventEnd(ev));
        var text = document.createElement("div");
        text.className = "cal-agenda-text";
        text.textContent = ev.title || tr("calNoTitle");
        if (ev.location) {
          var loc = document.createElement("div");
          loc.className = "cal-agenda-loc";
          loc.textContent = ev.location;
          text.appendChild(loc);
        }
        row.appendChild(dot);
        row.appendChild(time);
        row.appendChild(text);
        calBindEvent(row, ev);
        list.appendChild(row);
      });
    }
    if (!any) {
      var none = document.createElement("div");
      none.className = "cal-message";
      none.textContent = tr("calNoEvents");
      list.appendChild(none);
    }
    calBody.appendChild(list);
  }

  function calSetMode(mode) {
    calState.mode = mode;
    try { localStorage.setItem(CAL_MODE_KEY, mode); } catch (e) {}
    calLoadAndRender();
  }
  document.querySelectorAll("[data-cal-mode]").forEach(function (b) {
    b.addEventListener("click", function () { calSetMode(b.getAttribute("data-cal-mode")); });
  });
  function calShift(dir) {
    var a = calState.anchor;
    if (calState.mode === "month") calState.anchor = new Date(a.getFullYear(), a.getMonth() + dir, 1);
    else if (calState.mode === "week") calState.anchor = calAddDays(a, 7 * dir);
    else if (calState.mode === "day") calState.anchor = calAddDays(a, dir);
    else calState.anchor = calAddDays(a, 30 * dir);
    calLoadAndRender();
  }
  // RTL: the right-hand "›" goes back, the left-hand "‹" goes forward
  document.getElementById("calPrevBtn").addEventListener("click", function () { calShift(-1); });
  document.getElementById("calNextBtn").addEventListener("click", function () { calShift(1); });
  document.getElementById("calTodayBtn").addEventListener("click", function () {
    calState.anchor = new Date();
    calLoadAndRender();
  });
  // Swipe sideways to move between months/weeks/days, like the phone's calendar.
  (function () {
    var sx = 0, sy = 0;
    calBody.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    calBody.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        var rtl = document.documentElement.dir === "rtl";
        calShift((dx > 0) === rtl ? 1 : -1);
      }
    }, { passive: true });
  })();

  // ---- event editor ----
  var calEditing = null;
  var calEvOverlay = document.getElementById("calEventOverlay");
  var calEvTitle = document.getElementById("calEvTitle");
  var calEvAllDay = document.getElementById("calEvAllDay");
  var calEvStartDate = document.getElementById("calEvStartDate");
  var calEvStartTime = document.getElementById("calEvStartTime");
  var calEvEndDate = document.getElementById("calEvEndDate");
  var calEvEndTime = document.getElementById("calEvEndTime");
  var calEvRepeat = document.getElementById("calEvRepeat");
  var calEvReminder = document.getElementById("calEvReminder");
  var calEvCalendar = document.getElementById("calEvCalendar");
  var calEvLocation = document.getElementById("calEvLocation");
  var calEvDescription = document.getElementById("calEvDescription");
  var calEvDeleteBtn = document.getElementById("calEvDeleteBtn");
  var calEvSeriesNote = document.getElementById("calEvSeriesNote");

  function calSyncTimeInputs() {
    calEvStartTime.hidden = calEvAllDay.checked;
    calEvEndTime.hidden = calEvAllDay.checked;
  }
  calEvAllDay.addEventListener("change", calSyncTimeInputs);
  calEvStartDate.addEventListener("change", function () {
    if (calEvEndDate.value < calEvStartDate.value) calEvEndDate.value = calEvStartDate.value;
  });

  function calFillCalendarSelect(selectedId) {
    calEvCalendar.innerHTML = "";
    var writable = calState.calendars.filter(function (c) { return c.writable; });
    var last = null;
    try { last = localStorage.getItem(CAL_LAST_CALENDAR_KEY); } catch (e) {}
    writable.forEach(function (c) {
      var o = document.createElement("option");
      o.value = String(c.id);
      o.textContent = c.name + (c.account && c.account !== c.name ? " (" + c.account + ")" : "");
      calEvCalendar.appendChild(o);
    });
    var want = selectedId !== null && selectedId !== undefined ? String(selectedId) : last;
    if (want && writable.some(function (c) { return String(c.id) === want; })) calEvCalendar.value = want;
    else {
      var primary = writable.find(function (c) { return c.primary; });
      if (primary) calEvCalendar.value = String(primary.id);
    }
    return writable.length;
  }

  function calFillForm(v) {
    calEvTitle.value = v.title || "";
    calEvAllDay.checked = !!v.allDay;
    calEvStartDate.value = calYmd(v.start);
    calEvStartTime.value = calHm(v.start);
    calEvEndDate.value = calYmd(v.end);
    calEvEndTime.value = calHm(v.end);
    calEvRepeat.value = v.rrule ? (["FREQ=DAILY", "FREQ=WEEKLY", "FREQ=MONTHLY", "FREQ=YEARLY"].find(function (f) {
      return v.rrule.indexOf(f) === 0;
    }) || "") : "";
    calEvReminder.value = String(v.reminder === undefined ? -1 : v.reminder);
    if (!calEvReminder.value) calEvReminder.value = "-1";
    calEvLocation.value = v.location || "";
    calEvDescription.value = v.description || "";
    calSyncTimeInputs();
  }

  function calOpenEditor(ev, newStart) {
    if (!calFillCalendarSelect(ev ? ev.calendarId : null)) {
      alert(tr("calNoWritableCalendar"));
      return;
    }
    calEditing = ev ? { eventId: ev.eventId } : null;
    calEvDeleteBtn.hidden = !ev;
    calEvSeriesNote.hidden = !(ev && ev.rrule);
    // picking a task reminder: a one-time, timed slot - the task's own
    // ringing reminder does the alerting, so no calendar reminder either
    var picking = !ev && !!calState.pick;
    calEvAllDay.parentElement.hidden = picking;
    calEvRepeat.hidden = picking;
    calEvRepeat.previousElementSibling.hidden = picking;
    if (!ev) {
      var s = newStart || new Date();
      calFillForm({
        title: picking ? calState.pick.text : "",
        start: s,
        end: new Date(s.getTime() + 3600000),
        reminder: picking ? -1 : 10
      });
      calEvOverlay.hidden = false;
      calEvTitle.focus();
      return;
    }
    // the series' own start/end/reminder, not just this occurrence's
    calPlugin.getEvent({ eventId: ev.eventId }).then(function (full) {
      var allDay = !!full.allDay;
      var start = allDay ? calEventStart({ allDay: true, begin: full.dtstart }) : new Date(full.dtstart);
      var endMs = full.dtend || (full.dtstart + (full.durationMs || 3600000));
      var end = allDay ? calAddDays(calEventStart({ allDay: true, begin: endMs }), -1) : new Date(endMs);
      if (allDay && end < start) end = start;
      calFillForm({
        title: full.title, allDay: allDay, start: start, end: end, rrule: full.rrule,
        reminder: full.reminders && full.reminders.length ? full.reminders[0] : -1,
        location: full.location, description: full.description
      });
      calEvCalendar.value = String(full.calendarId);
      calEvOverlay.hidden = false;
    }, function () {
      // couldn't read the series itself: edit from this occurrence's data
      var start = calEventStart(ev);
      var end = ev.allDay ? calAddDays(calEventEnd(ev), -1) : calEventEnd(ev);
      calFillForm({
        title: ev.title, allDay: !!ev.allDay, start: start, end: end < start ? start : end,
        rrule: ev.rrule, reminder: -1, location: ev.location, description: ""
      });
      calEvOverlay.hidden = false;
    });
  }

  function calCloseEditor() {
    calEvOverlay.hidden = true;
    calEditing = null;
  }
  document.getElementById("calEvCancelBtn").addEventListener("click", calCloseEditor);
  calEvOverlay.addEventListener("click", function (e) { if (e.target === calEvOverlay) calCloseEditor(); });

  document.getElementById("calEventForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!calEvStartDate.value || !calEvEndDate.value) return;
    var allDay = calEvAllDay.checked;
    var start, end;
    if (allDay) {
      var sd = calParseYmd(calEvStartDate.value), ed = calParseYmd(calEvEndDate.value);
      start = Date.UTC(sd.getFullYear(), sd.getMonth(), sd.getDate());
      end = Date.UTC(ed.getFullYear(), ed.getMonth(), ed.getDate() + 1);
    } else {
      start = new Date(calEvStartDate.value + "T" + (calEvStartTime.value || "09:00")).getTime();
      end = new Date(calEvEndDate.value + "T" + (calEvEndTime.value || "10:00")).getTime();
    }
    if (end <= start) { alert(tr("calEndBeforeStart")); return; }
    if (!calEditing && calState.pick && start <= Date.now()) { alert(tr("taskReminderPastMsg")); return; }
    var payload = {
      calendarId: Number(calEvCalendar.value),
      title: calEvTitle.value.trim(),
      allDay: allDay,
      start: start,
      end: end,
      rrule: calEvRepeat.value,
      reminderMinutes: Number(calEvReminder.value),
      location: calEvLocation.value.trim(),
      description: calEvDescription.value.trim()
    };
    if (calEditing) payload.eventId = calEditing.eventId;
    try { localStorage.setItem(CAL_LAST_CALENDAR_KEY, calEvCalendar.value); } catch (err) {}
    // picking a task's reminder: a new event, or an existing timed one the
    // user tapped instead - either way the task gets linked to it
    var pickingReminder = !!calState.pick && (!calEditing || (!allDay && start > Date.now()));
    calPlugin.saveEvent(payload).then(function (res) {
      calCloseEditor();
      if (pickingReminder) {
        calApplyPickedReminder(start, (res && res.eventId != null) ? res.eventId : payload.eventId, end);
        return;
      }
      showToast(tr("calSavedMsg"));
      if (payload.eventId != null && !allDay && start > Date.now()) calSyncTaskRemindersForEvent(payload.eventId, start, false, end);
      calLoadAndRender();
    }, function () { alert(tr("calSaveError")); });
  });

  calEvDeleteBtn.addEventListener("click", function () {
    if (!calEditing || !confirm(tr("calDeleteConfirm"))) return;
    var deletedId = calEditing.eventId;
    calPlugin.deleteEvent({ eventId: deletedId }).then(function () {
      calCloseEditor();
      calSyncTaskRemindersForEvent(deletedId, 0, true);
      showToast(tr("calDeletedMsg"));
      calLoadAndRender();
    }, function () { alert(tr("calSaveError")); });
  });

  // ---- which calendars to show ----
  var calCalendarsOverlay = document.getElementById("calCalendarsOverlay");
  document.getElementById("calCalendarsBtn").addEventListener("click", function () {
    var list = document.getElementById("calCalendarsList");
    list.innerHTML = "";
    if (!calState.calendars.length) {
      var none = document.createElement("p");
      none.className = "cal-form-note";
      none.textContent = tr("calNoCalendars");
      list.appendChild(none);
    }
    calState.calendars.forEach(function (c) {
      var row = document.createElement("label");
      row.className = "cal-cal-row";
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !calState.hidden[String(c.id)];
      cb.addEventListener("change", function () {
        if (cb.checked) delete calState.hidden[String(c.id)];
        else calState.hidden[String(c.id)] = true;
        try { localStorage.setItem(CAL_HIDDEN_KEY, JSON.stringify(calState.hidden)); } catch (e) {}
      });
      var sw = document.createElement("span");
      sw.className = "cal-cal-swatch";
      sw.style.background = calColor(c.color);
      var name = document.createElement("span");
      name.className = "cal-cal-name";
      name.textContent = c.name;
      if (c.account) {
        var acc = document.createElement("div");
        acc.className = "cal-cal-account";
        acc.textContent = c.account;
        name.appendChild(acc);
      }
      row.appendChild(cb);
      row.appendChild(sw);
      row.appendChild(name);
      list.appendChild(row);
    });
    calCalendarsOverlay.hidden = false;
  });
  document.getElementById("calCalendarsDoneBtn").addEventListener("click", function () {
    calCalendarsOverlay.hidden = true;
    calLoadAndRender();
  });

  // ---------------------------------------------------------------------
  // Shared text (e.g. a WhatsApp message via Android's share sheet) ->
  // a new task: ItaskAlarmPlugin hands it over as launch view "share".
  // ---------------------------------------------------------------------
  var shareTaskOverlay = document.getElementById("shareTaskOverlay");
  var shareTaskText = document.getElementById("shareTaskText");
  var shareTaskProject = document.getElementById("shareTaskProject");
  var shareTaskDate = document.getElementById("shareTaskDate");
  function openShareTaskModal(text) {
    closeMoveTask();
    shareTaskText.value = (text || "").trim();
    shareTaskProject.innerHTML = "";
    allSheets().filter(function (s) {
      return !s.ended && s.id !== HEAD_OFFICE_SHEET_ID;
    }).forEach(function (s) {
      var o = document.createElement("option");
      o.value = s.id;
      o.textContent = (s.shared ? "👥 " : "") + s.name;
      shareTaskProject.appendChild(o);
    });
    if (allSheets().some(function (s) { return s.id === data.activeSheetId && !s.ended; })) {
      shareTaskProject.value = data.activeSheetId;
    }
    shareTaskDate.value = todayISO();
    shareTaskOverlay.hidden = false;
  }
  document.getElementById("shareTaskCancelBtn").addEventListener("click", function () {
    shareTaskOverlay.hidden = true;
  });
  document.getElementById("shareTaskForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var text = shareTaskText.value.replace(/\s*\n\s*/g, " ").trim();
    var sheet = allSheets().find(function (s) { return s.id === shareTaskProject.value; });
    if (!text || !sheet) return;
    var date = shareTaskDate.value || todayISO();
    sheet.tasks.push({
      id: uid(),
      text: text,
      status: 0,
      urgent: false,
      type: "task",
      date: date,
      createdAt: Date.now()
    });
    shareTaskOverlay.hidden = true;
    viewingArchive = false;
    state.viewMode = "tasks";
    state.showingCompleted = false;
    data.activeSheetId = sheet.id;
    state.viewDate = clampViewDate(date);
    saveData();
    render();
    showToast(tr("shareTaskAddedMsg"));
  });

  // Android 12+ only rings an alarm on the exact minute with the user's
  // "Alarms & reminders" permission; without it alarms can drift by minutes.
  function ensureExactAlarmPermission() {
    if (!nativeTaskAlarmPlugin) return;
    nativeTaskAlarmPlugin.canScheduleExact().then(function (res) {
      if (res && res.value === false && confirm(tr("exactAlarmPermissionPrompt"))) {
        nativeTaskAlarmPlugin.openExactAlarmSettings();
      }
    }).catch(function () {});
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") pruneFinishedTaskReminders();
  });

  function describeTaskReminder(reminder) {
    if (!isTaskReminderActive(reminder)) return "";
    if (reminder.type === "interval") {
      return reminder.minutes === 30 ? tr("taskReminderActiveEvery30") : tr("taskReminderActiveEveryHour");
    }
    if (reminder.date) {
      return tr("taskReminderActiveOnDate") + isoToDisplay(reminder.date) + " " + tr("taskReminderAtTimeWord") + reminder.time;
    }
    return tr("taskReminderActiveAt") + reminder.time;
  }

  // The reminder-alarm icons live in their own layer, a sibling of
  // #taskList rather than a child of any one row - #taskList's own
  // overflow-y:auto also clips overflow-x (a plain CSS limitation, not a
  // choice), so an icon placed inside it can never bleed further left
  // than the list's own box, no matter how it's positioned. Sitting
  // outside it instead lets the icons reach all the way to the page's
  // own left edge. The tradeoff: since the layer doesn't scroll on its
  // own, every row's vertical position and the list's live scroll offset
  // both have to be tracked here by hand instead of coming for free.
  function syncTaskReminderIconsLayerBounds() {
    taskReminderIconsLayer.style.top = taskList.offsetTop + "px";
    taskReminderIconsLayer.style.height = taskList.offsetHeight + "px";
  }
  function applyTaskReminderIconsScroll() {
    taskReminderIconsLayer.style.transform = "translateY(" + (-taskList.scrollTop) + "px)";
  }
  taskList.addEventListener("scroll", applyTaskReminderIconsScroll);
  window.addEventListener("resize", syncTaskReminderIconsLayerBounds);

  function renderTaskReminderIconsLayer(entries) {
    syncTaskReminderIconsLayerBounds();
    taskReminderIconsLayer.innerHTML = "";
    entries.forEach(function (entry) {
      var both = entry.calLink && entry.alarm;
      if (entry.calLink) {
        // linked to a calendar event: a calendar icon with the event's day;
        // tapping it opens that event in the calendar; on a shared project,
        // a long-press on an event of my own shares it with other members
        var link = getMyCalendarLink(activeSheet(), entry.task);
        var cal = document.createElement("span");
        cal.className = "task-reminder-indicator" + (both ? " is-pair-cal" : "");
        cal.style.top = (entry.top + entry.height / 2) + "px";
        cal.innerHTML = '<span class="cal-live-icon"><img src="tasks-calendar-app-icon-blank.webp" alt="">' +
          '<span class="cal-live-wd"></span><span class="cal-live-day"></span></span>';
        var liveIcon = cal.querySelector(".cal-live-icon");
        liveIcon.dataset.at = link.eventAt;
        var at = new Date(link.eventAt);
        liveIcon.querySelector(".cal-live-wd").textContent = at.toLocaleDateString(calLocale(), { weekday: "short" });
        liveIcon.querySelector(".cal-live-day").textContent = at.getDate();
        var calPressFired = false;
        if (activeSheet().shared && !link.fromInvite) {
          var calPressTimer = null;
          var calPressStart = function () {
            calPressFired = false;
            clearTimeout(calPressTimer);
            calPressTimer = setTimeout(function () {
              calPressFired = true;
              openCalendarInviteModal(activeSheet(), entry.task);
            }, 600);
          };
          var calPressEnd = function () { clearTimeout(calPressTimer); };
          cal.addEventListener("mousedown", calPressStart);
          cal.addEventListener("touchstart", calPressStart, { passive: true });
          ["mouseup", "mouseleave", "touchend", "touchmove", "touchcancel"].forEach(function (ev) {
            cal.addEventListener(ev, calPressEnd);
          });
          cal.addEventListener("contextmenu", function (e) { e.preventDefault(); });
        }
        cal.addEventListener("click", function (e) {
          e.stopPropagation();
          if (calPressFired) { calPressFired = false; return; }
          openTaskCalendarEvent(link);
        });
        taskReminderIconsLayer.appendChild(cal);
      }
      if (entry.alarm) {
        var icon = document.createElement("span");
        icon.className = "task-reminder-indicator" + (both ? " is-pair-alarm" : "");
        icon.style.top = (entry.top + entry.height / 2) + "px";
        icon.title = describeTaskReminder(entry.task.reminder);
        icon.innerHTML = '<img src="tasks-reminder-icon.webp" alt="">';
        if (entry.editable) {
          icon.addEventListener("click", function (e) {
            e.stopPropagation();
            pendingMoveTaskId = entry.task.id;
            openTaskReminderModal();
          });
        }
        taskReminderIconsLayer.appendChild(icon);
      }
    });
    applyTaskReminderIconsScroll();
  }

  function openTaskReminderModal() {
    var task = activeSheet().tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    moveTaskOverlay.hidden = true;
    taskReminderTimeRow.hidden = true;
    var currentTimeReminder = (task && isTaskReminderActive(task.reminder) && task.reminder.type === "time") ? task.reminder : null;
    var nextHour = new Date(Date.now() + 3600000);
    taskReminderTimeInput.value = currentTimeReminder ? currentTimeReminder.time :
      ("0" + nextHour.getHours()).slice(-2) + ":00";
    taskReminderDateInput.value = (currentTimeReminder && currentTimeReminder.date) ||
      (currentTimeReminder ? todayISO() : calYmd(nextHour));
    taskReminderDateInput.min = todayISO();
    var statusText = task ? describeTaskReminder(task.reminder) : "";
    taskReminderCurrentStatus.hidden = !statusText;
    taskReminderCurrentStatus.textContent = statusText;
    taskReminderOffBtn.hidden = !task || !isTaskReminderActive(task.reminder);
    taskReminderOverlay.hidden = false;
  }

  function setTaskReminder(reminder) {
    var task = activeSheet().tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    if (!task) { closeMoveTask(); return; }
    if (!reminder) {
      delete task.reminder;
      saveData();
      closeMoveTask();
      showToast(tr("taskReminderOffMsg"));
      render();
      return;
    }
    // The native app rings reminders itself (ItaskAlarm), so push being
    // unavailable there (FCM registration failing...) mustn't block them.
    var ready = nativeTaskAlarmPlugin
      ? Promise.resolve(true).then(function (ok) { ensurePushReadyForTaskReminder(); return ok; })
      : ensurePushReadyForTaskReminder();
    ready.then(function (ok) {
      if (!ok) {
        alert(tr("taskReminderNotSupportedMsg"));
        return;
      }
      if (activeSheet().shared) reminder.by = myPhoneNumber;
      task.reminder = reminder;
      saveData();
      closeMoveTask();
      showToast(tr("taskReminderSetMsg"));
      render();
      ensureExactAlarmPermission();
    });
  }

  taskReminderBtn.addEventListener("click", openTaskReminderModal);
  taskReminderEvery30Btn.addEventListener("click", function () {
    setTaskReminder({ type: "interval", minutes: 30, startedAt: new Date().toISOString(), lastSentAt: null });
  });
  taskReminderEvery60Btn.addEventListener("click", function () {
    setTaskReminder({ type: "interval", minutes: 60, startedAt: new Date().toISOString(), lastSentAt: null });
  });
  // Task long-press -> calendar-with-arrow button: pick the reminder's
  // moment straight on the calendar (the התראה button keeps the every
  // 30/60 minutes choice).
  // "הסרה מלוח השנה": deletes the linked event from the phone's calendar
  // and the link (calendar icon + its 15-minutes-before ring) from the
  // task; a regular reminder on it stays.
  removeFromCalendarBtn.addEventListener("click", function () {
    var sheet = activeSheet();
    var task = sheet.tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    closeMoveTask();
    var link = task && getMyCalendarLink(sheet, task);
    if (!link || !confirm(tr("removeFromCalendarConfirm"))) return;
    var eventId = link.eventId;
    removeMyCalendarLink(sheet, task, link);
    saveData();
    render();
    if (calPlugin && eventId != null) calPlugin.deleteEvent({ eventId: eventId }).catch(function () {});
    showToast(tr("removeFromCalendarMsg"));
  });
  taskCalendarReminderBtn.addEventListener("click", function () {
    var sheet = activeSheet();
    var task = sheet.tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    closeMoveTask();
    openCalendarForTaskReminder(sheet.id, task);
  });
  // "שעה מסוימת": a date + time for the reminder without putting it in the
  // phone's calendar (the menu's calendar button does that).
  taskReminderTimeToggleBtn.addEventListener("click", function () {
    taskReminderTimeRow.hidden = !taskReminderTimeRow.hidden;
    if (!taskReminderTimeRow.hidden) taskReminderTimeInput.focus();
  });
  taskReminderTimeConfirmBtn.addEventListener("click", function () {
    if (!taskReminderTimeInput.value || !taskReminderDateInput.value) return;
    var time = taskReminderTimeInput.value;
    var date = taskReminderDateInput.value;
    var fireAtDate = new Date(date + "T" + time);
    if (isNaN(fireAtDate.getTime()) || fireAtDate.getTime() <= Date.now()) {
      showToast(tr("taskReminderPastMsg"));
      return;
    }
    setTaskReminder({ type: "time", date: date, time: time, fireAt: fireAtDate.toISOString(), firedAt: null });
  });
  taskReminderOffBtn.addEventListener("click", function () { setTaskReminder(null); });
  taskReminderCancelBtn.addEventListener("click", closeMoveTask);
  taskReminderOverlay.addEventListener("click", function (e) {
    if (e.target === taskReminderOverlay) closeMoveTask();
  });

  convertToNoteBtn.addEventListener("click", function () {
    var task = activeSheet().tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    if (task) {
      task.type = "note";
      task.time = currentTimeHHMM();
      saveData();
    }
    closeMoveTask();
    render();
  });
  convertToTaskBtn.addEventListener("click", function () {
    var task = activeSheet().tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    if (task) {
      task.type = "task";
      delete task.time;
      saveData();
    }
    closeMoveTask();
    render();
  });
  transferToLogBtn.addEventListener("click", function () {
    var sheet = activeSheet();
    var task = sheet.tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    if (task) transferTaskToSiteLogWorks(sheet, task);
    closeMoveTask();
  });
  removeFromLogBtn.addEventListener("click", function () {
    var sheet = activeSheet();
    var task = sheet.tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    if (task) removeTaskFromSiteLogWorks(sheet, task);
    closeMoveTask();
  });
  moveTaskCancelBtn.addEventListener("click", closeMoveTask);
  moveTaskOverlay.addEventListener("click", function (e) {
    if (e.target === moveTaskOverlay) closeMoveTask();
  });
  moveTaskProjectsCancelBtn.addEventListener("click", closeMoveTask);
  moveTaskProjectsOverlay.addEventListener("click", function (e) {
    if (e.target === moveTaskProjectsOverlay) closeMoveTask();
  });

  function isoToFullDisplay(iso) {
    var parts = iso.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
  }
  // "/" in a filename is a path separator, not punctuation - browsers and
  // the OS silently drop everything before the last one (a share/download
  // named "... 23/09/2026.pdf" becomes just "2026.pdf"). Use this instead
  // of isoToFullDisplay/isoToDisplay anywhere a date is part of a file name.
  function isoToFileNameDate(iso) {
    var parts = iso.split("-");
    return parts[2] + "-" + parts[1] + "-" + parts[0];
  }

  var dateInput = document.getElementById("dateInput");
  var todayBtn = document.getElementById("todayBtn");

  dateInput.addEventListener("change", function () {
    if (!dateInput.value) return;
    state.viewDate = clampViewDate(dateInput.value);
    render();
  });
  todayBtn.addEventListener("click", function () {
    state.viewDate = clampViewDate(todayISO());
    render();
  });

  showCompletedTasksBtn.addEventListener("click", function () {
    state.showingCompleted = true;
    render();
  });
  showActiveTasksBtn.addEventListener("click", function () {
    state.showingCompleted = false;
    render();
  });

  function switchSheetBySwipe(direction) {
    var visible = visibleSheets();
    var idx = visible.findIndex(function (s) { return s.id === data.activeSheetId; });
    if (idx === -1) return;
    var newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= visible.length) return;
    selectSheet(visible[newIdx].id);
  }

  (function setupSwipeGestures() {
    var notebookEl = document.querySelector(".notebook");
    if (!notebookEl) return;
    var startX = 0, startY = 0, startTime = 0, tracking = false, zone = null;

    notebookEl.addEventListener("touchstart", function (e) {
      var target = e.target;
      if (state.menuOpen || state.searchOpen || e.touches.length !== 1 ||
          target.closest(".sheets-bar") || target.closest(".menu-panel") ||
          target.closest(".search-panel") || target.closest("input") || target.closest("textarea")) {
        tracking = false;
        return;
      }
      if (target.closest(".notebook-head")) {
        zone = "date";
      } else if (target.closest(".ruled-body")) {
        zone = "sheet";
      } else {
        tracking = false;
        return;
      }
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    }, { passive: true });

    notebookEl.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;
      var touch = e.changedTouches[0];
      var dx = touch.clientX - startX;
      var dy = touch.clientY - startY;
      var elapsed = Date.now() - startTime;
      if (elapsed < 800 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (zone === "date") {
          var swipedDate = clampViewDate(addDaysToISO(state.viewDate, dx < 0 ? -1 : 1));
          // A diary log is a record of a day that already happened - never
          // let swiping push it into the future (matches the old dedicated
          // site-log swipe's own guard, now merged into this one handler).
          if (state.viewMode === "diary" && swipedDate > todayISO()) return;
          state.viewDate = swipedDate;
          render();
        } else if (zone === "sheet") {
          switchSheetBySwipe(dx < 0 ? -1 : 1);
        }
      }
    }, { passive: true });
  })();

  (function setupSheetsBarResize() {
    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (state.renamingSheetId === null) renderSheetsBar();
      }, 200);
    });
  })();

  // A shared project I was added to but haven't approved (or declined)
  // stays out of every list - see "Shared-project invites" below.
  var hiddenSharedProjectIds = {};
  function allSheets() {
    return data.sheets.concat(sharedSheets.filter(function (s) { return !hiddenSharedProjectIds[s.id]; }));
  }

  function activeSheet() {
    var all = allSheets();
    var sheet = all.find(function (s) { return s.id === data.activeSheetId; });
    return sheet || all[0];
  }

  function addSheet() {
    var name = tr("projectWord") + " " + (data.sheets.length + 1);
    var sheet = { id: uid(), name: name, tasks: [], reports: [], files: [] };
    data.sheets.push(sheet);
    data.activeSheetId = sheet.id;
    state.renamingSheetId = sheet.id;
    saveData();
    render();
  }

  function animatePageTurn(direction, applyChange) {
    var page = document.querySelector(".ruled-body");
    if (!page) { applyChange(); return; }

    var clone = page.cloneNode(true);
    clone.classList.add("page-turn-clone");
    clone.querySelectorAll("[id]").forEach(function (el) { el.removeAttribute("id"); });
    clone.style.top = page.offsetTop + "px";
    clone.style.left = page.offsetLeft + "px";
    clone.style.width = page.offsetWidth + "px";
    clone.style.height = page.offsetHeight + "px";
    page.parentNode.appendChild(clone);

    applyChange();

    var outClass = direction > 0 ? "page-turn-out-fwd" : "page-turn-out-bwd";
    clone.classList.add(outClass);
    setTimeout(function () {
      clone.remove();
    }, 430);
  }

  function selectSheet(id) {
    if (data.activeSheetId === id) return;
    var visible = visibleSheets();
    var oldIndex = visible.findIndex(function (s) { return s.id === data.activeSheetId; });
    var newIndex = visible.findIndex(function (s) { return s.id === id; });
    var direction = newIndex > oldIndex ? 1 : -1;
    animatePageTurn(direction, function () {
      data.activeSheetId = id;
      var newSheet = allSheets().find(function (s) { return s.id === id; });
      if (newSheet && newSheet.ended && newSheet.endedDate) {
        // Each archived project is pinned to its own end date, not whatever
        // date the previously-viewed project happened to be on.
        state.viewDate = newSheet.endedDate;
      }
      saveData();
      render();
    });
  }

  function commitRename(id, value) {
    var sheet = allSheets().find(function (s) { return s.id === id; });
    var trimmed = value.trim();
    if (sheet && trimmed) {
      sheet.name = trimmed.slice(0, 40);
      if (sheet.shared) {
        // name isn't part of the shared row's `data` column saveSharedSheets()
        // manages - it has its own safe update, same as the member-list edit
        // flow, so a rename never rides along on saveData()'s blind path.
        updateSharedProjectSettings(sheet.id, function (current) {
          return { name: sheet.name, members: current.members, memberNames: current.memberNames };
        }).catch(function () { scheduleSyncRetry(); });
      }
    }
    state.renamingSheetId = null;
    saveData();
    render();
  }

  function deleteSheet(id) {
    var sharedSheet = sharedSheets.find(function (s) { return s.id === id; });
    if (sharedSheet) {
      // Only the member who created it - deleting a shared project removes
      // it for every member, not just this device. The DB's own RLS policy
      // (shared_projects_created_by.sql) enforces the same rule, so this is
      // a defensive check, not the only thing stopping anyone else.
      if (!supabaseClient || sharedSheet.createdBy !== myPhoneNumber) {
        alert(tr("cannotDeleteSharedProject"));
        return;
      }
      var sharedMsg = tr("confirmDeleteSharedProjectNamed").replace("{name}", sharedSheet.name);
      askConfirm(sharedMsg, function () {
        supabaseClient.from(SHARED_TABLE).delete().eq("id", id).then(function (result) {
          if (result && result.error) { alert(tr("cannotDeleteSharedProject")); return; }
          sharedSheets = sharedSheets.filter(function (s) { return s.id !== id; });
          if (data.activeSheetId === id) {
            var nextSheet = allSheets()[0];
            if (nextSheet) data.activeSheetId = nextSheet.id;
          }
          render();
        }, function () { alert(tr("cannotDeleteSharedProject")); });
      });
      return;
    }
    if (data.sheets.length <= 1) {
      alert(tr("mustHaveOneProject"));
      return;
    }
    var sheet = data.sheets.find(function (s) { return s.id === id; });
    var msg = sheet ? tr("confirmDeleteProjectNamed").replace("{name}", sheet.name) : tr("confirmDeleteProjectGeneric");
    askConfirm(msg, function () {
      data.sheets = data.sheets.filter(function (s) { return s.id !== id; });
      if (data.activeSheetId === id) {
        data.activeSheetId = data.sheets[0].id;
      }
      saveData();
      render();
    });
  }

  function endSheet(id) {
    if (visibleSheets().length <= 1) {
      alert(tr("mustHaveOneActiveProject"));
      return;
    }
    var sheet = allSheets().find(function (s) { return s.id === id; });
    var msg = sheet ? tr("confirmEndProjectNamed").replace("{name}", sheet.name) : tr("confirmEndProjectGeneric");
    askConfirm(msg, function () {
      sheet.ended = true;
      sheet.endedDate = todayISO();
      if (data.activeSheetId === id) {
        var nextVisible = visibleSheets().find(function (s) { return s.id !== id; });
        if (nextVisible) data.activeSheetId = nextVisible.id;
      }
      saveData();
      render();
    });
  }

  function reactivateSheet(id) {
    var sheet = allSheets().find(function (s) { return s.id === id; });
    if (!sheet) return;
    sheet.ended = false;
    sheet.endedDate = null;
    saveData();
    render();
  }

  // The web Contact Picker API (navigator.contacts) is unavailable inside
  // the TWA build (Play Store wraps the site with no browser chrome, and
  // that API is gated behind a visible omnibox permission prompt Chrome
  // simply won't show there). The native Android build (built separately
  // via android-app/, wrapping this same site in a Capacitor shell instead
  // of a bare TWA) exposes a real native contact picker through
  // @capacitor-community/contacts, with no such restriction - detect and
  // prefer that one when present.
  var capacitorContactsAvailable = !!(
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.Contacts
  );
  var contactPickerSupported = !!(navigator.contacts && window.ContactsManager) || capacitorContactsAvailable;

  // Chat used to ask each member to type their own display name once (a
  // prompt() the first time they opened a shared project's chat) - a real
  // name should never need to be typed in twice, since the native app
  // already has the real answer sitting in the phone's own contacts.
  // null = not loaded yet (still show the memberNames/phone fallback);
  // an object (even {}) = load finished, this is the source of truth for
  // any phone number found in it.
  var deviceContactsByPhone = null;
  function loadDeviceContactsIfNeeded() {
    if (!capacitorContactsAvailable || deviceContactsByPhone) return;
    var Contacts = window.Capacitor.Plugins.Contacts;
    // @capacitor-community/contacts v5+ calls it checkPermissions (the old
    // getPermissions name made this fail, so chat never showed contact names)
    var check = Contacts.checkPermissions || Contacts.getPermissions;
    Promise.resolve().then(function () { return check.call(Contacts); }).then(function (status) {
      if (status && status.contacts === "granted") return status;
      return Contacts.requestPermissions();
    }).then(function (status) {
      if (!status || status.contacts !== "granted") { deviceContactsByPhone = {}; return; }
      return Contacts.getContacts({ projection: { name: true, phones: true } }).then(function (result) {
        var map = {};
        (result && result.contacts || []).forEach(function (c) {
          var displayName = c.name && (c.name.display || [c.name.given, c.name.family].filter(Boolean).join(" "));
          if (!displayName) return;
          (c.phoneNumbers || []).forEach(function (p) {
            var normalized = normalizePhoneDigits(p.number);
            if (normalized && !map[normalized]) map[normalized] = displayName;
          });
        });
        deviceContactsByPhone = map;
        render();
      });
    }).catch(function () { deviceContactsByPhone = {}; });
  }
  function getDeviceContactName(phone) {
    if (!deviceContactsByPhone) return null;
    var normalized = normalizePhoneDigits(phone);
    return (normalized && deviceContactsByPhone[normalized]) || null;
  }
  // The name shown for a member's messages/mentions: this device's own
  // contacts take priority (so everyone sees names the way they actually
  // know that person), falling back to whatever name was on record from
  // before this change, then the bare phone number.
  function resolveMemberName(sheet, phone) {
    if (!phone) return phone;
    return getDeviceContactName(phone) || (sheet && sheet.memberNames && sheet.memberNames[phone]) || phone;
  }

  // The standard Web Push API (navigator.serviceWorker + window.PushManager)
  // is unsupported by the Android WebView engine the native app runs in -
  // reminders/chat notifications need a native Firebase Cloud Messaging
  // plugin there instead. Uses @capacitor-firebase/messaging rather than
  // @capacitor/push-notifications: the latter's register() call is a
  // documented, widely-reported source of silent hangs (its
  // "registration"/"registrationError" events sometimes never fire at all,
  // with no native error) - confirmed against public bug reports and
  // reproduced here even with a correctly configured Firebase project.
  // @capacitor-firebase/messaging's getToken() is a real Promise instead of
  // an unreliable one-shot event pair.
  var capacitorPushAvailable = !!(
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.FirebaseMessaging
  );

  // The Android WebView this app runs in doesn't implement navigator.share()
  // at all (unlike Chrome), so every PDF/file share silently fell back to a
  // plain download there - these two native plugins give a real OS share
  // sheet instead: Filesystem writes the blob to a real file the OS can
  // hand off, Share hands that file to the native share sheet.
  var capacitorShareAvailable = !!(
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.Share && window.Capacitor.Plugins.Filesystem
  );

  // Native pickContact() only returns ONE contact per call (unlike the web
  // API's multiple:true), so this gets called once per button press;
  // pressing the button again picks another. Resolves to null if the user
  // cancels the native picker or it has no usable phone number.
  function pickOneNativeContact() {
    return window.Capacitor.Plugins.Contacts.pickContact({ projection: { name: true, phones: true } })
      .then(function (result) {
        var contact = result && result.contact;
        var phones = (contact && contact.phones) || [];
        var tel = phones.length ? phones[0].number : "";
        if (!tel) return null;
        var name = contact && contact.name && (contact.name.display || [contact.name.given, contact.name.family].filter(Boolean).join(" "));
        return { tel: tel, name: name || "" };
      })
      .catch(function (err) {
        // backing out of the picker isn't an error; anything else (most
        // often READ_CONTACTS missing from the app's manifest) is said
        // out loud instead of the button silently doing nothing
        var msg = (err && err.message) || "";
        if (!/cancel/i.test(msg)) alert(tr("contactPickFailedMsg") + (msg ? "\n" + msg : ""));
        return null;
      });
  }

  // --- Project invites: "שיתוף" on a project's tab sends a real invite to
  // one or more contacts instead of just dumping a text summary - each
  // invited phone only gains access after they explicitly approve (see the
  // receiving side further down), rather than being silently added.
  var projectInviteSendOverlay = document.getElementById("projectInviteSendOverlay");
  var projectInviteSendMessage = document.getElementById("projectInviteSendMessage");
  var projectInviteSendList = document.getElementById("projectInviteSendList");
  var projectInvitePickContactsBtn = document.getElementById("projectInvitePickContactsBtn");
  var projectInviteSendBtn = document.getElementById("projectInviteSendBtn");
  var projectInviteSendCancelBtn = document.getElementById("projectInviteSendCancelBtn");
  var pendingInviteSheetId = null;

  function addInvitePhoneInput(focusIt, presetValue, presetName) {
    var input = document.createElement("input");
    input.type = "tel";
    input.className = "auth-input";
    input.placeholder = tr("sharedProjectPhonePlaceholder");
    input.maxLength = 60;
    if (presetValue) input.value = presetName ? (presetName + " – " + presetValue) : presetValue;
    if (presetName) input.dataset.contactName = presetName;
    input.addEventListener("input", function () {
      delete input.dataset.contactName;
      if (input.value.trim() && input === projectInviteSendList.lastElementChild) {
        addInvitePhoneInput(false);
      }
    });
    input.addEventListener("keydown", function (e) {
      e.stopPropagation();
      if (e.key === "Enter") projectInviteSendBtn.click();
      if (e.key === "Escape") closeProjectInviteSendModal();
    });
    projectInviteSendList.appendChild(input);
    if (focusIt) input.focus();
  }

  function pickContactsForInvite() {
    if (!contactPickerSupported) return;
    if (capacitorContactsAvailable) {
      pickOneNativeContact().then(function (picked) {
        if (!picked) return;
        var lastEmpty = projectInviteSendList.lastElementChild;
        if (lastEmpty && !lastEmpty.value.trim() && lastEmpty.parentNode) lastEmpty.parentNode.removeChild(lastEmpty);
        addInvitePhoneInput(false, picked.tel, picked.name);
        addInvitePhoneInput(false);
      });
      return;
    }
    navigator.contacts.select(["name", "tel"], { multiple: true }).then(function (contacts) {
      var lastEmpty = projectInviteSendList.lastElementChild;
      contacts.forEach(function (c) {
        var tel = (c.tel && c.tel[0]) || "";
        var name = (c.name && c.name[0]) || "";
        if (!tel) return;
        addInvitePhoneInput(false, tel, name);
      });
      if (lastEmpty && !lastEmpty.value.trim() && lastEmpty.parentNode) lastEmpty.parentNode.removeChild(lastEmpty);
      addInvitePhoneInput(false);
    }).catch(function () {});
  }
  projectInvitePickContactsBtn.hidden = !contactPickerSupported;
  projectInvitePickContactsBtn.addEventListener("click", pickContactsForInvite);

  function openProjectInviteSendModal(id) {
    var sheet = allSheets().find(function (s) { return s.id === id; });
    if (!sheet) return;
    pendingInviteSheetId = id;
    projectInviteSendMessage.textContent = tr("projectInviteSendMessagePrefix") + " \"" + sheet.name + "\"";
    projectInviteSendList.innerHTML = "";
    addInvitePhoneInput(false);
    projectInviteSendOverlay.hidden = false;
  }
  function closeProjectInviteSendModal() {
    projectInviteSendOverlay.hidden = true;
    pendingInviteSheetId = null;
  }
  projectInviteSendCancelBtn.addEventListener("click", closeProjectInviteSendModal);
  projectInviteSendOverlay.addEventListener("click", function (e) {
    if (e.target === projectInviteSendOverlay) closeProjectInviteSendModal();
  });

  function sendProjectInviteNotification(targetPhone, projectName, senderName, inviteId, shared) {
    if (!supabaseClient || !supabaseClient.functions) return;
    try {
      supabaseClient.functions.invoke("send-project-invite-notification", {
        body: { targetPhone: targetPhone, projectName: projectName, senderName: senderName, inviteId: inviteId, shared: !!shared }
      }).then(function () {}, function (err) {
        console.error("send-project-invite-notification failed:", err);
      });
    } catch (e) {}
  }

  // A "share" is a one-time COPY, not a live shared project: the sender's
  // own project is never touched or converted - each invited phone, once
  // they approve, gets an independent private project seeded from a
  // snapshot of the sender's tasks/reports/site logs taken right now.
  // Files aren't included in the snapshot since they live in the sender's
  // own storage folder (keyed by this sheet's id) and the recipient has no
  // access to it.
  function buildProjectInviteSnapshot(sheet) {
    return {
      tasks: sheet.tasks || [],
      reports: sheet.reports || [],
      siteLogs: sheet.siteLogs || []
    };
  }

  projectInviteSendBtn.addEventListener("click", function () {
    if (!pendingInviteSheetId || !supabaseClient) return;
    var inputs = Array.prototype.slice.call(projectInviteSendList.querySelectorAll("input"));
    var invitees = [];
    inputs.forEach(function (i) {
      var phone = normalizePhoneDigits(i.value);
      if (!phone || phone === myPhoneNumber) return;
      invitees.push({ phone: phone, name: i.dataset.contactName || null });
    });
    if (!invitees.length) {
      alert(tr("projectInviteNeedPhoneMsg"));
      return;
    }

    var sheet = allSheets().find(function (s) { return s.id === pendingInviteSheetId; });
    if (!sheet) return;
    var senderName = myDisplayNameIn(sheet) || myPhoneNumber;
    var snapshot = buildProjectInviteSnapshot(sheet);

    closeProjectInviteSendModal();

    var rows = invitees.map(function (inv) {
      return {
        project_name: sheet.name,
        snapshot: snapshot,
        invited_phone: inv.phone,
        invited_by_phone: myPhoneNumber,
        invited_by_name: senderName
      };
    });

    supabaseClient.from("project_invites").insert(rows).select().then(function (result) {
      if (result && result.error) { console.error("project_invites insert failed:", result.error); return; }
      (result.data || []).forEach(function (row) {
        sendProjectInviteNotification(row.invited_phone, row.project_name, row.invited_by_name, row.id);
      });
      showToast(tr("projectInviteSentMsg"));
    }, function (err) {
      console.error("project_invites insert failed:", err);
    });
  });

  // --- Receiving side: an invite addressed to my own phone shows an
  // approve/decline prompt. Approving creates a brand-new PRIVATE project
  // from the invite's snapshot (never a shared one) and marks the invite
  // resolved via a plain update - my own phone number is both the row I'm
  // allowed to see and the one I'm allowed to resolve, so no elevated
  // privileges are needed here.
  var projectInviteReceivedOverlay = document.getElementById("projectInviteReceivedOverlay");
  var projectInviteReceivedMessage = document.getElementById("projectInviteReceivedMessage");
  var projectInviteApproveBtn = document.getElementById("projectInviteApproveBtn");
  var projectInviteDeclineBtn = document.getElementById("projectInviteDeclineBtn");
  var pendingProjectInvitesQueue = [];
  var activeProjectInvite = null;

  function sharedInviteProjectId(invite) {
    return invite && invite.snapshot && invite.snapshot.sharedProjectId || null;
  }
  // For each shared project, only the newest invite to me counts (I may
  // have been removed and added again).
  function latestSharedInvites(rows) {
    var latest = {};
    rows.forEach(function (r) {
      var pid = sharedInviteProjectId(r);
      if (!pid) return;
      var key = pid + "|" + r.invited_phone;
      if (!latest[key] || String(r.created_at || "") > String(latest[key].created_at || "")) latest[key] = r;
    });
    return Object.keys(latest).map(function (k) { return latest[k]; });
  }
  function checkPendingProjectInvites() {
    if (!supabaseClient || !myPhoneNumber) return;
    cleanUpDeclinedSharedInvites();
    if (activeProjectInvite) return;
    try {
      supabaseClient.from("project_invites").select("*")
        .eq("invited_phone", myPhoneNumber)
        .then(function (result) {
          if (!result || result.error || !result.data) return;
          var hidden = {};
          latestSharedInvites(result.data).forEach(function (r) {
            if (r.status !== "approved") hidden[sharedInviteProjectId(r)] = true;
          });
          var changed = JSON.stringify(hidden) !== JSON.stringify(hiddenSharedProjectIds);
          hiddenSharedProjectIds = hidden;
          if (changed) render();
          var pendingShared = latestSharedInvites(result.data).filter(function (r) { return r.status === "pending"; });
          var pendingCopies = result.data.filter(function (r) { return r.status === "pending" && !sharedInviteProjectId(r); });
          pendingProjectInvitesQueue = pendingCopies.concat(pendingShared);
          showNextPendingProjectInvite();
        }, function () {});
    } catch (e) {}
  }
  function showNextPendingProjectInvite() {
    if (activeProjectInvite || !pendingProjectInvitesQueue.length) return;
    activeProjectInvite = pendingProjectInvitesQueue.shift();
    var senderLabel = activeProjectInvite.invited_by_name || activeProjectInvite.invited_by_phone;
    var templateKey = sharedInviteProjectId(activeProjectInvite) ? "sharedProjectInviteMsgTemplate" : "projectInviteReceivedMsgTemplate";
    projectInviteReceivedMessage.textContent = tr(templateKey)
      .replace("{project}", activeProjectInvite.project_name)
      .replace("{name}", senderLabel);
    projectInviteReceivedOverlay.hidden = false;
  }
  function closeProjectInviteReceivedModal() {
    projectInviteReceivedOverlay.hidden = true;
    activeProjectInvite = null;
    showNextPendingProjectInvite();
  }
  function resolveProjectInvite(invite, newStatus) {
    if (!supabaseClient) return;
    supabaseClient.from("project_invites")
      .update({ status: newStatus, resolved_at: new Date().toISOString() })
      .eq("id", invite.id)
      .then(function (result) {
        if (result && result.error) console.error("project_invites update failed:", result.error);
      }, function (err) {
        console.error("project_invites update failed:", err);
      });
  }
  projectInviteApproveBtn.addEventListener("click", function () {
    if (!activeProjectInvite) return;
    var invite = activeProjectInvite;
    var sharedId = sharedInviteProjectId(invite);
    if (sharedId) {
      // joining a shared project I'm already listed in: just show it
      delete hiddenSharedProjectIds[sharedId];
      if (sharedSheets.some(function (s) { return s.id === sharedId; })) data.activeSheetId = sharedId;
      else loadSharedSheets();
      resolveProjectInvite(invite, "approved");
      showToast(tr("projectInviteApprovedMsg"));
      closeProjectInviteReceivedModal();
      render();
      return;
    }
    // resolveProjectInvite()'s server update is fire-and-forget - if it
    // fails (a brief network blip), the invite row stays "pending" and
    // checkPendingProjectInvites() will surface this exact same invite
    // again later, and approving it a second time would otherwise push a
    // full duplicate of the project. Tag the imported sheet with the
    // invite's id so re-approving the same invite is a safe no-op instead.
    var alreadyImported = data.sheets.some(function (s) { return s.importedInviteId === invite.id; });
    if (!alreadyImported) {
      var snap = invite.snapshot || {};
      data.sheets.push({
        id: uid(),
        name: invite.project_name,
        tasks: snap.tasks || [],
        reports: snap.reports || [],
        files: [],
        folders: null,
        siteLogs: (snap.siteLogs || []).map(normalizeSiteLog),
        logoId: null,
        ended: false,
        endedDate: null,
        importedInviteId: invite.id
      });
      data.activeSheetId = data.sheets[data.sheets.length - 1].id;
      saveData();
    }
    resolveProjectInvite(invite, "approved");
    showToast(tr("projectInviteApprovedMsg"));
    closeProjectInviteReceivedModal();
    render();
  });
  projectInviteDeclineBtn.addEventListener("click", function () {
    if (!activeProjectInvite) return;
    resolveProjectInvite(activeProjectInvite, "declined");
    showToast(tr("projectInviteDeclinedMsg"));
    closeProjectInviteReceivedModal();
  });

  function normalizePhoneDigits(raw) {
    var digits = (raw || "").replace(/\D/g, "");
    if (digits.indexOf("972") === 0 && digits.length > 10) digits = digits.slice(3);
    digits = digits.replace(/^0+/, "");
    if (digits.length < 8 || digits.length > 10) return null;
    return "+972" + digits;
  }

  var sharedProjectOverlay = document.getElementById("sharedProjectOverlay");
  var sharedProjectModalMessage = document.getElementById("sharedProjectModalMessage");
  var sharedProjectNameInput = document.getElementById("sharedProjectNameInput");
  var sharedProjectMembersList = document.getElementById("sharedProjectMembersList");
  var sharedProjectSaveBtn = document.getElementById("sharedProjectSaveBtn");
  var sharedProjectCancelBtn = document.getElementById("sharedProjectCancelBtn");

  function addSharedMemberInput(focusIt, presetValue, presetName) {
    var input = document.createElement("input");
    input.type = "tel";
    input.className = "auth-input";
    input.placeholder = tr("sharedProjectPhonePlaceholder");
    input.maxLength = 60;
    if (presetValue) input.value = presetName ? (presetName + " – " + presetValue) : presetValue;
    if (presetName) input.dataset.contactName = presetName;
    input.addEventListener("input", function () {
      delete input.dataset.contactName;
      if (input.value.trim() && input === sharedProjectMembersList.lastElementChild) {
        addSharedMemberInput(false);
      }
    });
    input.addEventListener("keydown", function (e) {
      e.stopPropagation();
      if (e.key === "Enter") sharedProjectSaveBtn.click();
      if (e.key === "Escape") closeSharedProjectModal();
    });
    sharedProjectMembersList.appendChild(input);
    if (focusIt) input.focus();
  }

  function pickContactsForSharedProject() {
    if (!contactPickerSupported) return;
    if (capacitorContactsAvailable) {
      pickOneNativeContact().then(function (picked) {
        if (!picked) return;
        var lastEmpty = sharedProjectMembersList.lastElementChild;
        if (lastEmpty && !lastEmpty.value.trim() && lastEmpty.parentNode) lastEmpty.parentNode.removeChild(lastEmpty);
        addSharedMemberInput(false, picked.tel, picked.name);
        addSharedMemberInput(false);
      });
      return;
    }
    navigator.contacts.select(["name", "tel"], { multiple: true }).then(function (contacts) {
      var lastEmpty = sharedProjectMembersList.lastElementChild;
      contacts.forEach(function (c) {
        var tel = (c.tel && c.tel[0]) || "";
        var name = (c.name && c.name[0]) || "";
        if (!tel) return;
        addSharedMemberInput(false, tel, name);
      });
      if (lastEmpty && !lastEmpty.value.trim() && lastEmpty.parentNode) lastEmpty.parentNode.removeChild(lastEmpty);
      addSharedMemberInput(false);
    }).catch(function () {});
  }

  var sharedProjectPickContactsBtn = document.getElementById("sharedProjectPickContactsBtn");
  sharedProjectPickContactsBtn.hidden = !contactPickerSupported;
  sharedProjectPickContactsBtn.addEventListener("click", pickContactsForSharedProject);

  var pendingSharedEditId = null;

  var pendingConvertSheetId = null;

  function openSharedProjectModal() {
    pendingSharedEditId = null;
    pendingConvertSheetId = null;
    sharedProjectModalMessage.textContent = tr("sharedProjectModalMessage");
    sharedProjectNameInput.value = "";
    sharedProjectMembersList.innerHTML = "";
    addSharedMemberInput(false);
    sharedProjectOverlay.hidden = false;
    sharedProjectNameInput.focus();
  }
  function openSharedProjectEditModal(id) {
    var sheet = sharedSheets.find(function (s) { return s.id === id; });
    if (!sheet) return;
    pendingSharedEditId = id;
    pendingConvertSheetId = null;
    sharedProjectModalMessage.textContent = tr("sharedProjectEditModalMessage");
    sharedProjectNameInput.value = sheet.name;
    sharedProjectMembersList.innerHTML = "";
    var otherMembers = (sheet.members || []).filter(function (p) { return p !== myPhoneNumber; });
    otherMembers.forEach(function (phone) {
      var knownName = getDeviceContactName(phone) || (sheet.memberNames || {})[phone] || "";
      addSharedMemberInput(false, phone.replace("+972", "0"), knownName);
    });
    addSharedMemberInput(false);
    sharedProjectOverlay.hidden = false;
    sharedProjectNameInput.focus();
  }
  function openSharedProjectConvertModal(id) {
    var sheet = data.sheets.find(function (s) { return s.id === id; });
    if (!sheet) return;
    if (data.sheets.length <= 1) {
      alert(tr("mustHaveOneProject"));
      return;
    }
    pendingSharedEditId = null;
    pendingConvertSheetId = id;
    sharedProjectModalMessage.textContent = tr("sharedProjectConvertModalMessage");
    sharedProjectNameInput.value = sheet.name;
    sharedProjectMembersList.innerHTML = "";
    addSharedMemberInput(false);
    sharedProjectOverlay.hidden = false;
    sharedProjectNameInput.focus();
  }
  function closeSharedProjectModal() {
    sharedProjectOverlay.hidden = true;
    pendingSharedEditId = null;
    pendingConvertSheetId = null;
  }
  // ---- Shared-project invites ----
  // Adding someone to a shared project lists their phone in its members
  // right away (the database only lets members write to it), but their
  // app keeps the project hidden until they approve: each new member gets
  // a project_invites row tagged snapshot.sharedProjectId, a push, and the
  // same approve/decline prompt as a shared copy. Declining keeps it
  // hidden for them, and the inviter's app then takes them off the members
  // (a member can't remove themselves - the database requires the writer
  // to stay a member).
  function inviteNewSharedMembers(sheetId, projectName, newPhones) {
    if (!supabaseClient || !newPhones.length) return;
    var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
    var senderName = (sheet && myDisplayNameIn(sheet)) || myPhoneNumber;
    var rows = newPhones.map(function (phone) {
      return {
        project_name: projectName,
        snapshot: { sharedProjectId: sheetId },
        invited_phone: phone,
        invited_by_phone: myPhoneNumber,
        invited_by_name: senderName
      };
    });
    supabaseClient.from("project_invites").insert(rows).select().then(function (result) {
      if (result && result.error) { console.error("shared project invites insert failed:", result.error); return; }
      (result.data || []).forEach(function (row) {
        sendProjectInviteNotification(row.invited_phone, row.project_name, row.invited_by_name, row.id, true);
      });
    }, function (err) { console.error("shared project invites insert failed:", err); });
  }
  function cleanUpDeclinedSharedInvites() {
    if (!supabaseClient || !myPhoneNumber) return;
    try {
      supabaseClient.from("project_invites").select("*").eq("invited_by_phone", myPhoneNumber).then(function (result) {
        if (!result || result.error || !result.data) return;
        latestSharedInvites(result.data).forEach(function (r) {
          if (r.status !== "declined") return;
          var pid = sharedInviteProjectId(r);
          var sheet = sharedSheets.find(function (s) { return s.id === pid; });
          if (!sheet || (sheet.members || []).indexOf(r.invited_phone) === -1) return;
          updateSharedProjectSettings(pid, function (current) {
            return { name: current.name, members: current.members.filter(function (p) { return p !== r.invited_phone; }), memberNames: current.memberNames };
          }).then(function () { render(); }, function () {});
        });
      }, function () {});
    } catch (e) {}
  }

  sharedProjectSaveBtn.addEventListener("click", function () {
    var name = sharedProjectNameInput.value.trim().slice(0, 40) || tr("sharedProjectDefaultName");
    var inputs = Array.prototype.slice.call(sharedProjectMembersList.querySelectorAll("input"));
    var members = [];
    var pickedNames = {};
    inputs.forEach(function (i) {
      var phone = normalizePhoneDigits(i.value);
      if (!phone) return;
      members.push(phone);
      if (i.dataset.contactName) pickedNames[phone] = i.dataset.contactName;
    });
    if (myPhoneNumber && members.indexOf(myPhoneNumber) === -1) members.push(myPhoneNumber);
    if (members.length < 2) {
      alert(tr("sharedProjectNeedMember"));
      return;
    }
    var invitedId = null, previousMembers = [myPhoneNumber];
    if (pendingSharedEditId) {
      var existing = sharedSheets.find(function (s) { return s.id === pendingSharedEditId; });
      if (existing) {
        invitedId = existing.id;
        previousMembers = existing.members || [];
        existing.name = name;
        existing.members = members;
        existing.memberNames = Object.assign({}, existing.memberNames || {}, pickedNames);
        // An existing shared row - editing it safely means merging against
        // whatever's actually on the server right now (e.g. another member
        // may have set their own display name since this loaded), not
        // blindly overwriting it with this device's possibly-stale copy.
        updateSharedProjectSettings(existing.id, function (current) {
          return { name: name, members: members, memberNames: Object.assign({}, current.memberNames || {}, pickedNames) };
        }).catch(function () { scheduleSyncRetry(); });
      }
    } else if (pendingConvertSheetId) {
      var privateSheet = data.sheets.find(function (s) { return s.id === pendingConvertSheetId; });
      if (privateSheet) {
        var converted = {
          id: window.crypto.randomUUID ? window.crypto.randomUUID() : uid(),
          shared: true,
          name: name,
          tasks: privateSheet.tasks || [],
          reports: privateSheet.reports || [],
          files: privateSheet.files || [],
          folders: privateSheet.folders || null,
          siteLogs: privateSheet.siteLogs || [],
          workPlan: privateSheet.workPlan || [],
          workHammocks: privateSheet.workHammocks || [],
          workBaseline: privateSheet.workBaseline || null,
          sketches: privateSheet.sketches || [],
          ended: privateSheet.ended || false,
          endedDate: privateSheet.endedDate || null,
          logoId: privateSheet.logoId || null,
          members: members,
          memberNames: pickedNames,
          createdBy: myPhoneNumber,
          messages: []
        };
        data.sheets = data.sheets.filter(function (s) { return s.id !== pendingConvertSheetId; });
        sharedSheets.push(converted);
        invitedId = converted.id;
        if (data.activeSheetId === pendingConvertSheetId) data.activeSheetId = converted.id;
      }
    } else {
      var sheet = {
        id: window.crypto.randomUUID ? window.crypto.randomUUID() : uid(),
        shared: true,
        name: name,
        tasks: [],
        reports: [],
        files: [],
        ended: false,
        endedDate: null,
        logoId: null,
        members: members,
        memberNames: pickedNames,
        createdBy: myPhoneNumber,
        messages: []
      };
      sharedSheets.push(sheet);
      invitedId = sheet.id;
      data.activeSheetId = sheet.id;
    }
    closeSharedProjectModal();
    saveData();
    render();
    if (invitedId) {
      inviteNewSharedMembers(invitedId, name, members.filter(function (p) {
        return p !== myPhoneNumber && previousMembers.indexOf(p) === -1;
      }));
    }
  });
  sharedProjectCancelBtn.addEventListener("click", closeSharedProjectModal);
  sharedProjectOverlay.addEventListener("click", function (e) {
    if (e.target === sharedProjectOverlay) closeSharedProjectModal();
  });

  var sheetActionOverlay = document.getElementById("sheetActionOverlay");
  var sheetActionDeleteBtn = document.getElementById("sheetActionDeleteBtn");
  var sheetActionShareBtn = document.getElementById("sheetActionShareBtn");
  var sheetActionEndBtn = document.getElementById("sheetActionEndBtn");
  var sheetActionReactivateBtn = document.getElementById("sheetActionReactivateBtn");
  var sheetActionMembersBtn = document.getElementById("sheetActionMembersBtn");
  var sheetActionMakeSharedBtn = document.getElementById("sheetActionMakeSharedBtn");
  var sheetActionLogoBtn = document.getElementById("sheetActionLogoBtn");
  var sheetActionCancelBtn = document.getElementById("sheetActionCancelBtn");
  var pendingSheetActionId = null;

  function openSheetActionModal(id) {
    pendingSheetActionId = id;
    var sheet = allSheets().find(function (s) { return s.id === id; });
    var isShared = !!sharedSheets.find(function (s) { return s.id === id; });
    // Deleting a shared project removes it for every member, not just this
    // device - only the member who created it gets the option, same as
    // the DB's own RLS policy (shared_projects_created_by.sql) enforces.
    sheetActionDeleteBtn.hidden = isShared && (!sheet || sheet.createdBy !== myPhoneNumber);
    sheetActionMembersBtn.hidden = !isShared;
    sheetActionMakeSharedBtn.hidden = isShared;
    sheetActionEndBtn.hidden = !!(sheet && sheet.ended);
    sheetActionReactivateBtn.hidden = !(sheet && sheet.ended);
    sheetActionOverlay.hidden = false;
  }
  function closeSheetActionModal() {
    sheetActionOverlay.hidden = true;
    pendingSheetActionId = null;
  }
  sheetActionDeleteBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    deleteSheet(id);
  });
  sheetActionShareBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    openProjectInviteSendModal(id);
  });
  sheetActionEndBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    endSheet(id);
  });
  sheetActionReactivateBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    reactivateSheet(id);
  });
  sheetActionMembersBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    openSharedProjectEditModal(id);
  });
  sheetActionMakeSharedBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    openSharedProjectConvertModal(id);
  });
  sheetActionLogoBtn.addEventListener("click", function () {
    var id = pendingSheetActionId;
    closeSheetActionModal();
    openLogoPickerModal(id);
  });
  sheetActionCancelBtn.addEventListener("click", closeSheetActionModal);
  sheetActionOverlay.addEventListener("click", function (e) {
    if (e.target === sheetActionOverlay) closeSheetActionModal();
  });

  var chatBtn = document.getElementById("chatBtn");
  var chatFabBadge = document.getElementById("chatFabBadge");
  var chatView = document.getElementById("chatView");
  var ruledBodyEl = document.querySelector(".ruled-body");
  var chatMessages = document.getElementById("chatMessages");
  var chatMessagesInner = document.getElementById("chatMessagesInner");
  var chatForm = document.getElementById("chatForm");
  var chatInput = document.getElementById("chatInput");
  var activeChatSheetId = null;
  var chatPollTimer = null;
  // Set right before the render triggered by actually opening the chat, so
  // that render forces a scroll to the latest message regardless of
  // whatever stale scrollTop this element was left at from the last time
  // this same chat was open - consumed (read once, then cleared) by the
  // very next renderChatMessages() call.
  var chatForceScrollNext = false;

  var CHAT_READ_KEY_PREFIX = "itask-chat-read:";
  var chatReadState = {};
  function chatReadStorageKey() { return CHAT_READ_KEY_PREFIX + SUPABASE_ROW_ID; }
  function loadChatReadState() {
    try {
      var raw = localStorage.getItem(chatReadStorageKey());
      chatReadState = raw ? JSON.parse(raw) : {};
    } catch (e) { chatReadState = {}; }
  }
  function persistChatReadState() {
    try { localStorage.setItem(chatReadStorageKey(), JSON.stringify(chatReadState)); } catch (e) {}
  }
  function markChatRead(sheet) {
    if (!sheet) return;
    chatReadState[sheet.id] = Date.now();
    persistChatReadState();
    updateAppBadge();
  }
  function getUnreadCount(sheet) {
    if (!sheet || !sheet.messages) return 0;
    var lastRead = chatReadState[sheet.id] || 0;
    return sheet.messages.filter(function (m) {
      return m.type !== "system" && m.phone !== myPhoneNumber && m.ts > lastRead;
    }).length;
  }
  function totalUnreadCount() {
    return sharedSheets.reduce(function (sum, s) { return sum + getUnreadCount(s); }, 0);
  }
  function updateAppBadge() {
    if (!("setAppBadge" in navigator)) return;
    var n = totalUnreadCount();
    try {
      if (n > 0) navigator.setAppBadge(n).catch(function () {});
      else if ("clearAppBadge" in navigator) navigator.clearAppBadge().catch(function () {});
    } catch (e) {}
  }

  var CONTACT_COLOR_COUNT = 16;
  function contactColorIndex(phone) {
    var hash = 0;
    for (var i = 0; i < phone.length; i++) hash = (hash * 31 + phone.charCodeAt(i)) >>> 0;
    return (hash % CONTACT_COLOR_COUNT) + 1;
  }

  function chatDayLabel(ts) {
    var d = new Date(ts);
    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return tr("chatToday");
    if (d.toDateString() === yesterday.toDateString()) return tr("chatYesterday");
    return d.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  function chatMessagePreviewText(m) {
    if (!m) return "";
    if (m.type === "voice") return tr("voiceMessageLabel");
    if (m.type === "file") return "📎 " + (m.fileName || "");
    return (m.text || "").slice(0, 80);
  }
  function chatMessageSenderLabel(m, sheet) {
    if (m.phone === myPhoneNumber) return tr("chatYou");
    return resolveMemberName(sheet, m.phone);
  }
  function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function renderMessageTextWithMentions(container, text, sheet) {
    var names = ((sheet && sheet.members) || [])
      .map(function (p) { return resolveMemberName(sheet, p) !== p ? resolveMemberName(sheet, p) : null; })
      .filter(function (n) { return n; });
    names = Array.from(new Set(names)).sort(function (a, b) { return b.length - a.length; });
    if (!names.length) { container.textContent = text; return; }
    // No trailing \b: JS regex word-boundaries are ASCII-only, so a
    // Hebrew/Arabic name followed by a space or punctuation (neither side
    // being a \w character) would never register as a boundary and the
    // match would silently fail. Longest-name-first ordering above already
    // prevents a shorter name that's a prefix of a longer one from
    // matching too eagerly, so no boundary assertion is needed here.
    var re = new RegExp("@(" + names.map(escapeRegExp).join("|") + ")", "g");
    var lastIndex = 0, match, any = false;
    while ((match = re.exec(text))) {
      any = true;
      if (match.index > lastIndex) container.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      var span = document.createElement("span");
      span.className = "chat-mention";
      span.textContent = match[0];
      container.appendChild(span);
      lastIndex = re.lastIndex;
    }
    if (!any) { container.textContent = text; return; }
    if (lastIndex < text.length) container.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  function isChatScrolledNearBottom() {
    return (chatMessages.scrollHeight - chatMessages.scrollTop - chatMessages.clientHeight) < 120;
  }
  function updateChatScrollButton() {
    chatScrollBottomBtn.hidden = isChatScrolledNearBottom();
  }

  function renderChatMessages() {
    var sheet = sharedSheets.find(function (s) { return s.id === activeChatSheetId; });
    var messages = (sheet && sheet.messages) || [];
    // Always jump to the bottom right after actually opening the chat (or
    // on a genuinely empty container), rather than trusting whatever
    // scrollTop this element was left at from the last time this chat was
    // open. Once the chat is actually open, fall back to the real current
    // scroll position so a background poll refresh doesn't yank someone
    // reading history.
    var wasNearBottom = chatForceScrollNext || !chatMessagesInner.children.length || isChatScrolledNearBottom();
    chatForceScrollNext = false;
    chatMessagesInner.innerHTML = "";
    if (!messages.length) {
      var empty = document.createElement("div");
      empty.className = "chat-empty";
      empty.textContent = tr("chatEmptyPrompt");
      chatMessagesInner.appendChild(empty);
      return;
    }
    var lastDay = null;
    messages.forEach(function (m, i) {
      var day = new Date(m.ts).toDateString();
      if (day !== lastDay) {
        var sep = document.createElement("div");
        sep.className = "chat-day-sep";
        sep.textContent = chatDayLabel(m.ts);
        chatMessagesInner.appendChild(sep);
        lastDay = day;
      }
      if (m.type === "system") {
        var sysEl = document.createElement("div");
        sysEl.className = "chat-system-msg";
        sysEl.textContent = systemMessageText(m, sheet, true);
        chatMessagesInner.appendChild(sysEl);
        return;
      }
      var isMine = m.phone === myPhoneNumber;
      var prev = messages[i - 1];
      var isStart = day !== (prev ? new Date(prev.ts).toDateString() : null) || !prev || prev.phone !== m.phone;
      var bubble = document.createElement("div");
      bubble.className = "chat-bubble " + (isMine ? "chat-bubble-mine" : "chat-bubble-theirs") + (isStart ? " chat-bubble-start" : "");
      bubble.dataset.msgId = m.id;
      var replyIcon = document.createElement("span");
      replyIcon.className = "chat-bubble-reply-icon";
      replyIcon.textContent = "↩";
      bubble.appendChild(replyIcon);
      if (!isMine) {
        var colorIdx = contactColorIndex(m.phone);
        bubble.style.setProperty("--bubble-bg", "var(--contact-bg-" + colorIdx + ")");
        bubble.style.setProperty("--sender-color", "var(--contact-name-" + colorIdx + ")");
      }
      if (isStart && !isMine) {
        var senderEl = document.createElement("div");
        senderEl.className = "chat-bubble-sender";
        senderEl.textContent = resolveMemberName(sheet, m.phone);
        bubble.appendChild(senderEl);
      }
      if (m.replyTo) {
        var quoteEl = document.createElement("div");
        quoteEl.className = "chat-bubble-quote";
        var quoteSenderEl = document.createElement("span");
        quoteSenderEl.className = "chat-bubble-quote-sender";
        quoteSenderEl.textContent = m.replyTo.senderName;
        var quoteTextEl = document.createElement("span");
        quoteTextEl.className = "chat-bubble-quote-text";
        quoteTextEl.textContent = m.replyTo.text;
        quoteEl.appendChild(quoteSenderEl);
        quoteEl.appendChild(quoteTextEl);
        quoteEl.addEventListener("click", function (e) {
          e.stopPropagation();
          if (m.replyTo && m.replyTo.taskId) {
            var quotedSheetId = activeChatSheetId;
            state.viewMode = "tasks";
            navigateToTaskLink(quotedSheetId, m.replyTo.taskDate, m.replyTo.taskId, false);
            render();
            return;
          }
          var target = m.replyTo && chatMessagesInner.querySelector('[data-msg-id="' + m.replyTo.id + '"]');
          if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        bubble.appendChild(quoteEl);
      }
      var textEl = document.createElement("div");
      if (m.type === "voice") {
        textEl.className = "chat-bubble-voice";
        var audioEl = document.createElement("audio");
        audioEl.controls = true;
        audioEl.preload = "none";
        audioEl.src = m.audioUrl;
        textEl.appendChild(audioEl);
      } else if (m.type === "file") {
        var isImg = /^image\//.test(m.fileType || "");
        if (isImg) {
          textEl.className = "chat-bubble-image";
          var imgEl = document.createElement("img");
          imgEl.src = m.fileUrl;
          imgEl.alt = m.fileName || "";
          imgEl.addEventListener("click", function () { openChatFile(m); });
          textEl.appendChild(imgEl);
        } else {
          textEl.className = "chat-bubble-file";
          var fileIcon = document.createElement("div");
          fileIcon.className = "chat-bubble-file-icon";
          fileIcon.textContent = "📄";
          textEl.appendChild(fileIcon);
          var fileInfo = document.createElement("div");
          fileInfo.className = "chat-bubble-file-info";
          var fileNameEl = document.createElement("div");
          fileNameEl.className = "chat-bubble-file-name";
          fileNameEl.textContent = m.fileName || "";
          fileInfo.appendChild(fileNameEl);
          var fileSizeEl = document.createElement("div");
          fileSizeEl.className = "chat-bubble-file-size";
          fileSizeEl.textContent = formatFileSize(m.fileSize);
          fileInfo.appendChild(fileSizeEl);
          textEl.appendChild(fileInfo);
          // tapping the file itself opens it (not only the ⬇ button)
          textEl.style.cursor = "pointer";
          textEl.addEventListener("click", function () { openChatFile(m); });
        }
        var downloadBtn = document.createElement("button");
        downloadBtn.type = "button";
        downloadBtn.className = "chat-bubble-download-btn";
        downloadBtn.textContent = "⬇";
        downloadBtn.title = tr("libraryAddBtnTitle");
        downloadBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          saveChatFileToLibrary(activeChatSheetId, m);
        });
        textEl.appendChild(downloadBtn);
      } else {
        textEl.className = "chat-bubble-text";
        renderMessageTextWithMentions(textEl, m.text, sheet);
      }
      bubble.appendChild(textEl);
      var timeEl = document.createElement("div");
      timeEl.className = "chat-bubble-time";
      var timeValueEl = document.createElement("span");
      timeValueEl.className = "chat-bubble-time-value";
      timeValueEl.textContent = new Date(m.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      timeEl.appendChild(timeValueEl);
      if (m.edited) {
        var editedEl = document.createElement("span");
        editedEl.className = "chat-bubble-edited-mark";
        editedEl.textContent = tr("chatMsgEditedMark");
        timeEl.appendChild(editedEl);
      }
      if (isMine) {
        var readBy = m.readBy || [m.phone];
        var readByOthers = readBy.some(function (p) { return p !== myPhoneNumber; });
        var checkEl = document.createElement("span");
        checkEl.className = "chat-bubble-check" + (readByOthers ? " chat-bubble-check-read" : "");
        checkEl.textContent = readByOthers ? "✓✓" : "✓";
        timeEl.appendChild(checkEl);
      }
      bubble.appendChild(timeEl);
      attachChatBubbleLongPress(bubble, m);
      attachChatBubbleSwipeReply(bubble, m, replyIcon);
      chatMessagesInner.appendChild(bubble);
    });
    if (wasNearBottom) chatMessages.scrollTop = chatMessages.scrollHeight;
    updateChatScrollButton();
  }

  // Opening a file (from the chat or the library). Images open in the
  // app's own full-screen viewer. Inside the Android app any other file is
  // saved to the app's cache and opened in the phone's own viewer for its
  // type (ItaskAlarm.openFile, app version 19+); an older app, or a phone
  // with no app for that type, gets the share sheet instead. In a browser
  // the link opens in a new tab.
  function fetchFileBlob(url) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.blob();
    });
  }
  function openFileUrl(url, fileName, fileType) {
    if (/^image\//.test(fileType || "")) { openImageViewer(url, fileName); return; }
    if (!capacitorShareAvailable) { window.open(url, "_blank"); return; }
    showToast(tr("chatFileOpeningMsg"));
    var name = sanitizeFileName(fileName || "file");
    fetchFileBlob(url).then(function (blob) {
      var type = fileType || blob.type;
      var canOpen = nativeTaskAlarmPlugin && typeof nativeTaskAlarmPlugin.openFile === "function";
      if (!canOpen) { attemptShare(blob, name, type); return; }
      return blobToBase64(blob).then(function (base64) {
        return window.Capacitor.Plugins.Filesystem.writeFile({ path: name, data: base64, directory: "CACHE" });
      }).then(function (written) {
        return nativeTaskAlarmPlugin.openFile({ path: written.uri, mimeType: type });
      }).catch(function () {
        attemptShare(blob, name, type);
      });
    }).catch(function () {
      alert(tr("chatFileOpenError"));
    });
  }
  function openChatFile(m) {
    openFileUrl(m.fileUrl, m.fileName, m.fileType);
  }

  var imageViewerOverlay = document.getElementById("imageViewerOverlay");
  var imageViewerImg = document.getElementById("imageViewerImg");
  // Two fingers zoom (about the point between them), one finger moves a
  // zoomed picture, a double tap zooms in / back out. A single tap on the
  // unzoomed picture, or ✕, closes it.
  var ivZoom = { s: 1, x: 0, y: 0 };
  var ivPointers = {};
  var ivGesture = null;
  var ivLastTap = 0;
  var ivCloseTimer = null;
  function ivApply() {
    var W = imageViewerOverlay.clientWidth, H = imageViewerOverlay.clientHeight;
    var maxX = Math.max(0, (imageViewerImg.offsetWidth * ivZoom.s - W) / 2);
    var maxY = Math.max(0, (imageViewerImg.offsetHeight * ivZoom.s - H) / 2);
    ivZoom.x = Math.max(-maxX, Math.min(maxX, ivZoom.x));
    ivZoom.y = Math.max(-maxY, Math.min(maxY, ivZoom.y));
    imageViewerImg.style.transform = "translate(" + ivZoom.x + "px," + ivZoom.y + "px) scale(" + ivZoom.s + ")";
  }
  // zoom to s keeping the screen point (px, py) still
  function ivZoomAt(s, px, py, from) {
    var r = imageViewerOverlay.getBoundingClientRect();
    var cx = px - r.left - r.width / 2, cy = py - r.top - r.height / 2;
    s = Math.max(1, Math.min(6, s));
    ivZoom.x = cx - (cx - from.x) * s / from.s;
    ivZoom.y = cy - (cy - from.y) * s / from.s;
    ivZoom.s = s;
    ivApply();
  }
  function openImageViewer(url, name) {
    ivZoom = { s: 1, x: 0, y: 0 };
    ivPointers = {};
    ivGesture = null;
    imageViewerImg.style.transform = "";
    imageViewerImg.src = url;
    imageViewerImg.alt = name || "";
    imageViewerOverlay.hidden = false;
  }
  function closeImageViewer() {
    clearTimeout(ivCloseTimer);
    imageViewerOverlay.hidden = true;
    imageViewerImg.removeAttribute("src");
  }
  imageViewerOverlay.querySelector(".image-viewer-close").addEventListener("click", function (e) {
    e.stopPropagation();
    closeImageViewer();
  });
  imageViewerOverlay.addEventListener("pointerdown", function (e) {
    if (e.target.closest(".image-viewer-close")) return;
    e.preventDefault();
    clearTimeout(ivCloseTimer);
    ivPointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(ivPointers);
    if (ids.length === 2) {
      var a = ivPointers[ids[0]], b = ivPointers[ids[1]];
      ivGesture = { pinch: true, d: Math.hypot(a.x - b.x, a.y - b.y) || 1, mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, from: Object.assign({}, ivZoom), moved: true };
    } else if (ids.length === 1) {
      ivGesture = { start: { x: e.clientX, y: e.clientY }, from: Object.assign({}, ivZoom), moved: false };
    }
  });
  imageViewerOverlay.addEventListener("pointermove", function (e) {
    if (!ivPointers[e.pointerId] || !ivGesture) return;
    ivPointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(ivPointers);
    if (ivGesture.pinch && ids.length >= 2) {
      var a = ivPointers[ids[0]], b = ivPointers[ids[1]];
      var mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      var g = ivGesture.from;
      // zoom about the starting midpoint, then follow the fingers
      ivZoomAt(g.s * Math.hypot(a.x - b.x, a.y - b.y) / ivGesture.d, ivGesture.mid.x, ivGesture.mid.y, g);
      ivZoom.x += mid.x - ivGesture.mid.x;
      ivZoom.y += mid.y - ivGesture.mid.y;
      ivApply();
    } else if (!ivGesture.pinch) {
      var dx = e.clientX - ivGesture.start.x, dy = e.clientY - ivGesture.start.y;
      if (Math.hypot(dx, dy) > 8) ivGesture.moved = true;
      if (ivZoom.s > 1) {
        ivZoom.x = ivGesture.from.x + dx;
        ivZoom.y = ivGesture.from.y + dy;
        ivApply();
      }
    }
  });
  function ivPointerEnd(e) {
    if (!ivPointers[e.pointerId]) return;
    delete ivPointers[e.pointerId];
    var left = Object.keys(ivPointers);
    var g = ivGesture;
    if (left.length === 1 && g && g.pinch) {
      // one finger stays down after a pinch: carry on moving with it
      var p = ivPointers[left[0]];
      ivGesture = { start: { x: p.x, y: p.y }, from: Object.assign({}, ivZoom), moved: true };
      return;
    }
    if (left.length) return;
    ivGesture = null;
    if (!g || g.moved || g.pinch || e.type === "pointercancel") return;
    var now = Date.now();
    if (now - ivLastTap < 320) {
      ivLastTap = 0;
      if (ivZoom.s > 1) { ivZoom = { s: 1, x: 0, y: 0 }; ivApply(); }
      else ivZoomAt(2.5, e.clientX, e.clientY, ivZoom);
      return;
    }
    ivLastTap = now;
    // a single tap: close, unless zoomed in (or a second tap follows)
    if (ivZoom.s === 1) ivCloseTimer = setTimeout(closeImageViewer, 330);
  }
  imageViewerOverlay.addEventListener("pointerup", ivPointerEnd);
  imageViewerOverlay.addEventListener("pointercancel", ivPointerEnd);

  // ⬇ asks which of the project's library folders to save into ("הורדות"
  // first, then the rest), then files a copy there.
  var chatSaveFolderOverlay = document.getElementById("chatSaveFolderOverlay");
  var chatSaveFolderList = document.getElementById("chatSaveFolderList");
  function saveChatFileToLibrary(sheetId, m) {
    var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
    if (!sheet || !supabaseClient) return;
    ensureLibraryFolders(sheet, function (folders) {
      chatSaveFolderList.innerHTML = "";
      var ordered = folders.filter(function (f) { return f.key === "downloads"; })
        .concat(folders.filter(function (f) { return f.key !== "downloads"; }));
      ordered.forEach(function (folder) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "📁 " + folderDisplayName(folder);
        btn.addEventListener("click", function () {
          chatSaveFolderOverlay.hidden = true;
          saveChatFileToFolder(sheet, m, folder);
        });
        chatSaveFolderList.appendChild(btn);
      });
      chatSaveFolderOverlay.hidden = false;
    });
  }
  document.getElementById("chatSaveFolderCancelBtn").addEventListener("click", function () { chatSaveFolderOverlay.hidden = true; });
  chatSaveFolderOverlay.addEventListener("click", function (e) { if (e.target === chatSaveFolderOverlay) chatSaveFolderOverlay.hidden = true; });
  function saveChatFileToFolder(sheet, m, folder) {
    var fileName = m.fileName || "file";
    showToast(tr("chatFileSavingMsg"));
    fetchFileBlob(m.fileUrl).then(function (blob) {
      var path = sheet.id + "/" + folder.id + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: m.fileType || blob.type }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: m.fileType || blob.type || "", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folder.id, entry);
      });
    }).then(function () {
      showToast(tr("chatFileSavedToFolderMsg").replace("{folder}", folderDisplayName(folder)));
    }, function () {
      alert(tr("chatFileSaveError"));
    });
  }

  // The open chat checks every 5 seconds - first only its version stamp;
  // the messages themselves are read only when they've changed.
  var chatStamps = {}; // sheetId -> "messages_version|updated_at" last read
  function refreshActiveChat() {
    if (!activeChatSheetId || !supabaseClient) return;
    var sheetId = activeChatSheetId;
    supabaseClient.from(SHARED_TABLE).select("messages_version, updated_at").eq("id", sheetId).maybeSingle()
      .then(function (light) {
        var row = light && light.data;
        if (!row) return null;
        var stamp = row.messages_version + "|" + row.updated_at;
        if (chatStamps[sheetId] === stamp) return null;
        return supabaseClient.from(SHARED_TABLE).select("messages, messages_version, updated_at").eq("id", sheetId).maybeSingle().then(function (result) {
          if (result && result.data) chatStamps[sheetId] = result.data.messages_version + "|" + result.data.updated_at;
          return result;
        });
      })
      .then(function (result) {
        if (!result || sheetId !== activeChatSheetId) return;
        var messages = (result && result.data && result.data.messages) || [];
        var sheet = sharedSheets.find(function (s) { return s.id === activeChatSheetId; });
        if (sheet) sheet.messages = messages;
        renderChatMessages();
        markChatRead(sheet);
        markMessagesReadOnServer(activeChatSheetId);
      }, function () {});
  }

  // Generic safe read-modify-write for a shared project's `messages` column,
  // version-gated the same way updateSharedSheetDataSafely guards `data` -
  // a write only lands if messages_version still matches what was just
  // read, otherwise mutateFn is retried against a fresh read instead of
  // blindly overwriting whatever another member's send/edit/delete just
  // landed in between. mutateFn may return null to mean "nothing to write"
  // (e.g. a read-receipt update that finds there's nothing new to mark).
  function updateSharedMessagesSafely(sheetId, mutateFn, triesLeft) {
    if (triesLeft == null) triesLeft = 4;
    return supabaseClient.from(SHARED_TABLE).select("messages, messages_version").eq("id", sheetId).maybeSingle().then(function (result) {
      if (result && result.error) throw result.error;
      var row = result && result.data;
      var currentMessages = (row && row.messages) || [];
      var currentVersion = (row && row.messages_version) || 1;
      var updated = mutateFn(currentMessages);
      if (updated === null) return null;
      return supabaseClient.from(SHARED_TABLE)
        .update({ messages: updated, messages_version: currentVersion + 1 })
        .eq("id", sheetId).eq("messages_version", currentVersion)
        .select("id")
        .then(function (updateResult) {
          if (updateResult && updateResult.error) throw updateResult.error;
          var affected = (updateResult && updateResult.data) || [];
          if (!affected.length) {
            if (triesLeft > 0) return updateSharedMessagesSafely(sheetId, mutateFn, triesLeft - 1);
            throw new Error("shared messages update conflict: too many retries");
          }
          return updated;
        });
    });
  }

  // Marks every incoming message not yet attributed to me in its readBy
  // list as read (drives the sent/read checkmarks on the SENDER's side).
  // Only issues a write when something actually needs updating.
  function markMessagesReadOnServer(sheetId) {
    if (!supabaseClient || !myPhoneNumber) return;
    var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
    if (!sheet) return;
    var needsUpdate = (sheet.messages || []).some(function (m) {
      return m.type !== "system" && m.phone !== myPhoneNumber && (m.readBy || [m.phone]).indexOf(myPhoneNumber) === -1;
    });
    if (!needsUpdate) return;
    updateSharedMessagesSafely(sheetId, function (current) {
      var changed = false;
      var updated = current.map(function (m) {
        if (m.type === "system" || m.phone === myPhoneNumber) return m;
        var readBy = m.readBy || [m.phone];
        if (readBy.indexOf(myPhoneNumber) !== -1) return m;
        changed = true;
        return Object.assign({}, m, { readBy: readBy.concat([myPhoneNumber]) });
      });
      return changed ? updated : null;
    }).then(function (updated) {
      if (!updated) return;
      var liveSheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (liveSheet) liveSheet.messages = updated;
      if (activeChatSheetId === sheetId) renderChatMessages();
    }, function () {});
  }

  function openChatView() {
    var sheet = activeSheet();
    if (!sheet || !sheet.shared) return;
    // No-op if already open for this exact sheet (the footer's chat icon
    // stays reachable now that chat is inline, unlike the old full-screen
    // overlay that covered the footer) - avoids stacking a second poll
    // interval on a redundant tap.
    if (state.viewMode === "chat" && activeChatSheetId === sheet.id) return;
    activeChatSheetId = sheet.id;
    chatForceScrollNext = true;
    state.viewMode = "chat";
    state.menuOpen = false;
    // Show the view BEFORE rendering into it: #chatMessages has no layout
    // at all while chatView is still hidden (display:none), so forcing
    // scrollTop to the bottom during that render would be a silent no-op -
    // render() unhides chatView before its chatMode branch calls
    // renderChatMessages(), so this ordering still holds.
    render();
    markChatRead(sheet);
    markMessagesReadOnServer(sheet.id);
    refreshActiveChat();
    loadDeviceContactsIfNeeded();
    chatPollTimer = setInterval(refreshActiveChat, 5000);
    // no keyboard until the writing box is tapped
    if (document.activeElement === chatInput) chatInput.blur();
  }
  // Tears down chat's own transient state (recording/editing/replying/
  // mention popup/poll timer) - called from render() itself (see its top,
  // below) the moment state.viewMode moves away from "chat", whichever of
  // the footer icons, a sheet-tab switch, or anything else caused that, so
  // there's one single place this cleanup can't be forgotten rather than
  // every navigation entry point needing to remember to call it.
  function teardownChatView() {
    if (activeRecorder) stopVoiceRecording(false);
    if (editingChatMessageId) cancelEditingChatMessage();
    if (pendingChatReplyTo) cancelChatReply();
    hideMentionPopup();
    activeChatSheetId = null;
    clearInterval(chatPollTimer);
  }
  chatBtn.addEventListener("click", openChatView);

  // Task long-press -> chat-with-arrow button: opens this shared project's
  // chat with the task already quoted above the input (like a swiped
  // message), so the user just types their message about it. The quote
  // carries the task's id/date - tapping it in the chat jumps to the task.
  taskChatQuoteBtn.addEventListener("click", function () {
    var sheet = activeSheet();
    var task = sheet && sheet.tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    closeMoveTask();
    if (!task || !sheet.shared) return;
    // a failure in chat's side work (marking read, contacts...) mustn't
    // stop the quote from being set up
    try { openChatView(); } catch (err) { console.error(err); }
    if (state.viewMode !== "chat" || activeChatSheetId !== sheet.id) return;
    if (editingChatMessageId) cancelEditingChatMessage();
    var label = tr(task.type === "note" ? "chatQuoteNoteLabel" : "chatQuoteTaskLabel");
    if (task.date) label += " · " + task.date.split("-").reverse().slice(0, 2).join("/");
    var quote = { id: "task:" + task.id, taskId: task.id, taskDate: task.date || null,
      senderName: label, text: (task.text || "").slice(0, 300) };
    pendingChatReplyTo = quote;
    chatReplySender.textContent = quote.senderName;
    chatReplyText.textContent = quote.text;
    chatReplyBar.hidden = false;
    chatInput.focus();
  });

  // Fires an actual push notification to every other member's device (works
  // even if their app/browser isn't open), reusing the same push
  // infrastructure already deployed for task reminders. Fire-and-forget:
  // never let a notification failure disrupt the send flow itself.
  function triggerChatPushNotification(sheetId, text) {
    if (!supabaseClient || !supabaseClient.functions) return;
    var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
    var senderName = resolveMemberName(sheet, myPhoneNumber);
    try {
      supabaseClient.functions.invoke("send-chat-notification", {
        body: { sheetId: sheetId, senderPhone: myPhoneNumber, senderName: senderName, text: text }
      }).then(function () {}, function (err) {
        console.error("send-chat-notification failed:", err);
      });
    } catch (e) {}
  }

  function myDisplayNameIn(sheet) {
    return resolveMemberName(sheet, myPhoneNumber);
  }

  var SYSTEM_ACTION_KEYS = {
    added: "chatSysTaskAdded",
    deleted: "chatSysTaskDeleted",
    done: "chatSysTaskDone",
    undone: "chatSysTaskUndone"
  };
  // forSelf shows "You" for the acting member's own device (the in-app chat
  // view); push notification text always uses the real resolved name
  // instead, since it's composed on the ACTOR's device but read by every
  // OTHER recipient, who should never see "You did X" for someone else's
  // action.
  function systemMessageText(m, sheet, forSelf) {
    var key = SYSTEM_ACTION_KEYS[m.sysAction];
    if (!key) return "";
    var actorName = (forSelf && m.actorPhone === myPhoneNumber) ? tr("chatYou") : resolveMemberName(sheet, m.actorPhone || m.actorName);
    return tr(key).replace("{name}", m.taskName || "").replace("{actor}", actorName || "");
  }

  // sysAction/taskName/actorPhone are stored as structured data rather than
  // pre-rendered text, so each viewer's own language *and contacts* are
  // applied locally at render time (see systemMessageText) instead of
  // baking in whatever the acting member's app happened to show for
  // themselves when the action happened.
  function sendChatSystemMessage(sheetId, sysAction, taskName, actorPhone) {
    if (!supabaseClient || !sheetId) return;
    var msg = { id: uid(), type: "system", sysAction: sysAction, taskName: taskName, actorPhone: actorPhone, ts: Date.now() };
    updateSharedMessagesSafely(sheetId, function (current) {
      return current.concat([msg]).slice(-200);
    }).then(function (updated) {
      var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (sheet) sheet.messages = updated;
      if (activeChatSheetId === sheetId) renderChatMessages();
      triggerChatPushNotification(sheetId, systemMessageText(msg, sheet));
    }, function (err) {
      console.error("sendChatSystemMessage failed:", err);
    });
  }

  function sendChatMessage(sheetId, text, replyTo) {
    var trimmed = (text || "").trim();
    if (!trimmed || !supabaseClient) return Promise.resolve();
    var msg = { id: uid(), phone: myPhoneNumber, text: trimmed.slice(0, 500), ts: Date.now(), readBy: [myPhoneNumber] };
    if (replyTo) msg.replyTo = replyTo;
    return updateSharedMessagesSafely(sheetId, function (current) {
      return current.concat([msg]).slice(-200);
    }).then(function (updated) {
      var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (sheet) sheet.messages = updated;
      triggerChatPushNotification(sheetId, trimmed.slice(0, 500));
    });
  }

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = chatInput.value;
    if (!text.trim() || !activeChatSheetId) return;
    chatInput.value = "";
    hideMentionPopup();
    if (editingChatMessageId) {
      var msgId = editingChatMessageId;
      cancelEditingChatMessage();
      updateChatMessageText(activeChatSheetId, msgId, text).then(renderChatMessages);
    } else {
      var replyTo = pendingChatReplyTo;
      cancelChatReply();
      sendChatMessage(activeChatSheetId, text, replyTo).then(renderChatMessages);
    }
  });

  function sendChatVoiceMessage(sheetId, audioUrl, durationSec) {
    if (!audioUrl || !supabaseClient) return Promise.resolve();
    var msg = { id: uid(), phone: myPhoneNumber, type: "voice", audioUrl: audioUrl, duration: durationSec || 0, ts: Date.now(), readBy: [myPhoneNumber] };
    return updateSharedMessagesSafely(sheetId, function (current) {
      return current.concat([msg]).slice(-200);
    }).then(function (updated) {
      var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (sheet) sheet.messages = updated;
      triggerChatPushNotification(sheetId, tr("voiceMessageLabel"));
    });
  }

  var chatMicBtn = document.getElementById("chatMicBtn");
  var chatRecordingBar = document.getElementById("chatRecordingBar");
  var chatRecordingTime = document.getElementById("chatRecordingTime");
  var chatRecordingCancelBtn = document.getElementById("chatRecordingCancelBtn");
  var chatRecordingSendBtn = document.getElementById("chatRecordingSendBtn");
  var activeRecorder = null;
  var recordedChunks = [];
  var recordingStartedAt = 0;
  var recordingTimerInterval = null;

  function formatRecordingTime(ms) {
    var totalSec = Math.max(0, Math.floor(ms / 1000));
    var m = Math.floor(totalSec / 60);
    var s = totalSec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function startVoiceRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      alert(tr("voiceNotSupported"));
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      recordedChunks = [];
      var recorder;
      try { recorder = new MediaRecorder(stream); } catch (e) {
        stream.getTracks().forEach(function (t) { t.stop(); });
        alert(tr("voiceNotSupported"));
        return;
      }
      activeRecorder = recorder;
      recorder.addEventListener("dataavailable", function (e) {
        if (e.data && e.data.size > 0) recordedChunks.push(e.data);
      });
      recorder.addEventListener("stop", function () {
        stream.getTracks().forEach(function (t) { t.stop(); });
      });
      recorder.start();
      recordingStartedAt = Date.now();
      chatForm.hidden = true;
      chatRecordingBar.hidden = false;
      chatRecordingTime.textContent = "0:00";
      recordingTimerInterval = setInterval(function () {
        chatRecordingTime.textContent = formatRecordingTime(Date.now() - recordingStartedAt);
      }, 500);
    }, function () {
      alert(tr("voiceMicPermissionDenied"));
    });
  }

  function uploadAndSendVoiceMessage(blob, durationSec) {
    if (!activeChatSheetId || !supabaseClient) return;
    if (!blob.size) { alert(tr("voiceUploadError") + " (empty recording)"); return; }
    var ext = (blob.type && blob.type.indexOf("mp4") !== -1) ? "m4a" : "webm";
    var path = activeChatSheetId + "/voice/" + uid() + "." + ext;
    supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: blob.type || "audio/webm" })
      .then(function (result) {
        if (result.error) throw result.error;
        return resolveFileUrl(path);
      })
      .then(function (url) {
        return sendChatVoiceMessage(activeChatSheetId, url, durationSec);
      })
      .then(function () { renderChatMessages(); }, function (err) {
        console.error("voice message send failed:", err);
        alert(tr("voiceUploadError") + "\n" + ((err && (err.message || err.error || err.statusCode)) || JSON.stringify(err) || ""));
      });
  }

  function stopVoiceRecording(shouldSend) {
    clearInterval(recordingTimerInterval);
    chatRecordingBar.hidden = true;
    chatForm.hidden = false;
    var recorder = activeRecorder;
    activeRecorder = null;
    if (!recorder) return;
    var durationSec = Math.round((Date.now() - recordingStartedAt) / 1000);
    if (!shouldSend) {
      recorder.stop();
      return;
    }
    recorder.addEventListener("stop", function onStop() {
      recorder.removeEventListener("stop", onStop);
      var blob = new Blob(recordedChunks, { type: recorder.mimeType || "audio/webm" });
      uploadAndSendVoiceMessage(blob, durationSec);
    });
    recorder.stop();
  }

  chatMicBtn.addEventListener("click", startVoiceRecording);
  chatRecordingCancelBtn.addEventListener("click", function () { stopVoiceRecording(false); });
  chatRecordingSendBtn.addEventListener("click", function () { stopVoiceRecording(true); });

  var chatAttachBtn = document.getElementById("chatAttachBtn");
  var chatFileInput = document.getElementById("chatFileInput");
  chatAttachBtn.addEventListener("click", function () { chatFileInput.click(); });
  chatFileInput.addEventListener("change", function () {
    var file = chatFileInput.files && chatFileInput.files[0];
    chatFileInput.value = "";
    if (file) uploadAndSendChatFile(file);
  });

  function uploadAndSendChatFile(file) {
    if (!activeChatSheetId || !supabaseClient) return;
    var path = activeChatSheetId + "/files/" + uid() + "-" + safeStorageFileName(file.name);
    supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, file)
      .then(function (result) {
        if (result.error) throw result.error;
        return resolveFileUrl(path);
      })
      .then(function (url) {
        return sendChatFileMessage(activeChatSheetId, url, file.name, file.type || "", file.size || 0);
      })
      .then(function () { renderChatMessages(); }, function () { alert(tr("chatFileUploadError")); });
  }

  function sendChatFileMessage(sheetId, fileUrl, fileName, fileType, fileSize) {
    if (!fileUrl || !supabaseClient) return Promise.resolve();
    return supabaseClient.from(SHARED_TABLE).select("messages").eq("id", sheetId).maybeSingle()
      .then(function (result) {
        var current = (result && result.data && result.data.messages) || [];
        var msg = { id: uid(), phone: myPhoneNumber, type: "file", fileUrl: fileUrl, fileName: fileName, fileType: fileType, fileSize: fileSize, ts: Date.now(), readBy: [myPhoneNumber] };
        var updated = current.concat([msg]).slice(-200);
        return supabaseClient.from(SHARED_TABLE).update({ messages: updated, updated_at: new Date().toISOString() }).eq("id", sheetId)
          .then(function () {
            var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
            if (sheet) sheet.messages = updated;
            triggerChatPushNotification(sheetId, "📎 " + fileName);
          });
      });
  }

  var chatMsgActionOverlay = document.getElementById("chatMsgActionOverlay");
  var chatMsgEditBtn = document.getElementById("chatMsgEditBtn");
  var chatMsgDeleteBtn = document.getElementById("chatMsgDeleteBtn");
  var chatMsgActionCancelBtn = document.getElementById("chatMsgActionCancelBtn");
  var chatEditingBar = document.getElementById("chatEditingBar");
  var chatEditingCancelBtn = document.getElementById("chatEditingCancelBtn");
  var chatReplyBar = document.getElementById("chatReplyBar");
  var chatReplySender = document.getElementById("chatReplySender");
  var chatReplyText = document.getElementById("chatReplyText");
  var chatReplyCancelBtn = document.getElementById("chatReplyCancelBtn");
  var chatScrollBottomBtn = document.getElementById("chatScrollBottomBtn");
  var chatMentionPopup = document.getElementById("chatMentionPopup");
  var pendingChatActionMessage = null;
  var pendingChatReplyTo = null;
  var editingChatMessageId = null;
  var chatLongPressTimer = null;

  function startChatReply(message) {
    var sheet = sharedSheets.find(function (s) { return s.id === activeChatSheetId; });
    pendingChatReplyTo = { id: message.id, senderName: chatMessageSenderLabel(message, sheet), text: chatMessagePreviewText(message) };
    chatReplySender.textContent = pendingChatReplyTo.senderName;
    chatReplyText.textContent = pendingChatReplyTo.text;
    chatReplyBar.hidden = false;
    chatInput.focus();
  }
  function cancelChatReply() {
    pendingChatReplyTo = null;
    chatReplyBar.hidden = true;
  }
  chatReplyCancelBtn.addEventListener("click", cancelChatReply);

  chatMessages.addEventListener("scroll", updateChatScrollButton);
  chatScrollBottomBtn.addEventListener("click", function () {
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: "smooth" });
  });

  // "@" mention autocomplete: shows the OTHER members of this shared
  // project (by their known display name) whenever the text typed since
  // the last "@" (with no space in between) matches the start of one.
  function activeMentionQuery() {
    var pos = chatInput.selectionStart || chatInput.value.length;
    var uptoCursor = chatInput.value.slice(0, pos);
    var at = uptoCursor.lastIndexOf("@");
    if (at === -1) return null;
    var query = uptoCursor.slice(at + 1);
    if (/\s/.test(query)) return null;
    return { at: at, query: query };
  }
  function hideMentionPopup() {
    chatMentionPopup.hidden = true;
    chatMentionPopup.innerHTML = "";
  }
  function insertMention(at, query, name) {
    var before = chatInput.value.slice(0, at);
    var after = chatInput.value.slice(at + 1 + query.length);
    chatInput.value = before + "@" + name + " " + after;
    var cursorPos = (before + "@" + name + " ").length;
    chatInput.focus();
    chatInput.setSelectionRange(cursorPos, cursorPos);
    hideMentionPopup();
  }
  function updateMentionPopup() {
    var sheet = sharedSheets.find(function (s) { return s.id === activeChatSheetId; });
    var m = activeMentionQuery();
    if (!m || !sheet) { hideMentionPopup(); return; }
    var q = m.query.toLowerCase();
    var candidates = (sheet.members || [])
      .filter(function (p) { return p !== myPhoneNumber; })
      .map(function (p) { return resolveMemberName(sheet, p); })
      .filter(function (name, idx, arr) { return arr.indexOf(name) === idx && name.toLowerCase().indexOf(q) !== -1; });
    if (!candidates.length) { hideMentionPopup(); return; }
    chatMentionPopup.innerHTML = "";
    candidates.forEach(function (name) {
      var item = document.createElement("button");
      item.type = "button";
      item.className = "chat-mention-item";
      item.textContent = name;
      item.addEventListener("click", function () { insertMention(m.at, m.query, name); });
      chatMentionPopup.appendChild(item);
    });
    chatMentionPopup.hidden = false;
  }
  chatInput.addEventListener("input", updateMentionPopup);
  chatInput.addEventListener("click", updateMentionPopup);
  chatInput.addEventListener("blur", function () {
    setTimeout(hideMentionPopup, 150);
  });

  function attachChatBubbleLongPress(bubbleEl, message) {
    var startX = 0, startY = 0, fired = false;
    var start = function (e) {
      var pt = e.touches ? e.touches[0] : e;
      startX = pt.clientX; startY = pt.clientY; fired = false;
      clearTimeout(chatLongPressTimer);
      chatLongPressTimer = setTimeout(function () {
        fired = true;
        openChatMessageActionModal(message);
      }, 550);
    };
    var cancel = function () { clearTimeout(chatLongPressTimer); };
    var move = function (e) {
      var pt = e.touches ? e.touches[0] : e;
      if (Math.abs(pt.clientX - startX) > 10 || Math.abs(pt.clientY - startY) > 10) cancel();
    };
    bubbleEl.addEventListener("mousedown", start);
    bubbleEl.addEventListener("mouseup", cancel);
    bubbleEl.addEventListener("mouseleave", cancel);
    bubbleEl.addEventListener("mousemove", move);
    bubbleEl.addEventListener("touchstart", start, { passive: true });
    bubbleEl.addEventListener("touchend", cancel);
    bubbleEl.addEventListener("touchmove", move, { passive: true });
  }

  // Swipe-to-quote: dragging a bubble sideways past a threshold starts a
  // reply/quote of it (replacing the earlier long-press "quote" action, per
  // feedback that it should be a drag gesture instead). touch-action: pan-y
  // on .chat-bubble (see CSS) lets the browser keep handling vertical list
  // scrolling natively while this handles the horizontal axis itself.
  var CHAT_SWIPE_THRESHOLD = 50;
  var CHAT_SWIPE_MAX = 70;
  function attachChatBubbleSwipeReply(bubbleEl, message, replyIcon) {
    var startX = 0, startY = 0, dragging = false;
    var start = function (e) {
      var pt = e.touches ? e.touches[0] : e;
      startX = pt.clientX; startY = pt.clientY;
      dragging = false;
    };
    var move = function (e) {
      var pt = e.touches ? e.touches[0] : e;
      var dx = pt.clientX - startX;
      var dy = pt.clientY - startY;
      if (!dragging) {
        if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.5) dragging = true;
        else return;
      }
      var capped = Math.max(-CHAT_SWIPE_MAX, Math.min(CHAT_SWIPE_MAX, dx));
      bubbleEl.style.transition = "none";
      bubbleEl.style.transform = "translateX(" + capped + "px)";
      replyIcon.style.opacity = String(Math.min(1, Math.abs(dx) / CHAT_SWIPE_THRESHOLD));
      replyIcon.style.left = capped > 0 ? "-26px" : "";
      replyIcon.style.right = capped < 0 ? "-26px" : "";
    };
    var end = function (e) {
      if (dragging) {
        var pt = (e.changedTouches && e.changedTouches[0]) || e;
        var dx = Math.max(-CHAT_SWIPE_MAX, Math.min(CHAT_SWIPE_MAX, pt.clientX - startX));
        bubbleEl.style.transition = "transform 0.2s ease";
        bubbleEl.style.transform = "translateX(0)";
        replyIcon.style.opacity = "0";
        if (Math.abs(dx) >= CHAT_SWIPE_THRESHOLD) startChatReply(message);
      }
      dragging = false;
    };
    bubbleEl.addEventListener("mousedown", start);
    bubbleEl.addEventListener("mousemove", move);
    bubbleEl.addEventListener("mouseup", end);
    bubbleEl.addEventListener("mouseleave", function (e) { if (dragging) end(e); });
    bubbleEl.addEventListener("touchstart", start, { passive: true });
    bubbleEl.addEventListener("touchmove", move, { passive: true });
    bubbleEl.addEventListener("touchend", end);
  }

  function openChatMessageActionModal(message) {
    pendingChatActionMessage = message;
    var isMine = message.phone === myPhoneNumber;
    chatMsgEditBtn.hidden = !isMine || message.type === "voice" || message.type === "file";
    chatMsgDeleteBtn.hidden = !isMine;
    chatMsgActionOverlay.hidden = false;
  }
  function closeChatMessageActionModal() {
    chatMsgActionOverlay.hidden = true;
    pendingChatActionMessage = null;
  }
  chatMsgActionCancelBtn.addEventListener("click", closeChatMessageActionModal);
  chatMsgActionOverlay.addEventListener("click", function (e) {
    if (e.target === chatMsgActionOverlay) closeChatMessageActionModal();
  });

  function deleteChatMessage(sheetId, msgId) {
    if (!supabaseClient) return;
    updateSharedMessagesSafely(sheetId, function (current) {
      return current.filter(function (m) { return m.id !== msgId; });
    }).then(function (updated) {
      var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (sheet) sheet.messages = updated;
      renderChatMessages();
    });
  }

  function updateChatMessageText(sheetId, msgId, newText) {
    if (!supabaseClient) return Promise.resolve();
    return updateSharedMessagesSafely(sheetId, function (current) {
      return current.map(function (m) {
        if (m.id === msgId) return Object.assign({}, m, { text: newText.trim().slice(0, 500), edited: true });
        return m;
      });
    }).then(function (updated) {
      var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (sheet) sheet.messages = updated;
    });
  }

  function startEditingChatMessage(message) {
    editingChatMessageId = message.id;
    chatInput.value = message.text || "";
    chatEditingBar.hidden = false;
    chatInput.focus();
  }
  function cancelEditingChatMessage() {
    editingChatMessageId = null;
    chatInput.value = "";
    chatEditingBar.hidden = true;
  }
  chatEditingCancelBtn.addEventListener("click", cancelEditingChatMessage);

  chatMsgDeleteBtn.addEventListener("click", function () {
    var message = pendingChatActionMessage;
    closeChatMessageActionModal();
    if (!message) return;
    askConfirm(tr("chatMsgConfirmDelete"), function () {
      if (editingChatMessageId === message.id) cancelEditingChatMessage();
      deleteChatMessage(activeChatSheetId, message.id);
    });
  });
  chatMsgEditBtn.addEventListener("click", function () {
    var message = pendingChatActionMessage;
    closeChatMessageActionModal();
    if (message) startEditingChatMessage(message);
  });
  function copyChatMessageText(message) {
    var text = chatMessagePreviewText(message);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(tr("chatMsgCopiedMsg"));
      }, function () {
        showToast(tr("chatMsgCopyFailedMsg"));
      });
    } else {
      showToast(tr("chatMsgCopyFailedMsg"));
    }
  }
  chatMsgCopyBtn.addEventListener("click", function () {
    var message = pendingChatActionMessage;
    closeChatMessageActionModal();
    if (message) copyChatMessageText(message);
  });
  function convertChatMessageToTask(message) {
    var sheet = sharedSheets.find(function (s) { return s.id === activeChatSheetId; });
    if (!sheet) return;
    sheet.tasks.push({
      id: uid(),
      text: chatMessagePreviewText(message),
      status: 0,
      urgent: false,
      type: "task",
      date: todayISO(),
      createdAt: Date.now()
    });
    saveData();
    showToast(tr("chatMsgAddedAsTaskMsg"));
  }
  chatMsgToTaskBtn.addEventListener("click", function () {
    var message = pendingChatActionMessage;
    closeChatMessageActionModal();
    if (message) convertChatMessageToTask(message);
  });

  var LIBRARY_BUCKET = "project-files";

  // Supabase Storage rejects object keys containing non-ASCII characters
  // (e.g. Hebrew/Arabic file names) with "Invalid key" - the original name
  // is still kept as display metadata separately, only the storage path
  // itself needs to be safe.
  function safeStorageFileName(name) {
    var dot = name.lastIndexOf(".");
    var base = dot > 0 ? name.slice(0, dot) : name;
    var ext = dot > 0 ? name.slice(dot) : "";
    base = base.replace(/[^a-zA-Z0-9_-]+/g, "_").replace(/^_+|_+$/g, "");
    ext = ext.replace(/[^a-zA-Z0-9.]+/g, "");
    return (base || "file") + ext;
  }

  var libraryBtn = document.getElementById("libraryBtn");
  var archiveBtn = document.getElementById("archiveBtn");
  archiveBtn.addEventListener("click", function () { enterArchiveView(); });
  var libraryFoldersView = document.getElementById("libraryFoldersView");
  var libraryFoldersGrid = document.getElementById("libraryFoldersGrid");
  var libraryAddFolderBtn = document.getElementById("libraryAddFolderBtn");
  var libraryFolderNameOverlay = document.getElementById("libraryFolderNameOverlay");
  var libraryFolderNameInput = document.getElementById("libraryFolderNameInput");
  var libraryFolderNameOkBtn = document.getElementById("libraryFolderNameOkBtn");
  var libraryFolderNameCancelBtn = document.getElementById("libraryFolderNameCancelBtn");
  var libraryView = document.getElementById("libraryView");
  var libraryBackBtn = document.getElementById("libraryBackBtn");
  var libraryHeadTitle = document.getElementById("libraryHeadTitle");
  var libraryGrid = document.getElementById("libraryGrid");
  var libraryAddBtn = document.getElementById("libraryAddBtn");
  var libraryFileInput = document.getElementById("libraryFileInput");
  var activeLibrarySheetId = null;
  var activeLibraryFolderId = null;

  // Built-in folders: present in every project (added to older ones on the
  // next library open) and can't be deleted.
  var DEFAULT_LIBRARY_FOLDER_KEYS = ["plans", "photos", "diaries", "reports", "procurementOrders", "attendanceReports", "toolsReports", "downloads"];
  var LIBRARY_FOLDER_KEY_LABELS = {
    plans: "libraryFolderPlans",
    photos: "libraryFolderPhotos",
    diaries: "libraryFolderDiaries",
    reports: "libraryFolderReports",
    general: "libraryFolderGeneral",
    procurementOrders: "libraryFolderProcurementOrders",
    attendanceReports: "libraryFolderAttendanceReports",
    toolsReports: "libraryFolderToolsReports",
    downloads: "libraryFolderDownloads"
  };

  function buildDefaultLibraryFolders(legacyFiles) {
    var folders = DEFAULT_LIBRARY_FOLDER_KEYS.map(function (key) {
      return { id: uid(), key: key, name: null, files: [] };
    });
    if (legacyFiles && legacyFiles.length) {
      folders.push({ id: uid(), key: "general", name: null, files: legacyFiles });
    }
    return folders;
  }

  function folderDisplayName(folder) {
    if (folder.key && LIBRARY_FOLDER_KEY_LABELS[folder.key]) return tr(LIBRARY_FOLDER_KEY_LABELS[folder.key]);
    return folder.name || "";
  }

  // The bucket is private (see supabase/sql/enable_storage_rls.sql), so a
  // plain getPublicUrl() no longer serves real content - every file needs a
  // signed URL instead. Minting one requires the same storage.objects RLS
  // check as any other access (only the owning user or a shared project's
  // members can succeed), so an expiry this long is safe: it's not a
  // standing grant to anyone who merely has the link, it's simply how long
  // a link that already required a legitimate access check keeps working
  // afterward (matching how this app never re-checks membership on
  // already-loaded chat history either).
  var SIGNED_URL_EXPIRY_SECONDS = 60 * 60 * 24 * 365 * 10;
  function resolveFileUrl(path) {
    return supabaseClient.storage.from(LIBRARY_BUCKET).createSignedUrl(path, SIGNED_URL_EXPIRY_SECONDS).then(function (result) {
      if (result.error) throw result.error;
      return result.data.signedUrl;
    });
  }

  // One-time migration (safe to re-run every load - it's a no-op scan once
  // nothing matches): the bucket used to be public, so every stored
  // fileUrl/audioUrl/attachment.url was a "…/object/public/project-files/…"
  // link. Those stop resolving once the bucket goes private (see
  // enable_storage_rls.sql), so any still found get reissued as signed URLs
  // and written back - otherwise old chat attachments and site-log photos
  // would simply stop loading the moment that SQL is applied.
  function needsUrlMigration(url) {
    return typeof url === "string" && url.indexOf("/object/public/" + LIBRARY_BUCKET + "/") !== -1;
  }
  function pathFromPublicUrl(url) {
    var marker = "/object/public/" + LIBRARY_BUCKET + "/";
    var idx = url.indexOf(marker);
    return idx === -1 ? null : url.slice(idx + marker.length);
  }
  function migrateSiteLogAttachmentUrls(siteLogs) {
    var tasks = [];
    (siteLogs || []).forEach(function (log) {
      (log.works || []).forEach(function (w) {
        if (w.attachment && needsUrlMigration(w.attachment.url)) {
          var path = pathFromPublicUrl(w.attachment.url);
          if (path) tasks.push(resolveFileUrl(path).then(function (url) { w.attachment.url = url; }).catch(function () {}));
        }
      });
    });
    return Promise.all(tasks).then(function () { return tasks.length > 0; });
  }
  function migratePrivateSheetsFileUrls() {
    if (!supabaseClient) return;
    var perSheet = data.sheets.map(function (sheet) { return migrateSiteLogAttachmentUrls(sheet.siteLogs); });
    Promise.all(perSheet).then(function (results) {
      if (results.some(Boolean)) saveData();
    });
  }
  function migrateSharedSheetFileUrls(sheet) {
    if (!supabaseClient) return;
    var needsMessages = (sheet.messages || []).some(function (m) {
      return (m.type === "file" && needsUrlMigration(m.fileUrl)) || (m.type === "voice" && needsUrlMigration(m.audioUrl));
    });
    var needsSiteLogs = (sheet.siteLogs || []).some(function (log) {
      return (log.works || []).some(function (w) { return w.attachment && needsUrlMigration(w.attachment.url); });
    });
    if (!needsMessages && !needsSiteLogs) return;

    if (needsMessages) {
      supabaseClient.from(SHARED_TABLE).select("messages").eq("id", sheet.id).maybeSingle().then(function (result) {
        var current = (result && result.data && result.data.messages) || [];
        var tasks = [];
        current.forEach(function (m) {
          if (m.type === "file" && needsUrlMigration(m.fileUrl)) {
            var path = pathFromPublicUrl(m.fileUrl);
            if (path) tasks.push(resolveFileUrl(path).then(function (url) { m.fileUrl = url; }).catch(function () {}));
          } else if (m.type === "voice" && needsUrlMigration(m.audioUrl)) {
            var path2 = pathFromPublicUrl(m.audioUrl);
            if (path2) tasks.push(resolveFileUrl(path2).then(function (url) { m.audioUrl = url; }).catch(function () {}));
          }
        });
        return Promise.all(tasks).then(function () {
          return supabaseClient.from(SHARED_TABLE).update({ messages: current, updated_at: new Date().toISOString() }).eq("id", sheet.id);
        }).then(function () {
          sheet.messages = current;
          if (activeChatSheetId === sheet.id) renderChatMessages();
        });
      });
    }
    if (needsSiteLogs) {
      supabaseClient.from(SHARED_TABLE).select("data").eq("id", sheet.id).maybeSingle().then(function (result) {
        var currentData = (result && result.data && result.data.data) || {};
        var siteLogs = currentData.siteLogs || [];
        migrateSiteLogAttachmentUrls(siteLogs).then(function () {
          var updatedData = Object.assign({}, currentData, { siteLogs: siteLogs });
          return supabaseClient.from(SHARED_TABLE).update({ data: updatedData, updated_at: new Date().toISOString() }).eq("id", sheet.id);
        }).then(function () {
          sheet.siteLogs = siteLogs;
        });
      });
    }
  }
  function migrateAllSharedSheetsFileUrls() {
    sharedSheets.forEach(migrateSharedSheetFileUrls);
  }

  function isImageFile(entry) {
    return /^image\//.test(entry.type || "");
  }

  function formatFileSize(bytes) {
    if (!bytes) return "";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  // Generic safe read-modify-write for a shared project's `data` column
  // (tasks/reports/folders/siteLogs/ended/logoId), used by everything below
  // that touches shared-project data instead of any bespoke read-then-write.
  // mutateFn(freshData) must derive the new data purely from the FRESH copy
  // just read - never from a `sheet` object captured earlier - because:
  // (1) the background shared-sheets poll (every 20s, or on tab focus)
  //     replaces the whole sharedSheets array while a write can be in
  //     flight, orphaning any earlier reference, and
  // (2) data_version is checked-and-incremented on write (WHERE
  //     data_version = <version just read>): if another member's write
  //     landed in between, this update matches zero rows and mutateFn is
  //     called again against a fresh read, so a retry always reflects the
  //     latest server truth instead of blindly overwriting it.
  function updateSharedSheetDataSafely(sheetId, mutateFn, triesLeft) {
    if (triesLeft == null) triesLeft = 4;
    return supabaseClient.from(SHARED_TABLE).select("data, data_version").eq("id", sheetId).maybeSingle().then(function (result) {
      if (result && result.error) throw result.error;
      var row = result && result.data;
      var currentData = (row && row.data) || {};
      var currentVersion = (row && row.data_version) || 1;
      var newData = mutateFn(currentData);
      // keep fields this writer doesn't know about (e.g. officeDirectory,
      // written by Head Office) instead of dropping them
      Object.keys(currentData).forEach(function (k) {
        if (!(k in newData)) newData[k] = currentData[k];
      });
      return supabaseClient.from(SHARED_TABLE)
        .update({ data: newData, data_version: currentVersion + 1, updated_at: new Date().toISOString() })
        .eq("id", sheetId).eq("data_version", currentVersion)
        .select("id")
        .then(function (updateResult) {
          if (updateResult && updateResult.error) throw updateResult.error;
          var affected = (updateResult && updateResult.data) || [];
          if (!affected.length) {
            if (triesLeft > 0) return updateSharedSheetDataSafely(sheetId, mutateFn, triesLeft - 1);
            throw new Error("shared sheet data update conflict: too many retries");
          }
          return newData;
        });
    });
  }

  function applySharedLibraryFolders(sheetId, updateFoldersFn) {
    return updateSharedSheetDataSafely(sheetId, function (currentData) {
      return {
        tasks: currentData.tasks || [],
        reports: currentData.reports || [],
        files: [],
        folders: updateFoldersFn(currentData.folders || buildDefaultLibraryFolders(currentData.files)),
        siteLogs: currentData.siteLogs || [],
        ended: currentData.ended || false,
        endedDate: currentData.endedDate || null,
        logoId: currentData.logoId || null
      };
    }).then(function (updatedData) {
      var liveSheet = sharedSheets.find(function (s) { return s.id === sheetId; });
      if (liveSheet) liveSheet.folders = updatedData.folders;
      return updatedData.folders;
    });
  }

  // Returns a new folders array with any DEFAULT_LIBRARY_FOLDER_KEYS entry
  // that's missing appended, or null if nothing's missing - lets a key
  // added after a sheet's library was already bootstrapped (e.g. the
  // procurement/attendance/tools report folders, added long after "diaries"
  // etc.) still show up for projects created before that key existed,
  // instead of only ever being created lazily the first time its own
  // "send report" button happens to be used.
  function addMissingDefaultFolders(folders) {
    var missingKeys = DEFAULT_LIBRARY_FOLDER_KEYS.filter(function (key) {
      return !folders.some(function (f) { return f.key === key; });
    });
    if (!missingKeys.length) return null;
    return folders.concat(missingKeys.map(function (key) {
      return { id: uid(), key: key, name: null, files: [] };
    }));
  }

  // Lazily creates the default folders (and migrates any pre-existing flat
  // file list into a "General" folder) the first time a sheet's library is
  // opened, then keeps that set topped up on every later open too (see
  // addMissingDefaultFolders() above). Uses the same safe read-then-write
  // approach for shared sheets so a concurrent member never gets their real
  // folder clobbered by another client's bootstrap/migration.
  function ensureLibraryFolders(sheet, callback) {
    if (sheet.folders) {
      var migrated = addMissingDefaultFolders(sheet.folders);
      if (!migrated) { callback(sheet.folders); return; }
      if (sheet.shared) {
        applySharedLibraryFolders(sheet.id, function (liveFolders) {
          return addMissingDefaultFolders(liveFolders) || liveFolders;
        }).then(function (updated) { callback(updated); });
      } else {
        var liveSheetFast = data.sheets.find(function (s) { return s.id === sheet.id; });
        if (liveSheetFast) { liveSheetFast.folders = migrated; saveData(); }
        callback(migrated);
      }
      return;
    }
    if (!sheet.shared) {
      var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
      if (!liveSheet) { callback([]); return; }
      if (!liveSheet.folders) {
        liveSheet.folders = buildDefaultLibraryFolders(liveSheet.files);
        liveSheet.files = [];
        saveData();
      }
      callback(liveSheet.folders);
      return;
    }
    supabaseClient.from(SHARED_TABLE).select("data").eq("id", sheet.id).maybeSingle().then(function (result) {
      var currentData = (result && result.data && result.data.data) || {};
      if (currentData.folders) {
        var migratedShared = addMissingDefaultFolders(currentData.folders);
        if (migratedShared) {
          applySharedLibraryFolders(sheet.id, function (liveFolders) {
            return addMissingDefaultFolders(liveFolders) || liveFolders;
          }).then(function (updated) { callback(updated); });
          return;
        }
        var liveSheet = sharedSheets.find(function (s) { return s.id === sheet.id; });
        if (liveSheet) liveSheet.folders = currentData.folders;
        callback(currentData.folders);
        return;
      }
      // Only reaches the versioned write path when folders genuinely don't
      // exist yet - the fast path above never writes, so opening a library
      // that's already bootstrapped never bumps data_version or risks a
      // spurious conflict with a real concurrent edit.
      updateSharedSheetDataSafely(sheet.id, function (freshData) {
        return {
          tasks: freshData.tasks || [],
          reports: freshData.reports || [],
          files: [],
          folders: freshData.folders || buildDefaultLibraryFolders(freshData.files),
          siteLogs: freshData.siteLogs || [],
          ended: freshData.ended || false,
          endedDate: freshData.endedDate || null,
          logoId: freshData.logoId || null
        };
      }).then(function (updatedData) {
        var liveSheet = sharedSheets.find(function (s) { return s.id === sheet.id; });
        if (liveSheet) liveSheet.folders = updatedData.folders;
        callback(updatedData.folders);
      }, function () { callback(buildDefaultLibraryFolders(currentData.files)); });
    }, function () { callback([]); });
  }

  function renderLibraryFolders() {
    var sheet = allSheets().find(function (s) { return s.id === activeLibrarySheetId; });
    if (!sheet) return;
    ensureLibraryFolders(sheet, function (folders) {
      if (activeLibrarySheetId !== sheet.id || !libraryFoldersView || libraryFoldersView.hidden) return;
      libraryFoldersGrid.innerHTML = "";
      folders.forEach(function (folder) {
        if (folder.parentId) return; // a folder inside a folder shows in its parent
        libraryFoldersGrid.appendChild(buildLibraryFolderTile(sheet, folder));
      });
    });
  }

  // A folder's tile, on the library's first screen or inside its parent
  // folder. It's also where a dragged file can be dropped.
  function buildLibraryFolderTile(sheet, folder) {
    var item = document.createElement("div");
    item.className = "library-item library-folder-tile";
    item.setAttribute("data-folder-id", folder.id);

    var thumb = document.createElement("div");
    thumb.className = "library-item-thumb";
    thumb.textContent = "📁";
    item.appendChild(thumb);

    var nameEl = document.createElement("div");
    nameEl.className = "library-item-name";
    nameEl.textContent = folderDisplayName(folder);
    item.appendChild(nameEl);

    var folderLongPressFired = false;
    item.addEventListener("click", function () {
      if (folderLongPressFired) { folderLongPressFired = false; return; }
      openLibraryFolderView(sheet, folder);
    });

    // Deletable: any folder that isn't one of today's actual default
    // folders - covers both custom (keyless) folders and orphaned
    // folders left over from an old key (e.g. a stale "logs" folder
    // from before site logs were pointed at the "diaries" key), which
    // would otherwise be stuck undeletable with a blank display name
    // since LIBRARY_FOLDER_KEY_LABELS has no entry for it either.
    if (DEFAULT_LIBRARY_FOLDER_KEYS.indexOf(folder.key) === -1) {
      var delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "library-item-delete";
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        askConfirm(tr("libraryConfirmDeleteFolder"), function () {
          deleteLibraryFolder(sheet, folder);
        });
      });
      item.appendChild(delBtn);

      var folderPressStartX = 0, folderPressStartY = 0;
      var startFolderPress = function (e) {
        if (e.target.closest("button")) return;
        var point = e.touches ? e.touches[0] : e;
        folderPressStartX = point.clientX;
        folderPressStartY = point.clientY;
        folderLongPressFired = false;
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(function () {
          folderLongPressFired = true;
          openLibraryFolderActionModal(sheet, folder);
        }, 1000);
      };
      var cancelFolderPress = function () { clearTimeout(longPressTimer); };
      var moveFolderPress = function (e) {
        var point = e.touches ? e.touches[0] : e;
        if (Math.abs(point.clientX - folderPressStartX) > 10 || Math.abs(point.clientY - folderPressStartY) > 10) {
          cancelFolderPress();
        }
      };
      item.addEventListener("mousedown", startFolderPress);
      item.addEventListener("mouseup", cancelFolderPress);
      item.addEventListener("mouseleave", cancelFolderPress);
      item.addEventListener("mousemove", moveFolderPress);
      item.addEventListener("touchstart", startFolderPress, { passive: true });
      item.addEventListener("touchend", cancelFolderPress);
      item.addEventListener("touchmove", moveFolderPress, { passive: true });
    }
    return item;
  }

  // the folder and every folder inside it, however deep
  function libraryFolderAndInside(folders, folderId) {
    var ids = [folderId], grew = true;
    while (grew) {
      grew = false;
      folders.forEach(function (f) {
        if (f.parentId && ids.indexOf(f.parentId) >= 0 && ids.indexOf(f.id) < 0) { ids.push(f.id); grew = true; }
      });
    }
    return ids;
  }

  function deleteLibraryFolder(sheet, folder) {
    var sheetId = sheet.id;
    var isShared = !!sheet.shared;
    var all = sheet.folders || [folder];
    var gone = libraryFolderAndInside(all, folder.id);
    var paths = [];
    all.forEach(function (f) { if (gone.indexOf(f.id) >= 0) (f.files || []).forEach(function (x) { paths.push(x.path); }); });
    var removePromise = paths.length ? supabaseClient.storage.from(LIBRARY_BUCKET).remove(paths) : Promise.resolve();
    removePromise.then(function () {
      if (isShared) {
        return applySharedLibraryFolders(sheetId, function (folders) {
          var drop = libraryFolderAndInside(folders, folder.id);
          return folders.filter(function (f) { return drop.indexOf(f.id) < 0; });
        });
      }
      var liveSheet = data.sheets.find(function (s) { return s.id === sheetId; });
      if (liveSheet && liveSheet.folders) {
        var drop = libraryFolderAndInside(liveSheet.folders, folder.id);
        liveSheet.folders = liveSheet.folders.filter(function (f) { return drop.indexOf(f.id) < 0; });
        saveData();
      }
    }).then(function () {
      renderLibraryFolders();
      if (!libraryView.hidden) renderLibraryGrid();
    }, function () {
      alert(tr("libraryUploadError"));
    });
  }

  var libraryFolderActionOverlay = document.getElementById("libraryFolderActionOverlay");
  var libraryFolderActionDeleteBtn = document.getElementById("libraryFolderActionDeleteBtn");
  var libraryFolderActionCancelBtn = document.getElementById("libraryFolderActionCancelBtn");
  var pendingLibraryFolderAction = null;

  function openLibraryFolderActionModal(sheet, folder) {
    pendingLibraryFolderAction = { sheet: sheet, folder: folder };
    libraryFolderActionOverlay.hidden = false;
  }
  function closeLibraryFolderActionModal() {
    libraryFolderActionOverlay.hidden = true;
    pendingLibraryFolderAction = null;
  }
  libraryFolderActionDeleteBtn.addEventListener("click", function () {
    var pending = pendingLibraryFolderAction;
    closeLibraryFolderActionModal();
    if (!pending) return;
    askConfirm(tr("libraryConfirmDeleteFolder"), function () {
      deleteLibraryFolder(pending.sheet, pending.folder);
    });
  });
  libraryFolderActionCancelBtn.addEventListener("click", closeLibraryFolderActionModal);
  libraryFolderActionOverlay.addEventListener("click", function (e) {
    if (e.target === libraryFolderActionOverlay) closeLibraryFolderActionModal();
  });

  function renderLibraryGrid() {
    var sheet = allSheets().find(function (s) { return s.id === activeLibrarySheetId; });
    var folder = sheet && sheet.folders && sheet.folders.find(function (f) { return f.id === activeLibraryFolderId; });
    var files = (folder && folder.files) || [];
    var subfolders = folder ? sheet.folders.filter(function (f) { return f.parentId === folder.id; }) : [];
    libraryGrid.classList.toggle("library-grid-rows", !!folder && (isProcurementOrdersFolder(folder) || isAttendanceReportsFolder(folder) || isToolsReportsFolder(folder)));
    libraryGrid.innerHTML = "";
    subfolders.forEach(function (sub) { libraryGrid.appendChild(buildLibraryFolderTile(sheet, sub)); });
    if (!files.length && !subfolders.length) {
      var empty = document.createElement("div");
      empty.className = "library-empty";
      empty.textContent = tr("libraryEmptyPrompt");
      libraryGrid.appendChild(empty);
      return;
    }
    files.forEach(function (entry) {
      var item = document.createElement("div");
      item.className = "library-item";

      var thumb = document.createElement("div");
      thumb.className = "library-item-thumb";
      if (isImageFile(entry)) {
        var img = document.createElement("img");
        img.alt = "";
        resolveFileUrl(entry.path).then(function (url) { img.src = url; }).catch(function () {});
        thumb.appendChild(img);
      } else {
        thumb.textContent = "📄";
      }
      item.appendChild(thumb);

      var nameEl = document.createElement("div");
      nameEl.className = "library-item-name";
      nameEl.textContent = entry.name;
      item.appendChild(nameEl);

      var fileLongPressFired = false;
      item.addEventListener("click", function () {
        if (fileLongPressFired) { fileLongPressFired = false; return; }
        resolveFileUrl(entry.path).then(function (url) {
          // in the Android app window.open of a file link does nothing -
          // hand the file to the phone's share sheet (open / save) instead
          openFileUrl(url, entry.name, entry.type);
        }).catch(function () {
          alert(tr("libraryUploadError"));
        });
      });

      var delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "library-item-delete";
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        askConfirm(tr("libraryConfirmDelete"), function () {
          deleteLibraryFile(sheet, folder, entry);
        });
      });
      item.appendChild(delBtn);

      // Hold a file and it lifts: drag it onto a folder to move it there,
      // or let go where it is for the share / move / delete actions.
      attachLibraryFileDrag(item, folder, function (held) { fileLongPressFired = held; }, function (targetFolderId) {
        if (targetFolderId) moveLibraryFile(sheet, folder.id, entry, targetFolderId);
        else openLibraryFileActionModal(sheet, folder, entry);
      });

      libraryGrid.appendChild(item);
    });
  }

  function attachLibraryFileDrag(item, folder, onLift, onDone) {
    var start = null, lifted = false, ghost = null, over = null, timer = null;
    var pointOf = function (e) { return (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || e; };
    var stopMouse = function () {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", end);
    };
    var setOver = function (tile) {
      if (tile === over) return;
      if (over) over.classList.remove("library-drop-over");
      over = tile;
      if (over) over.classList.add("library-drop-over");
    };
    function begin(e) {
      if (e.target.closest("button") || (e.button != null && e.button !== 0 && !e.touches)) return;
      var p = pointOf(e);
      start = { x: p.clientX, y: p.clientY };
      lifted = false;
      onLift(false); // a fresh press: its own click counts again
      clearTimeout(timer);
      timer = setTimeout(function () {
        lifted = true;
        onLift(true);
        item.classList.add("library-item-lifted");
        if (navigator.vibrate) { try { navigator.vibrate(25); } catch (err) {} }
      }, 450);
      if (!e.touches) {
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", end);
      }
    }
    function move(e) {
      if (!start) return;
      var p = pointOf(e);
      var dist = Math.hypot(p.clientX - start.x, p.clientY - start.y);
      if (!lifted) {
        if (dist > 10) { clearTimeout(timer); start = null; stopMouse(); } // a scroll
        return;
      }
      if (e.cancelable) e.preventDefault();
      if (!ghost && dist > 8) {
        ghost = item.cloneNode(true);
        ghost.classList.remove("library-item-lifted");
        ghost.classList.add("library-drag-ghost");
        document.body.appendChild(ghost);
      }
      if (!ghost) return;
      ghost.style.left = (p.clientX - 42) + "px";
      ghost.style.top = (p.clientY - 42) + "px";
      var under = document.elementFromPoint(p.clientX, p.clientY);
      var tile = under && under.closest(".library-folder-tile");
      setOver(tile && tile.getAttribute("data-folder-id") !== folder.id ? tile : null);
    }
    function end(e) {
      clearTimeout(timer);
      stopMouse();
      if (!start) return;
      start = null;
      if (!lifted) return;
      item.classList.remove("library-item-lifted");
      var dragged = !!ghost, target = over && over.getAttribute("data-folder-id");
      if (ghost) { ghost.remove(); ghost = null; }
      setOver(null);
      if (e.type === "touchcancel") return;
      if (dragged && !target) return; // dropped nowhere: stays put
      onDone(target || null);
    }
    item.addEventListener("mousedown", begin);
    item.addEventListener("touchstart", begin, { passive: true });
    item.addEventListener("touchmove", move, { passive: false });
    item.addEventListener("touchend", end);
    item.addEventListener("touchcancel", end);
  }

  // Moves a file's entry from one folder to another (the stored file stays
  // where it is - only which folder lists it changes).
  function moveLibraryFile(sheet, fromId, entry, toId) {
    if (fromId === toId) return;
    var move = function (folders) {
      return folders.map(function (f) {
        if (f.id === fromId) return Object.assign({}, f, { files: (f.files || []).filter(function (x) { return x.id !== entry.id; }) });
        if (f.id === toId && !(f.files || []).some(function (x) { return x.id === entry.id; })) return Object.assign({}, f, { files: (f.files || []).concat([entry]) });
        return f;
      });
    };
    var done = function () {
      renderLibraryGrid();
      var to = (allSheets().find(function (s) { return s.id === sheet.id; }) || sheet).folders.find(function (f) { return f.id === toId; });
      if (to) showToast(tr("libraryMovedToFolder").replace("{folder}", folderDisplayName(to)));
    };
    if (sheet.shared) {
      applySharedLibraryFolders(sheet.id, move).then(done, function () { alert(tr("libraryUploadError")); });
      return;
    }
    var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
    if (!liveSheet || !liveSheet.folders) return;
    liveSheet.folders = move(liveSheet.folders);
    saveData();
    done();
  }
  // a folder's name with the folders it's inside: "תוכניות / חשמל"
  function libraryFolderPath(folders, folder) {
    var names = [folderDisplayName(folder)], f = folder, guard = 0;
    while (f.parentId && guard++ < 20) {
      f = folders.find(function (x) { return x.id === f.parentId; });
      if (!f) break;
      names.unshift(folderDisplayName(f));
    }
    return names.join(" / ");
  }
  var libraryMoveOverlay = document.getElementById("libraryMoveOverlay");
  var libraryMoveList = document.getElementById("libraryMoveList");
  function openLibraryMoveModal(sheet, folder, entry) {
    var folders = (allSheets().find(function (s) { return s.id === sheet.id; }) || sheet).folders || [];
    libraryMoveList.innerHTML = "";
    folders.map(function (f) { return { f: f, path: libraryFolderPath(folders, f) }; })
      .sort(function (x, y) { return x.path.localeCompare(y.path); })
      .forEach(function (row) {
        if (row.f.id === folder.id) return;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "📁 " + row.path;
        btn.addEventListener("click", function () {
          libraryMoveOverlay.hidden = true;
          moveLibraryFile(sheet, folder.id, entry, row.f.id);
        });
        libraryMoveList.appendChild(btn);
      });
    libraryMoveOverlay.hidden = false;
  }
  document.getElementById("libraryMoveCancelBtn").addEventListener("click", function () { libraryMoveOverlay.hidden = true; });
  libraryMoveOverlay.addEventListener("click", function (e) { if (e.target === libraryMoveOverlay) libraryMoveOverlay.hidden = true; });

  function deleteLibraryFile(sheet, folder, entry) {
    var sheetId = sheet.id;
    var folderId = folder.id;
    var isShared = !!sheet.shared;
    supabaseClient.storage.from(LIBRARY_BUCKET).remove([entry.path]).then(function () {
      if (isShared) {
        return applySharedLibraryFolders(sheetId, function (folders) {
          return folders.map(function (f) {
            if (f.id !== folderId) return f;
            return Object.assign({}, f, { files: (f.files || []).filter(function (x) { return x.id !== entry.id; }) });
          });
        });
      }
      var liveSheet = data.sheets.find(function (s) { return s.id === sheetId; });
      var liveFolder = liveSheet && liveSheet.folders && liveSheet.folders.find(function (f) { return f.id === folderId; });
      if (liveFolder) {
        liveFolder.files = (liveFolder.files || []).filter(function (f) { return f.id !== entry.id; });
        saveData();
      }
    }).then(function () {
      renderLibraryGrid();
    }, function () {
      alert(tr("libraryUploadError"));
    });
  }

  var libraryFileActionOverlay = document.getElementById("libraryFileActionOverlay");
  var libraryFileActionShareBtn = document.getElementById("libraryFileActionShareBtn");
  var libraryFileActionDeleteBtn = document.getElementById("libraryFileActionDeleteBtn");
  var libraryFileActionCancelBtn = document.getElementById("libraryFileActionCancelBtn");
  var pendingLibraryFileAction = null;

  function openLibraryFileActionModal(sheet, folder, entry) {
    pendingLibraryFileAction = { sheet: sheet, folder: folder, entry: entry };
    libraryFileActionOverlay.hidden = false;
  }
  function closeLibraryFileActionModal() {
    libraryFileActionOverlay.hidden = true;
    pendingLibraryFileAction = null;
  }
  function shareLibraryFile(entry) {
    resolveFileUrl(entry.path).then(function (url) {
      return fetch(url).then(function (r) { return r.blob(); });
    }).then(function (blob) {
      attemptShare(blob, entry.name, entry.type || blob.type);
    }).catch(function () {
      alert(tr("libraryUploadError"));
    });
  }
  libraryFileActionShareBtn.addEventListener("click", function () {
    var pending = pendingLibraryFileAction;
    closeLibraryFileActionModal();
    if (!pending) return;
    shareLibraryFile(pending.entry);
  });
  document.getElementById("libraryFileActionMoveBtn").addEventListener("click", function () {
    var pending = pendingLibraryFileAction;
    closeLibraryFileActionModal();
    if (pending) openLibraryMoveModal(pending.sheet, pending.folder, pending.entry);
  });
  libraryFileActionDeleteBtn.addEventListener("click", function () {
    var pending = pendingLibraryFileAction;
    closeLibraryFileActionModal();
    if (!pending) return;
    askConfirm(tr("libraryConfirmDelete"), function () {
      deleteLibraryFile(pending.sheet, pending.folder, pending.entry);
    });
  });
  libraryFileActionCancelBtn.addEventListener("click", closeLibraryFileActionModal);
  libraryFileActionOverlay.addEventListener("click", function (e) {
    if (e.target === libraryFileActionOverlay) closeLibraryFileActionModal();
  });

  function uploadLibraryFiles(fileList) {
    var initialSheet = allSheets().find(function (s) { return s.id === activeLibrarySheetId; });
    if (!initialSheet) return;
    var sheetId = initialSheet.id;
    var folderId = activeLibraryFolderId;
    var isShared = !!initialSheet.shared;
    if (!supabaseClient || !folderId) return;
    Array.prototype.slice.call(fileList).forEach(function (file) {
      var path = sheetId + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(file.name);
      supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, file).then(function (result) {
        if (result.error) throw result.error;
        var newEntry = {
          id: uid(),
          name: file.name,
          path: path,
          type: file.type || "",
          size: file.size || 0,
          uploadedAt: Date.now()
        };
        if (isShared) {
          return applySharedLibraryFolders(sheetId, function (folders) {
            return folders.map(function (f) {
              if (f.id !== folderId) return f;
              return Object.assign({}, f, { files: (f.files || []).concat([newEntry]) });
            });
          });
        }
        var liveSheet = data.sheets.find(function (s) { return s.id === sheetId; });
        var liveFolder = liveSheet && liveSheet.folders && liveSheet.folders.find(function (f) { return f.id === folderId; });
        if (liveFolder) {
          liveFolder.files = (liveFolder.files || []).concat([newEntry]);
          saveData();
        }
      }).then(function () {
        renderLibraryGrid();
      }).catch(function (err) {
        console.error("library upload failed:", err);
        alert(tr("libraryUploadError") + "\n" + ((err && (err.message || err.error || err.statusCode)) || JSON.stringify(err) || ""));
      });
    });
  }

  function openLibraryFoldersView() {
    if (!activeSheet()) return;
    state.viewMode = "library";
    state.menuOpen = false;
    render();
  }
  function openLibraryFolderView(sheet, folder) {
    activeLibraryFolderId = folder.id;
    libraryHeadTitle.textContent = libraryFolderPath((sheet && sheet.folders) || [folder], folder);
    renderLibraryGrid();
    libraryFoldersView.hidden = true;
    libraryView.hidden = false;
    updateActiveFabHighlight();
  }
  function closeLibraryView() {
    var sheet = allSheets().find(function (s) { return s.id === activeLibrarySheetId; });
    var folder = sheet && sheet.folders && sheet.folders.find(function (f) { return f.id === activeLibraryFolderId; });
    var parent = folder && folder.parentId && sheet.folders.find(function (f) { return f.id === folder.parentId; });
    if (parent) { openLibraryFolderView(sheet, parent); return; }
    libraryView.hidden = true;
    activeLibraryFolderId = null;
    libraryFoldersView.hidden = false;
    renderLibraryFolders();
    updateActiveFabHighlight();
  }
  libraryBtn.addEventListener("click", openLibraryFoldersView);
  libraryBackBtn.addEventListener("click", closeLibraryView);
  libraryAddBtn.addEventListener("click", function () { libraryFileInput.click(); });
  libraryFileInput.addEventListener("change", function () {
    if (libraryFileInput.files && libraryFileInput.files.length) uploadLibraryFiles(libraryFileInput.files);
    libraryFileInput.value = "";
  });

  var newLibraryFolderParentId = null;
  function openLibraryFolderNameModal(parentId) {
    newLibraryFolderParentId = parentId || null;
    libraryFolderNameInput.value = "";
    libraryFolderNameOverlay.hidden = false;
    libraryFolderNameInput.focus();
  }
  function closeLibraryFolderNameModal() {
    libraryFolderNameOverlay.hidden = true;
  }
  function createLibraryFolder() {
    var name = libraryFolderNameInput.value.trim();
    if (!name) { closeLibraryFolderNameModal(); return; }
    var sheet = allSheets().find(function (s) { return s.id === activeLibrarySheetId; });
    closeLibraryFolderNameModal();
    if (!sheet) return;
    var newFolder = { id: uid(), key: null, name: name, files: [] };
    if (newLibraryFolderParentId) newFolder.parentId = newLibraryFolderParentId;
    var shown = function () {
      if (!libraryView.hidden) renderLibraryGrid();
      else renderLibraryFolders();
    };
    if (sheet.shared) {
      applySharedLibraryFolders(sheet.id, function (folders) { return (folders || []).concat([newFolder]); })
        .then(shown);
      return;
    }
    var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
    if (liveSheet) {
      liveSheet.folders = (liveSheet.folders || []).concat([newFolder]);
      saveData();
      shown();
    }
  }
  libraryAddFolderBtn.addEventListener("click", function () { openLibraryFolderNameModal(null); });
  document.getElementById("libraryAddSubfolderBtn").addEventListener("click", function () { openLibraryFolderNameModal(activeLibraryFolderId); });
  libraryFolderNameOkBtn.addEventListener("click", createLibraryFolder);
  libraryFolderNameCancelBtn.addEventListener("click", closeLibraryFolderNameModal);
  libraryFolderNameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); createLibraryFolder(); }
    if (e.key === "Escape") { closeLibraryFolderNameModal(); }
  });
  libraryFolderNameOverlay.addEventListener("click", function (e) {
    if (e.target === libraryFolderNameOverlay) closeLibraryFolderNameModal();
  });


  // ---------------------------------------------------------------------
  // Library "סריקת מסמך": photograph pages with the camera (or pick them
  // from the gallery), optionally cleaned up as a document (white paper,
  // crisp text), saved as one PDF into a library folder the user picks.
  // ---------------------------------------------------------------------
  var libraryScanBtn = document.getElementById("libraryScanBtn");
  var scanOverlay = document.getElementById("scanOverlay");
  var scanPagesEl = document.getElementById("scanPages");
  var scanEmptyEl = document.getElementById("scanEmpty");
  var scanCameraInput = document.getElementById("scanCameraInput");
  var scanGalleryInput = document.getElementById("scanGalleryInput");
  var scanDocMode = document.getElementById("scanDocMode");
  var scanNameInput = document.getElementById("scanName");
  var scanSaveBtn = document.getElementById("scanSaveBtn");
  var SCAN_MAX_SIDE = 2000;
  // see scanNewPage
  var scanPages = [];

  function scanLoadImage(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        var scale = Math.min(1, SCAN_MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
        var c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(img.naturalWidth * scale));
        c.height = Math.max(1, Math.round(img.naturalHeight * scale));
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c);
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("image")); };
      img.src = url;
    });
  }

  // "מצב מסמך": each pixel divided by the paper's own brightness around it
  // (the brightest of its 32px block, smoothed), so shadows and uneven light
  // drop out and the paper turns white; then the ink is darkened - like a
  // scanner, minus colour.
  function scanEnhance(canvas) {
    var w = canvas.width, h = canvas.height;
    var ctx = canvas.getContext("2d");
    var img = ctx.getImageData(0, 0, w, h);
    var px = img.data;
    var gray = new Uint8Array(w * h);
    for (var i = 0, k = 0; k < gray.length; i += 4, k++) {
      gray[k] = (px[i] * 299 + px[i + 1] * 587 + px[i + 2] * 114) / 1000 | 0;
    }
    var B = 32, bw = Math.ceil(w / B), bh = Math.ceil(h / B);
    var blk = new Float32Array(bw * bh);
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var bi = (y / B | 0) * bw + (x / B | 0);
        if (gray[y * w + x] > blk[bi]) blk[bi] = gray[y * w + x];
      }
    }
    // smooth the block grid (a lone bright speck mustn't make a block "paper")
    var bg = new Float32Array(bw * bh);
    for (var by = 0; by < bh; by++) {
      for (var bx = 0; bx < bw; bx++) {
        var sum = 0, cnt = 0;
        for (var dy = -1; dy <= 1; dy++) {
          for (var dx = -1; dx <= 1; dx++) {
            var yy = by + dy, xx = bx + dx;
            if (yy >= 0 && yy < bh && xx >= 0 && xx < bw) { sum += blk[yy * bw + xx]; cnt++; }
          }
        }
        bg[by * bw + bx] = Math.max(24, sum / cnt);
      }
    }
    var hist = new Uint32Array(256);
    var norm = new Uint8Array(w * h);
    for (var y2 = 0; y2 < h; y2++) {
      // bilinear between block centres
      var fy = Math.min(bh - 1, Math.max(0, (y2 + 0.5) / B - 0.5));
      var y0 = fy | 0, y1 = Math.min(bh - 1, y0 + 1), ty = fy - y0;
      for (var x2 = 0; x2 < w; x2++) {
        var fx = Math.min(bw - 1, Math.max(0, (x2 + 0.5) / B - 0.5));
        var x0 = fx | 0, x1 = Math.min(bw - 1, x0 + 1), tx = fx - x0;
        var b = (bg[y0 * bw + x0] * (1 - tx) + bg[y0 * bw + x1] * tx) * (1 - ty) +
                (bg[y1 * bw + x0] * (1 - tx) + bg[y1 * bw + x1] * tx) * ty;
        var v = Math.min(255, gray[y2 * w + x2] * 255 / b) | 0;
        norm[y2 * w + x2] = v;
        hist[v]++;
      }
    }
    var target = w * h * 0.01, acc = 0, lo = 0;
    for (; lo < 255; lo++) { acc += hist[lo]; if (acc >= target) break; }
    lo = Math.min(lo, 170);
    var hi = 225;
    var lut = new Uint8ClampedArray(256);
    for (var v2 = 0; v2 < 256; v2++) {
      var t = Math.min(1, Math.max(0, (v2 - lo) / (hi - lo)));
      lut[v2] = Math.round(255 * Math.pow(t, 1.5));
    }
    for (var j = 0, m = 0; m < norm.length; j += 4, m++) {
      px[j] = px[j + 1] = px[j + 2] = lut[norm[m]];
    }
    ctx.putImageData(img, 0, 0);
    return canvas;
  }

  // ---- a page's edits: { quad (the page's 4 corners in the photo, 0..1,
  // clockwise from top-left; null = the whole photo), rotation, filter
  // (doc / color / gray / vivid), brightness (-60..60) } ----
  function scanNewPage(canvas) {
    return { canvas: canvas, quad: null, rotation: 0, filter: scanDocMode.checked ? "doc" : "color", brightness: 0, out: null };
  }
  function scanEdits(page) {
    return { quad: page.quad && page.quad.map(function (p) { return { x: p.x, y: p.y }; }),
      rotation: page.rotation, filter: page.filter, brightness: page.brightness };
  }

  // The photo's quad straightened into a rectangle (perspective-corrected:
  // a page shot at an angle comes out square), bilinear sampling.
  function scanWarp(src, quad) {
    var sw = src.width, sh = src.height;
    var P = quad.map(function (p) { return { x: p.x * sw, y: p.y * sh }; });
    var dist = function (a, b) { return Math.hypot(a.x - b.x, a.y - b.y); };
    var W = Math.max(dist(P[0], P[1]), dist(P[3], P[2]));
    var H = Math.max(dist(P[0], P[3]), dist(P[1], P[2]));
    var k = Math.min(1, SCAN_MAX_SIDE / Math.max(W, H));
    W = Math.max(1, Math.round(W * k)); H = Math.max(1, Math.round(H * k));
    // unit square -> quad (Heckbert's projective mapping)
    var x0 = P[0].x, y0 = P[0].y, x1 = P[1].x, y1 = P[1].y, x2 = P[2].x, y2 = P[2].y, x3 = P[3].x, y3 = P[3].y;
    var dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
    var dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
    var g = 0, h = 0;
    if (Math.abs(dx3) > 1e-9 || Math.abs(dy3) > 1e-9) {
      var det = dx1 * dy2 - dx2 * dy1 || 1e-9;
      g = (dx3 * dy2 - dx2 * dy3) / det;
      h = (dx1 * dy3 - dx3 * dy1) / det;
    }
    var a = x1 - x0 + g * x1, b = x3 - x0 + h * x3, c = x0;
    var d = y1 - y0 + g * y1, e = y3 - y0 + h * y3, f = y0;
    var sdata = src.getContext("2d").getImageData(0, 0, sw, sh).data;
    var out = document.createElement("canvas");
    out.width = W; out.height = H;
    var octx = out.getContext("2d");
    var oimg = octx.createImageData(W, H);
    var od = oimg.data;
    for (var j = 0; j < H; j++) {
      var t = (j + 0.5) / H;
      for (var i = 0; i < W; i++) {
        var u = (i + 0.5) / W;
        var z = g * u + h * t + 1;
        var sx = (a * u + b * t + c) / z - 0.5, sy = (d * u + e * t + f) / z - 0.5;
        var ix = Math.floor(sx), iy = Math.floor(sy), fx = sx - ix, fy = sy - iy;
        if (ix < 0) { ix = 0; fx = 0; } else if (ix >= sw - 1) { ix = sw - 2; fx = 1; }
        if (iy < 0) { iy = 0; fy = 0; } else if (iy >= sh - 1) { iy = sh - 2; fy = 1; }
        if (sw < 2) { ix = 0; fx = 0; }
        if (sh < 2) { iy = 0; fy = 0; }
        var p00 = (iy * sw + ix) * 4, p10 = p00 + 4, p01 = p00 + sw * 4, p11 = p01 + 4;
        var o = (j * W + i) * 4;
        for (var ch = 0; ch < 3; ch++) {
          od[o + ch] = (sdata[p00 + ch] * (1 - fx) + sdata[p10 + ch] * fx) * (1 - fy) +
                       (sdata[p01 + ch] * (1 - fx) + sdata[p11 + ch] * fx) * fy;
        }
        od[o + 3] = 255;
      }
    }
    octx.putImageData(oimg, 0, 0);
    return out;
  }

  function scanRotate(src, rotation) {
    if (!rotation) return src;
    var turned = rotation % 180 !== 0;
    var c = document.createElement("canvas");
    c.width = turned ? src.height : src.width;
    c.height = turned ? src.width : src.height;
    var ctx = c.getContext("2d");
    ctx.translate(c.width / 2, c.height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.drawImage(src, -src.width / 2, -src.height / 2);
    return c;
  }

  function scanFilter(c, filter, brightness) {
    if (filter === "doc") scanEnhance(c);
    if (filter === "color" && !brightness) return c;
    var ctx = c.getContext("2d");
    var img = ctx.getImageData(0, 0, c.width, c.height);
    var px = img.data;
    var add = brightness * 2;
    for (var i = 0; i < px.length; i += 4) {
      var r = px[i], g = px[i + 1], b = px[i + 2];
      if (filter === "gray") {
        r = g = b = (r * 299 + g * 587 + b * 114) / 1000;
      } else if (filter === "vivid") {
        var l = (r * 299 + g * 587 + b * 114) / 1000;
        r = l + (r - l) * 1.35; g = l + (g - l) * 1.35; b = l + (b - l) * 1.35;
        r = (r - 128) * 1.25 + 140; g = (g - 128) * 1.25 + 140; b = (b - 128) * 1.25 + 140;
      }
      px[i] = r + add; px[i + 1] = g + add; px[i + 2] = b + add;
    }
    ctx.putImageData(img, 0, 0);
    return c;
  }

  // The photo with a page's edits applied - what the PDF gets.
  function scanApplyEdits(src, edits) {
    var c;
    if (edits.quad) {
      c = scanWarp(src, edits.quad);
    } else {
      // a copy - the filters write into it
      c = document.createElement("canvas");
      c.width = src.width; c.height = src.height;
      c.getContext("2d").drawImage(src, 0, 0);
    }
    return scanFilter(scanRotate(c, edits.rotation), edits.filter, edits.brightness);
  }
  function scanRenderPage(page) {
    if (!page.out) page.out = scanApplyEdits(page.canvas, scanEdits(page));
    return page.out;
  }

  function renderScanPages() {
    scanPagesEl.innerHTML = "";
    scanEmptyEl.hidden = scanPages.length > 0;
    scanSaveBtn.disabled = !scanPages.length;
    scanPages.forEach(function (page, i) {
      var item = document.createElement("div");
      item.className = "scan-page";
      item.title = tr("scanEditTitle");
      var shown = scanRenderPage(page);
      var thumb = document.createElement("canvas");
      var s = 160 / Math.max(shown.width, shown.height);
      thumb.width = Math.max(1, Math.round(shown.width * s));
      thumb.height = Math.max(1, Math.round(shown.height * s));
      thumb.getContext("2d").drawImage(shown, 0, 0, thumb.width, thumb.height);
      item.appendChild(thumb);
      item.addEventListener("click", function () { openScanEditor(i); });
      var num = document.createElement("span");
      num.className = "scan-page-num";
      num.textContent = String(i + 1);
      item.appendChild(num);
      var edit = document.createElement("span");
      edit.className = "scan-page-btn scan-page-rotate scan-page-edit";
      edit.textContent = "✎";
      item.appendChild(edit);
      var del = document.createElement("button");
      del.type = "button";
      del.className = "scan-page-btn scan-page-del";
      del.textContent = "✕";
      del.title = tr("deleteBtn");
      del.addEventListener("click", function (e) {
        e.stopPropagation();
        scanPages.splice(i, 1);
        renderScanPages();
      });
      item.appendChild(del);
      scanPagesEl.appendChild(item);
    });
  }

  // ---- the page editor --------------------------------------------------
  var scanEditor = document.getElementById("scanEditor");
  var scanEditorStage = document.getElementById("scanEditorStage");
  var scanEditorCanvas = document.getElementById("scanEditorCanvas");
  var scanEditorPoly = document.getElementById("scanEditorPoly");
  var scanEditorSvg = document.getElementById("scanEditorQuad");
  var scanEditorHandles = Array.prototype.slice.call(document.querySelectorAll(".scan-handle"));
  var scanBrightness = document.getElementById("scanBrightness");
  var scanEditIndex = -1;
  var scanEditState = null;
  var scanEditMode = "crop";
  var scanEditPreviewSrc = null;
  var SCAN_FULL_QUAD = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];

  function openScanEditor(index) {
    var page = scanPages[index];
    if (!page) return;
    scanEditIndex = index;
    scanEditState = scanEdits(page);
    if (!scanEditState.quad) scanEditState.quad = SCAN_FULL_QUAD.map(function (p) { return { x: p.x, y: p.y }; });
    // a smaller copy keeps the live preview quick
    var k = Math.min(1, 900 / Math.max(page.canvas.width, page.canvas.height));
    scanEditPreviewSrc = document.createElement("canvas");
    scanEditPreviewSrc.width = Math.max(1, Math.round(page.canvas.width * k));
    scanEditPreviewSrc.height = Math.max(1, Math.round(page.canvas.height * k));
    scanEditPreviewSrc.getContext("2d").drawImage(page.canvas, 0, 0, scanEditPreviewSrc.width, scanEditPreviewSrc.height);
    scanBrightness.value = String(scanEditState.brightness);
    scanEditor.hidden = false;
    setScanEditMode("crop");
  }
  function closeScanEditor() {
    scanEditor.hidden = true;
    scanEditIndex = -1;
    scanEditState = null;
    scanEditPreviewSrc = null;
  }
  function isFullQuad(q) {
    return q.every(function (p, i) { return Math.abs(p.x - SCAN_FULL_QUAD[i].x) < 0.002 && Math.abs(p.y - SCAN_FULL_QUAD[i].y) < 0.002; });
  }

  function setScanEditMode(mode) {
    scanEditMode = mode;
    document.querySelectorAll(".scan-editor-tab").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-mode") === mode);
    });
    document.getElementById("scanEditorCropBar").hidden = mode !== "crop";
    document.getElementById("scanEditorFilterBar").hidden = mode !== "filter";
    document.getElementById("scanEditorLightBar").hidden = mode !== "light";
    document.querySelectorAll(".scan-filter-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-filter") === scanEditState.filter);
    });
    drawScanEditor();
  }

  // Crop mode shows the photo itself with the 4 corners; the other modes
  // show the result.
  function drawScanEditor() {
    if (!scanEditState) return;
    var crop = scanEditMode === "crop";
    var shown = crop ? scanEditPreviewSrc : scanApplyEdits(scanEditPreviewSrc, scanEditState);
    scanEditorCanvas.width = shown.width;
    scanEditorCanvas.height = shown.height;
    scanEditorCanvas.getContext("2d").drawImage(shown, 0, 0);
    scanEditorSvg.style.display = crop ? "" : "none";
    scanEditorHandles.forEach(function (h) { h.hidden = !crop; });
    if (crop) placeScanHandles();
  }
  function placeScanHandles() {
    var stage = scanEditorStage.getBoundingClientRect();
    var r = scanEditorCanvas.getBoundingClientRect();
    var ox = r.left - stage.left, oy = r.top - stage.top;
    scanEditorSvg.setAttribute("width", stage.width);
    scanEditorSvg.setAttribute("height", stage.height);
    var pts = scanEditState.quad.map(function (p) { return { x: ox + p.x * r.width, y: oy + p.y * r.height }; });
    scanEditorPoly.setAttribute("points", pts.map(function (p) { return p.x + "," + p.y; }).join(" "));
    scanEditorHandles.forEach(function (h, i) {
      h.style.left = pts[i].x + "px";
      h.style.top = pts[i].y + "px";
    });
  }
  scanEditorHandles.forEach(function (h, i) {
    h.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      h.setPointerCapture(e.pointerId);
      var move = function (ev) {
        var r = scanEditorCanvas.getBoundingClientRect();
        scanEditState.quad[i] = {
          x: Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width)),
          y: Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height))
        };
        placeScanHandles();
      };
      var up = function () {
        h.removeEventListener("pointermove", move);
        h.removeEventListener("pointerup", up);
        h.removeEventListener("pointercancel", up);
      };
      h.addEventListener("pointermove", move);
      h.addEventListener("pointerup", up);
      h.addEventListener("pointercancel", up);
    });
  });
  window.addEventListener("resize", function () { if (!scanEditor.hidden && scanEditMode === "crop") placeScanHandles(); });

  document.querySelectorAll(".scan-editor-tab[data-mode]").forEach(function (b) {
    b.addEventListener("click", function () { setScanEditMode(b.getAttribute("data-mode")); });
  });
  document.getElementById("scanRotateLeftBtn").addEventListener("click", function () {
    scanEditState.rotation = (scanEditState.rotation + 270) % 360;
    if (scanEditMode === "crop") setScanEditMode("filter"); else drawScanEditor();
  });
  document.getElementById("scanRotateRightBtn").addEventListener("click", function () {
    scanEditState.rotation = (scanEditState.rotation + 90) % 360;
    if (scanEditMode === "crop") setScanEditMode("filter"); else drawScanEditor();
  });
  document.getElementById("scanCropResetBtn").addEventListener("click", function () {
    scanEditState.quad = SCAN_FULL_QUAD.map(function (p) { return { x: p.x, y: p.y }; });
    placeScanHandles();
  });
  document.querySelectorAll(".scan-filter-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      scanEditState.filter = b.getAttribute("data-filter");
      setScanEditMode("filter");
    });
  });
  scanBrightness.addEventListener("input", function () {
    scanEditState.brightness = parseInt(scanBrightness.value, 10) || 0;
    drawScanEditor();
  });
  document.getElementById("scanEditDoneBtn").addEventListener("click", function () {
    var page = scanPages[scanEditIndex];
    if (page) {
      page.quad = isFullQuad(scanEditState.quad) ? null : scanEditState.quad;
      page.rotation = scanEditState.rotation;
      page.filter = scanEditState.filter;
      page.brightness = scanEditState.brightness;
      page.out = null;
    }
    closeScanEditor();
    renderScanPages();
  });
  document.getElementById("scanEditCancelBtn").addEventListener("click", closeScanEditor);
  document.getElementById("scanEditDeleteBtn").addEventListener("click", function () {
    if (scanEditIndex >= 0) scanPages.splice(scanEditIndex, 1);
    closeScanEditor();
    renderScanPages();
  });

  function scanDefaultName() {
    var d = new Date();
    return tr("scanDefaultName") + " " + isoToFileNameDate(todayISO()) + " " +
      String(d.getHours()).padStart(2, "0") + "-" + String(d.getMinutes()).padStart(2, "0");
  }

  function openScanOverlay() {
    scanPages = [];
    scanNameInput.value = scanDefaultName();
    renderScanPages();
    scanOverlay.hidden = false;
  }
  function closeScanOverlay() {
    scanOverlay.hidden = true;
    scanPages = [];
  }

  function addScanFiles(files, edit) {
    var list = Array.prototype.slice.call(files || []).filter(function (f) { return /^image\//.test(f.type || "image/"); });
    return list.reduce(function (p, file) {
      return p.then(function () {
        return scanLoadImage(file).then(function (canvas) {
          scanPages.push(scanNewPage(canvas));
        }, function () {});
      });
    }, Promise.resolve()).then(function () {
      renderScanPages();
      // straight from the camera -> straight into the editor
      if (edit && list.length) openScanEditor(scanPages.length - 1);
    });
  }

  function buildScanPdf() {
    return (window.jspdf ? Promise.resolve() : loadScriptOnce("vendor/jspdf.umd.min.js")).then(function () {
      var pdf = null;
      scanPages.forEach(function (page) {
        var c = scanRenderPage(page);
        var landscape = c.width > c.height;
        var pw = landscape ? 297 : 210, ph = landscape ? 210 : 297, margin = 6;
        var scale = Math.min((pw - 2 * margin) / c.width, (ph - 2 * margin) / c.height);
        var w = c.width * scale, h = c.height * scale;
        if (!pdf) pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: landscape ? "landscape" : "portrait" });
        else pdf.addPage("a4", landscape ? "landscape" : "portrait");
        pdf.addImage(c.toDataURL("image/jpeg", 0.75), "JPEG", (pw - w) / 2, (ph - h) / 2, w, h);
      });
      return pdf.output("blob");
    });
  }

  function saveScanToFolder(sheet, folder) {
    var name = (scanNameInput.value || "").trim() || scanDefaultName();
    var fileName = /\.pdf$/i.test(name) ? name : name + ".pdf";
    showToast(tr("scanSavingMsg"));
    buildScanPdf().then(function (blob) {
      var path = sheet.id + "/" + folder.id + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folder.id, entry);
      });
    }).then(function () {
      closeScanOverlay();
      showToast(tr("scanSavedMsg").replace("{folder}", folderDisplayName(folder)));
      if (activeLibraryFolderId === folder.id) renderLibraryGrid();
    }, function (err) {
      console.error("scan save failed:", err);
      alert(tr("scanSaveError"));
    });
  }

  // Which library folder: the same picker as saving a chat file.
  function pickScanFolder() {
    var sheet = allSheets().find(function (s) { return s.id === activeLibrarySheetId; });
    if (!sheet || !scanPages.length) return;
    if (!supabaseClient) { alert(tr("scanSaveError")); return; }
    ensureLibraryFolders(sheet, function (folders) {
      chatSaveFolderList.innerHTML = "";
      folders.forEach(function (folder) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "📁 " + folderDisplayName(folder);
        btn.addEventListener("click", function () {
          chatSaveFolderOverlay.hidden = true;
          saveScanToFolder(sheet, folder);
        });
        chatSaveFolderList.appendChild(btn);
      });
      chatSaveFolderOverlay.hidden = false;
    });
  }

  libraryScanBtn.addEventListener("click", openScanOverlay);
  document.getElementById("scanCaptureBtn").addEventListener("click", function () { scanCameraInput.click(); });
  document.getElementById("scanGalleryBtn").addEventListener("click", function () { scanGalleryInput.click(); });
  [scanCameraInput, scanGalleryInput].forEach(function (input) {
    input.addEventListener("change", function () {
      addScanFiles(input.files, input === scanCameraInput);
      input.value = "";
    });
  });
  // the switch sets every page's filter (each can still be changed in the editor)
  scanDocMode.addEventListener("change", function () {
    scanPages.forEach(function (p) { p.filter = scanDocMode.checked ? "doc" : "color"; p.out = null; });
    renderScanPages();
  });
  scanSaveBtn.addEventListener("click", pickScanFolder);
  document.getElementById("scanCancelBtn").addEventListener("click", function () {
    if (scanPages.length) askConfirm(tr("scanDiscardConfirm"), closeScanOverlay);
    else closeScanOverlay();
  });
  var reportActionOverlay = document.getElementById("reportActionOverlay");
  var reportActionDeleteBtn = document.getElementById("reportActionDeleteBtn");
  var reportActionEditBtn = document.getElementById("reportActionEditBtn");
  var reportActionShareBtn = document.getElementById("reportActionShareBtn");
  var reportActionAddTasksBtn = document.getElementById("reportActionAddTasksBtn");
  var reportActionCancelBtn = document.getElementById("reportActionCancelBtn");
  var pendingReportActionId = null;

  function openReportActionModal(id) {
    pendingReportActionId = id;
    reportActionOverlay.hidden = false;
  }
  function closeReportActionModal() {
    reportActionOverlay.hidden = true;
    pendingReportActionId = null;
  }
  function deleteReport(id) {
    var report = findReport(id);
    if (!report) return;
    var typeLabel = report.type === "meeting" ? tr("reportTypeMeeting") : tr("reportTypeTour");
    askConfirm(tr("confirmDeleteReport").replace("{name}", report.title || typeLabel), function () {
      var sheet = activeSheet();
      sheet.reports = (sheet.reports || []).filter(function (r) { return r.id !== id; });
      saveData();
      if (state.viewMode === "reports") renderSheetReportsList();
    });
  }
  reportActionDeleteBtn.addEventListener("click", function () {
    var id = pendingReportActionId;
    closeReportActionModal();
    deleteReport(id);
  });
  reportActionEditBtn.addEventListener("click", function () {
    var id = pendingReportActionId;
    closeReportActionModal();
    openReportEditFlow(id);
  });
  reportActionShareBtn.addEventListener("click", function () {
    var id = pendingReportActionId;
    closeReportActionModal();
    var report = findReport(id);
    if (report) generateReportPdf(report, "share");
  });

  var reportRowActionOverlay = document.getElementById("reportRowActionOverlay");
  var reportRowActionDeleteBtn = document.getElementById("reportRowActionDeleteBtn");
  var reportRowActionCopyBtn = document.getElementById("reportRowActionCopyBtn");
  var reportRowActionCancelBtn = document.getElementById("reportRowActionCancelBtn");
  var pendingReportRowActionId = null;

  function openReportRowActionModal(rowId) {
    pendingReportRowActionId = rowId;
    reportRowActionOverlay.hidden = false;
  }
  function closeReportRowActionModal() {
    reportRowActionOverlay.hidden = true;
    pendingReportRowActionId = null;
  }
  function deleteReportRow(rowId) {
    var report = findReport(activeReportId);
    if (!report) return;
    askConfirm(tr("confirmDeleteReportRow"), function () {
      report.rows = report.rows.filter(function (r) { return r.id !== rowId; });
      saveData();
      renderReportView();
    });
  }
  function duplicateReportRow(rowId) {
    var report = findReport(activeReportId);
    if (!report) return;
    var idx = report.rows.findIndex(function (r) { return r.id === rowId; });
    if (idx === -1) return;
    var copy = Object.assign({}, report.rows[idx], { id: uid() });
    report.rows.splice(idx + 1, 0, copy);
    saveData();
    renderReportView();
  }
  reportRowActionDeleteBtn.addEventListener("click", function () {
    var rowId = pendingReportRowActionId;
    closeReportRowActionModal();
    deleteReportRow(rowId);
  });
  reportRowActionCopyBtn.addEventListener("click", function () {
    var rowId = pendingReportRowActionId;
    closeReportRowActionModal();
    duplicateReportRow(rowId);
  });
  reportRowActionCancelBtn.addEventListener("click", closeReportRowActionModal);
  reportRowActionOverlay.addEventListener("click", function (e) {
    if (e.target === reportRowActionOverlay) closeReportRowActionModal();
  });

  function addReportRowsToTaskList(reportId) {
    var report = findReport(reportId);
    if (!report) return 0;
    var sheet = activeSheet();
    var added = 0;
    (report.rows || []).forEach(function (row) {
      var lines = (row.task || "").split(/\r\n|\r|\n/).map(function (l) { return l.trim(); }).filter(function (l) { return l; });
      lines.forEach(function (line) {
        var text = line;
        if (row.dueDate) text += " - " + tr("reportTaskDueSuffix") + " " + isoToDisplay(row.dueDate);
        sheet.tasks.push({
          id: uid(),
          text: text,
          status: row.status || 0,
          urgent: row.priority === "urgent",
          type: "task",
          date: todayISO(),
          createdAt: Date.now()
        });
        added++;
      });
    });
    if (added) saveData();
    return added;
  }
  reportActionAddTasksBtn.addEventListener("click", function () {
    var id = pendingReportActionId;
    closeReportActionModal();
    var added = addReportRowsToTaskList(id);
    alert(added ? tr("reportTasksAddedMsg").replace("{count}", added) : tr("reportTasksNoneToAdd"));
  });
  reportActionCancelBtn.addEventListener("click", closeReportActionModal);
  reportActionOverlay.addEventListener("click", function (e) {
    if (e.target === reportActionOverlay) closeReportActionModal();
  });

  var companyDashboardBtn = document.getElementById("companyDashboardBtn");
  var companyDashboardView = document.getElementById("companyDashboardView");
  var companyDashboardBackBtn = document.getElementById("companyDashboardBackBtn");
  var companyDashboardList = document.getElementById("companyDashboardList");

  function openCompanyDashboardView() {
    companyDashboardView.hidden = false;
    renderCompanyDashboard();
  }
  function closeCompanyDashboardView() {
    companyDashboardView.hidden = true;
  }
  function renderCompanyDashboard() {
    companyDashboardList.innerHTML = "";
    var sheets = visibleSheets();
    if (!sheets.length) {
      var empty = document.createElement("div");
      empty.className = "company-dashboard-empty";
      empty.textContent = tr("companyDashboardEmpty");
      companyDashboardList.appendChild(empty);
      return;
    }
    var today = todayISO();
    sheets.forEach(function (sheet) {
      var row = document.createElement("div");
      row.className = "company-dashboard-row";

      var nameEl = document.createElement("div");
      nameEl.className = "company-dashboard-name";
      nameEl.textContent = (sheet.shared ? "👥 " : "") + sheet.name;
      row.appendChild(nameEl);

      var todayLog = findSiteLog(sheet, today);
      var statusEl = document.createElement("div");
      statusEl.className = "company-dashboard-status";
      if (todayLog && todayLog.closed) {
        statusEl.classList.add("company-dashboard-status-closed");
        statusEl.textContent = tr("companyDashboardClosedToday");
      } else if (todayLog) {
        statusEl.classList.add("company-dashboard-status-open");
        statusEl.textContent = tr("companyDashboardOpenNotClosed");
      } else {
        statusEl.classList.add("company-dashboard-status-missing");
        statusEl.textContent = tr("companyDashboardNoLogToday");
      }
      row.appendChild(statusEl);

      var closedLogs = (sheet.siteLogs || []).filter(function (l) { return l.closed; });
      if (closedLogs.length) {
        closedLogs.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
        var lastEl = document.createElement("div");
        lastEl.className = "company-dashboard-last";
        lastEl.textContent = tr("companyDashboardLastLog") + " " + isoToFullDisplay(closedLogs[0].date);
        row.appendChild(lastEl);
      }

      row.addEventListener("click", function () {
        closeCompanyDashboardView();
        selectSheet(sheet.id);
        state.viewDate = today;
        openDiaryView();
      });
      companyDashboardList.appendChild(row);
    });
  }
  companyDashboardBtn.addEventListener("click", function () {
    state.menuOpen = false;
    render();
    openCompanyDashboardView();
  });
  companyDashboardBackBtn.addEventListener("click", closeCompanyDashboardView);

  var VAPID_PUBLIC_KEY = "BPdpuz8Hlv_j8NYip_kdmzpj6h6fhbhjY3_NeeLyBIoVo7K1qJiouH3RtdyOTNV6riNdmGB_X6u7qL_jVwejDrM";

  function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    var rawData = atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  var reminderFrequencySelect = document.getElementById("reminderFrequencySelect");
  var reminderStatus = document.getElementById("reminderStatus");

  var langSelect = document.getElementById("langSelect");
  langSelect.value = currentLang;
  langSelect.addEventListener("change", function () {
    state.menuOpen = false;
    setLang(langSelect.value);
    authLangSelect.value = currentLang;
  });

  var authLangSelect = document.getElementById("authLangSelect");
  authLangSelect.value = currentLang;
  authLangSelect.addEventListener("change", function () {
    setLang(authLangSelect.value);
    langSelect.value = currentLang;
  });

  applyStaticTranslations();

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
  var myOfficeGroups = [];
  var HEAD_OFFICE_ACTIVE_KEY = "itask-head-office-active";

  // The always-present "הזמנות רכש" tab in Head Office mode. Not a real
  // shared/synced project - just one ordinary private sheet (in data.sheets,
  // persisted via the normal app_state save path) whose id is this fixed
  // constant, and whose tasks are entirely system-generated (see
  // syncHeadOfficeVirtualTasks below) rather than user-added.
  var HEAD_OFFICE_SHEET_ID = "head-office-main";
  var wasHeadOfficeModeLastRender = false;

  function getHeadOfficeActivePref() {
    try { return localStorage.getItem(HEAD_OFFICE_ACTIVE_KEY) === "1"; } catch (e) { return false; }
  }
  function setHeadOfficeActivePref(on) {
    try { localStorage.setItem(HEAD_OFFICE_ACTIVE_KEY, on ? "1" : "0"); } catch (e) {}
  }
  function recomputeHeadOfficeMode() {
    isHeadOfficeMode = canBeHeadOffice && getHeadOfficeActivePref();
  }

  var headOfficeToggleOnBtn = document.getElementById("headOfficeToggleOnBtn");
  var headOfficeToggleOffBtn = document.getElementById("headOfficeToggleOffBtn");
  // A compact icon equivalent of the two menu buttons above, sitting above
  // the search icon on the main screen - one toggle button instead of two
  // (there's no room to stack two icons here), showing the current state
  // via its own "active" outline rather than swapping to a second icon.
  var headOfficeIconBtn = document.getElementById("headOfficeIconBtn");
  function updateHeadOfficeToggleButtons() {
    headOfficeToggleOnBtn.hidden = !canBeHeadOffice || isHeadOfficeMode;
    headOfficeToggleOffBtn.hidden = !canBeHeadOffice || !isHeadOfficeMode;
    headOfficeIconBtn.hidden = !canBeHeadOffice;
    headOfficeIconBtn.classList.toggle("active", isHeadOfficeMode);
    headOfficeIconBtn.setAttribute("aria-pressed", String(isHeadOfficeMode));
  }
  function setHeadOfficeActive(on) {
    setHeadOfficeActivePref(on);
    recomputeHeadOfficeMode();
    updateHeadOfficeToggleButtons();
    state.menuOpen = false;
    render();
  }
  headOfficeToggleOnBtn.addEventListener("click", function () { setHeadOfficeActive(true); });
  headOfficeToggleOffBtn.addEventListener("click", function () { setHeadOfficeActive(false); });
  headOfficeIconBtn.addEventListener("click", function () { setHeadOfficeActive(!isHeadOfficeMode); });

  // Fetched once after login (and again right after an invite is
  // approved) - being the creator of any group, or having an APPROVED
  // head_office invite in one (see office_group_invites, invited there
  // only resolves once the invited phone itself approves - see
  // checkPendingOfficeGroupInvites below), is enough to unlock the toggle.
  function loadMyOfficeGroups() {
    if (!supabaseClient || !myPhoneNumber) return Promise.resolve();
    var asCreator = supabaseClient.from("office_groups").select("id").eq("creator_phone", myPhoneNumber);
    var asHeadOffice = supabaseClient.from("office_group_invites").select("id")
      .eq("invited_phone", myPhoneNumber).eq("role", "head_office").eq("status", "approved");
    return Promise.all([asCreator, asHeadOffice]).then(function (results) {
      var creatorRows = (results[0] && results[0].data) || [];
      var headOfficeRows = (results[1] && results[1].data) || [];
      myOfficeGroups = creatorRows.map(function (r) { return r.id; });
      canBeHeadOffice = (creatorRows.length + headOfficeRows.length) > 0;
      officeGroupManageBtn.hidden = myOfficeGroups.length === 0;
      recomputeHeadOfficeMode();
      updateHeadOfficeToggleButtons();
      render();
    }, function () {});
  }

  // "הקמת קבוצת משרד" - a two-step flow: pick the group's members (whose
  // shared projects get watched), then pick the one phone number that
  // becomes this group's Head Office. Either step takes a typed number or
  // a contact.
  var officeGroupCreateBtn = document.getElementById("officeGroupCreateBtn");
  var officeGroupMembersOverlay = document.getElementById("officeGroupMembersOverlay");
  var officeGroupMembersList = document.getElementById("officeGroupMembersList");
  var officeGroupMembersPickContactsBtn = document.getElementById("officeGroupMembersPickContactsBtn");
  var officeGroupMembersNextBtn = document.getElementById("officeGroupMembersNextBtn");
  var officeGroupMembersCancelBtn = document.getElementById("officeGroupMembersCancelBtn");
  var officeGroupHeadOfficeOverlay = document.getElementById("officeGroupHeadOfficeOverlay");
  var officeGroupHeadOfficeInput = document.getElementById("officeGroupHeadOfficeInput");
  var officeGroupHeadOfficePickContactsBtn = document.getElementById("officeGroupHeadOfficePickContactsBtn");
  var officeGroupHeadOfficeFinishBtn = document.getElementById("officeGroupHeadOfficeFinishBtn");
  var officeGroupHeadOfficeBackBtn = document.getElementById("officeGroupHeadOfficeBackBtn");
  officeGroupMembersPickContactsBtn.hidden = !contactPickerSupported;
  officeGroupHeadOfficePickContactsBtn.hidden = !contactPickerSupported;

  var pendingOfficeGroupMembers = [];

  function renderOfficeGroupMembersList() {
    officeGroupMembersList.innerHTML = "";
    pendingOfficeGroupMembers.forEach(function (phone) {
      var row = document.createElement("div");
      row.className = "site-log-entry";
      var phoneSpan = document.createElement("span");
      phoneSpan.textContent = phone;
      phoneSpan.dir = "ltr";
      row.appendChild(phoneSpan);
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "site-log-entry-remove";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        pendingOfficeGroupMembers = pendingOfficeGroupMembers.filter(function (p) { return p !== phone; });
        renderOfficeGroupMembersList();
      });
      row.appendChild(removeBtn);
      officeGroupMembersList.appendChild(row);
    });

    var addRow = document.createElement("div");
    addRow.className = "site-log-entry";
    var addInput = document.createElement("input");
    addInput.type = "tel";
    addInput.className = "site-log-add-input";
    addInput.placeholder = tr("headOfficeMemberAddPlaceholder");
    addInput.dir = "ltr";
    addRow.appendChild(addInput);
    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "site-log-add-btn";
    var addBtnImg = document.createElement("img");
    addBtnImg.src = "tasks-plus-icon.webp";
    addBtnImg.alt = "+";
    addBtn.appendChild(addBtnImg);
    function submitAdd() {
      var phone = normalizePhoneDigits(addInput.value);
      if (!phone) { alert(tr("headOfficeMemberInvalidMsg")); return; }
      if (pendingOfficeGroupMembers.indexOf(phone) === -1) pendingOfficeGroupMembers.push(phone);
      renderOfficeGroupMembersList();
    }
    addBtn.addEventListener("click", submitAdd);
    addInput.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); submitAdd(); } });
    addRow.appendChild(addBtn);
    officeGroupMembersList.appendChild(addRow);
  }

  function openOfficeGroupCreateFlow() {
    pendingOfficeGroupMembers = [];
    renderOfficeGroupMembersList();
    state.menuOpen = false;
    render();
    officeGroupMembersOverlay.hidden = false;
  }
  officeGroupCreateBtn.addEventListener("click", openOfficeGroupCreateFlow);
  officeGroupMembersCancelBtn.addEventListener("click", function () { officeGroupMembersOverlay.hidden = true; });
  officeGroupMembersOverlay.addEventListener("click", function (e) {
    if (e.target === officeGroupMembersOverlay) officeGroupMembersOverlay.hidden = true;
  });

  function pickContactsForOfficeGroupMembers() {
    if (!contactPickerSupported) return;
    function addPicked(phone) {
      if (phone && pendingOfficeGroupMembers.indexOf(phone) === -1) pendingOfficeGroupMembers.push(phone);
    }
    if (capacitorContactsAvailable) {
      pickOneNativeContact().then(function (picked) {
        if (!picked) return;
        addPicked(normalizePhoneDigits(picked.tel));
        renderOfficeGroupMembersList();
      });
      return;
    }
    navigator.contacts.select(["tel"], { multiple: true }).then(function (contacts) {
      contacts.forEach(function (c) {
        var tel = (c.tel && c.tel[0]) || "";
        addPicked(normalizePhoneDigits(tel));
      });
      renderOfficeGroupMembersList();
    }).catch(function () {});
  }
  officeGroupMembersPickContactsBtn.addEventListener("click", pickContactsForOfficeGroupMembers);

  officeGroupMembersNextBtn.addEventListener("click", function () {
    if (!pendingOfficeGroupMembers.length) { alert(tr("officeGroupNoMembersMsg")); return; }
    officeGroupMembersOverlay.hidden = true;
    officeGroupHeadOfficeInput.value = "";
    officeGroupHeadOfficeOverlay.hidden = false;
  });

  officeGroupHeadOfficeBackBtn.addEventListener("click", function () {
    officeGroupHeadOfficeOverlay.hidden = true;
    officeGroupMembersOverlay.hidden = false;
  });
  officeGroupHeadOfficeOverlay.addEventListener("click", function (e) {
    if (e.target === officeGroupHeadOfficeOverlay) officeGroupHeadOfficeOverlay.hidden = true;
  });

  function pickContactForOfficeGroupHeadOffice() {
    if (!contactPickerSupported) return;
    if (capacitorContactsAvailable) {
      pickOneNativeContact().then(function (picked) {
        if (!picked) return;
        var phone = normalizePhoneDigits(picked.tel);
        if (phone) officeGroupHeadOfficeInput.value = phone;
      });
      return;
    }
    navigator.contacts.select(["tel"], { multiple: false }).then(function (contacts) {
      var c = contacts && contacts[0];
      var tel = c && c.tel && c.tel[0];
      var phone = tel && normalizePhoneDigits(tel);
      if (phone) officeGroupHeadOfficeInput.value = phone;
    }).catch(function () {});
  }
  officeGroupHeadOfficePickContactsBtn.addEventListener("click", pickContactForOfficeGroupHeadOffice);

  // Creates the (empty) group, then sends one invite per member plus one
  // for the chosen Head Office number - each only takes effect once ITS
  // OWN invited phone approves it (checkPendingOfficeGroupInvites below),
  // except when the creator names themselves (either role), which is
  // approved immediately - nobody needs to ask their own permission.
  officeGroupHeadOfficeFinishBtn.addEventListener("click", function () {
    // Left empty, the creator is the group's Head Office themselves (a
    // group can have only its own creator as Head Office) - only a
    // typed-but-invalid number blocks finishing.
    var rawHeadOfficeInput = officeGroupHeadOfficeInput.value.trim();
    var headOfficePhone = rawHeadOfficeInput ? normalizePhoneDigits(rawHeadOfficeInput) : myPhoneNumber;
    if (!headOfficePhone) { alert(tr("headOfficeMemberInvalidMsg")); return; }
    if (!supabaseClient || !myPhoneNumber) return;
    supabaseClient.from("office_groups").insert({ creator_phone: myPhoneNumber }).select().then(function (result) {
      if ((result && result.error) || !result.data || !result.data[0]) {
        console.error("office_groups insert failed:", result && result.error);
        alert(tr("officeGroupCreateErrorMsg"));
        return;
      }
      var groupId = result.data[0].id;
      var invites = pendingOfficeGroupMembers.map(function (phone) {
        return {
          group_id: groupId,
          role: "member",
          invited_phone: phone,
          invited_by_phone: myPhoneNumber,
          invited_by_name: myPhoneNumber,
          status: phone === myPhoneNumber ? "approved" : "pending"
        };
      });
      invites.push({
        group_id: groupId,
        role: "head_office",
        invited_phone: headOfficePhone,
        invited_by_phone: myPhoneNumber,
        invited_by_name: myPhoneNumber,
        status: headOfficePhone === myPhoneNumber ? "approved" : "pending"
      });
      supabaseClient.from("office_group_invites").insert(invites).then(function (inviteResult) {
        if (inviteResult && inviteResult.error) {
          console.error("office_group_invites insert failed:", inviteResult.error);
          alert(tr("officeGroupCreateErrorMsg"));
          return;
        }
        officeGroupHeadOfficeOverlay.hidden = true;
        pendingOfficeGroupMembers = [];
        showToast(tr("officeGroupCreatedMsg"));
        loadMyOfficeGroups();
        loadSharedSheets();
      }, function () { alert(tr("officeGroupCreateErrorMsg")); });
    }, function () { alert(tr("officeGroupCreateErrorMsg")); });
  });

  // --- Receiving side: an office_group_invites row addressed to my own
  // phone shows an approve/decline prompt, same queue-one-at-a-time
  // pattern as checkPendingProjectInvites above. Approving just flips its
  // status (the shared_projects RLS in office_groups.sql reads that
  // directly) and, for a head_office invite, refreshes this account's own
  // Head Office eligibility so the toggle appears right away.
  var officeGroupInviteReceivedOverlay = document.getElementById("officeGroupInviteReceivedOverlay");
  var officeGroupInviteReceivedMessage = document.getElementById("officeGroupInviteReceivedMessage");
  var officeGroupInviteApproveBtn = document.getElementById("officeGroupInviteApproveBtn");
  var officeGroupInviteDeclineBtn = document.getElementById("officeGroupInviteDeclineBtn");
  var pendingOfficeGroupInvitesQueue = [];
  var activeOfficeGroupInvite = null;

  function checkPendingOfficeGroupInvites() {
    if (!supabaseClient || !myPhoneNumber || activeOfficeGroupInvite) return;
    try {
      supabaseClient.from("office_group_invites").select("*")
        .eq("invited_phone", myPhoneNumber).eq("status", "pending")
        .then(function (result) {
          if (!result || result.error || !result.data || !result.data.length) return;
          pendingOfficeGroupInvitesQueue = result.data;
          showNextPendingOfficeGroupInvite();
        }, function () {});
    } catch (e) {}
  }
  function showNextPendingOfficeGroupInvite() {
    if (activeOfficeGroupInvite || !pendingOfficeGroupInvitesQueue.length) return;
    activeOfficeGroupInvite = pendingOfficeGroupInvitesQueue.shift();
    var senderLabel = activeOfficeGroupInvite.invited_by_name || activeOfficeGroupInvite.invited_by_phone;
    var template = activeOfficeGroupInvite.role === "head_office"
      ? tr("officeGroupInviteHeadOfficeMsgTemplate")
      : tr("officeGroupInviteMemberMsgTemplate");
    officeGroupInviteReceivedMessage.textContent = template.replace("{name}", senderLabel);
    officeGroupInviteReceivedOverlay.hidden = false;
  }
  function closeOfficeGroupInviteReceivedModal() {
    officeGroupInviteReceivedOverlay.hidden = true;
    activeOfficeGroupInvite = null;
    showNextPendingOfficeGroupInvite();
  }
  function resolveOfficeGroupInvite(invite, newStatus) {
    if (!supabaseClient) return Promise.resolve();
    return supabaseClient.from("office_group_invites")
      .update({ status: newStatus, resolved_at: new Date().toISOString() })
      .eq("id", invite.id)
      .then(function (result) {
        if (result && result.error) console.error("office_group_invites update failed:", result.error);
      }, function (err) {
        console.error("office_group_invites update failed:", err);
      });
  }
  officeGroupInviteApproveBtn.addEventListener("click", function () {
    if (!activeOfficeGroupInvite) return;
    var invite = activeOfficeGroupInvite;
    resolveOfficeGroupInvite(invite, "approved").then(function () {
      if (invite.role === "head_office") loadMyOfficeGroups();
      loadSharedSheets();
    });
    showToast(tr("officeGroupInviteApprovedMsg"));
    closeOfficeGroupInviteReceivedModal();
  });
  officeGroupInviteDeclineBtn.addEventListener("click", function () {
    if (!activeOfficeGroupInvite) return;
    resolveOfficeGroupInvite(activeOfficeGroupInvite, "declined");
    showToast(tr("officeGroupInviteDeclinedMsg"));
    closeOfficeGroupInviteReceivedModal();
  });

  // "ניהול קבוצת המשרד" - visible once this account has created at least
  // one group (myOfficeGroups, refreshed by loadMyOfficeGroups). Lists
  // each group's Head Office and member invites with their current
  // status, with an add-row and a ✕ to remove any invite (member or
  // Head Office alike) - deleting one is immediate, same table either
  // side already reads from, so it takes effect right away whether the
  // invite was still pending or already approved.
  var officeGroupManageBtn = document.getElementById("officeGroupManageBtn");
  var officeGroupManageView = document.getElementById("officeGroupManageView");
  var officeGroupManageBackBtn = document.getElementById("officeGroupManageBackBtn");
  var officeGroupManageList = document.getElementById("officeGroupManageList");

  function officeGroupStatusLabel(status) {
    if (status === "approved") return tr("officeGroupStatusApproved");
    if (status === "declined") return tr("officeGroupStatusDeclined");
    return tr("officeGroupStatusPending");
  }

  function removeOfficeGroupInvite(inviteId) {
    if (!supabaseClient) return;
    supabaseClient.from("office_group_invites").delete().eq("id", inviteId).then(function (result) {
      if (result && result.error) { console.error("office_group_invites delete failed:", result.error); return; }
      loadAndRenderOfficeGroupManage();
      loadSharedSheets();
    }, function () {});
  }

  function addOfficeGroupMember(groupId, phone, existingMembers) {
    if (existingMembers.some(function (m) { return m.invited_phone === phone; })) return;
    supabaseClient.from("office_group_invites").insert({
      group_id: groupId,
      role: "member",
      invited_phone: phone,
      invited_by_phone: myPhoneNumber,
      invited_by_name: myPhoneNumber,
      status: phone === myPhoneNumber ? "approved" : "pending"
    }).then(function (result) {
      if (result && result.error) {
        console.error("office_group_invites insert failed:", result.error);
        alert(tr("officeGroupCreateErrorMsg"));
        return;
      }
      loadAndRenderOfficeGroupManage();
      loadSharedSheets();
    }, function () { alert(tr("officeGroupCreateErrorMsg")); });
  }

  function renderOfficeGroupManageList(groups, invites) {
    officeGroupManageList.innerHTML = "";
    groups.forEach(function (group, idx) {
      var groupInvites = invites.filter(function (i) { return i.group_id === group.id; });
      var headOffice = groupInvites.find(function (i) { return i.role === "head_office"; });
      var members = groupInvites.filter(function (i) { return i.role === "member"; });

      var card = document.createElement("div");
      card.className = "office-procurement-project";

      var title = document.createElement("div");
      title.className = "office-procurement-project-name";
      var headOfficeText = headOffice
        ? headOffice.invited_phone + (headOffice.status !== "approved" ? " (" + officeGroupStatusLabel(headOffice.status) + ")" : "")
        : "-";
      title.textContent = (groups.length > 1 ? tr("officeGroupLabel") + " " + (idx + 1) + " - " : "") + tr("officeGroupHeadOfficeLabel") + " " + headOfficeText;
      title.dir = "auto";
      card.appendChild(title);

      members.forEach(function (m) {
        var row = document.createElement("div");
        row.className = "site-log-entry";
        var span = document.createElement("span");
        span.textContent = m.invited_phone + " - " + officeGroupStatusLabel(m.status);
        span.dir = "ltr";
        row.appendChild(span);
        var removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "site-log-entry-remove";
        removeBtn.textContent = "✕";
        removeBtn.addEventListener("click", function () { removeOfficeGroupInvite(m.id); });
        row.appendChild(removeBtn);
        card.appendChild(row);
      });

      var addRow = document.createElement("div");
      addRow.className = "site-log-entry";
      var addInput = document.createElement("input");
      addInput.type = "tel";
      addInput.className = "site-log-add-input";
      addInput.placeholder = tr("headOfficeMemberAddPlaceholder");
      addInput.dir = "ltr";
      addRow.appendChild(addInput);
      var addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "site-log-add-btn";
      var addBtnImg = document.createElement("img");
      addBtnImg.src = "tasks-plus-icon.webp";
      addBtnImg.alt = "+";
      addBtn.appendChild(addBtnImg);
      function submitAdd() {
        var phone = normalizePhoneDigits(addInput.value);
        if (!phone) { alert(tr("headOfficeMemberInvalidMsg")); return; }
        addOfficeGroupMember(group.id, phone, members);
      }
      addBtn.addEventListener("click", submitAdd);
      addInput.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); submitAdd(); } });
      addRow.appendChild(addBtn);
      card.appendChild(addRow);

      officeGroupManageList.appendChild(card);
    });
  }

  function loadAndRenderOfficeGroupManage() {
    if (!supabaseClient || !myPhoneNumber) return;
    supabaseClient.from("office_groups").select("id, created_at").eq("creator_phone", myPhoneNumber).order("created_at")
      .then(function (groupsResult) {
        var groups = (groupsResult && groupsResult.data) || [];
        if (!groups.length) { officeGroupManageList.innerHTML = ""; return; }
        var groupIds = groups.map(function (g) { return g.id; });
        supabaseClient.from("office_group_invites").select("*").in("group_id", groupIds)
          .then(function (invitesResult) {
            var invites = (invitesResult && invitesResult.data) || [];
            renderOfficeGroupManageList(groups, invites);
          }, function () {});
      }, function () {});
  }

  function openOfficeGroupManageView() {
    state.menuOpen = false;
    render();
    officeGroupManageView.hidden = false;
    loadAndRenderOfficeGroupManage();
  }
  officeGroupManageBtn.addEventListener("click", openOfficeGroupManageView);
  officeGroupManageBackBtn.addEventListener("click", function () { officeGroupManageView.hidden = true; });

  // Company logos can be large source images (a marketing PNG straight off
  // someone's phone) - they're stored inline as data URLs in app_state's
  // JSON (no per-sheet "owning folder" to hang a Storage RLS policy off,
  // since a logo is shared across all of a user's projects), so downscale
  // through a canvas first or a handful of logo uploads would bloat that
  // JSON blob into the megabytes.
  var LOGO_MAX_DIMENSION = 300;
  function resizeImageFileToDataUrl(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () {
        var img = new Image();
        img.onerror = reject;
        img.onload = function () {
          var scale = Math.min(1, LOGO_MAX_DIMENSION / Math.max(img.width, img.height));
          var w = Math.max(1, Math.round(img.width * scale));
          var h = Math.max(1, Math.round(img.height * scale));
          var canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/png"));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  logoFileInput.addEventListener("change", function () {
    var file = logoFileInput.files && logoFileInput.files[0];
    if (!file) return;
    if (file.type.indexOf("image/") !== 0) { alert(tr("logoInvalidFileMsg")); return; }
    resizeImageFileToDataUrl(file).then(function (dataUrl) {
      data.logos.push({
        id: uid(),
        name: file.name.replace(/\.[^.]+$/, "") || tr("chooseLogoTitle"),
        dataUrl: dataUrl,
        addedAt: Date.now()
      });
      saveData();
      showToast(tr("logoAddedToast"));
    }).catch(function () {
      alert(tr("logoInvalidFileMsg"));
    });
  });

  function renderSheetTitleLogo() {
    var sheet = activeSheet();
    var logo = sheet ? findLogo(sheet.logoId) : null;
    if (logo) {
      sheetTitleLogo.src = logo.dataUrl;
      sheetTitleLogo.hidden = false;
    } else {
      sheetTitleLogo.src = "";
      sheetTitleLogo.hidden = true;
    }
  }

  function openLogoPickerModal(sheetId) {
    var sheet = sheetId ? allSheets().find(function (s) { return s.id === sheetId; }) : activeSheet();
    if (!sheet) return;
    logoPickerGrid.innerHTML = "";
    var noneItem = document.createElement("div");
    noneItem.className = "logo-picker-item" + (!sheet.logoId ? " selected" : "");
    var noneThumb = document.createElement("div");
    noneThumb.className = "logo-picker-thumb";
    noneThumb.textContent = "✕";
    noneItem.appendChild(noneThumb);
    var noneName = document.createElement("div");
    noneName.className = "logo-picker-name";
    noneName.textContent = tr("logoNoneOption");
    noneItem.appendChild(noneName);
    noneItem.addEventListener("click", function () {
      sheet.logoId = null;
      saveData();
      renderSheetTitleLogo();
      closeLogoPickerModal();
    });
    logoPickerGrid.appendChild(noneItem);

    (data.logos || []).forEach(function (logo) {
      var item = document.createElement("div");
      item.className = "logo-picker-item" + (sheet.logoId === logo.id ? " selected" : "");
      var thumb = document.createElement("div");
      thumb.className = "logo-picker-thumb";
      var img = document.createElement("img");
      img.src = logo.dataUrl;
      img.alt = "";
      thumb.appendChild(img);
      item.appendChild(thumb);
      var nameEl = document.createElement("div");
      nameEl.className = "logo-picker-name";
      nameEl.textContent = logo.name;
      item.appendChild(nameEl);
      item.addEventListener("click", function () {
        sheet.logoId = logo.id;
        saveData();
        renderSheetTitleLogo();
        closeLogoPickerModal();
      });
      logoPickerGrid.appendChild(item);
    });

    if (!(data.logos || []).length) {
      var emptyMsg = document.createElement("div");
      emptyMsg.className = "logo-picker-empty";
      emptyMsg.textContent = tr("logoPickerEmptyMsg");
      logoPickerGrid.appendChild(emptyMsg);
    }

    logoPickerOverlay.hidden = false;
  }
  function closeLogoPickerModal() {
    logoPickerOverlay.hidden = true;
  }
  logoPickerCancelBtn.addEventListener("click", closeLogoPickerModal);
  logoPickerOverlay.addEventListener("click", function (e) {
    if (e.target === logoPickerOverlay) closeLogoPickerModal();
  });


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
  var sheetReportsList = document.getElementById("sheetReportsList");
  var tasksFabBtn = document.getElementById("tasksFabBtn");

  var calendarFabBtn = document.getElementById("calendarFabBtn");
  var officeReportsBtn = document.getElementById("officeReportsBtn");
  // The diary (יומן) category icons live inline on the main tasks page now
  // (see #diaryView / render()'s diaryMode branch) instead of a separate
  // screen, so opening it is just another state.viewMode - same pattern as
  // the reports FAB - sharing the page's own date (never a future one,
  // since a log is a record of a day that already happened).
  function openDiaryView() {
    if (state.viewDate > todayISO()) state.viewDate = todayISO();
    state.viewMode = "diary";
    state.menuOpen = false;
    render();
  }
  calendarFabBtn.addEventListener("click", openDiaryView);

  var reportTypeOverlay = document.getElementById("reportTypeOverlay");
  var reportTypeMeetingBtn = document.getElementById("reportTypeMeetingBtn");
  var reportTypeTourBtn = document.getElementById("reportTypeTourBtn");
  var reportTypeCancelBtn = document.getElementById("reportTypeCancelBtn");

  var reportTitleOverlay = document.getElementById("reportTitleOverlay");
  var reportTitleInput = document.getElementById("reportTitleInput");
  var reportTitleSaveBtn = document.getElementById("reportTitleSaveBtn");
  var reportTitleCancelBtn = document.getElementById("reportTitleCancelBtn");

  var reportDateOverlay = document.getElementById("reportDateOverlay");
  var reportDateInput = document.getElementById("reportDateInput");
  var reportDateSaveBtn = document.getElementById("reportDateSaveBtn");
  var reportDateCancelBtn = document.getElementById("reportDateCancelBtn");

  var reportParticipantsOverlay = document.getElementById("reportParticipantsOverlay");
  var reportParticipantsList = document.getElementById("reportParticipantsList");
  var reportParticipantsSaveBtn = document.getElementById("reportParticipantsSaveBtn");
  var reportParticipantsCancelBtn = document.getElementById("reportParticipantsCancelBtn");

  function addParticipantInput(focusIt) {
    var input = document.createElement("input");
    input.type = "text";
    input.className = "auth-input";
    input.placeholder = tr("reportParticipantNamePlaceholder");
    input.maxLength = 100;
    input.addEventListener("input", function () {
      if (input.value.trim() && input === reportParticipantsList.lastElementChild) {
        addParticipantInput(false);
      }
    });
    input.addEventListener("keydown", function (e) {
      e.stopPropagation();
      if (e.key === "Enter") reportParticipantsSaveBtn.click();
      if (e.key === "Escape") closeReportParticipantsModal();
    });
    reportParticipantsList.appendChild(input);
    if (focusIt) input.focus();
  }

  function resetParticipantsList(existingNames) {
    reportParticipantsList.innerHTML = "";
    var names = (existingNames || []).filter(function (name) { return name; });
    if (!names.length) {
      addParticipantInput(true);
      return;
    }
    names.forEach(function (name) {
      addParticipantInput(false);
      reportParticipantsList.lastElementChild.value = name;
    });
    addParticipantInput(false);
  }

  var reportView = document.getElementById("reportView");
  var reportBackBtn = document.getElementById("reportBackBtn");
  var reportHeadTitle = document.getElementById("reportHeadTitle");
  var reportShareBtn = document.getElementById("reportShareBtn");
  var reportSaveBtn = document.getElementById("reportSaveBtn");
  var reportEditBtn = document.getElementById("reportEditBtn");
  var reportCloseBtn = document.getElementById("reportCloseBtn");
  var reportMeta = document.getElementById("reportMeta");
  var reportTableBody = document.getElementById("reportTableBody");
  var reportFabBtn = document.getElementById("reportFabBtn");

  var pendingReportDraft = null;
  var activeReportId = null;
  var editingReportCell = null;
  var openPriorityPopupRowId = null;

  function findReport(id) {
    var all = allSheets();
    for (var i = 0; i < all.length; i++) {
      var found = (all[i].reports || []).find(function (r) { return r.id === id; });
      if (found) return found;
    }
    return null;
  }

  function findSheetForReport(report) {
    var all = allSheets();
    for (var i = 0; i < all.length; i++) {
      if ((all[i].reports || []).indexOf(report) !== -1) return all[i];
    }
    return null;
  }

  function findLogo(logoId) {
    if (!logoId) return null;
    return (data.logos || []).find(function (l) { return l.id === logoId; }) || null;
  }

  function buildPdfDocTitleElement(sheet, titleText) {
    var titleEl = document.createElement("div");
    titleEl.className = "pdf-doc-title";
    titleEl.textContent = titleText;
    var logo = sheet ? findLogo(sheet.logoId) : null;
    if (!logo) return titleEl;
    var header = document.createElement("div");
    header.className = "pdf-doc-header";
    var img = document.createElement("img");
    img.className = "pdf-doc-logo";
    img.src = logo.dataUrl;
    header.appendChild(img);
    header.appendChild(titleEl);
    return header;
  }

  function findSiteLog(sheet, dateISO) {
    // Logs loaded straight from storage (created before a data-model change,
    // e.g. the tools qty/note split) never otherwise pass through
    // normalizeSiteLog - normalizing here, on every read, keeps every log
    // migrated regardless of how old it is, instead of only new ones.
    var log = (sheet.siteLogs || []).find(function (l) { return l.date === dateISO; }) || null;
    return log ? normalizeSiteLog(log) : null;
  }
  function findOrCreateSiteLog(sheet, dateISO) {
    var log = findSiteLog(sheet, dateISO);
    if (log) return log;
    log = normalizeSiteLog({ id: uid(), date: dateISO });
    if (!sheet.siteLogs) sheet.siteLogs = [];
    sheet.siteLogs.push(log);
    return log;
  }
  function findPreviousSiteLog(sheet, dateISO) {
    var candidates = (sheet.siteLogs || []).filter(function (l) { return l.date < dateISO; });
    if (!candidates.length) return null;
    candidates.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    return candidates[0];
  }
  // Read-only lookup for previewing a log that may not have been created
  // yet (nothing has been added to any category) - never mutates sheet.siteLogs.
  function getSiteLogOrEmpty(sheet, dateISO) {
    return findSiteLog(sheet, dateISO) || normalizeSiteLog({ id: null, date: dateISO });
  }
  function nextSiteLogNumber(sheet, log) {
    return log.number || ((sheet.siteLogs || []).reduce(function (max, l) { return l.number ? Math.max(max, l.number) : max; }, 0) + 1);
  }

  var diaryView = document.getElementById("diaryView");
  var siteLogPreviewBtn = document.getElementById("siteLogPreviewBtn");
  var siteLogPreviewView = document.getElementById("siteLogPreviewView");
  var siteLogPreviewBackBtn = document.getElementById("siteLogPreviewBackBtn");
  var siteLogPreviewContent = document.getElementById("siteLogPreviewContent");
  var siteLogAttendanceBtn = document.getElementById("siteLogAttendanceBtn");
  var siteLogToolsBtn = document.getElementById("siteLogToolsBtn");
  var siteLogContractorsBtn = document.getElementById("siteLogContractorsBtn");
  var siteLogWorksBtn = document.getElementById("siteLogWorksBtn");
  var siteLogCloseBtn = document.getElementById("siteLogCloseBtn");
  var siteLogShareGeneralBtn = document.getElementById("siteLogShareGeneralBtn");
  var siteLogPeriodicBtn = document.getElementById("siteLogPeriodicBtn");
  var siteLogPeriodicRangeOverlay = document.getElementById("siteLogPeriodicRangeOverlay");
  var siteLogPeriodicFromInput = document.getElementById("siteLogPeriodicFromInput");
  var siteLogPeriodicToInput = document.getElementById("siteLogPeriodicToInput");
  var siteLogPeriodicGenerateBtn = document.getElementById("siteLogPeriodicGenerateBtn");
  var siteLogPeriodicCancelBtn = document.getElementById("siteLogPeriodicCancelBtn");
  var siteLogAttendanceView = document.getElementById("siteLogAttendanceView");
  var siteLogAttendanceBackBtn = document.getElementById("siteLogAttendanceBackBtn");
  var siteLogAttendanceColumns = document.getElementById("siteLogAttendanceColumns");
  var siteLogAttendanceShareBtn = document.getElementById("siteLogAttendanceShareBtn");
  var siteLogAttendanceCopyPrevBtn = document.getElementById("siteLogAttendanceCopyPrevBtn");
  var siteLogAttendanceOrderBtn = document.getElementById("siteLogAttendanceOrderBtn");
  var siteLogAttendanceProjectName = document.getElementById("siteLogAttendanceProjectName");
  var siteLogToolsView = document.getElementById("siteLogToolsView");
  var siteLogToolsBackBtn = document.getElementById("siteLogToolsBackBtn");
  var siteLogToolsColumns = document.getElementById("siteLogToolsColumns");
  var siteLogToolsShareBtn = document.getElementById("siteLogToolsShareBtn");
  var siteLogToolsCopyPrevBtn = document.getElementById("siteLogToolsCopyPrevBtn");
  var siteLogToolsOrderBtn = document.getElementById("siteLogToolsOrderBtn");
  var siteLogToolsProjectName = document.getElementById("siteLogToolsProjectName");
  var siteLogContractorsView = document.getElementById("siteLogContractorsView");
  var siteLogContractorsBackBtn = document.getElementById("siteLogContractorsBackBtn");
  var siteLogContractorsList = document.getElementById("siteLogContractorsList");
  var siteLogContractorsCopyPrevBtn = document.getElementById("siteLogContractorsCopyPrevBtn");
  var siteLogContractorsProjectName = document.getElementById("siteLogContractorsProjectName");
  var siteLogWorksView = document.getElementById("siteLogWorksView");
  var siteLogWorksBackBtn = document.getElementById("siteLogWorksBackBtn");
  var siteLogWorksList = document.getElementById("siteLogWorksList");
  var siteLogWorksFileInput = document.getElementById("siteLogWorksFileInput");
  var siteLogWorksCameraInput = document.getElementById("siteLogWorksCameraInput");
  var siteLogWorksCopyPrevBtn = document.getElementById("siteLogWorksCopyPrevBtn");
  var siteLogWorksProjectName = document.getElementById("siteLogWorksProjectName");
  var siteLogWorksPendingEntryId = null;
  var siteLogProcurementBtn = document.getElementById("siteLogProcurementBtn");
  var siteLogProcurementView = document.getElementById("siteLogProcurementView");
  var siteLogProcurementBackBtn = document.getElementById("siteLogProcurementBackBtn");
  var siteLogProcurementShareBtn = document.getElementById("siteLogProcurementShareBtn");
  var siteLogProcurementRows = document.getElementById("siteLogProcurementRows");
  var siteLogProcurementOrderBtn = document.getElementById("siteLogProcurementOrderBtn");
  var siteLogProcurementProjectName = document.getElementById("siteLogProcurementProjectName");

  function updateSiteLogCloseShareButtons() {
    var log = findSiteLog(activeSheet(), activeSiteLogDate);
    siteLogShareGeneralBtn.disabled = !(log && log.closed);
  }

  function openSiteLogPreviewView() {
    var sheet = activeSheet();
    var log = getSiteLogOrEmpty(sheet, activeSiteLogDate);
    var number = log.number || nextSiteLogNumber(sheet, log);
    siteLogPreviewContent.innerHTML = "";
    siteLogPreviewContent.appendChild(buildSiteLogGeneralPdfElement(sheet, log, number));
    diaryView.hidden = true;
    siteLogPreviewView.hidden = false;
  }
  function closeSiteLogPreviewView() {
    siteLogPreviewView.hidden = true;
    diaryView.hidden = false;
  }
  siteLogPreviewBtn.addEventListener("click", openSiteLogPreviewView);
  siteLogPreviewBackBtn.addEventListener("click", closeSiteLogPreviewView);

  // The library already gives every project a default "diaries" folder
  // (displayed as "יומנים" in Hebrew - the same word used for these logs)
  // via DEFAULT_LIBRARY_FOLDER_KEYS/buildDefaultLibraryFolders(). Closed
  // logs belong in that existing folder, not a separate new one - an
  // earlier version of this invented its own "logs" key, which not only
  // duplicated the existing folder but, matched by display name as a fix,
  // collided with "diaries" since both read "יומנים" in Hebrew.
  var SITE_LOG_FOLDER_KEY = "diaries";

  function isSiteLogsFolder(f) {
    return f.key === SITE_LOG_FOLDER_KEY;
  }

  function ensureSiteLogsFolder(sheet) {
    return new Promise(function (resolve) {
      ensureLibraryFolders(sheet, function (folders) {
        var existing = folders.find(isSiteLogsFolder);
        if (existing) { resolve(existing.id); return; }
        var newId = uid();
        if (sheet.shared) {
          applySharedLibraryFolders(sheet.id, function (liveFolders) {
            if (liveFolders.some(isSiteLogsFolder)) return liveFolders;
            return liveFolders.concat([{ id: newId, key: SITE_LOG_FOLDER_KEY, name: null, files: [] }]);
          }).then(function (updated) {
            var folder = updated.find(isSiteLogsFolder);
            resolve(folder ? folder.id : newId);
          });
        } else {
          var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
          if (!liveSheet.folders) liveSheet.folders = folders;
          var folder = liveSheet.folders.find(isSiteLogsFolder);
          if (!folder) {
            folder = { id: newId, key: SITE_LOG_FOLDER_KEY, name: null, files: [] };
            liveSheet.folders.push(folder);
            saveData();
          }
          resolve(folder.id);
        }
      });
    });
  }

  function addFileToLibraryFolder(sheet, folderId, entry) {
    if (sheet.shared) {
      return applySharedLibraryFolders(sheet.id, function (folders) {
        return folders.map(function (f) {
          if (f.id !== folderId) return f;
          return Object.assign({}, f, { files: (f.files || []).concat([entry]) });
        });
      });
    }
    var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
    var liveFolder = liveSheet && liveSheet.folders && liveSheet.folders.find(function (f) { return f.id === folderId; });
    if (liveFolder) {
      liveFolder.files = (liveFolder.files || []).concat([entry]);
      saveData();
    }
    return Promise.resolve();
  }

  function removeLibraryFileEntry(sheet, folderId, entryId, path) {
    var removePromise = supabaseClient ? supabaseClient.storage.from(LIBRARY_BUCKET).remove([path]).catch(function () {}) : Promise.resolve();
    return removePromise.then(function () {
      if (sheet.shared) {
        return applySharedLibraryFolders(sheet.id, function (folders) {
          return folders.map(function (f) {
            if (f.id !== folderId) return f;
            return Object.assign({}, f, { files: (f.files || []).filter(function (x) { return x.id !== entryId; }) });
          });
        });
      }
      var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
      var liveFolder = liveSheet && liveSheet.folders && liveSheet.folders.find(function (f) { return f.id === folderId; });
      if (liveFolder) {
        liveFolder.files = (liveFolder.files || []).filter(function (f) { return f.id !== entryId; });
        saveData();
      }
      return Promise.resolve();
    });
  }

  function uploadClosedLogPdfToLibrary(sheet, blob, fileName) {
    return ensureSiteLogsFolder(sheet).then(function (folderId) {
      var path = sheet.id + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folderId, entry).then(function () { return { entry: entry, folderId: folderId }; });
      });
    });
  }

  // "Send procurement order" writes a PDF copy into a dedicated library
  // folder instead of actually dispatching anything to a supplier - same
  // get-or-create-by-key pattern as ensureSiteLogsFolder() above.
  var PROCUREMENT_ORDERS_FOLDER_KEY = "procurementOrders";
  function isProcurementOrdersFolder(f) {
    return f.key === PROCUREMENT_ORDERS_FOLDER_KEY;
  }
  function ensureProcurementOrdersFolder(sheet) {
    return new Promise(function (resolve) {
      ensureLibraryFolders(sheet, function (folders) {
        var existing = folders.find(isProcurementOrdersFolder);
        if (existing) { resolve(existing.id); return; }
        var newId = uid();
        if (sheet.shared) {
          applySharedLibraryFolders(sheet.id, function (liveFolders) {
            if (liveFolders.some(isProcurementOrdersFolder)) return liveFolders;
            return liveFolders.concat([{ id: newId, key: PROCUREMENT_ORDERS_FOLDER_KEY, name: null, files: [] }]);
          }).then(function (updated) {
            var folder = updated.find(isProcurementOrdersFolder);
            resolve(folder ? folder.id : newId);
          });
        } else {
          var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
          if (!liveSheet.folders) liveSheet.folders = folders;
          var folder = liveSheet.folders.find(isProcurementOrdersFolder);
          if (!folder) {
            folder = { id: newId, key: PROCUREMENT_ORDERS_FOLDER_KEY, name: null, files: [] };
            liveSheet.folders.push(folder);
            saveData();
          }
          resolve(folder.id);
        }
      });
    });
  }
  function uploadProcurementOrderPdfToLibrary(sheet, blob, fileName) {
    return ensureProcurementOrdersFolder(sheet).then(function (folderId) {
      var path = sheet.id + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folderId, entry).then(function () { return { entry: entry, folderId: folderId }; });
      });
    });
  }

  // "Send attendance report" - same pattern as the procurement order above,
  // filing into its own dedicated (also permanent) library folder.
  var ATTENDANCE_REPORTS_FOLDER_KEY = "attendanceReports";
  function isAttendanceReportsFolder(f) {
    return f.key === ATTENDANCE_REPORTS_FOLDER_KEY;
  }
  function ensureAttendanceReportsFolder(sheet) {
    return new Promise(function (resolve) {
      ensureLibraryFolders(sheet, function (folders) {
        var existing = folders.find(isAttendanceReportsFolder);
        if (existing) { resolve(existing.id); return; }
        var newId = uid();
        if (sheet.shared) {
          applySharedLibraryFolders(sheet.id, function (liveFolders) {
            if (liveFolders.some(isAttendanceReportsFolder)) return liveFolders;
            return liveFolders.concat([{ id: newId, key: ATTENDANCE_REPORTS_FOLDER_KEY, name: null, files: [] }]);
          }).then(function (updated) {
            var folder = updated.find(isAttendanceReportsFolder);
            resolve(folder ? folder.id : newId);
          });
        } else {
          var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
          if (!liveSheet.folders) liveSheet.folders = folders;
          var folder = liveSheet.folders.find(isAttendanceReportsFolder);
          if (!folder) {
            folder = { id: newId, key: ATTENDANCE_REPORTS_FOLDER_KEY, name: null, files: [] };
            liveSheet.folders.push(folder);
            saveData();
          }
          resolve(folder.id);
        }
      });
    });
  }
  function uploadAttendanceReportPdfToLibrary(sheet, blob, fileName) {
    return ensureAttendanceReportsFolder(sheet).then(function (folderId) {
      var path = sheet.id + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folderId, entry).then(function () { return { entry: entry, folderId: folderId }; });
      });
    });
  }

  // "Send tools report" - same pattern again, for the tools log's own
  // dedicated (also permanent) library folder.
  var TOOLS_REPORTS_FOLDER_KEY = "toolsReports";
  function isToolsReportsFolder(f) {
    return f.key === TOOLS_REPORTS_FOLDER_KEY;
  }
  function ensureToolsReportsFolder(sheet) {
    return new Promise(function (resolve) {
      ensureLibraryFolders(sheet, function (folders) {
        var existing = folders.find(isToolsReportsFolder);
        if (existing) { resolve(existing.id); return; }
        var newId = uid();
        if (sheet.shared) {
          applySharedLibraryFolders(sheet.id, function (liveFolders) {
            if (liveFolders.some(isToolsReportsFolder)) return liveFolders;
            return liveFolders.concat([{ id: newId, key: TOOLS_REPORTS_FOLDER_KEY, name: null, files: [] }]);
          }).then(function (updated) {
            var folder = updated.find(isToolsReportsFolder);
            resolve(folder ? folder.id : newId);
          });
        } else {
          var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
          if (!liveSheet.folders) liveSheet.folders = folders;
          var folder = liveSheet.folders.find(isToolsReportsFolder);
          if (!folder) {
            folder = { id: newId, key: TOOLS_REPORTS_FOLDER_KEY, name: null, files: [] };
            liveSheet.folders.push(folder);
            saveData();
          }
          resolve(folder.id);
        }
      });
    });
  }
  function uploadToolsReportPdfToLibrary(sheet, blob, fileName) {
    return ensureToolsReportsFolder(sheet).then(function (folderId) {
      var path = sheet.id + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folderId, entry).then(function () { return { entry: entry, folderId: folderId }; });
      });
    });
  }

  // The "reports" folder (unlike the old "diaries"/site-logs one) is one of
  // the 4 protected defaults every sheet already gets from
  // buildDefaultLibraryFolders()/ensureLibraryFolders(), and it can never be
  // deleted through the UI - so no "create it if missing" branch is needed
  // here the way ensureSiteLogsFolder() needs one.
  function ensureReportsFolder(sheet) {
    return new Promise(function (resolve, reject) {
      ensureLibraryFolders(sheet, function (folders) {
        var folder = folders.find(function (f) { return f.key === "reports"; });
        if (folder) resolve(folder.id); else reject(new Error("reports folder missing"));
      });
    });
  }

  function uploadReportPdfToLibrary(sheet, blob, fileName) {
    return ensureReportsFolder(sheet).then(function (folderId) {
      var path = sheet.id + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(fileName);
      return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
        if (result.error) throw result.error;
        var entry = { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() };
        return addFileToLibraryFolder(sheet, folderId, entry).then(function () { return { entry: entry, folderId: folderId }; });
      });
    });
  }

  function closeReport() {
    var report = findReport(activeReportId);
    var sheet = activeSheet();
    if (!report || !supabaseClient) { alert(tr("libraryUploadError")); return; }
    var originalContent = reportCloseBtn.textContent;
    reportCloseBtn.disabled = true;
    reportCloseBtn.innerHTML = "&#8987;";
    var previousFile = report.closedFile;
    buildReportPdfBlob(report).then(function (result) {
      var removePrevious = previousFile
        ? removeLibraryFileEntry(sheet, previousFile.folderId, previousFile.entryId, previousFile.path).catch(function () {})
        : Promise.resolve();
      return removePrevious.then(function () {
        return uploadReportPdfToLibrary(sheet, result.blob, result.fileName);
      }).then(function (uploaded) {
        var liveReport = findReport(report.id);
        if (liveReport) liveReport.closedFile = { folderId: uploaded.folderId, entryId: uploaded.entry.id, path: uploaded.entry.path };
        saveData();
        // reportView is only ever hidden, never removed from the DOM, so
        // this button's disabled/spinner state would otherwise still be
        // showing the next time any report is opened.
        reportCloseBtn.disabled = false;
        reportCloseBtn.textContent = originalContent;
        closeReportView();
      });
    }).catch(function (err) {
      console.error("close report failed:", err);
      alert(tr("reportPdfError"));
      reportCloseBtn.disabled = false;
      reportCloseBtn.textContent = originalContent;
    });
  }

  function siteLogGeneralFileName(sheet, log, number) {
    return tr("siteLogGeneralReportTitle") + " " + number + " " + sheet.name + " " + isoToFileNameDate(log.date) + ".pdf";
  }

  function closeSiteLog() {
    var sheet = activeSheet();
    var log = findOrCreateSiteLog(sheet, activeSiteLogDate);
    if (!supabaseClient) { alert(tr("libraryUploadError")); return; }
    var number = nextSiteLogNumber(sheet, log);
    var originalContent = siteLogCloseBtn.textContent;
    siteLogCloseBtn.disabled = true;
    siteLogCloseBtn.innerHTML = "&#8987;";
    var element = buildSiteLogGeneralPdfElement(sheet, log, number);
    var fileName = siteLogGeneralFileName(sheet, log, number);
    var previousFile = log.closedFile;
    buildPdfBlobFromElement(element, fileName).then(function (result) {
      // Closing again (after further edits) replaces the previous PDF in
      // the library rather than piling up a new copy each time - remove
      // the old one first so the folder only ever holds this log's latest
      // version.
      var removePrevious = previousFile
        ? removeLibraryFileEntry(sheet, previousFile.folderId, previousFile.entryId, previousFile.path).catch(function () {})
        : Promise.resolve();
      return removePrevious.then(function () {
        return uploadClosedLogPdfToLibrary(sheet, result.blob, result.fileName);
      }).then(function (uploaded) {
        var liveLog = findOrCreateSiteLog(activeSheet(), activeSiteLogDate);
        liveLog.number = number;
        liveLog.closed = true;
        liveLog.closedAt = Date.now();
        liveLog.closedFile = { folderId: uploaded.folderId, entryId: uploaded.entry.id, path: uploaded.entry.path };
        saveData();
        updateSiteLogCloseShareButtons();
      });
    }).catch(function (err) {
      console.error("close site log failed:", err);
      alert(tr("reportPdfError"));
    }).then(function () {
      siteLogCloseBtn.disabled = false;
      siteLogCloseBtn.textContent = originalContent;
    });
  }

  function shareSiteLogGeneral() {
    var sheet = activeSheet();
    var log = findSiteLog(sheet, activeSiteLogDate);
    if (!log || !log.closed) { showToast(tr("siteLogCloseFirstMsg")); return; }
    var originalContent = siteLogShareGeneralBtn.textContent;
    siteLogShareGeneralBtn.disabled = true;
    siteLogShareGeneralBtn.innerHTML = "&#8987;";
    var element = buildSiteLogGeneralPdfElement(sheet, log, log.number);
    var fileName = siteLogGeneralFileName(sheet, log, log.number);
    buildPdfBlobFromElement(element, fileName).then(function (result) {
      attemptShare(result.blob, result.fileName);
    }).catch(function (err) {
      console.error("share site log failed:", err);
      alert(tr("reportPdfError"));
    }).then(function () {
      siteLogShareGeneralBtn.disabled = !log.closed;
      siteLogShareGeneralBtn.textContent = originalContent;
    });
  }

  siteLogCloseBtn.addEventListener("click", closeSiteLog);
  siteLogShareGeneralBtn.addEventListener("click", shareSiteLogGeneral);

  function openSiteLogPeriodicModal() {
    siteLogPeriodicFromInput.value = "";
    siteLogPeriodicToInput.value = "";
    siteLogPeriodicFromInput.max = todayISO();
    siteLogPeriodicToInput.max = todayISO();
    siteLogPeriodicRangeOverlay.hidden = false;
  }
  function closeSiteLogPeriodicModal() {
    siteLogPeriodicRangeOverlay.hidden = true;
  }
  function buildSiteLogPeriodicPdfElement(sheet, logs) {
    var wrap = document.createElement("div");
    // first: how much of the work plan got done, and why not
    var summary = logs.length && buildPlannedSummaryElement(sheet, logs, logs[0].date, logs[logs.length - 1].date);
    if (summary) wrap.appendChild(summary);
    logs.forEach(function (log, index) {
      var docEl = buildSiteLogGeneralPdfElement(sheet, log, log.number);
      if (index > 0 || summary) docEl.classList.add("pdf-doc-periodic-section");
      wrap.appendChild(docEl);
    });
    return wrap;
  }
  function generateSiteLogPeriodicReport() {
    var from = siteLogPeriodicFromInput.value;
    var to = siteLogPeriodicToInput.value;
    if (!from || !to) { alert(tr("siteLogPeriodicMissingDatesMsg")); return; }
    if (from > to) { alert(tr("siteLogPeriodicInvalidRangeMsg")); return; }
    var sheet = activeSheet();
    var logs = (sheet.siteLogs || []).filter(function (l) {
      return l.closed && l.date >= from && l.date <= to;
    }).sort(function (a, b) { return a.date < b.date ? -1 : 1; }).map(normalizeSiteLog);
    if (!logs.length) { alert(tr("siteLogPeriodicNoLogsMsg")); return; }
    closeSiteLogPeriodicModal();
    var originalContent = siteLogPeriodicBtn.textContent;
    siteLogPeriodicBtn.disabled = true;
    siteLogPeriodicBtn.innerHTML = "&#8987;";
    var element = buildSiteLogPeriodicPdfElement(sheet, logs);
    var fileName = tr("siteLogPeriodicFileNamePrefix") + " " + sheet.name + " " + isoToFileNameDate(from) + " - " + isoToFileNameDate(to) + ".pdf";
    buildPdfBlobFromElement(element, fileName).then(function (result) {
      attemptShare(result.blob, result.fileName);
    }).catch(function (err) {
      console.error("periodic site log report failed:", err);
      alert(tr("reportPdfError"));
    }).then(function () {
      siteLogPeriodicBtn.disabled = false;
      siteLogPeriodicBtn.textContent = originalContent;
    });
  }
  siteLogPeriodicBtn.addEventListener("click", openSiteLogPeriodicModal);
  siteLogPeriodicCancelBtn.addEventListener("click", closeSiteLogPeriodicModal);
  siteLogPeriodicRangeOverlay.addEventListener("click", function (e) {
    if (e.target === siteLogPeriodicRangeOverlay) closeSiteLogPeriodicModal();
  });
  siteLogPeriodicGenerateBtn.addEventListener("click", generateSiteLogPeriodicReport);

  // Shared by every simple "growable list of names with a + at the bottom"
  // site-log category (attendance columns, contractors, ...): renders the
  // existing entries plus a + that turns into a text input, committing a
  // new entry and putting a fresh + below it once you start typing.
  // getSuggestions (optional): names offered while typing - Head Office's
  // "הזנת נתונים" lists for this column, minus names already entered.
  var siteLogSuggestSeq = 0;
  function renderSiteLogNameList(container, getEntries, addEntry, removeEntry, rerender, getSuggestions) {
    container.innerHTML = "";

    function buildRow(entry) {
      var row = document.createElement("div");
      row.className = "site-log-entry";
      var nameSpan = document.createElement("span");
      nameSpan.textContent = entry.name;
      row.appendChild(nameSpan);
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "site-log-entry-remove";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        removeEntry(entry.id);
        saveData();
        rerender();
      });
      row.appendChild(removeBtn);
      return row;
    }

    getEntries().forEach(function (entry) { container.appendChild(buildRow(entry)); });

    function createAddBtn() {
      var addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "site-log-add-btn";
      var addBtnImg = document.createElement("img");
      addBtnImg.src = "tasks-plus-icon.webp";
      addBtnImg.alt = "+";
      addBtn.appendChild(addBtnImg);
      addBtn.addEventListener("click", function () { activateAddBtn(addBtn); });
      return addBtn;
    }

    function activateAddBtn(addBtn) {
      var input = document.createElement("input");
      input.type = "text";
      input.className = "site-log-add-input";
      input.maxLength = 60;
      var suggestions = getSuggestions ? getSuggestions() : [];
      if (suggestions.length) {
        var taken = getEntries().map(function (e) { return e.name; });
        var listEl = document.createElement("datalist");
        listEl.id = "siteLogSuggest" + (++siteLogSuggestSeq);
        suggestions.forEach(function (name) {
          if (taken.indexOf(name) !== -1) return;
          var opt = document.createElement("option");
          opt.value = name;
          listEl.appendChild(opt);
        });
        container.appendChild(listEl);
        input.setAttribute("list", listEl.id);
      }
      container.replaceChild(input, addBtn);
      input.focus();
      var committed = false;
      var nextBtnShown = false;
      // Commits in place (swaps the input for a normal row) instead of
      // calling the full rerender() - the "next +" shown below the moment
      // typing starts stays a live sibling element this way, so clicking it
      // (which blurs this input first, committing it) still lands its own
      // click right after instead of that click's target having just been
      // destroyed by a full rebuild of the whole column list.
      function commit() {
        if (committed) return;
        committed = true;
        var name = input.value.trim();
        if (!name) {
          if (input.parentNode) input.parentNode.removeChild(input);
          return;
        }
        var entry = addEntry(name);
        saveData();
        if (input.parentNode) input.parentNode.replaceChild(buildRow(entry), input);
      }
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); input.blur(); }
        else if (e.key === "Escape") { committed = true; rerender(); }
      });
      // Show the next "+" the moment typing starts, instead of waiting for
      // this entry to be committed first.
      input.addEventListener("input", function () {
        if (nextBtnShown || !input.value.trim()) return;
        nextBtnShown = true;
        container.appendChild(createAddBtn());
      });
    }

    container.appendChild(createAddBtn());
  }

  function renderSiteLogAttendanceColumn(colKey) {
    var col = document.createElement("div");
    col.className = "site-log-col";

    var header = document.createElement("div");
    header.className = "site-log-col-header";
    header.textContent = tr("siteLogCol" + colKey.charAt(0).toUpperCase() + colKey.slice(1));
    col.appendChild(header);

    var body = document.createElement("div");
    body.className = "site-log-col-body";
    renderSiteLogNameList(
      body,
      function () { var log = findSiteLog(activeSheet(), activeSiteLogDate); return (log && log.attendance[colKey]) || []; },
      function (name) {
        var entry = { id: uid(), name: name };
        findOrCreateSiteLog(activeSheet(), activeSiteLogDate).attendance[colKey].push(entry);
        return entry;
      },
      function (id) {
        var log = findSiteLog(activeSheet(), activeSiteLogDate);
        if (log) log.attendance[colKey] = log.attendance[colKey].filter(function (e) { return e.id !== id; });
      },
      renderSiteLogAttendanceColumns,
      function () { return officeDirectoryNames(activeSheet(), ATTENDANCE_TO_OFFICE_FOLDER[colKey]); }
    );

    col.appendChild(body);
    return col;
  }

  function renderSiteLogAttendanceColumns() {
    siteLogAttendanceColumns.innerHTML = "";
    SITE_LOG_ATTENDANCE_COLUMNS.forEach(function (colKey) {
      siteLogAttendanceColumns.appendChild(renderSiteLogAttendanceColumn(colKey));
    });
  }

  function openSiteLogAttendanceView() {
    siteLogAttendanceProjectName.textContent = activeSheet().name;
    renderSiteLogAttendanceColumns();
    diaryView.hidden = true;
    siteLogAttendanceView.hidden = false;
  }
  function closeSiteLogAttendanceView() {
    siteLogAttendanceView.hidden = true;
    diaryView.hidden = false;
  }
  siteLogAttendanceBtn.addEventListener("click", openSiteLogAttendanceView);
  siteLogAttendanceBackBtn.addEventListener("click", closeSiteLogAttendanceView);

  function siteLogToolEntries(colKey) {
    var log = findSiteLog(activeSheet(), activeSiteLogDate);
    return (log && log.tools[colKey]) || [];
  }

  // A tool column is a growable list of qty+note rows: existing (committed)
  // entries each get their own row, plus one always-present blank row at the
  // bottom. The moment a number is typed into that blank row's qty field, a
  // fresh blank row appears right below it - so there's always an empty row
  // ready, without a separate "+" button. A row that's never filled in never
  // becomes a real entry, so it never shows up in the report/log view.
  function buildToolEntryRow(colKey, entry, body) {
    var row = document.createElement("div");
    row.className = "site-log-tool-value-row";

    var qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "0";
    qtyInput.inputMode = "numeric";
    qtyInput.className = "site-log-tool-qty-input";

    var noteInput = document.createElement("input");
    noteInput.type = "text";
    noteInput.className = "site-log-tool-note-input";

    row.appendChild(qtyInput);
    row.appendChild(noteInput);

    if (entry) {
      qtyInput.value = entry.qty || "";
      noteInput.value = entry.note || "";
      function save() {
        entry.qty = qtyInput.value.trim();
        entry.note = noteInput.value.trim();
        saveData();
      }
      qtyInput.addEventListener("change", save);
      noteInput.addEventListener("change", save);

      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "site-log-entry-remove";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        var list = siteLogToolEntries(colKey);
        var idx = list.indexOf(entry);
        if (idx !== -1) list.splice(idx, 1);
        saveData();
        row.remove();
      });
      row.appendChild(removeBtn);
    } else {
      var nextRowShown = false;
      var committed = false;
      qtyInput.addEventListener("input", function () {
        if (nextRowShown || !qtyInput.value.trim()) return;
        nextRowShown = true;
        body.appendChild(buildToolEntryRow(colKey, null, body));
      });
      row.addEventListener("focusout", function (e) {
        if (committed || row.contains(e.relatedTarget)) return;
        var qty = qtyInput.value.trim();
        var note = noteInput.value.trim();
        if (!qty && !note) return;
        committed = true;
        var liveLog = findOrCreateSiteLog(activeSheet(), activeSiteLogDate);
        if (!Array.isArray(liveLog.tools[colKey])) liveLog.tools[colKey] = [];
        var newEntry = { id: uid(), qty: qty, note: note };
        liveLog.tools[colKey].push(newEntry);
        saveData();
        if (!nextRowShown) { nextRowShown = true; body.appendChild(buildToolEntryRow(colKey, null, body)); }
        body.replaceChild(buildToolEntryRow(colKey, newEntry, body), row);
      });
    }

    return row;
  }

  function renderSiteLogToolsColumn(colKey) {
    var col = document.createElement("div");
    col.className = "site-log-col";

    var header = document.createElement("div");
    header.className = "site-log-col-header";
    header.textContent = tr("siteLogCol" + colKey.charAt(0).toUpperCase() + colKey.slice(1));
    col.appendChild(header);

    var body = document.createElement("div");
    body.className = "site-log-col-body";
    siteLogToolEntries(colKey).forEach(function (entry) {
      body.appendChild(buildToolEntryRow(colKey, entry, body));
    });
    body.appendChild(buildToolEntryRow(colKey, null, body));

    col.appendChild(body);
    return col;
  }

  function renderSiteLogToolsColumns() {
    siteLogToolsColumns.innerHTML = "";
    SITE_LOG_TOOLS_COLUMNS.forEach(function (colKey) {
      siteLogToolsColumns.appendChild(renderSiteLogToolsColumn(colKey));
    });
  }

  function openSiteLogToolsView() {
    siteLogToolsProjectName.textContent = activeSheet().name;
    renderSiteLogToolsColumns();
    diaryView.hidden = true;
    siteLogToolsView.hidden = false;
  }
  function closeSiteLogToolsView() {
    siteLogToolsView.hidden = true;
    diaryView.hidden = false;
  }
  siteLogToolsBtn.addEventListener("click", openSiteLogToolsView);
  siteLogToolsBackBtn.addEventListener("click", closeSiteLogToolsView);

  function renderSiteLogContractorsList() {
    renderSiteLogNameList(
      siteLogContractorsList,
      function () { var log = findSiteLog(activeSheet(), activeSiteLogDate); return (log && log.contractors) || []; },
      function (name) {
        var entry = { id: uid(), name: name };
        findOrCreateSiteLog(activeSheet(), activeSiteLogDate).contractors.push(entry);
        return entry;
      },
      function (id) {
        var log = findSiteLog(activeSheet(), activeSiteLogDate);
        if (log) log.contractors = log.contractors.filter(function (e) { return e.id !== id; });
      },
      renderSiteLogContractorsList,
      function () { return officeDirectoryNames(activeSheet(), "crews"); }
    );
  }

  function openSiteLogContractorsView() {
    siteLogContractorsProjectName.textContent = activeSheet().name;
    renderSiteLogContractorsList();
    diaryView.hidden = true;
    siteLogContractorsView.hidden = false;
  }
  function closeSiteLogContractorsView() {
    siteLogContractorsView.hidden = true;
    diaryView.hidden = false;
  }
  siteLogContractorsBtn.addEventListener("click", openSiteLogContractorsView);
  siteLogContractorsBackBtn.addEventListener("click", closeSiteLogContractorsView);

  function renderSiteLogWorksList() {
    siteLogWorksList.innerHTML = "";
    var sheet = activeSheet();
    var log = findSiteLog(sheet, activeSiteLogDate);
    var entries = (log && log.works) || [];

    entries.forEach(function (entry) {
      var wrap = document.createElement("div");
      wrap.className = "site-log-work-entry";

      var row = document.createElement("div");
      row.className = "site-log-work-row";
      var textSpan = document.createElement("span");
      textSpan.className = "site-log-work-text";
      textSpan.textContent = entry.text;
      row.appendChild(textSpan);
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "site-log-entry-remove";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        var liveLog = findSiteLog(activeSheet(), activeSiteLogDate);
        if (!liveLog) return;
        var target = liveLog.works.find(function (e) { return e.id === entry.id; });
        var removePromise = (target && target.attachment && supabaseClient)
          ? supabaseClient.storage.from(LIBRARY_BUCKET).remove([target.attachment.path]).catch(function () {})
          : Promise.resolve();
        removePromise.then(function () {
          liveLog.works = liveLog.works.filter(function (e) { return e.id !== entry.id; });
          saveData();
          renderSiteLogWorksList();
        });
      });
      row.appendChild(removeBtn);
      wrap.appendChild(row);

      if (entry.attachment) {
        var previewWrap = document.createElement("div");
        previewWrap.className = "site-log-work-attachment-preview";
        if (isImageFile(entry.attachment)) {
          var thumb = document.createElement("img");
          thumb.className = "site-log-work-attachment-thumb";
          thumb.src = entry.attachment.url;
          thumb.alt = "";
          previewWrap.appendChild(thumb);
        } else {
          var icon = document.createElement("span");
          icon.textContent = "\u{1F4CE}";
          previewWrap.appendChild(icon);
        }
        var link = document.createElement("a");
        link.className = "site-log-work-attachment-name";
        link.textContent = entry.attachment.name;
        link.href = entry.attachment.url;
        link.target = "_blank";
        link.rel = "noopener";
        previewWrap.appendChild(link);
        var removeAttachBtn = document.createElement("button");
        removeAttachBtn.type = "button";
        removeAttachBtn.className = "site-log-work-attachment-remove";
        removeAttachBtn.textContent = "✕";
        removeAttachBtn.addEventListener("click", function () {
          var liveLog = findSiteLog(activeSheet(), activeSiteLogDate);
          var target = liveLog && liveLog.works.find(function (e) { return e.id === entry.id; });
          if (!target || !target.attachment) return;
          var path = target.attachment.path;
          var removePromise = supabaseClient ? supabaseClient.storage.from(LIBRARY_BUCKET).remove([path]).catch(function () {}) : Promise.resolve();
          removePromise.then(function () {
            target.attachment = null;
            saveData();
            renderSiteLogWorksList();
          });
        });
        previewWrap.appendChild(removeAttachBtn);
        wrap.appendChild(previewWrap);
      } else {
        var attachRow = document.createElement("div");
        attachRow.className = "site-log-work-attach-row";
        var cameraBtn = document.createElement("button");
        cameraBtn.type = "button";
        cameraBtn.className = "site-log-work-attach-btn";
        cameraBtn.textContent = "\u{1F4F7} " + tr("imagePopupCamera");
        cameraBtn.addEventListener("click", function () {
          siteLogWorksPendingEntryId = entry.id;
          siteLogWorksCameraInput.value = "";
          siteLogWorksCameraInput.click();
        });
        attachRow.appendChild(cameraBtn);
        var attachBtn = document.createElement("button");
        attachBtn.type = "button";
        attachBtn.className = "site-log-work-attach-btn";
        attachBtn.textContent = "\u{1F4CE}";
        attachBtn.title = tr("chatAttachBtnTitle");
        attachBtn.addEventListener("click", function () {
          siteLogWorksPendingEntryId = entry.id;
          siteLogWorksFileInput.value = "";
          siteLogWorksFileInput.click();
        });
        attachRow.appendChild(attachBtn);
        wrap.appendChild(attachRow);
      }

      siteLogWorksList.appendChild(wrap);
    });

    function createWorksAddBtn() {
      var addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "site-log-add-btn";
      var addBtnImg = document.createElement("img");
      addBtnImg.src = "tasks-plus-icon.webp";
      addBtnImg.alt = "+";
      addBtn.appendChild(addBtnImg);
      addBtn.addEventListener("click", function () { activateWorksAddBtn(addBtn); });
      return addBtn;
    }

    function activateWorksAddBtn(addBtn) {
      var input = document.createElement("input");
      input.type = "text";
      input.className = "site-log-add-input";
      input.maxLength = 200;
      siteLogWorksList.replaceChild(input, addBtn);
      input.focus();
      var committed = false;
      var nextBtnShown = false;
      function commit() {
        if (committed) return;
        committed = true;
        var text = input.value.trim();
        if (text) {
          var liveLog = findOrCreateSiteLog(activeSheet(), activeSiteLogDate);
          liveLog.works.push({ id: uid(), text: text, attachment: null });
          saveData();
        }
        renderSiteLogWorksList();
      }
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); input.blur(); }
        else if (e.key === "Escape") { committed = true; renderSiteLogWorksList(); }
      });
      input.addEventListener("input", function () {
        if (nextBtnShown || !input.value.trim()) return;
        nextBtnShown = true;
        siteLogWorksList.appendChild(createWorksAddBtn());
      });
    }

    siteLogWorksList.appendChild(createWorksAddBtn());
  }

  // Shared by both the camera input (a fresh photo, accept="image/*"
  // capture="environment") and the plain file input (any file, picked
  // from the gallery/file browser) - same upload/attach logic either way.
  function uploadWorksAttachment(file) {
    var entryId = siteLogWorksPendingEntryId;
    siteLogWorksPendingEntryId = null;
    if (!file || !entryId || !supabaseClient) return;
    var sheet = activeSheet();
    var path = sheet.id + "/site-logs/" + activeSiteLogDate + "/" + uid() + "-" + safeStorageFileName(file.name);
    supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, file).then(function (result) {
      if (result.error) throw result.error;
      return resolveFileUrl(path);
    }).then(function (url) {
      var liveLog = findSiteLog(activeSheet(), activeSiteLogDate);
      var entry = liveLog && liveLog.works.find(function (e) { return e.id === entryId; });
      if (entry) {
        entry.attachment = { name: file.name, path: path, url: url, type: file.type || "" };
        saveData();
        renderSiteLogWorksList();
      }
    }).catch(function (err) {
      console.error("site log work attachment upload failed:", err);
      alert(tr("libraryUploadError"));
    });
  }
  siteLogWorksFileInput.addEventListener("change", function () {
    uploadWorksAttachment(siteLogWorksFileInput.files && siteLogWorksFileInput.files[0]);
  });
  siteLogWorksCameraInput.addEventListener("change", function () {
    uploadWorksAttachment(siteLogWorksCameraInput.files && siteLogWorksCameraInput.files[0]);
  });

  function openSiteLogWorksView() {
    siteLogWorksProjectName.textContent = activeSheet().name;
    renderSiteLogWorksList();
    diaryView.hidden = true;
    siteLogWorksView.hidden = false;
  }
  function closeSiteLogWorksView() {
    siteLogWorksView.hidden = true;
    diaryView.hidden = false;
  }
  siteLogWorksBtn.addEventListener("click", openSiteLogWorksView);
  siteLogWorksBackBtn.addEventListener("click", closeSiteLogWorksView);

  function renderSiteLogProcurementRows() {
    siteLogProcurementRows.innerHTML = "";
    var log = findSiteLog(activeSheet(), activeSiteLogDate);
    var entries = (log && log.procurement) || [];

    entries.forEach(function (entry) {
      var row = document.createElement("div");
      row.className = "site-log-procurement-row";

      // Read-only here - only Head Office can mark a row purchased (see
      // officeProcurementList below); this just reflects that state once
      // it's set, via the row's own synced data, same as everything else
      // on this row.
      if (entry.purchased) {
        var mark = document.createElement("span");
        mark.className = "purchased-mark purchased";
        row.appendChild(mark);
      }

      var itemInput = document.createElement("input");
      itemInput.type = "text";
      itemInput.className = "site-log-procurement-item";
      itemInput.maxLength = 80;
      itemInput.value = entry.item;
      itemInput.placeholder = tr("siteLogColItem");
      itemInput.addEventListener("blur", function () {
        entry.item = itemInput.value.trim();
        saveData();
      });
      row.appendChild(itemInput);

      var quantityInput = document.createElement("input");
      quantityInput.type = "text";
      quantityInput.className = "site-log-procurement-quantity";
      quantityInput.maxLength = 30;
      quantityInput.value = entry.quantity;
      quantityInput.placeholder = tr("siteLogColQuantity");
      quantityInput.addEventListener("blur", function () {
        entry.quantity = quantityInput.value.trim();
        saveData();
      });
      row.appendChild(quantityInput);

      var supplierInput = document.createElement("input");
      supplierInput.type = "text";
      supplierInput.className = "site-log-procurement-supplier";
      supplierInput.maxLength = 80;
      supplierInput.value = entry.supplier;
      supplierInput.placeholder = tr("siteLogColSupplier");
      supplierInput.addEventListener("blur", function () {
        entry.supplier = supplierInput.value.trim();
        saveData();
      });
      row.appendChild(supplierInput);

      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "site-log-procurement-row-remove";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        var liveLog = findSiteLog(activeSheet(), activeSiteLogDate);
        if (!liveLog) return;
        liveLog.procurement = liveLog.procurement.filter(function (e) { return e.id !== entry.id; });
        saveData();
        renderSiteLogProcurementRows();
      });
      row.appendChild(removeBtn);

      siteLogProcurementRows.appendChild(row);
    });

    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "site-log-add-btn";
    var addBtnImg = document.createElement("img");
    addBtnImg.src = "tasks-plus-icon.webp";
    addBtnImg.alt = "+";
    addBtn.appendChild(addBtnImg);
    addBtn.addEventListener("click", function () {
      var liveLog = findOrCreateSiteLog(activeSheet(), activeSiteLogDate);
      liveLog.procurement.push({ id: uid(), item: "", quantity: "", supplier: "" });
      saveData();
      renderSiteLogProcurementRows();
      var lastRow = siteLogProcurementRows.lastElementChild;
      var firstInput = lastRow && lastRow.querySelector("input");
      if (firstInput) firstInput.focus();
    });
    siteLogProcurementRows.appendChild(addBtn);
  }

  function openSiteLogProcurementView() {
    siteLogProcurementProjectName.textContent = activeSheet().name;
    renderSiteLogProcurementRows();
    diaryView.hidden = true;
    siteLogProcurementView.hidden = false;
  }
  function closeSiteLogProcurementView() {
    siteLogProcurementView.hidden = true;
    diaryView.hidden = false;
  }
  siteLogProcurementBtn.addEventListener("click", openSiteLogProcurementView);
  siteLogProcurementBackBtn.addEventListener("click", closeSiteLogProcurementView);

  function copyPreviousSiteLogCategory(applyFn, onDone) {
    var sheet = activeSheet();
    var prevLog = findPreviousSiteLog(sheet, activeSiteLogDate);
    if (!prevLog) { showToast(tr("siteLogNoPreviousLog")); return; }
    askConfirm(tr("siteLogCopyPrevConfirm"), function () {
      var liveLog = findOrCreateSiteLog(sheet, activeSiteLogDate);
      applyFn(liveLog, prevLog);
      saveData();
      onDone();
    });
  }

  siteLogAttendanceCopyPrevBtn.addEventListener("click", function () {
    copyPreviousSiteLogCategory(function (liveLog, prevLog) {
      var copied = {};
      SITE_LOG_ATTENDANCE_COLUMNS.forEach(function (col) {
        copied[col] = (prevLog.attendance[col] || []).map(function (e) { return { id: uid(), name: e.name }; });
      });
      liveLog.attendance = copied;
    }, renderSiteLogAttendanceColumns);
  });

  siteLogToolsCopyPrevBtn.addEventListener("click", function () {
    copyPreviousSiteLogCategory(function (liveLog, prevLog) {
      var copied = {};
      SITE_LOG_TOOLS_COLUMNS.forEach(function (col) {
        copied[col] = (prevLog.tools[col] || []).map(function (e) {
          return { id: uid(), qty: e.qty || "", note: e.note || "" };
        });
      });
      liveLog.tools = copied;
    }, renderSiteLogToolsColumns);
  });

  siteLogContractorsCopyPrevBtn.addEventListener("click", function () {
    copyPreviousSiteLogCategory(function (liveLog, prevLog) {
      liveLog.contractors = (prevLog.contractors || []).map(function (e) { return { id: uid(), name: e.name }; });
    }, renderSiteLogContractorsList);
  });

  // Attachments aren't copied - a copied row would share the same Storage
  // path as the original, and removing either row's attachment later would
  // delete the file out from under the other, so only the text carries over.
  siteLogWorksCopyPrevBtn.addEventListener("click", function () {
    copyPreviousSiteLogCategory(function (liveLog, prevLog) {
      liveLog.works = (prevLog.works || []).map(function (e) { return { id: uid(), text: e.text, attachment: null }; });
    }, renderSiteLogWorksList);
  });

  // "Sending" the order means generating the same procurement PDF the
  // share button produces, filing a copy in the library's dedicated
  // "Procurement orders" folder, and (best-effort) handing it to WhatsApp -
  // no real dispatch to a supplier's own system.
  // Marks this date's log as "sent" for one report category, directly on
  // the siteLogs array entry rather than some new top-level sheet field -
  // siteLogs already rides the existing shared-sheet sync/merge path
  // (saveData() -> saveSharedSheets()) with no extra plumbing needed, and
  // writing the same field again just overwrites it (one log per date, so
  // there's nowhere for a duplicate to even go). Head Office's combined
  // report only includes a project if this matches today's date (see
  // buildOfficeCombinedReportElement below).
  function markSiteLogReportSent(sheet, dateISO, fieldName) {
    var log = findOrCreateSiteLog(sheet, dateISO);
    log[fieldName] = dateISO;
    saveData();
  }

  siteLogProcurementOrderBtn.addEventListener("click", function () {
    if (!activeSiteLogDate) return;
    var sheet = activeSheet();
    var dateISO = activeSiteLogDate;
    var originalText = siteLogProcurementOrderBtn.textContent;
    siteLogProcurementOrderBtn.disabled = true;
    siteLogProcurementOrderBtn.textContent = "⏳";
    var fileName = tr("procurementOrderFileNamePrefix") + " " + sheet.name + " " + isoToFileNameDate(dateISO) + ".pdf";
    buildPdfBlobFromElement(buildSiteLogProcurementPdfElement(dateISO), fileName).then(function (result) {
      return uploadProcurementOrderPdfToLibrary(sheet, result.blob, result.fileName).then(function () {
        markSiteLogReportSent(sheet, dateISO, "procurementSentDate");
        showToast(tr("procurementOrderSentMsg"));
      });
    }).catch(function (err) {
      console.error(err);
    }).then(function () {
      siteLogProcurementOrderBtn.disabled = false;
      siteLogProcurementOrderBtn.textContent = originalText;
    });
  });

  // Same pattern as the procurement order button, for the attendance log.
  siteLogAttendanceOrderBtn.addEventListener("click", function () {
    if (!activeSiteLogDate) return;
    var sheet = activeSheet();
    var dateISO = activeSiteLogDate;
    var originalText = siteLogAttendanceOrderBtn.textContent;
    siteLogAttendanceOrderBtn.disabled = true;
    siteLogAttendanceOrderBtn.textContent = "⏳";
    var fileName = tr("siteLogAttendanceReportFileNamePrefix") + " " + sheet.name + " " + isoToFileNameDate(dateISO) + ".pdf";
    buildPdfBlobFromElement(buildSiteLogAttendancePdfElement(dateISO), fileName).then(function (result) {
      return uploadAttendanceReportPdfToLibrary(sheet, result.blob, result.fileName).then(function () {
        markSiteLogReportSent(sheet, dateISO, "attendanceSentDate");
        showToast(tr("attendanceReportSentMsg"));
      });
    }).catch(function (err) {
      console.error(err);
    }).then(function () {
      siteLogAttendanceOrderBtn.disabled = false;
      siteLogAttendanceOrderBtn.textContent = originalText;
    });
  });

  // Same pattern again, for the tools log.
  siteLogToolsOrderBtn.addEventListener("click", function () {
    if (!activeSiteLogDate) return;
    var sheet = activeSheet();
    var dateISO = activeSiteLogDate;
    var originalText = siteLogToolsOrderBtn.textContent;
    siteLogToolsOrderBtn.disabled = true;
    siteLogToolsOrderBtn.textContent = "⏳";
    var fileName = tr("siteLogToolsReportFileNamePrefix") + " " + sheet.name + " " + isoToFileNameDate(dateISO) + ".pdf";
    buildPdfBlobFromElement(buildSiteLogToolsPdfElement(dateISO), fileName).then(function (result) {
      return uploadToolsReportPdfToLibrary(sheet, result.blob, result.fileName).then(function () {
        markSiteLogReportSent(sheet, dateISO, "toolsSentDate");
        showToast(tr("toolsReportSentMsg"));
      });
    }).catch(function (err) {
      console.error(err);
    }).then(function () {
      siteLogToolsOrderBtn.disabled = false;
      siteLogToolsOrderBtn.textContent = originalText;
    });
  });

  function renderSheetReportsList() {
    sheetReportsList.innerHTML = "";
    var sheet = activeSheet();
    var reports = (sheet.reports || []).slice().sort(function (a, b) { return b.createdAt - a.createdAt; });
    if (!reports.length) {
      var empty = document.createElement("div");
      empty.className = "sheet-reports-empty";
      empty.textContent = tr("reportsListEmpty");
      sheetReportsList.appendChild(empty);
    } else {
      reports.forEach(function (report) {
        var item = document.createElement("button");
        item.type = "button";
        item.className = "report-list-item";
        var typeLabel = report.type === "meeting" ? tr("reportTypeMeeting") : tr("reportTypeTour");
        var titleEl = document.createElement("span");
        titleEl.className = "report-list-item-title";
        titleEl.textContent = report.title || typeLabel;
        var metaEl = document.createElement("span");
        metaEl.className = "report-list-item-meta";
        metaEl.textContent = typeLabel + " · " + isoToFullDisplay(report.date);
        item.appendChild(titleEl);
        item.appendChild(metaEl);

        var reportLongPressFired = false;
        item.addEventListener("click", function () {
          if (reportLongPressFired) { reportLongPressFired = false; return; }
          openReportView(report.id);
        });

        var reportPressStartX = 0, reportPressStartY = 0;
        var startReportPress = function (e) {
          var point = e.touches ? e.touches[0] : e;
          reportPressStartX = point.clientX;
          reportPressStartY = point.clientY;
          reportLongPressFired = false;
          clearTimeout(longPressTimer);
          longPressTimer = setTimeout(function () {
            reportLongPressFired = true;
            openReportActionModal(report.id);
          }, 1000);
        };
        var cancelReportPress = function () {
          clearTimeout(longPressTimer);
        };
        var moveReportPress = function (e) {
          var point = e.touches ? e.touches[0] : e;
          if (Math.abs(point.clientX - reportPressStartX) > 10 || Math.abs(point.clientY - reportPressStartY) > 10) {
            cancelReportPress();
          }
        };
        item.addEventListener("mousedown", startReportPress);
        item.addEventListener("mouseup", cancelReportPress);
        item.addEventListener("mouseleave", cancelReportPress);
        item.addEventListener("mousemove", moveReportPress);
        item.addEventListener("touchstart", startReportPress, { passive: true });
        item.addEventListener("touchend", cancelReportPress);
        item.addEventListener("touchmove", moveReportPress, { passive: true });

        sheetReportsList.appendChild(item);
      });
    }
    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "sheet-reports-add-btn";
    var addBtnImg = document.createElement("img");
    addBtnImg.src = "tasks-plus-icon.webp";
    addBtnImg.alt = "+";
    addBtn.appendChild(addBtnImg);
    addBtn.title = tr("addBtnTitle");
    addBtn.addEventListener("click", function () {
      reportTypeOverlay.hidden = false;
    });
    sheetReportsList.appendChild(addBtn);
  }

  reportFabBtn.addEventListener("click", function () {
    state.viewMode = "reports";
    state.menuOpen = false;
    render();
  });
  tasksFabBtn.addEventListener("click", function () {
    exitArchiveView();
    state.viewMode = "tasks";
    state.menuOpen = false;
    render();
  });

  // Head Office mode's one combined report, covering every active shared
  // project at once instead of one project's own site log - built from the
  // exact same per-category table builders and the same multi-section/one-
  // PDF technique as the periodic site-log report (buildSiteLogPeriodicPdfElement
  // above), just looping over projects instead of over one project's dates.
  var officeReportTypeView = document.getElementById("officeReportTypeView");
  var officeReportTypeBackBtn = document.getElementById("officeReportTypeBackBtn");
  var officeReportAttendanceBtn = document.getElementById("officeReportAttendanceBtn");
  var officeReportProcurementBtn = document.getElementById("officeReportProcurementBtn");
  var officeReportToolsBtn = document.getElementById("officeReportToolsBtn");

  officeReportsBtn.addEventListener("click", function () {
    state.menuOpen = false;
    officeReportTypeView.hidden = false;
    render();
  });
  function closeOfficeReportTypeModal() {
    officeReportTypeView.hidden = true;
  }
  officeReportTypeBackBtn.addEventListener("click", closeOfficeReportTypeModal);

  // findMatches/matchColumns/rowToCells are only used by the name-based
  // monthly/custom reports (attendance and tools) - procurement has no such
  // report, it stays daily-only (its "daily" equivalent is the interactive
  // purchased-marking list built further below).
  var OFFICE_REPORT_KINDS = {
    attendance: {
      titleKey: "siteLogAttendance",
      tableFn: buildAttendanceTableElement,
      sentField: "attendanceSentDate",
      findMatches: function (log, nameLower) {
        var matches = [];
        SITE_LOG_ATTENDANCE_COLUMNS.forEach(function (col) {
          ((log.attendance && log.attendance[col]) || []).forEach(function (p) {
            if (p && p.name && p.name.toLowerCase().indexOf(nameLower) !== -1) matches.push({ col: col });
          });
        });
        return matches;
      },
      matchColumns: ["officeReportColDate", "officeReportColProject", "officeReportColRole"],
      rowToCells: function (r) { return [isoToFullDisplay(r.date), r.project, siteLogColLabel(r.col)]; }
    },
    // Procurement has no person/name field (just item, quantity, supplier,
    // note) so its monthly/custom reports can't be a name lookup like
    // attendance/tools - noName routes them through buildOfficeRangeReportElement
    // instead, which just combines every sent log in the date range with no
    // filtering.
    procurement: { titleKey: "siteLogProcurement", tableFn: buildProcurementTableElement, sentField: "procurementSentDate", noName: true },
    tools: {
      titleKey: "siteLogTools",
      tableFn: buildToolsTableElement,
      sentField: "toolsSentDate",
      // The operator's name is written into the tool entry's free-text note
      // field - there's no dedicated "operator" field, that's just where
      // this gets recorded in practice.
      findMatches: function (log, nameLower) {
        var matches = [];
        SITE_LOG_TOOLS_COLUMNS.forEach(function (col) {
          ((log.tools && log.tools[col]) || []).forEach(function (e) {
            if (e && e.note && e.note.toLowerCase().indexOf(nameLower) !== -1) matches.push({ col: col, qty: e.qty });
          });
        });
        return matches;
      },
      matchColumns: ["officeReportColDate", "officeReportColProject", "officeReportColTool", "siteLogColQuantity"],
      rowToCells: function (r) { return [isoToFullDisplay(r.date), r.project, siteLogColLabel(r.col), r.qty || ""]; }
    }
  };


  // ---------------------------------------------------------------------
  // יומן – תמונות מהשטח: the day's site photos. Each one (camera or
  // gallery) gets a strip printed along its bottom - project, date, time
  // and the weather then - and is saved to the library under תמונות / the
  // day's date, and listed in that day's diary (log.photos, shown in its
  // PDF too). The day's weather is kept on the diary as well (log.weather).
  // Weather: Open-Meteo (free, no key) at the phone's location, or - when
  // there's no location - at the site's town, asked once per project.
  // ---------------------------------------------------------------------
  var diaryPhotosView = document.getElementById("diaryPhotosView");
  var diaryPhotosGrid = document.getElementById("diaryPhotosGrid");
  var diaryPlaceOverlay = document.getElementById("diaryPlaceOverlay");
  var DIARY_PLACE_KEY = "itask-site-place:";
  var diaryWeatherCache = {}; // sheetId -> { at, weather }

  // WMO weather codes -> words and a sign
  function diaryWeatherWords(code) {
    var table = [
      [[0], "☀", "weatherClear"], [[1, 2], "🌤", "weatherPartly"], [[3], "☁", "weatherCloudy"],
      [[45, 48], "🌫", "weatherFog"], [[51, 53, 55, 56, 57], "🌦", "weatherDrizzle"],
      [[61, 63, 65, 66, 67, 80, 81, 82], "🌧", "weatherRain"], [[71, 73, 75, 77, 85, 86], "❄", "weatherSnow"],
      [[95, 96, 99], "⛈", "weatherStorm"]
    ];
    for (var i = 0; i < table.length; i++) if (table[i][0].indexOf(code) >= 0) return { sign: table[i][1], words: tr(table[i][2]) };
    return { sign: "", words: "" };
  }
  function diaryWeatherText(w) {
    if (!w) return "";
    var d = diaryWeatherWords(w.code);
    // °C, not a bare ° (which right-to-left text would put before the number)
    return (d.sign + " " + Math.round(w.temp) + "°C " + d.words + (w.wind >= 25 ? " · " + tr("weatherWind").replace("{n}", Math.round(w.wind)) : "")).trim();
  }
  function diaryPhoneLocation() {
    return new Promise(function (resolve) {
      if (!navigator.geolocation) { resolve(null); return; }
      var done = false;
      var finish = function (v) { if (!done) { done = true; resolve(v); } };
      setTimeout(function () { finish(null); }, 7000);
      try {
        navigator.geolocation.getCurrentPosition(function (p) {
          finish({ lat: p.coords.latitude, lon: p.coords.longitude });
        }, function () { finish(null); }, { timeout: 6500, maximumAge: 15 * 60000, enableHighAccuracy: false });
      } catch (e) { finish(null); }
    });
  }
  // the site's town, asked once (null: no weather wanted / not found)
  function diarySitePlace(sheet) {
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(DIARY_PLACE_KEY + sheet.id) || "null"); } catch (e) {}
    if (saved) return Promise.resolve(saved.skip ? null : saved);
    return new Promise(function (resolve) {
      var input = document.getElementById("diaryPlaceInput");
      input.value = "";
      diaryPlaceOverlay.hidden = false;
      input.focus();
      var close = function () {
        diaryPlaceOverlay.hidden = true;
        document.getElementById("diaryPlaceOkBtn").onclick = null;
        document.getElementById("diaryPlaceSkipBtn").onclick = null;
      };
      document.getElementById("diaryPlaceSkipBtn").onclick = function () {
        close();
        try { localStorage.setItem(DIARY_PLACE_KEY + sheet.id, JSON.stringify({ skip: true })); } catch (e) {}
        resolve(null);
      };
      document.getElementById("diaryPlaceOkBtn").onclick = function () {
        var name = input.value.trim();
        if (!name) return;
        close();
        fetch("https://geocoding-api.open-meteo.com/v1/search?count=1&language=he&name=" + encodeURIComponent(name))
          .then(function (r) { return r.json(); })
          .then(function (res) {
            var hit = res && res.results && res.results[0];
            if (!hit) { showToast(tr("diaryPlaceNotFound")); resolve(null); return; }
            var place = { name: hit.name, lat: hit.latitude, lon: hit.longitude };
            try { localStorage.setItem(DIARY_PLACE_KEY + sheet.id, JSON.stringify(place)); } catch (e) {}
            resolve(place);
          }, function () { resolve(null); });
      };
    });
  }
  // the weather now at the site (kept for 20 minutes), or null
  function diaryWeatherNow(sheet) {
    var c = diaryWeatherCache[sheet.id];
    if (c && Date.now() - c.at < 20 * 60000) return Promise.resolve(c.weather);
    return diaryPhoneLocation().then(function (loc) {
      return loc || diarySitePlace(sheet);
    }).then(function (loc) {
      if (!loc) return null;
      return fetch("https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,wind_speed_10m&latitude=" +
        loc.lat + "&longitude=" + loc.lon).then(function (r) { return r.json(); }).then(function (res) {
        var cur = res && res.current;
        if (!cur) return null;
        var w = { temp: cur.temperature_2m, code: cur.weather_code, wind: cur.wind_speed_10m };
        diaryWeatherCache[sheet.id] = { at: Date.now(), weather: w };
        return w;
      });
    }).catch(function () { return null; });
  }

  // ---- the stamp along a photo's bottom --------------------------------------
  function diaryStampPhoto(canvas, sheet, when, weather) {
    var ctx = canvas.getContext("2d");
    var w = canvas.width, h = canvas.height;
    var size = Math.max(14, Math.round(Math.min(w, h) * 0.034));
    var band = Math.round(size * 2.2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.fillRect(0, h - band, w, band);
    ctx.fillStyle = "#fff";
    ctx.font = "700 " + size + "px Assistant, Arial, sans-serif";
    ctx.textBaseline = "middle";
    var y = h - band / 2, pad = size * 0.7;
    var d = new Date(when);
    var when2 = isoToFullDisplay(wpIso(d)) + "  " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    // the project's name at the right, its date and time beside it - each
    // drawn on its own, so mixed Hebrew / numbers keep their order
    ctx.direction = "rtl";
    ctx.textAlign = "right";
    ctx.fillText(sheet.name, w - pad, y);
    var nameW = ctx.measureText(sheet.name).width;
    ctx.direction = "ltr";
    ctx.fillText(when2, w - pad - nameW - size, y);
    if (weather) {
      ctx.direction = "rtl";
      ctx.textAlign = "left";
      ctx.fillText(diaryWeatherText(weather), pad, y);
    }
    return canvas;
  }

  // ---- the library: תמונות / the day ----------------------------------------------
  function diaryPhotoFolderName(dateISO) { return dateISO.split("-").reverse().join("."); }
  function ensureDiaryPhotoFolder(sheet, dateISO) {
    var name = diaryPhotoFolderName(dateISO);
    var pick = function (folders) {
      var photos = folders.find(function (f) { return f.key === "photos"; });
      return photos && folders.find(function (f) { return f.parentId === photos.id && f.name === name; });
    };
    return new Promise(function (resolve) {
      ensureLibraryFolders(sheet, function (folders) {
        var hit = pick(folders);
        if (hit) { resolve(hit.id); return; }
        var addTo = function (list) {
          var photos = list.find(function (f) { return f.key === "photos"; });
          if (!photos || pick(list)) return list;
          return list.concat([{ id: uid(), key: null, name: name, parentId: photos.id, files: [] }]);
        };
        if (sheet.shared) {
          applySharedLibraryFolders(sheet.id, addTo).then(function (updated) {
            var f = pick(updated);
            resolve(f ? f.id : null);
          }, function () { resolve(null); });
          return;
        }
        var live = data.sheets.find(function (s) { return s.id === sheet.id; });
        if (!live) { resolve(null); return; }
        live.folders = addTo(live.folders || folders);
        saveData();
        var f2 = pick(live.folders);
        resolve(f2 ? f2.id : null);
      });
    });
  }

  // ---- taking / adding photos ------------------------------------------------------------
  function diaryAddPhotos(files) {
    var sheet = activeSheet(), dateISO = activeSiteLogDate;
    if (!sheet || !dateISO || !supabaseClient || !files.length) return;
    showToast(tr("diaryPhotosSaving"));
    diaryWeatherNow(sheet).then(function (weather) {
      renderDiaryPhotos(weather);
      return ensureDiaryPhotoFolder(sheet, dateISO).then(function (folderId) {
        return Array.prototype.reduce.call(files, function (chain, file) {
          return chain.then(function () {
            var when = file.lastModified && Math.abs(Date.now() - file.lastModified) < 3 * 86400000 ? file.lastModified : Date.now();
            return scanLoadImage(file).then(function (canvas) {
              diaryStampPhoto(canvas, sheet, when, weather);
              return new Promise(function (res) { canvas.toBlob(res, "image/jpeg", 0.88); });
            }).then(function (blob) {
              var d = new Date(when);
              var name = tr("diaryPhotoName") + " " + diaryPhotoFolderName(dateISO) + " " +
                String(d.getHours()).padStart(2, "0") + "-" + String(d.getMinutes()).padStart(2, "0") + "-" + String(d.getSeconds()).padStart(2, "0") + ".jpg";
              var path = sheet.id + "/" + (folderId || "site-logs/" + dateISO) + "/" + uid() + "-" + safeStorageFileName(name);
              return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "image/jpeg" }).then(function (result) {
                if (result.error) throw result.error;
                return resolveFileUrl(path);
              }).then(function (url) {
                var entry = { id: uid(), name: name, path: path, type: "image/jpeg", size: blob.size || 0, uploadedAt: Date.now() };
                var log = findOrCreateSiteLog(sheet, dateISO);
                log.photos.push({ id: entry.id, name: name, path: path, url: url, type: "image/jpeg", at: when, weather: weather ? diaryWeatherText(weather) : null });
                if (weather && !log.weather) log.weather = diaryWeatherText(weather);
                saveData();
                renderDiaryPhotos();
                return folderId ? addFileToLibraryFolder(sheet, folderId, entry) : null;
              });
            });
          });
        }, Promise.resolve());
      });
    }).then(function () {
      showToast(tr("diaryPhotosSaved"));
    }, function (err) {
      console.error("diary photo failed:", err);
      alert(tr("libraryUploadError"));
    });
  }

  function renderDiaryPhotos(weatherNow) {
    var sheet = activeSheet();
    var log = sheet && activeSiteLogDate ? findSiteLog(sheet, activeSiteLogDate) : null;
    var photos = (log && log.photos) || [];
    var weatherEl = document.getElementById("diaryPhotosWeather");
    var wText = (log && log.weather) || (weatherNow ? diaryWeatherText(weatherNow) : "");
    weatherEl.hidden = !wText;
    weatherEl.textContent = wText ? tr("diaryWeatherLine").replace("{w}", wText) : "";
    document.getElementById("diaryPhotosActions").hidden = !!(log && log.closed);
    diaryPhotosGrid.innerHTML = "";
    if (!photos.length) {
      var empty = document.createElement("div");
      empty.className = "library-empty";
      empty.textContent = tr("diaryPhotosEmpty");
      diaryPhotosGrid.appendChild(empty);
      return;
    }
    photos.forEach(function (p) {
      var item = document.createElement("div");
      item.className = "library-item";
      var thumb = document.createElement("div");
      thumb.className = "library-item-thumb";
      var img = document.createElement("img");
      img.alt = "";
      img.src = p.url;
      thumb.appendChild(img);
      item.appendChild(thumb);
      var d = new Date(p.at);
      var nameEl = document.createElement("div");
      nameEl.className = "library-item-name";
      nameEl.textContent = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0") + (p.weather ? " " + p.weather.split(" ")[0] : "");
      item.appendChild(nameEl);
      item.addEventListener("click", function () { openImageViewer(p.url, p.name); });
      if (!log.closed) {
        var del = document.createElement("button");
        del.type = "button";
        del.className = "library-item-delete";
        del.textContent = "✕";
        del.addEventListener("click", function (e) {
          e.stopPropagation();
          askConfirm(tr("diaryPhotoDeleteConfirm"), function () {
            // off the diary; the copy in the library stays
            log.photos = log.photos.filter(function (x) { return x.id !== p.id; });
            saveData();
            renderDiaryPhotos();
          });
        });
        item.appendChild(del);
      }
      diaryPhotosGrid.appendChild(item);
    });
  }
  function openDiaryPhotos() {
    var sheet = activeSheet();
    if (!sheet || !activeSiteLogDate) return;
    document.getElementById("diaryPhotosTitle").textContent = tr("diaryPhotos") + " – " + isoToDisplay(activeSiteLogDate);
    renderDiaryPhotos();
    diaryPhotosView.hidden = false;
  }
  document.getElementById("siteLogPhotosBtn").addEventListener("click", openDiaryPhotos);
  document.getElementById("diaryPhotosBackBtn").addEventListener("click", function () { diaryPhotosView.hidden = true; });
  var diaryCameraInput = document.getElementById("diaryPhotosCameraInput");
  var diaryGalleryInput = document.getElementById("diaryPhotosGalleryInput");
  document.getElementById("diaryPhotosCameraBtn").addEventListener("click", function () { diaryCameraInput.click(); });
  document.getElementById("diaryPhotosGalleryBtn").addEventListener("click", function () { diaryGalleryInput.click(); });
  [diaryCameraInput, diaryGalleryInput].forEach(function (input) {
    input.addEventListener("change", function () {
      var files = Array.prototype.slice.call(input.files || []);
      input.value = "";
      diaryAddPhotos(files);
    });
  });

  // in the diary's PDF: the day's weather under its date, and its photos
  function appendDiaryPhotosPdfSection(doc, log) {
    var photos = (log.photos || []).filter(function (p) { return p.url; });
    if (!photos.length) return;
    var heading = document.createElement("div");
    heading.className = "pdf-doc-section-heading";
    heading.textContent = tr("diaryPhotos");
    doc.appendChild(heading);
    var grid = document.createElement("div");
    grid.className = "pdf-doc-photos";
    photos.forEach(function (p) {
      var img = document.createElement("img");
      img.src = p.url;
      grid.appendChild(img);
    });
    doc.appendChild(grid);
  }

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
  // Every active shared project this account can act on - its own real
  // memberships plus (full read/write, via office_groups.sql) any project
  // whose member is in a group this account created or is the named Head
  // Office of, already unified in sharedSheets by loadSharedSheets().
  function officeReportSheets() {
    return sharedSheets.filter(function (s) { return !s.ended; });
  }

  // Creates the "משרד ראשי" private sheet on first entry into Head Office
  // mode (and finds it again on every later call) - a plain entry in
  // data.sheets like any other private project, so it rides the app's
  // normal tab/select/save machinery for free; only its tasks are special
  // (system-generated, read-only - see syncHeadOfficeVirtualTasks below).
  function ensureHeadOfficeSheet() {
    if (!isHeadOfficeMode) return null;
    var sheet = data.sheets.find(function (s) { return s.id === HEAD_OFFICE_SHEET_ID; });
    if (!sheet) {
      sheet = { id: HEAD_OFFICE_SHEET_ID, name: tr("headOfficeMainProjectName"), tasks: [], reports: [], files: [] };
      data.sheets.unshift(sheet);
      saveData();
    } else if (sheet.name !== tr("headOfficeMainProjectName")) {
      // Not user-renamable (see appendSheetTab's isHeadOfficeSheetTab guard)
      // - its name is always whatever this key currently says, so renaming
      // it here (or switching language) takes effect on a sheet created
      // under an older name too, not just a freshly created one.
      sheet.name = tr("headOfficeMainProjectName");
      saveData();
    }
    return sheet;
  }

  // Every watched project's "שגר" (send) button on its procurement log
  // writes procurementSentDate directly onto that log (markSiteLogReportSent,
  // see siteLogProcurementOrderBtn above) - already readable here through
  // the normal sharedSheets sync/Realtime path, with no extra plumbing. One
  // virtual, non-editable task per project+date that's been sent, scanned
  // and (re)built on every render() while in Head Office mode, so a new one
  // shows up as soon as sharedSheets itself refreshes.
  function syncHeadOfficeVirtualTasks() {
    var sheet = ensureHeadOfficeSheet();
    if (!sheet) return;
    var dismissed = sheet.dismissedHeadOfficeIds || [];
    var seenIds = {};
    var changed = false;
    // A new notification is dated today (not the order's own date) so it
    // shows up right away regardless of when it was actually sent - once
    // created, the existing daily rollover (rollSheetsForward) carries it
    // forward exactly like any other open task, same as every other
    // project, and leaves it be the moment it's marked done, so it only
    // drops off the day after that. targetDate (used to jump to the right
    // project's procurement list) stays the order's own date throughout.
    var today = todayISO();
    officeReportSheets().forEach(function (s) {
      (s.siteLogs || []).forEach(function (log) {
        if (!log.procurementSentDate) return;
        var taskId = "ho-proc-" + s.id + "-" + log.date;
        if (dismissed.indexOf(taskId) !== -1) return;
        seenIds[taskId] = true;
        if (!sheet.tasks.some(function (t) { return t.id === taskId; })) {
          sheet.tasks.push({
            id: taskId,
            text: tr("headOfficeProcurementTaskPrefix") + " " + s.name + " " + isoToFullDisplay(log.date),
            status: 0,
            urgent: false,
            type: "task",
            date: today,
            createdAt: Date.now(),
            headOfficeVirtual: true,
            targetSheetId: s.id,
            targetDate: log.date
          });
          changed = true;
        }
      });
    });
    // Work-plan activities under way (or late) in every project, mirroring
    // their status; one finished today stays until tomorrow.
    officeReportSheets().forEach(function (s) {
      (s.workPlan || []).forEach(function (item) {
        if (item.start > today) return;
        if (item.status === "done" && !(item.updatedAt && wpIso(new Date(item.updatedAt)) === today)) return;
        var taskId = "ho-plan-" + s.id + "-" + item.id;
        if (dismissed.indexOf(taskId) !== -1) return;
        seenIds[taskId] = true;
        var text = s.name + ": " + item.name;
        var st = WP_TASK_STATUS[item.status] || 0;
        var t = sheet.tasks.find(function (x) { return x.id === taskId; });
        if (!t) {
          sheet.tasks.push({
            id: taskId, text: text, status: st, urgent: false, type: "task", date: today,
            createdAt: Date.now(), headOfficeVirtual: true, planRef: { sheetId: s.id, itemId: item.id }
          });
          changed = true;
        } else {
          if (t.text !== text) { t.text = text; changed = true; }
          if (t.status !== st) { t.status = st; changed = true; }
          if (st !== 2 && t.date < today) { t.date = today; changed = true; }
        }
      });
    });
    var before = sheet.tasks.length;
    sheet.tasks = sheet.tasks.filter(function (t) { return !t.headOfficeVirtual || seenIds[t.id]; });
    if (sheet.tasks.length !== before) changed = true;
    if (changed) saveData();
  }

  // Long-pressing a notification's text (see the render() task-row loop)
  // deletes it - remembered in dismissedHeadOfficeIds so the next sync
  // pass above doesn't just recreate the exact same notification from the
  // still-set procurementSentDate it was generated from.
  function dismissHeadOfficeNotification(taskId) {
    var sheet = ensureHeadOfficeSheet();
    if (!sheet) return;
    sheet.tasks = sheet.tasks.filter(function (t) { return t.id !== taskId; });
    if (!sheet.dismissedHeadOfficeIds) sheet.dismissedHeadOfficeIds = [];
    if (sheet.dismissedHeadOfficeIds.indexOf(taskId) === -1) sheet.dismissedHeadOfficeIds.push(taskId);
    saveData();
    render();
  }

  // The date the combined report screens are currently showing - defaults
  // to today, but browsable to any earlier date via the same date-label/
  // calendar-input/"today" button pattern as the main tasks page's own
  // date controls (see renderOfficeReportDateControls below).
  var officeReportViewDate = todayISO();

  // Only a project whose "Send report" button (markSiteLogReportSent above)
  // was clicked for this category on the selected date is included - a
  // project that's never sent (or only sent on a different day) is left out
  // entirely rather than shown with an empty table, so the combined report
  // reflects what was actually submitted that day, not just whatever
  // happens to be sitting half-filled in some project's draft log.
  function buildOfficeCombinedReportElement(kind, dateOverride) {
    var wrap = document.createElement("div");
    wrap.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";
    var dateISO = dateOverride || officeReportViewDate;
    var sectionCount = 0;
    officeReportSheets().forEach(function (sheet) {
      var log = findSiteLog(sheet, dateISO);
      if (!log || log[kind.sentField] !== dateISO) return;
      var section = document.createElement("div");
      section.className = "pdf-doc" + (sectionCount > 0 ? " pdf-doc-periodic-section" : "");
      section.appendChild(buildPdfDocTitleElement(sheet, sheet.name));
      var categoryTitle = document.createElement("div");
      categoryTitle.className = "pdf-doc-info-title";
      categoryTitle.textContent = tr(kind.titleKey);
      section.appendChild(categoryTitle);
      var infoDate = document.createElement("div");
      infoDate.className = "pdf-doc-info-date";
      infoDate.textContent = isoToFullDisplay(dateISO);
      section.appendChild(infoDate);
      section.appendChild(kind.tableFn(log));
      wrap.appendChild(section);
      sectionCount++;
    });
    if (!sectionCount) {
      var empty = document.createElement("div");
      empty.className = "pdf-doc";
      var emptyMsg = document.createElement("div");
      emptyMsg.className = "pdf-doc-info-title";
      emptyMsg.textContent = tr("officeCombinedReportEmptyMsg");
      empty.appendChild(emptyMsg);
      wrap.appendChild(empty);
    }
    return wrap;
  }

  function generateOfficeCombinedReport(kindKey) {
    var kind = OFFICE_REPORT_KINDS[kindKey];
    closeOfficeReportTypeModal();
    var fileName = tr("officeCombinedReportFileNamePrefix") + " " + tr(kind.titleKey) + " " + isoToFileNameDate(officeReportViewDate) + ".pdf";
    buildPdfBlobFromElement(buildOfficeCombinedReportElement(kind), fileName).then(function (result) {
      attemptShare(result.blob, result.fileName);
    }).catch(function (err) {
      console.error(err);
      alert(tr("reportPdfError"));
    });
  }

  // Attendance/tools go through a preview screen with three ways to produce
  // the report, instead of straight to a PDF like procurement's share
  // button above - see showOfficeReportPreview() further down.
  var officeReportOptionsView = document.getElementById("officeReportOptionsView");
  var officeReportOptionsBackBtn = document.getElementById("officeReportOptionsBackBtn");
  var officeReportOptionsTitle = document.getElementById("officeReportOptionsTitle");
  var officeReportOptionsPreview = document.getElementById("officeReportOptionsPreview");
  var officeReportOptionsDateLabel = document.getElementById("officeReportOptionsDateLabel");
  var officeReportOptionsDateInput = document.getElementById("officeReportOptionsDateInput");
  var officeReportOptionsTodayBtn = document.getElementById("officeReportOptionsTodayBtn");
  var officeReportDailyBtn = document.getElementById("officeReportDailyBtn");
  var officeReportMonthlyBtn = document.getElementById("officeReportMonthlyBtn");
  var officeReportCustomBtn = document.getElementById("officeReportCustomBtn");
  var pendingOfficeReportKind = null;

  // Shared by both combined-report screens (this one and the procurement
  // list further below) - same date-label/calendar-input/"today" button
  // pattern as the main tasks page's own date controls, so picking a past
  // date on either screen keeps it in sync on the other too.
  var officeProcurementDateLabel = document.getElementById("officeProcurementDateLabel");
  var officeProcurementDateInput = document.getElementById("officeProcurementDateInput");
  var officeProcurementTodayBtn = document.getElementById("officeProcurementTodayBtn");
  var officeProcurementFilterSheetId = null;

  function renderOfficeReportDateControls() {
    var isToday = officeReportViewDate === todayISO();
    var displayText = isoToFullDisplay(officeReportViewDate);
    officeReportOptionsDateLabel.textContent = displayText;
    officeReportOptionsDateInput.value = officeReportViewDate;
    officeReportOptionsTodayBtn.hidden = isToday;
    officeProcurementDateLabel.textContent = displayText;
    officeProcurementDateInput.value = officeReportViewDate;
    officeProcurementTodayBtn.hidden = isToday;
  }

  function setOfficeReportViewDate(dateISO) {
    officeReportViewDate = dateISO;
    renderOfficeReportDateControls();
    if (!officeReportOptionsView.hidden && pendingOfficeReportKind) {
      officeReportOptionsPreview.innerHTML = "";
      officeReportOptionsPreview.appendChild(buildOfficeCombinedReportElement(OFFICE_REPORT_KINDS[pendingOfficeReportKind]));
    }
    if (!officeProcurementView.hidden) renderOfficeProcurementList(officeProcurementFilterSheetId);
  }
  officeReportOptionsDateInput.addEventListener("change", function () {
    if (officeReportOptionsDateInput.value) setOfficeReportViewDate(officeReportOptionsDateInput.value);
  });
  officeReportOptionsTodayBtn.addEventListener("click", function () { setOfficeReportViewDate(todayISO()); });
  officeProcurementDateInput.addEventListener("change", function () {
    if (officeProcurementDateInput.value) setOfficeReportViewDate(officeProcurementDateInput.value);
  });
  officeProcurementTodayBtn.addEventListener("click", function () { setOfficeReportViewDate(todayISO()); });

  // Same horizontal-drag-changes-the-date gesture as the main tasks page's
  // own date zone (setupSwipeGestures above) - dragging anywhere on either
  // combined-report screen's header (except directly on the calendar input
  // or a button) moves officeReportViewDate one day at a time.
  function setupOfficeReportDateSwipe(el) {
    if (!el) return;
    var startX = 0, startY = 0, startTime = 0, tracking = false;
    el.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1 || e.target.closest("input, button")) { tracking = false; return; }
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    }, { passive: true });
    el.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;
      var touch = e.changedTouches[0];
      var dx = touch.clientX - startX;
      var dy = touch.clientY - startY;
      var elapsed = Date.now() - startTime;
      if (elapsed < 800 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        setOfficeReportViewDate(addDaysToISO(officeReportViewDate, dx < 0 ? -1 : 1));
      }
    }, { passive: true });
  }
  setupOfficeReportDateSwipe(document.querySelector("#officeReportOptionsView .report-head"));
  setupOfficeReportDateSwipe(document.querySelector("#officeProcurementView .report-head"));

  function openOfficeReportOptionsView(kindKey) {
    pendingOfficeReportKind = kindKey;
    officeReportViewDate = todayISO();
    renderOfficeReportDateControls();
    var kind = OFFICE_REPORT_KINDS[kindKey];
    officeReportOptionsTitle.textContent = tr(kind.titleKey);
    officeReportOptionsPreview.innerHTML = "";
    officeReportOptionsPreview.appendChild(buildOfficeCombinedReportElement(kind));
    closeOfficeReportTypeModal();
    officeReportOptionsView.hidden = false;
  }
  function closeOfficeReportOptionsView() {
    officeReportOptionsView.hidden = true;
    pendingOfficeReportKind = null;
    officeReportTypeView.hidden = false;
  }
  officeReportAttendanceBtn.addEventListener("click", function () { openOfficeReportOptionsView("attendance"); });
  officeReportToolsBtn.addEventListener("click", function () { openOfficeReportOptionsView("tools"); });
  officeReportOptionsBackBtn.addEventListener("click", closeOfficeReportOptionsView);

  var officeReportPreviewView = document.getElementById("officeReportPreviewView");
  var officeReportPreviewBackBtn = document.getElementById("officeReportPreviewBackBtn");
  var officeReportPreviewShareBtn = document.getElementById("officeReportPreviewShareBtn");
  var officeReportPreviewContent = document.getElementById("officeReportPreviewContent");
  var lastOfficeReportElement = null;
  var lastOfficeReportFileName = "";
  var officeReportPreviewReturnView = null;

  // returnView defaults to the attendance/tools options screen, since that's
  // the only caller before procurement's monthly/custom reports (which come
  // from officeProcurementView instead) started reusing this same preview.
  function showOfficeReportPreview(element, fileName, returnView) {
    lastOfficeReportElement = element;
    lastOfficeReportFileName = fileName;
    officeReportPreviewContent.innerHTML = "";
    officeReportPreviewContent.appendChild(element);
    officeReportPreviewReturnView = returnView || officeReportOptionsView;
    officeReportPreviewReturnView.hidden = true;
    officeReportPreviewView.hidden = false;
  }
  function closeOfficeReportPreviewView() {
    officeReportPreviewView.hidden = true;
    if (officeReportPreviewReturnView) officeReportPreviewReturnView.hidden = false;
  }
  officeReportPreviewBackBtn.addEventListener("click", closeOfficeReportPreviewView);
  officeReportPreviewShareBtn.addEventListener("click", function () {
    if (!lastOfficeReportElement) return;
    // A clone - buildPdfBlobFromElement() re-parents whatever element it's
    // given into its own temporary off-screen container, which would yank
    // the real preview's content off the visible screen if passed directly.
    buildPdfBlobFromElement(lastOfficeReportElement.cloneNode(true), lastOfficeReportFileName).then(function (result) {
      attemptShare(result.blob, result.fileName);
    }).catch(function (err) {
      console.error(err);
      alert(tr("reportPdfError"));
    });
  });

  officeReportDailyBtn.addEventListener("click", function () {
    var kind = OFFICE_REPORT_KINDS[pendingOfficeReportKind];
    var fileName = tr("officeCombinedReportFileNamePrefix") + " " + tr(kind.titleKey) + " " + isoToFileNameDate(officeReportViewDate) + ".pdf";
    showOfficeReportPreview(buildOfficeCombinedReportElement(kind), fileName);
  });

  // Builds one flat table of every (date, project) match for a given name,
  // across every active shared project's logs in [fromISO, toISO] - only a
  // log actually sent on ITS OWN date counts (log[kind.sentField] === that
  // log's own date), same "only what was really submitted" rule as the
  // daily combined report, just checked per-date instead of only for today.
  function buildOfficeNameReportElement(kind, name, fromISO, toISO) {
    var wrap = document.createElement("div");
    wrap.className = "pdf-doc";
    wrap.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";
    var titleEl = document.createElement("div");
    titleEl.className = "pdf-doc-title";
    titleEl.textContent = tr(kind.titleKey) + " - " + name;
    wrap.appendChild(titleEl);
    var infoDate = document.createElement("div");
    infoDate.className = "pdf-doc-info-date";
    infoDate.textContent = isoToFullDisplay(fromISO) + " - " + isoToFullDisplay(toISO);
    wrap.appendChild(infoDate);

    var nameLower = name.trim().toLowerCase();
    var rows = [];
    officeReportSheets().forEach(function (sheet) {
      (sheet.siteLogs || []).forEach(function (rawLog) {
        if (rawLog.date < fromISO || rawLog.date > toISO) return;
        if (rawLog[kind.sentField] !== rawLog.date) return;
        var log = normalizeSiteLog(rawLog);
        kind.findMatches(log, nameLower).forEach(function (m) {
          rows.push(Object.assign({ date: rawLog.date, project: sheet.name }, m));
        });
      });
    });
    rows.sort(function (a, b) { return a.date < b.date ? -1 : (a.date > b.date ? 1 : 0); });

    var table = document.createElement("table");
    table.className = "pdf-doc-table";
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    kind.matchColumns.forEach(function (key) {
      var th = document.createElement("th");
      th.textContent = tr(key);
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
    var tbody = document.createElement("tbody");
    if (!rows.length) {
      var emptyRow = document.createElement("tr");
      var emptyTd = document.createElement("td");
      emptyTd.className = "pdf-doc-empty";
      emptyTd.colSpan = kind.matchColumns.length;
      emptyTd.textContent = tr("reportShareNoRows");
      emptyRow.appendChild(emptyTd);
      tbody.appendChild(emptyRow);
    } else {
      rows.forEach(function (r) {
        var rowEl = document.createElement("tr");
        kind.rowToCells(r).forEach(function (val) {
          var td = document.createElement("td");
          td.textContent = val;
          rowEl.appendChild(td);
        });
        tbody.appendChild(rowEl);
      });
    }
    table.appendChild(tbody);
    wrap.appendChild(table);
    var footerEl = document.createElement("div");
    footerEl.className = "pdf-doc-footer";
    footerEl.textContent = tr("reportPdfFooter");
    wrap.appendChild(footerEl);
    return wrap;
  }

  // Procurement's monthly/custom equivalent - no name to filter by, so this
  // just combines every log actually sent (kind.sentField === its own date)
  // in [fromISO, toISO] into one multi-section document, same building
  // blocks as the daily combined report, just across more than one date.
  function buildOfficeRangeReportElement(kind, fromISO, toISO) {
    var wrap = document.createElement("div");
    wrap.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";
    var entries = [];
    officeReportSheets().forEach(function (sheet) {
      (sheet.siteLogs || []).forEach(function (rawLog) {
        if (rawLog.date < fromISO || rawLog.date > toISO) return;
        if (rawLog[kind.sentField] !== rawLog.date) return;
        entries.push({ sheet: sheet, log: normalizeSiteLog(rawLog), date: rawLog.date });
      });
    });
    entries.sort(function (a, b) { return a.date < b.date ? -1 : (a.date > b.date ? 1 : 0); });
    entries.forEach(function (e, i) {
      var section = document.createElement("div");
      section.className = "pdf-doc" + (i > 0 ? " pdf-doc-periodic-section" : "");
      section.appendChild(buildPdfDocTitleElement(e.sheet, e.sheet.name));
      var categoryTitle = document.createElement("div");
      categoryTitle.className = "pdf-doc-info-title";
      categoryTitle.textContent = tr(kind.titleKey);
      section.appendChild(categoryTitle);
      var infoDate = document.createElement("div");
      infoDate.className = "pdf-doc-info-date";
      infoDate.textContent = isoToFullDisplay(e.date);
      section.appendChild(infoDate);
      section.appendChild(kind.tableFn(e.log));
      wrap.appendChild(section);
    });
    if (!entries.length) {
      var empty = document.createElement("div");
      empty.className = "pdf-doc";
      var emptyMsg = document.createElement("div");
      emptyMsg.className = "pdf-doc-info-title";
      emptyMsg.textContent = tr("officeCombinedReportEmptyMsg");
      empty.appendChild(emptyMsg);
      wrap.appendChild(empty);
    }
    return wrap;
  }

  function monthInputToRange(monthValue) {
    var parts = monthValue.split("-");
    var year = parseInt(parts[0], 10), month = parseInt(parts[1], 10);
    var lastDay = new Date(year, month, 0).getDate();
    return { from: monthValue + "-01", to: monthValue + "-" + String(lastDay).padStart(2, "0") };
  }

  var officeNameReportOverlay = document.getElementById("officeNameReportOverlay");
  var officeNameReportModalMessage = document.getElementById("officeNameReportModalMessage");
  var officeNameReportNameLabel = document.getElementById("officeNameReportNameLabel");
  var officeNameReportNameInput = document.getElementById("officeNameReportNameInput");
  var officeNameReportMonthRow = document.getElementById("officeNameReportMonthRow");
  var officeNameReportMonthInput = document.getElementById("officeNameReportMonthInput");
  var officeNameReportFromRow = document.getElementById("officeNameReportFromRow");
  var officeNameReportFromInput = document.getElementById("officeNameReportFromInput");
  var officeNameReportToRow = document.getElementById("officeNameReportToRow");
  var officeNameReportToInput = document.getElementById("officeNameReportToInput");
  var officeNameReportGenerateBtn = document.getElementById("officeNameReportGenerateBtn");
  var officeNameReportCancelBtn = document.getElementById("officeNameReportCancelBtn");
  var pendingOfficeNameReportMode = null;

  function openOfficeNameReportModal(mode) {
    pendingOfficeNameReportMode = mode;
    var kind = OFFICE_REPORT_KINDS[pendingOfficeReportKind];
    officeNameReportNameInput.value = "";
    officeNameReportNameLabel.hidden = !!kind.noName;
    officeNameReportNameInput.hidden = !!kind.noName;
    var isMonthly = mode === "monthly";
    if (kind.noName) {
      officeNameReportModalMessage.textContent = tr(isMonthly ? "officeRangeReportModalMessageMonthly" : "officeRangeReportModalMessageCustom");
    } else {
      officeNameReportModalMessage.textContent = tr(isMonthly ? "officeNameReportModalMessageMonthly" : "officeNameReportModalMessageCustom");
    }
    officeNameReportMonthRow.hidden = !isMonthly;
    officeNameReportMonthInput.hidden = !isMonthly;
    officeNameReportMonthInput.value = "";
    officeNameReportMonthInput.max = todayISO().slice(0, 7);
    officeNameReportFromRow.hidden = isMonthly;
    officeNameReportFromInput.hidden = isMonthly;
    officeNameReportToRow.hidden = isMonthly;
    officeNameReportToInput.hidden = isMonthly;
    officeNameReportFromInput.value = "";
    officeNameReportToInput.value = "";
    officeNameReportFromInput.max = todayISO();
    officeNameReportToInput.max = todayISO();
    officeNameReportOverlay.hidden = false;
  }
  function closeOfficeNameReportModal() {
    officeNameReportOverlay.hidden = true;
  }
  officeReportMonthlyBtn.addEventListener("click", function () { openOfficeNameReportModal("monthly"); });
  officeReportCustomBtn.addEventListener("click", function () { openOfficeNameReportModal("custom"); });
  officeNameReportCancelBtn.addEventListener("click", closeOfficeNameReportModal);
  officeNameReportOverlay.addEventListener("click", function (e) {
    if (e.target === officeNameReportOverlay) closeOfficeNameReportModal();
  });
  officeNameReportGenerateBtn.addEventListener("click", function () {
    var kind = OFFICE_REPORT_KINDS[pendingOfficeReportKind];
    var name = "";
    if (!kind.noName) {
      name = officeNameReportNameInput.value.trim();
      if (!name) { alert(tr("officeNameReportMissingNameMsg")); return; }
    }
    var range;
    if (pendingOfficeNameReportMode === "monthly") {
      if (!officeNameReportMonthInput.value) { alert(tr("officeNameReportMissingMonthMsg")); return; }
      range = monthInputToRange(officeNameReportMonthInput.value);
    } else {
      var from = officeNameReportFromInput.value, to = officeNameReportToInput.value;
      if (!from || !to) { alert(tr("siteLogPeriodicMissingDatesMsg")); return; }
      if (from > to) { alert(tr("siteLogPeriodicInvalidRangeMsg")); return; }
      range = { from: from, to: to };
    }
    closeOfficeNameReportModal();
    var fileName = tr("officeCombinedReportFileNamePrefix") + " " + tr(kind.titleKey) + (name ? " " + name : "") + " " + isoToFileNameDate(range.from) + " - " + isoToFileNameDate(range.to) + ".pdf";
    var element = kind.noName ? buildOfficeRangeReportElement(kind, range.from, range.to) : buildOfficeNameReportElement(kind, name, range.from, range.to);
    showOfficeReportPreview(element, fileName, kind.noName ? officeProcurementView : officeReportOptionsView);
  });

  // Procurement's combined report is interactive instead of going straight
  // to a PDF - Head Office marks each row purchased by tapping its circle,
  // written directly onto that project's own procurement entry (same
  // siteLogs sync path as everything else here), so regular members of that
  // project see the same green circle appear on their own copy of the row
  // (see the `entry.purchased` check in renderSiteLogProcurementRows above).
  var officeProcurementView = document.getElementById("officeProcurementView");
  var officeProcurementBackBtn = document.getElementById("officeProcurementBackBtn");
  var officeProcurementList = document.getElementById("officeProcurementList");
  var officeProcurementDailyBtn = document.getElementById("officeProcurementDailyBtn");
  var officeProcurementMonthlyBtn = document.getElementById("officeProcurementMonthlyBtn");
  var officeProcurementCustomBtn = document.getElementById("officeProcurementCustomBtn");

  function renderOfficeProcurementList(filterSheetId) {
    officeProcurementFilterSheetId = filterSheetId || null;
    officeProcurementList.innerHTML = "";
    var dateISO = officeReportViewDate;
    var sentField = OFFICE_REPORT_KINDS.procurement.sentField;
    var projects = officeReportSheets().filter(function (sheet) {
      if (filterSheetId && sheet.id !== filterSheetId) return false;
      var log = findSiteLog(sheet, dateISO);
      return log && log[sentField] === dateISO;
    });
    if (!projects.length) {
      var empty = document.createElement("div");
      empty.className = "library-empty";
      empty.textContent = tr("officeCombinedReportEmptyMsg");
      officeProcurementList.appendChild(empty);
      return;
    }
    projects.forEach(function (sheet) {
      var log = findSiteLog(sheet, dateISO);
      var block = document.createElement("div");
      block.className = "office-procurement-project";
      var nameEl = document.createElement("div");
      nameEl.className = "office-procurement-project-name";
      nameEl.textContent = sheet.name;
      block.appendChild(nameEl);
      filledProcurement(log).forEach(function (entry) {
        var row = document.createElement("div");
        row.className = "site-log-procurement-row";

        var mark = document.createElement("button");
        mark.type = "button";
        mark.className = "purchased-mark clickable" + (entry.purchased ? " purchased" : "");
        mark.addEventListener("click", function () {
          entry.purchased = !entry.purchased;
          saveData();
          renderOfficeProcurementList(officeProcurementFilterSheetId);
        });
        row.appendChild(mark);

        [
          { val: entry.item, cls: "site-log-procurement-item" },
          { val: entry.quantity, cls: "site-log-procurement-quantity" },
          { val: entry.supplier, cls: "site-log-procurement-supplier" }
        ].forEach(function (col) {
          var span = document.createElement("span");
          span.className = col.cls;
          span.textContent = col.val || "";
          row.appendChild(span);
        });

        block.appendChild(row);
      });
      officeProcurementList.appendChild(block);
    });
  }

  // filterSheetId/filterDate let a notification task in the "משרד ראשי"
  // tab (see syncHeadOfficeVirtualTasks) jump straight to one specific
  // project's procurement list on the date it was sent, instead of the
  // normal all-projects/today view this screen otherwise shows.
  // Opened from a Head Office notification (one project's order) rather
  // than from the combined reports screen: "back" then returns to the
  // notifications list, not to the reports screen it never came from.
  var officeProcurementFromNotification = false;
  // ---- Head Office "הזנת נתונים" ----
  // Six folders (engineers, foremen, workers, operators, crews,
  // surveyors), each a list of names kept with this account's own data
  // (data.officeDirectory[key]).
  var OFFICE_DATA_FOLDERS = [
    { key: "engineers", label: "officeDataEngineers" },
    { key: "foremen", label: "officeDataForemen" },
    { key: "workers", label: "officeDataWorkers" },
    { key: "operators", label: "officeDataOperators" },
    { key: "crews", label: "officeDataCrews" },
    { key: "surveyors", label: "officeDataSurveyors" }
  ];
  var officeDataBtn = document.getElementById("officeDataBtn");
  var officeDataView = document.getElementById("officeDataView");
  var officeDataTitleEl = document.getElementById("officeDataTitle");
  var officeDataFoldersEl = document.getElementById("officeDataFolders");
  var officeDataListEl = document.getElementById("officeDataList");
  var officeDataOpenKey = null;
  function officeDirectory() {
    if (!data.officeDirectory) data.officeDirectory = {};
    return data.officeDirectory;
  }
  // Which list feeds which diary field: attendance columns, and צוותים ->
  // the contractors (קבלנים) list.
  var ATTENDANCE_TO_OFFICE_FOLDER = {
    engineer: "engineers", foreman: "foremen", workers: "workers",
    operators: "operators", surveyor: "surveyors"
  };
  function officeDirectoryNames(sheet, key) {
    var dir = sheet && (sheet.officeDirectory || (!sheet.shared && data.officeDirectory));
    return key && dir && dir[key] ? dir[key].map(function (e) { return e.name; }) : [];
  }
  // Head Office hands its lists to every project it watches
  // (data.officeDirectory there), so whoever fills a project's diary gets
  // them as suggestions. Only projects whose copy differs are written.
  var officeDirectoryPublishTimer = null;
  function publishOfficeDirectory() {
    clearTimeout(officeDirectoryPublishTimer);
    officeDirectoryPublishTimer = setTimeout(function () {
      if (!isHeadOfficeMode || !supabaseClient) return;
      var dir = JSON.parse(JSON.stringify(officeDirectory()));
      var json = JSON.stringify(dir);
      officeReportSheets().forEach(function (sheet) {
        if (JSON.stringify(sheet.officeDirectory || {}) === json) return;
        updateSharedSheetDataSafely(sheet.id, function (current) {
          return Object.assign({}, current, { officeDirectory: dir });
        }).then(function () {
          var live = sharedSheets.find(function (s) { return s.id === sheet.id; });
          if (live) live.officeDirectory = dir;
        }, function () {});
      });
    }, 800);
  }
  function renderOfficeDataFolders() {
    officeDataOpenKey = null;
    officeDataTitleEl.textContent = tr("officeDataTitle");
    officeDataListEl.hidden = true;
    officeDataFoldersEl.hidden = false;
    officeDataFoldersEl.innerHTML = "";
    OFFICE_DATA_FOLDERS.forEach(function (f) {
      var item = document.createElement("div");
      item.className = "library-item";
      item.dataset.key = f.key;
      var thumb = document.createElement("div");
      thumb.className = "library-item-thumb";
      thumb.textContent = "📁";
      var name = document.createElement("div");
      name.className = "library-item-name";
      var count = (officeDirectory()[f.key] || []).length;
      name.textContent = tr(f.label) + (count ? " (" + count + ")" : "");
      item.appendChild(thumb);
      item.appendChild(name);
      item.addEventListener("click", function () { openOfficeDataFolder(f); });
      officeDataFoldersEl.appendChild(item);
    });
  }
  function openOfficeDataFolder(f) {
    officeDataOpenKey = f.key;
    officeDataTitleEl.textContent = tr(f.label);
    officeDataFoldersEl.hidden = true;
    officeDataListEl.hidden = false;
    renderOfficeDataEntries(f);
  }
  // Each person: a name and an optional ID number (ת"ז). "+" opens two
  // labelled fields side by side; ✓ (or Enter) adds the person.
  function renderOfficeDataEntries(f) {
    officeDataListEl.innerHTML = "";
    var entries = officeDirectory()[f.key] || [];
    entries.forEach(function (entry) {
      var row = document.createElement("div");
      row.className = "site-log-entry office-data-entry";
      var text = document.createElement("span");
      var nameEl = document.createElement("span");
      nameEl.className = "office-data-name";
      nameEl.textContent = entry.name;
      text.appendChild(nameEl);
      if (entry.idNumber) {
        var idEl = document.createElement("span");
        idEl.className = "office-data-idnum";
        idEl.textContent = tr("officeDataIdShort") + " " + entry.idNumber;
        text.appendChild(idEl);
      }
      row.appendChild(text);
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "site-log-entry-remove";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        var dir = officeDirectory();
        dir[f.key] = (dir[f.key] || []).filter(function (e) { return e.id !== entry.id; });
        saveData();
        publishOfficeDirectory();
        renderOfficeDataEntries(f);
      });
      row.appendChild(removeBtn);
      officeDataListEl.appendChild(row);
    });

    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "site-log-add-btn";
    addBtn.innerHTML = '<img src="tasks-plus-icon.webp" alt="+">';
    addBtn.addEventListener("click", function () { showOfficeDataForm(f, addBtn); });
    officeDataListEl.appendChild(addBtn);
  }
  function showOfficeDataForm(f, addBtn) {
    var form = document.createElement("form");
    form.className = "office-data-form";
    function field(labelKey, extraClass) {
      var wrap = document.createElement("label");
      wrap.className = "office-data-field " + extraClass;
      var cap = document.createElement("span");
      cap.className = "office-data-field-label";
      cap.textContent = tr(labelKey);
      var input = document.createElement("input");
      input.type = "text";
      input.className = "auth-input";
      wrap.appendChild(cap);
      wrap.appendChild(input);
      form.appendChild(wrap);
      return input;
    }
    var nameInput = field("officeDataNameLabel", "office-data-field-name");
    nameInput.maxLength = 60;
    nameInput.required = true;
    var idInput = field("officeDataIdLabel", "office-data-field-id");
    idInput.maxLength = 12;
    idInput.inputMode = "numeric";
    var ok = document.createElement("button");
    ok.type = "submit";
    ok.className = "office-data-ok";
    ok.textContent = "✓";
    form.appendChild(ok);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = nameInput.value.trim();
      if (!name) { nameInput.focus(); return; }
      var dir = officeDirectory();
      var entry = { id: uid(), name: name };
      var idNumber = idInput.value.replace(/\D/g, "");
      if (idNumber) entry.idNumber = idNumber;
      dir[f.key] = (dir[f.key] || []).concat([entry]);
      saveData();
      publishOfficeDirectory();
      renderOfficeDataEntries(f);
    });
    officeDataListEl.replaceChild(form, addBtn);
    nameInput.focus();
  }
  officeDataBtn.addEventListener("click", function () {
    state.menuOpen = false;
    publishOfficeDirectory(); // projects added since the last change get the lists too
    renderOfficeDataFolders();
    officeDataView.hidden = false;
    render();
  });
  document.getElementById("officeDataBackBtn").addEventListener("click", function () {
    if (officeDataOpenKey) { renderOfficeDataFolders(); return; }
    officeDataView.hidden = true;
  });

  function openOfficeProcurementView(filterSheetId, filterDate) {
    officeProcurementFromNotification = !!filterSheetId;
    closeOfficeReportTypeModal();
    officeReportViewDate = filterDate || todayISO();
    renderOfficeReportDateControls();
    renderOfficeProcurementList(filterSheetId);
    officeProcurementView.hidden = false;
  }
  function closeOfficeProcurementView() {
    officeProcurementView.hidden = true;
    if (!officeProcurementFromNotification) officeReportTypeView.hidden = false;
    officeProcurementFromNotification = false;
  }
  officeReportProcurementBtn.addEventListener("click", function () { openOfficeProcurementView(); });
  officeProcurementBackBtn.addEventListener("click", closeOfficeProcurementView);
  officeProcurementDailyBtn.addEventListener("click", function () { generateOfficeCombinedReport("procurement"); });
  officeProcurementMonthlyBtn.addEventListener("click", function () {
    pendingOfficeReportKind = "procurement";
    openOfficeNameReportModal("monthly");
  });
  officeProcurementCustomBtn.addEventListener("click", function () {
    pendingOfficeReportKind = "procurement";
    openOfficeNameReportModal("custom");
  });


  // ---------------------------------------------------------------------
  // תוכנית עבודה: a project's activities on a Gantt chart (week / month /
  // the whole plan, any length), edited by every member. Kept in the
  // project's own data as workPlan: [{ id, name, start, end (ISO dates),
  // by (who carries it out), status todo|prog|done, progress 0-100, note,
  // updatedBy, updatedAt }]. A shared project's edits are applied to the
  // server's fresh copy one item at a time, so two members editing at once
  // don't overwrite each other. Head Office sees every watched project's
  // plan in one chart (wpState.sheetId null).
  // ---------------------------------------------------------------------
  var workPlanView = document.getElementById("workPlanView");
  var workPlanTitle = document.getElementById("workPlanTitle");
  var workPlanChart = document.getElementById("workPlanChart");
  var workPlanRangeLabel = document.getElementById("workPlanRangeLabel");
  var workPlanNav = document.getElementById("workPlanNav");
  var workPlanLateBanner = document.getElementById("workPlanLateBanner");
  var workPlanEmpty = document.getElementById("workPlanEmpty");
  var workPlanBtn = document.getElementById("workPlanBtn");
  var wpEditOverlay = document.getElementById("workPlanEditOverlay");
  var wpName = document.getElementById("wpName");
  var wpStart = document.getElementById("wpStart");
  var wpEnd = document.getElementById("wpEnd");
  var wpBy = document.getElementById("wpBy");
  var wpByList = document.getElementById("wpByList");
  var wpProgress = document.getElementById("wpProgress");
  var wpProgressLabel = document.getElementById("wpProgressLabel");
  var wpNote = document.getElementById("wpNote");
  var wpProject = document.getElementById("wpProject");
  var wpProjectRow = document.getElementById("wpProjectRow");
  var wpDeleteBtn = document.getElementById("wpDeleteBtn");
  var wpShowInTasks = document.getElementById("wpShowInTasks");
  var WP_NAME_W = 112;
  var wpState = { sheetId: null, zoom: "all", anchor: todayISO(), collapsed: {} };
  var wpEditing = null; // { sheetId, item (a copy), isNew }
  var wpEditStatus = "todo";

  function wpDate(iso) { var p = iso.split("-"); return new Date(+p[0], +p[1] - 1, +p[2], 12); }
  function wpIso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function wpDiff(a, b) { return Math.round((wpDate(b) - wpDate(a)) / 86400000); }
  function wpIsLate(item) { return item.status !== "done" && item.end < todayISO(); }
  function wpClass(item) { return item.status === "done" ? "done" : wpIsLate(item) ? "late" : item.status === "prog" ? "prog" : "todo"; }
  function wpSorted(list) {
    return (list || []).slice().sort(function (a, b) { return a.start.localeCompare(b.start) || a.end.localeCompare(b.end); });
  }

  // What the chart shows: one project, or (Head Office) every watched one.
  function wpGroups() {
    if (wpState.sheetId) {
      var sheet = allSheets().find(function (s) { return s.id === wpState.sheetId; });
      return sheet ? [{ sheet: sheet, items: wpSorted(sheet.workPlan) }] : [];
    }
    return officeReportSheets().slice().sort(compareSheetNames).map(function (s) {
      return { sheet: s, items: wpSorted(s.workPlan) };
    }).filter(function (g) { return g.items.length; });
  }

  function wpRange(groups) {
    var a = wpState.anchor;
    if (wpState.zoom === "week") {
      return { start: addDaysToISO(a, -wpDate(a).getDay()), days: 7 };
    }
    if (wpState.zoom === "month") {
      var d = wpDate(a);
      return { start: a.slice(0, 8) + "01", days: new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() };
    }
    // the whole plan, a day either side
    var all = [].concat.apply([], groups.map(function (g) { return g.items; }));
    if (!all.length) return { start: todayISO().slice(0, 8) + "01", days: 30 };
    var first = all.reduce(function (m, x) { return x.start < m ? x.start : m; }, all[0].start);
    var last = all.reduce(function (m, x) { return x.end > m ? x.end : m; }, all[0].end);
    var start = addDaysToISO(first, -1);
    return { start: start, days: Math.max(14, wpDiff(start, last) + 2) };
  }

  function wpRangeLabel(range) {
    var loc = calLocale();
    var s = wpDate(range.start), e = wpDate(addDaysToISO(range.start, range.days - 1));
    if (wpState.zoom === "month") return s.toLocaleDateString(loc, { month: "long", year: "numeric" });
    var fmt = { day: "numeric", month: "short" };
    if (wpState.zoom === "all") fmt.year = "numeric";
    return s.toLocaleDateString(loc, fmt) + " – " + e.toLocaleDateString(loc, fmt);
  }

  function wpEl(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  }

  // Builds the chart into `host`. width = the space for it; forPdf draws
  // every row (no collapsing, no tapping).
  function wpBuildChart(host, groups, range, width, forPdf) {
    host.innerHTML = "";
    var avail = Math.max(120, width - WP_NAME_W - 2);
    var minDay = wpState.zoom === "week" ? 30 : wpState.zoom === "month" ? 6.5 : 4;
    var dayW = Math.max(minDay, avail / range.days);
    var trackW = Math.round(dayW * range.days);
    var today = todayISO();
    var todayIdx = wpDiff(range.start, today);
    var loc = calLocale();

    function track(cls) {
      var t = wpEl("div", "wp-track" + (cls ? " " + cls : ""));
      t.style.width = trackW + "px";
      t.style.backgroundSize = dayW + "px 100%";
      // Saturdays shaded
      for (var i = 0; i < range.days; i++) {
        if (wpDate(addDaysToISO(range.start, i)).getDay() === 6) {
          var sat = wpEl("div", "wp-sat");
          sat.style.right = (i * dayW) + "px";
          sat.style.width = dayW + "px";
          t.appendChild(sat);
        }
      }
      if (todayIdx >= 0 && todayIdx < range.days) {
        var line = wpEl("div", "wp-today");
        line.style.right = (todayIdx * dayW + dayW / 2 - 1) + "px";
        t.appendChild(line);
      }
      return t;
    }

    var head = wpEl("div", "wp-row wp-head-row" + (wpState.zoom === "week" ? " wp-head-week" : ""));
    head.appendChild(wpEl("div", "wp-name wp-name-head", tr("workPlanActivity")));
    var ht = track("wp-head-track");
    for (var i = 0; i < range.days; i++) {
      var d = wpDate(addDaysToISO(range.start, i));
      var label = null;
      if (wpState.zoom === "week") {
        label = d.toLocaleDateString(loc, { weekday: "narrow" }) + "\n" + d.getDate();
      } else if (wpState.zoom === "month") {
        if (dayW >= 14 || d.getDate() === 1 || d.getDate() % 5 === 0) label = String(d.getDate());
      } else if (d.getDate() === 1 || (i === 0 && d.getDate() < 22)) {
        // the month's name where it starts (the first partial month only if
        // there's room before the next one's)
        label = d.toLocaleDateString(loc, { month: "short", year: "2-digit" });
      }
      if (label) {
        var lab = wpEl("span", "wp-day" + (i === todayIdx ? " wp-day-today" : ""), label);
        lab.style.right = (i * dayW) + "px";
        if (wpState.zoom === "week") lab.style.width = dayW + "px";
        ht.appendChild(lab);
      }
    }
    head.appendChild(ht);
    host.appendChild(head);

    groups.forEach(function (g) {
      if (!wpState.sheetId) {
        var lateCount = g.items.filter(wpIsLate).length;
        var gh = wpEl("div", "wp-group");
        var collapsed = !forPdf && wpState.collapsed[g.sheet.id];
        gh.appendChild(wpEl("span", "", (collapsed ? "◂ " : "▾ ") + g.sheet.name));
        if (lateCount) gh.appendChild(wpEl("em", "", tr("workPlanLateCount").replace("{n}", lateCount)));
        if (!forPdf) {
          gh.addEventListener("click", function () {
            wpState.collapsed[g.sheet.id] = !wpState.collapsed[g.sheet.id];
            renderWorkPlan();
          });
        }
        host.appendChild(gh);
        if (collapsed) return;
      }
      wpBuildHammockRows(host, g, range, dayW, forPdf, track, function (item, hammock) {
        var row = wpEl("div", "wp-row" + (hammock ? " wp-in-hammock" : ""));
        var name = wpEl("div", "wp-name");
        if (hammock) name.style.borderRightColor = hammock.color;
        name.appendChild(wpEl("span", "wp-name-text", item.name));
        if (item.by) name.appendChild(wpEl("small", "", item.by));
        wpSlipLabel(name, g.sheet, item);
        if (!forPdf) wpBindNameLongPress(name, g.sheet, item);
        row.appendChild(name);
        var t = track();
        var from = Math.max(0, wpDiff(range.start, item.start));
        var to = Math.min(range.days - 1, wpDiff(range.start, item.end));
        if (to >= 0 && from <= range.days - 1) {
          var cls = wpClass(item);
          var bar = wpEl("div", "wp-bar wp-" + cls + (wpLinkFrom && wpLinkFrom.itemId === item.id ? " wp-linking" : ""));
          bar.setAttribute("data-id", item.id);
          if (!forPdf) wpBindBarLongPress(bar, g.sheet, item);
          var barRight = from * dayW + 1;
          var barWidth = Math.max(4, (to - from + 1) * dayW - 2);
          bar.style.right = barRight + "px";
          bar.style.width = barWidth + "px";
          // Two layers along the whole bar: the top third (light) holds who
          // carries it out and the start/end dates (each only when that day
          // is on screen, and only what fits); the lower two thirds are the
          // status colour with the done part in green and the % done.
          var top = wpEl("div", "wp-bar-top");
          var startShown = wpDiff(range.start, item.start) === from;
          var endShown = wpDiff(range.start, item.end) === to;
          // the name first; the dates (~24px each) only where they fit beside it
          var nameW = item.by ? item.by.length * 4.8 + 8 : 0;
          var dateRoom = barWidth - nameW - 8;
          var showStart = startShown && dateRoom >= 24;
          if (showStart) dateRoom -= 26;
          var showEnd = endShown && dateRoom >= 24;
          if (showStart) top.appendChild(wpEl("span", "wp-bar-date", isoToDisplay(item.start)));
          top.appendChild(wpEl("span", "wp-bar-by", barWidth >= 22 ? item.by || "" : ""));
          if (showEnd) top.appendChild(wpEl("span", "wp-bar-date", isoToDisplay(item.end)));
          bar.appendChild(top);
          var main = wpEl("div", "wp-bar-main");
          if (item.progress > 0 && item.status !== "done") {
            var fill = wpEl("span", "wp-fill");
            fill.style.width = item.progress + "%";
            main.appendChild(fill);
          }
          var pct = item.progress > 0 && item.status !== "done" ? item.progress + "%" : "";
          var room = barWidth;
          if (pct && room >= 30) { main.appendChild(wpEl("span", "wp-bar-text", pct)); room -= 34; }
          if (wpState.zoom === "week" && room >= 40) main.appendChild(wpEl("span", "wp-bar-text wp-bar-name", item.name));
          bar.appendChild(main);
          t.appendChild(bar);
        }
        wpDrawBaselineBar(t, g.sheet, item, range, dayW);
        wpDrawForecast(t, name, g.sheet, item, range, dayW, forPdf);
        row.appendChild(t);
        if (!forPdf) {
          row.addEventListener("click", function () { wpRowTapped(g.sheet, item); });
        }
        host.appendChild(row);
      });
    });
  }

  function renderWorkPlan() {
    if (workPlanView.hidden) return;
    var groups = wpGroups();
    var range = wpRange(groups);
    workPlanRangeLabel.textContent = wpRangeLabel(range);
    workPlanNav.classList.toggle("wp-nav-off", wpState.zoom === "all");
    document.querySelectorAll(".wp-zoom").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-zoom") === wpState.zoom);
    });
    var late = [].concat.apply([], groups.map(function (g) { return g.items.filter(wpIsLate); }));
    workPlanLateBanner.hidden = !late.length;
    workPlanLateBanner.textContent = "⚠ " + (wpState.sheetId ? tr("workPlanLateBanner") :
      tr("workPlanLateBannerOffice").replace("{p}", groups.filter(function (g) { return g.items.some(wpIsLate); }).length))
      .replace("{n}", late.length);
    var any = groups.some(function (g) { return g.items.length; });
    workPlanEmpty.hidden = any;
    workPlanChart.hidden = !any;
    if (any) {
      wpBuildChart(workPlanChart, groups, range, workPlanChart.clientWidth || window.innerWidth, false);
      wpDrawDependencies(workPlanChart, groups);
    }
    document.getElementById("workPlanCopyWeekBtn").hidden = wpState.zoom !== "week";
    document.getElementById("workPlanBaselineBtn").hidden = !wpState.sheetId; // per project
    document.getElementById("wpLegendBaseline").hidden = !(wpState.showBaseline && groups.some(function (g) { return g.sheet.workBaseline; }));
  }
  function refreshWorkPlanIfOpen() {
    if (!workPlanView.hidden && !wpEditing) renderWorkPlan();
  }

  function openWorkPlan() {
    var sheet = activeSheet();
    if (!sheet) return;
    wpState.sheetId = sheet.id === HEAD_OFFICE_SHEET_ID ? null : sheet.id;
    wpState.anchor = todayISO();
    wpState.zoom = "all"; // opens on the whole plan
    workPlanTitle.textContent = wpState.sheetId ? tr("workPlanTitle") + " – " + sheet.name : tr("workPlanOfficeTitle");
    workPlanView.hidden = false;
    wpFitAboveFooter();
    updateActiveFabHighlight();
    renderWorkPlan();
  }
  // The bottom icon bar stays in view under the plan (as under the
  // calendar): the plan ends just above it, and tapping any of its buttons
  // closes the plan first.
  function wpFitAboveFooter() {
    workPlanView.style.bottom = "";
    if (workPlanView.hidden) return;
    var edge = notebookFooterEl.previousElementSibling || notebookFooterEl;
    var top = edge.getBoundingClientRect().top;
    if (notebookFooterEl.offsetHeight && top > window.innerHeight / 2 && top < window.innerHeight) {
      workPlanView.style.bottom = (window.innerHeight - top) + "px";
    }
  }
  window.addEventListener("resize", wpFitAboveFooter);
  notebookFooterEl.addEventListener("click", function () {
    if (!workPlanView.hidden) closeWorkPlan();
  }, true);
  function closeWorkPlan() {
    wpLinkFrom = null;
    workPlanView.hidden = true;
    render(); // the day's tasks follow the plan's changes
  }

  // ---- adding / editing an activity --------------------------------------
  function wpPeopleSuggestions(sheet) {
    var names = [];
    ["crews", "foremen", "engineers", "workers", "operators", "surveyors"].forEach(function (k) {
      officeDirectoryNames(sheet, k).forEach(function (n) { if (names.indexOf(n) === -1) names.push(n); });
    });
    (sheet.workPlan || []).forEach(function (x) { if (x.by && names.indexOf(x.by) === -1) names.push(x.by); });
    return names;
  }
  function wpFillPeople(sheet) {
    wpByList.innerHTML = "";
    wpPeopleSuggestions(sheet).forEach(function (n) {
      var o = document.createElement("option");
      o.value = n;
      wpByList.appendChild(o);
    });
  }
  function wpSetStatus(status) {
    wpEditStatus = status;
    document.querySelectorAll(".wp-status").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-status") === status);
    });
  }
  function wpSetProgress(p) {
    wpProgress.value = String(p);
    wpProgressLabel.textContent = tr("workPlanProgress").replace("{p}", p);
  }

  // fromTask: a task being turned into an activity (prefills it; once
  // saved, the task becomes the activity's own task)
  function openWorkPlanEditor(sheet, item, fromTask) {
    var isNew = !item;
    var start = wpState.zoom === "month" && wpState.anchor.slice(0, 7) !== todayISO().slice(0, 7) ? wpState.anchor.slice(0, 8) + "01" : todayISO();
    if (fromTask) start = fromTask.date && fromTask.date > todayISO() ? fromTask.date : todayISO();
    var copy = item ? JSON.parse(JSON.stringify(item)) :
      { id: uid(), name: fromTask ? fromTask.text : "", start: start, end: start, by: "",
        status: fromTask && fromTask.status === 1 ? "prog" : "todo", progress: 0, note: "" };
    wpEditing = { sheetId: sheet ? sheet.id : null, item: copy, isNew: isNew, fromTaskId: fromTask ? fromTask.id : null };
    wpName.value = copy.name;
    wpStart.value = copy.start;
    wpEnd.value = copy.end;
    wpBy.value = copy.by || "";
    wpNote.value = copy.note || "";
    wpShowInTasks.checked = copy.showInTasks !== false;
    document.getElementById("wpPostponeRow").hidden = true;
    document.getElementById("wpPostponeBtn").hidden = isNew;
    wpSetStatus(copy.status || "todo");
    wpSetProgress(copy.progress || 0);
    wpFillActuals(copy);
    // Head Office adding: which project
    wpProjectRow.hidden = !(isNew && !wpState.sheetId);
    if (!wpProjectRow.hidden) {
      wpProject.innerHTML = "";
      officeReportSheets().slice().sort(compareSheetNames).forEach(function (s) {
        var o = document.createElement("option");
        o.value = s.id;
        o.textContent = s.name;
        wpProject.appendChild(o);
      });
      wpEditing.sheetId = wpProject.value;
    }
    var peopleSheet = allSheets().find(function (s) { return s.id === wpEditing.sheetId; });
    if (peopleSheet) wpFillPeople(peopleSheet);
    wpFillAfterOptions(peopleSheet, copy);
    wpRenderLinksList(peopleSheet, copy);
    wpFillHammocks(peopleSheet, copy.hammock || null);
    wpDeleteBtn.hidden = isNew;
    document.getElementById("workPlanEditTitle").textContent = tr(isNew ? "workPlanAddTitle" : "workPlanEditTitle");
    wpEditOverlay.hidden = false;
    if (isNew) wpName.focus();
  }
  function closeWorkPlanEditor() {
    wpEditOverlay.hidden = true;
    wpEditing = null;
    renderWorkPlan();
  }

  // Applies one activity's change (or its removal) to a project's plan -
  // locally right away, and for a shared project onto the server's fresh
  // copy (other members' edits in between are kept).
  // hammock (optional): a hammock to add / update along with it; hammocks
  // no activity is in any more are dropped. item may be null (a hammock
  // renamed / recoloured).
  function saveWorkPlanItem(sheet, item, remove, hammock) {
    var apply = function (list) {
      if (!item) return (list || []).slice();
      var out = (list || []).filter(function (x) { return x.id !== item.id; });
      if (!remove) out.push(item);
      return out;
    };
    var applyHammocks = function (list, plan) {
      var out = (list || []).filter(function (h) { return !hammock || h.id !== hammock.id; });
      if (hammock) out.push(hammock);
      return out.filter(function (h) { return plan.some(function (x) { return x.hammock === h.id; }); });
    };
    var prev = item && (sheet.workPlan || []).find(function (x) { return x.id === item.id; });
    var change = item && !remove ? wpApplyActuals(prev, item) : null;
    sheet.workPlan = apply(sheet.workPlan);
    sheet.workHammocks = applyHammocks(sheet.workHammocks, sheet.workPlan);
    wpAfterActuals(sheet, item, change);
    if (!sheet.shared) {
      saveData();
      return;
    }
    if (!supabaseClient) return;
    updateSharedSheetDataSafely(sheet.id, function (current) {
      var plan = apply(current.workPlan);
      return Object.assign({}, current, { workPlan: plan, workHammocks: applyHammocks(current.workHammocks, plan) });
    }).then(function (newData) {
      var live = sharedSheets.find(function (s) { return s.id === sheet.id; });
      if (live) {
        live.workPlan = newData.workPlan || [];
        live.workHammocks = newData.workHammocks || [];
      }
      refreshWorkPlanIfOpen();
    }, function () {
      alert(tr("workPlanSaveError"));
    });
  }

  document.getElementById("workPlanEditForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!wpEditing) return;
    var sheet = allSheets().find(function (s) { return s.id === wpEditing.sheetId; });
    var name = wpName.value.replace(/\s+/g, " ").trim();
    if (!sheet || !name || !wpStart.value) return;
    var end = wpEnd.value && wpEnd.value >= wpStart.value ? wpEnd.value : wpStart.value;
    var progress = parseInt(wpProgress.value, 10) || 0;
    var item = Object.assign(wpEditing.item, {
      name: name,
      start: wpStart.value,
      end: end,
      by: wpBy.value.replace(/\s+/g, " ").trim(),
      status: wpEditStatus,
      progress: wpEditStatus === "done" ? 100 : progress,
      note: wpNote.value.trim(),
      showInTasks: wpShowInTasks.checked,
      after: wpAfter.value || null,
      actualStart: wpActualStart.value || null,
      actualEnd: wpActualEnd.value || null,
      hammock: wpHammockSelect.value && wpHammockSelect.value !== "__new" ? wpHammockSelect.value : null,
      updatedBy: myPhoneNumber || null,
      updatedAt: Date.now()
    });
    var fromTaskId = wpEditing.fromTaskId;
    var newHammock = wpEditing.newHammock && wpEditing.newHammock.id === item.hammock ? wpEditing.newHammock : null;
    wpEditorSaving = true;
    saveWorkPlanItem(sheet, item, false, newHammock);
    wpEditorSaving = false;
    if (fromTaskId) {
      var task = sheet.tasks.find(function (t) { return t.id === fromTaskId; });
      if (task && !task.planItemId) {
        task.planItemId = item.id;
        saveData();
      }
    }
    closeWorkPlanEditor();
    wpCascadeDependents(sheet, item);
  });
  wpDeleteBtn.addEventListener("click", function () {
    if (!wpEditing) return;
    var editing = wpEditing;
    askConfirm(tr("workPlanDeleteConfirm"), function () {
      var sheet = allSheets().find(function (s) { return s.id === editing.sheetId; });
      if (sheet) saveWorkPlanItem(sheet, editing.item, true);
      closeWorkPlanEditor();
    });
  });
  document.getElementById("wpCancelBtn").addEventListener("click", closeWorkPlanEditor);
  wpStart.addEventListener("change", function () {
    if (!wpEnd.value || wpEnd.value < wpStart.value) wpEnd.value = wpStart.value;
  });
  wpProject.addEventListener("change", function () {
    if (!wpEditing) return;
    wpEditing.sheetId = wpProject.value;
    var s = allSheets().find(function (x) { return x.id === wpProject.value; });
    if (s) wpFillPeople(s);
    wpFillAfterOptions(s, wpEditing.item);
    wpEditing.newHammock = null;
    wpFillHammocks(s, null);
  });
  document.querySelectorAll(".wp-status").forEach(function (b) {
    b.addEventListener("click", function () {
      var status = b.getAttribute("data-status");
      wpSetStatus(status);
      if (status === "done") wpSetProgress(100);
      else if (status === "todo") wpSetProgress(0);
      wpActualsForStatus(status);
    });
  });
  wpProgress.addEventListener("input", function () {
    var p = parseInt(wpProgress.value, 10) || 0;
    wpSetProgress(p);
    if (p === 100) wpSetStatus("done");
    else if (p > 0) wpSetStatus("prog");
    wpActualsForStatus(wpEditStatus);
  });

  // ---- PDF -------------------------------------------------------------
  // The chart as on screen (the current week / month / whole plan), drawn
  // wide on landscape A4 pages.
  function workPlanPdf() {
    var groups = wpGroups();
    var range = wpRange(groups);
    var sheet = wpState.sheetId && allSheets().find(function (s) { return s.id === wpState.sheetId; });
    var title = sheet ? tr("workPlanTitle") + " – " + sheet.name : tr("workPlanOfficeTitle");
    var fileName = title + " " + isoToFileNameDate(todayISO()) + ".pdf";
    showToast(tr("workPlanPdfMsg"));
    var ready = (window.html2canvas && window.jspdf) ? Promise.resolve() : Promise.all([
      window.html2canvas ? Promise.resolve() : loadScriptOnce("vendor/html2canvas.min.js"),
      window.jspdf ? Promise.resolve() : loadScriptOnce("vendor/jspdf.umd.min.js")
    ]);
    ready.then(function () {
      var wrap = wpEl("div", "wp-pdf");
      wrap.dir = "rtl";
      wrap.style.cssText = "position:fixed;top:0;left:-99999px;width:1100px;background:#fff;padding:24px;";
      wrap.appendChild(wpEl("h1", "wp-pdf-title", title));
      wrap.appendChild(wpEl("div", "wp-pdf-range", wpRangeLabel(range)));
      var chart = wpEl("div", "wp-chart wp-chart-pdf");
      wrap.appendChild(chart);
      var legend = document.querySelector("#workPlanView .wp-legend").cloneNode(true);
      wrap.appendChild(legend);
      document.body.appendChild(wrap);
      var collapsedBefore = wpState.collapsed;
      wpBuildChart(chart, groups, range, 1052, true);
      wpDrawDependencies(chart, groups);
      wpState.collapsed = collapsedBefore;
      return window.html2canvas(wrap, { scale: 2, backgroundColor: "#ffffff" }).then(function (canvas) {
        document.body.removeChild(wrap);
        var pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
        var pw = pdf.internal.pageSize.getWidth(), ph = pdf.internal.pageSize.getHeight();
        var imgH = canvas.height * pw / canvas.width;
        var img = canvas.toDataURL("image/jpeg", 0.92);
        for (var y = 0; y < imgH; y += ph) {
          if (y > 0) pdf.addPage("a4", "landscape");
          pdf.addImage(img, "JPEG", 0, -y, pw, imgH);
        }
        attemptShare(pdf.output("blob"), fileName, "application/pdf");
      }, function (err) {
        if (wrap.parentNode) document.body.removeChild(wrap);
        throw err;
      });
    }).catch(function (err) {
      console.error("work plan pdf failed:", err);
      alert(tr("workPlanSaveError"));
    });
  }

  // ---- wiring ------------------------------------------------------------
  workPlanBtn.addEventListener("click", openWorkPlan);
  document.getElementById("workPlanBackBtn").addEventListener("click", closeWorkPlan);
  document.getElementById("workPlanAddBtn").addEventListener("click", function () {
    var sheet = wpState.sheetId && allSheets().find(function (s) { return s.id === wpState.sheetId; });
    if (!wpState.sheetId && !officeReportSheets().length) return;
    openWorkPlanEditor(sheet || null, null);
  });
  document.getElementById("workPlanPdfBtn").addEventListener("click", workPlanPdf);
  document.querySelectorAll(".wp-zoom").forEach(function (b) {
    b.addEventListener("click", function () {
      wpState.zoom = b.getAttribute("data-zoom");
      renderWorkPlan();
    });
  });
  function wpStep(dir) {
    if (wpState.zoom === "week") wpState.anchor = addDaysToISO(wpState.anchor, 7 * dir);
    else if (wpState.zoom === "month") {
      var d = wpDate(wpState.anchor);
      wpState.anchor = wpIso(new Date(d.getFullYear(), d.getMonth() + dir, 1, 12));
    }
    renderWorkPlan();
  }
  // RTL: the right arrow (earlier) comes first
  document.getElementById("workPlanPrevBtn").addEventListener("click", function () { wpStep(-1); });
  document.getElementById("workPlanNextBtn").addEventListener("click", function () { wpStep(1); });
  document.getElementById("workPlanTodayBtn").addEventListener("click", function () {
    wpState.anchor = todayISO();
    renderWorkPlan();
  });
  window.addEventListener("resize", refreshWorkPlanIfOpen);

  // ---- the plan in the daily task list -----------------------------------
  // Every activity shown in tasks (showInTasks, on by default) has one
  // linked task, id "plan-<activity id>" - the same on every member's
  // device, so two devices creating it at once merge into one. It's dated
  // the activity's start day and then carried from day to day by the usual
  // rollover while open; its text and status follow the plan, and tapping
  // it (cycleStatus) or renaming it updates the plan in turn.
  var WP_TASK_STATUS = { todo: 0, prog: 1, done: 2 };
  var WP_STATUS_FROM_TASK = ["todo", "prog", "done"];
  function wpTaskId(item) { return "plan-" + item.id; }
  function wpItemOf(sheet, task) {
    return task && task.planItemId ? (sheet.workPlan || []).find(function (x) { return x.id === task.planItemId; }) : null;
  }

  function syncWorkPlanTasks() {
    if (dataLoadBlocked) return;
    var today = todayISO();
    var changed = false;
    allSheets().forEach(function (sheet) {
      if (sheet.id === HEAD_OFFICE_SHEET_ID || sheet.ended || !Array.isArray(sheet.tasks)) return;
      var plan = sheet.workPlan || [];
      if (!plan.length && !sheet.tasks.some(function (t) { return t.planItemId; })) return;
      var byId = {};
      plan.forEach(function (it) { byId[it.id] = it; });
      var linked = {};
      var detach = [];
      sheet.tasks = sheet.tasks.filter(function (t) {
        if (!t.planItemId) return true;
        var item = byId[t.planItemId];
        if (!item || item.showInTasks === false) { changed = true; return false; }
        if (t.type === "note") {
          // turned into a note: it's the user's own line now
          delete t.planItemId;
          detach.push(item);
          changed = true;
          return true;
        }
        linked[item.id] = true;
        var st = WP_TASK_STATUS[item.status] || 0;
        if (t.text !== item.name) { t.text = item.name; changed = true; }
        if (t.status !== st) { t.status = st; changed = true; }
        if (st !== 2) {
          var want = item.start > today ? item.start : (t.date !== today ? today : t.date);
          if (t.date !== want) { t.date = want; changed = true; }
        }
        return true;
      });
      plan.forEach(function (item) {
        if (linked[item.id] || item.showInTasks === false || item.status === "done") return;
        if (sheet.tasks.some(function (t) { return t.id === wpTaskId(item); })) return;
        sheet.tasks.push({
          id: wpTaskId(item), text: item.name, status: WP_TASK_STATUS[item.status] || 0, urgent: false,
          type: "task", date: item.start > today ? item.start : today, createdAt: Date.now(), planItemId: item.id
        });
        changed = true;
      });
      detach.forEach(function (item) {
        saveWorkPlanItem(sheet, Object.assign({}, item, { showInTasks: false }), false);
      });
    });
    if (changed) saveData();
  }

  // The task side changed -> the activity follows.
  function workPlanTaskStatusChanged(sheet, task) {
    var item = wpItemOf(sheet, task);
    if (!item) return;
    var status = WP_STATUS_FROM_TASK[task.status] || "todo";
    if (item.status === status) return;
    saveWorkPlanItem(sheet, Object.assign({}, item, {
      status: status,
      progress: status === "done" ? 100 : status === "todo" ? 0 : (item.progress || 0),
      updatedBy: myPhoneNumber || null,
      updatedAt: Date.now()
    }), false);
  }
  function workPlanTaskRenamed(sheet, task) {
    var item = wpItemOf(sheet, task);
    if (!item || item.name === task.text) return;
    saveWorkPlanItem(sheet, Object.assign({}, item, { name: task.text, updatedBy: myPhoneNumber || null, updatedAt: Date.now() }), false);
  }
  // Deleted or moved away from the task list: the activity stays in the
  // plan, it just isn't shown as a task any more.
  function workPlanTaskRemoved(sheet, task) {
    var item = wpItemOf(sheet, task);
    if (!item) return;
    saveWorkPlanItem(sheet, Object.assign({}, item, { showInTasks: false, updatedAt: Date.now() }), false);
  }
  function openWorkPlanItem(sheet, task) {
    var item = wpItemOf(sheet, task);
    if (!item) return;
    openWorkPlan();
    openWorkPlanEditor(sheet, item);
  }
  taskWorkPlanBtn.addEventListener("click", function () {
    var sheet = activeSheet();
    var task = sheet.tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    closeMoveTask();
    openWorkPlanItem(sheet, task);
  });

  // Head Office's mirror of a project's activity (planRef) tapped or ticked.
  function workPlanRefStatusChanged(task) {
    var sheet = allSheets().find(function (s) { return s.id === task.planRef.sheetId; });
    var item = sheet && (sheet.workPlan || []).find(function (x) { return x.id === task.planRef.itemId; });
    if (!item) return;
    var status = WP_STATUS_FROM_TASK[task.status] || "todo";
    if (item.status === status) return;
    saveWorkPlanItem(sheet, Object.assign({}, item, {
      status: status,
      progress: status === "done" ? 100 : status === "todo" ? 0 : (item.progress || 0),
      updatedBy: myPhoneNumber || null,
      updatedAt: Date.now()
    }), false);
  }
  function openHeadOfficeNotificationTarget(task) {
    if (task.planRef) {
      var sheet = allSheets().find(function (s) { return s.id === task.planRef.sheetId; });
      var item = sheet && (sheet.workPlan || []).find(function (x) { return x.id === task.planRef.itemId; });
      if (!item) return;
      openWorkPlan();
      openWorkPlanEditor(sheet, item);
      return;
    }
    openOfficeProcurementView(task.targetSheetId, task.targetDate);
  }

  // Task menu: a task becomes a work-plan activity - the plan opens on the
  // activity editor, prefilled from the task.
  taskToPlanBtn.addEventListener("click", function () {
    var sheet = activeSheet();
    var task = sheet.tasks.find(function (t) { return t.id === pendingMoveTaskId; });
    closeMoveTask();
    if (!task) return;
    openWorkPlan();
    openWorkPlanEditor(sheet, null, task);
  });

  // ---------------------------------------------------------------------
  // Work plan stage 3: planned vs. done in the work diary, notices about
  // late / starting activities, copying a week, postponing (optionally
  // everything after), and "starts after" dependencies.
  // ---------------------------------------------------------------------

  // ---- planned vs. done in the diary -----------------------------------
  // The day's log keeps planned: [{ itemId, name, by, progress, result
  // done|partial|not, reason }] - a snapshot, so the diary still says what
  // was planned even if the plan changes later. Each activity has a bar
  // that fills green with its % done (drag / tap along it); the % also
  // gives the result (100 done, 0 not, else partial) and updates the plan.
  var siteLogPlanView = document.getElementById("siteLogPlanView");
  var siteLogPlanList = document.getElementById("siteLogPlanList");
  var WP_RESULTS = [
    { key: "done", mark: "✓", label: "workPlanResultDone" },
    { key: "partial", mark: "½", label: "workPlanResultPartial" },
    { key: "not", mark: "✗", label: "workPlanResultNot" }
  ];

  // What was planned for that day: running then, or late and still open.
  function wpPlannedFor(sheet, dateISO) {
    return wpSorted(sheet.workPlan).filter(function (item) {
      if (item.start > dateISO) return false;
      if (item.end >= dateISO) return true;
      return item.status !== "done";
    });
  }

  function renderSiteLogPlanList() {
    var sheet = activeSheet();
    var dateISO = activeSiteLogDate;
    var log = findSiteLog(sheet, dateISO);
    var entries = (log && log.planned) || [];
    var items = wpPlannedFor(sheet, dateISO);
    // an activity marked that day and since moved/deleted still shows
    entries.forEach(function (e) {
      if (!items.some(function (it) { return it.id === e.itemId; })) items.push({ id: e.itemId, name: e.name, by: e.by, gone: true });
    });
    siteLogPlanList.innerHTML = "";
    if (!items.length) {
      siteLogPlanList.appendChild(wpEl("p", "wp-empty", tr("workPlanNothingPlanned")));
      return;
    }
    items.forEach(function (item) {
      var entry = entries.find(function (e) { return e.itemId === item.id; });
      var row = wpEl("div", "wp-diary-row");
      var head = wpEl("div", "wp-diary-head");
      var name = wpEl("div", "wp-diary-name");
      name.appendChild(wpEl("b", "", item.name));
      if (item.by) name.appendChild(wpEl("small", "", item.by));
      if (!item.gone && wpIsLate(item)) name.appendChild(wpEl("small", "wp-diary-late", tr("workPlanStatusLate")));
      head.appendChild(name);
      // beside the name, where the ✓ / ½ / ✗ were: the % bar, and ✕ once it's marked
      var side = wpEl("div", "wp-diary-side");
      side.appendChild(wpDiaryPctBar(sheet, dateISO, item, entry, renderSiteLogPlanList));
      var clear = wpEl("button", "wp-diary-clear", "✕");
      clear.type = "button";
      clear.title = tr("workPlanResultClear");
      clear.style.visibility = entry ? "" : "hidden"; // its place kept, so the bars line up
      clear.addEventListener("click", function () { clearSiteLogPlanEntry(sheet, dateISO, item); });
      side.appendChild(clear);
      head.appendChild(side);
      row.appendChild(head);
      if (entry && entry.result !== "done") {
        var reason = document.createElement("input");
        reason.type = "text";
        reason.className = "wp-diary-reason";
        reason.maxLength = 120;
        reason.placeholder = tr("workPlanReasonPh");
        reason.value = entry.reason || "";
        reason.addEventListener("change", function () {
          entry.reason = reason.value.replace(/\s+/g, " ").trim();
          saveData();
        });
        row.appendChild(reason);
      }
      siteLogPlanList.appendChild(row);
    });
  }

  // An activity's % bar for a day (the diary's, the morning report's):
  // marked that day, its % then; otherwise the plan's % so far, faded.
  // Setting it records the day and updates the plan; then `after`.
  function wpDiaryPctBar(sheet, dateISO, item, entry, after) {
    var live = !item.gone && (sheet.workPlan || []).find(function (x) { return x.id === item.id; });
    var planPct = live ? (live.status === "done" ? 100 : live.progress || 0) : 0;
    return wpPctBar(entry ? wpEntryPct(entry) : planPct, !!entry, function (pct) {
      setSiteLogPlanPct(sheet, dateISO, item, pct);
      after();
    });
  }
  // the bar itself: green as far as it's done, the number in it; tap / drag
  // along it, or the arrow keys
  function wpPctBar(pct, set, onSet) {
    var bar = wpEl("div", "wp-diary-pct" + (set ? " set" : ""));
    var fill = wpEl("div", "wp-diary-pct-fill");
    var label = wpEl("span", "wp-diary-pct-num");
    bar.appendChild(fill);
    bar.appendChild(label);
    bar.tabIndex = 0;
    bar.setAttribute("role", "slider");
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", "100");
    bar.title = tr("workPlanDiaryPctTitle");
    function show(v) {
      fill.style.width = v + "%";
      fill.classList.toggle("full", v >= 100);
      label.textContent = v + "%";
      bar.setAttribute("aria-valuenow", String(v));
    }
    show(pct);
    // along the bar, from its start side (right in Hebrew), in steps of 5
    function at(x) {
      var r = bar.getBoundingClientRect();
      var rtl = getComputedStyle(bar).direction === "rtl";
      var f = rtl ? (r.right - x) / r.width : (x - r.left) / r.width;
      // its ends (a finger's width) are 0 and 100
      if (f < 0.07) return 0;
      if (f > 0.93) return 100;
      return Math.max(5, Math.min(95, Math.round(f * 20) * 5));
    }
    var dragging = false;
    bar.addEventListener("pointerdown", function (e) {
      dragging = true;
      try { bar.setPointerCapture(e.pointerId); } catch (err) {}
      pct = at(e.clientX);
      bar.classList.add("set");
      show(pct);
    });
    bar.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      pct = at(e.clientX);
      show(pct);
    });
    function end() {
      if (!dragging) return;
      dragging = false;
      onSet(pct);
    }
    bar.addEventListener("pointerup", end);
    bar.addEventListener("pointercancel", end);
    bar.addEventListener("keydown", function (e) {
      var step = { ArrowUp: 5, ArrowRight: 5, ArrowDown: -5, ArrowLeft: -5 }[e.key];
      if (!step) return;
      e.preventDefault();
      if (getComputedStyle(bar).direction === "rtl" && (e.key === "ArrowRight" || e.key === "ArrowLeft")) step = -step;
      onSet(Math.max(0, Math.min(100, pct + step)));
    });
    return bar;
  }
  // an entry's %: its own, or (marked before there was a %) from its result
  function wpEntryPct(entry) {
    if (typeof entry.progress === "number") return entry.progress;
    return entry.result === "done" ? 100 : entry.result === "partial" ? 50 : 0;
  }
  function wpPctResult(pct) { return pct >= 100 ? "done" : pct > 0 ? "partial" : "not"; }

  function setSiteLogPlanPct(sheet, dateISO, item, pct) {
    var log = findOrCreateSiteLog(sheet, dateISO);
    if (!Array.isArray(log.planned)) log.planned = [];
    var entry = log.planned.find(function (e) { return e.itemId === item.id; });
    if (!entry) {
      entry = { itemId: item.id, name: item.name, by: item.by || "", reason: "" };
      log.planned.push(entry);
    }
    entry.progress = pct;
    entry.result = wpPctResult(pct);
    // the plan follows: its % and state (a day's 0% leaves it as it is)
    var live = !item.gone && (sheet.workPlan || []).find(function (x) { return x.id === item.id; });
    if (live && pct > 0) {
      var status = pct >= 100 ? "done" : "prog";
      var was = live.status === "done" ? 100 : live.progress || 0;
      if (live.status !== status || was !== pct) {
        saveWorkPlanItem(sheet, Object.assign({}, live, {
          status: status,
          progress: pct,
          updatedBy: myPhoneNumber || null,
          updatedAt: Date.now()
        }), false);
      }
    }
    saveData();
  }
  // the day's entry for an activity, if it was marked
  function wpDayEntry(sheet, dateISO, itemId) {
    var log = findSiteLog(sheet, dateISO);
    return log && (log.planned || []).find(function (e) { return e.itemId === itemId; }) || null;
  }
  // ✕: the day's mark goes (the plan stays as it is)
  function clearSiteLogPlanEntry(sheet, dateISO, item) {
    var log = findSiteLog(sheet, dateISO);
    if (log && Array.isArray(log.planned)) log.planned = log.planned.filter(function (e) { return e.itemId !== item.id; });
    saveData();
    renderSiteLogPlanList();
  }

  function openSiteLogPlanView() {
    document.getElementById("siteLogPlanProjectName").textContent = activeSheet().name + " · " + isoToFullDisplay(activeSiteLogDate);
    renderSiteLogPlanList();
    diaryView.hidden = true;
    siteLogPlanView.hidden = false;
  }
  function closeSiteLogPlanView() {
    siteLogPlanView.hidden = true;
    diaryView.hidden = false;
    render();
  }
  document.getElementById("siteLogPlanBtn").addEventListener("click", openSiteLogPlanView);
  document.getElementById("siteLogPlanBackBtn").addEventListener("click", closeSiteLogPlanView);

  function wpResultLabel(result, entry) {
    var r = WP_RESULTS.find(function (x) { return x.key === result; });
    if (!r) return "";
    return r.mark + " " + tr(r.label) + (entry && typeof entry.progress === "number" && result === "partial" ? " " + entry.progress + "%" : "");
  }

  // The diary PDF's "מתוכנן מול ביצוע" table.
  function appendPlannedPdfSection(doc, log) {
    var entries = (log && log.planned) || [];
    if (!entries.length) return;
    doc.appendChild(wpEl("div", "pdf-doc-section-heading", tr("workPlanPlannedVsDone")));
    var table = wpEl("table", "pdf-doc-table");
    var headRow = wpEl("tr");
    ["workPlanActivity", "workPlanBy", "workPlanResult", "workPlanReason"].forEach(function (k) {
      headRow.appendChild(wpEl("th", "", tr(k)));
    });
    var thead = wpEl("thead");
    thead.appendChild(headRow);
    table.appendChild(thead);
    var tbody = wpEl("tbody");
    entries.forEach(function (e) {
      var tr_ = wpEl("tr");
      tr_.appendChild(wpEl("td", "", e.name));
      tr_.appendChild(wpEl("td", "", e.by || ""));
      tr_.appendChild(wpEl("td", "wp-pdf-result-" + e.result, wpResultLabel(e.result, e)));
      tr_.appendChild(wpEl("td", "", e.reason || ""));
      tbody.appendChild(tr_);
    });
    table.appendChild(tbody);
    doc.appendChild(table);
  }

  // The periodic report's summary page: how much of the plan got done,
  // and the reasons for what didn't.
  function buildPlannedSummaryElement(sheet, logs, from, to) {
    var entries = [].concat.apply([], logs.map(function (l) { return l.planned || []; }));
    if (!entries.length) return null;
    var count = function (r) { return entries.filter(function (e) { return e.result === r; }).length; };
    var doc = wpEl("div", "pdf-doc");
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";
    doc.appendChild(buildPdfDocTitleElement(sheet, sheet.name));
    doc.appendChild(wpEl("div", "pdf-doc-info-title", tr("workPlanPlannedVsDone")));
    doc.appendChild(wpEl("div", "pdf-doc-info-date", isoToFullDisplay(from) + " – " + isoToFullDisplay(to)));
    doc.appendChild(wpEl("div", "wp-pdf-summary", tr("workPlanSummaryLine")
      .replace("{n}", entries.length).replace("{done}", count("done"))
      .replace("{partial}", count("partial")).replace("{not}", count("not"))));
    var reasons = {};
    entries.forEach(function (e) {
      if (e.result === "done" || !e.reason) return;
      var key = e.reason.trim();
      reasons[key] = (reasons[key] || 0) + 1;
    });
    var keys = Object.keys(reasons).sort(function (a, b) { return reasons[b] - reasons[a]; });
    if (keys.length) {
      doc.appendChild(wpEl("div", "pdf-doc-section-heading", tr("workPlanReasons")));
      var table = wpEl("table", "pdf-doc-table");
      keys.forEach(function (k) {
        var row = wpEl("tr");
        row.appendChild(wpEl("td", "", k));
        row.appendChild(wpEl("td", "", String(reasons[k])));
        table.appendChild(row);
      });
      doc.appendChild(table);
    }
    return doc;
  }

  // ---- copying a week, postponing ----------------------------------------
  var wpCopyWeekBtn = document.getElementById("workPlanCopyWeekBtn");
  wpCopyWeekBtn.addEventListener("click", function () {
    var groups = wpGroups();
    var range = wpRange(groups);
    var weekEnd = addDaysToISO(range.start, 6);
    var toCopy = [];
    groups.forEach(function (g) {
      g.items.forEach(function (item) {
        if (item.start <= weekEnd && item.end >= range.start) toCopy.push({ sheet: g.sheet, item: item });
      });
    });
    if (!toCopy.length) { showToast(tr("workPlanNothingToCopy")); return; }
    askConfirm(tr("workPlanCopyWeekConfirm").replace("{n}", toCopy.length), function () {
      toCopy.forEach(function (c) {
        saveWorkPlanItem(c.sheet, Object.assign({}, c.item, {
          id: uid(), start: addDaysToISO(c.item.start, 7), end: addDaysToISO(c.item.end, 7),
          status: "todo", progress: 0, after: null, links: [], updatedBy: myPhoneNumber || null, updatedAt: Date.now()
        }), false);
      });
      wpState.anchor = addDaysToISO(wpState.anchor, 7);
      renderWorkPlan();
      showToast(tr("workPlanCopiedMsg").replace("{n}", toCopy.length));
    });
  });

  // Moves activities by `days`, keeping each one's length.
  function wpShift(item, days) {
    return Object.assign({}, item, {
      start: addDaysToISO(item.start, days), end: addDaysToISO(item.end, days),
      updatedBy: myPhoneNumber || null, updatedAt: Date.now()
    });
  }

  var wpPostponeRow = document.getElementById("wpPostponeRow");
  var wpPostponeDays = document.getElementById("wpPostponeDays");
  var wpPostponeFollowing = document.getElementById("wpPostponeFollowing");
  document.getElementById("wpPostponeBtn").addEventListener("click", function () {
    wpPostponeRow.hidden = !wpPostponeRow.hidden;
    if (!wpPostponeRow.hidden) wpPostponeDays.focus();
  });
  document.getElementById("wpPostponeApplyBtn").addEventListener("click", function () {
    if (!wpEditing) return;
    var days = parseInt(wpPostponeDays.value, 10);
    if (!days) return;
    var sheet = allSheets().find(function (s) { return s.id === wpEditing.sheetId; });
    if (!sheet) return;
    var original = (sheet.workPlan || []).find(function (x) { return x.id === wpEditing.item.id; });
    var fromStart = original ? original.start : wpStart.value;
    // the form shows the new dates; saving keeps whatever else was edited
    wpStart.value = addDaysToISO(wpStart.value, days);
    wpEnd.value = addDaysToISO(wpEnd.value || wpStart.value, days);
    if (wpPostponeFollowing.checked && original) {
      (sheet.workPlan || []).forEach(function (x) {
        if (x.id === original.id || x.status === "done" || x.start < fromStart) return;
        saveWorkPlanItem(sheet, wpShift(x, days), false);
      });
    }
    wpPostponeRow.hidden = true;
    document.getElementById("workPlanEditForm").requestSubmit();
  });

  // ---- "starts after" ------------------------------------------------------
  var wpAfter = document.getElementById("wpAfter");
  function wpFillAfterOptions(sheet, item) {
    wpAfter.innerHTML = "";
    var none = document.createElement("option");
    none.value = "";
    none.textContent = tr("workPlanAfterNone");
    wpAfter.appendChild(none);
    wpSorted(sheet ? sheet.workPlan : []).forEach(function (x) {
      if (x.id === item.id) return;
      var o = document.createElement("option");
      o.value = x.id;
      o.textContent = x.name;
      wpAfter.appendChild(o);
    });
    wpAfter.value = item.after || "";
  }
  wpAfter.addEventListener("change", function () {
    // a dependency picks the start: the day after the one it follows
    var sheet = wpEditing && allSheets().find(function (s) { return s.id === wpEditing.sheetId; });
    var pred = sheet && (sheet.workPlan || []).find(function (x) { return x.id === wpAfter.value; });
    if (!pred) return;
    var len = Math.max(0, wpDiff(wpStart.value, wpEnd.value || wpStart.value));
    var start = addDaysToISO(pred.end, 1);
    if (wpStart.value < start) {
      wpStart.value = start;
      wpEnd.value = addDaysToISO(start, len);
    }
  });

  // ---- links between activities ------------------------------------------
  // An activity's links: [{ from (the other activity's id), type, lag
  // (days; negative = overlap) }], kept on the activity they constrain.
  //   FS סיום-התחלה: starts after `from` ends      SS התחלה-התחלה: starts with it
  //   FF סיום-סיום:  ends with it                    SF התחלה-סיום: ends once it starts
  // "מתחילה אחרי" (item.after) is an FS link without a lag.
  var WP_LINK_TYPES = ["FS", "SS", "FF", "SF"];
  function wpLinksOf(item) {
    var out = (item.links || []).slice();
    if (item.after && !out.some(function (l) { return l.from === item.after && l.type === "FS"; })) {
      out.push({ from: item.after, type: "FS", lag: 0 });
    }
    return out;
  }
  // How many days `s` must move later for the link from `p` to hold (0: it does).
  function wpLinkShift(s, p, link) {
    var lag = link.lag || 0;
    var need = link.type === "SS" ? wpDiff(s.start, addDaysToISO(p.start, lag)) :
      link.type === "FF" ? wpDiff(s.end, addDaysToISO(p.end, lag)) :
      link.type === "SF" ? wpDiff(s.end, addDaysToISO(p.start, lag)) :
      wpDiff(s.start, addDaysToISO(p.end, 1 + lag));
    return need > 0 ? need : 0;
  }

  // After an activity is saved: the ones linked to it that no longer fit
  // their link are offered to move along (and theirs after them).
  function wpCascadeDependents(sheet, item) {
    var moves = {};
    var order = [];
    var byId = {};
    (sheet.workPlan || []).forEach(function (x) { byId[x.id] = Object.assign({}, x); });
    byId[item.id] = item;
    var queue = [item.id];
    var guard = 0;
    while (queue.length && guard++ < 500) {
      var pred = byId[queue.shift()];
      Object.keys(byId).forEach(function (id) {
        var x = byId[id];
        if (x.status === "done") return;
        wpLinksOf(x).forEach(function (link) {
          if (link.from !== pred.id) return;
          var days = wpLinkShift(byId[id], pred, link);
          if (!days) return;
          byId[id] = wpShift(byId[id], days);
          if (!moves[id]) order.push(id);
          moves[id] = byId[id];
          queue.push(id);
        });
      });
    }
    if (!order.length) return;
    askConfirm(tr("workPlanCascadeConfirm").replace("{name}", item.name)
      .replace("{list}", order.map(function (id) { return moves[id].name; }).join(", ")), function () {
      order.forEach(function (id) { saveWorkPlanItem(sheet, moves[id], false); });
      renderWorkPlan();
    });
  }

  // Clearly different from each other and from the bars' own colours.
  var WP_LINK_COLORS = ["#7b3fa0", "#0f7c86", "#d4881a", "#c2185b", "#2e4fb8", "#6b8e23", "#8d5524", "#e0457b"];

  // Arrows for every link, from the right end of one bar to the right end
  // of the other (RTL: a bar's start is its right edge, its end the left).
  function wpDrawDependencies(host, groups) {
    var old = host.querySelector(".wp-deps");
    if (old) old.remove();
    var bars = {};
    host.querySelectorAll(".wp-bar[data-id]").forEach(function (b) { bars[b.getAttribute("data-id")] = b; });
    var hostBox = host.getBoundingClientRect();
    var ox = host.scrollLeft - hostBox.left, oy = host.scrollTop - hostBox.top;
    // Each line gets its own lane: lines into the same bar edge come in
    // at different heights, and a vertical (or a horizontal in a gap)
    // that would lie on another line's moves aside until it's clear.
    var lines = [];
    var verticals = [], horizontals = [];
    var intoEdge = {};
    function overlaps(a0, a1, b0, b1) { return Math.min(a0, a1) < Math.max(b0, b1) && Math.min(b0, b1) < Math.max(a0, a1); }
    function freeX(x, y0, y1, step) {
      for (var n = 0; n < 12; n++) {
        var hit = verticals.some(function (v) { return Math.abs(v.x - x) < 4 && overlaps(y0, y1, v.y0, v.y1); });
        if (!hit) break;
        x += step;
      }
      verticals.push({ x: x, y0: y0, y1: y1 });
      return x;
    }
    function freeY(y, x0, x1, step) {
      for (var n = 0; n < 8; n++) {
        var hit = horizontals.some(function (h) { return Math.abs(h.y - y) < 4 && overlaps(x0, x1, h.x0, h.x1); });
        if (!hit) break;
        y += step;
      }
      horizontals.push({ y: y, x0: x0, x1: x1 });
      return y;
    }
    (groups || []).forEach(function (g) {
      g.items.forEach(function (item) {
        var d = bars[item.id];
        if (!d) return;
        wpLinksOf(item).forEach(function (link) {
          var pb = bars[link.from];
          if (!pb) return;
          var p = pb.getBoundingClientRect(), s = d.getBoundingClientRect();
          var fromStart = link.type === "SS" || link.type === "SF";
          var toStart = link.type === "FS" || link.type === "SS";
          var down = s.top >= p.bottom;
          var dir = toStart ? 1 : -1; // which side of the target edge is "outside"
          // into the same edge: each further line a little lower in the
          // coloured part of the bar
          var edgeKey = item.id + (toStart ? ":s" : ":e");
          var k = intoEdge[edgeKey] = (intoEdge[edgeKey] || 0) + 1;
          var x2 = (toStart ? s.right : s.left) + ox;
          var y2 = s.top + 17 + (k - 1) * 6 + oy;
          if (y2 > s.bottom - 3 + oy) y2 = s.bottom - 3 + oy;
          var y1 = (down ? p.bottom : p.top) + oy;
          // leaves from under (over) the first bar near its end or start,
          // stepping inward along the bar while another line is there
          var x1 = freeX((fromStart ? p.right - 5 : p.left + 5) + ox, y1, y2, fromStart ? -5 : 5);
          var path;
          if ((x1 - x2) * dir > 10) {
            freeY(y2, x1, x2, 0);
            path = "M" + x1 + "," + y1 + " V" + y2 + " H" + (x2 + 2 * dir);
          } else {
            // the edge faces away: round it through the gap above/below it
            var yGap = freeY((down ? s.top - 4 : s.bottom + 4) + oy, x1, x2 + 12 * dir, down ? -4 : 4);
            var xTurn = freeX(x2 + (12 + (k - 1) * 5) * dir, yGap, y2, 5 * dir);
            path = "M" + x1 + "," + y1 + " V" + yGap + " H" + xTurn + " V" + y2 + " H" + (x2 + 2 * dir);
          }
          lines.push(path);
        });
      });
    });
    if (!lines.length) return;
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "wp-deps");
    svg.setAttribute("width", host.scrollWidth);
    svg.setAttribute("height", host.scrollHeight);
    // each link its own colour (and matching head), so crossing or
    // overlapping lines can be told apart
    var colors = lines.map(function (d, i) { return WP_LINK_COLORS[i % WP_LINK_COLORS.length]; });
    // a white outline under each line keeps it clear of the bars and grid
    svg.innerHTML = "<defs>" + WP_LINK_COLORS.map(function (c, i) {
      return '<marker id="wpArrow' + i + '" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L5,2.5 L0,5 z" fill="' + c + '"/></marker>';
    }).join("") + "</defs>" + lines.map(function (d) {
      return '<path d="' + d + '" fill="none" stroke="#fff" stroke-width="4.5" stroke-linejoin="round" opacity="0.9"/>';
    }).join("") + lines.map(function (d, i) {
      return '<path d="' + d + '" fill="none" stroke="' + colors[i] + '" stroke-width="2" stroke-linejoin="round" marker-end="url(#wpArrow' + (i % WP_LINK_COLORS.length) + ')"/>';
    }).join("");
    host.appendChild(svg);
  }

  // Linking on the chart: a long press on an activity's bar makes it blink,
  // a tap on another activity of the same project then asks how to link them.
  var wpLinkFrom = null; // { sheetId, itemId }
  // the tap that ends a long press isn't a tap on its own
  var wpLinkSuppress = null; // { itemId, until }
  function wpBindBarLongPress(bar, sheet, item) {
    var timer = null, x0 = 0, y0 = 0, fired = false;
    var cancel = function () { clearTimeout(timer); timer = null; };
    bar.addEventListener("pointerdown", function (e) {
      x0 = e.clientX; y0 = e.clientY;
      fired = false;
      cancel();
      timer = setTimeout(function () {
        timer = null;
        fired = true;
        wpLinkFrom = { sheetId: sheet.id, itemId: item.id };
        workPlanChart.querySelectorAll(".wp-linking").forEach(function (b) { b.classList.remove("wp-linking"); });
        bar.classList.add("wp-linking");
        if (navigator.vibrate) { try { navigator.vibrate(30); } catch (err) {} }
        showToast(tr("workPlanLinkHint").replace("{name}", item.name), 3500);
      }, 600);
    });
    bar.addEventListener("pointerup", function () {
      if (fired) wpLinkSuppress = { itemId: item.id, until: Date.now() + 400 };
    });
    bar.addEventListener("pointermove", function (e) {
      if (Math.abs(e.clientX - x0) > 10 || Math.abs(e.clientY - y0) > 10) cancel();
    });
    bar.addEventListener("pointerup", cancel);
    bar.addEventListener("pointercancel", cancel);
    bar.addEventListener("pointerleave", cancel);
    bar.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  }
  function wpRowTapped(sheet, item) {
    var sup = wpLinkSuppress;
    wpLinkSuppress = null;
    if (sup && sup.itemId === item.id && Date.now() < sup.until) return;
    if (!wpLinkFrom) { openWorkPlanEditor(sheet, item); return; }
    var from = wpLinkFrom;
    wpLinkFrom = null;
    renderWorkPlan();
    if (from.itemId === item.id) return; // tapped itself: cancelled
    if (from.sheetId !== sheet.id) { showToast(tr("workPlanLinkSameProject")); return; }
    var pred = (sheet.workPlan || []).find(function (x) { return x.id === from.itemId; });
    if (pred) openWorkPlanLinkDialog(sheet, pred, item);
  }

  var wpLinkOverlay = document.getElementById("workPlanLinkOverlay");
  var wpLinkLag = document.getElementById("wpLinkLag");
  var wpLinkTarget = null; // { sheet, pred, succ }
  function wpLinkTypeText(type, pred, succ) {
    return tr("workPlanLink" + type + "Desc").replace("{a}", pred.name).replace("{b}", succ.name);
  }
  function openWorkPlanLinkDialog(sheet, pred, succ) {
    wpLinkTarget = { sheet: sheet, pred: pred, succ: succ };
    document.getElementById("wpLinkPair").textContent = pred.name + (RTL_LANGS[currentLang] ? "  ←  " : "  →  ") + succ.name;
    // the "now tap another activity" hint has done its job
    var toast = document.getElementById("appToast");
    if (toast) toast.classList.remove("app-toast-visible");
    var existing = wpLinksOf(succ).find(function (l) { return l.from === pred.id; });
    var list = document.getElementById("wpLinkTypes");
    list.innerHTML = "";
    WP_LINK_TYPES.forEach(function (type) {
      var label = wpEl("label", "wp-link-type");
      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "wpLinkType";
      radio.value = type;
      radio.checked = existing ? existing.type === type : type === "FS";
      label.appendChild(radio);
      var text = wpEl("span", "");
      text.appendChild(wpEl("b", "", tr("workPlanLink" + type)));
      text.appendChild(wpEl("small", "", wpLinkTypeText(type, pred, succ)));
      label.appendChild(text);
      list.appendChild(label);
    });
    wpLinkLag.value = String(existing ? existing.lag || 0 : 0);
    document.getElementById("wpLinkRemoveBtn").hidden = !existing;
    wpLinkOverlay.hidden = false;
  }
  function closeWorkPlanLinkDialog() {
    wpLinkOverlay.hidden = true;
    wpLinkTarget = null;
  }
  // Would linking succ after pred loop back (pred already follows succ)?
  function wpLinkMakesCycle(sheet, predId, succId) {
    var seen = {}, stack = [predId];
    var byId = {};
    (sheet.workPlan || []).forEach(function (x) { byId[x.id] = x; });
    while (stack.length) {
      var id = stack.pop();
      if (id === succId) return true;
      if (seen[id] || !byId[id]) continue;
      seen[id] = true;
      wpLinksOf(byId[id]).forEach(function (l) { stack.push(l.from); });
    }
    return false;
  }
  function wpWithoutLinkFrom(item, predId) {
    var next = Object.assign({}, item, {
      links: wpLinksOf(item).filter(function (l) { return l.from !== predId; })
    });
    next.after = null; // folded into links from now on
    return next;
  }
  document.getElementById("wpLinkSaveBtn").addEventListener("click", function () {
    if (!wpLinkTarget) return;
    var t = wpLinkTarget;
    var checked = document.querySelector("input[name=wpLinkType]:checked");
    var type = checked ? checked.value : "FS";
    if (wpLinkMakesCycle(t.sheet, t.pred.id, t.succ.id)) { alert(tr("workPlanLinkCycle")); return; }
    var link = { from: t.pred.id, type: type, lag: parseInt(wpLinkLag.value, 10) || 0 };
    var succ = wpWithoutLinkFrom(t.succ, t.pred.id);
    succ.links.push(link);
    succ.updatedBy = myPhoneNumber || null;
    succ.updatedAt = Date.now();
    var days = succ.status === "done" ? 0 : wpLinkShift(succ, t.pred, link);
    if (days) succ = wpShift(succ, days);
    saveWorkPlanItem(t.sheet, succ, false);
    closeWorkPlanLinkDialog();
    renderWorkPlan();
    if (days) showToast(tr("workPlanLinkMoved").replace("{name}", succ.name).replace("{n}", days), 3500);
    wpCascadeDependents(t.sheet, succ);
  });
  document.getElementById("wpLinkRemoveBtn").addEventListener("click", function () {
    if (!wpLinkTarget) return;
    var t = wpLinkTarget;
    saveWorkPlanItem(t.sheet, Object.assign(wpWithoutLinkFrom(t.succ, t.pred.id), { updatedAt: Date.now() }), false);
    closeWorkPlanLinkDialog();
    renderWorkPlan();
  });
  document.getElementById("wpLinkCancelBtn").addEventListener("click", closeWorkPlanLinkDialog);

  // The editor lists the activity's links, each removable.
  function wpRenderLinksList(sheet, item) {
    var box = document.getElementById("wpLinksList");
    box.innerHTML = "";
    var links = (item.links || []);
    box.hidden = !links.length;
    if (!links.length) return;
    box.appendChild(wpEl("label", "", tr("workPlanLinks")));
    links.forEach(function (link) {
      var pred = sheet && (sheet.workPlan || []).find(function (x) { return x.id === link.from; });
      if (!pred) return;
      var row = wpEl("div", "wp-link-row");
      row.appendChild(wpEl("span", "", wpLinkTypeText(link.type, pred, item) +
        (link.lag ? " (" + (link.lag > 0 ? "+" : "") + link.lag + " " + tr("workPlanDays") + ")" : "")));
      var del = wpEl("button", "voice-item-del", "✕");
      del.type = "button";
      del.title = tr("deleteBtn");
      del.addEventListener("click", function () {
        item.links = item.links.filter(function (l) { return l !== link; });
        wpRenderLinksList(sheet, item);
      });
      row.appendChild(del);
      box.appendChild(row);
    });
  }

  // ---- notices ------------------------------------------------------------
  // Quiet phone notifications (ItaskAlarm alarms with quiet:true - app
  // version 22+, which says so through features()): the morning after an
  // activity should have ended and isn't done, and the afternoon before one
  // starts. Head Office gets one morning summary instead of each project's.
  var WP_NOTIFY_LATE_KEY = "itask-plan-notify-late";
  var WP_NOTIFY_START_KEY = "itask-plan-notify-start";
  function wpNotifyOn(key) {
    try { return localStorage.getItem(key) !== "off"; } catch (e) { return true; }
  }
  var wpQuietAlarmsSupported = null; // unknown until features() answers
  if (nativeTaskAlarmPlugin && nativeTaskAlarmPlugin.features) {
    nativeTaskAlarmPlugin.features().then(function (f) {
      wpQuietAlarmsSupported = !!(f && f.quietAlarms);
      if (wpQuietAlarmsSupported) { lastNativeTaskAlarmsJson = null; syncNativeTaskAlarms(); }
    }, function () { wpQuietAlarmsSupported = false; });
  }
  function wpAt(dateISO, hour) {
    var d = wpDate(dateISO);
    d.setHours(hour, 0, 0, 0);
    return d.getTime();
  }
  function workPlanNativeAlarms() {
    if (!wpQuietAlarmsSupported) return [];
    var now = Date.now();
    var alarms = [];
    var late = wpNotifyOn(WP_NOTIFY_LATE_KEY), soon = wpNotifyOn(WP_NOTIFY_START_KEY);
    var officeSheets = isHeadOfficeMode ? officeReportSheets().map(function (s) { return s.id; }) : [];
    allSheets().forEach(function (sheet) {
      if (sheet.ended || sheet.id === HEAD_OFFICE_SHEET_ID) return;
      var summarised = officeSheets.indexOf(sheet.id) !== -1;
      (sheet.workPlan || []).forEach(function (item) {
        if (item.status === "done") return;
        var title = tr("workPlanTitle") + " – " + sheet.name;
        var lateAt = wpAt(addDaysToISO(item.end, 1), 8);
        if (late && !summarised && lateAt > now) {
          alarms.push({ id: "plan-late:" + sheet.id + ":" + item.id, title: title, quiet: true, at: lateAt,
            body: tr("workPlanNoticeLate").replace("{name}", item.name).replace("{date}", isoToDisplay(item.end)) });
        }
        var startAt = wpAt(addDaysToISO(item.start, -1), 16);
        if (soon && item.status === "todo" && startAt > now) {
          alarms.push({ id: "plan-start:" + sheet.id + ":" + item.id, title: title, quiet: true, at: startAt,
            body: tr("workPlanNoticeStart").replace("{name}", item.name + (item.by ? ", " + item.by : "")) });
        }
      });
    });
    if (late && officeSheets.length) {
      // the next 08:00, counting what will be late by then
      var next = new Date();
      if (next.getHours() >= 8) next.setDate(next.getDate() + 1);
      var nextISO = wpIso(next);
      var lateItems = 0, lateProjects = 0;
      officeReportSheets().forEach(function (s) {
        var n = (s.workPlan || []).filter(function (x) { return x.status !== "done" && x.end < nextISO; }).length;
        lateItems += n;
        if (n) lateProjects++;
      });
      if (lateItems) {
        alarms.push({ id: "plan-office:" + nextISO, title: tr("workPlanOfficeTitle"), quiet: true, at: wpAt(nextISO, 8),
          body: tr("workPlanLateBannerOffice").replace("{n}", lateItems).replace("{p}", lateProjects) });
      }
    }
    return alarms;
  }

  // In the app itself (web and phone alike): once a day, a note when
  // activities are late.
  var WP_LATE_TOAST_KEY = "itask-plan-late-toast";
  function maybeShowWorkPlanLateToast() {
    if (!wpNotifyOn(WP_NOTIFY_LATE_KEY) || dataLoadBlocked) return;
    var today = todayISO();
    try { if (localStorage.getItem(WP_LATE_TOAST_KEY) === today) return; } catch (e) { return; }
    var n = 0;
    allSheets().forEach(function (s) {
      if (s.ended || s.id === HEAD_OFFICE_SHEET_ID) return;
      n += (s.workPlan || []).filter(wpIsLate).length;
    });
    if (!n) return;
    try { localStorage.setItem(WP_LATE_TOAST_KEY, today); } catch (e) {}
    showToast("⚠ " + tr("workPlanLateBanner").replace("{n}", n), 4000);
  }

  // ---- settings: the two notice switches --------------------------------
  [["wpNotifyLateToggle", WP_NOTIFY_LATE_KEY], ["wpNotifyStartToggle", WP_NOTIFY_START_KEY]].forEach(function (pair) {
    var el = document.getElementById(pair[0]);
    if (!el) return;
    el.checked = wpNotifyOn(pair[1]);
    el.addEventListener("change", function () {
      try { localStorage.setItem(pair[1], el.checked ? "on" : "off"); } catch (e) {}
      lastNativeTaskAlarmsJson = null;
      syncNativeTaskAlarms();
    });
  });

  // ---------------------------------------------------------------------
  // ערסל: one level of grouping in a project's work plan (by area, trade,
  // anything). Kept in the project's data as workHammocks: [{ id, name,
  // color }]; an activity joins one through its own `hammock` (an id).
  // No button of its own: a hammock is made from the activity's settings
  // ("＋ ערסל חדש…") or by a long press on the activity's name in the chart,
  // and one with no activities left is dropped on the next save. In the
  // chart its row folds open / shut, and its bar runs from its earliest
  // start to its latest end with the done part weighted by each
  // activity's length; a long press on it renames it / changes its colour.
  // ---------------------------------------------------------------------
  var WP_HAMMOCK_COLORS = ["#2e4fb8", "#2e7d32", "#c05023", "#7b3fa0", "#00838f", "#b8860b"];
  var wpHammockSelect = document.getElementById("wpHammock");
  var wpHammockMenuOverlay = document.getElementById("wpHammockMenuOverlay");
  var wpHammockEditOverlay = document.getElementById("wpHammockEditOverlay");
  var wpHammockNameInput = document.getElementById("wpHammockName");
  var wpHammockEditing = null; // { hammock (a copy), done(hammock|null) }

  // the project's hammocks that have activities, earliest first, each
  // with its activities: [{ h, items }]
  function wpHammockGroups(sheet, items) {
    var out = [];
    (sheet.workHammocks || []).forEach(function (h) {
      var own = items.filter(function (x) { return x.hammock === h.id; });
      if (own.length) out.push({ h: h, items: own });
    });
    var first = function (g) { return g.items.reduce(function (m, x) { return x.start < m ? x.start : m; }, g.items[0].start); };
    return out.sort(function (a, b) { return first(a).localeCompare(first(b)); });
  }
  // a hammock's span and how much of it is done (weighted by length)
  function wpHammockSummary(items) {
    var start = items[0].start, end = items[0].end, done = 0, total = 0;
    items.forEach(function (x) {
      if (x.start < start) start = x.start;
      if (x.end > end) end = x.end;
      var days = wpDiff(x.start, x.end) + 1;
      total += days;
      done += days * (x.status === "done" ? 100 : x.progress || 0);
    });
    return {
      start: start, end: end,
      progress: total ? Math.round(done / total) : 0,
      late: items.some(wpIsLate),
      allDone: items.every(function (x) { return x.status === "done"; })
    };
  }
  function wpNextHammockColor(sheet) {
    var used = (sheet.workHammocks || []).map(function (h) { return h.color; });
    return WP_HAMMOCK_COLORS.find(function (c) { return used.indexOf(c) < 0; }) || WP_HAMMOCK_COLORS[(sheet.workHammocks || []).length % WP_HAMMOCK_COLORS.length];
  }

  // A long press (600ms, still) on an element; returns nothing - `fn` runs
  // and the click that ends the press is swallowed by `onFired`.
  function wpBindLongPress(el, fn, onFired) {
    var timer = null, x0 = 0, y0 = 0;
    var cancel = function () { clearTimeout(timer); timer = null; };
    el.addEventListener("pointerdown", function (e) {
      x0 = e.clientX; y0 = e.clientY;
      cancel();
      timer = setTimeout(function () {
        timer = null;
        onFired();
        if (navigator.vibrate) { try { navigator.vibrate(30); } catch (err) {} }
        fn();
      }, 600);
    });
    el.addEventListener("pointermove", function (e) {
      if (Math.abs(e.clientX - x0) > 10 || Math.abs(e.clientY - y0) > 10) cancel();
    });
    el.addEventListener("pointerup", cancel);
    el.addEventListener("pointercancel", cancel);
    el.addEventListener("pointerleave", cancel);
    el.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  }

  // ---- the chart rows ------------------------------------------------------
  // draws a group's activities, under their hammocks when it has any
  function wpBuildHammockRows(host, g, range, dayW, forPdf, track, drawItem) {
    var groups = wpHammockGroups(g.sheet, g.items);
    if (!groups.length) { g.items.forEach(function (item) { drawItem(item, null); }); return; }
    groups.forEach(function (hg) {
      var h = hg.h, sum = wpHammockSummary(hg.items);
      var key = "h:" + h.id, collapsed = !forPdf && wpState.collapsed[key];
      var row = wpEl("div", "wp-row wp-hammock-row");
      row.setAttribute("data-hammock", h.id);
      var name = wpEl("div", "wp-name wp-hammock-name");
      name.style.borderRightColor = h.color;
      name.appendChild(wpEl("span", "wp-name-text", (forPdf ? "" : collapsed ? "◂ " : "▾ ") + h.name));
      name.appendChild(wpEl("small", "", tr("workPlanHammockCount").replace("{n}", hg.items.length)));
      row.appendChild(name);
      var t = track();
      var from = Math.max(0, wpDiff(range.start, sum.start));
      var to = Math.min(range.days - 1, wpDiff(range.start, sum.end));
      if (to >= 0 && from <= range.days - 1) {
        var bar = wpEl("div", "wp-hbar" + (sum.late ? " wp-hbar-late" : ""));
        var w = Math.max(6, (to - from + 1) * dayW - 2);
        bar.style.right = (from * dayW + 1) + "px";
        bar.style.width = w + "px";
        bar.style.setProperty("--hc", h.color);
        var fill = wpEl("span", "wp-hbar-fill");
        fill.style.width = (sum.allDone ? 100 : sum.progress) + "%";
        bar.appendChild(fill);
        if (w >= 30) bar.appendChild(wpEl("span", "wp-hbar-text", (sum.allDone ? 100 : sum.progress) + "%"));
        t.appendChild(bar);
      }
      row.appendChild(t);
      if (!forPdf) {
        var fired = 0;
        wpBindLongPress(row, function () { openWpHammockEdit(g.sheet, h); }, function () { fired = Date.now(); });
        row.addEventListener("click", function () {
          if (Date.now() - fired < 800) return;
          wpState.collapsed[key] = !wpState.collapsed[key];
          renderWorkPlan();
        });
      }
      host.appendChild(row);
      if (!collapsed) hg.items.forEach(function (item) { drawItem(item, h); });
    });
    var ids = groups.map(function (hg) { return hg.h.id; });
    var loose = g.items.filter(function (x) { return ids.indexOf(x.hammock) < 0; });
    if (loose.length) {
      host.appendChild(wpEl("div", "wp-hammock-none", tr("workPlanNoHammock")));
      loose.forEach(function (item) { drawItem(item, null); });
    }
  }
  // the activity's name: a long press assigns it to a hammock
  function wpBindNameLongPress(nameEl, sheet, item) {
    wpBindLongPress(nameEl, function () { openWpHammockMenu(sheet, item); }, function () {
      wpLinkSuppress = { itemId: item.id, until: Date.now() + 800 };
    });
  }

  // ---- assigning from the chart ---------------------------------------------------
  function openWpHammockMenu(sheet, item) {
    document.getElementById("wpHammockMenuTitle").textContent = tr("workPlanHammockMenuTitle").replace("{name}", item.name);
    var list = document.getElementById("wpHammockMenuList");
    list.innerHTML = "";
    var choose = function (hammockId, newHammock) {
      wpHammockMenuOverlay.hidden = true;
      if ((item.hammock || null) === (hammockId || null) && !newHammock) return;
      var copy = Object.assign({}, item, { hammock: hammockId || null, updatedBy: myPhoneNumber || null, updatedAt: Date.now() });
      saveWorkPlanItem(sheet, copy, false, newHammock || null);
      renderWorkPlan();
    };
    (sheet.workHammocks || []).forEach(function (h) {
      if (!(sheet.workPlan || []).some(function (x) { return x.hammock === h.id; })) return;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "wp-hammock-pick" + (item.hammock === h.id ? " on" : "");
      b.style.setProperty("--hc", h.color);
      b.textContent = (item.hammock === h.id ? "✓ " : "") + h.name;
      b.addEventListener("click", function () { choose(h.id); });
      list.appendChild(b);
    });
    var add = document.createElement("button");
    add.type = "button";
    add.textContent = tr("workPlanHammockNew");
    add.addEventListener("click", function () {
      wpHammockMenuOverlay.hidden = true;
      openWpHammockEdit(sheet, null, function (h) { if (h) choose(h.id, h); });
    });
    list.appendChild(add);
    if (item.hammock) {
      var none = document.createElement("button");
      none.type = "button";
      none.textContent = tr("workPlanNoHammockOption");
      none.addEventListener("click", function () { choose(null); });
      list.appendChild(none);
    }
    wpHammockMenuOverlay.hidden = false;
  }
  document.getElementById("wpHammockMenuCancelBtn").addEventListener("click", function () { wpHammockMenuOverlay.hidden = true; });

  // ---- naming / colouring a hammock ------------------------------------------------
  // hammock null = a new one; done(h) gets the saved copy (or null when
  // cancelled). An existing hammock is saved here; a new one is saved by
  // the caller together with the activity that joins it.
  function openWpHammockEdit(sheet, hammock, done) {
    var copy = hammock ? Object.assign({}, hammock) : { id: uid(), name: "", color: wpNextHammockColor(sheet) };
    wpHammockEditing = { sheet: sheet, hammock: copy, isNew: !hammock, done: done || null };
    document.getElementById("wpHammockEditTitle").textContent = tr(hammock ? "workPlanHammockEditTitle" : "workPlanHammockNewTitle");
    wpHammockNameInput.value = copy.name;
    wpHammockNameInput.placeholder = tr("workPlanHammockPlaceholder");
    wpRenderHammockColors();
    wpHammockEditOverlay.hidden = false;
    wpHammockNameInput.focus();
  }
  function wpRenderHammockColors() {
    var box = document.getElementById("wpHammockColors");
    box.innerHTML = "";
    WP_HAMMOCK_COLORS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "wp-hammock-color" + (wpHammockEditing.hammock.color === c ? " on" : "");
      b.style.background = c;
      b.setAttribute("data-color", c);
      b.addEventListener("click", function () { wpHammockEditing.hammock.color = c; wpRenderHammockColors(); });
      box.appendChild(b);
    });
  }
  function closeWpHammockEdit(saved) {
    var ed = wpHammockEditing;
    wpHammockEditing = null;
    wpHammockEditOverlay.hidden = true;
    if (ed && ed.done) ed.done(saved || null);
  }
  function wpSaveHammockEdit() {
    var ed = wpHammockEditing;
    if (!ed) return;
    var name = wpHammockNameInput.value.replace(/\s+/g, " ").trim();
    if (!name) { wpHammockNameInput.focus(); return; }
    ed.hammock.name = name;
    if (!ed.isNew) {
      saveWorkPlanItem(ed.sheet, null, false, ed.hammock);
      renderWorkPlan();
    }
    closeWpHammockEdit(ed.hammock);
  }
  document.getElementById("wpHammockEditOkBtn").addEventListener("click", wpSaveHammockEdit);
  document.getElementById("wpHammockEditCancelBtn").addEventListener("click", function () { closeWpHammockEdit(null); });
  wpHammockNameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); wpSaveHammockEdit(); }
  });

  // ---- the activity's settings: its hammock -------------------------------------------
  function wpFillHammocks(sheet, selected) {
    wpHammockSelect.innerHTML = "";
    var opt = function (value, text) {
      var o = document.createElement("option");
      o.value = value;
      o.textContent = text;
      wpHammockSelect.appendChild(o);
    };
    opt("", tr("workPlanNoHammockOption"));
    var hams = (sheet && sheet.workHammocks) || [];
    hams.forEach(function (h) {
      if (h.id === selected || (sheet.workPlan || []).some(function (x) { return x.hammock === h.id; })) opt(h.id, h.name);
    });
    if (wpEditing && wpEditing.newHammock) opt(wpEditing.newHammock.id, wpEditing.newHammock.name);
    opt("__new", tr("workPlanHammockNew"));
    wpHammockSelect.value = selected && Array.prototype.some.call(wpHammockSelect.options, function (o) { return o.value === selected; }) ? selected : "";
    wpHammockSelect.setAttribute("data-was", wpHammockSelect.value);
  }
  wpHammockSelect.addEventListener("change", function () {
    if (wpHammockSelect.value !== "__new") { wpHammockSelect.setAttribute("data-was", wpHammockSelect.value); return; }
    var was = wpHammockSelect.getAttribute("data-was") || "";
    var sheet = wpEditing && allSheets().find(function (s) { return s.id === wpEditing.sheetId; });
    if (!sheet) { wpHammockSelect.value = was; return; }
    openWpHammockEdit(sheet, null, function (h) {
      if (!wpEditing) return;
      if (!h) { wpHammockSelect.value = was; return; }
      wpEditing.newHammock = h;
      wpFillHammocks(sheet, h.id);
    });
  });

  // ---------------------------------------------------------------------
  // קו בסיס: a snapshot of a project's plan (each activity's start / end),
  // kept as workBaseline: { savedAt, savedBy, items: { id: { start, end } } }.
  // The chart draws it as a thin grey bar under each activity, and an
  // activity that has slipped past it says by how many days. "Excel" hands
  // the plan over as a spreadsheet (CSV), baseline and slip included.
  // ---------------------------------------------------------------------
  var wpBaselineOverlay = document.getElementById("wpBaselineOverlay");
  wpState.showBaseline = true;

  function wpBaselineOf(sheet, item) {
    var b = sheet && sheet.workBaseline;
    return b && b.items && b.items[item.id] || null;
  }
  // days the activity now ends after (+) / before (-) its baseline end
  function wpSlipDays(sheet, item) {
    var base = wpBaselineOf(sheet, item);
    return base ? wpDiff(base.end, item.end) : null;
  }
  // under an activity's bar: where it was planned
  function wpDrawBaselineBar(trackEl, sheet, item, range, dayW) {
    if (!wpState.showBaseline) return;
    var base = wpBaselineOf(sheet, item);
    if (!base) return;
    var from = Math.max(0, wpDiff(range.start, base.start));
    var to = Math.min(range.days - 1, wpDiff(range.start, base.end));
    if (to < 0 || from > range.days - 1) return;
    var bar = wpEl("div", "wp-base-bar" + (item.end > base.end ? " wp-base-late" : ""));
    bar.style.right = (from * dayW + 1) + "px";
    bar.style.width = Math.max(3, (to - from + 1) * dayW - 2) + "px";
    bar.title = tr("workPlanBaselineLegend") + ": " + isoToDisplay(base.start) + " – " + isoToDisplay(base.end);
    trackEl.appendChild(bar);
  }
  // beside the activity's name: "+3 ימים" when it has slipped
  function wpSlipLabel(nameEl, sheet, item) {
    if (!wpState.showBaseline) return;
    var slip = wpSlipDays(sheet, item);
    if (slip && slip > 0) nameEl.appendChild(wpEl("small", "wp-slip", tr("workPlanSlip").replace("{n}", slip)));
  }

  function saveWorkBaseline(sheet, baseline) {
    sheet.workBaseline = baseline;
    if (!sheet.shared) { saveData(); renderWorkPlan(); return; }
    renderWorkPlan();
    if (!supabaseClient) return;
    updateSharedSheetDataSafely(sheet.id, function (current) {
      return Object.assign({}, current, { workBaseline: baseline });
    }).then(function (newData) {
      var live = sharedSheets.find(function (s) { return s.id === sheet.id; });
      if (live) live.workBaseline = newData.workBaseline || null;
      refreshWorkPlanIfOpen();
    }, function () {
      alert(tr("workPlanSaveError"));
    });
  }
  function wpBaselineSheet() {
    return wpState.sheetId && allSheets().find(function (s) { return s.id === wpState.sheetId; });
  }
  function openWpBaseline() {
    var sheet = wpBaselineSheet();
    if (!sheet) return;
    var b = sheet.workBaseline;
    document.getElementById("wpBaselineText").textContent = b ?
      tr("workPlanBaselineSavedOn").replace("{date}", new Date(b.savedAt).toLocaleDateString(calLocale(), { day: "numeric", month: "numeric", year: "numeric" })) :
      tr("workPlanBaselineExplain");
    document.getElementById("wpBaselineSaveBtn").textContent = tr(b ? "workPlanBaselineUpdate" : "workPlanBaselineSave");
    var toggle = document.getElementById("wpBaselineToggleBtn");
    toggle.hidden = !b;
    toggle.textContent = tr(wpState.showBaseline ? "workPlanBaselineHide" : "workPlanBaselineShow");
    document.getElementById("wpBaselineDeleteBtn").hidden = !b;
    wpBaselineOverlay.hidden = false;
  }
  document.getElementById("workPlanBaselineBtn").addEventListener("click", openWpBaseline);
  document.getElementById("wpBaselineSaveBtn").addEventListener("click", function () {
    wpBaselineOverlay.hidden = true;
    var sheet = wpBaselineSheet();
    if (!sheet) return;
    var items = {};
    (sheet.workPlan || []).forEach(function (x) { items[x.id] = { start: x.start, end: x.end }; });
    wpState.showBaseline = true;
    saveWorkBaseline(sheet, { savedAt: Date.now(), savedBy: myPhoneNumber || null, items: items });
    showToast(tr("workPlanBaselineSavedMsg"));
  });
  document.getElementById("wpBaselineToggleBtn").addEventListener("click", function () {
    wpBaselineOverlay.hidden = true;
    wpState.showBaseline = !wpState.showBaseline;
    renderWorkPlan();
  });
  document.getElementById("wpBaselineDeleteBtn").addEventListener("click", function () {
    wpBaselineOverlay.hidden = true;
    var sheet = wpBaselineSheet();
    if (!sheet) return;
    askConfirm(tr("workPlanBaselineDeleteConfirm"), function () { saveWorkBaseline(sheet, null); });
  });
  document.getElementById("wpBaselineCancelBtn").addEventListener("click", function () { wpBaselineOverlay.hidden = true; });

  // ---- Excel ---------------------------------------------------------------------
  function wpCsvCell(v) {
    v = v == null ? "" : String(v);
    return /[",\n\r]/.test(v) ? "\"" + v.replace(/"/g, "\"\"") + "\"" : v;
  }
  function wpExcelDate(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  }
  function workPlanExcel() {
    var groups = wpGroups();
    if (!groups.some(function (g) { return g.items.length; })) { showToast(tr("workPlanEmpty")); return; }
    var office = !wpState.sheetId;
    var head = [tr("workPlanExcelActivity"), tr("workPlanHammock"), tr("workPlanBy"), tr("workPlanFrom"), tr("workPlanTo"),
      tr("workPlanExcelDays"), tr("workPlanStatus"), tr("workPlanExcelDone"), tr("workPlanStatusLate"),
      tr("workPlanExcelBaseStart"), tr("workPlanExcelBaseEnd"), tr("workPlanExcelSlip"),
      tr("workPlanActualStart"), tr("workPlanActualEnd"), tr("workPlanForecast"), tr("workPlanNote")];
    if (office) head.unshift(tr("shareTaskProject"));
    var rows = [head];
    var statusText = { todo: tr("workPlanStatusTodo"), prog: tr("workPlanStatusProg"), done: tr("workPlanStatusDone") };
    groups.forEach(function (g) {
      var hams = {};
      (g.sheet.workHammocks || []).forEach(function (h) { hams[h.id] = h.name; });
      g.items.forEach(function (x) {
        var base = wpBaselineOf(g.sheet, x);
        var row = [x.name, hams[x.hammock] || "", x.by || "", wpExcelDate(x.start), wpExcelDate(x.end),
          wpDiff(x.start, x.end) + 1, statusText[x.status] || "", (x.status === "done" ? 100 : x.progress || 0) + "%",
          wpIsLate(x) ? "✓" : "", base ? wpExcelDate(base.start) : "", base ? wpExcelDate(base.end) : "",
          base ? wpDiff(base.end, x.end) : "", wpExcelDate(x.actualStart), wpExcelDate(x.actualEnd), wpExcelDate(wpForecastEnd(x)), x.note || ""];
        if (office) row.unshift(g.sheet.name);
        rows.push(row);
      });
    });
    // with a BOM, so Excel reads the Hebrew right
    var csv = "﻿" + rows.map(function (r) { return r.map(wpCsvCell).join(","); }).join("\r\n");
    var sheet = wpBaselineSheet();
    var name = (sheet ? tr("workPlanTitle") + " " + sheet.name : tr("workPlanOfficeTitle")) + " " + isoToFileNameDate(todayISO()) + ".csv";
    attemptShare(new Blob([csv], { type: "text/csv;charset=utf-8" }), name, "text/csv");
  }
  document.getElementById("workPlanExcelBtn").addEventListener("click", workPlanExcel);

  // ---------------------------------------------------------------------
  // תוכנית עבודה – what really happened. Each activity keeps its actual
  // start (actualStart: set the day it goes "בביצוע" / gets its first %)
  // and actual finish (actualEnd: the day it's marked done), both editable
  // in its settings. Done early or late, its end moves to the real day:
  //   - later: what's linked after it moves on (the existing cascade);
  //   - earlier: what's linked after it and hasn't started may start
  //     earlier - offered, never before today (wpPullDependents).
  // An activity under way also gets a forecast end from its pace so far
  // (40% in 6 days -> ~9 more); one past its planned end shows as a dashed
  // tail on its bar, and tapping that offers to replan by it.
  // ---------------------------------------------------------------------
  var wpActualStart = document.getElementById("wpActualStart");
  var wpActualEnd = document.getElementById("wpActualEnd");
  var wpEditorSaving = false; // the settings form saves (and cascades) itself

  // fills in / clears the actual dates as an activity's state changes;
  // returns what happened to its end ("earlier" / "later" / null)
  function wpApplyActuals(prev, item) {
    var today = todayISO();
    var started = item.status !== "todo" || (item.progress || 0) > 0;
    if (started && !item.actualStart) item.actualStart = prev && prev.actualStart || (item.start < today ? item.start : today);
    if (!started) { item.actualStart = null; item.actualEnd = null; }
    if (item.status !== "done") { item.actualEnd = null; return null; }
    var justDone = !prev || prev.status !== "done";
    if (!item.actualEnd) item.actualEnd = justDone ? today : (prev && prev.actualEnd) || item.end;
    if (!justDone) return null;
    // done: the plan shows what really happened
    var oldEnd = item.end;
    if (item.actualStart && item.actualStart < item.start) item.start = item.actualStart;
    item.end = item.actualEnd < item.start ? item.start : item.actualEnd;
    return item.end < oldEnd ? "earlier" : item.end > oldEnd ? "later" : null;
  }
  function wpAfterActuals(sheet, item, change) {
    if (!change) return;
    var cascade = !wpEditorSaving; // (the form runs the later-cascade itself)
    // after the save has settled (and any dialog it opened)
    setTimeout(function () {
      if (change === "earlier") wpPullDependents(sheet, item);
      else if (cascade) wpCascadeDependents(sheet, item);
    }, 0);
  }

  // ---- earlier -----------------------------------------------------------
  // the days `s` could move (negative: earlier) and still keep the link from `p`
  function wpLinkGap(s, p, link) {
    var lag = link.lag || 0;
    return link.type === "SS" ? wpDiff(s.start, addDaysToISO(p.start, lag)) :
      link.type === "FF" ? wpDiff(s.end, addDaysToISO(p.end, lag)) :
      link.type === "SF" ? wpDiff(s.end, addDaysToISO(p.start, lag)) :
      wpDiff(s.start, addDaysToISO(p.end, 1 + lag));
  }
  function wpPullDependents(sheet, item) {
    var today = todayISO();
    var byId = {};
    (sheet.workPlan || []).forEach(function (x) { byId[x.id] = Object.assign({}, x); });
    byId[item.id] = item;
    var moves = {}, order = [], queue = [item.id], guard = 0;
    while (queue.length && guard++ < 500) {
      var predId = queue.shift();
      Object.keys(byId).forEach(function (id) {
        var x = byId[id];
        if (x.status !== "todo" || x.actualStart) return; // under way: stays
        var links = wpLinksOf(x);
        if (!links.some(function (l) { return l.from === predId; })) return;
        // as early as every one of its links allows
        var room = null;
        links.forEach(function (l) {
          var p = byId[l.from];
          if (!p) return;
          var g = wpLinkGap(x, p, l);
          room = room === null ? g : Math.max(room, g);
        });
        if (room === null || room >= 0) return;
        if (addDaysToISO(x.start, room) < today) room = Math.min(0, wpDiff(x.start, today));
        if (room >= 0) return;
        byId[id] = wpShift(x, room);
        if (!moves[id]) order.push(id);
        moves[id] = byId[id];
        queue.push(id);
      });
    }
    if (!order.length) return;
    askConfirm(tr("workPlanPullConfirm").replace("{name}", item.name)
      .replace("{list}", order.map(function (id) { return moves[id].name + " (" + isoToDisplay(moves[id].start) + ")"; }).join(", ")), function () {
      order.forEach(function (id) { saveWorkPlanItem(sheet, moves[id], false); });
      renderWorkPlan();
    });
  }

  // ---- forecast ---------------------------------------------------------------
  // when an activity under way should end at its pace so far (null: no pace yet)
  function wpForecastEnd(item) {
    if (item.status === "done") return null;
    var p = item.progress || 0;
    if (p <= 0 || p >= 100) return null;
    var from = item.actualStart || item.start;
    var today = todayISO();
    if (from > today) return null;
    // days worked so far (today too), and as many more as the rest needs
    var spent = wpDiff(from, today) + 1;
    return addDaysToISO(today, Math.ceil(spent * (100 - p) / p));
  }
  // past the planned end: a dashed tail on the bar, and "צפי" by the name
  function wpDrawForecast(trackEl, nameEl, sheet, item, range, dayW, forPdf) {
    var f = wpForecastEnd(item);
    if (!f || f <= item.end) return;
    nameEl.appendChild(wpEl("small", "wp-forecast-label", tr("workPlanForecastShort").replace("{date}", isoToDisplay(f))));
    var from = Math.max(0, wpDiff(range.start, addDaysToISO(item.end, 1)));
    var to = Math.min(range.days - 1, wpDiff(range.start, f));
    if (to < 0 || from > range.days - 1) return;
    var tail = wpEl("div", "wp-forecast");
    tail.style.right = (from * dayW) + "px";
    tail.style.width = Math.max(4, (to - from + 1) * dayW - 1) + "px";
    tail.title = tr("workPlanForecastShort").replace("{date}", isoToDisplay(f));
    if (!forPdf) {
      tail.addEventListener("click", function (e) {
        e.stopPropagation();
        askConfirm(tr("workPlanForecastConfirm").replace("{name}", item.name).replace("{date}", isoToDisplay(f)), function () {
          var moved = Object.assign({}, item, { end: f, updatedBy: myPhoneNumber || null, updatedAt: Date.now() });
          saveWorkPlanItem(sheet, moved, false);
          renderWorkPlan();
          wpCascadeDependents(sheet, moved);
        });
      });
    }
    trackEl.appendChild(tail);
  }

  // ---- the settings: the actual dates -------------------------------------------------
  function wpFillActuals(item) {
    wpActualStart.value = item.actualStart || "";
    wpActualEnd.value = item.actualEnd || "";
    wpShowActualRows();
  }
  function wpShowActualRows() {
    document.getElementById("wpActualRow").hidden = wpEditStatus === "todo" && !(parseInt(wpProgress.value, 10) > 0);
    document.getElementById("wpActualEndField").hidden = wpEditStatus !== "done";
  }
  // a status tapped in the form: the actual dates the save would set, shown now
  function wpActualsForStatus(status) {
    var today = todayISO();
    if (status !== "todo" && !wpActualStart.value) wpActualStart.value = wpStart.value && wpStart.value < today ? wpStart.value : today;
    if (status === "done" && !wpActualEnd.value) wpActualEnd.value = today;
    if (status !== "done") wpActualEnd.value = "";
    if (status === "todo") wpActualStart.value = "";
    wpShowActualRows();
  }
  function closeReportTypeModal() {
    reportTypeOverlay.hidden = true;
    pendingReportDraft = null;
  }
  function chooseReportType(type) {
    pendingReportDraft = { type: type };
    reportTypeOverlay.hidden = true;
    reportTitleInput.value = "";
    reportTitleOverlay.hidden = false;
    reportTitleInput.focus();
  }
  function openReportEditFlow(reportId) {
    var report = findReport(reportId);
    if (!report) return;
    pendingReportDraft = { type: report.type, editId: report.id };
    reportTitleInput.value = report.title || "";
    reportTitleOverlay.hidden = false;
    reportTitleInput.focus();
  }
  reportTypeMeetingBtn.addEventListener("click", function () { chooseReportType("meeting"); });
  reportTypeTourBtn.addEventListener("click", function () { chooseReportType("tour"); });
  reportTypeCancelBtn.addEventListener("click", closeReportTypeModal);
  reportTypeOverlay.addEventListener("click", function (e) {
    if (e.target === reportTypeOverlay) closeReportTypeModal();
  });

  function closeReportTitleModal() {
    reportTitleOverlay.hidden = true;
    pendingReportDraft = null;
  }
  reportTitleSaveBtn.addEventListener("click", function () {
    if (!pendingReportDraft) return;
    pendingReportDraft.title = reportTitleInput.value.trim();
    reportTitleOverlay.hidden = true;
    var existingReport = pendingReportDraft.editId ? findReport(pendingReportDraft.editId) : null;
    reportDateInput.value = existingReport ? existingReport.date : todayISO();
    reportDateOverlay.hidden = false;
  });
  reportTitleCancelBtn.addEventListener("click", closeReportTitleModal);
  reportTitleOverlay.addEventListener("click", function (e) {
    if (e.target === reportTitleOverlay) closeReportTitleModal();
  });
  reportTitleInput.addEventListener("keydown", function (e) {
    e.stopPropagation();
    if (e.key === "Enter") reportTitleSaveBtn.click();
    if (e.key === "Escape") closeReportTitleModal();
  });

  function closeReportDateModal() {
    reportDateOverlay.hidden = true;
    pendingReportDraft = null;
  }
  reportDateSaveBtn.addEventListener("click", function () {
    if (!pendingReportDraft) return;
    pendingReportDraft.date = reportDateInput.value || todayISO();
    reportDateOverlay.hidden = true;
    var existingReport = pendingReportDraft.editId ? findReport(pendingReportDraft.editId) : null;
    var existingNames = existingReport && existingReport.participants
      ? existingReport.participants.split(",").map(function (s) { return s.trim(); })
      : [];
    resetParticipantsList(existingNames);
    reportParticipantsOverlay.hidden = false;
  });
  reportDateCancelBtn.addEventListener("click", closeReportDateModal);
  reportDateOverlay.addEventListener("click", function (e) {
    if (e.target === reportDateOverlay) closeReportDateModal();
  });

  function closeReportParticipantsModal() {
    reportParticipantsOverlay.hidden = true;
    pendingReportDraft = null;
  }
  reportParticipantsSaveBtn.addEventListener("click", function () {
    if (!pendingReportDraft) return;
    var names = Array.prototype.slice.call(reportParticipantsList.querySelectorAll("input"))
      .map(function (input) { return input.value.trim(); })
      .filter(function (name) { return name; });
    var participantsStr = names.join(", ");
    var reportId;
    if (pendingReportDraft.editId) {
      var existing = findReport(pendingReportDraft.editId);
      if (existing) {
        existing.title = pendingReportDraft.title;
        existing.date = pendingReportDraft.date || todayISO();
        existing.participants = participantsStr;
      }
      reportId = pendingReportDraft.editId;
    } else {
      var report = {
        id: uid(),
        type: pendingReportDraft.type,
        title: pendingReportDraft.title,
        participants: participantsStr,
        date: pendingReportDraft.date || todayISO(),
        createdAt: Date.now(),
        rows: []
      };
      activeSheet().reports.push(report);
      reportId = report.id;
    }
    saveData();
    pendingReportDraft = null;
    reportParticipantsOverlay.hidden = true;
    openReportView(reportId);
  });
  reportParticipantsCancelBtn.addEventListener("click", closeReportParticipantsModal);
  reportParticipantsOverlay.addEventListener("click", function (e) {
    if (e.target === reportParticipantsOverlay) closeReportParticipantsModal();
  });

  function closePriorityPopup() {
    var existing = document.querySelector(".report-priority-popup");
    if (existing) existing.remove();
    openPriorityPopupRowId = null;
  }

  function openReportView(reportId) {
    activeReportId = reportId;
    editingReportCell = null;
    closePriorityPopup();
    closeImagePopup();
    renderReportView();
    reportView.hidden = false;
  }

  function closeReportView() {
    reportView.hidden = true;
    activeReportId = null;
    editingReportCell = null;
    closePriorityPopup();
    closeImagePopup();
    if (state.viewMode === "reports") renderSheetReportsList();
  }
  reportBackBtn.addEventListener("click", closeReportView);
  reportEditBtn.addEventListener("click", function () {
    if (activeReportId) openReportEditFlow(activeReportId);
  });
  reportCloseBtn.addEventListener("click", closeReport);

  var renderReportViewDepth = 0;
  function renderReportView() {
    if (renderReportViewDepth > 0) return;
    renderReportViewDepth++;
    try {
      renderReportViewInner();
    } finally {
      renderReportViewDepth--;
    }
  }
  function renderReportViewInner() {
    var report = findReport(activeReportId);
    if (!report) { closeReportView(); return; }
    scheduleReportPdfCacheRefresh(report);
    var typeLabel = report.type === "meeting" ? tr("reportTypeMeeting") : tr("reportTypeTour");
    reportHeadTitle.textContent = report.title || typeLabel;
    var metaText = typeLabel + " · " + isoToFullDisplay(report.date);
    if (report.participants) metaText += " — " + tr("reportShareParticipantsLabel") + report.participants;
    reportMeta.textContent = metaText;

    reportTableBody.innerHTML = "";
    report.rows.forEach(function (row, index) {
      var rowEl = document.createElement("tr");

      var numTd = document.createElement("td");
      numTd.textContent = String(index + 1);
      (function (rowId) {
        var rowLongPressFired = false;
        var rowPressStartX = 0, rowPressStartY = 0;
        var startRowPress = function (e) {
          var point = e.touches ? e.touches[0] : e;
          rowPressStartX = point.clientX;
          rowPressStartY = point.clientY;
          rowLongPressFired = false;
          clearTimeout(longPressTimer);
          longPressTimer = setTimeout(function () {
            rowLongPressFired = true;
            openReportRowActionModal(rowId);
          }, 1000);
        };
        var cancelRowPress = function () { clearTimeout(longPressTimer); };
        var moveRowPress = function (e) {
          var point = e.touches ? e.touches[0] : e;
          if (Math.abs(point.clientX - rowPressStartX) > 10 || Math.abs(point.clientY - rowPressStartY) > 10) {
            cancelRowPress();
          }
        };
        numTd.addEventListener("mousedown", startRowPress);
        numTd.addEventListener("mouseup", cancelRowPress);
        numTd.addEventListener("mouseleave", cancelRowPress);
        numTd.addEventListener("mousemove", moveRowPress);
        numTd.addEventListener("touchstart", startRowPress, { passive: true });
        numTd.addEventListener("touchend", cancelRowPress);
        numTd.addEventListener("touchmove", moveRowPress, { passive: true });
      })(row.id);
      rowEl.appendChild(numTd);

      var taskTd = document.createElement("td");
      taskTd.className = "report-col-task";
      if (editingReportCell && editingReportCell.rowId === row.id && editingReportCell.field === "task") {
        var taskInputEl = document.createElement("input");
        taskInputEl.type = "text";
        taskInputEl.className = "report-cell-input";
        taskInputEl.value = row.task || "";
        taskInputEl.maxLength = 200;
        taskTd.appendChild(taskInputEl);
        setTimeout(function () { taskInputEl.focus(); }, 0);
        var myTaskEditRef = editingReportCell;
        var commitTask = function () {
          row.task = taskInputEl.value.trim();
          if (editingReportCell !== myTaskEditRef) return;
          editingReportCell = null;
          saveData();
          renderReportView();
        };
        taskInputEl.addEventListener("blur", commitTask);
        taskInputEl.addEventListener("keydown", function (e) {
          e.stopPropagation();
          if (e.key === "Enter") commitTask();
          if (e.key === "Escape") { editingReportCell = null; renderReportView(); }
        });
      } else {
        var taskBtn = document.createElement("button");
        taskBtn.type = "button";
        taskBtn.className = "report-cell-btn";
        taskBtn.textContent = row.task || "";
        taskBtn.addEventListener("click", function () {
          editingReportCell = { rowId: row.id, field: "task" };
          renderReportView();
        });
        taskTd.appendChild(taskBtn);
      }
      rowEl.appendChild(taskTd);

      var respTd = document.createElement("td");
      if (editingReportCell && editingReportCell.rowId === row.id && editingReportCell.field === "responsible") {
        var respInputEl = document.createElement("input");
        respInputEl.type = "text";
        respInputEl.className = "report-cell-input";
        respInputEl.value = row.responsible || "";
        respInputEl.maxLength = 100;
        respTd.appendChild(respInputEl);
        setTimeout(function () { respInputEl.focus(); }, 0);
        var myRespEditRef = editingReportCell;
        var commitResp = function () {
          row.responsible = respInputEl.value.trim();
          if (editingReportCell !== myRespEditRef) return;
          editingReportCell = null;
          saveData();
          renderReportView();
        };
        respInputEl.addEventListener("blur", commitResp);
        respInputEl.addEventListener("keydown", function (e) {
          e.stopPropagation();
          if (e.key === "Enter") commitResp();
          if (e.key === "Escape") { editingReportCell = null; renderReportView(); }
        });
      } else {
        var respBtn = document.createElement("button");
        respBtn.type = "button";
        respBtn.className = "report-cell-btn";
        respBtn.textContent = row.responsible || "";
        respBtn.addEventListener("click", function () {
          editingReportCell = { rowId: row.id, field: "responsible" };
          renderReportView();
        });
        respTd.appendChild(respBtn);
      }
      rowEl.appendChild(respTd);

      var dueTd = document.createElement("td");
      if (editingReportCell && editingReportCell.rowId === row.id && editingReportCell.field === "dueDate") {
        var dueInputEl = document.createElement("input");
        dueInputEl.type = "date";
        dueInputEl.className = "report-cell-input";
        dueInputEl.value = row.dueDate || "";
        dueTd.appendChild(dueInputEl);
        setTimeout(function () {
          dueInputEl.focus();
          if (dueInputEl.showPicker) { try { dueInputEl.showPicker(); } catch (e) {} }
        }, 0);
        var commitDue = function () {
          row.dueDate = dueInputEl.value || null;
          editingReportCell = null;
          saveData();
          renderReportView();
        };
        dueInputEl.addEventListener("change", commitDue);
        dueInputEl.addEventListener("blur", commitDue);
      } else {
        var dueBtn = document.createElement("button");
        dueBtn.type = "button";
        dueBtn.className = "report-cell-btn";
        dueBtn.textContent = row.dueDate ? isoToDisplay(row.dueDate) : "";
        dueBtn.addEventListener("click", function () {
          editingReportCell = { rowId: row.id, field: "dueDate" };
          renderReportView();
        });
        dueTd.appendChild(dueBtn);
      }
      rowEl.appendChild(dueTd);

      var statusTd = document.createElement("td");
      var statusMark = document.createElement("span");
      statusMark.className = "report-status-mark";
      statusMark.innerHTML = rowMarkSvg(row.status);
      statusMark.style.cursor = "pointer";
      statusMark.addEventListener("click", function () {
        row.status = (row.status + 1) % 3;
        saveData();
        renderReportView();
      });
      statusTd.appendChild(statusMark);
      rowEl.appendChild(statusTd);

      var priorityTd = document.createElement("td");
      priorityTd.style.position = "relative";
      if (row.priority) {
        var tag = document.createElement("span");
        tag.className = "report-priority-tag " + row.priority;
        tag.textContent = row.priority === "urgent" ? tr("priorityUrgent") : tr("priorityRegular");
        priorityTd.appendChild(tag);
      }
      priorityTd.addEventListener("click", function (e) {
        e.stopPropagation();
        togglePriorityPopup(row, priorityTd);
      });
      rowEl.appendChild(priorityTd);

      var imageTd = document.createElement("td");
      imageTd.style.position = "relative";
      if (row.image) {
        var thumb = document.createElement("img");
        thumb.className = "report-image-thumb";
        thumb.src = row.image;
        thumb.alt = "";
        imageTd.appendChild(thumb);
      } else {
        var imagePlaceholder = document.createElement("span");
        imagePlaceholder.className = "report-image-placeholder";
        imagePlaceholder.innerHTML = "&#128247;";
        imageTd.appendChild(imagePlaceholder);
      }
      imageTd.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleImagePopup(row, imageTd);
      });
      rowEl.appendChild(imageTd);

      reportTableBody.appendChild(rowEl);
    });

    var addRowEl = document.createElement("tr");
    var addNumTd = document.createElement("td");
    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "report-add-row-btn";
    var addRowBtnImg = document.createElement("img");
    addRowBtnImg.src = "tasks-plus-icon.webp";
    addRowBtnImg.alt = "+";
    addBtn.appendChild(addRowBtnImg);
    addBtn.title = tr("addBtnTitle");
    addBtn.addEventListener("mousedown", function (e) {
      e.preventDefault();
      addReportRow();
    });
    addBtn.addEventListener("touchstart", function (e) {
      e.preventDefault();
      addReportRow();
    }, { passive: false });
    addNumTd.appendChild(addBtn);
    addRowEl.appendChild(addNumTd);
    for (var i = 0; i < 6; i++) {
      addRowEl.appendChild(document.createElement("td"));
    }
    reportTableBody.appendChild(addRowEl);
  }

  function togglePriorityPopup(row, anchorTd) {
    if (openPriorityPopupRowId === row.id) { closePriorityPopup(); return; }
    closePriorityPopup();
    openPriorityPopupRowId = row.id;
    var popup = document.createElement("div");
    popup.className = "report-priority-popup";
    var urgentBtn = document.createElement("button");
    urgentBtn.type = "button";
    urgentBtn.textContent = tr("priorityUrgent");
    urgentBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      row.priority = row.priority === "urgent" ? null : "urgent";
      saveData();
      closePriorityPopup();
      renderReportView();
    });
    var regularBtn = document.createElement("button");
    regularBtn.type = "button";
    regularBtn.textContent = tr("priorityRegular");
    regularBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      row.priority = row.priority === "regular" ? null : "regular";
      saveData();
      closePriorityPopup();
      renderReportView();
    });
    popup.appendChild(urgentBtn);
    popup.appendChild(regularBtn);
    document.body.appendChild(popup);
    var rect = anchorTd.getBoundingClientRect();
    popup.style.top = (rect.bottom + window.scrollY) + "px";
    popup.style.left = (rect.left + window.scrollX) + "px";
  }

  document.addEventListener("click", function (e) {
    if (openPriorityPopupRowId && !e.target.closest(".report-priority-popup")) {
      closePriorityPopup();
    }
  });

  var reportImageCameraInput = document.getElementById("reportImageCameraInput");
  var reportImageGalleryInput = document.getElementById("reportImageGalleryInput");
  var pendingImageRowId = null;
  var openImagePopupRowId = null;

  function closeImagePopup() {
    var existing = document.querySelector(".report-priority-popup.report-image-popup");
    if (existing) existing.remove();
    openImagePopupRowId = null;
  }

  function toggleImagePopup(row, anchorTd) {
    if (openImagePopupRowId === row.id) { closeImagePopup(); return; }
    closeImagePopup();
    closePriorityPopup();
    openImagePopupRowId = row.id;
    var popup = document.createElement("div");
    popup.className = "report-priority-popup report-image-popup";
    var cameraBtn = document.createElement("button");
    cameraBtn.type = "button";
    cameraBtn.textContent = tr("imagePopupCamera");
    cameraBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      pendingImageRowId = row.id;
      closeImagePopup();
      reportImageCameraInput.value = "";
      reportImageCameraInput.click();
    });
    var galleryBtn = document.createElement("button");
    galleryBtn.type = "button";
    galleryBtn.textContent = tr("imagePopupGallery");
    galleryBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      pendingImageRowId = row.id;
      closeImagePopup();
      reportImageGalleryInput.value = "";
      reportImageGalleryInput.click();
    });
    popup.appendChild(cameraBtn);
    popup.appendChild(galleryBtn);
    if (row.image) {
      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = tr("imagePopupRemove");
      removeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        row.image = null;
        saveData();
        closeImagePopup();
        renderReportView();
      });
      popup.appendChild(removeBtn);
    }
    document.body.appendChild(popup);
    var rect = anchorTd.getBoundingClientRect();
    popup.style.top = (rect.bottom + window.scrollY) + "px";
    popup.style.left = (rect.left + window.scrollX) + "px";
  }

  document.addEventListener("click", function (e) {
    if (openImagePopupRowId && !e.target.closest(".report-image-popup")) {
      closeImagePopup();
    }
  });

  function resizeImageFile(file, callback) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var maxDim = 900;
        var scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        var canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        callback(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function handleReportImageFile(file) {
    if (!file || !pendingImageRowId) return;
    var report = findReport(activeReportId);
    if (!report) return;
    var row = report.rows.find(function (r) { return r.id === pendingImageRowId; });
    if (!row) return;
    resizeImageFile(file, function (dataUrl) {
      row.image = dataUrl;
      saveData();
      renderReportView();
    });
  }
  reportImageCameraInput.addEventListener("change", function () {
    handleReportImageFile(reportImageCameraInput.files && reportImageCameraInput.files[0]);
  });
  reportImageGalleryInput.addEventListener("change", function () {
    handleReportImageFile(reportImageGalleryInput.files && reportImageGalleryInput.files[0]);
  });

  function commitEditingReportCellIfPending() {
    if (!editingReportCell) return;
    var report = findReport(activeReportId);
    if (!report) { editingReportCell = null; return; }
    var row = report.rows.find(function (r) { return r.id === editingReportCell.rowId; });
    var inputEl = reportTableBody.querySelector(".report-cell-input");
    if (row && inputEl && (editingReportCell.field === "task" || editingReportCell.field === "responsible")) {
      row[editingReportCell.field] = inputEl.value.trim();
    }
    editingReportCell = null;
  }

  function addReportRow() {
    commitEditingReportCellIfPending();
    var report = findReport(activeReportId);
    if (!report) return;
    var newRow = { id: uid(), task: "", responsible: "", status: 0, priority: null, dueDate: null, image: null };
    report.rows.push(newRow);
    saveData();
    editingReportCell = { rowId: newRow.id, field: "task" };
    renderReportView();
  }

  function buildReportPdfElement(report) {
    var typeLabel = report.type === "meeting" ? tr("reportTypeMeeting") : tr("reportTypeTour");
    var pdfTitle = report.type === "meeting" ? tr("reportPdfTitleMeeting") : tr("reportPdfTitleTour");

    var doc = document.createElement("div");
    doc.className = "pdf-doc";
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";

    doc.appendChild(buildPdfDocTitleElement(findSheetForReport(report), pdfTitle));

    var infoTitle = document.createElement("div");
    infoTitle.className = "pdf-doc-info-title";
    infoTitle.textContent = report.title || typeLabel;
    doc.appendChild(infoTitle);

    var infoDate = document.createElement("div");
    infoDate.className = "pdf-doc-info-date";
    infoDate.textContent = isoToFullDisplay(report.date);
    doc.appendChild(infoDate);

    if (report.participants) {
      var partsEl = document.createElement("div");
      partsEl.className = "pdf-doc-participants";
      var partsLabel = document.createElement("strong");
      partsLabel.textContent = tr("reportShareParticipantsLabel");
      partsEl.appendChild(partsLabel);
      partsEl.appendChild(document.createTextNode(report.participants));
      doc.appendChild(partsEl);
    }

    var table = document.createElement("table");
    table.className = "pdf-doc-table";
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    ["reportColNum", "reportColTask", "reportColResponsible", "reportColDue", "reportColStatus", "reportColPriority", "reportColImage"].forEach(function (key) {
      var th = document.createElement("th");
      th.textContent = tr(key);
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    if (!report.rows.length) {
      var emptyRow = document.createElement("tr");
      var emptyTd = document.createElement("td");
      emptyTd.className = "pdf-doc-empty";
      emptyTd.colSpan = 7;
      emptyTd.textContent = tr("reportShareNoRows");
      emptyRow.appendChild(emptyTd);
      tbody.appendChild(emptyRow);
    } else {
      report.rows.forEach(function (row, index) {
        var rowEl = document.createElement("tr");

        var numTd = document.createElement("td");
        numTd.textContent = String(index + 1);
        rowEl.appendChild(numTd);

        var taskTd = document.createElement("td");
        taskTd.className = "pdf-doc-col-task";
        taskTd.textContent = row.task || "";
        rowEl.appendChild(taskTd);

        var respTd = document.createElement("td");
        respTd.textContent = row.responsible || "";
        rowEl.appendChild(respTd);

        var dueTd = document.createElement("td");
        dueTd.textContent = row.dueDate ? isoToDisplay(row.dueDate) : "";
        rowEl.appendChild(dueTd);

        var statusTd = document.createElement("td");
        statusTd.textContent = row.status === 2 ? tr("statusWordDone") : row.status === 1 ? tr("statusWordPartial") : tr("statusWordNotDone");
        rowEl.appendChild(statusTd);

        var priorityTd = document.createElement("td");
        if (row.priority) {
          var tag = document.createElement("span");
          tag.className = "pdf-doc-priority-tag " + row.priority;
          tag.textContent = row.priority === "urgent" ? tr("priorityUrgent") : tr("priorityRegular");
          priorityTd.appendChild(tag);
        }
        rowEl.appendChild(priorityTd);

        var imageTd = document.createElement("td");
        if (row.image) {
          var img = document.createElement("img");
          img.className = "pdf-doc-thumb";
          img.src = row.image;
          imageTd.appendChild(img);
        }
        rowEl.appendChild(imageTd);

        tbody.appendChild(rowEl);
      });
    }
    table.appendChild(tbody);
    doc.appendChild(table);

    var footerEl = document.createElement("div");
    footerEl.className = "pdf-doc-footer";
    footerEl.textContent = tr("reportPdfFooter");
    doc.appendChild(footerEl);

    return doc;
  }

  function siteLogColLabel(colKey) {
    return tr("siteLogCol" + colKey.charAt(0).toUpperCase() + colKey.slice(1));
  }

  // Row/category-level "is this actually filled in" checks, shared by both
  // the standalone per-category reports and the combined general report -
  // an empty row (added via "+" but never filled in) or a wholly-untouched
  // category should never show up in either.
  function siteLogAttendanceIsEmpty(log) {
    if (!log) return true;
    return SITE_LOG_ATTENDANCE_COLUMNS.every(function (col) {
      return !((log.attendance && log.attendance[col]) || []).some(function (p) { return p && p.name && p.name.trim(); });
    });
  }
  function siteLogToolsIsEmpty(log) {
    if (!log) return true;
    return SITE_LOG_TOOLS_COLUMNS.every(function (col) {
      var list = (log.tools && log.tools[col]) || [];
      return !list.some(function (e) { return e && ((e.qty && String(e.qty).trim()) || (e.note && e.note.trim())); });
    });
  }
  function filledContractors(log) {
    return ((log && log.contractors) || []).filter(function (c) { return c && c.name && c.name.trim(); });
  }
  function filledWorks(log) {
    return ((log && log.works) || []).filter(function (w) { return w && ((w.text && w.text.trim()) || w.attachment); });
  }
  function filledProcurement(log) {
    return ((log && log.procurement) || []).filter(function (r) {
      return r && ((r.item && r.item.trim()) || (r.quantity && r.quantity.trim()) || (r.supplier && r.supplier.trim()));
    });
  }

  function buildAttendanceTableElement(log, compact) {
    // A column (e.g. "מנהל עבודה") that nobody was assigned to for this log
    // is dropped entirely, not shown as a blank column - same rule as an
    // empty row elsewhere: nothing filled in means nothing shown.
    var activeColumns = SITE_LOG_ATTENDANCE_COLUMNS.filter(function (colKey) {
      return ((log && log.attendance[colKey]) || []).some(function (p) { return p && p.name && p.name.trim(); });
    });
    var headerColumns = activeColumns.length ? activeColumns : SITE_LOG_ATTENDANCE_COLUMNS;
    var colLists = activeColumns.map(function (colKey) {
      return ((log && log.attendance[colKey]) || []).filter(function (p) { return p && p.name && p.name.trim(); });
    });
    var maxRows = colLists.length ? Math.max.apply(null, colLists.map(function (l) { return l.length; })) : 0;

    var table = document.createElement("table");
    table.className = compact ? "pdf-doc-table pdf-doc-table-half" : "pdf-doc-table";
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    headerColumns.forEach(function (colKey) {
      var th = document.createElement("th");
      th.textContent = siteLogColLabel(colKey);
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    if (maxRows === 0) {
      var emptyRow = document.createElement("tr");
      var emptyTd = document.createElement("td");
      emptyTd.className = "pdf-doc-empty";
      emptyTd.colSpan = headerColumns.length;
      emptyTd.textContent = tr("reportShareNoRows");
      emptyRow.appendChild(emptyTd);
      tbody.appendChild(emptyRow);
    } else {
      for (var i = 0; i < maxRows; i++) {
        var rowEl = document.createElement("tr");
        colLists.forEach(function (list) {
          var td = document.createElement("td");
          td.textContent = list[i] ? list[i].name : "";
          rowEl.appendChild(td);
        });
        tbody.appendChild(rowEl);
      }
    }
    table.appendChild(tbody);
    return table;
  }

  function toolEntryCellText(entry) {
    if (!entry) return "";
    var qty = (entry.qty || "").toString().trim();
    var note = (entry.note || "").toString().trim();
    return qty && note ? (qty + " – " + note) : (qty || note);
  }

  function buildToolsTableElement(log, compact) {
    // Same rule as attendance: a tool column (e.g. "משאית") left blank for
    // this log is dropped entirely rather than shown as an empty column, and
    // a row nobody filled in (the always-present blank typing row) never
    // becomes a real entry, so it never reaches this table either.
    var activeColumns = SITE_LOG_TOOLS_COLUMNS.filter(function (colKey) {
      return ((log && log.tools[colKey]) || []).some(function (e) { return e && (e.qty || e.note); });
    });
    var headerColumns = activeColumns.length ? activeColumns : SITE_LOG_TOOLS_COLUMNS;
    var colLists = activeColumns.map(function (colKey) {
      return ((log && log.tools[colKey]) || []).filter(function (e) { return e && (e.qty || e.note); });
    });
    var maxRows = colLists.length ? Math.max.apply(null, colLists.map(function (l) { return l.length; })) : 0;

    var table = document.createElement("table");
    table.className = compact ? "pdf-doc-table pdf-doc-table-half" : "pdf-doc-table";
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    headerColumns.forEach(function (colKey) {
      var th = document.createElement("th");
      th.textContent = siteLogColLabel(colKey);
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    if (maxRows === 0) {
      var emptyRow = document.createElement("tr");
      var emptyTd = document.createElement("td");
      emptyTd.className = "pdf-doc-empty";
      emptyTd.colSpan = headerColumns.length;
      emptyTd.textContent = tr("reportShareNoRows");
      emptyRow.appendChild(emptyTd);
      tbody.appendChild(emptyRow);
    } else {
      for (var i = 0; i < maxRows; i++) {
        var rowEl = document.createElement("tr");
        colLists.forEach(function (list) {
          var td = document.createElement("td");
          td.textContent = toolEntryCellText(list[i]);
          rowEl.appendChild(td);
        });
        tbody.appendChild(rowEl);
      }
    }
    table.appendChild(tbody);
    return table;
  }

  function buildProcurementTableElement(log, compact) {
    var table = document.createElement("table");
    table.className = compact ? "pdf-doc-table pdf-doc-table-procurement-general" : "pdf-doc-table";
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    [tr("siteLogColItem"), tr("siteLogColQuantity"), tr("siteLogColSupplier")].forEach(function (label) {
      var th = document.createElement("th");
      th.textContent = label;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    var rows = filledProcurement(log);
    if (!rows.length) {
      var emptyRow = document.createElement("tr");
      var emptyTd = document.createElement("td");
      emptyTd.className = "pdf-doc-empty";
      emptyTd.colSpan = 3;
      emptyTd.textContent = tr("reportShareNoRows");
      emptyRow.appendChild(emptyTd);
      tbody.appendChild(emptyRow);
    } else {
      rows.forEach(function (row) {
        var rowEl = document.createElement("tr");
        [row.item, row.quantity, row.supplier].forEach(function (val) {
          var td = document.createElement("td");
          td.textContent = val || "";
          rowEl.appendChild(td);
        });
        tbody.appendChild(rowEl);
      });
    }
    table.appendChild(tbody);
    return table;
  }

  function buildSiteLogAttendancePdfElement(dateISO) {
    var doc = document.createElement("div");
    doc.className = "pdf-doc";
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";

    var sheet = activeSheet();
    doc.appendChild(buildPdfDocTitleElement(sheet, sheet.name));

    var categoryTitle = document.createElement("div");
    categoryTitle.className = "pdf-doc-info-title";
    categoryTitle.textContent = tr("siteLogAttendance");
    doc.appendChild(categoryTitle);

    var infoDate = document.createElement("div");
    infoDate.className = "pdf-doc-info-date";
    infoDate.textContent = isoToFullDisplay(dateISO);
    doc.appendChild(infoDate);

    var log = findSiteLog(sheet, dateISO);
    doc.appendChild(buildAttendanceTableElement(log));

    var footerEl = document.createElement("div");
    footerEl.className = "pdf-doc-footer";
    footerEl.textContent = tr("reportPdfFooter");
    doc.appendChild(footerEl);

    return doc;
  }

  function buildSiteLogToolsPdfElement(dateISO) {
    var doc = document.createElement("div");
    doc.className = "pdf-doc";
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";

    var sheet = activeSheet();
    doc.appendChild(buildPdfDocTitleElement(sheet, sheet.name));

    var categoryTitle = document.createElement("div");
    categoryTitle.className = "pdf-doc-info-title";
    categoryTitle.textContent = tr("siteLogTools");
    doc.appendChild(categoryTitle);

    var infoDate = document.createElement("div");
    infoDate.className = "pdf-doc-info-date";
    infoDate.textContent = isoToFullDisplay(dateISO);
    doc.appendChild(infoDate);

    var log = findSiteLog(sheet, dateISO);
    doc.appendChild(buildToolsTableElement(log));

    var footerEl = document.createElement("div");
    footerEl.className = "pdf-doc-footer";
    footerEl.textContent = tr("reportPdfFooter");
    doc.appendChild(footerEl);

    return doc;
  }

  function buildSiteLogProcurementPdfElement(dateISO) {
    var doc = document.createElement("div");
    doc.className = "pdf-doc";
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";

    var sheet = activeSheet();
    doc.appendChild(buildPdfDocTitleElement(sheet, sheet.name));

    var categoryTitle = document.createElement("div");
    categoryTitle.className = "pdf-doc-info-title";
    categoryTitle.textContent = tr("siteLogProcurement");
    doc.appendChild(categoryTitle);

    var infoDate = document.createElement("div");
    infoDate.className = "pdf-doc-info-date";
    infoDate.textContent = isoToFullDisplay(dateISO);
    doc.appendChild(infoDate);

    var log = findSiteLog(sheet, dateISO);
    doc.appendChild(buildProcurementTableElement(log));

    var footerEl = document.createElement("div");
    footerEl.className = "pdf-doc-footer";
    footerEl.textContent = tr("reportPdfFooter");
    doc.appendChild(footerEl);

    return doc;
  }

  function isoToDayName(iso) {
    var parts = iso.split("-").map(Number);
    var d = new Date(parts[0], parts[1] - 1, parts[2]);
    var localeMap = { he: "he-IL", en: "en-US", ar: "ar", ru: "ru-RU" };
    return d.toLocaleDateString(localeMap[currentLang] || "he-IL", { weekday: "long" });
  }

  function buildSiteLogGeneralPdfElement(sheet, log, number) {
    var doc = document.createElement("div");
    doc.className = "pdf-doc";
    doc.dir = RTL_LANGS[currentLang] ? "rtl" : "ltr";

    doc.appendChild(buildPdfDocTitleElement(sheet, sheet.name));

    var logNumberEl = document.createElement("div");
    logNumberEl.className = "pdf-doc-info-title";
    logNumberEl.textContent = tr("siteLogGeneralReportTitle") + " " + number;
    doc.appendChild(logNumberEl);

    var dateEl = document.createElement("div");
    dateEl.className = "pdf-doc-info-date";
    dateEl.textContent = isoToFullDisplay(log.date) + " - " + isoToDayName(log.date);
    doc.appendChild(dateEl);
    if (log.weather) {
      var weatherEl = document.createElement("div");
      weatherEl.className = "pdf-doc-info-date";
      weatherEl.textContent = tr("diaryWeatherLine").replace("{w}", log.weather);
      doc.appendChild(weatherEl);
    }

    if (!siteLogAttendanceIsEmpty(log)) {
      var attendanceHeading = document.createElement("div");
      attendanceHeading.className = "pdf-doc-section-heading";
      attendanceHeading.textContent = tr("siteLogAttendance");
      doc.appendChild(attendanceHeading);
      doc.appendChild(buildAttendanceTableElement(log, true));
    }

    if (!siteLogToolsIsEmpty(log)) {
      var toolsHeading = document.createElement("div");
      toolsHeading.className = "pdf-doc-section-heading";
      toolsHeading.textContent = tr("siteLogTools");
      doc.appendChild(toolsHeading);
      doc.appendChild(buildToolsTableElement(log, true));
    }

    var contractors = filledContractors(log);
    if (contractors.length) {
      var contractorsHeading = document.createElement("div");
      contractorsHeading.className = "pdf-doc-section-heading";
      contractorsHeading.textContent = tr("siteLogContractors");
      doc.appendChild(contractorsHeading);
      var contractorsList = document.createElement("div");
      contractorsList.className = "pdf-doc-contractors-list";
      contractors.forEach(function (c) {
        var line = document.createElement("div");
        line.className = "pdf-doc-contractor-line";
        line.textContent = c.name;
        contractorsList.appendChild(line);
      });
      doc.appendChild(contractorsList);
    }

    var works = filledWorks(log);
    if (works.length) {
      var worksFrame = document.createElement("div");
      worksFrame.className = "pdf-doc-works-frame";
      var worksTitle = document.createElement("div");
      worksTitle.className = "pdf-doc-works-frame-title";
      worksTitle.textContent = tr("siteLogWorksTourTitle");
      worksFrame.appendChild(worksTitle);
      works.forEach(function (w) {
        var rowEl = document.createElement("div");
        rowEl.className = "pdf-doc-work-row";
        var textEl = document.createElement("div");
        textEl.className = "pdf-doc-work-row-text";
        textEl.textContent = w.text;
        rowEl.appendChild(textEl);
        if (w.attachment && isImageFile(w.attachment)) {
          var imgEl = document.createElement("img");
          imgEl.className = "pdf-doc-work-row-image";
          imgEl.src = w.attachment.url;
          rowEl.appendChild(imgEl);
        }
        worksFrame.appendChild(rowEl);
      });
      doc.appendChild(worksFrame);
    }

    appendPlannedPdfSection(doc, log);
    appendDiaryPhotosPdfSection(doc, log);

    if (filledProcurement(log).length) {
      var procurementHeading = document.createElement("div");
      procurementHeading.className = "pdf-doc-section-heading";
      procurementHeading.textContent = tr("siteLogProcurement");
      doc.appendChild(procurementHeading);
      doc.appendChild(buildProcurementTableElement(log, true));
    }

    var footerEl = document.createElement("div");
    footerEl.className = "pdf-doc-footer";
    footerEl.textContent = tr("reportPdfFooter");
    doc.appendChild(footerEl);

    return doc;
  }

  function shareSiteLogPdf(btn, buildElementFn, buildFileNameFn, dateISO) {
    var originalContent = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = "&#8987;";
    function restore() { btn.disabled = false; btn.innerHTML = originalContent; }
    var fileName = buildFileNameFn(dateISO);
    buildPdfBlobFromElement(buildElementFn(dateISO), fileName).then(function (result) {
      restore();
      attemptShare(result.blob, result.fileName);
    }).catch(function (err) {
      console.error(err);
      restore();
      alert(tr("reportPdfError"));
    });
  }

  siteLogAttendanceShareBtn.addEventListener("click", function () {
    if (!activeSiteLogDate) return;
    shareSiteLogPdf(siteLogAttendanceShareBtn, buildSiteLogAttendancePdfElement, function (dateISO) {
      return tr("siteLogAttendanceReportFileNamePrefix") + " " + activeSheet().name + " " + isoToFileNameDate(dateISO) + ".pdf";
    }, activeSiteLogDate);
  });
  siteLogToolsShareBtn.addEventListener("click", function () {
    if (!activeSiteLogDate) return;
    shareSiteLogPdf(siteLogToolsShareBtn, buildSiteLogToolsPdfElement, function (dateISO) {
      return tr("siteLogToolsReportFileNamePrefix") + " " + activeSheet().name + " " + isoToFileNameDate(dateISO) + ".pdf";
    }, activeSiteLogDate);
  });
  siteLogProcurementShareBtn.addEventListener("click", function () {
    if (!activeSiteLogDate) return;
    shareSiteLogPdf(siteLogProcurementShareBtn, buildSiteLogProcurementPdfElement, function (dateISO) {
      return tr("siteLogProcurementReportFileNamePrefix") + " " + activeSheet().name + " " + isoToFileNameDate(dateISO) + ".pdf";
    }, activeSiteLogDate);
  });

  function waitForImagesLoaded(container) {
    var imgs = Array.prototype.slice.call(container.querySelectorAll("img"));
    return Promise.all(imgs.map(function (img) {
      if (img.complete) return Promise.resolve();
      return new Promise(function (resolve) {
        img.addEventListener("load", resolve);
        img.addEventListener("error", resolve);
      });
    }));
  }

  var loadedScripts = {};
  function loadScriptOnce(src) {
    if (!loadedScripts[src]) {
      loadedScripts[src] = new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    return loadedScripts[src];
  }

  var appToastEl = document.getElementById("appToast");
  var appToastTimer = null;
  function showToast(message, duration) {
    if (!appToastEl) return;
    appToastEl.textContent = message;
    appToastEl.classList.add("app-toast-visible");
    clearTimeout(appToastTimer);
    appToastTimer = setTimeout(function () {
      appToastEl.classList.remove("app-toast-visible");
    }, duration || 4500);
  }

  function downloadBlob(blob, fileName) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = sanitizeFileName(fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function sanitizeFileName(name) {
    // "/" (and other path-separator-like characters) silently truncate a
    // shared/downloaded file's name down to whatever follows the last one -
    // this is the last line of defense on top of using isoToFileNameDate()
    // at each call site, since a free-typed project/report name could also
    // contain one.
    return name.replace(/[\\/:*?"<>|]/g, "-");
  }

  function blobToBase64(blob) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onloadend = function () {
        var result = reader.result || "";
        var commaIdx = result.indexOf(",");
        resolve(commaIdx === -1 ? result : result.slice(commaIdx + 1));
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function shareViaCapacitor(blob, fileName) {
    var Filesystem = window.Capacitor.Plugins.Filesystem;
    var Share = window.Capacitor.Plugins.Share;
    return blobToBase64(blob).then(function (base64) {
      return Filesystem.writeFile({ path: fileName, data: base64, directory: "CACHE" });
    }).then(function (result) {
      return Share.share({ title: fileName, files: [result.uri] });
    });
  }

  function attemptShare(blob, fileName, mimeType) {
    fileName = sanitizeFileName(fileName);
    if (capacitorShareAvailable) {
      shareViaCapacitor(blob, fileName).catch(function (err) {
        if (err && err.message && /share canceled|cancel/i.test(err.message)) return;
        downloadBlob(blob, fileName);
        showToast(tr("shareFallbackToSaveMsg"));
      });
      return;
    }
    var file = new File([blob], fileName, { type: mimeType || "application/pdf" });
    var shareData = { files: [file], title: fileName };
    // Some Android browsers support sharing files via navigator.share()
    // without exposing (or correctly answering) navigator.canShare, so
    // don't let a missing/false canShare rule out trying share() itself -
    // only skip it when share() is entirely absent. An installed/standalone
    // PWA in particular often can't share files at all even though the same
    // browser engine supports it fine in a normal tab - when that forces
    // the fallback to a plain download, say so, or it just looks like the
    // share button silently did the wrong thing.
    var hasShare = !!navigator.share;
    var canShareResult = navigator.canShare ? navigator.canShare(shareData) : "missing";
    var canShareFiles = hasShare && (canShareResult === "missing" || canShareResult);
    if (canShareFiles) {
      try {
        navigator.share(shareData).catch(function (err) {
          if (err && err.name === "AbortError") return;
          downloadBlob(blob, fileName);
          showToast(tr("shareFallbackToSaveMsg"));
        });
        return;
      } catch (err) {
        downloadBlob(blob, fileName);
        showToast(tr("shareFallbackToSaveMsg"));
        return;
      }
    }
    downloadBlob(blob, fileName);
    showToast(tr("shareFallbackToSaveMsg"));
  }

  function buildPdfBlobFromElement(element, fileName) {
    var ready = (window.html2canvas && window.jspdf) ? Promise.resolve() : Promise.all([
      window.html2canvas ? Promise.resolve() : loadScriptOnce("vendor/html2canvas.min.js"),
      window.jspdf ? Promise.resolve() : loadScriptOnce("vendor/jspdf.umd.min.js")
    ]);
    return ready.then(function () {
      var container = document.createElement("div");
      container.className = "pdf-doc-wrap";
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "-99999px";
      container.appendChild(element);
      document.body.appendChild(container);

      return waitForImagesLoaded(container).then(function () {
        return window.html2canvas(container, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
      }).then(function (canvas) {
        var pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
        var pageWidth = pdf.internal.pageSize.getWidth();
        var pageHeight = pdf.internal.pageSize.getHeight();
        var imgWidth = pageWidth;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var imgData = canvas.toDataURL("image/jpeg", 0.92);
        var heightLeft = imgHeight;
        var position = 0;
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft > 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        document.body.removeChild(container);
        return { blob: pdf.output("blob"), fileName: fileName };
      }).catch(function (err) {
        if (container.parentNode) document.body.removeChild(container);
        throw err;
      });
    });
  }

  function buildReportPdfBlob(report) {
    var typeLabel = report.type === "meeting" ? tr("reportTypeMeeting") : tr("reportTypeTour");
    var fileName = (report.title || typeLabel) + ".pdf";
    return buildPdfBlobFromElement(buildReportPdfElement(report), fileName);
  }

  // Cache the last generated PDF per report so tapping "share" can call
  // navigator.share() synchronously from the click handler - both iOS
  // Safari and Android Chrome drop/reject the share sheet (NotAllowedError)
  // if it's invoked after the async html2canvas/jsPDF work, since that
  // spends the click's user activation. The share button stays disabled
  // (with a spinner) until a fresh PDF is actually cached and ready, so a
  // real tap can never fall through to the slow, activation-losing path.
  var REPORT_SHARE_ICON = "&#128228;";
  var REPORT_SHARE_SPINNER = "&#8987;";
  var reportPdfCache = {};
  var reportPdfCacheTimer = null;
  function setShareBtnReady(ready) {
    reportShareBtn.disabled = !ready;
    reportShareBtn.innerHTML = ready ? REPORT_SHARE_ICON : REPORT_SHARE_SPINNER;
  }
  function scheduleReportPdfCacheRefresh(report) {
    var hadCache = !!reportPdfCache[report.id];
    delete reportPdfCache[report.id];
    if (reportPdfCacheTimer) clearTimeout(reportPdfCacheTimer);
    setShareBtnReady(false);
    // On first open there's nothing to show yet, so start building right
    // away - every extra millisecond of delay here is a millisecond closer
    // to losing the share button's user-activation window if it's tapped
    // quickly. Only debounce repeat rebuilds triggered by fast edits.
    reportPdfCacheTimer = setTimeout(function () {
      buildReportPdfBlob(report).then(function (result) {
        reportPdfCache[report.id] = result;
        if (activeReportId === report.id) setShareBtnReady(true);
      }).catch(function () {
        if (activeReportId === report.id) setShareBtnReady(true);
      });
    }, hadCache ? 900 : 0);
  }

  function generateReportPdf(report, mode) {
    var cached = reportPdfCache[report.id];
    if (cached) {
      if (mode === "save") downloadBlob(cached.blob, cached.fileName);
      else attemptShare(cached.blob, cached.fileName);
      return;
    }
    var activeBtn = mode === "save" ? reportSaveBtn : reportShareBtn;
    var originalBtnContent = activeBtn.innerHTML;
    function restoreBtn() {
      activeBtn.disabled = false;
      activeBtn.innerHTML = originalBtnContent;
    }
    activeBtn.disabled = true;
    activeBtn.innerHTML = "&#8987;";
    buildReportPdfBlob(report).then(function (result) {
      restoreBtn();
      reportPdfCache[report.id] = result;
      if (mode === "save") downloadBlob(result.blob, result.fileName);
      else attemptShare(result.blob, result.fileName);
    }).catch(function (err) {
      console.error(err);
      restoreBtn();
      alert(tr("reportPdfError"));
    });
  }

  reportShareBtn.addEventListener("click", function () {
    var report = findReport(activeReportId);
    if (!report) return;
    generateReportPdf(report, "share");
  });
  reportSaveBtn.addEventListener("click", function () {
    var report = findReport(activeReportId);
    if (!report) return;
    generateReportPdf(report, "save");
  });

  menuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!state.menuOpen) closeSearch();
    state.menuOpen = !state.menuOpen;
    render();
  });
  document.addEventListener("click", function (e) {
    if (state.menuOpen && !menuPanel.contains(e.target) && e.target !== menuBtn) {
      state.menuOpen = false;
      render();
    }
  });

  function runSearch(query) {
    searchResults.innerHTML = "";
    var q = query.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = '<div class="search-empty">' + tr("searchEmptyPrompt") + '</div>';
      return;
    }
    var matches = [];
    allSheets().forEach(function (sheet) {
      sheet.tasks.forEach(function (t) {
        if (t.text.toLowerCase().indexOf(q) !== -1) {
          matches.push({ task: t, sheetId: sheet.id, sheetName: sheet.name });
        }
      });
    });
    matches.sort(function (a, b) { return b.task.createdAt - a.task.createdAt; });
    matches = matches.slice(0, 30);
    if (!matches.length) {
      searchResults.innerHTML = '<div class="search-empty">' + tr("searchNoResults") + '</div>';
      return;
    }
    matches.forEach(function (m) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "search-result";

      var textEl = document.createElement("span");
      textEl.className = "search-result-text";
      textEl.textContent = m.task.text;

      var metaEl = document.createElement("span");
      metaEl.className = "search-result-meta";
      metaEl.textContent = m.sheetName + " · " + isoToFullDisplay(m.task.date);

      btn.appendChild(textEl);
      btn.appendChild(metaEl);
      btn.addEventListener("click", function () {
        data.activeSheetId = m.sheetId;
        state.viewDate = clampViewDate(m.task.date);
        closeSearch();
        render();
      });
      searchResults.appendChild(btn);
    });
  }

  function openSearch() {
    state.searchOpen = true;
    searchPanel.hidden = false;
    searchBtn.setAttribute("aria-expanded", "true");
    runSearch(searchInput.value);
    searchInput.focus();
  }
  function closeSearch() {
    state.searchOpen = false;
    searchPanel.hidden = true;
    searchBtn.setAttribute("aria-expanded", "false");
  }

  searchBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (state.searchOpen) {
      closeSearch();
    } else {
      state.menuOpen = false;
      menuPanel.hidden = true;
      menuBtn.setAttribute("aria-expanded", "false");
      openSearch();
    }
  });
  searchInput.addEventListener("click", function (e) { e.stopPropagation(); });
  searchInput.addEventListener("input", function () { runSearch(searchInput.value); });
  searchInput.addEventListener("keydown", function (e) {
    e.stopPropagation();
    if (e.key === "Escape") closeSearch();
  });
  document.addEventListener("click", function (e) {
    if (state.searchOpen && !searchPanel.contains(e.target) && e.target !== searchBtn) {
      closeSearch();
    }
  });

  // Ended sheets used to drop out of the tab bar entirely once the viewed
  // date passed their end date, which made an ended project's tab - and the
  // long-press "reactivate" action on it - permanently unreachable. Now the
  // archive view (toggled by viewingArchive) is a dedicated, always-reachable
  // way to get to them instead: normal browsing only ever shows active
  // (non-ended) sheets, and the archive view shows only ended ones, in the
  // exact same tab bar/task list.
  var viewingArchive = false;
  var lastActiveSheetIdBeforeArchive = null;
  // Tabs (and swiping between them) go in alphabetical order of the
  // project names, by the rules of the app's current language (numbers
  // in names compare as numbers: "פרויקט 2" before "פרויקט 10"); Head
  // Office's own tab stays first, and private projects come before shared
  // ones (they're two rows of tabs; swiping goes through both in turn).
  function compareSheetNames(a, b) {
    if (a.id === HEAD_OFFICE_SHEET_ID) return -1;
    if (b.id === HEAD_OFFICE_SHEET_ID) return 1;
    if (!!a.shared !== !!b.shared) return a.shared ? 1 : -1; // private row, then shared
    return String(a.name || "").localeCompare(String(b.name || ""), calLocale(), { numeric: true, sensitivity: "base" });
  }
  function visibleSheets() {
    return allSheets().filter(function (s) {
      if (s.id === HEAD_OFFICE_SHEET_ID) return isHeadOfficeMode && !viewingArchive;
      if (isHeadOfficeMode && !s.shared) return false;
      return !!s.ended === viewingArchive;
    }).sort(compareSheetNames);
  }
  // An ended project's task view is a record of how things stood the day it
  // ended - it's pinned to (and can never browse past) sheet.endedDate. Every
  // place that changes state.viewDate routes through clampViewDate so this
  // holds no matter how the date got changed (swipe, calendar, today button,
  // jumping to a task, a notification deep link, switching archived tabs...).
  function maxViewDateForSheet(sheet) {
    return (sheet && sheet.ended && sheet.endedDate) ? sheet.endedDate : null;
  }
  function clampViewDate(dateISO) {
    var max = maxViewDateForSheet(activeSheet());
    return (max && dateISO > max) ? max : dateISO;
  }
  function enterArchiveView() {
    if (viewingArchive) return;
    var endedSheets = allSheets().filter(function (s) { return s.ended; });
    if (!endedSheets.length) { showToast(tr("noArchivedProjectsMsg")); return; }
    lastActiveSheetIdBeforeArchive = data.activeSheetId;
    viewingArchive = true;
    data.activeSheetId = endedSheets[0].id;
    state.viewDate = endedSheets[0].endedDate || todayISO();
    state.viewMode = "tasks";
    state.showingCompleted = false;
    render();
  }
  function exitArchiveView() {
    if (!viewingArchive) return;
    viewingArchive = false;
    state.viewDate = todayISO();
    var activeSheets = allSheets().filter(function (s) { return !s.ended; });
    var restored = activeSheets.find(function (s) { return s.id === lastActiveSheetIdBeforeArchive; });
    data.activeSheetId = (restored || activeSheets[0] || {}).id || data.activeSheetId;
  }

  // Builds one sheet's tab element into the given bar - shared by both the
  // private and shared rows below, so a tab behaves identically (rename,
  // long-press action menu, marquee overflow scroll) regardless of which
  // row it's rendered into.
  function appendSheetTab(bar, sheet) {
    var tab = document.createElement("div");
    tab.className = "sheet-tab" + (sheet.id === data.activeSheetId ? " active" : "") + (sheet.ended ? " ended" : "");
    tab.dataset.sheetId = sheet.id;

    if (state.renamingSheetId === sheet.id) {
      var input = document.createElement("input");
      input.className = "rename-input";
      input.value = sheet.name;
      input.maxLength = 40;
      input.addEventListener("click", function (e) { e.stopPropagation(); });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { commitRename(sheet.id, input.value); }
        if (e.key === "Escape") { state.renamingSheetId = null; render(); }
      });
      input.addEventListener("blur", function () { commitRename(sheet.id, input.value); });
      tab.appendChild(input);
      bar.appendChild(tab);
      input.focus();
      input.select();
      return;
    }

    var label = document.createElement("span");
    label.className = "sheet-tab-label";
    label.textContent = (sheet.shared ? "👥 " : "") + sheet.name;
    tab.appendChild(label);
    tab.title = sheet.id === data.activeSheetId ? tr("clickToRename") : sheet.name;

    if (sheet.shared) {
      var unreadCount = getUnreadCount(sheet);
      if (unreadCount > 0) {
        var unreadBadge = document.createElement("span");
        unreadBadge.className = "sheet-tab-unread-badge";
        unreadBadge.textContent = unreadCount > 99 ? "99+" : String(unreadCount);
        tab.appendChild(unreadBadge);
      }
    }

    // The "משרד ראשי" virtual tab has no name to rename and nothing to
    // move/share/delete via the long-press menu - a plain tap just selects
    // it, same as any other tab, with no rename or long-press wiring at all.
    var isHeadOfficeSheetTab = sheet.id === HEAD_OFFICE_SHEET_ID;

    var tabLongPressFired = false;
    tab.addEventListener("click", function () {
      if (tabLongPressFired) { tabLongPressFired = false; return; }
      if (isHeadOfficeSheetTab) {
        selectSheet(sheet.id);
      } else if (sheet.id === data.activeSheetId) {
        state.renamingSheetId = sheet.id;
        render();
      } else {
        selectSheet(sheet.id);
      }
    });
    if (!isHeadOfficeSheetTab) {
      tab.addEventListener("dblclick", function (e) {
        e.stopPropagation();
        data.activeSheetId = sheet.id;
        state.renamingSheetId = sheet.id;
        render();
      });

      var tabPressStartX = 0, tabPressStartY = 0;
      var startTabPress = function (e) {
        var point = e.touches ? e.touches[0] : e;
        tabPressStartX = point.clientX;
        tabPressStartY = point.clientY;
        tabLongPressFired = false;
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(function () {
          tabLongPressFired = true;
          openSheetActionModal(sheet.id);
        }, 1000);
      };
      var cancelTabPress = function () {
        clearTimeout(longPressTimer);
      };
      var moveTabPress = function (e) {
        var point = e.touches ? e.touches[0] : e;
        if (Math.abs(point.clientX - tabPressStartX) > 10 || Math.abs(point.clientY - tabPressStartY) > 10) {
          cancelTabPress();
        }
      };
      tab.addEventListener("mousedown", startTabPress);
      tab.addEventListener("mouseup", cancelTabPress);
      tab.addEventListener("mouseleave", cancelTabPress);
      tab.addEventListener("mousemove", moveTabPress);
      tab.addEventListener("touchstart", startTabPress, { passive: true });
      tab.addEventListener("touchend", cancelTabPress);
      tab.addEventListener("touchmove", moveTabPress, { passive: true });
    }

    bar.appendChild(tab);

    var tabStyle = getComputedStyle(tab);
    var availableWidth = tab.clientWidth - parseFloat(tabStyle.paddingLeft) - parseFloat(tabStyle.paddingRight);
    var overflowPx = label.scrollWidth - availableWidth;
    if (overflowPx > 2) {
      var gapPx = 24;
      var track = document.createElement("span");
      track.className = "marquee-track";
      tab.insertBefore(track, label);
      track.appendChild(label);
      var clone = label.cloneNode(true);
      clone.classList.add("sheet-tab-label-clone");
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);

      var segment = label.scrollWidth + gapPx;
      track.style.setProperty("--marquee-segment", segment + "px");
      track.style.animationDuration = Math.max(4, segment / 40) + "s";
    }
  }

  function appendAddBtn(bar, titleKey, onClick) {
    var addBtn = document.createElement("button");
    addBtn.className = "sheet-tab add-sheet-tab";
    addBtn.type = "button";
    addBtn.title = tr(titleKey);
    var addSheetBtnImg = document.createElement("img");
    addSheetBtnImg.src = "tasks-plus-icon.webp";
    addSheetBtnImg.alt = "+";
    addBtn.appendChild(addSheetBtnImg);
    addBtn.addEventListener("click", onClick);
    bar.appendChild(addBtn);
  }

  // The private and shared projects are rendered as two separate rows
  // (rather than one mixed, category-tagged row) so each stays a short,
  // easy-to-scan strip on its own - the row holding the currently active
  // tab is always the one closer to the task list below it (via flex
  // `order`), so switching between a private and a shared project visibly
  // swaps which row is "in front."
  function renderSheetsBar() {
    clearTimeout(longPressTimer);
    sheetsBarPrivate.innerHTML = "";
    sheetsBarShared.innerHTML = "";

    var privateSheets = visibleSheets().filter(function (s) { return !s.shared; });
    var sharedSheetsVisible = visibleSheets().filter(function (s) { return s.shared; });

    privateSheets.forEach(function (sheet) { appendSheetTab(sheetsBarPrivate, sheet); });
    if (!viewingArchive && !isHeadOfficeMode) appendAddBtn(sheetsBarPrivate, "addProjectTitle", function () { addSheet(); });

    sharedSheetsVisible.forEach(function (sheet) { appendSheetTab(sheetsBarShared, sheet); });
    if (!viewingArchive && !isHeadOfficeMode) appendAddBtn(sheetsBarShared, "addSharedProjectTitle", function () { openSharedProjectModal(); });

    var active = activeSheet();
    var activeIsShared = !!(active && active.shared);
    sheetsBarPrivate.style.order = activeIsShared ? "0" : "1";
    sheetsBarShared.style.order = activeIsShared ? "1" : "0";

    if (data.activeSheetId !== lastScrolledSheetId) {
      lastScrolledSheetId = data.activeSheetId;
      var visible = activeIsShared ? sharedSheetsVisible : privateSheets;
      var activeBar = activeIsShared ? sheetsBarShared : sheetsBarPrivate;
      var activeIndex = visible.findIndex(function (s) { return s.id === data.activeSheetId; });
      var anchorSheet = activeIndex > 0 ? visible[activeIndex - 1] : visible[activeIndex];
      if (anchorSheet) {
        var anchorTabEl = activeBar.querySelector('[data-sheet-id="' + anchorSheet.id + '"]');
        if (anchorTabEl) {
          anchorTabEl.scrollIntoView({ inline: "start", block: "nearest", behavior: "smooth" });
        }
      }
    }
  }

  function currentTimeHHMM() {
    var d = new Date();
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }

  var addTypeOverlay = document.getElementById("addTypeOverlay");
  var addTypeTaskBtn = document.getElementById("addTypeTaskBtn");
  var addTypeNoteBtn = document.getElementById("addTypeNoteBtn");
  var addTypeCancelBtn = document.getElementById("addTypeCancelBtn");
  var pendingNewTaskText = null;

  function closeAddTypeModal() {
    addTypeOverlay.hidden = true;
    pendingNewTaskText = null;
  }

  function addPendingTask(type) {
    if (!pendingNewTaskText) return;
    var newTask = {
      id: uid(),
      text: pendingNewTaskText,
      status: 0,
      urgent: false,
      type: type,
      date: state.viewDate,
      createdAt: Date.now()
    };
    if (type === "note") newTask.time = currentTimeHHMM();
    if (isHeadOfficeMode) newTask.isHeadOffice = true;
    var sheet = activeSheet();
    sheet.tasks.push(newTask);
    saveData();
    if (sheet.shared && type === "task") {
      sendChatSystemMessage(sheet.id, "added", newTask.text, myPhoneNumber);
    }
    taskInput.value = "";
    closeAddTypeModal();
    render();
    taskInput.focus();
  }

  addTypeTaskBtn.addEventListener("click", function () { addPendingTask("task"); });
  addTypeNoteBtn.addEventListener("click", function () { addPendingTask("note"); });
  addTypeCancelBtn.addEventListener("click", closeAddTypeModal);
  addTypeOverlay.addEventListener("click", function (e) {
    if (e.target === addTypeOverlay) closeAddTypeModal();
  });

  // A typed line is always a task; it becomes a note (מזכרת) from the
  // long-press menu ("הפוך למזכרת").
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = taskInput.value.trim();
    if (!text) return;
    pendingNewTaskText = text;
    addPendingTask("task");
  });

  function cycleStatus(id, inSheet) {
    var sheet = inSheet || activeSheet();
    var t = sheet.tasks.find(function (x) { return x.id === id; });
    if (t) {
      var wasDone = t.status === 2;
      t.status = (t.status + 1) % 3;
      if (t.planItemId) workPlanTaskStatusChanged(sheet, t);
      if (t.planRef) workPlanRefStatusChanged(t);
      saveData();
      if (sheet.shared && t.type === "task" && wasDone !== (t.status === 2)) {
        sendChatSystemMessage(sheet.id, t.status === 2 ? "done" : "undone", t.text, myPhoneNumber);
      }
      render();
      if (wasDone && t.status !== 2 && t.type === "task" && t.logEntry) {
        removeTaskFromSiteLogWorks(sheet, t);
      }
    }
  }

  function transferTaskToSiteLogWorks(sheet, task) {
    var log = findOrCreateSiteLog(sheet, task.date);
    var entry = { id: uid(), text: tr("taskDoneLogPrefix") + " " + task.text, attachment: null };
    log.works.push(entry);
    task.logEntry = { date: task.date, entryId: entry.id };
    saveData();
    showToast(tr("taskTransferredToLogMsg"));
  }

  // Undoes transferTaskToSiteLogWorks() above - marking the task not-done
  // again after it was auto-copied into the day's work log removes that
  // same log entry, rather than leaving a stale "בוצע ..." row behind for
  // work that (per the task itself) never actually got done.
  function removeTaskFromSiteLogWorks(sheet, task) {
    var log = findSiteLog(sheet, task.logEntry.date);
    if (log) {
      log.works = log.works.filter(function (w) { return w.id !== task.logEntry.entryId; });
    }
    task.logEntry = null;
    saveData();
    showToast(tr("taskRemovedFromLogMsg"));
  }

  function removeTask(id) {
    var sheet = activeSheet();
    var t = sheet.tasks.find(function (x) { return x.id === id; });
    sheet.tasks = sheet.tasks.filter(function (x) { return x.id !== id; });
    if (t && t.planItemId) workPlanTaskRemoved(sheet, t);
    saveData();
    if (sheet.shared && t && t.type === "task") {
      sendChatSystemMessage(sheet.id, "deleted", t.text, myPhoneNumber);
    }
    render();
  }

  function toggleUrgent(id) {
    var t = activeSheet().tasks.find(function (x) { return x.id === id; });
    if (t) {
      t.urgent = !t.urgent;
      saveData();
      render();
    }
  }

  function commitTaskText(id, value) {
    var t = activeSheet().tasks.find(function (x) { return x.id === id; });
    var trimmed = value.trim();
    if (t && trimmed) {
      t.text = trimmed.slice(0, 200);
      if (t.planItemId) workPlanTaskRenamed(activeSheet(), t);
    }
    state.editingTaskId = null;
    saveData();
    render();
  }

  var URGENT_CIRCLE_SVG = '<svg viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg"><circle cx="5.5" cy="5.5" r="4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';

  // Highlights whichever of the 4 footer icons the user is "inside" right
  // now. Checks state.viewMode directly (not the DOM's hidden attributes,
  // which this is called from render() before those get updated for the
  // current render - they'd still reflect the previous one). The
  // library's folder-detail screen is still a genuine full-screen overlay
  // that doesn't go through render(), so it calls this directly itself.
  function updateActiveFabHighlight() {
    [tasksFabBtn, calendarFabBtn, reportFabBtn, chatBtn, libraryBtn, archiveBtn].forEach(function (btn) {
      btn.classList.remove("fab-active");
    });
    var active;
    workPlanBtn.classList.remove("fab-active");
    if (!workPlanView.hidden) active = workPlanBtn;
    else if (state.viewMode === "chat") active = chatBtn;
    else if (state.viewMode === "library" || !libraryView.hidden) active = libraryBtn;
    else if (viewingArchive) active = archiveBtn;
    else if (state.viewMode === "reports") active = reportFabBtn;
    else if (state.viewMode === "diary") active = calendarFabBtn;
    else active = tasksFabBtn;
    active.classList.add("fab-active");
  }

  var chatWasActiveLastRender = false;
  function render() {
    appLoadingOverlay.hidden = true;
    syncWorkPlanTasks();
    clearTimeout(longPressTimer);
    if (chatWasActiveLastRender && state.viewMode !== "chat") teardownChatView();
    chatWasActiveLastRender = state.viewMode === "chat";
    if (isHeadOfficeMode) {
      ensureHeadOfficeSheet();
      syncHeadOfficeVirtualTasks();
      // Jump straight to the tasks page and the "משרד ראשי" tab every time
      // Head Office mode is ENTERED - on app launch already in that mode,
      // and again on every later toggle-on mid-session (not on every
      // render while already in it, which would keep yanking the user back
      // off whatever tab/screen they'd since navigated to).
      if (!wasHeadOfficeModeLastRender) {
        data.activeSheetId = HEAD_OFFICE_SHEET_ID;
        state.viewMode = "tasks";
      }
    }
    wasHeadOfficeModeLastRender = isHeadOfficeMode;
    var visibleForDate = visibleSheets();
    if (visibleForDate.length && data.activeSheetId !== pendingOpenChatSheetId &&
        !visibleForDate.some(function (s) { return s.id === data.activeSheetId; })) {
      data.activeSheetId = visibleForDate[0].id;
      if (visibleForDate[0].ended && visibleForDate[0].endedDate) state.viewDate = visibleForDate[0].endedDate;
    }
    renderSheetsBar();

    menuPanel.hidden = !state.menuOpen;
    menuBtn.setAttribute("aria-expanded", String(state.menuOpen));
    // Head Office mode trades the per-project diary/log icon and the
    // meetings-tours report icon for one icon that produces a report
    // combining every shared project at once (see officeReportsBtn below).
    calendarFabBtn.hidden = isHeadOfficeMode;
    officeReportsBtn.hidden = !isHeadOfficeMode;
    officeDataBtn.hidden = !isHeadOfficeMode;
    reportFabBtn.hidden = isHeadOfficeMode;

    var STATUS_LABEL = { 0: tr("statusPartial"), 1: tr("statusDone"), 2: tr("statusReset") };

    var today = todayISO();
    var isToday = state.viewDate === today;
    var isPast = state.viewDate < today;
    var isFuture = state.viewDate > today;
    var editable = !isPast;
    dateLabel.textContent = isoToFullDisplay(state.viewDate);
    dateInput.value = state.viewDate;
    var activeMaxDate = maxViewDateForSheet(activeSheet());
    if (activeMaxDate) dateInput.max = activeMaxDate;
    else dateInput.removeAttribute("max");
    todayBtn.hidden = isToday;
    sheetTitle.textContent = activeSheet().name;
    renderSheetTitleLogo();
    chatBtn.hidden = !activeSheet().shared;
    if (activeSheet().shared) {
      var activeUnread = getUnreadCount(activeSheet());
      chatFabBadge.hidden = activeUnread <= 0;
      chatFabBadge.textContent = activeUnread > 99 ? "99+" : String(activeUnread);
    } else {
      chatFabBadge.hidden = true;
    }

    updateActiveFabHighlight();

    var reportsMode = state.viewMode === "reports";
    var diaryMode = state.viewMode === "diary";
    var libraryMode = state.viewMode === "library";
    var chatMode = state.viewMode === "chat";
    taskList.hidden = reportsMode || diaryMode || libraryMode || chatMode;
    taskReminderIconsLayer.hidden = taskList.hidden;
    emptyState.hidden = reportsMode || diaryMode || libraryMode || chatMode;
    if (reportsMode || diaryMode || libraryMode || chatMode) emptyState.style.display = "none";
    sheetReportsList.hidden = !reportsMode;
    diaryView.hidden = !diaryMode;
    libraryFoldersView.hidden = !libraryMode;
    chatView.hidden = !chatMode;
    document.getElementById("sketchBtn").hidden = libraryMode; // no sketch icon in the library
    ruledBodyEl.classList.toggle("chat-mode", chatMode);
    if (reportsMode) {
      addForm.hidden = true;
      showCompletedTasksBtn.hidden = true;
      showActiveTasksBtn.hidden = true;
      renderSheetReportsList();
      return;
    }
    if (diaryMode) {
      addForm.hidden = true;
      showCompletedTasksBtn.hidden = true;
      showActiveTasksBtn.hidden = true;
      // Kept in sync here (not just on entry) so changing the date via the
      // normal top date controls/swipe while already in diary mode updates
      // which day's log the icons below point to, same as it always did.
      activeSiteLogDate = state.viewDate;
      updateSiteLogCloseShareButtons();
      updateBudgetTile();
      return;
    }
    if (libraryMode) {
      addForm.hidden = true;
      showCompletedTasksBtn.hidden = true;
      showActiveTasksBtn.hidden = true;
      // Kept in sync here (not just on entry) so switching project tabs
      // while already in library mode updates whose folders are shown,
      // same as diary mode does for the date above.
      activeLibrarySheetId = activeSheet().id;
      renderLibraryFolders();
      return;
    }
    if (chatMode) {
      addForm.hidden = true;
      showCompletedTasksBtn.hidden = true;
      showActiveTasksBtn.hidden = true;
      var chatSheet = activeSheet();
      // A sheet switch while chat is open can land on a non-shared
      // project, which has no chat at all - fall back to tasks mode for
      // it instead of showing an empty/broken chat screen.
      if (!chatSheet.shared) {
        state.viewMode = "tasks";
        render();
        return;
      }
      // Kept in sync here (not just on entry) so switching project tabs
      // while already in chat mode switches to that project's own chat,
      // same as diary/library do above for their own per-project state.
      if (activeChatSheetId !== chatSheet.id) {
        activeChatSheetId = chatSheet.id;
        chatForceScrollNext = true;
        markChatRead(chatSheet);
        markMessagesReadOnServer(chatSheet.id);
      }
      renderChatMessages();
      return;
    }
    // The "הזמנות רכש" virtual sheet has nothing addable - its tasks are
    // entirely system-generated notification entries (see
    // syncHeadOfficeVirtualTasks), never created by hand - but browsing
    // completed ones works the same as any other project.
    var isHeadOfficeVirtualSheet = activeSheet().id === HEAD_OFFICE_SHEET_ID;
    showCompletedTasksBtn.hidden = viewingArchive || state.showingCompleted;
    showActiveTasksBtn.hidden = viewingArchive || !state.showingCompleted;
    addForm.hidden = isPast || state.showingCompleted || isHeadOfficeVirtualSheet;

    // Browsing completed tasks shows every done task across every date in
    // this project at once (not just state.viewDate), so each row's own
    // date matters and nothing here is editable - same readonly treatment
    // a past date already gets, just reused via rowEditable instead of
    // editable so the normal per-date view's own editability is untouched.
    var sheetTasks, visible;
    if (state.showingCompleted) {
      sheetTasks = activeSheet().tasks.filter(function (t) { return t.status === 2; });
      visible = sheetTasks.slice().sort(function (a, b) {
        if (a.date !== b.date) return a.date < b.date ? 1 : -1;
        return a.createdAt - b.createdAt;
      });
    } else {
      sheetTasks = activeSheet().tasks.filter(function (t) { return t.date === state.viewDate; });
      visible = sheetTasks.slice().sort(function (a, b) {
        return a.createdAt - b.createdAt;
      });
    }
    var rowEditable = editable && !state.showingCompleted && !isHeadOfficeVirtualSheet;

    // Rebuilding the list via innerHTML resets its own scroll position to
    // the top - restoring it afterward (the browser clamps automatically
    // if the list got shorter) keeps a long, scrolled-down list from
    // jumping back up every time, e.g. after deleting one task near the
    // bottom.
    var taskListScrollTop = taskList.scrollTop;
    taskList.innerHTML = "";
    var reminderRowsForIconsLayer = [];
    var migratedCalendarReminders = false;
    visible.forEach(function (t) {
      var isNote = t.type === "note";
      var li = document.createElement("li");
      li.className = "task" + (t.status === 1 ? " partial" : "") + (t.status === 2 ? " done" : "") + (rowEditable ? "" : " readonly") + (t.isHeadOffice ? " head-office-task" : "") + (t.headOfficeVirtual ? " head-office-notification-task" : "");
      li.dataset.taskId = t.id;
      var longPressFired = false;
      if (rowEditable && state.editingTaskId !== t.id) {
        li.addEventListener("click", function () {
          if (longPressFired) { longPressFired = false; return; }
          if (isNote) return;
          cycleStatus(t.id);
        });

        var pressStartX = 0, pressStartY = 0;
        var startPress = function (e) {
          if (e.target.closest("input, button")) return;
          var point = e.touches ? e.touches[0] : e;
          pressStartX = point.clientX;
          pressStartY = point.clientY;
          longPressFired = false;
          clearTimeout(longPressTimer);
          longPressTimer = setTimeout(function () {
            longPressFired = true;
            openMoveTaskModal(t.id);
          }, 1000);
        };
        var cancelPress = function () {
          clearTimeout(longPressTimer);
        };
        var movePress = function (e) {
          var point = e.touches ? e.touches[0] : e;
          if (Math.abs(point.clientX - pressStartX) > 10 || Math.abs(point.clientY - pressStartY) > 10) {
            cancelPress();
          }
        };
        li.addEventListener("mousedown", startPress);
        li.addEventListener("mouseup", cancelPress);
        li.addEventListener("mouseleave", cancelPress);
        li.addEventListener("mousemove", movePress);
        li.addEventListener("touchstart", startPress, { passive: true });
        li.addEventListener("touchend", cancelPress);
        li.addEventListener("touchmove", movePress, { passive: true });
      } else if (t.headOfficeVirtual) {
        // Not editable (handled above via rowEditable=false for this whole
        // sheet) - tapping one of these notification rows instead jumps
        // straight to that specific project's procurement list for that
        // date, with the same purchased-marking circles as the regular
        // combined procurement report.
        li.addEventListener("click", function () {
          openHeadOfficeNotificationTarget(t);
        });
      }

      var check, dot, timeLabel;
      if (isNote) {
        timeLabel = document.createElement("span");
        timeLabel.className = "note-time";
        timeLabel.textContent = t.time || "";
      } else {
        check = document.createElement("span");
        check.className = "row-mark";
        check.setAttribute("aria-hidden", "true");
        check.title = STATUS_LABEL[t.status];
        check.innerHTML = rowMarkSvg(t.status);
        // A notification row in "משרד ראשי" isn't otherwise editable (no
        // text edit, no move, no delete - see rowEditable above), but the
        // status mark and urgent dot still work exactly like a normal task
        // row, independent of the row's own click (which jumps to that
        // project's procurement list instead of cycling status) - each
        // stops its click from bubbling up to the row.
        if (t.headOfficeVirtual) {
          check.addEventListener("click", function (e) {
            e.stopPropagation();
            cycleStatus(t.id);
          });
        }

        dot = document.createElement("span");
        dot.className = "urgent-toggle" + (t.urgent ? " urgent" : "");
        dot.title = t.urgent ? tr("unmarkUrgent") : tr("markUrgent");
        dot.innerHTML = t.urgent ? "" : URGENT_CIRCLE_SVG;
        if (rowEditable || t.headOfficeVirtual) {
          dot.addEventListener("click", function (e) {
            e.stopPropagation();
            toggleUrgent(t.id);
          });
        }
      }

      var textEl;
      if (rowEditable && state.editingTaskId === t.id) {
        textEl = document.createElement("input");
        textEl.type = "text";
        textEl.className = "task-text-input";
        textEl.value = t.text;
        textEl.maxLength = 200;
        var editResolved = false;
        textEl.addEventListener("click", function (e) { e.stopPropagation(); });
        textEl.addEventListener("keydown", function (e) {
          e.stopPropagation();
          if (e.key === "Enter") {
            editResolved = true;
            commitTaskText(t.id, textEl.value);
          }
          if (e.key === "Escape") {
            editResolved = true;
            state.editingTaskId = null;
            render();
          }
        });
        textEl.addEventListener("blur", function () {
          if (!editResolved) {
            editResolved = true;
            commitTaskText(t.id, textEl.value);
          }
        });
      } else {
        textEl = document.createElement("span");
        textEl.className = "task-text";
        textEl.title = t.text;
        if (t.planItemId || t.planRef) {
          // from the work plan
          var planBadge = document.createElement("img");
          planBadge.className = "task-plan-badge";
          planBadge.src = "tasks-work-plan-icon.webp";
          planBadge.alt = "";
          textEl.appendChild(planBadge);
        }
        var textLabel = document.createElement("span");
        textLabel.className = "task-text-label";
        textLabel.textContent = t.text;
        textEl.appendChild(textLabel);
        if (rowEditable) {
          textEl.addEventListener("click", function (e) {
            e.stopPropagation();
            state.editingTaskId = t.id;
            render();
          });
        } else if (t.headOfficeVirtual) {
          // Same tap-vs-long-press split as a normal row's long-press (just
          // scoped to the text, since the icon/dot above already have their
          // own clicks) - a quick tap still navigates to that project's
          // procurement list, a sustained press offers to delete this
          // notification instead.
          var textLongPressFired = false;
          var textPressStartX = 0, textPressStartY = 0;
          var startTextPress = function (e) {
            var point = e.touches ? e.touches[0] : e;
            textPressStartX = point.clientX;
            textPressStartY = point.clientY;
            textLongPressFired = false;
            clearTimeout(longPressTimer);
            longPressTimer = setTimeout(function () {
              textLongPressFired = true;
              askConfirm(tr("confirmDeleteTask").replace("{name}", t.text), function () {
                dismissHeadOfficeNotification(t.id);
              });
            }, 1000);
          };
          var cancelTextPress = function () { clearTimeout(longPressTimer); };
          var moveTextPress = function (e) {
            var point = e.touches ? e.touches[0] : e;
            if (Math.abs(point.clientX - textPressStartX) > 10 || Math.abs(point.clientY - textPressStartY) > 10) cancelTextPress();
          };
          textEl.addEventListener("mousedown", startTextPress);
          textEl.addEventListener("mouseup", cancelTextPress);
          textEl.addEventListener("mouseleave", cancelTextPress);
          textEl.addEventListener("mousemove", moveTextPress);
          textEl.addEventListener("touchstart", startTextPress, { passive: true });
          textEl.addEventListener("touchend", cancelTextPress);
          textEl.addEventListener("touchmove", moveTextPress, { passive: true });
          textEl.addEventListener("click", function (e) {
            e.stopPropagation();
            if (textLongPressFired) { textLongPressFired = false; return; }
            openHeadOfficeNotificationTarget(t);
          });
        }
      }

      var actions = document.createElement("span");
      actions.className = "task-actions";
      if (!rowEditable) actions.hidden = true;
      var delBtn = document.createElement("button");
      delBtn.innerHTML = "&#10005;";
      delBtn.title = tr("deleteBtn");
      delBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        askConfirm(tr("confirmDeleteTask").replace("{name}", t.text), function () {
          removeTask(t.id);
        });
      });
      actions.appendChild(delBtn);

      var lead = document.createElement("span");
      lead.className = "row-lead";
      if (isNote) {
        lead.appendChild(timeLabel);
      } else {
        lead.appendChild(dot);
        lead.appendChild(check);
      }

      li.appendChild(lead);
      li.appendChild(textEl);
      if (t.status === 2 && t.date) {
        var dateBadge = document.createElement("span");
        dateBadge.className = "row-date";
        dateBadge.textContent = isoToDisplay(t.date);
        dateBadge.title = tr("completedOn") + isoToDisplay(t.date);
        li.appendChild(dateBadge);
      }
      li.appendChild(actions);
      taskList.appendChild(li);
      // done tasks keep their reminder (it comes back if un-marked) but it's paused
      // calendar-set reminders from before the split become links right
      // away, so the first render already shows the calendar icon
      if (migrateCalendarReminderToLink(t)) migratedCalendarReminders = true;
      var rowCalLink = calPlugin && isCalendarLinkShown(getMyCalendarLink(activeSheet(), t));
      var rowAlarm = isTaskReminderActive(t.reminder) && isMyTaskReminder(activeSheet(), t.reminder);
      if (t.status === 2) rowAlarm = false; // a done task's reminder is paused
      if (rowCalLink || rowAlarm) reminderRowsForIconsLayer.push({ task: t, editable: rowEditable, top: li.offsetTop, height: li.offsetHeight, calLink: rowCalLink, alarm: rowAlarm });

      if (!(rowEditable && state.editingTaskId === t.id)) {
        var textOverflowPx = textLabel.scrollWidth - textEl.clientWidth;
        if (textOverflowPx > 2) {
          var textGapPx = 32;
          var textTrack = document.createElement("span");
          textTrack.className = "marquee-track";
          textEl.insertBefore(textTrack, textLabel);
          textTrack.appendChild(textLabel);
          var textClone = textLabel.cloneNode(true);
          textClone.setAttribute("aria-hidden", "true");
          textTrack.appendChild(textClone);

          var textSegment = textLabel.scrollWidth + textGapPx;
          textTrack.style.setProperty("--marquee-segment", textSegment + "px");
          textTrack.style.animationDuration = Math.max(4, textSegment / 40) + "s";
        }
      }

      if (state.editingTaskId === t.id) {
        textEl.focus();
        textEl.select();
      }
    });
    taskList.scrollTop = taskListScrollTop;
    renderTaskReminderIconsLayer(reminderRowsForIconsLayer);
    if (migratedCalendarReminders) saveData();
    syncNativeTaskAlarms();
    processCalendarInvites();
    if (!dataLoadBlocked) calVerifyLinks(false);
    syncNativeWidget();
    refreshWorkPlanIfOpen();
    if (privateDataSettled) maybeShowWorkPlanLateToast();

    sheetTitle.textContent = activeSheet().name;
    renderSheetTitleLogo();

    if (state.showingCompleted) {
      emptyStateText.textContent = tr("emptyStateCompleted");
    } else {
      emptyStateText.textContent = isToday
        ? tr("emptyStateToday")
        : isFuture
          ? tr("emptyStateFuture")
          : tr("emptyStatePast");
    }
    emptyState.style.display = visible.length ? "none" : "block";

    if (state.highlightTaskId) {
      var highlightId = state.highlightTaskId;
      state.highlightTaskId = null;
      var targetLi = taskList.querySelector('[data-task-id="' + highlightId + '"]');
      if (targetLi) {
        targetLi.scrollIntoView({ behavior: "smooth", block: "center" });
        targetLi.classList.add("task-highlight");
        setTimeout(function () { targetLi.classList.remove("task-highlight"); }, 2200);
      }
    }
  }

  function showNavDebugToast(source, sheetId, date, taskId) {
    var el = document.getElementById("navDebugToast");
    if (!el) return;
    el.textContent = "DEBUG [" + source + "]: sheet=" + sheetId + " date=" + date + " task=" + taskId;
    el.style.display = "block";
    setTimeout(function () { el.style.display = "none"; }, 8000);
  }

  var pendingOpenChatSheetId = null;

  function tryOpenPendingChat() {
    if (!pendingOpenChatSheetId) return;
    var sheet = sharedSheets.find(function (s) { return s.id === pendingOpenChatSheetId; });
    if (sheet) {
      pendingOpenChatSheetId = null;
      openChatView();
    }
  }

  function navigateToTaskLink(sheetId, date, taskId, chat) {
    if (sheetId) data.activeSheetId = sheetId;
    if (date) state.viewDate = clampViewDate(date);
    if (taskId) state.highlightTaskId = taskId;
    if (chat && sheetId) {
      pendingOpenChatSheetId = sheetId;
      tryOpenPendingChat();
    }
  }

  function applyTaskLinkFromURL() {
    var params = new URLSearchParams(location.search);
    var sheetId = params.get("sheet");
    var date = params.get("date");
    var taskId = params.get("task");
    var chat = params.get("chat") === "1";
    var invite = params.get("invite") === "1";
    if (invite) checkPendingProjectInvites();
    if (!sheetId && !date && !taskId && !chat) return;
    showNavDebugToast("URL", sheetId, date, taskId);
    navigateToTaskLink(sheetId, date, taskId, chat);
    history.replaceState(null, "", location.pathname);
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("message", function (event) {
      var msg = event.data || {};
      if (msg.type !== "navigate-task") return;
      showNavDebugToast("message", msg.sheetId, msg.date, msg.taskId);
      if (msg.projectInvite) checkPendingProjectInvites();
      navigateToTaskLink(msg.sheetId, msg.date, msg.taskId, msg.chat);
      render();
    });
  }

  // Native-app equivalent of the service-worker "navigate-task" message
  // above: tapping an FCM notification (app backgrounded/closed) fires this
  // instead of the SW message event, with the same custom fields under
  // notification.data (all values arrive as strings, same as the SW path).
  if (capacitorPushAvailable) {
    window.Capacitor.Plugins.FirebaseMessaging.addListener("notificationActionPerformed", function (event) {
      var data = (event.notification && event.notification.data) || {};
      if (data.projectInvite === "true" || data.projectInvite === true) checkPendingProjectInvites();
      navigateToTaskLink(data.sheetId, data.date, data.taskId, data.chat === "true" || data.chat === true);
      render();
    });
  }

  // Native-only changes (notification channels, launcher icon, plugins)
  // still need a new Play release, and Play's own background auto-update can
  // take a day or more to reach a phone. @capawesome/capacitor-app-update
  // asks Play directly whether a newer version exists and, if so, opens
  // Play's full-screen "update now" flow right inside the app. Checked on
  // launch and every time the app comes back to the foreground, so someone
  // who backs out of the prompt gets it again next time. Only does anything
  // in the Play-installed native app; the plugin is absent everywhere else.
  var capacitorAppUpdateAvailable = !!(
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.AppUpdate
  );
  if (capacitorAppUpdateAvailable) {
    var appUpdateCheckRunning = false;
    var checkForNativeAppUpdate = function () {
      if (appUpdateCheckRunning) return;
      appUpdateCheckRunning = true;
      var AppUpdate = window.Capacitor.Plugins.AppUpdate;
      AppUpdate.getAppUpdateInfo().then(function (info) {
        // 2 = UPDATE_AVAILABLE, 3 = an update the user already started
        // (resume it rather than leaving it half-done)
        if ((info.updateAvailability === 2 && info.immediateUpdateAllowed) || info.updateAvailability === 3) {
          return AppUpdate.performImmediateUpdate();
        }
      }).catch(function () {}).then(function () {
        appUpdateCheckRunning = false;
      });
    };
    checkForNativeAppUpdate();
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") checkForNativeAppUpdate();
    });
  }


  // ---------------------------------------------------------------------
  // Voice commands: the microphone by the new-task field. The phone's own
  // recognizer turns speech into text (the SpeechRecognition plugin in
  // the app, webkitSpeechRecognition in a browser); parseVoiceCommand
  // turns the text into a command offline, or an on-device model does
  // (ItaskAI, when the phone has one - see voiceAiParse; its on/off switch
  // is in the menu). It's carried out at once, with ↶ ביטול in a toast.
  // ---------------------------------------------------------------------
  var voiceSpeechPlugin = (
    window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() &&
    window.Capacitor.Plugins && window.Capacitor.Plugins.SpeechRecognition
  ) || null;
  var VoiceWebRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  var voiceAiPlugin = (
    window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.ItaskAI
  ) || null;

  var VOICE_HE_HOURS = {
    "אחת עשרה": 11, "שתים עשרה": 12, "שתיים עשרה": 12, "אחת": 1, "שתיים": 2, "שתים": 2,
    "שלוש": 3, "ארבע": 4, "חמש": 5, "שש": 6, "שבע": 7, "שמונה": 8, "תשע": 9, "עשר": 10
  };
  var VOICE_HE_COUNTS = {
    "אחת": 1, "אחד": 1, "שתיים": 2, "שתים": 2, "שניים": 2, "שני": 2, "שתי": 2, "שלוש": 3, "שלושה": 3,
    "ארבע": 4, "ארבעה": 4, "חמש": 5, "חמישה": 5, "שש": 6, "שישה": 6, "שבע": 7, "שבעה": 7,
    "שמונה": 8, "תשע": 9, "תשעה": 9, "עשר": 10, "עשרה": 10, "עשרים": 20, "שלושים": 30,
    "ארבעים": 40, "חמישים": 50
  };
  var VOICE_HE_MONTHS = {
    "ינואר": 1, "פברואר": 2, "מרץ": 3, "מרס": 3, "אפריל": 4, "מאי": 5, "יוני": 6, "יולי": 7,
    "אוגוסט": 8, "ספטמבר": 9, "אוקטובר": 10, "נובמבר": 11, "דצמבר": 12
  };
  var VOICE_WEEKDAYS = {
    "ראשון": 0, "שני": 1, "שלישי": 2, "רביעי": 3, "חמישי": 4, "שישי": 5, "שבת": 6,
    "الأحد": 0, "الاحد": 0, "الاثنين": 1, "الإثنين": 1, "الثلاثاء": 2, "الأربعاء": 3, "الاربعاء": 3,
    "الخميس": 4, "الجمعة": 5, "السبت": 6
  };
  var VOICE_DAYPART = "בבוקר|בצהריים|בצהרים|אחר הצהריים|אחרי הצהריים|אחה\"צ|אחה״צ|בערב|בלילה|الصبح|صباحا|صباحاً|الظهر|المسا|مساء|مساءً|بالليل";

  var VOICE_NAME_STOPWORDS = ["פרויקט", "של", "את", "עם", "על", "מול", "مشروع"];

  function voiceAlt(map) {
    return Object.keys(map).sort(function (a, b) { return b.length - a.length; }).join("|");
  }
  function voiceNumber(token) {
    if (token == null) return null;
    if (/^\d+$/.test(token)) return parseInt(token, 10);
    return VOICE_HE_COUNTS.hasOwnProperty(token) ? VOICE_HE_COUNTS[token] : null;
  }
  function voiceYmd(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function voiceHm(h, m) {
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }
  // A word's matching key: no punctuation, and without the prefix letters
  // Hebrew glues on (ו ב ל ה מ ש כ) or the Arabic article/prepositions -
  // both sides are keyed the same way, so "בחולון" finds "חולון".
  function voiceWordKey(w) {
    var k = String(w).replace(/[^֐-׿؀-ۿa-zA-Z0-9]/g, "").toLowerCase();
    if (/[؀-ۿ]/.test(k)) {
      var a = k.replace(/^(و|ف)?(ب|ل)?(ال)?/, "");
      return a.length >= 2 ? a : k;
    }
    for (var i = 0; i < 2 && k.length > 3 && /^[ובלהמשכ]/.test(k); i++) k = k.slice(1);
    return k;
  }
  function voiceKeys(text) {
    return String(text).split(/\s+/).map(voiceWordKey).filter(function (k) { return k.length >= 2; });
  }

  // The project the sentence names, by the most words of its name heard
  // (a part is enough: "חולון" for "חולון – בניין B"). Returns the words
  // to drop from the task text too, with a "בפרויקט"/"של" right before.
  function voiceFindSheet(text, sheets) {
    var words = text.split(/\s+/);
    var keys = words.map(voiceWordKey);
    var best = null;
    sheets.forEach(function (sheet) {
      var nameKeys = voiceKeys(sheet.name).filter(function (k) { return VOICE_NAME_STOPWORDS.indexOf(k) === -1; });
      if (!nameKeys.length) return;
      var hit = [];
      keys.forEach(function (k, i) { if (k.length >= 2 && nameKeys.indexOf(k) !== -1) hit.push(i); });
      if (!hit.length) return;
      var score = hit.length + hit.length / nameKeys.length;
      if (!best || score > best.score) best = { sheet: sheet, score: score, hit: hit };
    });
    if (!best) return null;
    var drop = {};
    best.hit.forEach(function (i) {
      drop[i] = true;
      for (var j = i - 1; j >= 0 && j >= i - 2; j--) {
        if (/^(פרויקט|של|مشروع)$/.test(keys[j]) || keys[j] === "") drop[j] = true;
        else break;
      }
    });
    return {
      sheet: best.sheet,
      rest: words.filter(function (w, i) { return !drop[i]; }).join(" ")
    };
  }

  // Free speech -> { action: "task"|"note"|"done", items, sheetId, date,
  // reminderTime }. Offline rules for Hebrew (and the common Arabic
  // words); whatever isn't recognized as a command, project, date or time
  // stays the task's text.
  function parseVoiceCommand(rawText, sheets, nowMs, opts) {
    opts = opts || {};
    if (!opts.plan && VOICE_PLAN_RE.test(" " + rawText + " ")) return parseVoicePlan(rawText, sheets, nowMs, opts);
    var now = new Date(nowMs || Date.now());
    // commas set apart, so "שלישי," still reads as a word
    var text = " " + String(rawText || "").replace(/[״]/g, "\"").replace(/[–—]/g, "-").replace(/\s*([,،])\s*/g, " $1 ").replace(/\s+/g, " ").trim() + " ";
    var result = { action: "task", items: [], sheetId: null, date: null, reminderTime: null };
    var reminderIntent = false, plural = false, dateFound = false;
    var reminderAt = null;

    function take(re, fn) {
      text = text.replace(re, function () {
        var keep = fn.apply(null, arguments);
        return keep === false ? arguments[0] : " ";
      });
    }

    // --- what to do ---------------------------------------------------
    take(/(\s)(?:תזכיר|תזכירי|תזכרי|להזכיר|תזכורת|ذكرني|ذكّرني|ذكريني|تذكير)(?:\s+לי)?(?:\s+ש(?=[^\s]{3,})|(?=\s))/g, function () { reminderIntent = true; });
    take(/(\s)(?:סמן|תסמן|סמני|תסמני|סיימתי|סיימנו)(?:\s+את)?(?:\s+ה?משימה)?(?:\s+כ?-?(?:בוצע|בוצעה|גמור|גמורה|הושלם|הושלמה))?(?=\s)/g, function () { result.action = "done"; });
    take(/(\s)(?:כ-?)?(?:בוצע|בוצעה|הושלם|הושלמה|تم|خلصت|انتهيت)(?=\s)/g, function () { result.action = "done"; });
    take(/(\s)(?:תוסיף|תוסיפי|הוסף|הוסיפי|תרשום|תרשמי|רשום|רשמי|תכתוב|תכתבי|כתוב|כתבי|أضف|اضف|ضيف|اكتب|سجل)(?:\s+לי|\s+لي)?(?=\s)/g, function () {});
    // "מזכרת" anywhere; "הערה" only opening the command (it's also a word
    // tasks use: "לתקן את הערת המפקח")
    take(/(\s)(?:מזכרת|ملاحظة)(?:\s+חדשה|\s+جديدة)?(?=\s)|^(\s)הערה(?:\s+חדשה)?(?=\s)/g, function () { if (result.action !== "done") result.action = "note"; });
    var pluralCount = 0;
    take(new RegExp("(\\s)(?:(\\d+|" + voiceAlt(VOICE_HE_COUNTS) + ")\\s+)?משימות(?:\\s+חדשות)?(?=\\s)", "g"), function (m, sp, n) {
      plural = true;
      pluralCount = voiceNumber(n) || 0;
    });
    take(/(\s)(?:ה?משימה|مهمة)(?:\s+חדשה|\s+جديدة)?(?=\s)/g, function () {});

    // --- when ---------------------------------------------------------
    take(/(\s)(?:ב)?עוד\s+(חצי שעה|רבע שעה|שעה|שעתיים|יומיים|שבוע|שבועיים|(\S+)\s+(דקות|דקה|שעות|ימים))(?=\s)/g, function (m, sp, what, n, unit) {
      var count = voiceNumber(n);
      var mins = { "חצי שעה": 30, "רבע שעה": 15, "שעה": 60, "שעתיים": 120 }[what];
      var days = { "יומיים": 2, "שבוע": 7, "שבועיים": 14 }[what];
      if (unit) {
        if (count == null) return false;
        if (unit === "דקות" || unit === "דקה") mins = count;
        else if (unit === "שעות") mins = count * 60;
        else days = count;
      }
      if (mins != null) {
        reminderAt = new Date(now.getTime() + mins * 60000);
      } else {
        var d = new Date(now); d.setDate(d.getDate() + days);
        result.date = voiceYmd(d);
      }
      dateFound = true;
    });
    take(/(\s)بعد\s+(ساعة|ساعتين|نص ساعة|نصف ساعة|(\d+)\s+(دقائق|دقيقة|ساعات))(?=\s)/g, function (m, sp, what, n, unit) {
      var mins = { "ساعة": 60, "ساعتين": 120, "نص ساعة": 30, "نصف ساعة": 30 }[what];
      if (unit) mins = parseInt(n, 10) * (unit === "ساعات" ? 60 : 1);
      reminderAt = new Date(now.getTime() + mins * 60000);
      dateFound = true;
    });
    take(/(\s)(?:מ|ל)?(?:ה)?(?:יום\s+)?(מחרתיים|היום|מחר|بعد بكرة|بعد بكره|اليوم|بكرة|بكره|غدا|غداً|بكرا)(?=\s)/g, function (m, sp, w) {
      var d = new Date(now);
      if (/מחרתיים|بعد/.test(w)) d.setDate(d.getDate() + 2);
      else if (/מחר|بكر|غد/.test(w)) d.setDate(d.getDate() + 1);
      result.date = voiceYmd(d);
      dateFound = true;
    });
    take(new RegExp("(\\s)(?:ב|ל|מ)?(?:יום\\s+)?(" + voiceAlt(VOICE_WEEKDAYS) + ")(?:\\s+(?:הבא|הקרוב|القادم|الجاي))?(?=\\s)", "g"), function (m, sp, w) {
      // "שני"/"שלישי"... alone are also numbers/words - need "יום" or "ב"
      if (!/יום|^\s*ב|ال/.test(m) && !opts.bareWeekday) return false;
      var d = new Date(now);
      var diff = (VOICE_WEEKDAYS[w] - d.getDay() + 7) % 7 || 7;
      d.setDate(d.getDate() + diff);
      result.date = voiceYmd(d);
      dateFound = true;
    });
    take(new RegExp("(\\s)(?:ב-?|ל-?|מה-?|מ-?|ה-?)?(\\d{1,2})(?:[./](\\d{1,2})(?:[./](\\d{2,4}))?|\\s+(?:ב|ל)(" + voiceAlt(VOICE_HE_MONTHS) + "|חודש))(?=\\s)", "g"), function (m, sp, day, mon, yr, monName) {
      var dd = parseInt(day, 10);
      var mm = mon ? parseInt(mon, 10) : (monName && monName !== "חודש" ? VOICE_HE_MONTHS[monName] : now.getMonth() + 1);
      if (dd < 1 || dd > 31 || mm < 1 || mm > 12) return false;
      var yy = yr ? (yr.length === 2 ? 2000 + parseInt(yr, 10) : parseInt(yr, 10)) : now.getFullYear();
      var d = new Date(yy, mm - 1, dd);
      if (!yr && voiceYmd(d) < voiceYmd(now)) {
        if (monName === "חודש") d = new Date(yy, mm, dd); else d = new Date(yy + 1, mm - 1, dd);
      }
      result.date = voiceYmd(d);
      dateFound = true;
    });

    // Clock times: "בשעה 10", "ב-8:30", "בשמונה וחצי בערב", "ברבע לתשע".
    // A bare "ב-3"/"בשלוש" only counts as a time with a reminder, a day,
    // minutes or a part of the day around it ("ב-3 קומות" stays text).
    var timeFound = false;
    var hourAlt = voiceAlt(VOICE_HE_HOURS);
    take(new RegExp("(\\s)(בשעה\\s+|ב-?|الساعة\\s+|عالساعة\\s+)?(?:(רבע|עשרה|חמישה|עשרים)\\s+ל-?)?(?:(\\d{1,2})(?::(\\d{2}))?|(" + hourAlt + "))(\\s+(?:וחצי|ורבע|ועשרה|ועשרים|וחמישה|וחמש|ושלושים|וארבעים|ونص|وربع))?(\\s+(?:" + VOICE_DAYPART + "))?(?=\\s)", "g"),
      function (m, sp, prefix, before, hDigits, mDigits, hWord, minWord, part) {
        if (timeFound) return false;
        var strong = /בשעה|الساعة/.test(prefix || "") || mDigits || minWord || part || before;
        if (!strong && !(prefix && (reminderIntent || dateFound))) return false;
        var h = hDigits != null ? parseInt(hDigits, 10) : VOICE_HE_HOURS[hWord];
        var min = mDigits ? parseInt(mDigits, 10) : 0;
        if (minWord) {
          min = { "וחצי": 30, "ורבע": 15, "ועשרה": 10, "ועשרים": 20, "וחמישה": 5, "וחמש": 5, "ושלושים": 30, "וארבעים": 40, "ونص": 30, "وربع": 15 }[minWord.trim()];
        }
        if (before) { min = 60 - { "רבע": 15, "עשרה": 10, "חמישה": 5, "עשרים": 20 }[before]; h -= 1; }
        if (h > 23 || min > 59 || h < 0) return false;
        var p = (part || "").trim();
        if (h < 12 && h > 0) {
          if (/צהר|אחה|ערב|الظهر|مسا|المسا|بالليل/.test(p) && !(p === "בצהריים" && h >= 11)) h += 12;
          else if (/לילה/.test(p)) { if (h >= 6) h += 12; }
          else if (!p && !mDigits && h <= 6) h += 12;
          else if (!p && mDigits && h <= 5) h += 12;
        }
        result.reminderTime = voiceHm(h % 24, min);
        timeFound = true;
      });
    if (!timeFound && reminderIntent) {
      take(new RegExp("(\\s)(" + VOICE_DAYPART + ")(?=\\s)"), function (m, sp, p) {
        if (/בוקר|الصبح|صباح/.test(p)) result.reminderTime = "08:00";
        else if (/בצהר|الظهر/.test(p)) result.reminderTime = "12:00";
        else if (/אחה|אחר|אחרי/.test(p)) result.reminderTime = "16:00";
        else result.reminderTime = "19:00";
        timeFound = true;
      });
    }
    if (reminderAt) {
      result.date = voiceYmd(reminderAt);
      result.reminderTime = voiceHm(reminderAt.getHours(), reminderAt.getMinutes());
    }

    // --- where --------------------------------------------------------
    var found = voiceFindSheet(text.trim(), sheets || []);
    if (found) {
      result.sheetId = found.sheet.id;
      text = " " + found.rest + " ";
    }

    // --- the text itself ----------------------------------------------
    var rest = text.replace(/\s+/g, " ").trim()
      .replace(/^(?:את|ש|ו|לי|עם|ל|في|ب)\s+/, "")
      .replace(/\s+(?:ו|את|ב|ל|של|في)$/, "")
      .replace(/^[-:,.\s]+|[-:,.\s]+$/g, "");
    var items = [rest];
    if (result.action !== "done") {
      items = rest.split(/\s*[,،]\s*|\s+וגם\s+/);
      if (plural) {
        items = [].concat.apply([], items.map(function (it) { return it.split(/\s+ו(?=ל\S{2,})/); }));
        // "שלוש משימות: להזמין בטון לבדוק ברזל ולתאם משאבה" without commas:
        // the missing splits go before the next infinitive-looking word
        var missing = pluralCount - items.length;
        for (var i = 0; i < items.length && missing > 0; i++) {
          var words = items[i].split(" ");
          if (!/^ל\S{2,}$/.test(words[0])) continue;
          for (var w = 2; w < words.length && missing > 0; w++) {
            if (/^ל\S{3,}$/.test(words[w]) && !/^ל(?:פרויקט|קבלן|ספק|מפקח|קומה)/.test(words[w])) {
              items.splice(i, 1, words.slice(0, w).join(" "), words.slice(w).join(" "));
              missing--;
              break;
            }
          }
        }
      }
    }
    result.items = items.map(function (s) { return s.trim(); }).filter(Boolean);
    if (!result.date && result.reminderTime) {
      // a time already gone today means tomorrow
      result.date = voiceHm(now.getHours(), now.getMinutes()) < result.reminderTime ? voiceYmd(now) :
        voiceYmd(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
    }
    return result;
  }

  // "תוסיף לתוכנית העבודה יציקת תקרה קומה 3 מיום ראשון עד שלישי, צוות
  // טפסנות" -> { action: "plan", items, sheetId, date (start), endDate, by }.
  // The part before "עד" is parsed as usual (its date is the start), the
  // part after it gives the end; "למשך שבוע" works too. Who carries it out:
  // a name from the project's lists, or a trailing "צוות/קבלן ...".
  var VOICE_PLAN_RE = /\s(?:ל|ב)?(?:תוכנית|תכנית)(?:\s+ה?עבודה)?(?=\s)|\sלגאנט(?=\s)|\s(?:لخطة|خطة)\s+العمل(?=\s)/;
  function parseVoicePlan(rawText, sheets, nowMs, opts) {
    var text = " " + String(rawText || "").replace(/\s+/g, " ").trim() + " ";
    text = text.replace(new RegExp(VOICE_PLAN_RE.source, "g"), " ");
    var days = null;
    text = text.replace(/\sלמשך\s+(שבוע|שבועיים|יומיים|חודש|(\S+)\s+(ימים|שבועות))(?=\s)/, function (m, what, n, unit) {
      var count = voiceNumber(n);
      days = { "שבוע": 7, "שבועיים": 14, "יומיים": 2, "חודש": 30 }[what] || (count ? count * (unit === "שבועות" ? 7 : 1) : null);
      return " ";
    });
    var split = text.match(/^(.*?)\s(?:ו)?(?:עד|حتى|لغاية)\s+(?:ל|ה)?-?(.*)$/);
    var left = split ? split[1] : text;
    var res = parseVoiceCommand(left, sheets, nowMs, { plan: true });
    var rest = res.items.join(", ");
    var endDate = null;
    var start = res.date || voiceYmd(new Date(nowMs || Date.now()));
    if (split) {
      var right = parseVoiceCommand(" " + split[2] + " ", [], nowMs, { plan: true, bareWeekday: true });
      // "מיום ראשון עד שלישי": the Tuesday after that Sunday
      if (right.date && right.date < start) {
        right = parseVoiceCommand(" " + split[2] + " ", [], new Date(start + "T12:00").getTime(), { plan: true, bareWeekday: true });
      }
      endDate = right.date;
      if (right.items.length) rest = (rest ? rest + ", " : "") + right.items.join(", ");
    }
    if (!endDate && days) {
      var e = new Date(start + "T12:00"); e.setDate(e.getDate() + days - 1);
      endDate = voiceYmd(e);
    }
    var by = "";
    (opts.people || []).slice().sort(function (a, b) { return b.length - a.length; }).some(function (name) {
      var at = name && rest.indexOf(name);
      if (!name || at === -1) return false;
      by = name;
      rest = (rest.slice(0, at) + rest.slice(at + name.length));
      return true;
    });
    if (!by) {
      rest = rest.replace(/(?:^|,\s*|\s)((?:צוות|קבלן|קבלני|חברת|فرقة|مقاول)\s+[^,]+)$/, function (m, who) { by = who.trim(); return ""; });
    }
    rest = rest.replace(/\s*,\s*/g, ", ").replace(/^[\s,:-]+|[\s,:-]+$/g, "").replace(/^(?:את|ש)\s+/, "");
    return {
      action: "plan",
      items: rest ? [rest.replace(/,\s*/g, " ")] : [],
      sheetId: res.sheetId,
      date: start,
      endDate: endDate && endDate >= start ? endDate : start,
      by: by,
      reminderTime: null
    };
  }

  // The on-device model (ItaskAI - Gemini Nano on Android phones that have
  // it): asked for the same command as JSON. Anything missing, invalid or
  // slow falls back to parseVoiceCommand.
  function voiceAiPrompt(text, sheets) {
    return [
      "Convert a spoken command for a construction task app into JSON.",
      "Today is " + voiceYmd(new Date()) + " (" + ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()] + "), time " + voiceHm(new Date().getHours(), new Date().getMinutes()) + ".",
      "Projects: " + sheets.map(function (s) { return JSON.stringify(s.name); }).join(", "),
      "Reply with JSON only: {\"action\":\"task|note|done\",\"items\":[\"task text in the speaker's language\"],\"project\":\"exact project name or null\",\"date\":\"YYYY-MM-DD or null\",\"time\":\"HH:MM or null\"}",
      "Several tasks in one sentence become several items. \"time\" is only for a requested reminder or a stated hour.",
      "Command: " + text
    ].join("\n");
  }
  function voiceAiResultToCommand(reply, sheets) {
    var m = String(reply || "").match(/\{[\s\S]*\}/);
    if (!m) return null;
    var j;
    try { j = JSON.parse(m[0]); } catch (e) { return null; }
    if (!j || ["task", "note", "done"].indexOf(j.action) === -1 || !Array.isArray(j.items)) return null;
    var items = j.items.filter(function (s) { return typeof s === "string" && s.trim(); }).map(function (s) { return s.trim(); });
    if (!items.length && j.action !== "task") return null;
    var sheet = null;
    if (j.project) {
      sheet = sheets.find(function (s) { return s.name === j.project; }) ||
        (voiceFindSheet(String(j.project), sheets) || {}).sheet || null;
    }
    return {
      action: j.action,
      items: items,
      sheetId: sheet ? sheet.id : null,
      date: /^\d{4}-\d{2}-\d{2}$/.test(j.date || "") ? j.date : null,
      reminderTime: /^\d{2}:\d{2}$/.test(j.time || "") ? j.time : null,
      byAi: true
    };
  }
  // The model's on/off switch (in the voice dialog) and its state:
  // available / downloadable / downloading / unavailable / failed. A
  // downloadable model is fetched once, in the background (AICore keeps it).
  var VOICE_AI_PREF_KEY = "itask-voice-ai";
  var voiceAiState = "unknown";
  var voiceAiProgress = null;
  function voiceAiEnabled() {
    try { return localStorage.getItem(VOICE_AI_PREF_KEY) !== "off"; } catch (e) { return true; }
  }
  function startVoiceAiDownload() {
    if (voiceAiState === "downloading") return;
    voiceAiState = "downloading";
    voiceAiProgress = null;
    renderVoiceAiRow();
    voiceAiPlugin.download().then(function () {
      voiceAiState = "available";
      renderVoiceAiRow();
    }).catch(function () {
      voiceAiState = "failed";
      renderVoiceAiRow();
    });
  }
  function refreshVoiceAiStatus() {
    if (!voiceAiPlugin) return;
    voiceAiPlugin.available().then(function (res) {
      if (voiceAiState === "downloading") return;
      voiceAiState = (res && res.status) || (res && res.available ? "available" : "unavailable");
      if (voiceAiState === "downloadable" && voiceAiEnabled()) startVoiceAiDownload();
      renderVoiceAiRow();
    }).catch(function () {});
  }
  if (voiceAiPlugin && voiceAiPlugin.addListener) {
    voiceAiPlugin.addListener("downloadProgress", function (d) {
      voiceAiProgress = d && d.total ? Math.round(d.bytes * 100 / d.total) : null;
      renderVoiceAiRow();
    });
  }

  function voiceAiParse(text, sheets) {
    if (!voiceAiPlugin || !voiceAiEnabled()) return Promise.resolve(null);
    var ask = voiceAiPlugin.available().then(function (res) {
      if (!res || !res.available) return null;
      return voiceAiPlugin.generate({ prompt: voiceAiPrompt(text, sheets) }).then(function (out) {
        return voiceAiResultToCommand(out && out.text, sheets);
      });
    }).catch(function () { return null; });
    var timeout = new Promise(function (resolve) { setTimeout(function () { resolve(null); }, 10000); });
    return Promise.race([ask, timeout]);
  }

  // ---- listening ---------------------------------------------------------
  function voiceSpeechLang() {
    return { he: "he-IL", en: "en-US", ar: "ar-IL", ru: "ru-RU" }[currentLang] || "he-IL";
  }
  var voiceWebRec = null;
  function voiceListen() {
    if (voiceSpeechPlugin) {
      return voiceSpeechPlugin.requestPermissions().then(function (p) {
        if (!p || p.speechRecognition !== "granted") throw new Error("permission");
        return voiceSpeechPlugin.start({ language: voiceSpeechLang(), maxResults: 1, partialResults: false, popup: false });
      }).then(function (res) {
        return (res && res.matches && res.matches[0]) || "";
      });
    }
    return new Promise(function (resolve, reject) {
      var rec = new VoiceWebRecognition();
      var heard = "";
      voiceWebRec = rec;
      rec.lang = voiceSpeechLang();
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = function (e) { heard = e.results[0][0].transcript; };
      rec.onerror = function (e) {
        reject(new Error(e.error === "not-allowed" || e.error === "service-not-allowed" ? "permission" : (e.error || "error")));
      };
      rec.onend = function () { voiceWebRec = null; resolve(heard); };
      rec.start();
    });
  }
  function voiceStopListening() {
    if (voiceSpeechPlugin) voiceSpeechPlugin.stop().catch(function () {});
    if (voiceWebRec) { try { voiceWebRec.abort(); } catch (e) {} voiceWebRec = null; }
  }

  // ---- the 🎤 by the new-task field ------------------------------------
  var voiceBtn = document.getElementById("voiceBtn");
  var voiceAiSection = document.getElementById("voiceAiMenuSection");
  var voiceAiToggle = document.getElementById("voiceAiToggle");
  var voiceAiStatus = document.getElementById("voiceAiStatus");

  function voiceTargetSheets() {
    return allSheets().filter(function (s) { return !s.ended && s.id !== HEAD_OFFICE_SHEET_ID; });
  }
  function voiceScoreTask(task, query) {
    var q = voiceKeys(query);
    var t = voiceKeys(task.text);
    return q.filter(function (k) { return t.indexOf(k) !== -1; }).length;
  }
  function voiceOpenTasks(sheet) {
    return sheet.tasks.filter(function (t) { return t.type !== "note" && t.status !== 2; });
  }
  // For "done": the open task the words fit best, across all projects when
  // none was named.
  function voiceBestDoneSheet(query) {
    var best = null;
    voiceTargetSheets().forEach(function (s) {
      voiceOpenTasks(s).forEach(function (t) {
        var score = voiceScoreTask(t, query);
        if (score > 0 && (!best || score > best.score)) best = { sheet: s, score: score };
      });
    });
    return best && best.sheet;
  }

  function renderVoiceAiRow() {
    voiceAiSection.hidden = !voiceAiPlugin;
    if (!voiceAiPlugin) return;
    voiceAiToggle.checked = voiceAiEnabled();
    var status = {
      available: "voiceAiAvailable", downloading: "voiceAiDownloading", downloadable: "voiceAiDownloading",
      failed: "voiceAiFailed", unavailable: "voiceAiUnavailable"
    }[voiceAiState];
    voiceAiStatus.textContent = tr("voiceAiLabel") + (status ? " - " + tr(status) : "") +
      (voiceAiState === "downloading" && voiceAiProgress != null ? " " + voiceAiProgress + "%" : "");
  }

  function voicePeople() {
    var names = [];
    voiceTargetSheets().forEach(function (s) {
      wpPeopleSuggestions(s).forEach(function (n) { if (names.indexOf(n) === -1) names.push(n); });
    });
    return names;
  }

  // Carries out a heard command. c: { action, texts, date, reminderTime,
  // endDate, by, doneTaskId }. Resolves { msgKey, undo(), date, taskId },
  // or null when there was nothing to do (or a reminder time already gone
  // - a toast says so).
  function voiceApplyCommand(sheet, c) {
    if (c.action === "done") {
      var task = sheet.tasks.find(function (t) { return t.id === c.doneTaskId; });
      if (!task) return Promise.resolve(null);
      var was = task.status;
      task.status = 2;
      if (task.planItemId) workPlanTaskStatusChanged(sheet, task);
      saveData();
      if (sheet.shared) sendChatSystemMessage(sheet.id, "done", task.text, myPhoneNumber);
      return Promise.resolve({ msgKey: "voiceDoneMsg", date: task.date, taskId: task.id, undo: function () {
        task.status = was;
        if (task.planItemId) workPlanTaskStatusChanged(sheet, task);
        saveData();
      } });
    }
    var texts = (c.texts || []).map(function (s) { return s.replace(/\s+/g, " ").trim(); }).filter(Boolean);
    if (!texts.length) return Promise.resolve(null);
    if (c.action === "plan") {
      var start = c.date || todayISO();
      var end = c.endDate && c.endDate >= start ? c.endDate : start;
      var added = texts.map(function (name) {
        var item = {
          id: uid(), name: name, start: start, end: end, by: (c.by || "").replace(/\s+/g, " ").trim(),
          status: "todo", progress: 0, note: "", showInTasks: true, updatedBy: myPhoneNumber || null, updatedAt: Date.now()
        };
        saveWorkPlanItem(sheet, item, false);
        return item;
      });
      return Promise.resolve({ msgKey: "voicePlanAddedMsg", date: start, undo: function () {
        added.forEach(function (item) { saveWorkPlanItem(sheet, item, true); });
      } });
    }
    var type = c.action === "note" ? "note" : "task";
    var date = c.date || todayISO();
    var reminder = null;
    if (c.reminderTime) {
      var fireAt = new Date(date + "T" + c.reminderTime);
      if (isNaN(fireAt.getTime()) || fireAt.getTime() <= Date.now()) {
        showToast(tr("taskReminderPastMsg"));
        return Promise.resolve(null);
      }
      reminder = { type: "time", date: date, time: c.reminderTime, fireAt: fireAt.toISOString(), firedAt: null };
      if (sheet.shared) reminder.by = myPhoneNumber;
    }
    var ready = (!reminder || nativeTaskAlarmPlugin) ? Promise.resolve(true) : ensurePushReadyForTaskReminder();
    return ready.then(function (ok) {
      if (reminder && !ok) {
        alert(tr("taskReminderNotSupportedMsg"));
        reminder = null;
      }
      var ids = [];
      texts.forEach(function (text) {
        var t = { id: uid(), text: text, status: 0, urgent: false, type: type, date: date, createdAt: Date.now() };
        if (type === "note") t.time = currentTimeHHMM();
        if (reminder) t.reminder = Object.assign({}, reminder);
        sheet.tasks.push(t);
        ids.push(t.id);
        if (sheet.shared && type === "task") sendChatSystemMessage(sheet.id, "added", text, myPhoneNumber);
      });
      saveData();
      if (reminder) ensureExactAlarmPermission();
      return { msgKey: reminder ? "voiceAddedReminderMsg" : "voiceAddedMsg", date: date, taskId: ids[0], undo: function () {
        sheet.tasks = sheet.tasks.filter(function (t) { return ids.indexOf(t.id) < 0; });
        saveData();
      } };
    });
  }

  // ---- the 🎤: heard, understood, done - with an undo -------------------
  var voiceBusy = false;
  function startVoiceCommand() {
    if (voiceBusy) { voiceStopListening(); return; }
    voiceBusy = true;
    voiceBtn.classList.add("listening");
    showToast(tr("voiceListening"), 10000);
    voiceListen().then(function (heard) {
      heard = String(heard || "").replace(/\s+/g, " ").trim();
      if (!heard) { showToast(tr("voiceNoSpeech")); return null; }
      showToast(tr("voiceThinking"), 10000);
      var sheets = voiceTargetSheets();
      // the model isn't asked about work-plan activities (date ranges) - the
      // rules handle those
      var ai = VOICE_PLAN_RE.test(" " + heard + " ") ? Promise.resolve(null) : voiceAiParse(heard, sheets);
      return ai.then(function (aiCmd) {
        return voiceRunCommand(aiCmd || parseVoiceCommand(heard, sheets, null, { people: voicePeople() }));
      });
    }).catch(function (err) {
      showToast(tr(err && err.message === "permission" ? "voicePermissionMsg" : "voiceNoSpeech"));
    }).then(function () {
      voiceBusy = false;
      voiceBtn.classList.remove("listening");
    });
  }
  function voiceRunCommand(cmd) {
    var sheets = voiceTargetSheets();
    if (!sheets.length) return null;
    var sheet = cmd.sheetId && sheets.find(function (s) { return s.id === cmd.sheetId; });
    var doneTask = null;
    if (cmd.action === "done") {
      var query = cmd.items.join(" ");
      if (!sheet) sheet = voiceBestDoneSheet(query);
      var best = sheet && voiceOpenTasks(sheet).map(function (t) { return { t: t, s: voiceScoreTask(t, query) }; })
        .filter(function (x) { return x.s > 0; })
        .sort(function (a, b) { return b.s - a.s; })[0];
      if (!best) { showToast(tr("voiceNoSuchTask")); return null; }
      doneTask = best.t;
    }
    if (!sheet) sheet = sheets.find(function (s) { return s.id === data.activeSheetId; }) || sheets[0];
    var texts = cmd.items.length ? cmd.items.slice() : (cmd.reminderTime ? [tr("voiceReminderDefault")] : []);
    if (cmd.action !== "done" && !texts.length) { showToast(tr("voiceNoSpeech")); return null; }
    var date = cmd.date || (state.viewDate >= todayISO() ? state.viewDate : todayISO());
    return voiceApplyCommand(sheet, {
      action: cmd.action, texts: texts, date: date, reminderTime: cmd.reminderTime,
      endDate: cmd.endDate, by: cmd.by, doneTaskId: doneTask && doneTask.id
    }).then(function (res) {
      if (!res) return;
      if (cmd.action === "task" || cmd.action === "note") {
        // where it went
        viewingArchive = false;
        state.viewMode = "tasks";
        state.showingCompleted = false;
        data.activeSheetId = sheet.id;
        state.viewDate = clampViewDate(res.date);
        saveData();
      }
      render();
      var what = doneTask ? doneTask.text : texts.join(", ");
      var when = cmd.action === "done" ? "" : (res.date && res.date !== todayISO() ? " · " + isoToDisplay(res.date) : "") +
        (cmd.reminderTime && cmd.action !== "plan" ? " ⏰ " + cmd.reminderTime : "");
      showUndoToast(tr(res.msgKey) + ": " + what + when + (sheets.length > 1 ? " · " + sheet.name : ""), function () {
        res.undo();
        render();
      });
    });
  }
  voiceBtn.hidden = !(voiceSpeechPlugin || VoiceWebRecognition);
  voiceBtn.addEventListener("click", startVoiceCommand);

  // a toast with ↶ ביטול
  var undoToast = document.getElementById("undoToast");
  var undoToastAction = null, undoToastTimer = null;
  function showUndoToast(text, undo) {
    appToastEl.classList.remove("app-toast-visible");
    document.getElementById("undoToastText").textContent = text;
    undoToastAction = undo;
    undoToast.hidden = false;
    clearTimeout(undoToastTimer);
    undoToastTimer = setTimeout(hideUndoToast, 8000);
  }
  function hideUndoToast() {
    clearTimeout(undoToastTimer);
    undoToast.hidden = true;
    undoToastAction = null;
  }
  document.getElementById("undoToastBtn").addEventListener("click", function () {
    var undo = undoToastAction;
    hideUndoToast();
    if (undo) { undo(); showToast(tr("voiceUndoneMsg")); }
  });
  renderVoiceAiRow();
  menuBtn.addEventListener("click", refreshVoiceAiStatus);
  voiceAiToggle.addEventListener("change", function () {
    try { localStorage.setItem(VOICE_AI_PREF_KEY, voiceAiToggle.checked ? "on" : "off"); } catch (e) {}
    if (voiceAiToggle.checked && voiceAiState === "downloadable") startVoiceAiDownload();
  });

  // ---------------------------------------------------------------------
  // סקיצה: a quick site-sketch pad on light-blue squared paper. Everything
  // drawn is kept as shapes (not pixels) in world units - one grid square
  // is SK_CELL units - so it can be zoomed, erased shape by shape, undone,
  // measured and redrawn sharp for the PDF.
  //   tools: pen (a held stroke end turns it into a straight line /
  //   rectangle / circle), straight line, wall, dimension (two arrows and a
  //   number or word in the middle), callout (an arrow from a point to a
  //   horizontal shelf with text on it), text, door, window, stairs, north
  //   arrow, eraser, hand (pan; two fingers pan and zoom with any tool).
  //   With a scale set (a square = so many cm/m) straight lines show their
  //   real length and dimensions fill it in.
  // A draft per project is kept in localStorage until saved or cleared.
  // ---------------------------------------------------------------------
  var SK_CELL = 20;
  var SK_COLORS = ["#1f1f1f", "#2e4fb8", "#c62828", "#2e7d32", "#c05023"];
  var SK_WIDTHS = [1.5, 3, 6];
  var sketchView = document.getElementById("sketchView");
  var skCanvas = document.getElementById("sketchCanvas");
  var skCtx = skCanvas.getContext("2d");
  var skLenTip = document.getElementById("sketchLenTip");
  var sk = {
    sheetId: null,
    els: [],            // the drawing
    undo: [], redo: [],
    tool: "pen", color: SK_COLORS[0], width: 1,
    snap: true,
    scale: null,        // { per: 50, unit: "cm" } - one square
    view: { x: 0, y: 0, z: 1 }, // screen = (world - x) * z
    draft: null,        // the element being drawn
    images: {}          // decoded background images by element id
  };

  // Each sketch keeps its own copy on the phone (itask-sketch:<project>:<id>)
  // on every change - the server copy (14g-sketch-cloud.js) follows it.
  function skDraftKey(sketchId) { return "itask-sketch:" + sk.sheetId + ":" + (sketchId || sk.sketchId); }
  function skSaveDraft() {
    if (!sk.sketchId) return;
    sk.savedAt = Date.now();
    try {
      localStorage.setItem(skDraftKey(), JSON.stringify({ sketchId: sk.sketchId, name: sk.sketchName, els: sk.els, scale: sk.scale, view: sk.view, savedAt: sk.savedAt, syncedAt: sk.syncedAt || 0 }));
      localStorage.setItem("itask-sketch-cur:" + sk.sheetId, sk.sketchId);
    } catch (e) {}
    skCloudSoon();
  }
  // puts a sketch (as kept on the phone, or fresh) on the pad
  function skLoadDraft(d) {
    sk.sketchId = d.sketchId;
    sk.sketchName = d.name || tr("sketchTitle");
    sk.els = d.els || [];
    sk.scale = d.scale || null;
    sk.view = d.view || { x: -40, y: -40, z: 1 };
    sk.savedAt = d.savedAt || 0;
    sk.syncedAt = d.syncedAt || 0;
    sk.undo = []; sk.redo = [];
    sk.objSel = null;
    sk.bgSel = false;
  }
  function skCommit(fn) {
    sk.undo.push(JSON.stringify(sk.els));
    if (sk.undo.length > 80) sk.undo.shift();
    sk.redo = [];
    fn();
    skSaveDraft();
    skDraw();
    skUpdateButtons();
  }

  // ---- coordinates ----------------------------------------------------
  function skToWorld(sx, sy) { return { x: sx / sk.view.z + sk.view.x, y: sy / sk.view.z + sk.view.y }; }
  function skToScreen(p) { return { x: (p.x - sk.view.x) * sk.view.z, y: (p.y - sk.view.y) * sk.view.z }; }
  function skEventPoint(e) {
    var r = skCanvas.getBoundingClientRect();
    return skToWorld(e.clientX - r.left, e.clientY - r.top);
  }
  // with # on, a point near the end of a line already drawn (or a corner)
  // is caught exactly on it; otherwise on the grid
  function skEndPoints() {
    var out = [];
    sk.els.forEach(function (el) {
      if (el.type === "line" || el.type === "wall" || el.type === "dim" || el.type === "door" || el.type === "window") out.push(el.a, el.b);
      else if (el.type === "rect" || el.type === "stairs") out.push(el.a, el.b, { x: el.a.x, y: el.b.y }, { x: el.b.x, y: el.a.y });
      else if (el.type === "stroke" && el.pts.length > 1) {
        // a straightened stroke's corners, a freehand one's two ends
        if (el.pts.length <= 13) out.push.apply(out, el.pts);
        else out.push(el.pts[0], el.pts[el.pts.length - 1]);
      }
    });
    return out;
  }
  function skEndSnap(p) {
    if (!sk.snap) return null;
    var best = null, bestD = 16 / sk.view.z;
    skEndPoints().forEach(function (q) {
      var d = skDist(p, q);
      if (d < bestD) { bestD = d; best = q; }
    });
    sk.snapMark = best ? { x: best.x, y: best.y } : null;
    return sk.snapMark;
  }
  function skSnapPoint(p) {
    if (!sk.snap) return p;
    var e = skEndSnap(p);
    if (e) return { x: e.x, y: e.y };
    var g = SK_CELL / 2;
    return { x: Math.round(p.x / g) * g, y: Math.round(p.y / g) * g };
  }
  function skDist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  // a dimension can be shifted sideways (off) from the points it measures
  function skDimLine(el) {
    var off = el.off || 0, len = skDist(el.a, el.b) || 1;
    var nx = -(el.b.y - el.a.y) / len * off, ny = (el.b.x - el.a.x) / len * off;
    return { a: { x: el.a.x + nx, y: el.a.y + ny }, b: { x: el.b.x + nx, y: el.b.y + ny } };
  }
  // straight lines lock to 0/45/90 degrees when close to them
  function skSnapAngle(a, b) {
    var ang = Math.atan2(b.y - a.y, b.x - a.x);
    var step = Math.PI / 4;
    var near = Math.round(ang / step) * step;
    if (Math.abs(ang - near) > 0.12) return b;
    var len = skDist(a, b);
    return { x: a.x + Math.cos(near) * len, y: a.y + Math.sin(near) * len };
  }
  // an area in world units² as "24.5 מ״ר" (by the scale)
  function skAreaText(areaU) {
    var upm = skUnitsPerMetre(), m2 = areaU / (upm * upm);
    return (m2 >= 100 ? m2.toFixed(0) : m2 >= 10 ? m2.toFixed(1) : m2.toFixed(2)) + " " + tr("sketchSqm");
  }
  function skRealLength(len) {
    if (!sk.scale) return "";
    var v = len / SK_CELL * sk.scale.per; // in the scale's unit
    var m = sk.scale.unit === "cm" ? v / 100 : v;
    return (m >= 10 ? m.toFixed(1) : m.toFixed(2)) + " " + tr("sketchMeterShort");
  }

  // ---- drawing --------------------------------------------------------
  function skResize() {
    var r = skCanvas.parentNode.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    skCanvas.width = Math.round(r.width * dpr);
    skCanvas.height = Math.round(r.height * dpr);
    skCanvas.style.width = r.width + "px";
    skCanvas.style.height = r.height + "px";
    skDraw();
  }
  function skDrawGrid(ctx, w, h, view) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    var step = SK_CELL * view.z;
    if (step < 4) return;
    var x0 = Math.floor(view.x / SK_CELL), y0 = Math.floor(view.y / SK_CELL);
    var cols = Math.ceil(w / step) + 2, rows = Math.ceil(h / step) + 2;
    for (var i = 0; i < cols; i++) {
      var gx = (x0 + i) * SK_CELL, sx = (gx - view.x) * view.z;
      ctx.strokeStyle = (x0 + i) % 5 === 0 ? "#9cc3ea" : "#d7e8f8";
      ctx.lineWidth = (x0 + i) % 5 === 0 ? 1 : 0.7;
      ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, h); ctx.stroke();
    }
    for (var j = 0; j < rows; j++) {
      var gy = (y0 + j) * SK_CELL, sy = (gy - view.y) * view.z;
      ctx.strokeStyle = (y0 + j) % 5 === 0 ? "#9cc3ea" : "#d7e8f8";
      ctx.lineWidth = (y0 + j) % 5 === 0 ? 1 : 0.7;
      ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(w, sy); ctx.stroke();
    }
  }
  function skArrowHead(ctx, tip, from, size) {
    var ang = Math.atan2(tip.y - from.y, tip.x - from.x);
    ctx.beginPath();
    ctx.moveTo(tip.x, tip.y);
    ctx.lineTo(tip.x - size * Math.cos(ang - 0.4), tip.y - size * Math.sin(ang - 0.4));
    ctx.lineTo(tip.x - size * Math.cos(ang + 0.4), tip.y - size * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();
  }
  function skLabel(ctx, text, x, y, angle, size, color, boxed) {
    ctx.save();
    ctx.translate(x, y);
    if (angle) ctx.rotate(angle);
    ctx.font = "700 " + size + "px Assistant, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (boxed) {
      var w = ctx.measureText(text).width + size * 0.6;
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.fillRect(-w / 2, -size * 0.65, w, size * 1.3);
    }
    ctx.fillStyle = color;
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }
  // Draws one element; view = {x,y,z} maps world to the canvas.
  function skDrawEl(ctx, el, view) {
    var z = view.z;
    var P = function (p) { return { x: (p.x - view.x) * z, y: (p.y - view.y) * z }; };
    var lw = (el.w || SK_WIDTHS[1]) * z;
    ctx.strokeStyle = ctx.fillStyle = el.color || "#1f1f1f";
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (el.type === "stroke") {
      ctx.beginPath();
      el.pts.forEach(function (p, i) { var s = P(p); if (i) ctx.lineTo(s.x, s.y); else ctx.moveTo(s.x, s.y); });
      ctx.stroke();
    } else if (el.type === "line" || el.type === "wall") {
      var a = P(el.a), b = P(el.b);
      if (el.type === "wall") ctx.lineWidth = Math.max(lw, 7 * z), ctx.lineCap = "butt";
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      var len = skRealLength(skDist(el.a, el.b));
      if (len && skDist(el.a, el.b) > SK_CELL * 1.5) {
        var ang = Math.atan2(b.y - a.y, b.x - a.x);
        if (ang > Math.PI / 2 || ang < -Math.PI / 2) ang += Math.PI;
        var nx = -Math.sin(ang) * 11 * Math.max(0.7, z), ny = Math.cos(ang) * 11 * Math.max(0.7, z);
        skLabel(ctx, len, (a.x + b.x) / 2 - nx, (a.y + b.y) / 2 - ny, ang, 11 * Math.max(0.8, z), "#2e4fb8", true);
      }
    } else if (el.type === "rect") {
      var r1 = P(el.a), r2 = P(el.b);
      ctx.strokeRect(Math.min(r1.x, r2.x), Math.min(r1.y, r2.y), Math.abs(r2.x - r1.x), Math.abs(r2.y - r1.y));
    } else if (el.type === "circle") {
      var c = P(el.c);
      ctx.beginPath();
      if (el.rx) ctx.ellipse(c.x, c.y, el.rx * z, el.ry * z, 0, 0, Math.PI * 2);
      else ctx.arc(c.x, c.y, el.r * z, 0, Math.PI * 2);
      ctx.stroke();
    } else if (el.type === "dim") {
      var dl = skDimLine(el), d1 = P(dl.a), d2 = P(dl.b);
      ctx.lineWidth = Math.max(1, 1.3 * z);
      if (Math.abs(el.off || 0) > 1) {
        // extension lines from the measured points, a little past the dimension
        var ex = (d1.x - P(el.a).x) / Math.abs(el.off * z), ey = (d1.y - P(el.a).y) / Math.abs(el.off * z);
        ctx.save();
        ctx.lineWidth = Math.max(0.8, 0.9 * z);
        [[P(el.a), d1], [P(el.b), d2]].forEach(function (q) {
          ctx.beginPath();
          ctx.moveTo(q[0].x + ex * 3 * z, q[0].y + ey * 3 * z);
          ctx.lineTo(q[1].x + ex * 5 * z, q[1].y + ey * 5 * z);
          ctx.stroke();
        });
        ctx.restore();
      }
      ctx.beginPath(); ctx.moveTo(d1.x, d1.y); ctx.lineTo(d2.x, d2.y); ctx.stroke();
      // short ticks across the ends, arrows at both
      var da = Math.atan2(d2.y - d1.y, d2.x - d1.x);
      var tx = -Math.sin(da) * 6 * z, ty = Math.cos(da) * 6 * z;
      [d1, d2].forEach(function (p) { ctx.beginPath(); ctx.moveTo(p.x - tx, p.y - ty); ctx.lineTo(p.x + tx, p.y + ty); ctx.stroke(); });
      skArrowHead(ctx, d1, d2, 9 * Math.max(0.7, z));
      skArrowHead(ctx, d2, d1, 9 * Math.max(0.7, z));
      var la = da;
      if (la > Math.PI / 2 || la < -Math.PI / 2) la += Math.PI;
      var text = el.text || skRealLength(skDist(el.a, el.b));
      if (text) skLabel(ctx, text, (d1.x + d2.x) / 2, (d1.y + d2.y) / 2, la, 13 * Math.max(0.8, z), el.color, true);
    } else if (el.type === "leader") {
      // arrow tip at a, line to the elbow b, then a horizontal shelf with
      // the text standing on it, running away from the tip
      var t1 = P(el.a), t2 = P(el.b);
      ctx.lineWidth = Math.max(1, 1.4 * z);
      var size = 13 * Math.max(0.8, z);
      ctx.font = "700 " + size + "px Assistant, Arial, sans-serif";
      var tw = ctx.measureText(el.text || "").width + 10;
      var dirx = t2.x >= t1.x ? 1 : -1;
      var t3 = { x: t2.x + dirx * tw, y: t2.y };
      ctx.beginPath(); ctx.moveTo(t1.x, t1.y); ctx.lineTo(t2.x, t2.y); ctx.lineTo(t3.x, t3.y); ctx.stroke();
      skArrowHead(ctx, t1, t2, 10 * Math.max(0.7, z));
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(el.text || "", (t2.x + t3.x) / 2, t2.y - 2);
      ctx.restore();
    } else if (el.type === "text") {
      var tp = P(el.p);
      ctx.save();
      ctx.font = "700 " + (el.size || 16) * z + "px Assistant, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(el.text, tp.x, tp.y);
      ctx.restore();
    } else if (el.type === "door") {
      // hinge at a, leaf to b, swing arc a quarter turn
      var h = P(el.a), e = P(el.b);
      var rr = skDist(h, e), a0 = Math.atan2(e.y - h.y, e.x - h.x);
      ctx.lineWidth = Math.max(1.2, 2 * z);
      ctx.beginPath(); ctx.moveTo(h.x, h.y); ctx.lineTo(e.x, e.y); ctx.stroke();
      ctx.setLineDash([4 * z, 3 * z]);
      ctx.beginPath(); ctx.arc(h.x, h.y, rr, a0, a0 + Math.PI / 2); ctx.stroke();
      ctx.setLineDash([]);
    } else if (el.type === "window") {
      var w1 = P(el.a), w2 = P(el.b);
      var wa = Math.atan2(w2.y - w1.y, w2.x - w1.x);
      var ox = -Math.sin(wa) * 4 * z, oy = Math.cos(wa) * 4 * z;
      ctx.lineWidth = Math.max(1, 1.4 * z);
      [-1, 0, 1].forEach(function (k) {
        ctx.beginPath(); ctx.moveTo(w1.x + ox * k, w1.y + oy * k); ctx.lineTo(w2.x + ox * k, w2.y + oy * k); ctx.stroke();
      });
    } else if (el.type === "stairs") {
      var s1 = P(el.a), s2 = P(el.b);
      var x = Math.min(s1.x, s2.x), y = Math.min(s1.y, s2.y), w = Math.abs(s2.x - s1.x), hh = Math.abs(s2.y - s1.y);
      ctx.lineWidth = Math.max(1, 1.4 * z);
      ctx.strokeRect(x, y, w, hh);
      var along = w >= hh, n = Math.max(3, Math.round((along ? w : hh) / (10 * z)));
      for (var k = 1; k < n; k++) {
        ctx.beginPath();
        if (along) { ctx.moveTo(x + w * k / n, y); ctx.lineTo(x + w * k / n, y + hh); }
        else { ctx.moveTo(x, y + hh * k / n); ctx.lineTo(x + w, y + hh * k / n); }
        ctx.stroke();
      }
      var m1 = along ? { x: x + 4 * z, y: y + hh / 2 } : { x: x + w / 2, y: y + hh - 4 * z };
      var m2 = along ? { x: x + w - 4 * z, y: y + hh / 2 } : { x: x + w / 2, y: y + 4 * z };
      ctx.beginPath(); ctx.moveTo(m1.x, m1.y); ctx.lineTo(m2.x, m2.y); ctx.stroke();
      skArrowHead(ctx, m2, m1, 8 * Math.max(0.7, z));
    } else if (el.type === "north") {
      var n0 = P(el.p), L = 26 * z;
      ctx.lineWidth = Math.max(1.2, 1.6 * z);
      ctx.beginPath(); ctx.arc(n0.x, n0.y, L * 0.7, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(n0.x, n0.y - L); ctx.lineTo(n0.x - L * 0.3, n0.y + L * 0.4); ctx.lineTo(n0.x, n0.y + L * 0.15); ctx.closePath(); ctx.fill();
      skLabel(ctx, "N", n0.x, n0.y - L - 8 * z, 0, 12 * Math.max(0.8, z), el.color);
    } else if (el.type === "obj") {
      skDrawObj(ctx, el, view);
    } else if (el.type === "image" || el.type === "fill") {
      var img = sk.images[el.id];
      if (!img) {
        img = new Image();
        img.onload = function () { skDraw(); };
        img.src = el.src;
        sk.images[el.id] = img;
      }
      if (img.complete && img.naturalWidth) {
        var ip = P(el.p);
        ctx.save();
        ctx.globalAlpha = el.type === "fill" ? 1 : 0.55;
        ctx.drawImage(el.pattern ? skFillArt(el, img) : img, ip.x, ip.y, el.w * z, el.h * z);
        ctx.restore();
      }
      if (el.type === "fill" && el.areaU && sk.scale) {
        var mid = P(el.mid);
        skLabel(ctx, skAreaText(el.areaU), mid.x, mid.y, 0, 12 * Math.max(0.8, z), "#1f1f1f", true);
      }
    }
  }
  // background picture, then painted areas, then everything drawn on top
  function skDrawLayers(ctx, view) {
    sk.els.forEach(function (el) { if (el.type === "image") skDrawEl(ctx, el, view); });
    sk.els.forEach(function (el) { if (el.type === "fill") skDrawEl(ctx, el, view); });
    sk.els.forEach(function (el) { if (el.type !== "image" && el.type !== "fill") skDrawEl(ctx, el, view); });
  }
  function skDraw() {
    if (sketchView.hidden) return;
    var dpr = window.devicePixelRatio || 1;
    var w = skCanvas.width / dpr, h = skCanvas.height / dpr;
    skCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    skDrawGrid(skCtx, w, h, sk.view);
    skDrawLayers(skCtx, sk.view);
    if (sk.draft) skDrawEl(skCtx, sk.draft, sk.view);
    skDrawObjSelection(skCtx, sk.view);
    skDrawCrop(skCtx);
    var bgShown = skBgSelected();
    if (bgShown) {
      var b0 = skToScreen(bgShown.p), bx = skBgCloseScreen(bgShown);
      skCtx.save();
      skCtx.strokeStyle = "#2e4fb8"; skCtx.lineWidth = 2; skCtx.setLineDash([8, 5]);
      skCtx.strokeRect(b0.x, b0.y, bgShown.w * sk.view.z, bgShown.h * sk.view.z);
      skCtx.setLineDash([]);
      skCtx.shadowColor = "rgba(0,0,0,0.35)"; skCtx.shadowBlur = 4;
      skCtx.beginPath(); skCtx.arc(bx.x, bx.y, 14, 0, Math.PI * 2);
      skCtx.fillStyle = "#d32f2f"; skCtx.fill();
      skCtx.shadowBlur = 0;
      skCtx.strokeStyle = "#fff"; skCtx.lineWidth = 3; skCtx.lineCap = "round";
      skCtx.beginPath(); skCtx.moveTo(bx.x - 5, bx.y - 5); skCtx.lineTo(bx.x + 5, bx.y + 5); skCtx.moveTo(bx.x + 5, bx.y - 5); skCtx.lineTo(bx.x - 5, bx.y + 5); skCtx.stroke();
      skCtx.restore();
    }
    if (sk.draft && sk.snapMark) {
      // the caught end: a green square
      var sm = skToScreen(sk.snapMark);
      skCtx.save();
      skCtx.strokeStyle = "#1e9e3a"; skCtx.lineWidth = 2.5;
      skCtx.strokeRect(sm.x - 7, sm.y - 7, 14, 14);
      skCtx.restore();
    }
    var scaleLabel = document.getElementById("sketchScaleLabel");
    scaleLabel.textContent = sk.scale ? tr("sketchScaleNow").replace("{n}", sk.scale.per + " " + tr(sk.scale.unit === "cm" ? "sketchUnitCm" : "sketchUnitM")) : tr("sketchNoScale");
  }

  // ---- recognizing a held stroke ---------------------------------------
  // straight line / rectangle / circle, or null to keep it freehand
  function skRecognize(pts) {
    if (pts.length < 4) return null;
    var a = pts[0], b = pts[pts.length - 1];
    var len = 0;
    for (var i = 1; i < pts.length; i++) len += skDist(pts[i - 1], pts[i]);
    var chord = skDist(a, b);
    if (chord > 0 && len / chord < 1.15) return { type: "line", a: skSnapPoint(a), b: skSnapPoint(skSnapAngle(a, b)) };
    if (chord > len * 0.25) return skPolyline(pts); // not closed
    var minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    pts.forEach(function (p) {
      minx = Math.min(minx, p.x); maxx = Math.max(maxx, p.x); miny = Math.min(miny, p.y); maxy = Math.max(maxy, p.y);
    });
    var w = maxx - minx, h = maxy - miny, size = Math.max(w, h);
    if (size < 8) return null;
    var cx = (minx + maxx) / 2, cy = (miny + maxy) / 2, rx = w / 2 || 1, ry = h / 2 || 1;
    // how far, on average, the stroke strays from an ellipse in its box
    // and from the box's own sides - whichever it hugs closer wins
    var ellErr = 0, boxErr = 0;
    pts.forEach(function (p) {
      var nx = (p.x - cx) / rx, ny = (p.y - cy) / ry;
      ellErr += Math.abs(Math.hypot(nx, ny) - 1) * Math.min(rx, ry);
      boxErr += Math.min(Math.abs(p.x - minx), Math.abs(p.x - maxx), Math.abs(p.y - miny), Math.abs(p.y - maxy));
    });
    ellErr /= pts.length; boxErr /= pts.length;
    // a triangle, pentagon, hexagon... hugs its own straight sides closer
    var poly = skClosedPolygon(pts, size);
    if (poly && poly.pts.length === 5 && boxErr < size * 0.06) poly = null; // four square corners: a rectangle
    if (poly && poly.err < ellErr && poly.err < boxErr * 0.8) return { type: "stroke", pts: poly.pts };
    if (Math.min(ellErr, boxErr) > size * 0.12) return poly ? { type: "stroke", pts: poly.pts } : null;
    if (ellErr <= boxErr) {
      var ratio = rx / ry;
      if (ratio > 0.8 && ratio < 1.25) return { type: "circle", c: skSnapPoint({ x: cx, y: cy }), r: (rx + ry) / 2 };
      return { type: "circle", c: skSnapPoint({ x: cx, y: cy }), r: (rx + ry) / 2, rx: rx, ry: ry };
    }
    return { type: "rect", a: skSnapPoint({ x: minx, y: miny }), b: skSnapPoint({ x: maxx, y: maxy }) };
  }

  // several lines in one stroke: each straight run becomes a straight line
  // between its corners, keeping the direction it was drawn in
  function skPolyline(pts) {
    var minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    pts.forEach(function (p) {
      minx = Math.min(minx, p.x); maxx = Math.max(maxx, p.x); miny = Math.min(miny, p.y); maxy = Math.max(maxy, p.y);
    });
    var keep = {};
    keep[0] = keep[pts.length - 1] = true;
    skRdp(pts, Math.max(6, Math.max(maxx - minx, maxy - miny) * 0.06), 0, pts.length - 1, keep);
    var idx = Object.keys(keep).map(Number).sort(function (x, y) { return x - y; });
    var out = idx.map(function (i) { return { x: pts[i].x, y: pts[i].y }; });
    // drop runs too short to be a line of their own
    out = out.filter(function (p, i) { return i === 0 || i === out.length - 1 || skDist(p, out[i - 1]) > 6; });
    if (out.length < 3 || out.length > 12) return null;
    return { type: "stroke", pts: out };
  }

  // a closed stroke as a polygon of 3-8 straight sides: { pts, err } or null.
  // One that is nearly regular is made exactly regular.
  function skClosedPolygon(pts, size) {
    var keep = {};
    keep[0] = keep[pts.length - 1] = true;
    skRdp(pts, Math.max(6, size * 0.06), 0, pts.length - 1, keep);
    var v = Object.keys(keep).map(Number).sort(function (x, y) { return x - y; })
      .map(function (i) { return { x: pts[i].x, y: pts[i].y }; });
    v.pop(); // the end meets the start
    v = v.filter(function (p, i) { return !i || skDist(p, v[i - 1]) > size * 0.08; });
    // the start was mid-side: no corner there
    var turn = function (i) {
      var a = v[(i + v.length - 1) % v.length], b = v[i], c = v[(i + 1) % v.length];
      var a1 = Math.atan2(b.y - a.y, b.x - a.x), a2 = Math.atan2(c.y - b.y, c.x - b.x);
      return Math.abs(Math.atan2(Math.sin(a2 - a1), Math.cos(a2 - a1)));
    };
    for (var i = v.length - 1; i >= 0 && v.length > 3; i--) if (turn(i) < 0.35) v.splice(i, 1);
    if (v.length < 3 || v.length > 8) return null;
    var n = v.length, cx = 0, cy = 0;
    v.forEach(function (p) { cx += p.x / n; cy += p.y / n; });
    var sides = v.map(function (p, k) { return skDist(p, v[(k + 1) % n]); });
    var radii = v.map(function (p) { return skDist(p, { x: cx, y: cy }); });
    var mean = function (a) { return a.reduce(function (x, y) { return x + y; }, 0) / a.length; };
    var ms = mean(sides), mr = mean(radii);
    var even = function (a, m) { return a.every(function (x) { return Math.abs(x - m) < m * 0.22; }); };
    if (even(sides, ms) && even(radii, mr)) {
      var area = 0;
      v.forEach(function (p, k) { var q = v[(k + 1) % n]; area += p.x * q.y - q.x * p.y; });
      var step = (area < 0 ? -1 : 1) * Math.PI * 2 / n, sx = 0, sy = 0;
      v.forEach(function (p, k) {
        var a0 = Math.atan2(p.y - cy, p.x - cx) - k * step;
        sx += Math.cos(a0); sy += Math.sin(a0);
      });
      var start = Math.atan2(sy, sx);
      v = v.map(function (p, k) { return { x: cx + mr * Math.cos(start + k * step), y: cy + mr * Math.sin(start + k * step) }; });
    }
    var err = 0;
    pts.forEach(function (p) {
      var d = Infinity;
      for (var k = 0; k < n; k++) d = Math.min(d, skSegDist(p, v[k], v[(k + 1) % n]));
      err += d;
    });
    return { pts: v.concat([{ x: v[0].x, y: v[0].y }]), err: err / pts.length };
  }

  // ---- hit testing (eraser) ---------------------------------------------
  function skSegDist(p, a, b) {
    var dx = b.x - a.x, dy = b.y - a.y, l2 = dx * dx + dy * dy;
    var t = l2 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2)) : 0;
    return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
  }
  function skHit(el, p, tol) {
    switch (el.type) {
      case "stroke":
        for (var i = 1; i < el.pts.length; i++) if (skSegDist(p, el.pts[i - 1], el.pts[i]) < tol) return true;
        return false;
      case "dim":
        var dl = skDimLine(el);
        return skSegDist(p, dl.a, dl.b) < tol;
      case "line": case "wall": case "door": case "window":
        return skSegDist(p, el.a, el.b) < tol;
      case "leader":
        return skSegDist(p, el.a, el.b) < tol || (Math.abs(p.y - el.b.y) < tol && Math.abs(p.x - el.b.x) < 120);
      case "rect": case "stairs":
        var c = [el.a, { x: el.b.x, y: el.a.y }, el.b, { x: el.a.x, y: el.b.y }];
        for (var k = 0; k < 4; k++) if (skSegDist(p, c[k], c[(k + 1) % 4]) < tol) return true;
        return el.type === "stairs" && p.x > Math.min(el.a.x, el.b.x) && p.x < Math.max(el.a.x, el.b.x) && p.y > Math.min(el.a.y, el.b.y) && p.y < Math.max(el.a.y, el.b.y);
      case "circle":
        if (el.rx) return Math.abs(Math.hypot((p.x - el.c.x) / el.rx, (p.y - el.c.y) / el.ry) - 1) * Math.min(el.rx, el.ry) < tol;
        return Math.abs(skDist(p, el.c) - el.r) < tol;
      case "text": return skDist(p, el.p) < tol * 2.5;
      case "north": return skDist(p, el.p) < 30;
      case "image": return false; // removed with its own button
      case "fill": return skFillHas(el, p);
      case "obj": return skObjHas(el, p, tol / 2);
    }
    return false;
  }

  // ---- painting an area -------------------------------------------------
  // The lines around the touch are drawn into a bitmap, the area is
  // flooded from the touch, and the result is kept as a see-through
  // picture lying under the lines. An area that isn't closed isn't painted.
  var SK_FILL_ALPHA = 90; // of 255
  function skFillBarriers() {
    return sk.els.filter(function (el) {
      return ["stroke", "line", "wall", "rect", "circle", "door", "window"].indexOf(el.type) >= 0;
    });
  }
  function skFill(p) {
    var walls = skFillBarriers();
    var minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    walls.forEach(function (el) {
      skSegmentsOf(el).forEach(function (sg) {
        sg.forEach(function (q) { minx = Math.min(minx, q.x); miny = Math.min(miny, q.y); maxx = Math.max(maxx, q.x); maxy = Math.max(maxy, q.y); });
      });
    });
    if (!walls.length || p.x <= minx || p.x >= maxx || p.y <= miny || p.y >= maxy) { showToast(tr("sketchFillOpen")); return; }
    minx -= 4; miny -= 4; maxx += 4; maxy += 4;
    var k = Math.min(2, 1600 / Math.max(maxx - minx, maxy - miny)); // pixels per world unit
    var W = Math.ceil((maxx - minx) * k), H = Math.ceil((maxy - miny) * k);
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var ctx = c.getContext("2d");
    ctx.strokeStyle = "#000";
    ctx.lineCap = ctx.lineJoin = "round";
    var halfLine = 0;
    walls.forEach(function (el) {
      // a little thicker than drawn, so a hand-drawn corner that almost meets still closes
      ctx.lineWidth = Math.max((el.type === "wall" ? 7 : (el.w || SK_WIDTHS[1])) * k, 1.5) + 3;
      halfLine = Math.max(halfLine, ctx.lineWidth / 2);
      ctx.beginPath();
      skSegmentsOf(el).forEach(function (sg) {
        ctx.moveTo((sg[0].x - minx) * k, (sg[0].y - miny) * k);
        ctx.lineTo((sg[1].x - minx) * k, (sg[1].y - miny) * k);
      });
      ctx.stroke();
    });
    var px = ctx.getImageData(0, 0, W, H).data;
    var ink = new Uint8Array(W * H), area = new Uint8Array(W * H);
    for (var i = 0; i < W * H; i++) ink[i] = px[i * 4 + 3] > 40 ? 1 : 0;
    var sx = Math.floor((p.x - minx) * k), sy = Math.floor((p.y - miny) * k), start = sy * W + sx;
    if (ink[start]) { showToast(tr("sketchFillOpen")); return; }
    var stack = [start], open = false, n = 0;
    area[start] = 1;
    while (stack.length) {
      var j = stack.pop(), x = j % W, y = (j - x) / W;
      n++;
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) { open = true; break; }
      [j - 1, j + 1, j - W, j + W].forEach(function (q) { if (!area[q] && !ink[q]) { area[q] = 1; stack.push(q); } });
    }
    if (open || n < 4) { showToast(tr("sketchFillOpen")); return; }
    // reach a few pixels into the lines, so no white seam shows along them
    for (var pass = 0; pass < 3; pass++) {
      var grow = [];
      for (var q = W; q < W * H - W; q++) {
        if (!area[q] && ink[q] && (area[q - 1] || area[q + 1] || area[q - W] || area[q + W])) grow.push(q);
      }
      grow.forEach(function (q2) { area[q2] = 1; });
    }
    // its size, measured to the middle of its lines, and its middle - for
    // the m² label when there's a scale
    var meas = area.slice();
    for (var mp = 3; mp < Math.round(halfLine); mp++) {
      var more = [];
      for (var mq = W; mq < W * H - W; mq++) {
        if (!meas[mq] && ink[mq] && (meas[mq - 1] || meas[mq + 1] || meas[mq - W] || meas[mq + W])) more.push(mq);
      }
      more.forEach(function (q3) { meas[q3] = 1; });
    }
    var cnt = 0, sumX = 0, sumY = 0;
    for (var mm = 0; mm < W * H; mm++) {
      if (!meas[mm]) continue;
      var ax = mm % W;
      cnt++; sumX += ax; sumY += (mm - ax) / W;
    }
    var x0 = W, y0 = H, x1 = 0, y1 = 0;
    for (var m = 0; m < W * H; m++) {
      if (!area[m]) continue;
      var mx = m % W, my = (m - mx) / W;
      if (mx < x0) x0 = mx; if (mx > x1) x1 = mx; if (my < y0) y0 = my; if (my > y1) y1 = my;
    }
    var cw = x1 - x0 + 1, ch = y1 - y0 + 1;
    var out = document.createElement("canvas");
    out.width = cw; out.height = ch;
    var octx = out.getContext("2d"), img = octx.createImageData(cw, ch);
    var pattern = sk.fillKind && sk.fillKind !== "color" ? sk.fillKind : null;
    var hex = sk.color.replace("#", ""), r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
    for (var yy = 0; yy < ch; yy++) {
      for (var xx = 0; xx < cw; xx++) {
        if (!area[(yy + y0) * W + xx + x0]) continue;
        var o = (yy * cw + xx) * 4;
        img.data[o] = r; img.data[o + 1] = g; img.data[o + 2] = b; img.data[o + 3] = pattern ? 235 : SK_FILL_ALPHA;
      }
    }
    octx.putImageData(img, 0, 0);
    var el = { type: "fill", id: uid(), src: out.toDataURL("image/png"), p: { x: minx + x0 / k, y: miny + y0 / k }, w: cw / k, h: ch / k, color: sk.color,
      areaU: cnt / (k * k), mid: { x: minx + (sumX / cnt + 0.5) / k, y: miny + (sumY / cnt + 0.5) / k } };
    if (pattern) {
      el.pattern = pattern;
      if (pattern === "road") el.axis = skAreaAxis(area, W, H, minx, miny, k);
    }
    skCommit(function () {
      // painting an area again replaces its old colour
      sk.els = sk.els.filter(function (e) { return !(e.type === "fill" && skFillHas(e, p)); });
      sk.els.push(el);
    });
  }
  // the long axis of a painted area (its centre, direction and half length)
  function skAreaAxis(area, W, H, minx, miny, k) {
    var n = 0, sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0;
    for (var i = 0; i < W * H; i += 2) {
      if (!area[i]) continue;
      var x = i % W, y = (i - x) / W;
      n++; sx += x; sy += y; sxx += x * x; syy += y * y; sxy += x * y;
    }
    var cx = sx / n, cy = sy / n, vxx = sxx / n - cx * cx, vyy = syy / n - cy * cy, vxy = sxy / n - cx * cy;
    var ang = 0.5 * Math.atan2(2 * vxy, vxx - vyy);
    return { cx: minx + cx / k, cy: miny + cy / k, ang: ang, len: (W + H) / k };
  }
  // is p inside the painted part of a fill (its picture's see-through pixels aside)?
  function skFillHas(el, p) {
    if (p.x < el.p.x || p.y < el.p.y || p.x > el.p.x + el.w || p.y > el.p.y + el.h) return false;
    var img = sk.images[el.id];
    if (!img || !img.naturalWidth) return true;
    if (!sk.fillMasks) sk.fillMasks = {};
    var mask = sk.fillMasks[el.id];
    if (!mask) {
      var c = document.createElement("canvas");
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      c.getContext("2d").drawImage(img, 0, 0);
      mask = sk.fillMasks[el.id] = { data: c.getContext("2d").getImageData(0, 0, c.width, c.height).data, w: c.width, h: c.height };
    }
    var x = Math.min(mask.w - 1, Math.floor((p.x - el.p.x) / el.w * mask.w));
    var y = Math.min(mask.h - 1, Math.floor((p.y - el.p.y) / el.h * mask.h));
    return mask.data[(y * mask.w + x) * 4 + 3] > 0;
  }

  // ---- input --------------------------------------------------------------
  var skPointers = {};
  var skPinch = null;
  var skHoldTimer = null;
  var skLastMove = null;
  var skDimMove = null;
  // a long press on the background picture picks it up; the finger then
  // moves it about the page
  var skBgHold = null, skBgMove = null;
  function skBgAt(p) {
    return sk.els.find(function (el) {
      return el.type === "image" && p.x >= el.p.x && p.y >= el.p.y && p.x <= el.p.x + el.w && p.y <= el.p.y + el.h;
    });
  }
  // the picked-up background keeps a frame and a red ✕ (removes it) until
  // the next touch elsewhere
  function skBgSelected() { return sk.bgSel ? sk.els.find(function (el) { return el.type === "image"; }) : null; }
  // the ✕ on screen: at the picture's top corner, kept in view
  function skBgCloseScreen(el) {
    var q = skToScreen({ x: el.p.x + el.w, y: el.p.y });
    var dpr = window.devicePixelRatio || 1, W = skCanvas.width / dpr, H = skCanvas.height / dpr;
    return { x: Math.max(20, Math.min(W - 20, q.x)), y: Math.max(48, Math.min(H - 20, q.y)) };
  }
  function skBgCancel() {
    if (skBgHold) { clearTimeout(skBgHold.timer); skBgHold = null; }
    if (skBgMove) { skBgMove.el.p = skBgMove.p0; skBgMove = null; }
  }
  function skStartDraft(p) {
    var t = sk.tool, color = sk.color, w = SK_WIDTHS[sk.width];
    var s = skSnapPoint(p);
    if (t === "pen") return { type: "stroke", pts: [p], color: color, w: w };
    if (t === "line" || t === "wall") return { type: t, a: s, b: s, color: color, w: w };
    if (t === "dim" || t === "door" || t === "window" || t === "stairs") return { type: t, a: s, b: s, color: color, w: w };
    if (t === "leader") return { type: "leader", a: p, b: p, text: "", color: color, w: w };
    return null;
  }
  function skUpdateDraft(p) {
    var d = sk.draft;
    if (!d || d.locked) return; // straightened while held: final
    if (d.type === "stroke") { d.pts.push(p); return; }
    var e = d.type !== "leader" && skEndSnap(p);
    var b = e ? { x: e.x, y: e.y } : d.type === "leader" ? p : skSnapPoint(d.type === "stairs" ? p : skSnapAngle(d.a, p));
    d.b = b;
  }
  function skShowLenTip(e) {
    var d = sk.draft;
    var show = d && (d.type === "line" || d.type === "wall" || d.type === "dim") && sk.scale;
    skLenTip.hidden = !show;
    if (!show) return;
    skLenTip.textContent = skRealLength(skDist(d.a, d.b));
    var r = skCanvas.getBoundingClientRect();
    skLenTip.style.left = (e.clientX - r.left + 14) + "px";
    skLenTip.style.top = (e.clientY - r.top - 34) + "px";
  }
  // ---- erasing piece by piece -------------------------------------------
  // A line, wall, rectangle or pen stroke is erased only between the two
  // break points around the touch: where another line crosses it, and its
  // own corners (a rectangle's, or a pen stroke's sharp turns). Anything
  // else, or a line with no break points, goes whole.
  function skRdp(pts, eps, first, last, keep) {
    var maxD = 0, idx = -1;
    for (var i = first + 1; i < last; i++) {
      var d = skSegDist(pts[i], pts[first], pts[last]);
      if (d > maxD) { maxD = d; idx = i; }
    }
    if (maxD > eps) { keep[idx] = true; skRdp(pts, eps, first, idx, keep); skRdp(pts, eps, idx, last, keep); }
  }
  // { pts, closed, corners: [index...] } or null (erased whole)
  function skPathOf(el) {
    if (el.type === "line" || el.type === "wall") return { pts: [el.a, el.b], closed: false, corners: [] };
    if (el.type === "rect") {
      return { pts: [el.a, { x: el.b.x, y: el.a.y }, el.b, { x: el.a.x, y: el.b.y }], closed: true, corners: [0, 1, 2, 3] };
    }
    if (el.type === "stroke" && el.pts.length > 1) {
      var keep = {};
      skRdp(el.pts, 4, 0, el.pts.length - 1, keep);
      return { pts: el.pts, closed: false, corners: Object.keys(keep).map(Number) };
    }
    return null;
  }
  // every straight piece of another element, for crossings
  function skSegmentsOf(el) {
    var segs = [];
    var path = skPathOf(el);
    if (path) {
      var n = path.pts.length;
      for (var i = 0; i < (path.closed ? n : n - 1); i++) segs.push([path.pts[i], path.pts[(i + 1) % n]]);
    } else if (el.type === "circle") {
      var rx = el.rx || el.r, ry = el.ry || el.r, prev = null;
      for (var k = 0; k <= 48; k++) {
        var q = { x: el.c.x + rx * Math.cos(k / 48 * Math.PI * 2), y: el.c.y + ry * Math.sin(k / 48 * Math.PI * 2) };
        if (prev) segs.push([prev, q]);
        prev = q;
      }
    } else if (el.a && el.b && (el.type === "dim" || el.type === "door" || el.type === "window" || el.type === "leader")) {
      var sl = el.type === "dim" ? skDimLine(el) : el;
      segs.push([sl.a, sl.b]);
    }
    return segs;
  }
  function skCross(p1, p2, p3, p4) {
    var d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
    if (Math.abs(d) < 1e-9) return null;
    var t = ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
    var u = ((p3.x - p1.x) * (p2.y - p1.y) - (p3.y - p1.y) * (p2.x - p1.x)) / d;
    return (t >= 0 && t <= 1 && u >= 0 && u <= 1) ? t : null;
  }
  // the points of a path between two distances along it
  function skSubPath(pts, cum, from, to) {
    var out = [];
    var at = function (sDist) {
      for (var i = 1; i < pts.length; i++) {
        if (sDist <= cum[i] + 1e-9) {
          var seg = cum[i] - cum[i - 1] || 1, t = (sDist - cum[i - 1]) / seg;
          return { x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t, y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t };
        }
      }
      return pts[pts.length - 1];
    };
    out.push(at(from));
    for (var i = 0; i < pts.length; i++) if (cum[i] > from + 1e-6 && cum[i] < to - 1e-6) out.push(pts[i]);
    out.push(at(to));
    return out;
  }
  function skErasePiece(index, p) {
    var el = sk.els[index];
    var path = skPathOf(el);
    if (!path) return null;
    var pts = path.closed ? path.pts.concat([path.pts[0]]) : path.pts.slice();
    var cum = [0];
    for (var i = 1; i < pts.length; i++) cum.push(cum[i - 1] + skDist(pts[i - 1], pts[i]));
    var total = cum[cum.length - 1];
    if (total < 1) return null;
    // where on the path the touch is
    var best = Infinity, sTap = 0;
    for (var j = 1; j < pts.length; j++) {
      var a = pts[j - 1], b = pts[j], dx = b.x - a.x, dy = b.y - a.y, l2 = dx * dx + dy * dy;
      var t = l2 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2)) : 0;
      var dd = Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
      if (dd < best) { best = dd; sTap = cum[j - 1] + t * (cum[j] - cum[j - 1]); }
    }
    // break points: corners and crossings
    var bps = path.corners.map(function (ci) { return cum[ci]; });
    sk.els.forEach(function (other, oi) {
      if (oi === index) return;
      skSegmentsOf(other).forEach(function (seg) {
        for (var k = 1; k < pts.length; k++) {
          var tt = skCross(pts[k - 1], pts[k], seg[0], seg[1]);
          if (tt !== null) bps.push(cum[k - 1] + tt * (cum[k] - cum[k - 1]));
        }
      });
    });
    var eps = 0.5;
    // an open path's own ends aren't break points; a closed one's start is a corner
    bps = path.closed ?
      bps.map(function (x) { return x >= total - eps ? 0 : x; }) :
      bps.filter(function (x) { return x > eps && x < total - eps; });
    bps.sort(function (x, y) { return x - y; });
    var s0 = null, s1 = null;
    bps.forEach(function (x) {
      if (x < sTap - eps) s0 = x;
      if (x > sTap + eps && s1 === null) s1 = x;
    });
    var pieces = [];
    if (path.closed) {
      if (bps.length < 2) return [];
      if (s0 === null) s0 = bps[bps.length - 1] - total;
      if (s1 === null) s1 = bps[0] + total;
      // what's left runs from s1 round to s0
      var twice = pts.concat(pts.slice(1));
      var cum2 = cum.concat(cum.slice(1).map(function (x) { return x + total; }));
      var from = s1, to = s0 + total;
      if (from >= total) { from -= total; to -= total; }
      pieces.push(skSubPath(twice, cum2, from, to));
    } else {
      if (s0 !== null) pieces.push(skSubPath(pts, cum, 0, s0));
      if (s1 !== null) pieces.push(skSubPath(pts, cum, s1, total));
    }
    // back into shapes: straight pieces stay lines/walls, pen pieces strokes
    var out = [];
    pieces.forEach(function (piece) {
      if (piece.length < 2) return;
      if (el.type === "stroke") {
        out.push({ type: "stroke", pts: piece, color: el.color, w: el.w });
        return;
      }
      for (var q = 1; q < piece.length; q++) {
        if (skDist(piece[q - 1], piece[q]) < 1) continue;
        out.push({ type: el.type === "wall" ? "wall" : "line", a: piece[q - 1], b: piece[q], color: el.color, w: el.w });
      }
    });
    return out;
  }
  function skErase(p) {
    var tol = 10 / sk.view.z;
    // the lines first: a painted area lies under them
    var order = [];
    for (var i = sk.els.length - 1; i >= 0; i--) if (sk.els[i].type !== "fill") order.push(i);
    for (i = sk.els.length - 1; i >= 0; i--) if (sk.els[i].type === "fill") order.push(i);
    for (var o = 0; o < order.length; o++) {
      i = order[o];
      if (skHit(sk.els[i], p, tol)) {
        var idx = i;
        var rest = skErasePiece(idx, p);
        skCommit(function () {
          if (rest) sk.els.splice.apply(sk.els, [idx, 1].concat(rest));
          else sk.els.splice(idx, 1);
        });
        return;
      }
    }
  }

  skCanvas.addEventListener("pointerdown", function (e) {
    skCanvas.setPointerCapture(e.pointerId);
    skPointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(skPointers);
    if (ids.length === 2) {
      // a second finger: pan + zoom, and whatever was being drawn is dropped
      clearTimeout(skHoldTimer);
      sk.draft = null;
      if (skDimMove) { skDimMove.el.off = skDimMove.off; skDimMove = null; }
      skObjCancelDrag();
      skBgCancel();
      if (sk.crop) sk.crop.drag = null;
      skLenTip.hidden = true;
      var a = skPointers[ids[0]], b = skPointers[ids[1]];
      skPinch = { d: Math.hypot(a.x - b.x, a.y - b.y), mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, view: Object.assign({}, sk.view) };
      skDraw();
      return;
    }
    if (ids.length > 2) return;
    var p = skEventPoint(e);
    if (sk.crop) { skCropDown(p); return; }
    ["sketchShapesMenu", "sketchObjMenu", "sketchFillMenu", "sketchBgMenu"].forEach(function (id) { document.getElementById(id).hidden = true; });
    var selBg = skBgSelected();
    if (selBg) {
      sk.bgSel = false;
      if (skDist(skToScreen(p), skBgCloseScreen(selBg)) < 22) {
        skCommit(function () { sk.els = sk.els.filter(function (el) { return el !== selBg; }); });
        return;
      }
      skDraw();
    }
    if (skObjPointerDown(p)) return;
    var bg = ["eraser", "fill", "text", "north"].indexOf(sk.tool) < 0 && skBgAt(p);
    if (bg) {
      skBgHold = { el: bg, screen: { x: e.clientX, y: e.clientY }, at: p };
      skBgHold.timer = setTimeout(function () {
        var h = skBgHold;
        skBgHold = null;
        if (!h) return;
        // whatever the press had started (a line, a pan...) is dropped
        clearTimeout(skHoldTimer);
        sk.draft = null;
        if (skPinch && skPinch.pan) { sk.view = skPinch.view; skPinch = null; }
        if (skDimMove) { skDimMove.el.off = skDimMove.off; skDimMove = null; }
        skLenTip.hidden = true;
        skBgMove = { el: h.el, start: h.at, p0: { x: h.el.p.x, y: h.el.p.y }, before: JSON.stringify(sk.els) };
        sk.bgSel = true;
        if (navigator.vibrate) { try { navigator.vibrate(25); } catch (err) {} }
        skDraw();
      }, 550);
    }
    if (sk.tool === "hand") { skPinch = { pan: true, start: { x: e.clientX, y: e.clientY }, view: Object.assign({}, sk.view) }; return; }
    if (sk.tool === "eraser") { skErase(p); return; }
    if (sk.tool === "fill") { skFill(p); return; }
    if (sk.tool === "text") { skAskText("", function (text) { skCommit(function () { sk.els.push({ type: "text", p: p, text: text, color: sk.color, size: 16 }); }); }); return; }
    if (sk.tool === "north") { skCommit(function () { sk.els.push({ type: "north", p: skSnapPoint(p), color: sk.color }); }); return; }
    // pressing on a dimension with the dimension tool shifts it sideways
    if (sk.tool === "dim") {
      for (var i = sk.els.length - 1; i >= 0; i--) {
        // away from its ends, so a new dimension can start where one ends
        var dl = sk.els[i].type === "dim" && skDimLine(sk.els[i]);
        if (dl && skHit(sk.els[i], p, 12 / sk.view.z) && Math.min(skDist(p, dl.a), skDist(p, dl.b)) > 16 / sk.view.z) {
          skDimMove = { el: sk.els[i], start: p, off: sk.els[i].off || 0, before: JSON.stringify(sk.els) };
          return;
        }
      }
    }
    sk.draft = skStartDraft(p);
    skLastMove = { x: e.clientX, y: e.clientY };
    skDraw();
  });
  skCanvas.addEventListener("pointermove", function (e) {
    if (!skPointers[e.pointerId]) return;
    skPointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(skPointers);
    if (skPinch && !skPinch.pan && ids.length === 2) {
      var a = skPointers[ids[0]], b = skPointers[ids[1]];
      var d = Math.hypot(a.x - b.x, a.y - b.y);
      var mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      var z = Math.max(0.25, Math.min(6, skPinch.view.z * d / skPinch.d));
      var r = skCanvas.getBoundingClientRect();
      // keep the world point under the starting midpoint under the fingers
      var wx = (skPinch.mid.x - r.left) / skPinch.view.z + skPinch.view.x;
      var wy = (skPinch.mid.y - r.top) / skPinch.view.z + skPinch.view.y;
      sk.view = { z: z, x: wx - (mid.x - r.left) / z, y: wy - (mid.y - r.top) / z };
      skDraw();
      return;
    }
    if (sk.crop) { if (ids.length === 1) skCropMove(skEventPoint(e)); return; }
    if (skBgHold && Math.hypot(e.clientX - skBgHold.screen.x, e.clientY - skBgHold.screen.y) > 8) skBgCancel();
    if (skBgMove) {
      var bq = skEventPoint(e);
      skBgMove.el.p = { x: skBgMove.p0.x + bq.x - skBgMove.start.x, y: skBgMove.p0.y + bq.y - skBgMove.start.y };
      skDraw();
      return;
    }
    if (skPinch && skPinch.pan) {
      sk.view = Object.assign({}, skPinch.view, {
        x: skPinch.view.x - (e.clientX - skPinch.start.x) / sk.view.z,
        y: skPinch.view.y - (e.clientY - skPinch.start.y) / sk.view.z
      });
      skDraw();
      return;
    }
    if (skObjPointerMove(skEventPoint(e))) return;
    if (sk.tool === "eraser" && e.buttons) { skErase(skEventPoint(e)); return; }
    if (skDimMove) {
      var m = skDimMove, q = skEventPoint(e), el = m.el, len = skDist(el.a, el.b) || 1;
      var off = m.off + ((q.x - m.start.x) * -(el.b.y - el.a.y) + (q.y - m.start.y) * (el.b.x - el.a.x)) / len;
      el.off = sk.snap ? Math.round(off / (SK_CELL / 2)) * (SK_CELL / 2) : off;
      skDraw();
      return;
    }
    if (!sk.draft) return;
    skUpdateDraft(skEventPoint(e));
    skShowLenTip(e);
    // the pen held still near the end: straighten what was drawn
    if (sk.draft.type === "stroke" && Math.hypot(e.clientX - skLastMove.x, e.clientY - skLastMove.y) > 3) {
      skLastMove = { x: e.clientX, y: e.clientY };
      clearTimeout(skHoldTimer);
      skHoldTimer = setTimeout(function () {
        var shape = sk.draft && sk.draft.type === "stroke" && skRecognize(sk.draft.pts);
        if (shape) {
          shape.color = sk.draft.color;
          shape.w = sk.draft.w;
          shape.locked = true;
          sk.draft = shape;
          if (navigator.vibrate) { try { navigator.vibrate(20); } catch (err) {} }
          skDraw();
        }
      }, 550);
    }
    skDraw();
  });
  function skPointerEnd(e) {
    delete skPointers[e.pointerId];
    clearTimeout(skHoldTimer);
    if (skBgHold) { clearTimeout(skBgHold.timer); skBgHold = null; }
    if (skPinch) {
      if (!Object.keys(skPointers).length) { skPinch = null; skSaveDraft(); }
      return;
    }
    if (sk.crop) { skCropEnd(); return; }
    if (skBgMove) {
      var bm = skBgMove;
      skBgMove = null;
      if (bm.el.p.x !== bm.p0.x || bm.el.p.y !== bm.p0.y) {
        sk.undo.push(bm.before);
        if (sk.undo.length > 80) sk.undo.shift();
        sk.redo = [];
        skSaveDraft();
        skUpdateButtons();
      }
      skDraw();
      return;
    }
    if (skObjPointerEnd()) return;
    if (skDimMove) {
      var m = skDimMove;
      skDimMove = null;
      if ((m.el.off || 0) !== m.off) {
        // one undo step back to where it was
        sk.undo.push(m.before);
        if (sk.undo.length > 80) sk.undo.shift();
        sk.redo = [];
        skSaveDraft();
        skUpdateButtons();
      }
      skDraw();
      return;
    }
    var d = sk.draft;
    sk.draft = null;
    sk.snapMark = null;
    skLenTip.hidden = true;
    if (!d) return;
    delete d.locked;
    if (d.type === "stroke") {
      if (d.pts.length < 2) d.pts.push({ x: d.pts[0].x + 0.5, y: d.pts[0].y });
    } else if (d.type !== "circle" && skDist(d.a, d.b) < 4) {
      skDraw();
      return; // a tap, not a drag
    }
    if (d.type === "dim") {
      skAskText(skRealLength(skDist(d.a, d.b)), function (text) {
        d.text = text;
        skCommit(function () { sk.els.push(d); });
      }, true);
      return;
    }
    if (d.type === "leader") {
      skAskText("", function (text) {
        d.text = text;
        skCommit(function () { sk.els.push(d); });
      });
      return;
    }
    skCommit(function () { sk.els.push(d); });
  }
  skCanvas.addEventListener("pointerup", skPointerEnd);
  skCanvas.addEventListener("pointercancel", skPointerEnd);
  skCanvas.addEventListener("wheel", function (e) {
    e.preventDefault();
    var r = skCanvas.getBoundingClientRect();
    var sx = e.clientX - r.left, sy = e.clientY - r.top;
    var w = skToWorld(sx, sy);
    var z = Math.max(0.25, Math.min(6, sk.view.z * (e.deltaY < 0 ? 1.15 : 1 / 1.15)));
    sk.view = { z: z, x: w.x - sx / z, y: w.y - sy / z };
    skDraw();
  }, { passive: false });

  // ---- text entry (text, dimension, callout) -----------------------------
  var skTextOverlay = document.getElementById("sketchTextOverlay");
  var skTextInput = document.getElementById("sketchTextInput");
  var skTextDone = null;
  function skAskText(initial, done, allowEmpty) {
    skTextInput.value = initial || "";
    skTextDone = { fn: done, allowEmpty: !!allowEmpty };
    document.getElementById("sketchTextHint").hidden = !(allowEmpty && initial);
    skTextOverlay.hidden = false;
    setTimeout(function () { skTextInput.focus(); skTextInput.select(); }, 30);
  }
  document.getElementById("sketchTextForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var t = skTextInput.value.trim();
    var pending = skTextDone;
    skTextOverlay.hidden = true;
    skTextDone = null;
    if (!pending || (!t && !pending.allowEmpty)) { skDraw(); return; }
    pending.fn(t);
  });
  document.getElementById("sketchTextCancelBtn").addEventListener("click", function () {
    skTextOverlay.hidden = true;
    skTextDone = null;
    skDraw();
  });

  // ---- scale -----------------------------------------------------------------
  var skScaleOverlay = document.getElementById("sketchScaleOverlay");
  document.getElementById("sketchScaleBtn").addEventListener("click", function () {
    document.getElementById("sketchScalePer").value = sk.scale ? sk.scale.per : 50;
    document.getElementById("sketchScaleUnit").value = sk.scale ? sk.scale.unit : "cm";
    skScaleOverlay.hidden = false;
  });
  document.getElementById("sketchScaleSaveBtn").addEventListener("click", function () {
    var per = parseFloat(document.getElementById("sketchScalePer").value);
    var unit = document.getElementById("sketchScaleUnit").value;
    sk.scale = per > 0 ? { per: per, unit: unit } : null;
    skScaleOverlay.hidden = true;
    skSaveDraft();
    skDraw();
  });
  document.getElementById("sketchScaleOffBtn").addEventListener("click", function () {
    sk.scale = null;
    skScaleOverlay.hidden = true;
    skSaveDraft();
    skDraw();
  });
  document.getElementById("sketchScaleCancelBtn").addEventListener("click", function () { skScaleOverlay.hidden = true; });

  // ---- toolbar -----------------------------------------------------------------
  function skUpdateButtons() {
    document.querySelectorAll(".sk-tool").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-tool") === sk.tool); });
    document.querySelectorAll(".sk-color").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-color") === sk.color); });
    document.querySelectorAll(".sk-width").forEach(function (b) { b.classList.toggle("on", +b.getAttribute("data-width") === sk.width); });
    document.getElementById("sketchUndoBtn").disabled = !sk.undo.length;
    document.getElementById("sketchRedoBtn").disabled = !sk.redo.length;
    document.getElementById("sketchSnapBtn").classList.toggle("on", sk.snap);
    document.getElementById("sketchShapesMenu").hidden = true;
    document.getElementById("sketchObjMenu").hidden = true;
    document.getElementById("sketchFillMenu").hidden = true;
    document.getElementById("sketchBgMenu").hidden = true;
    document.getElementById("sketchObjBtn").classList.toggle("on", sk.tool === "obj");
    if (sk.tool !== "obj" && sk.objSel) { sk.objSel = null; skDraw(); }
  }
  document.querySelectorAll(".sk-tool").forEach(function (b) {
    b.addEventListener("click", function () {
      sk.tool = b.getAttribute("data-tool");
      if (sk.bgSel) { sk.bgSel = false; skDraw(); }
      skUpdateButtons();
      if (sk.tool === "leader") showToast(tr("sketchLeaderHint"), 2500);
      else if (sk.tool === "dim") showToast(tr("sketchDimHint"), 2500);
      else if (sk.tool === "door") showToast(tr("sketchDoorHint"), 2500);
    });
  });
  document.getElementById("sketchShapesBtn").addEventListener("click", function () {
    var m = document.getElementById("sketchShapesMenu");
    m.hidden = !m.hidden;
  });
  document.querySelectorAll(".sk-color").forEach(function (b) {
    b.addEventListener("click", function () { sk.color = b.getAttribute("data-color"); skUpdateButtons(); });
  });
  document.querySelectorAll(".sk-width").forEach(function (b) {
    b.addEventListener("click", function () { sk.width = +b.getAttribute("data-width"); skUpdateButtons(); });
  });
  document.getElementById("sketchUndoBtn").addEventListener("click", function () {
    if (!sk.undo.length) return;
    sk.redo.push(JSON.stringify(sk.els));
    sk.els = JSON.parse(sk.undo.pop());
    skSaveDraft(); skDraw(); skUpdateButtons();
  });
  document.getElementById("sketchRedoBtn").addEventListener("click", function () {
    if (!sk.redo.length) return;
    sk.undo.push(JSON.stringify(sk.els));
    sk.els = JSON.parse(sk.redo.pop());
    skSaveDraft(); skDraw(); skUpdateButtons();
  });
  document.getElementById("sketchSnapBtn").addEventListener("click", function () { sk.snap = !sk.snap; skUpdateButtons(); });
  document.getElementById("sketchClearBtn").addEventListener("click", function () {
    if (!sk.els.length) return;
    askConfirm(tr("sketchClearConfirm"), function () { skCommit(function () { sk.els = []; }); });
  });
  // a photo or plan to draw over, faded, fitted to the screen
  // from the 🖼 button: take a photo, pick one, or take the background away
  var skImageInput = document.getElementById("sketchImageInput");
  var skImageCameraInput = document.getElementById("sketchImageCameraInput");
  var skBgMenu = document.getElementById("sketchBgMenu");
  document.getElementById("sketchBgBtn").addEventListener("click", function () {
    var open = skBgMenu.hidden;
    skUpdateButtons();
    document.getElementById("sketchBgRemoveBtn").hidden = !sk.els.some(function (el) { return el.type === "image"; });
    skBgMenu.hidden = !open;
  });
  document.getElementById("sketchImageBtn").addEventListener("click", function () { skBgMenu.hidden = true; skImageInput.click(); });
  document.getElementById("sketchBgCameraBtn").addEventListener("click", function () { skBgMenu.hidden = true; skImageCameraInput.click(); });
  // a picture or PDF already in the project's library (any folder)
  var skLibOverlay = document.getElementById("sketchLibOverlay");
  function skIsImg(entry) { return isImageFile(entry) || /\.(jpe?g|png|webp|gif)$/i.test(entry.name || ""); }
  function skIsBgFile(entry) {
    return skIsImg(entry) || /pdf/i.test(entry.type || "") || /\.pdf$/i.test(entry.name || "");
  }
  document.getElementById("sketchBgLibraryBtn").addEventListener("click", function () {
    skBgMenu.hidden = true;
    var sheet = allSheets().find(function (s) { return s.id === sk.sheetId; });
    if (!sheet || !supabaseClient) return;
    ensureLibraryFolders(sheet, function (folders) {
      skLibShow(folders, null);
      skLibOverlay.hidden = false;
    });
  });
  // one folder at a time, like the library: its folders, then its pictures
  // and PDFs; null = the library's first screen (folders only)
  function skLibShow(folders, folder) {
    var list = document.getElementById("sketchLibList");
    list.innerHTML = "";
    document.getElementById("sketchLibTitle").textContent = folder ? "📂 " + libraryFolderPath(folders, folder) : tr("sketchLibTitle");
    var button = function (text, cls, onClick) {
      var b = document.createElement("button");
      b.type = "button";
      if (cls) b.className = cls;
      b.textContent = text;
      b.addEventListener("click", onClick);
      list.appendChild(b);
    };
    if (folder) {
      var parent = folder.parentId && folders.find(function (f) { return f.id === folder.parentId; });
      button(tr("sketchLibBack"), "sk-lib-back", function () { skLibShow(folders, parent || null); });
    }
    folders.filter(function (f) { return folder ? f.parentId === folder.id : !f.parentId; }).forEach(function (f) {
      button("📁 " + folderDisplayName(f), "sk-lib-dir", function () { skLibShow(folders, f); });
    });
    (folder ? (folder.files || []).filter(skIsBgFile) : []).forEach(function (entry) {
      button((skIsImg(entry) ? "🖼 " : "📄 ") + entry.name, "sk-lib-file", function () {
        skLibOverlay.hidden = true;
        showToast(tr("sketchPdfLoading"));
        resolveFileUrl(entry.path).then(fetchFileBlob).then(function (blob) {
          var file = new File([blob], entry.name, { type: entry.type || blob.type });
          if (!skIsImg(entry)) skPdfBackground(file);
          else scanLoadImage(file).then(function (canvas) { skPlaceBackground(canvas, 1400); });
        }).catch(function (err) {
          console.error("sketch library background failed:", err);
          alert(tr("chatFileOpenError"));
        });
      });
    });
    if (folder && list.children.length === 1) {
      list.appendChild(Object.assign(document.createElement("div"), { className: "sk-lib-folder", textContent: tr("sketchLibNothing") }));
    }
  }
  document.getElementById("sketchLibCancelBtn").addEventListener("click", function () { skLibOverlay.hidden = true; });
  document.getElementById("sketchBgRemoveBtn").addEventListener("click", function () {
    skBgMenu.hidden = true;
    skCommit(function () { sk.els = sk.els.filter(function (el) { return el.type !== "image"; }); });
  });
  [skImageInput, skImageCameraInput].forEach(function (input) { input.addEventListener("change", function () { skSetBackground(input); }); });
  // A PDF (a plan, say): one of its pages, drawn sharp, is the background
  function skLoadPdf() {
    return (window.pdfjsLib ? Promise.resolve() : loadScriptOnce("vendor/pdf.min.js")).then(function () {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdf.worker.min.js";
      return window.pdfjsLib;
    });
  }
  function skPdfPageCanvas(pdf, n) {
    return pdf.getPage(n).then(function (page) {
      var v = page.getViewport({ scale: 1 });
      var vp = page.getViewport({ scale: 2200 / Math.max(v.width, v.height) });
      var c = document.createElement("canvas");
      c.width = Math.round(vp.width); c.height = Math.round(vp.height);
      var ctx = c.getContext("2d");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
      return page.render({ canvasContext: ctx, viewport: vp }).promise.then(function () { return c; });
    });
  }
  var skPdfPageOverlay = document.getElementById("sketchPdfPageOverlay");
  document.getElementById("sketchPdfPageCancelBtn").addEventListener("click", function () { skPdfPageOverlay.hidden = true; });
  function skPdfBackground(file) {
    showToast(tr("sketchPdfLoading"));
    file.arrayBuffer().then(function (buf) {
      return skLoadPdf().then(function (lib) { return lib.getDocument({ data: new Uint8Array(buf) }).promise; });
    }).then(function (pdf) {
      var use = function (n) {
        skPdfPageCanvas(pdf, n).then(function (c) { skPlaceBackground(c, 2200); }, function () { alert(tr("sketchPdfError")); });
      };
      if (pdf.numPages === 1) { use(1); return; }
      var list = document.getElementById("sketchPdfPageList");
      list.innerHTML = "";
      for (var n = 1; n <= Math.min(pdf.numPages, 60); n++) {
        (function (n) {
          var b = document.createElement("button");
          b.type = "button";
          b.textContent = "📄 " + tr("sketchPdfPage").replace("{n}", n);
          b.addEventListener("click", function () { skPdfPageOverlay.hidden = true; use(n); });
          list.appendChild(b);
        })(n);
      }
      skPdfPageOverlay.hidden = false;
    }).catch(function (err) {
      console.error("sketch pdf failed:", err);
      alert(tr("sketchPdfError"));
    });
  }
  function skSetBackground(input) {
    var file = input.files && input.files[0];
    input.value = "";
    if (!file) return;
    if (file.type === "application/pdf" || /\.pdf$/i.test(file.name || "")) { skPdfBackground(file); return; }
    scanLoadImage(file).then(function (canvas) { skPlaceBackground(canvas, 1400); });
  }
  // fitted to the screen, replacing any earlier background
  function skPlaceBackground(canvas, maxSide) {
    var k = Math.min(1, maxSide / Math.max(canvas.width, canvas.height));
    var c = document.createElement("canvas");
    c.width = Math.round(canvas.width * k); c.height = Math.round(canvas.height * k);
    c.getContext("2d").drawImage(canvas, 0, 0, c.width, c.height);
    var r = skCanvas.getBoundingClientRect();
    var fit = Math.min(r.width / c.width, r.height / c.height) * 0.9 / sk.view.z;
    var tl = skToWorld(r.width / 2 - c.width * fit * sk.view.z / 2, r.height / 2 - c.height * fit * sk.view.z / 2);
    skCommit(function () {
      sk.els = sk.els.filter(function (el) { return el.type !== "image"; });
      sk.els.unshift({ type: "image", id: uid(), src: c.toDataURL("image/jpeg", 0.8), p: tl, w: c.width * fit, h: c.height * fit });
    });
    showToast(tr("sketchBgMoveHint"), 3000);
  }


  // ---- open / close / save -------------------------------------------------------
  function openSketch() {
    var sheet = activeSheet();
    if (!sheet) return;
    sk.sheetId = sheet.id;
    skLoadDraft(skOpeningDraft(sheet));
    skShowTitle();
    sketchView.hidden = false;
    skUpdateButtons();
    skResize();
    skCloudAfterOpen(sheet);
  }
  function closeSketch() {
    if (sk.crop) skEndCrop();
    skCloudNow(true);
    sketchView.hidden = true;
  }
  window.addEventListener("resize", function () { if (!sketchView.hidden) skResize(); });
  document.getElementById("sketchBtn").addEventListener("click", openSketch);
  document.getElementById("sketchCloseBtn").addEventListener("click", closeSketch);

  // The drawing's own area (plus a margin), drawn sharp at a fixed scale.
  function skRenderForExport(area) {
    var minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    var add = function (p) { minx = Math.min(minx, p.x); miny = Math.min(miny, p.y); maxx = Math.max(maxx, p.x); maxy = Math.max(maxy, p.y); };
    sk.els.forEach(function (el) {
      if (el.pts) el.pts.forEach(add);
      if (el.type === "dim") { var bl = skDimLine(el); add(bl.a); add(bl.b); }
      if (el.type === "obj") { [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (q) { add(skObjCorner(el, q[0], q[1])); }); return; }
      if (el.a) add(el.a);
      if (el.b) { add(el.b); if (el.type === "leader") add({ x: el.b.x + (el.b.x >= el.a.x ? 1 : -1) * 160, y: el.b.y - 20 }); }
      if (el.c) { add({ x: el.c.x - (el.rx || el.r), y: el.c.y - (el.ry || el.r) }); add({ x: el.c.x + (el.rx || el.r), y: el.c.y + (el.ry || el.r) }); }
      if (el.p) { add({ x: el.p.x - 40, y: el.p.y - 40 }); add({ x: el.p.x + (el.w || 40), y: el.p.y + (el.h || 40) }); }
    });
    if (area) {
      minx = area.x0; miny = area.y0; maxx = area.x1; maxy = area.y1;
    } else {
      if (minx === Infinity) return null;
      var pad = SK_CELL * 2;
      minx = Math.floor((minx - pad) / SK_CELL) * SK_CELL; miny = Math.floor((miny - pad) / SK_CELL) * SK_CELL;
      maxx += pad; maxy += pad;
    }
    var z = Math.min(3, 2400 / Math.max(maxx - minx, maxy - miny));
    var c = document.createElement("canvas");
    c.width = Math.round((maxx - minx) * z); c.height = Math.round((maxy - miny) * z);
    var ctx = c.getContext("2d");
    var view = { x: minx, y: miny, z: z };
    skDrawGrid(ctx, c.width, c.height, view);
    skDrawLayers(ctx, view);
    if (sk.scale) {
      ctx.font = "700 " + Math.round(14 * Math.max(1, z / 1.5)) + "px Assistant, Arial, sans-serif";
      ctx.fillStyle = "#2e4fb8";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillText(tr("sketchScaleNow").replace("{n}", sk.scale.per + " " + tr(sk.scale.unit === "cm" ? "sketchUnitCm" : "sketchUnitM")), 10, c.height - 8);
    }
    return c;
  }
  function skFileName() {
    var sheet = allSheets().find(function (s) { return s.id === sk.sheetId; });
    var d = new Date();
    return tr("sketchTitle") + " " + (sheet ? sheet.name + " " : "") + isoToFileNameDate(todayISO()) + " " +
      String(d.getHours()).padStart(2, "0") + "-" + String(d.getMinutes()).padStart(2, "0");
  }
  function skBuildPdf(canvas) {
    return (window.jspdf ? Promise.resolve() : loadScriptOnce("vendor/jspdf.umd.min.js")).then(function () {
      var landscape = canvas.width > canvas.height;
      var pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: landscape ? "landscape" : "portrait" });
      var pw = landscape ? 297 : 210, ph = landscape ? 210 : 297, m = 8;
      var k = Math.min((pw - 2 * m) / canvas.width, (ph - 2 * m) / canvas.height);
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", (pw - canvas.width * k) / 2, (ph - canvas.height * k) / 2, canvas.width * k, canvas.height * k);
      return pdf.output("blob");
    });
  }
  // into a library folder of the project, as a PDF
  document.getElementById("sketchSaveBtn").addEventListener("click", function () {
    skPickExportArea("sketchAreaSaveTitle", skSaveToLibrary);
  });
  function skSaveToLibrary(canvas) {
    var sheet = allSheets().find(function (s) { return s.id === sk.sheetId; });
    if (!sheet || !supabaseClient) { alert(tr("scanSaveError")); return; }
    ensureLibraryFolders(sheet, function (folders) {
      chatSaveFolderList.innerHTML = "";
      folders.forEach(function (folder) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "📁 " + folderDisplayName(folder);
        btn.addEventListener("click", function () {
          chatSaveFolderOverlay.hidden = true;
          var fileName = skFileName() + ".pdf";
          showToast(tr("scanSavingMsg"));
          skBuildPdf(canvas).then(function (blob) {
            var path = sheet.id + "/" + folder.id + "/" + uid() + "-" + safeStorageFileName(fileName);
            return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "application/pdf" }).then(function (result) {
              if (result.error) throw result.error;
              return addFileToLibraryFolder(sheet, folder.id, { id: uid(), name: fileName, path: path, type: "application/pdf", size: blob.size || 0, uploadedAt: Date.now() });
            });
          }).then(function () {
            showToast(tr("scanSavedMsg").replace("{folder}", folderDisplayName(folder)));
          }, function (err) {
            console.error("sketch save failed:", err);
            alert(tr("scanSaveError"));
          });
        });
        chatSaveFolderList.appendChild(btn);
      });
      chatSaveFolderOverlay.hidden = false;
    });
  
  }
  // share as a picture: into the project's own chat (a shared project),
  // or out to other apps (WhatsApp, mail...)
  var sketchShareOverlay = document.getElementById("sketchShareOverlay");
  var skSharePending = null;
  function skShareToApps(canvas) {
    canvas.toBlob(function (blob) { attemptShare(blob, skFileName() + ".png", "image/png"); }, "image/png");
  }
  function skShareToChat(canvas, sheetId) {
    var fileName = skFileName() + ".png";
    showToast(tr("sketchSendingToChat"));
    canvas.toBlob(function (blob) {
      var path = sheetId + "/files/" + uid() + "-" + safeStorageFileName(fileName);
      supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: "image/png" })
        .then(function (result) {
          if (result.error) throw result.error;
          return resolveFileUrl(path);
        })
        .then(function (url) { return sendChatFileMessage(sheetId, url, fileName, "image/png", blob.size || 0); })
        .then(function () {
          if (activeChatSheetId === sheetId) renderChatMessages();
          showToast(tr("sketchSentToChat"));
        }, function (err) {
          console.error("sketch to chat failed:", err);
          alert(tr("chatFileUploadError"));
        });
    }, "image/png");
  }
  document.getElementById("sketchShareBtn").addEventListener("click", function () {
    skPickExportArea("sketchAreaShareTitle", skShareCanvas);
  });
  function skShareCanvas(canvas) {
    var shared = supabaseClient && sharedSheets.some(function (s) { return s.id === sk.sheetId; });
    if (!shared) { skShareToApps(canvas); return; }
    skSharePending = canvas;
    sketchShareOverlay.hidden = false;
  }
  document.getElementById("sketchShareChatBtn").addEventListener("click", function () {
    sketchShareOverlay.hidden = true;
    if (skSharePending) skShareToChat(skSharePending, sk.sheetId);
    skSharePending = null;
  });
  document.getElementById("sketchShareAppsBtn").addEventListener("click", function () {
    sketchShareOverlay.hidden = true;
    if (skSharePending) skShareToApps(skSharePending);
    skSharePending = null;
  });
  document.getElementById("sketchShareCancelBtn").addEventListener("click", function () {
    sketchShareOverlay.hidden = true;
    skSharePending = null;
  });
  // ---------------------------------------------------------------------
  // סקיצה – ready-made objects and textured fills.
  // Objects (trees, vehicles, site machines, workers, road signs, a
  // container, a bridge) are kept as { type: "obj", id, kind, c, w, h, rot }
  // and drawn from code, so they stay sharp at any zoom. The selected one
  // shows a yellow dot: dragging it resizes (and turns) the object,
  // dragging the object itself moves it.
  // Fills can be a plain colour or a texture: interlocking paving, road,
  // grass, garden soil, base course, water. A textured fill keeps only its
  // shape (the mask); the texture is laid over it when drawn.
  // ---------------------------------------------------------------------

  // sizes in metres, length along the object's own x axis
  // (top: length x width; side: length x height)
  var SK_OBJS = [
    { kind: "tree", m: [5, 5], s: [5, 6] },
    { kind: "car", m: [4.5, 1.9], s: [4.5, 1.5] },
    { kind: "truck", m: [9, 2.5], s: [9, 3.4] },
    { kind: "excavator", m: [9.5, 3.2], s: [9.5, 4.2] },
    { kind: "backhoe", m: [6, 2.4], s: [6.5, 3.6] },
    { kind: "bobcat", m: [3, 1.8], s: [3.2, 2] },
    { kind: "worker", m: [0.9, 0.6], s: [1.2, 2] },
    { kind: "signStop", m: [1, 1], s: [1.1, 2] },
    { kind: "signNoEntry", m: [1, 1], s: [1.1, 2] },
    { kind: "signGiveWay", m: [1, 1], s: [1.1, 2] },
    { kind: "signWorks", m: [1, 1], s: [1.1, 2] },
    { kind: "container", m: [6.06, 2.44], s: [6.06, 2.59] },
    { kind: "bridge", m: [15, 6], s: [15, 4] }
  ];
  sk.objView = "top";
  // older objects had no view: signs and the worker were drawn standing
  function skObjViewOf(el) { return el.view || (/^sign|^worker$/.test(el.kind) ? "side" : "top"); }
  function skObjSize(def, view) { return view === "side" ? def.s : def.m; }
  var SK_FILL_KINDS = ["color", "paving", "road", "grass", "soil", "gravel", "water"];
  sk.fillKind = "color";

  function skObjDef(kind) { return SK_OBJS.find(function (o) { return o.kind === kind; }); }
  // world units per metre: by the scale, or a square is a metre
  function skUnitsPerMetre() {
    if (!sk.scale) return SK_CELL;
    var mPerCell = sk.scale.unit === "cm" ? sk.scale.per / 100 : sk.scale.per;
    return mPerCell > 0 ? SK_CELL / mPerCell : SK_CELL;
  }

  // ---- drawing the objects (local px, origin at the centre, front = +x) ----
  function skRR(ctx, x, y, w, h, r) {
    r = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function skBox(ctx, x, y, w, h, r, fill, stroke, lw) {
    skRR(ctx, x, y, w, h, r);
    ctx.fillStyle = fill; ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
  }
  function skPoly(ctx, pts, fill, stroke, lw) {
    ctx.beginPath();
    pts.forEach(function (q, i) { if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); });
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
  }
  function skDisc(ctx, x, y, r, fill, stroke, lw) {
    ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
  }
  var SK_YELLOW = "#f2b705", SK_YELLOW_DARK = "#8a6500", SK_GLASS = "#2b3440", SK_TYRE = "#262626";
  var SK_DRAW_OBJ = {
    tree: function (ctx, w, h) {
      var r = Math.min(w, h) / 2, lw = Math.max(1, r * 0.04);
      for (var i = 0; i < 9; i++) {
        var a = i / 9 * Math.PI * 2;
        skDisc(ctx, Math.cos(a) * r * 0.6, Math.sin(a) * r * 0.6, r * 0.4, "#4f8f3a", "#356b27", lw);
      }
      skDisc(ctx, 0, 0, r * 0.62, "#5fa347");
      skDisc(ctx, -r * 0.2, -r * 0.2, r * 0.3, "#7cbd5d");
      skDisc(ctx, 0, 0, r * 0.09, "#6b4a2b");
    },
    car: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.05);
      [[-0.3, -1], [-0.3, 1], [0.3, -1], [0.3, 1]].forEach(function (q) { skBox(ctx, q[0] * w - w * 0.08, q[1] * h * 0.42 - h * 0.08, w * 0.16, h * 0.16, h * 0.04, SK_TYRE); });
      skBox(ctx, -w / 2, -h * 0.42, w, h * 0.84, h * 0.28, "#3f6fb5", "#23406e", lw);
      skPoly(ctx, [[w * 0.08, -h * 0.34], [w * 0.24, -h * 0.3], [w * 0.24, h * 0.3], [w * 0.08, h * 0.34]], SK_GLASS);
      skPoly(ctx, [[-w * 0.24, -h * 0.32], [-w * 0.34, -h * 0.28], [-w * 0.34, h * 0.28], [-w * 0.24, h * 0.32]], SK_GLASS);
      skBox(ctx, -w * 0.22, -h * 0.3, w * 0.28, h * 0.6, h * 0.08, "#5a8ad0");
      skBox(ctx, w * 0.1, -h * 0.52, w * 0.05, h * 0.12, 1, "#23406e");
      skBox(ctx, w * 0.1, h * 0.4, w * 0.05, h * 0.12, 1, "#23406e");
    },
    truck: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.04);
      [-0.38, -0.25, 0.32].forEach(function (x) {
        skBox(ctx, x * w - w * 0.045, -h * 0.5, w * 0.09, h * 0.1, 1, SK_TYRE);
        skBox(ctx, x * w - w * 0.045, h * 0.4, w * 0.09, h * 0.1, 1, SK_TYRE);
      });
      skBox(ctx, -w / 2, -h * 0.44, w * 0.74, h * 0.88, h * 0.05, "#9aa3ad", "#59616b", lw);
      ctx.strokeStyle = "#7d868f"; ctx.lineWidth = Math.max(0.6, lw * 0.6);
      for (var i = 1; i < 8; i++) { var x = -w / 2 + w * 0.74 * i / 8; ctx.beginPath(); ctx.moveTo(x, -h * 0.44); ctx.lineTo(x, h * 0.44); ctx.stroke(); }
      skBox(ctx, w * 0.26, -h * 0.42, w * 0.24, h * 0.84, h * 0.12, "#d0452f", "#7c2416", lw);
      skBox(ctx, w * 0.4, -h * 0.36, w * 0.06, h * 0.72, h * 0.04, SK_GLASS);
    },
    excavator: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.04);
      skBox(ctx, -w * 0.48, -h * 0.5, w * 0.5, h * 0.24, h * 0.06, SK_TYRE);
      skBox(ctx, -w * 0.48, h * 0.26, w * 0.5, h * 0.24, h * 0.06, SK_TYRE);
      ctx.strokeStyle = "#555"; ctx.lineWidth = Math.max(0.6, lw * 0.6);
      for (var i = 1; i < 10; i++) {
        var x = -w * 0.48 + w * 0.5 * i / 10;
        ctx.beginPath(); ctx.moveTo(x, -h * 0.5); ctx.lineTo(x, -h * 0.26); ctx.moveTo(x, h * 0.26); ctx.lineTo(x, h * 0.5); ctx.stroke();
      }
      skBox(ctx, -w * 0.42, -h * 0.36, w * 0.4, h * 0.72, h * 0.12, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, -w * 0.42, -h * 0.34, w * 0.08, h * 0.68, h * 0.08, "#c48f00");
      skBox(ctx, -w * 0.1, -h * 0.34, w * 0.1, h * 0.26, h * 0.04, SK_GLASS);
      skBox(ctx, -w * 0.04, h * 0.0, w * 0.42, h * 0.16, h * 0.05, SK_YELLOW, SK_YELLOW_DARK, lw);
      skPoly(ctx, [[w * 0.36, -h * 0.1], [w * 0.5, -h * 0.16], [w * 0.5, h * 0.32], [w * 0.36, h * 0.26]], "#5a5a5a", "#2e2e2e", lw);
    },
    backhoe: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.04);
      [[-0.17, 0.22, 0.16], [0.14, 0.15, 0.12]].forEach(function (t) {
        skBox(ctx, t[0] * w - t[1] * w / 2, -h * 0.5, t[1] * w, t[2] * h, h * 0.04, SK_TYRE);
        skBox(ctx, t[0] * w - t[1] * w / 2, h * 0.5 - t[2] * h, t[1] * w, t[2] * h, h * 0.04, SK_TYRE);
      });
      skBox(ctx, -w * 0.5, -h * 0.07, w * 0.22, h * 0.14, h * 0.04, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, -w * 0.5, -h * 0.13, w * 0.06, h * 0.26, h * 0.03, "#5a5a5a", "#2e2e2e", lw);
      skBox(ctx, -w * 0.3, -h * 0.36, w * 0.54, h * 0.72, h * 0.1, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, -w * 0.13, -h * 0.28, w * 0.2, h * 0.56, h * 0.05, SK_GLASS);
      skBox(ctx, w * 0.2, -h * 0.4, w * 0.13, h * 0.08, 1, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, w * 0.2, h * 0.32, w * 0.13, h * 0.08, 1, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, w * 0.32, -h * 0.5, w * 0.18, h, h * 0.04, "#6b6b6b", "#2e2e2e", lw);
    },
    bobcat: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.04);
      [-0.27, 0.05].forEach(function (x) {
        skBox(ctx, x * w - w * 0.1, -h * 0.5, w * 0.2, h * 0.16, h * 0.04, SK_TYRE);
        skBox(ctx, x * w - w * 0.1, h * 0.34, w * 0.2, h * 0.16, h * 0.04, SK_TYRE);
      });
      skBox(ctx, -w * 0.5, -h * 0.36, w * 0.68, h * 0.72, h * 0.12, "#eeeeee", "#333", lw);
      skBox(ctx, -w * 0.5, -h * 0.36, w * 0.12, h * 0.72, h * 0.08, "#e0661b");
      skBox(ctx, -w * 0.3, -h * 0.26, w * 0.32, h * 0.52, h * 0.05, SK_GLASS);
      skBox(ctx, w * 0.08, -h * 0.42, w * 0.2, h * 0.09, 1, "#e0661b", "#333", lw);
      skBox(ctx, w * 0.08, h * 0.33, w * 0.2, h * 0.09, 1, "#e0661b", "#333", lw);
      skBox(ctx, w * 0.26, -h * 0.5, w * 0.24, h, h * 0.05, "#5a5a5a", "#2e2e2e", lw);
    },
    worker: function (ctx, w, h) {
      // a helmet and shoulders seen from above
      var lw = Math.max(1, h * 0.05);
      ctx.lineCap = "round"; ctx.strokeStyle = "#e9b48a"; ctx.lineWidth = h * 0.16;
      ctx.beginPath(); ctx.moveTo(w * 0.05, -h * 0.42); ctx.lineTo(w * 0.32, -h * 0.3); ctx.moveTo(w * 0.05, h * 0.42); ctx.lineTo(w * 0.32, h * 0.3); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, 0, w * 0.3, h * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#ff7a00"; ctx.fill(); ctx.strokeStyle = "#9a4a00"; ctx.lineWidth = lw; ctx.stroke();
      ctx.fillStyle = "#e8e8e8"; ctx.fillRect(-w * 0.12, -h * 0.48, w * 0.06, h * 0.96);
      skDisc(ctx, w * 0.02, 0, Math.min(w * 0.26, h * 0.3), "#ffd400", "#8a6d00", lw);
      skDisc(ctx, w * 0.02, 0, Math.min(w * 0.12, h * 0.14), "#ffe766");
    },
    signStop: function (ctx, w, h) { skSignFace("signStop", ctx, Math.min(w, h), 0, 0); },
    signNoEntry: function (ctx, w, h) { skSignFace("signNoEntry", ctx, Math.min(w, h), 0, 0); },
    signGiveWay: function (ctx, w, h) { skSignFace("signGiveWay", ctx, Math.min(w, h), 0, 0); },
    signWorks: function (ctx, w, h) { skSignFace("signWorks", ctx, Math.min(w, h), 0, 0); },
    container: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.04);
      skBox(ctx, -w / 2, -h / 2, w, h, h * 0.03, "#b5532f", "#6e2f17", lw);
      ctx.lineWidth = Math.max(0.6, lw * 0.6);
      for (var i = 1; i < 24; i++) {
        var x = -w / 2 + w * i / 24;
        ctx.strokeStyle = i % 2 ? "#923f20" : "#cf6a43";
        ctx.beginPath(); ctx.moveTo(x, -h / 2 + h * 0.06); ctx.lineTo(x, h / 2 - h * 0.06); ctx.stroke();
      }
      ctx.strokeStyle = "#6e2f17"; ctx.lineWidth = lw;
      ctx.strokeRect(-w / 2 + h * 0.06, -h / 2 + h * 0.06, w - h * 0.12, h - h * 0.12);
    },
    bridge: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.025);
      // abutments at both ends
      skBox(ctx, -w / 2, -h / 2, w * 0.05, h, 1, "#8f8a80", "#555", lw);
      skBox(ctx, w / 2 - w * 0.05, -h / 2, w * 0.05, h, 1, "#8f8a80", "#555", lw);
      skBox(ctx, -w * 0.45, -h * 0.42, w * 0.9, h * 0.84, 1, "#a7a9ac", "#555", lw);
      ctx.strokeStyle = "#fff"; ctx.lineWidth = Math.max(1, h * 0.03); ctx.setLineDash([h * 0.25, h * 0.2]);
      ctx.beginPath(); ctx.moveTo(-w * 0.43, 0); ctx.lineTo(w * 0.43, 0); ctx.stroke();
      ctx.setLineDash([]);
      [-1, 1].forEach(function (sgn) {
        var y = sgn * h * 0.42 - (sgn > 0 ? h * 0.1 : 0);
        skBox(ctx, -w * 0.45, y, w * 0.9, h * 0.1, 1, "#6d6f72", "#3d3f42", lw);
        ctx.fillStyle = "#3d3f42";
        for (var i = 0; i <= 12; i++) ctx.fillRect(-w * 0.45 + w * 0.9 * i / 12 - lw, y, lw * 2, h * 0.1);
      });
      ctx.strokeStyle = "#555"; ctx.lineWidth = lw;
      [-0.15, 0.15].forEach(function (x) { ctx.beginPath(); ctx.moveTo(x * w, -h * 0.32); ctx.lineTo(x * w, h * 0.32); ctx.stroke(); });
    }
  };
  // a road sign's face, s across, centred on (cx, cy)
  function skSignFace(kind, ctx, s, cx, cy) {
    var lw = Math.max(1, s * 0.04);
    if (kind === "signStop") {
      var pts = [];
      for (var i = 0; i < 8; i++) { var a = Math.PI / 8 + i * Math.PI / 4; pts.push([cx + Math.cos(a) * s / 2, cy + Math.sin(a) * s / 2]); }
      skPoly(ctx, pts, "#c8102e", "#fff", lw * 2);
      ctx.fillStyle = "#fff";
      ctx.font = "800 " + (s * 0.25) + "px Assistant, Arial, sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("עצור", cx, cy + s * 0.02);
    } else if (kind === "signNoEntry") {
      skDisc(ctx, cx, cy, s * 0.48, "#c8102e", "#fff", lw * 2);
      skBox(ctx, cx - s * 0.33, cy - s * 0.08, s * 0.66, s * 0.16, 1, "#fff");
    } else if (kind === "signGiveWay") {
      var top = cy - s * 0.43;
      skPoly(ctx, [[cx - s / 2, top], [cx + s / 2, top], [cx, top + s * 0.87]], "#c8102e", "#fff", lw);
      skPoly(ctx, [[cx - s * 0.3, top + s * 0.12], [cx + s * 0.3, top + s * 0.12], [cx, top + s * 0.64]], "#fff");
    } else if (kind === "signWorks") {
      var t = cy - s * 0.43, base = t + s * 0.87;
      skPoly(ctx, [[cx, t], [cx + s / 2, base], [cx - s / 2, base]], "#c8102e", "#fff", lw);
      skPoly(ctx, [[cx, t + s * 0.2], [cx + s * 0.32, base - s * 0.09], [cx - s * 0.32, base - s * 0.09]], "#fff");
      // a man digging
      ctx.strokeStyle = "#111"; ctx.lineCap = "round"; ctx.lineWidth = Math.max(1, s * 0.05);
      var mx = cx - s * 0.03, my = base - s * 0.28;
      skDisc(ctx, mx + s * 0.03, my - s * 0.17, s * 0.045, "#111");
      ctx.beginPath();
      ctx.moveTo(mx, my - s * 0.1); ctx.lineTo(mx - s * 0.04, my + s * 0.05);
      ctx.lineTo(mx - s * 0.1, my + s * 0.16); ctx.moveTo(mx - s * 0.04, my + s * 0.05); ctx.lineTo(mx + s * 0.04, my + s * 0.16);
      ctx.moveTo(mx, my - s * 0.06); ctx.lineTo(mx + s * 0.1, my + s * 0.02);
      ctx.moveTo(mx + s * 0.04, my - s * 0.08); ctx.lineTo(mx + s * 0.16, my + s * 0.14);
      ctx.stroke();
      skPoly(ctx, [[mx + s * 0.12, base - s * 0.12], [mx + s * 0.24, base - s * 0.12], [mx + s * 0.18, base - s * 0.2]], "#111");
    }
  }
  function skSignOnPole(kind) {
    return function (ctx, w, h) {
      var s = Math.min(w, h / 1.8);
      skBox(ctx, -Math.max(1, w * 0.04), -h / 2 + s * 0.4, Math.max(2, w * 0.08), h - s * 0.4, 1, "#8d9399", "#5d6267", 0.8);
      skSignFace(kind, ctx, s * 0.98, 0, -h / 2 + s / 2 + 1);
    };
  }
  function skWheel(ctx, x, y, r) {
    skDisc(ctx, x, y, r, SK_TYRE, "#111", Math.max(0.8, r * 0.08));
    skDisc(ctx, x, y, r * 0.45, "#9aa0a6");
  }
  function skArm(ctx, pts, width, color, edge) {
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath(); pts.forEach(function (q, i) { if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); });
    ctx.strokeStyle = edge; ctx.lineWidth = width + 2; ctx.stroke();
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
  }
  // seen from the side: front = +x, the ground at the bottom
  var SK_DRAW_SIDE = {
    tree: function (ctx, w, h) {
      var R = Math.min(w * 0.5, h * 0.4), cy = -h / 2 + R, lw = Math.max(1, R * 0.04);
      ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.ellipse(0, h / 2 - h * 0.02, R * 0.7, h * 0.03, 0, 0, Math.PI * 2); ctx.fill();
      skPoly(ctx, [[-R * 0.1, h / 2], [-R * 0.06, cy + R * 0.3], [R * 0.06, cy + R * 0.3], [R * 0.1, h / 2]], "#6b4a2b", "#4a321c", lw);
      for (var i = 0; i < 8; i++) {
        var a = i / 8 * Math.PI * 2;
        skDisc(ctx, Math.cos(a) * R * 0.55, cy + Math.sin(a) * R * 0.5, R * 0.45, "#4f8f3a", "#356b27", lw);
      }
      skDisc(ctx, 0, cy, R * 0.65, "#5fa347");
      skDisc(ctx, -R * 0.22, cy - R * 0.22, R * 0.3, "#7cbd5d");
    },
    car: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.04);
      skPoly(ctx, [[-w * 0.3, -h * 0.08], [-w * 0.2, -h * 0.46], [w * 0.1, -h * 0.46], [w * 0.26, -h * 0.08]], "#3f6fb5", "#23406e", lw);
      skPoly(ctx, [[-w * 0.26, -h * 0.1], [-w * 0.18, -h * 0.38], [-w * 0.06, -h * 0.38], [-w * 0.06, -h * 0.1]], "#a9c4e6");
      skPoly(ctx, [[-w * 0.03, -h * 0.1], [-w * 0.03, -h * 0.38], [w * 0.08, -h * 0.38], [w * 0.2, -h * 0.1]], "#a9c4e6");
      skBox(ctx, -w * 0.5, -h * 0.1, w, h * 0.42, h * 0.14, "#3f6fb5", "#23406e", lw);
      skBox(ctx, w * 0.46, -h * 0.02, w * 0.04, h * 0.1, 1, "#ffd84d");
      skBox(ctx, -w * 0.5, -h * 0.02, w * 0.03, h * 0.1, 1, "#d7262b");
      skWheel(ctx, -w * 0.3, h * 0.3, h * 0.2);
      skWheel(ctx, w * 0.3, h * 0.3, h * 0.2);
    },
    truck: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.03);
      skBox(ctx, -w * 0.5, -h * 0.5, w * 0.72, h * 0.68, 2, "#9aa3ad", "#59616b", lw);
      ctx.strokeStyle = "#7d868f"; ctx.lineWidth = Math.max(0.6, lw * 0.7);
      for (var i = 1; i < 10; i++) { var x = -w * 0.5 + w * 0.72 * i / 10; ctx.beginPath(); ctx.moveTo(x, -h * 0.47); ctx.lineTo(x, h * 0.15); ctx.stroke(); }
      skBox(ctx, -w * 0.5, h * 0.18, w * 0.98, h * 0.08, 1, "#333");
      skPoly(ctx, [[w * 0.24, h * 0.26], [w * 0.24, -h * 0.34], [w * 0.4, -h * 0.34], [w * 0.5, -h * 0.05], [w * 0.5, h * 0.26]], "#d0452f", "#7c2416", lw);
      skPoly(ctx, [[w * 0.33, -h * 0.28], [w * 0.4, -h * 0.28], [w * 0.47, -h * 0.07], [w * 0.33, -h * 0.07]], "#a9c4e6");
      [-0.36, -0.22, 0.38].forEach(function (x) { skWheel(ctx, x * w, h * 0.33, h * 0.16); });
    },
    excavator: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.03);
      skBox(ctx, -w * 0.47, h * 0.27, w * 0.5, h * 0.23, h * 0.11, SK_TYRE, "#111", lw);
      for (var i = 0; i < 5; i++) skDisc(ctx, -w * 0.42 + i * w * 0.1, h * 0.385, h * 0.06, "#666");
      skBox(ctx, -w * 0.46, -h * 0.05, w * 0.44, h * 0.3, h * 0.04, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, -w * 0.46, -h * 0.03, w * 0.07, h * 0.26, h * 0.03, "#c48f00");
      skBox(ctx, -w * 0.12, -h * 0.42, w * 0.13, h * 0.38, h * 0.03, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, -w * 0.1, -h * 0.38, w * 0.09, h * 0.2, 2, "#a9c4e6");
      skArm(ctx, [[w * 0.0, -h * 0.02], [w * 0.22, -h * 0.47], [w * 0.4, -h * 0.1]], Math.max(2, h * 0.07), SK_YELLOW, SK_YELLOW_DARK);
      skPoly(ctx, [[w * 0.34, -h * 0.12], [w * 0.48, -h * 0.12], [w * 0.47, h * 0.12], [w * 0.36, h * 0.06]], "#5a5a5a", "#2e2e2e", lw);
    },
    backhoe: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.03);
      skBox(ctx, -w * 0.28, -h * 0.02, w * 0.55, h * 0.3, h * 0.05, SK_YELLOW, SK_YELLOW_DARK, lw);
      skBox(ctx, -w * 0.18, -h * 0.42, w * 0.24, h * 0.42, h * 0.03, "#a9c4e6", SK_YELLOW_DARK, lw * 1.5);
      skBox(ctx, -w * 0.2, -h * 0.45, w * 0.28, h * 0.05, 2, SK_YELLOW, SK_YELLOW_DARK, lw);
      skWheel(ctx, -w * 0.14, h * 0.28, h * 0.22);
      skWheel(ctx, w * 0.18, h * 0.34, h * 0.16);
      skArm(ctx, [[w * 0.05, h * 0.0], [w * 0.36, h * 0.2]], Math.max(2, h * 0.05), SK_YELLOW, SK_YELLOW_DARK);
      skPoly(ctx, [[w * 0.33, h * 0.06], [w * 0.5, h * 0.12], [w * 0.5, h * 0.45], [w * 0.36, h * 0.45]], "#6b6b6b", "#2e2e2e", lw);
      skArm(ctx, [[-w * 0.27, h * 0.05], [-w * 0.4, -h * 0.4], [-w * 0.46, h * 0.18]], Math.max(2, h * 0.05), SK_YELLOW, SK_YELLOW_DARK);
      skPoly(ctx, [[-w * 0.5, h * 0.14], [-w * 0.42, h * 0.14], [-w * 0.43, h * 0.32], [-w * 0.49, h * 0.28]], "#5a5a5a", "#2e2e2e", lw);
    },
    bobcat: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.03);
      skBox(ctx, -w * 0.45, -h * 0.06, w * 0.66, h * 0.4, h * 0.06, "#eeeeee", "#333", lw);
      skBox(ctx, -w * 0.45, h * 0.12, w * 0.66, h * 0.07, 1, "#e0661b");
      skBox(ctx, -w * 0.28, -h * 0.46, w * 0.4, h * 0.4, h * 0.04, "#a9c4e6", "#333", lw * 1.5);
      skWheel(ctx, -w * 0.25, h * 0.34, h * 0.16);
      skWheel(ctx, w * 0.08, h * 0.34, h * 0.16);
      skArm(ctx, [[-w * 0.4, -h * 0.36], [w * 0.2, -h * 0.3], [w * 0.34, h * 0.1]], Math.max(2, h * 0.07), "#e0661b", "#7a3510");
      skPoly(ctx, [[w * 0.28, h * 0.02], [w * 0.5, h * 0.12], [w * 0.5, h * 0.48], [w * 0.3, h * 0.48]], "#5a5a5a", "#2e2e2e", lw);
    },
    worker: function (ctx, w, h) {
      var u = Math.min(w / 1.2, h / 2), lw = Math.max(1, u * 0.06);
      ctx.lineCap = "round";
      ctx.strokeStyle = "#1f3b6e"; ctx.lineWidth = u * 0.22;
      ctx.beginPath(); ctx.moveTo(-u * 0.14, u * 0.25); ctx.lineTo(-u * 0.2, u * 0.9); ctx.moveTo(u * 0.14, u * 0.25); ctx.lineTo(u * 0.2, u * 0.9); ctx.stroke();
      ctx.strokeStyle = "#ff7a00"; ctx.lineWidth = u * 0.16;
      ctx.beginPath(); ctx.moveTo(-u * 0.28, -u * 0.38); ctx.lineTo(-u * 0.48, u * 0.15); ctx.moveTo(u * 0.28, -u * 0.38); ctx.lineTo(u * 0.48, u * 0.15); ctx.stroke();
      skBox(ctx, -u * 0.3, -u * 0.45, u * 0.6, u * 0.75, u * 0.12, "#ff7a00", "#9a4a00", lw);
      ctx.fillStyle = "#e8e8e8";
      ctx.fillRect(-u * 0.3, -u * 0.12, u * 0.6, u * 0.07);
      ctx.fillRect(-u * 0.3, u * 0.08, u * 0.6, u * 0.07);
      skDisc(ctx, 0, -u * 0.68, u * 0.2, "#e9b48a", "#8c5a3a", lw);
      ctx.beginPath(); ctx.arc(0, -u * 0.72, u * 0.24, Math.PI, 0); ctx.closePath();
      ctx.fillStyle = "#ffd400"; ctx.fill(); ctx.strokeStyle = "#8a6d00"; ctx.lineWidth = lw; ctx.stroke();
      ctx.fillStyle = "#ffd400"; ctx.fillRect(-u * 0.32, -u * 0.74, u * 0.64, u * 0.06);
    },
    signStop: skSignOnPole("signStop"),
    signNoEntry: skSignOnPole("signNoEntry"),
    signGiveWay: skSignOnPole("signGiveWay"),
    signWorks: skSignOnPole("signWorks"),
    container: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.03);
      skBox(ctx, -w / 2, -h / 2, w, h, 1, "#b5532f", "#6e2f17", lw);
      ctx.lineWidth = Math.max(0.6, lw * 0.8);
      for (var i = 1; i < 30; i++) {
        var x = -w / 2 + w * i / 30;
        ctx.strokeStyle = i % 2 ? "#923f20" : "#cf6a43";
        ctx.beginPath(); ctx.moveTo(x, -h * 0.42); ctx.lineTo(x, h * 0.42); ctx.stroke();
      }
      skBox(ctx, -w / 2, -h / 2, w, h * 0.07, 1, "#7e3519");
      skBox(ctx, -w / 2, h * 0.43, w, h * 0.07, 1, "#7e3519");
      skBox(ctx, -w / 2, -h / 2, w * 0.03, h, 1, "#7e3519");
      skBox(ctx, w / 2 - w * 0.03, -h / 2, w * 0.03, h, 1, "#7e3519");
    },
    bridge: function (ctx, w, h) {
      var lw = Math.max(1, h * 0.02);
      skBox(ctx, -w / 2, h * 0.3, w, h * 0.2, 1, "#5d9fd8");
      ctx.strokeStyle = "#aed3f3"; ctx.lineWidth = lw;
      for (var i = 0; i < 8; i++) { var x = -w * 0.4 + i * w * 0.1; ctx.beginPath(); ctx.moveTo(x, h * 0.4); ctx.quadraticCurveTo(x + w * 0.02, h * 0.36, x + w * 0.04, h * 0.4); ctx.stroke(); }
      skPoly(ctx, [[-w / 2, -h * 0.12], [-w * 0.4, -h * 0.12], [-w * 0.34, h * 0.5], [-w / 2, h * 0.5]], "#8f8a80", "#555", lw);
      skPoly(ctx, [[w / 2, -h * 0.12], [w * 0.4, -h * 0.12], [w * 0.34, h * 0.5], [w / 2, h * 0.5]], "#8f8a80", "#555", lw);
      [-0.14, 0.14].forEach(function (x) { skBox(ctx, x * w - w * 0.025, 0, w * 0.05, h * 0.5, 1, "#a7a9ac", "#555", lw); });
      skBox(ctx, -w / 2, -h * 0.12, w, h * 0.14, 1, "#a7a9ac", "#555", lw);
      ctx.strokeStyle = "#555"; ctx.lineWidth = lw;
      ctx.beginPath(); ctx.moveTo(-w / 2, -h * 0.4); ctx.lineTo(w / 2, -h * 0.4); ctx.stroke();
      for (var p = 0; p <= 20; p++) { var px = -w / 2 + w * p / 20; ctx.beginPath(); ctx.moveTo(px, -h * 0.4); ctx.lineTo(px, -h * 0.12); ctx.stroke(); }
    }
  };

  function skDrawObj(ctx, el, view) {
    var draw = (skObjViewOf(el) === "side" ? SK_DRAW_SIDE : SK_DRAW_OBJ)[el.kind];
    if (!draw) return;
    var z = view.z;
    ctx.save();
    ctx.translate((el.c.x - view.x) * z, (el.c.y - view.y) * z);
    ctx.rotate(el.rot || 0);
    ctx.lineJoin = "round";
    draw(ctx, el.w * z, el.h * z);
    ctx.restore();
  }
  // the object's corners, in world units
  function skObjCorner(el, sx, sy) {
    var c = Math.cos(el.rot || 0), s = Math.sin(el.rot || 0), x = sx * el.w / 2, y = sy * el.h / 2;
    return { x: el.c.x + x * c - y * s, y: el.c.y + x * s + y * c };
  }
  function skObjHas(el, p, tol) {
    var c = Math.cos(-(el.rot || 0)), s = Math.sin(-(el.rot || 0));
    var dx = p.x - el.c.x, dy = p.y - el.c.y;
    var x = dx * c - dy * s, y = dx * s + dy * c;
    return Math.abs(x) <= el.w / 2 + (tol || 0) && Math.abs(y) <= el.h / 2 + (tol || 0);
  }
  function skObjById(id) { return sk.els.find(function (e) { return e.type === "obj" && e.id === id; }); }
  // the selection: a dashed frame and the yellow dot (on screen only)
  function skDrawObjSelection(ctx, view) {
    var el = sk.objSel && skObjById(sk.objSel);
    if (!el) return;
    var S = function (q) { return { x: (q.x - view.x) * view.z, y: (q.y - view.y) * view.z }; };
    var cs = [skObjCorner(el, -1, -1), skObjCorner(el, 1, -1), skObjCorner(el, 1, 1), skObjCorner(el, -1, 1)].map(S);
    ctx.save();
    ctx.strokeStyle = "#2e4fb8"; ctx.lineWidth = 1.5; ctx.setLineDash([6, 4]);
    ctx.beginPath(); cs.forEach(function (q, i) { if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); }); ctx.closePath(); ctx.stroke();
    ctx.setLineDash([]);
    var hd = cs[2];
    ctx.shadowColor = "rgba(0,0,0,0.35)"; ctx.shadowBlur = 4;
    skDisc(ctx, hd.x, hd.y, 11, "#ffd400", "#8a6d00", 2);
    ctx.restore();
  }

  // ---- placing, moving, resizing ------------------------------------------
  var skObjDrag = null;
  function skAddObject(kind) {
    var def = skObjDef(kind);
    var size = skObjSize(def, sk.objView);
    var upm = skUnitsPerMetre(), w = size[0] * upm, h = size[1] * upm;
    // keep it a sensible size on the screen whatever the scale
    var dpr = window.devicePixelRatio || 1, screenW = skCanvas.width / dpr / sk.view.z, screenH = skCanvas.height / dpr / sk.view.z;
    var k = Math.min(1, Math.min(screenW, screenH) * 0.6 / Math.max(w, h));
    k = Math.max(k, 28 / Math.max(w, h));
    w *= k; h *= k;
    var el = { type: "obj", id: uid(), kind: kind, c: { x: sk.view.x + screenW / 2, y: sk.view.y + screenH / 2 }, w: w, h: h, rot: 0, view: sk.objView };
    sk.tool = "obj";
    skCommit(function () { sk.els.push(el); });
    sk.objSel = el.id;
    skUpdateButtons();
    skDraw();
  }
  // pointer down: the yellow dot of the selected object, or (objects tool)
  // an object to select and move. True when it was taken.
  function skObjPointerDown(p) {
    var sel = sk.objSel && skObjById(sk.objSel);
    if (sel) {
      var hd = skObjCorner(sel, 1, 1);
      if (skDist(p, hd) < 20 / sk.view.z) {
        skObjDrag = { id: sel.id, mode: "size", before: JSON.stringify(sk.els), start: { c: sel.c, w: sel.w, h: sel.h, rot: sel.rot || 0, hd: hd } };
        return true;
      }
    }
    if (sk.tool !== "obj") return false;
    for (var i = sk.els.length - 1; i >= 0; i--) {
      var el = sk.els[i];
      if (el.type === "obj" && skObjHas(el, p, 4 / sk.view.z)) {
        sk.objSel = el.id;
        skObjDrag = { id: el.id, mode: "move", before: JSON.stringify(sk.els), start: { p: p, c: { x: el.c.x, y: el.c.y } } };
        skDraw();
        return true;
      }
    }
    sk.objSel = null;
    skDraw();
    return true;
  }
  function skObjPointerMove(p) {
    if (!skObjDrag) return false;
    var el = skObjById(skObjDrag.id), st = skObjDrag.start;
    if (!el) { skObjDrag = null; return false; }
    if (skObjDrag.mode === "move") {
      el.c = { x: st.c.x + p.x - st.p.x, y: st.c.y + p.y - st.p.y };
    } else {
      // the dot's distance from the centre sizes it, its angle turns it
      var d0 = skDist(st.hd, st.c), d1 = Math.max(8, skDist(p, st.c));
      var k = Math.max(0.05, d1 / d0);
      el.w = st.w * k; el.h = st.h * k;
      var a0 = Math.atan2(st.hd.y - st.c.y, st.hd.x - st.c.x), a1 = Math.atan2(p.y - st.c.y, p.x - st.c.x);
      var rot = st.rot + a1 - a0, step = Math.PI / 12;
      var snapped = Math.round(rot / step) * step;
      el.rot = Math.abs(rot - snapped) < 0.09 ? snapped : rot;
      if (Math.abs(Math.sin(el.rot)) < 1e-9) el.rot = Math.round(el.rot / Math.PI) * Math.PI;
    }
    skDraw();
    return true;
  }
  function skObjPointerEnd() {
    if (!skObjDrag) return false;
    var before = skObjDrag.before;
    skObjDrag = null;
    if (before !== JSON.stringify(sk.els)) {
      sk.undo.push(before);
      if (sk.undo.length > 80) sk.undo.shift();
      sk.redo = [];
      skSaveDraft();
      skUpdateButtons();
    }
    skDraw();
    return true;
  }
  function skObjCancelDrag() {
    if (!skObjDrag) return;
    sk.els = JSON.parse(skObjDrag.before);
    skObjDrag = null;
  }

  // ---- the objects menu ------------------------------------------------------
  var skObjMenu = document.getElementById("sketchObjMenu");
  function skBuildObjMenu() {
    skObjMenu.innerHTML = "";
    var sw = document.createElement("div");
    sw.className = "sk-view-switch";
    ["top", "side"].forEach(function (v) {
      var vb = document.createElement("button");
      vb.type = "button";
      vb.setAttribute("data-view", v);
      vb.className = sk.objView === v ? "on" : "";
      vb.textContent = tr(v === "top" ? "sketchViewTop" : "sketchViewSide");
      vb.addEventListener("click", function () { sk.objView = v; skBuildObjMenu(); });
      sw.appendChild(vb);
    });
    skObjMenu.appendChild(sw);
    SK_OBJS.forEach(function (def) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "sk-obj-pick";
      b.setAttribute("data-obj", def.kind);
      var c = document.createElement("canvas");
      c.width = 88; c.height = 88;
      var size = skObjSize(def, sk.objView), ctx = c.getContext("2d"), k = 76 / Math.max(size[0], size[1]);
      ctx.translate(44, 44);
      (sk.objView === "side" ? SK_DRAW_SIDE : SK_DRAW_OBJ)[def.kind](ctx, size[0] * k, size[1] * k);
      var label = document.createElement("span");
      label.textContent = tr("skObj_" + def.kind);
      b.appendChild(c);
      b.appendChild(label);
      b.addEventListener("click", function () {
        skObjMenu.hidden = true;
        skAddObject(def.kind);
      });
      skObjMenu.appendChild(b);
    });
  }
  document.getElementById("sketchObjBtn").addEventListener("click", function () {
    var open = skObjMenu.hidden;
    if (open) skBuildObjMenu();
    sk.tool = "obj";
    skUpdateButtons();
    skObjMenu.hidden = !open;
    if (open) showToast(tr("sketchObjHint"), 2500);
  });

  // ---- textured fills -----------------------------------------------------------
  function skRand(seed) {
    var s = seed;
    return function () { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
  }
  // one tile of a texture at R pixels per world unit
  function skFillTile(kind, R) {
    var tw = kind === "paving" ? 24 : kind === "water" ? 40 : 30, th = kind === "paving" ? 12 : kind === "water" ? 20 : 30;
    var c = document.createElement("canvas");
    c.width = Math.max(2, Math.round(tw * R)); c.height = Math.max(2, Math.round(th * R));
    var ctx = c.getContext("2d"), rnd = skRand(kind.length * 7919 + 17);
    ctx.scale(c.width / tw, c.height / th);
    var dots = function (n, colors, rmin, rmax) {
      for (var i = 0; i < n; i++) {
        var x = rnd() * tw, y = rnd() * th, r = rmin + rnd() * (rmax - rmin);
        ctx.fillStyle = colors[Math.floor(rnd() * colors.length)];
        [-tw, 0, tw].forEach(function (ox) { [-th, 0, th].forEach(function (oy) { ctx.beginPath(); ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2); ctx.fill(); }); });
      }
    };
    if (kind === "paving") {
      // interlocking blocks laid in a running bond
      ctx.fillStyle = "#857a6b"; ctx.fillRect(0, 0, tw, th);
      [[0, 0, ["#c9b79c", "#b8a385"]], [-6, 6, ["#b8a385", "#c9b79c", "#c9b79c"]]].forEach(function (row) {
        for (var i = 0; i < row[2].length + 1; i++) {
          var x = row[0] + i * 12;
          skRR(ctx, x + 0.5, row[1] + 0.5, 11, 5, 1.4);
          ctx.fillStyle = row[2][i % row[2].length]; ctx.fill();
        }
      });
    } else if (kind === "road") {
      ctx.fillStyle = "#54575c"; ctx.fillRect(0, 0, tw, th);
      dots(140, ["#46494d", "#63666b", "#6d7075", "#3e4044"], 0.25, 0.6);
    } else if (kind === "grass") {
      ctx.fillStyle = "#74ad4f"; ctx.fillRect(0, 0, tw, th);
      ctx.lineCap = "round"; ctx.lineWidth = 0.5;
      for (var g = 0; g < 160; g++) {
        var gx = rnd() * tw, gy = rnd() * th, a = -Math.PI / 2 + (rnd() - 0.5) * 0.9, l = 1.5 + rnd() * 2;
        ctx.strokeStyle = rnd() < 0.5 ? "#5a9638" : "#93c86a";
        [-tw, 0, tw].forEach(function (ox) { [-th, 0, th].forEach(function (oy) {
          ctx.beginPath(); ctx.moveTo(gx + ox, gy + oy); ctx.lineTo(gx + ox + Math.cos(a) * l, gy + oy + Math.sin(a) * l); ctx.stroke();
        }); });
      }
    } else if (kind === "soil") {
      ctx.fillStyle = "#7b5534"; ctx.fillRect(0, 0, tw, th);
      dots(120, ["#5f3f24", "#9a6e47", "#6c4a2c", "#8a603b"], 0.3, 1.1);
    } else if (kind === "gravel") {
      ctx.fillStyle = "#cfc6b3"; ctx.fillRect(0, 0, tw, th);
      for (var q = 0; q < 70; q++) {
        var px = rnd() * tw, py = rnd() * th, rx = 0.7 + rnd() * 1.1, ry = rx * (0.6 + rnd() * 0.4), rot = rnd() * Math.PI;
        var col = ["#9d968a", "#b5ad9f", "#8a8378", "#c2baa9"][Math.floor(rnd() * 4)];
        [-tw, 0, tw].forEach(function (ox) { [-th, 0, th].forEach(function (oy) {
          ctx.beginPath(); ctx.ellipse(px + ox, py + oy, rx, ry, rot, 0, Math.PI * 2);
          ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = "#6f695f"; ctx.lineWidth = 0.25; ctx.stroke();
        }); });
      }
    } else if (kind === "water") {
      ctx.fillStyle = "#5d9fd8"; ctx.fillRect(0, 0, tw, th);
      ctx.strokeStyle = "#aed3f3"; ctx.lineWidth = 0.7; ctx.lineCap = "round";
      [[2, 5], [22, 5], [12, 15], [32, 15]].forEach(function (w0) {
        ctx.beginPath();
        ctx.moveTo(w0[0], w0[1]);
        ctx.quadraticCurveTo(w0[0] + 2.5, w0[1] - 2, w0[0] + 5, w0[1]);
        ctx.quadraticCurveTo(w0[0] + 7.5, w0[1] + 2, w0[0] + 10, w0[1]);
        ctx.stroke();
      });
    }
    return c;
  }
  // the textured picture of a fill: its texture, cut to its shape
  function skFillArt(el, mask) {
    if (!sk.fillArt) sk.fillArt = {};
    if (sk.fillArt[el.id]) return sk.fillArt[el.id];
    var R = Math.min(3, 2400 / Math.max(el.w, el.h));
    var c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(el.w * R)); c.height = Math.max(1, Math.round(el.h * R));
    var ctx = c.getContext("2d");
    var pat = ctx.createPattern(skFillTile(el.pattern, R), "repeat");
    // laid from the world's origin, so neighbouring fills meet seamlessly
    ctx.save();
    ctx.translate(-el.p.x * R, -el.p.y * R);
    ctx.fillStyle = pat;
    ctx.fillRect(el.p.x * R, el.p.y * R, c.width, c.height);
    ctx.restore();
    if (el.pattern === "road" && el.axis) {
      // a dashed white centre line along the road's length
      var a = el.axis, ux = Math.cos(a.ang), uy = Math.sin(a.ang);
      ctx.strokeStyle = "#f4f4f4"; ctx.lineWidth = Math.max(1, 1.6 * R); ctx.setLineDash([12 * R, 9 * R]);
      ctx.beginPath();
      ctx.moveTo((a.cx - ux * a.len - el.p.x) * R, (a.cy - uy * a.len - el.p.y) * R);
      ctx.lineTo((a.cx + ux * a.len - el.p.x) * R, (a.cy + uy * a.len - el.p.y) * R);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(mask, 0, 0, c.width, c.height);
    sk.fillArt[el.id] = c;
    return c;
  }

  // ---- the fill menu ---------------------------------------------------------------
  var skFillMenu = document.getElementById("sketchFillMenu");
  function skFillSwatch(kind) {
    var c = document.createElement("canvas");
    c.width = 56; c.height = 40;
    var ctx = c.getContext("2d");
    if (kind === "color") {
      ctx.fillStyle = sk.color; ctx.globalAlpha = 0.45; ctx.fillRect(0, 0, 56, 40);
    } else {
      ctx.fillStyle = ctx.createPattern(skFillTile(kind, 1.6), "repeat");
      ctx.fillRect(0, 0, 56, 40);
    }
    return c;
  }
  function skBuildFillMenu() {
    var list = skFillMenu.querySelector(".sk-fill-list");
    list.innerHTML = "";
    // a plain see-through colour, in any of the pen colours
    var row = document.createElement("div");
    row.className = "sk-fill-colors";
    var title = document.createElement("span");
    title.textContent = tr("skFill_color");
    row.appendChild(title);
    SK_COLORS.forEach(function (color) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "sk-fill-color" + (sk.fillKind === "color" && sk.color === color ? " on" : "");
      b.setAttribute("data-color", color);
      b.style.setProperty("--c", color);
      b.addEventListener("click", function () {
        sk.fillKind = "color";
        sk.color = color;
        skFillMenu.hidden = true;
        skUpdateButtons();
      });
      row.appendChild(b);
    });
    list.appendChild(row);
    SK_FILL_KINDS.forEach(function (kind) {
      if (kind === "color") return;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "sk-fill-pick" + (sk.fillKind === kind ? " on" : "");
      b.setAttribute("data-fill", kind);
      b.appendChild(skFillSwatch(kind));
      var label = document.createElement("span");
      label.textContent = tr("skFill_" + kind);
      b.appendChild(label);
      b.addEventListener("click", function () {
        sk.fillKind = kind;
        skFillMenu.hidden = true;
      });
      list.appendChild(b);
    });
  }
  document.querySelector(".sk-tool[data-tool=fill]").addEventListener("click", function () {
    skBuildFillMenu();
    skFillMenu.hidden = false;
  });

  // ---------------------------------------------------------------------
  // סקיצה – saving / sharing only part of it. "שמירה" and 📤 first ask:
  // the whole sketch, or an area. For an area the rest of the page dims,
  // a finger marks a rectangle (dragging outside it marks a new one), its
  // yellow corner dots resize it and dragging inside it moves it; two
  // fingers still zoom and pan. ✓ hands that rectangle (world units) to
  // the export, which then draws just it.
  // ---------------------------------------------------------------------
  var skAreaChoice = document.getElementById("sketchAreaChoiceOverlay");
  var skAreaBar = document.getElementById("sketchAreaBar");
  var skAreaPending = null; // what to do with the canvas
  sk.crop = null;           // { r: {x0,y0,x1,y1}, drag }

  // asks whole / area, then done(canvas)
  function skPickExportArea(titleKey, done) {
    if (!sk.els.length) { showToast(tr("sketchEmptyMsg")); return; }
    skAreaPending = done;
    document.getElementById("sketchAreaChoiceTitle").textContent = tr(titleKey);
    skAreaChoice.hidden = false;
  }
  document.getElementById("sketchAreaAllBtn").addEventListener("click", function () {
    skAreaChoice.hidden = true;
    var done = skAreaPending;
    skAreaPending = null;
    var canvas = skRenderForExport();
    if (!canvas) { showToast(tr("sketchEmptyMsg")); return; }
    if (done) done(canvas);
  });
  document.getElementById("sketchAreaPickBtn").addEventListener("click", function () {
    skAreaChoice.hidden = true;
    // to start with: the middle of the screen
    var dpr = window.devicePixelRatio || 1, W = skCanvas.width / dpr, H = skCanvas.height / dpr;
    var a = skToWorld(W * 0.12, H * 0.18), b = skToWorld(W * 0.88, H * 0.82);
    sk.crop = { r: { x0: a.x, y0: a.y, x1: b.x, y1: b.y }, drag: null };
    sketchView.classList.add("sk-cropping");
    skAreaBar.hidden = false;
    skDraw();
  });
  document.getElementById("sketchAreaChoiceCancelBtn").addEventListener("click", function () {
    skAreaChoice.hidden = true;
    skAreaPending = null;
  });
  function skEndCrop() {
    sk.crop = null;
    sketchView.classList.remove("sk-cropping");
    skAreaBar.hidden = true;
    skDraw();
  }
  document.getElementById("sketchAreaOkBtn").addEventListener("click", function () {
    var r = sk.crop && sk.crop.r, done = skAreaPending;
    skAreaPending = null;
    skEndCrop();
    if (!r || !done) return;
    done(skRenderForExport(r));
  });
  document.getElementById("sketchAreaCancelBtn").addEventListener("click", function () {
    skAreaPending = null;
    skEndCrop();
  });

  function skCropNorm(r) {
    return { x0: Math.min(r.x0, r.x1), y0: Math.min(r.y0, r.y1), x1: Math.max(r.x0, r.x1), y1: Math.max(r.y0, r.y1) };
  }
  function skCropCorners(r) {
    return [{ x: r.x0, y: r.y0 }, { x: r.x1, y: r.y0 }, { x: r.x1, y: r.y1 }, { x: r.x0, y: r.y1 }];
  }
  // pointer handlers, called from the canvas's own while marking
  function skCropDown(p) {
    var c = sk.crop, r = c.r, sp = skToScreen(p);
    var corners = skCropCorners(r);
    for (var i = 0; i < 4; i++) {
      if (skDist(sp, skToScreen(corners[i])) < 24) {
        var opp = corners[(i + 2) % 4];
        c.drag = { mode: "corner", fixed: opp };
        return;
      }
    }
    if (p.x > r.x0 && p.x < r.x1 && p.y > r.y0 && p.y < r.y1) {
      c.drag = { mode: "move", start: p, r0: Object.assign({}, r) };
      return;
    }
    c.drag = { mode: "new", start: p, prev: Object.assign({}, r) };
    c.r = { x0: p.x, y0: p.y, x1: p.x, y1: p.y };
    skDraw();
  }
  function skCropMove(p) {
    var c = sk.crop, d = c.drag;
    if (!d) return;
    if (d.mode === "move") {
      var dx = p.x - d.start.x, dy = p.y - d.start.y;
      c.r = { x0: d.r0.x0 + dx, y0: d.r0.y0 + dy, x1: d.r0.x1 + dx, y1: d.r0.y1 + dy };
    } else if (d.mode === "corner") {
      c.r = skCropNorm({ x0: d.fixed.x, y0: d.fixed.y, x1: p.x, y1: p.y });
    } else {
      c.r = skCropNorm({ x0: d.start.x, y0: d.start.y, x1: p.x, y1: p.y });
    }
    skDraw();
  }
  function skCropEnd() {
    var c = sk.crop, d = c.drag;
    c.drag = null;
    c.r = skCropNorm(c.r);
    // too small to mean anything (a tap): keep what was marked before
    if ((c.r.x1 - c.r.x0) * sk.view.z < 16 || (c.r.y1 - c.r.y0) * sk.view.z < 16) {
      if (d && d.prev) c.r = d.prev;
    }
    skDraw();
  }
  // the dimmed page around the area, its frame and the four dots
  function skDrawCrop(ctx) {
    if (!sk.crop) return;
    var dpr = window.devicePixelRatio || 1, W = skCanvas.width / dpr, H = skCanvas.height / dpr;
    var r = skCropNorm(sk.crop.r), a = skToScreen({ x: r.x0, y: r.y0 }), b = skToScreen({ x: r.x1, y: r.y1 });
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.rect(a.x, a.y, b.x - a.x, b.y - a.y);
    ctx.fillStyle = "rgba(20, 30, 50, 0.45)";
    ctx.fill("evenodd");
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 3;
    ctx.strokeRect(a.x, a.y, b.x - a.x, b.y - a.y);
    ctx.strokeStyle = "#2e4fb8"; ctx.lineWidth = 1.5; ctx.setLineDash([7, 5]);
    ctx.strokeRect(a.x, a.y, b.x - a.x, b.y - a.y);
    ctx.setLineDash([]);
    ctx.shadowColor = "rgba(0,0,0,0.35)"; ctx.shadowBlur = 4;
    [[a.x, a.y], [b.x, a.y], [b.x, b.y], [a.x, b.y]].forEach(function (q) {
      ctx.beginPath(); ctx.arc(q[0], q[1], 10, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd400"; ctx.fill();
      ctx.strokeStyle = "#8a6d00"; ctx.lineWidth = 2; ctx.stroke();
    });
    ctx.restore();
  }

  // ---------------------------------------------------------------------
  // דוח בוקר: the day's start, over all the projects - opened by the
  // morning notification and the home-screen widget.
  //   1. שים לב: only what needs acting on - activities late, ones whose
  //      pace runs past their end (and what's linked after them), tasks
  //      left from earlier days, the day's reminders.
  //   2. the open tasks (today's and earlier), by project, each with the
  //      task list's mark - tapped, it moves on as it does there.
  //   3. the work plans, one under the other: what's under way, late or
  //      starting soon, each with its % bar. Setting a % also marks it in
  //      that day's diary (מתוכנן מול ביצוע).
  // ---------------------------------------------------------------------
  var morningView = document.getElementById("morningView");
  var morningBody = document.getElementById("morningBody");
  var MORNING_SOON_DAYS = 3;
  var morningMore = { tasks: false, plan: false };
  // marked here: they stay on the report (ticked) until it's closed
  var morningTouched = {};

  function openMorningReport() {
    morningMore = { tasks: false, plan: false };
    morningTouched = {};
    renderMorningReport();
    morningView.hidden = false;
    morningBody.scrollTop = 0;
  }
  function closeMorningReport() {
    morningView.hidden = true;
    render();
  }
  document.getElementById("morningBackBtn").addEventListener("click", closeMorningReport);

  function morningEl(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  }
  function morningSection(titleKey) {
    var sec = morningEl("section", "morning-section");
    sec.appendChild(morningEl("h3", "morning-section-title", tr(titleKey)));
    morningBody.appendChild(sec);
    return sec;
  }
  function morningMoreBtn(sec, key, onKey, offKey) {
    var b = morningEl("button", "morning-more", tr(morningMore[key] ? offKey : onKey));
    b.type = "button";
    b.addEventListener("click", function () {
      morningMore[key] = !morningMore[key];
      renderMorningReport();
    });
    sec.appendChild(b);
  }

  function renderMorningReport() {
    var today = todayISO();
    document.getElementById("morningDate").textContent = isoToFullDisplay(today);
    var sheets = voiceTargetSheets();
    morningBody.innerHTML = "";
    morningRenderAttention(sheets, today);
    morningRenderTasks(today);
    morningRenderPlans(sheets, today);
  }

  // ---- 1. שים לב -------------------------------------------------------
  function morningRenderAttention(sheets, today) {
    var sec = morningSection("morningAttention");
    var list = morningEl("ul", "morning-attention");
    var add = function (icon, text, sub) {
      var li = morningEl("li", "");
      li.appendChild(morningEl("span", "morning-att-icon", icon));
      var body = morningEl("div", "");
      body.appendChild(morningEl("div", "", text));
      if (sub) body.appendChild(morningEl("small", "", sub));
      li.appendChild(body);
      list.appendChild(li);
    };
    var multi = sheets.length > 1;
    var where = function (sheet) { return multi ? " · " + sheet.name : ""; };
    sheets.forEach(function (sheet) {
      var plan = sheet.workPlan || [];
      var after = function (item) {
        return plan.filter(function (y) {
          return y.status !== "done" && wpLinksOf(y).some(function (l) { return l.from === item.id; });
        }).map(function (y) { return y.name; });
      };
      plan.forEach(function (x) {
        if (x.status === "done") return;
        var next = after(x);
        var drags = next.length ? tr("morningDrags").replace("{list}", next.join(", ")) : "";
        if (wpIsLate(x)) {
          add("⚠", tr("morningLateActivity").replace("{name}", x.name).replace("{date}", isoToDisplay(x.end)) + where(sheet),
            [x.by, drags].filter(Boolean).join(" · "));
          return;
        }
        var f = wpForecastEnd(x);
        if (f && f > x.end) {
          add("📉", tr("morningSlipping").replace("{name}", x.name).replace("{date}", isoToDisplay(f))
            .replace("{n}", wpDiff(x.end, f)) + where(sheet), [x.by, drags].filter(Boolean).join(" · "));
        }
      });
    });
    var older = 0, reminders = [];
    openTasksByProject().forEach(function (g) {
      g.tasks.forEach(function (t) {
        if (t.planItemId) return;
        if (t.date < today) older++;
        var r = t.reminder;
        if (r && r.type === "time" && r.date === today && r.time) reminders.push({ time: r.time, text: t.text, sheet: g.sheet });
      });
    });
    if (older) add("🕓", tr("morningOlderTasks").replace("{n}", older));
    reminders.sort(function (a, b) { return a.time < b.time ? -1 : 1; }).forEach(function (r) {
      add("⏰", r.time + " " + r.text + where(r.sheet));
    });
    if (!list.children.length) {
      sec.appendChild(morningEl("p", "morning-ok", tr("morningAllGood")));
      return;
    }
    sec.appendChild(list);
  }

  // ---- 2. the tasks ------------------------------------------------------
  function morningRenderTasks(today) {
    var sec = morningSection("morningTasksTitle");
    var until = morningMore.tasks ? addDaysToISO(today, 7) : today;
    var any = false;
    allSheets().filter(function (s) { return !s.ended && s.id !== HEAD_OFFICE_SHEET_ID; }).forEach(function (sheet) {
      var tasks = (sheet.tasks || []).filter(function (t) {
        // an activity's own task (planItemId) is in the plans, below
        if (t.type === "note" || t.headOfficeVirtual || t.planItemId || !(t.text || "").trim() || t.date > until) return false;
        return t.status !== 2 || morningTouched["t:" + t.id];
      }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : (a.createdAt || 0) - (b.createdAt || 0); });
      if (!tasks.length) return;
      any = true;
      sec.appendChild(morningEl("div", "morning-project", (sheet.shared ? "👥 " : "") + sheet.name));
      tasks.forEach(function (t) {
        var row = morningEl("div", "morning-task" + (t.status === 1 ? " partial" : t.status === 2 ? " done" : ""));
        // the task list's own mark: a tap moves it on - partly done, done, open again
        var mark = morningEl("button", "row-mark morning-mark");
        mark.type = "button";
        mark.title = tr({ 0: "statusPartial", 1: "statusDone", 2: "statusReset" }[t.status || 0]);
        mark.innerHTML = rowMarkSvg(t.status || 0);
        mark.addEventListener("click", function () {
          morningTouched["t:" + t.id] = true;
          cycleStatus(t.id, sheet);
          renderMorningReport();
        });
        row.appendChild(mark);
        var text = morningEl("div", "morning-task-text");
        text.appendChild(morningEl("span", "", t.text));
        var meta = [];
        if (t.date < today) meta.push(tr("morningFrom").replace("{date}", isoToDisplay(t.date)));
        else if (t.date > today) meta.push(isoToDisplay(t.date));
        if (t.reminder && t.reminder.type === "time" && t.reminder.time) meta.push("⏰ " + t.reminder.time);
        if (meta.length) text.appendChild(morningEl("small", "", meta.join(" · ")));
        row.appendChild(text);
        sec.appendChild(row);
      });
    });
    if (!any) sec.appendChild(morningEl("p", "morning-ok", tr("morningNoTasks")));
    morningMoreBtn(sec, "tasks", "morningMoreTasks", "morningLessTasks");
  }

  // ---- 3. the work plans ---------------------------------------------------
  function morningRenderPlans(sheets, today) {
    var withPlan = sheets.filter(function (s) { return (s.workPlan || []).length; });
    if (!withPlan.length) return;
    var sec = morningSection("morningPlansTitle");
    var soon = addDaysToISO(today, MORNING_SOON_DAYS);
    var any = false;
    withPlan.forEach(function (sheet) {
      var items = wpSorted(sheet.workPlan).filter(function (x) {
        if (morningTouched["w:" + x.id]) return true;
        if (x.status === "done") return false;
        return morningMore.plan || x.start <= soon;
      });
      if (!items.length) return;
      any = true;
      sec.appendChild(morningEl("div", "morning-project", (sheet.shared ? "👥 " : "") + sheet.name));
      items.forEach(function (item) {
        var row = morningEl("div", "wp-diary-head morning-plan-row");
        var name = morningEl("div", "wp-diary-name");
        name.appendChild(morningEl("b", "", item.name));
        var sub = [tr("morningRange").replace("{from}", isoToDisplay(item.start)).replace("{to}", isoToDisplay(item.end))];
        if (item.by) sub.push(item.by);
        name.appendChild(morningEl("small", "", sub.join(" · ")));
        if (wpIsLate(item)) name.appendChild(morningEl("small", "wp-diary-late", tr("workPlanStatusLate")));
        else if (item.start > today) name.appendChild(morningEl("small", "", tr("morningStarts").replace("{date}", isoToDisplay(item.start))));
        row.appendChild(name);
        row.appendChild(wpDiaryPctBar(sheet, today, item, wpDayEntry(sheet, today, item.id), function () {
          morningTouched["w:" + item.id] = true;
          renderMorningReport();
        }));
        sec.appendChild(row);
      });
    });
    if (!any) sec.appendChild(morningEl("p", "morning-ok", tr("morningNoActivities")));
    morningMoreBtn(sec, "plan", "morningWholePlan", "morningLessPlan");
  }

  // ---- the morning notification --------------------------------------------
  // A quiet phone notification each morning (07:00 unless set otherwise in
  // the menu): the day's open tasks, the activities late by then and the
  // day's first reminder. The next week's are scheduled with every alarm
  // sync, each worked out from what's known now (the app redoes them
  // whenever it opens); a day with nothing on gets none. Tapping one opens
  // this report (app version 24+; before that, the app).
  var MORNING_ON_KEY = "itask-morning-summary", MORNING_AT_KEY = "itask-morning-summary-at";
  function morningSummaryOn() {
    try { return localStorage.getItem(MORNING_ON_KEY) !== "off"; } catch (e) { return true; }
  }
  function morningSummaryTime() {
    try { return localStorage.getItem(MORNING_AT_KEY) || "07:00"; } catch (e) { return "07:00"; }
  }
  // the summary line for a day, or null when there's nothing on
  function morningSummaryText(iso) {
    var tasks = 0, late = 0, first = null;
    voiceTargetSheets().forEach(function (sheet) {
      (sheet.tasks || []).forEach(function (t) {
        if (t.type === "note" || t.status === 2 || t.headOfficeVirtual || t.planItemId || !(t.text || "").trim()) return;
        // today's list also holds what's still open from before
        if (t.date !== iso && !(t.date < iso && iso === todayISO())) return;
        tasks++;
        var r = t.reminder;
        if (r && r.type === "time" && r.date === iso && r.time && (!first || r.time < first.time)) first = { time: r.time, text: t.text };
      });
      late += (sheet.workPlan || []).filter(function (x) { return x.status !== "done" && x.end < iso; }).length;
    });
    if (!tasks && !late) return null;
    var parts = [];
    if (tasks) parts.push(tr("morningTasks").replace("{n}", tasks));
    if (late) parts.push(tr("morningLate").replace("{n}", late));
    if (first) parts.push(tr("morningFirst").replace("{time}", first.time).replace("{text}", first.text));
    return parts.join(", ");
  }
  function morningAlarms() {
    if (!wpQuietAlarmsSupported || !morningSummaryOn()) return [];
    var hm = morningSummaryTime().split(":"), now = Date.now(), out = [];
    for (var i = 0; i < 7; i++) {
      var iso = addDaysToISO(todayISO(), i);
      var d = wpDate(iso);
      d.setHours(+hm[0] || 0, +hm[1] || 0, 0, 0);
      if (d.getTime() <= now) continue;
      var body = morningSummaryText(iso);
      if (!body) continue;
      out.push({ id: "morning:" + iso, title: tr("morningTitle"), body: body, quiet: true, at: d.getTime(), view: "morning" });
    }
    return out;
  }
  (function () {
    var toggle = document.getElementById("morningSummaryToggle");
    var time = document.getElementById("morningSummaryTime");
    toggle.checked = morningSummaryOn();
    time.value = morningSummaryTime();
    var resync = function () { lastNativeTaskAlarmsJson = null; syncNativeTaskAlarms(); };
    toggle.addEventListener("change", function () {
      try { localStorage.setItem(MORNING_ON_KEY, toggle.checked ? "on" : "off"); } catch (e) {}
      resync();
    });
    time.addEventListener("change", function () {
      if (!/^\d\d:\d\d$/.test(time.value)) return;
      try { localStorage.setItem(MORNING_AT_KEY, time.value); } catch (e) {}
      resync();
    });
  })();

  // ---------------------------------------------------------------------
  // סקיצה – on the server. A project can hold several sketches: their list
  // is in the project's data (sketches: [{ id, name, updatedAt, updatedBy }],
  // so every member sees it) and each one's drawing is a JSON file in the
  // project's storage (<project>/sketches/<id>.json). The pad keeps working
  // on the phone's copy (skSaveDraft, every change) and sends it up a few
  // seconds after the drawing stops, and on leaving; what didn't make it
  // up (offline) goes the next time. Opening the pad: the sketch last open
  // on this phone - unless the server has a newer one of it - or the
  // project's newest, or a new one. The title (its name ▾) opens the list:
  // new, open, rename, delete.
  // ---------------------------------------------------------------------
  var SK_CUR_KEY = "itask-sketch-cur:";
  var skCloudTimer = null;
  var skCloudUploaded = {}; // sketchId -> the drawing last sent up (as JSON)
  var skCloudIndexAt = {};  // sketchId -> when its list entry was last written

  function skSheet() { return allSheets().find(function (s) { return s.id === sk.sheetId; }); }
  function skCloudPath(sheetId, id) { return sheetId + "/sketches/" + id + ".json"; }
  function skReadDraft(sheetId, id) {
    try { return JSON.parse(localStorage.getItem("itask-sketch:" + sheetId + ":" + id) || "null"); } catch (e) { return null; }
  }
  function skNewName(sheet) {
    var used = (sheet.sketches || []).map(function (x) { return x.name; });
    if (sk.sheetId === sheet.id && sk.sketchName) used.push(sk.sketchName);
    for (var n = 1; ; n++) {
      var name = tr("sketchTitle") + " " + n;
      if (used.indexOf(name) < 0) return name;
    }
  }
  function skFreshDraft(sheet) {
    return { sketchId: uid(), name: skNewName(sheet), els: [], scale: null, view: null, savedAt: 0, syncedAt: 0 };
  }
  // which sketch the pad opens on
  function skOpeningDraft(sheet) {
    var curId = null;
    try { curId = localStorage.getItem(SK_CUR_KEY + sheet.id); } catch (e) {}
    // the one draft per project of before (itask-sketch:<project>) becomes a sketch of its own
    var legacy = null;
    try { legacy = JSON.parse(localStorage.getItem("itask-sketch:" + sheet.id) || "null"); } catch (e) {}
    if (legacy && legacy.els) {
      var moved = Object.assign(skFreshDraft(sheet), { els: legacy.els, scale: legacy.scale || null, view: legacy.view || null, savedAt: Date.now() });
      try {
        localStorage.setItem("itask-sketch:" + sheet.id + ":" + moved.sketchId, JSON.stringify(moved));
        localStorage.setItem(SK_CUR_KEY + sheet.id, moved.sketchId);
        localStorage.removeItem("itask-sketch:" + sheet.id);
      } catch (e) {}
      return moved;
    }
    var mine = curId && skReadDraft(sheet.id, curId);
    if (mine) return mine;
    var listed = (sheet.sketches || []).slice().sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); })[0];
    if (listed) return { sketchId: listed.id, name: listed.name, els: [], scale: null, view: null, savedAt: 0, syncedAt: 0, needsServer: true };
    return skFreshDraft(sheet);
  }
  function skShowTitle() {
    var sheet = skSheet();
    document.getElementById("sketchTitle").textContent = (sk.sketchName || tr("sketchTitle")) + " ▾" + (sheet ? " · " + sheet.name : "");
  }

  // ---- up ---------------------------------------------------------------------
  function skCloudSoon() {
    clearTimeout(skCloudTimer);
    skCloudTimer = setTimeout(function () { skCloudNow(false); }, 2500);
  }
  // sends the open sketch up when it changed; final: also its list entry now
  function skCloudNow(final) {
    clearTimeout(skCloudTimer);
    var sheet = skSheet();
    if (!sheet || !sk.sketchId || !supabaseClient) return Promise.resolve();
    var id = sk.sketchId, name = sk.sketchName;
    var body = JSON.stringify({ name: name, els: sk.els, scale: sk.scale });
    var known = (sheet.sketches || []).some(function (x) { return x.id === id; });
    // nothing drawn yet and never sent: nothing to keep
    if (!sk.els.length && !known) return Promise.resolve();
    var sendBody = skCloudUploaded[id] !== body;
    var sendIndex = !known || final || Date.now() - (skCloudIndexAt[id] || 0) > 30000;
    if (!sendBody && !(sendIndex && sk.savedAt > (skCloudIndexAt[id] || 0))) return Promise.resolve();
    var savedAt = sk.savedAt;
    var up = sendBody ? supabaseClient.storage.from(LIBRARY_BUCKET).upload(skCloudPath(sheet.id, id),
      new Blob([JSON.stringify({ name: name, els: sk.els, scale: sk.scale, view: sk.view })], { type: "application/json" }),
      { upsert: true, contentType: "application/json" }).then(function (r) { if (r && r.error) throw r.error; }) : Promise.resolve();
    return up.then(function () {
      skCloudUploaded[id] = body;
      // one moment for both: this phone's copy and the list's "updated"
      var stamp = Math.max(savedAt, Date.now());
      if (sk.sketchId === id) {
        sk.syncedAt = stamp;
        var d = skReadDraft(sheet.id, id);
        if (d) { d.syncedAt = sk.syncedAt; try { localStorage.setItem("itask-sketch:" + sheet.id + ":" + id, JSON.stringify(d)); } catch (e) {} }
      }
      if (sendIndex) {
        skCloudIndexAt[id] = Date.now();
        return skIndexPut(sheet, { id: id, name: name, updatedAt: stamp, updatedBy: myPhoneNumber || null });
      }
    }).catch(function (err) {
      console.error("sketch upload failed:", err);
    });
  }
  // the project's list of sketches: add / update one entry, or drop it
  function skIndexPut(sheet, entry, remove) {
    var apply = function (list) {
      var out = (list || []).filter(function (x) { return x.id !== entry.id; });
      if (!remove) out.push(entry);
      return out;
    };
    if (!sheet.shared) {
      var live = data.sheets.find(function (s) { return s.id === sheet.id; });
      if (live) { live.sketches = apply(live.sketches); saveData(); }
      return Promise.resolve();
    }
    sheet.sketches = apply(sheet.sketches);
    return updateSharedSheetDataSafely(sheet.id, function (current) {
      return Object.assign({}, current, { sketches: apply(current.sketches) });
    }).then(function (newData) {
      var live2 = sharedSheets.find(function (s) { return s.id === sheet.id; });
      if (live2) live2.sketches = newData.sketches || [];
    });
  }

  // ---- down ---------------------------------------------------------------------
  function skFetchSketch(sheet, id) {
    return resolveFileUrl(skCloudPath(sheet.id, id)).then(fetchFileBlob).then(function (b) { return b.text(); }).then(JSON.parse);
  }
  // after opening: what's newer on the server comes down; what's waiting goes up
  function skCloudAfterOpen(sheet) {
    if (!supabaseClient) return;
    var id = sk.sketchId;
    var listed = (sheet.sketches || []).find(function (x) { return x.id === id; });
    var pending = sk.savedAt > (sk.syncedAt || 0);
    if (pending) { skCloudNow(true); return; }
    if (!listed || (listed.updatedAt || 0) <= (sk.syncedAt || 0)) return;
    skFetchSketch(sheet, id).then(function (remote) {
      if (sk.sketchId !== id || sk.savedAt > (sk.syncedAt || 0)) return; // drawn on meanwhile: keep
      skLoadDraft({ sketchId: id, name: listed.name, els: remote.els, scale: remote.scale, view: sk.els.length ? sk.view : remote.view,
        savedAt: listed.updatedAt, syncedAt: listed.updatedAt });
      skCloudUploaded[id] = JSON.stringify({ name: listed.name, els: sk.els, scale: sk.scale });
      skStoreOpened();
      skShowTitle();
      skUpdateButtons();
      skDraw();
    }).catch(function (err) { console.error("sketch download failed:", err); });
  }
  // the phone's copy of what's on the pad, without counting it as a change
  function skStoreOpened() {
    try {
      localStorage.setItem("itask-sketch:" + sk.sheetId + ":" + sk.sketchId, JSON.stringify({ sketchId: sk.sketchId, name: sk.sketchName,
        els: sk.els, scale: sk.scale, view: sk.view, savedAt: sk.savedAt, syncedAt: sk.syncedAt }));
      localStorage.setItem(SK_CUR_KEY + sk.sheetId, sk.sketchId);
    } catch (e) {}
  }
  // switches the pad to another sketch (after sending the open one up)
  function skSwitchTo(sheet, draft) {
    skCloudNow(true);
    skLoadDraft(draft);
    skStoreOpened();
    skShowTitle();
    skUpdateButtons();
    skDraw();
    skCloudAfterOpen(sheet);
  }

  // ---- the list -------------------------------------------------------------------
  var skListOverlay = document.getElementById("sketchListOverlay");
  function openSketchList() {
    var sheet = skSheet();
    if (!sheet) return;
    var list = document.getElementById("sketchListRows");
    list.innerHTML = "";
    var rows = (sheet.sketches || []).slice();
    if (!rows.some(function (x) { return x.id === sk.sketchId; })) rows.push({ id: sk.sketchId, name: sk.sketchName, updatedAt: sk.savedAt, local: true });
    rows.sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
    rows.forEach(function (x) {
      var row = document.createElement("div");
      row.className = "sk-list-row" + (x.id === sk.sketchId ? " on" : "");
      var open = document.createElement("button");
      open.type = "button";
      open.className = "sk-list-open";
      var nm = document.createElement("b");
      nm.textContent = (x.id === sk.sketchId ? "✏️ " : "") + x.name;
      open.appendChild(nm);
      var meta = document.createElement("small");
      var when = x.updatedAt ? new Date(x.updatedAt).toLocaleString(calLocale(), { day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" }) : "";
      var who = !x.updatedBy ? "" : x.updatedBy === myPhoneNumber ? tr("sketchByMe") : (resolveMemberName(sheet, x.updatedBy) || x.updatedBy);
      meta.textContent = [when, who].filter(Boolean).join(" · ");
      open.appendChild(meta);
      open.addEventListener("click", function () {
        skListOverlay.hidden = true;
        if (x.id === sk.sketchId) return;
        var mine = skReadDraft(sheet.id, x.id);
        skSwitchTo(sheet, mine || { sketchId: x.id, name: x.name, els: [], scale: null, view: null, savedAt: 0, syncedAt: 0 });
      });
      row.appendChild(open);
      var ren = document.createElement("button");
      ren.type = "button";
      ren.className = "sk-list-btn";
      ren.textContent = "✎";
      ren.title = tr("sketchRename");
      ren.addEventListener("click", function () { skAskName(sheet, x); });
      row.appendChild(ren);
      var del = document.createElement("button");
      del.type = "button";
      del.className = "sk-list-btn";
      del.textContent = "🗑";
      del.title = tr("deleteBtn");
      del.addEventListener("click", function () {
        // the question goes on top: the list steps aside till it's answered
        skListOverlay.hidden = true;
        askConfirm(tr("sketchDeleteConfirm").replace("{name}", x.name), function () { skDeleteSketch(sheet, x); });
      });
      row.appendChild(del);
      list.appendChild(row);
    });
    skListOverlay.hidden = false;
  }
  function skDeleteSketch(sheet, x) {
    try { localStorage.removeItem("itask-sketch:" + sheet.id + ":" + x.id); } catch (e) {}
    if (supabaseClient) supabaseClient.storage.from(LIBRARY_BUCKET).remove([skCloudPath(sheet.id, x.id)]).then(function () {}, function () {});
    var done = function () {
      if (x.id !== sk.sketchId) { openSketchList(); return; }
      // the open one went: the next newest, or a new one
      var next = (sheet.sketches || []).slice().sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); })[0];
      skLoadDraft(next ? (skReadDraft(sheet.id, next.id) || { sketchId: next.id, name: next.name, els: [], savedAt: 0, syncedAt: 0 }) : skFreshDraft(sheet));
      skStoreOpened();
      skShowTitle();
      skUpdateButtons();
      skDraw();
      skCloudAfterOpen(sheet);
      skListOverlay.hidden = true;
    };
    if ((sheet.sketches || []).some(function (s) { return s.id === x.id; })) skIndexPut(sheet, { id: x.id }, true).then(done, done);
    else done();
  }
  var skNameOverlay = document.getElementById("sketchNameOverlay");
  var skNameInput = document.getElementById("sketchNameInput");
  var skNaming = null;
  function skAskName(sheet, x) {
    skNaming = { sheet: sheet, x: x };
    skNameInput.value = x.name;
    skNameOverlay.hidden = false;
    skNameInput.focus();
    skNameInput.select();
  }
  function skSaveName() {
    var n = skNaming;
    var name = skNameInput.value.replace(/\s+/g, " ").trim();
    if (!n || !name) return;
    skNaming = null;
    skNameOverlay.hidden = true;
    if (n.x.id === sk.sketchId) {
      sk.sketchName = name;
      skShowTitle();
      skSaveDraft();
      skCloudNow(true).then(openSketchList);
      return;
    }
    var d = skReadDraft(n.sheet.id, n.x.id);
    if (d) { d.name = name; try { localStorage.setItem("itask-sketch:" + n.sheet.id + ":" + n.x.id, JSON.stringify(d)); } catch (e) {} }
    var listed = (n.sheet.sketches || []).find(function (s) { return s.id === n.x.id; });
    if (listed) skIndexPut(n.sheet, Object.assign({}, listed, { name: name, updatedAt: Date.now(), updatedBy: myPhoneNumber || null })).then(openSketchList, openSketchList);
    else openSketchList();
  }
  document.getElementById("sketchNameOkBtn").addEventListener("click", skSaveName);
  document.getElementById("sketchNameCancelBtn").addEventListener("click", function () { skNaming = null; skNameOverlay.hidden = true; });
  skNameInput.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); skSaveName(); } });
  document.getElementById("sketchTitle").addEventListener("click", openSketchList);
  document.getElementById("sketchNewBtn").addEventListener("click", function () {
    var sheet = skSheet();
    if (!sheet) return;
    skListOverlay.hidden = true;
    skSwitchTo(sheet, skFreshDraft(sheet));
  });
  document.getElementById("sketchListCancelBtn").addEventListener("click", function () { skListOverlay.hidden = true; });
  function loadFromLocalOrDefault() {
    return loadLocalData() || defaultData();
  }

  // If we can't confirm what's really in Supabase (or in a local cache) for
  // this user, we must never show a silently-empty, fully-editable app: any
  // ordinary action the user then takes (adding a task, renaming...) calls
  // the plain saveData() below, which would happily persist that empty
  // in-memory placeholder over real data still sitting in the row. Instead
  // we block all editing behind a visible retry screen until a load
  // actually confirms either real data or a genuinely brand-new user.
  function showDataLoadError(debugDetail) {
    dataLoadBlocked = true;
    privateDataSettled = true;
    appLoadingOverlay.hidden = true;
    dataErrorOverlay.hidden = false;
    var debugEl = document.getElementById("dataErrorDebug");
    if (debugEl) debugEl.textContent = debugDetail || "";
  }
  function hideDataLoadError() {
    dataLoadBlocked = false;
    privateDataSettled = true;
    dataErrorOverlay.hidden = true;
  }

  function startLocalOnly() {
    // Only ever auto-save here if we actually had a local cache to roll
    // forward. If local storage is also empty (new browser profile, cleared
    // data, a transient read failure - anything) AND there's a real Supabase
    // row this might be shadowing, block editing instead of rendering an
    // in-memory default: a network hiccup must never be able to silently
    // overwrite real data already sitting in Supabase just because this one
    // load couldn't reach it. When there's no Supabase client at all (e.g.
    // it failed to load), there's no remote row to protect, so fall back to
    // a plain empty default as before.
    var local = loadLocalData() || findLegacyLocalData();
    if (!local && supabaseClient) { showDataLoadError(); return; }
    hideDataLoadError();
    data = local || defaultData();
    if (local && applyDailyRollover(data)) saveData();
    applyTaskLinkFromURL();
    render();
  }

  function startWithSupabase() {
    editedSinceLastLoad = false;
    // Render the last known-good local snapshot immediately, if there is
    // one, instead of always waiting on the network before showing
    // anything - a real local cache was already the safe fallback for any
    // read failure below; this just uses it right away so the app feels
    // instant, while the real fetch still runs and quietly reconciles once
    // it lands. `data` never holds a placeholder/empty default here, only
    // a real prior snapshot, so this doesn't reopen the original
    // startup-race bug (rendering before we know anything real).
    var usedInstantLocal = false;
    var instantLocal = loadLocalData() || findLegacyLocalData();
    if (instantLocal) {
      data = instantLocal;
      privateDataSettled = true;
      usedInstantLocal = true;
      // Only persist this locally for now, never straight to the network:
      // this instant snapshot is whatever THIS device's cache happened to
      // hold, which on a rarely-used device can already be behind the
      // server (e.g. a site log added from another device since this one
      // was last opened). Pushing it here, before the remote fetch below
      // even gets a chance to reconcile, would silently overwrite that
      // newer server data with this stale copy. The reconciliation below
      // (and its existing editedSinceLastLoad/pending-sync checks) remains
      // the only path that actually writes to the server.
      if (applyDailyRollover(data)) saveLocalData();
      applyTaskLinkFromURL();
      render();
    }

    // A request here must never be able to leave the app stuck on the
    // loading screen forever with no way out - wrap it in a timeout (and a
    // sync try/catch, in case building the request itself throws) so any
    // failure mode, including one that never resolves or rejects, still
    // converges on startLocalOnly's own safe fallback (real local cache, or
    // a visible blocked/retry state - never a silent empty default).
    try {
      withTimeout(
        supabaseClient.from("app_state").select("data").eq("id", SUPABASE_ROW_ID).maybeSingle(),
        15000,
        "app_state load"
      ).then(function (result) {
        var row = result && result.data;
        var remote = row && row.data ? normalizeData(row.data) : null;
        var local = remote ? null : (loadLocalData() || findLegacyLocalData());
        var isFreshDefault = !remote && !local;
        var confirmedNewUser = isFreshDefault && !row;
        // Same protection as startLocalOnly: never render an editable bare
        // default over a row we simply failed to read cleanly. Only proceed
        // here when there's real data, or this is a confirmed brand-new
        // user (no row exists yet for this id at all).
        if (isFreshDefault && !confirmedNewUser) {
          // Already showing a valid local snapshot instantly above - leave
          // it up rather than blocking a perfectly good view.
          if (!usedInstantLocal) showDataLoadError();
          return;
        }
        hideDataLoadError();
        if (usedInstantLocal && editedSinceLastLoad) {
          // The user already made a real edit against the instantly
          // rendered local snapshot before this fetch resolved - their own
          // saveData() calls already own persisting from here on, so don't
          // overwrite with what may now be a stale-relative-to-that-edit
          // server snapshot.
          return;
        }
        if (usedInstantLocal && hasPendingSyncFromPreviousSession()) {
          // An edit from a PRIOR session never got confirmed saved (e.g.
          // the app was closed while offline) - the local snapshot is
          // still ahead of this remote read, so keep it and push it now
          // instead of quietly reverting to the older server row. This is
          // a fresh page load, so the in-memory pendingSyncDirty flag was
          // just reset to false and needs re-marking from the persisted
          // localStorage flag before flushPendingSync() will act on it.
          markPendingSyncDirty();
          flushPendingSync();
          return;
        }
        data = remote || local || defaultData();
        // Backups are a nice-to-have safety net, never allowed to disrupt
        // the core load/save flow if the backup table/call misbehaves.
        if (!isFreshDefault) { try { maybeBackupData(); } catch (e) {} }
        if (!isFreshDefault) { try { migratePrivateSheetsFileUrls(); } catch (e) {} }
        try {
          var rolled = applyDailyRollover(data);
          if (rolled && !isFreshDefault) saveData();
          if (confirmedNewUser) {
            // "No row returned" alone is NOT proof this id is actually
            // unused - RLS makes a blocked read look identical to a
            // genuinely missing row, and saveData()'s blind upsert would
            // silently overwrite a real row in that case. An insert-only
            // write fails on a real primary-key conflict regardless of
            // whether RLS hid that row from the SELECT above, so use that
            // as the actual confirmation instead, and hold off
            // rendering/editing until it comes back - exactly like a
            // normal read failure would.
            //
            // Two things a plain single attempt got wrong (caught in
            // review): an unresolving request here must still converge on
            // the loading screen's own timeout, same as the read above -
            // otherwise a hang leaves no visible retry option at all; and a
            // transient network error is not the same signal as a real
            // conflict, so only an actual unique-constraint violation
            // should be treated as "this wasn't a new user after all" -
            // anything else gets one silent retry before falling back to
            // the same visible retry screen a real read failure would show.
            var attemptInsert = function (isRetry) {
              withTimeout(
                supabaseClient.from("app_state").insert({ id: SUPABASE_ROW_ID, data: data, updated_at: new Date().toISOString() }),
                15000,
                "app_state new-user insert"
              ).then(function (result) {
                var err = result && result.error;
                if (err) {
                  var isConflict = err.code === "23505" || /duplicate key/i.test(err.message || "");
                  if (isConflict) {
                    showDataLoadError("existing row detected on insert: " + err.message);
                    return;
                  }
                  if (!isRetry) { attemptInsert(true); return; }
                  showDataLoadError(err.message);
                  return;
                }
                saveLocalData();
                applyTaskLinkFromURL();
                render();
              }, function (thrown) {
                if (!isRetry) { attemptInsert(true); return; }
                showDataLoadError((thrown && thrown.message) || String(thrown));
              });
            };
            attemptInsert(false);
            return;
          }
          applyTaskLinkFromURL();
          render();
        } catch (renderErr) {
          // Temporary diagnostic: a real fetch succeeded but something in
          // the render/rollover path threw on this account's actual data -
          // surface the real error instead of the generic message so this
          // can be root-caused without device-level debugging tools.
          console.error("startWithSupabase render error:", renderErr);
          showDataLoadError((renderErr && renderErr.message) || String(renderErr));
        }
      }, function () {
        if (!usedInstantLocal) startLocalOnly();
      }).catch(function () {
        if (!usedInstantLocal) startLocalOnly();
      });
    } catch (e) {
      console.error("startWithSupabase sync error:", e);
      if (!usedInstantLocal) startLocalOnly();
    }
    loadSharedSheets();
    loadMyOfficeGroups();
    loadTeam();
    checkPendingProjectInvites();
    checkPendingOfficeGroupInvites();
  }

  function sharedRowToSheet(row) {
    var d = row.data || {};
    var tasks = d.tasks || [];
    var reports = d.reports || [];
    var siteLogs = (d.siteLogs || []).map(normalizeSiteLog);
    var ended = d.ended || false;
    var endedDate = d.endedDate || null;
    var logoId = d.logoId || null;
    return {
      id: row.id,
      shared: true,
      name: row.name,
      tasks: tasks,
      reports: reports,
      files: d.files || [],
      siteLogs: siteLogs,
      folders: d.folders || null,
      officeDirectory: d.officeDirectory || null,
      workPlan: d.workPlan || [],
      workHammocks: d.workHammocks || [],
      workBaseline: d.workBaseline || null,
      sketches: d.sketches || [],
      ended: ended,
      endedDate: endedDate,
      logoId: logoId,
      members: row.members || [],
      memberNames: row.member_names || {},
      createdBy: row.created_by || null,
      messages: row.messages || [],
      // The last state of this sheet we've actually confirmed the server
      // holds - refreshed both by this load and by our own successful
      // saves. saveSharedSheets() diffs against this (not against the
      // previous in-memory sheet) to tell "we changed this locally" apart
      // from "this just came from the server as-is", which is what lets it
      // skip sheets nothing local touched and merge per-item on the ones
      // that did, instead of blindly overwriting the whole row.
      // Deep-cloned (JSON round-trip): tasks/reports/siteLogs here must
      // never be the SAME array objects as the sheet's own live tasks/
      // reports/siteLogs above - otherwise pushing/editing an item in
      // place would silently mutate this "last synced" baseline too
      // (same array reference), making every future diff check in
      // saveSharedSheets() see "nothing changed" and skip saving entirely.
      _syncedData: JSON.parse(JSON.stringify({ tasks: tasks, reports: reports, siteLogs: siteLogs, ended: ended, endedDate: endedDate, logoId: logoId }))
    };
  }

  function showSharedNotification(title, body, sheetId, tag, chat) {
    if (!("Notification" in window) || Notification.permission !== "granted" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.getRegistration().then(function (reg) {
      if (!reg) return;
      reg.showNotification(title, {
        body: body,
        icon: "tasks-icon-192.png",
        badge: "tasks-badge-96.png",
        tag: tag,
        data: { sheetId: sheetId, chat: !!chat }
      });
    }).catch(function () {});
  }

  function notifyNewSharedProject(sheet) {
    showSharedNotification(
      tr("newSharedProjectNotifTitle"),
      tr("newSharedProjectNotifBody").replace("{name}", sheet.name),
      sheet.id,
      "shared-project-" + sheet.id,
      false
    );
  }

  function notifyNewChatMessages(sheet, previousMessages) {
    if (activeChatSheetId === sheet.id) return;
    var previousIds = previousMessages.map(function (m) { return m.id; });
    var newMessages = (sheet.messages || []).filter(function (m) {
      return previousIds.indexOf(m.id) === -1 && m.type !== "system" && m.phone !== myPhoneNumber;
    });
    if (!newMessages.length) return;
    var last = newMessages[newMessages.length - 1];
    var senderName = resolveMemberName(sheet, last.phone);
    var lastText = last.type === "voice" ? tr("voiceMessageLabel") : last.text;
    var body = newMessages.length > 1
      ? tr("newChatMessagesNotifBody").replace("{count}", newMessages.length)
      : (senderName + ": " + lastText);
    showSharedNotification(sheet.name, body, sheet.id, "chat-" + sheet.id, true);
  }

  var sharedSheetsLoadedOnce = false;

  // No .contains("members", [myPhoneNumber]) filter here on purpose - RLS
  // alone decides what comes back: a project this account is a real member
  // of, OR a project whose member is in an office_groups row this account
  // created or is the named Head Office of (see office_groups.sql). Either
  // way the row lands in this same sharedSheets array with full normal
  // read/write access, so a watched project behaves exactly like a real
  // membership everywhere in the app - task writing (shown in red to
  // everyone else via isHeadOffice), chat, procurement purchase-marking,
  // combined reports, all of it.
  // Each refresh first reads only a light list - the projects' ids,
  // names, members and version stamps - and fetches whole rows (tasks,
  // diary, plans, the chat...) only for those that are new or changed
  // since the last read. Refetching everything every few seconds on every
  // open phone used up the server's monthly traffic quota.
  var SHARED_LIGHT_COLUMNS = "id, name, members, member_names, created_by, data_version, messages_version, updated_at";
  var sharedRowCache = {}; // id -> the last full row read, as read
  function sharedRowStamp(row) {
    return [row.data_version, row.messages_version, row.updated_at, row.name, JSON.stringify(row.members || []), JSON.stringify(row.member_names || {})].join("|");
  }
  function fetchSharedRows() {
    return supabaseClient.from(SHARED_TABLE).select(SHARED_LIGHT_COLUMNS).then(function (light) {
      if (light && light.error) throw light.error;
      var list = (light && light.data) || [];
      var stale = list.filter(function (r) {
        var cached = sharedRowCache[r.id];
        return !cached || sharedRowStamp(cached) !== sharedRowStamp(r);
      }).map(function (r) { return r.id; });
      var fetched = stale.length ? supabaseClient.from(SHARED_TABLE).select("*").in("id", stale) : Promise.resolve({ data: [] });
      return fetched.then(function (full) {
        if (full && full.error) throw full.error;
        ((full && full.data) || []).forEach(function (row) { sharedRowCache[row.id] = row; });
        var ids = {};
        list.forEach(function (r) { ids[r.id] = true; });
        Object.keys(sharedRowCache).forEach(function (id) { if (!ids[id]) delete sharedRowCache[id]; });
        // a deep copy each time: the sheets built from it get edited in place
        return { data: list.filter(function (r) { return sharedRowCache[r.id]; }).map(function (r) {
          return JSON.parse(JSON.stringify(sharedRowCache[r.id]));
        }) };
      });
    });
  }
  function loadSharedSheets() {
    if (!supabaseClient || !myPhoneNumber) return Promise.resolve();
    return fetchSharedRows()
      .then(function (result) {
        var rows = (result && result.data) || [];
        var previousById = {};
        sharedSheets.forEach(function (s) { previousById[s.id] = s; });
        var newSheets = rows.map(sharedRowToSheet);
        if (sharedSheetsLoadedOnce) {
          newSheets.forEach(function (s) {
            var prev = previousById[s.id];
            if (!prev) {
              notifyNewSharedProject(s);
            } else {
              notifyNewChatMessages(s, prev.messages || []);
            }
          });
        }
        sharedSheetsLoadedOnce = true;
        sharedSheets = newSheets;
        rollSheetsForward(sharedSheets);
        updateAppBadge();
        try { migrateAllSharedSheetsFileUrls(); } catch (e) {}
        // Don't paint an interactive frame off the private data's initial
        // (unresolved) default before that load has had a chance to settle -
        // see the privateDataSettled comment above. Once it settles, that
        // code path's own render() picks up whatever this call already
        // loaded into sharedSheets.
        if (privateDataSettled) render();
        tryOpenPendingChat();
      }, function () {});
  }

  var authGate = document.getElementById("authGate");
  var appRoot = document.getElementById("appRoot");
  var appLoadingOverlay = document.getElementById("appLoadingOverlay");
  var dataErrorOverlay = document.getElementById("dataErrorOverlay");
  var dataErrorRetryBtn = document.getElementById("dataErrorRetryBtn");
  dataErrorRetryBtn.addEventListener("click", function () {
    dataErrorOverlay.hidden = true;
    appLoadingOverlay.hidden = false;
    if (pendingFirebaseUserForToken) {
      beginAuthenticatedSession(pendingFirebaseUserForToken);
    } else if (supabaseClient) {
      startWithSupabase();
    } else {
      startLocalOnly();
    }
  });
  var authPhoneForm = document.getElementById("authPhoneForm");
  var authPhone = document.getElementById("authPhone");
  var authError = document.getElementById("authError");
  var authSendCodeBtn = document.getElementById("authSendCodeBtn");
  var authCodeForm = document.getElementById("authCodeForm");
  var authCodeSentTo = document.getElementById("authCodeSentTo");
  var authCode = document.getElementById("authCode");
  var authCodeError = document.getElementById("authCodeError");
  var authVerifyCodeBtn = document.getElementById("authVerifyCodeBtn");
  var authChangePhoneBtn = document.getElementById("authChangePhoneBtn");
  var menuUsernameLabel = document.getElementById("menuUsernameLabel");

  var pendingConfirmationResult = null;
  var recaptchaVerifier = null;
  var appShown = false;
  var justVerified = false;

  var SESSION_TOKEN_KEY = "itask-session-token";
  var mySessionToken = null;

  function claimSession() {
    mySessionToken = window.crypto.randomUUID ? window.crypto.randomUUID() : (Date.now().toString(36) + Math.random().toString(36).slice(2));
    try { localStorage.setItem(SESSION_TOKEN_KEY, mySessionToken); } catch (e) {}
    if (!supabaseClient) return Promise.resolve();
    return supabaseClient.from("app_state").update({ session_token: mySessionToken }).eq("id", SUPABASE_ROW_ID)
      .then(function () {}, function () {});
  }

  function establishSession() {
    var stored = null;
    try { stored = localStorage.getItem(SESSION_TOKEN_KEY); } catch (e) {}
    if (justVerified || !stored) return claimSession();
    mySessionToken = stored;
    return Promise.resolve();
  }

  function signOutDueToOtherDevice() {
    try { localStorage.removeItem(SESSION_TOKEN_KEY); } catch (e) {}
    try { localStorage.setItem("itask-kicked", "1"); } catch (e) {}
    clearCachedSessionJwt();
    firebaseAuth.signOut().then(function () { location.reload(); }, function () { location.reload(); });
  }

  function checkSessionStillActive() {
    if (!supabaseClient || !mySessionToken) return;
    supabaseClient.from("app_state").select("session_token").eq("id", SUPABASE_ROW_ID).maybeSingle()
      .then(function (result) {
        var remoteToken = result && result.data && result.data.session_token;
        if (remoteToken && remoteToken !== mySessionToken) signOutDueToOtherDevice();
      }, function () {});
  }

  function startSessionWatcher() {
    setInterval(checkSessionStillActive, 60000);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) checkSessionStillActive();
    });
  }

  function isEditingActively() {
    var el = document.activeElement;
    return !!(el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA"));
  }

  function refreshSharedSheetsIfIdle() {
    if (isEditingActively()) return;
    loadSharedSheets();
    loadMyOfficeGroups();
    checkPendingProjectInvites();
    checkPendingOfficeGroupInvites();
  }

  // A light poll (see fetchSharedRows) every 10 seconds while the app is
  // in front, and on coming back to it. (No realtime subscription: each of
  // its events carried the whole changed row to every open phone.)
  function startSharedSheetsWatcher() {
    setInterval(function () { if (!document.hidden) refreshSharedSheetsIfIdle(); }, 10000);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) refreshSharedSheetsIfIdle();
    });
  }

  // A fresh backup snapshot is only taken on load, gated by
  // BACKUP_MIN_INTERVAL_MS - but a session can stay open for hours without
  // a reload, during which real edits would sit unbacked-up the whole time.
  // Re-check periodically so a long session still gets a recent snapshot.
  function startPeriodicBackup() {
    setInterval(function () { try { maybeBackupData(); } catch (e) {} }, 15 * 60 * 1000);
  }

  function showApp(phoneNumber, rowId) {
    try {
      if (phoneNumber) localStorage.setItem(LAST_PHONE_KEY, "0" + String(phoneNumber).replace(/^\+972/, ""));
    } catch (e) {}
    SUPABASE_ROW_ID = rowId;
    myPhoneNumber = phoneNumber;
    loadChatReadState();
    menuUsernameLabel.textContent = tr("loggedInAs") + phoneNumber;
    hideSplash();
    if (appShown) return;
    appShown = true;
    authGate.hidden = true;
    appRoot.hidden = false;
    startWithSupabase();
    initReminderSettings();
    autoEnableChatNotifications();
    loadDeviceContactsIfNeeded();
    establishSession().then(startSessionWatcher);
    startSharedSheetsWatcher();
    startPeriodicBackup();
  }

  // The last number signed in on this device, so being asked to sign in
  // again only needs the code, not retyping the number.
  var LAST_PHONE_KEY = "itask-last-phone";
  function showAuthGate() {
    appRoot.hidden = true;
    authGate.hidden = false;
    hideSplash();
    var last = null;
    try { last = localStorage.getItem(LAST_PHONE_KEY); } catch (e) {}
    if (last && !authPhone.value) authPhone.value = last;
  }

  function showAuthError(msg) {
    authError.textContent = msg;
    authError.hidden = false;
  }
  function clearAuthError() {
    authError.hidden = true;
  }
  function showAuthCodeError(msg) {
    authCodeError.textContent = msg;
    authCodeError.hidden = false;
  }
  function clearAuthCodeError() {
    authCodeError.hidden = true;
  }

  (function checkKickedFlag() {
    var kicked = false;
    try {
      kicked = localStorage.getItem("itask-kicked") === "1";
      localStorage.removeItem("itask-kicked");
    } catch (e) {}
    if (kicked) showAuthError(tr("signedInElsewhere"));
  })();

  function showCodeStep(phoneNumber) {
    authPhoneForm.hidden = true;
    authCodeForm.hidden = false;
    authCodeSentTo.textContent = tr("authCodeSentTo") + phoneNumber;
    authCode.value = "";
    authCode.focus();
  }
  function showPhoneStep() {
    authCodeForm.hidden = true;
    authPhoneForm.hidden = false;
    clearAuthCodeError();
    pendingConfirmationResult = null;
  }

  // The app authenticates via Firebase phone auth, not Supabase Auth, so
  // without this step every Postgres RLS policy relying on auth.uid()
  // would never match any request - that's why RLS had to stay off
  // entirely until now. Right after Firebase confirms the phone, exchange
  // that credential for a short JWT signed with this Supabase project's
  // own JWT secret (minted server-side by mint-session-token, which
  // verifies the Firebase token itself before signing anything), and swap
  // it in as this client's Authorization header so auth.uid()/auth.jwt()
  // in RLS policies now correctly reflect who's actually asking.
  var pendingFirebaseUserForToken = null;

  // Minting a session token is a real network round-trip (verify the
  // Firebase credential server-side, sign a new JWT), so doing it on every
  // single app open would add a full extra round-trip to every login -
  // exactly the "why is this slower than WhatsApp" complaint. The token is
  // valid for 30 days and its content never changes until then, so cache it
  // in localStorage and only re-mint once it's actually close to expiring.
  var SESSION_JWT_CACHE_KEY = "itask-session-jwt-v1";
  var SESSION_JWT_CACHE_LIFETIME_MS = 25 * 24 * 60 * 60 * 1000; // server mints for 30 days; 5-day safety margin
  function loadCachedSessionJwt(phone) {
    try {
      var cached = JSON.parse(localStorage.getItem(SESSION_JWT_CACHE_KEY));
      if (!cached || cached.phone !== phone || !cached.token || !cached.userId || !cached.mintedAt) return null;
      if (Date.now() - cached.mintedAt > SESSION_JWT_CACHE_LIFETIME_MS) return null;
      return cached;
    } catch (e) { return null; }
  }
  function saveCachedSessionJwt(phone, token, userId) {
    try {
      localStorage.setItem(SESSION_JWT_CACHE_KEY, JSON.stringify({ phone: phone, token: token, userId: userId, mintedAt: Date.now() }));
    } catch (e) {}
  }
  function clearCachedSessionJwt() {
    try { localStorage.removeItem(SESSION_JWT_CACHE_KEY); } catch (e) {}
  }
  function applySessionToken(token) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      global: { headers: { Authorization: "Bearer " + token } }
    });
    // Realtime's websocket connection has its own, separate auth from the
    // REST calls above (which pick up the Authorization header on their
    // own) - without this, the realtime channel below would connect
    // anonymously and RLS would silently deliver it nothing.
    supabaseClient.realtime.setAuth(token);
  }

  function mintSupabaseSessionToken(firebaseUser) {
    return firebaseUser.getIdToken().then(function (idToken) {
      return supabaseClient.functions.invoke("mint-session-token", { body: { idToken: idToken } });
    }).then(function (result) {
      if (result.error || !result.data || !result.data.token) {
        throw (result.error || new Error("mint-session-token returned no token"));
      }
      var token = result.data.token;
      applySessionToken(token);
      return Promise.resolve(result.data.userId || phoneToUuid(firebaseUser.phoneNumber)).then(function (userId) {
        saveCachedSessionJwt(firebaseUser.phoneNumber, token, userId);
        return userId;
      });
    });
  }
  function withTimeout(promise, ms, label) {
    return new Promise(function (resolve, reject) {
      var timer = setTimeout(function () { reject(new Error(label + " timed out after " + ms + "ms")); }, ms);
      promise.then(function (v) { clearTimeout(timer); resolve(v); }, function (e) { clearTimeout(timer); reject(e); });
    });
  }
  function beginAuthenticatedSession(firebaseUser) {
    var cached = loadCachedSessionJwt(firebaseUser.phoneNumber);
    if (cached) {
      applySessionToken(cached.token);
      showApp(firebaseUser.phoneNumber, cached.userId);
      return;
    }
    pendingFirebaseUserForToken = firebaseUser;
    withTimeout(mintSupabaseSessionToken(firebaseUser), 15000, "mintSupabaseSessionToken").then(function (rowId) {
      pendingFirebaseUserForToken = null;
      showApp(firebaseUser.phoneNumber, rowId);
    }, function (err) {
      console.error("mintSupabaseSessionToken failed:", err);
      showDataLoadError();
    });
  }

  if (!supabaseClient || !firebaseAuth) {
    appRoot.hidden = false;
    authGate.hidden = true;
    document.getElementById("accountMenuSection").hidden = true;
    document.getElementById("reminderMenuSection").hidden = true;
    document.getElementById("chatNotifMenuSection").hidden = true;
    startLocalOnly();
    hideSplash();
  } else {
    firebaseAuth.onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser && firebaseUser.phoneNumber) {
        if (supabaseClient.functions) {
          beginAuthenticatedSession(firebaseUser);
        } else {
          phoneToUuid(firebaseUser.phoneNumber).then(function (rowId) {
            showApp(firebaseUser.phoneNumber, rowId);
          });
        }
      } else {
        showAuthGate();
      }
    });

    authPhoneForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearAuthError();
      var digits = authPhone.value.replace(/\D/g, "").replace(/^0+/, "");
      if (digits.length < 8 || digits.length > 10) {
        showAuthError(tr("invalidPhoneNumber"));
        return;
      }
      var phone = "+972" + digits;
      authSendCodeBtn.disabled = true;
      if (!recaptchaVerifier) {
        recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptchaContainer", { size: "invisible" });
      }
      firebaseAuth.signInWithPhoneNumber(phone, recaptchaVerifier)
        .then(function (confirmationResult) {
          authSendCodeBtn.disabled = false;
          pendingConfirmationResult = confirmationResult;
          showCodeStep(phone);
        }, function (err) {
          authSendCodeBtn.disabled = false;
          console.error("signInWithPhoneNumber failed:", err);
          showAuthError(tr("sendCodeError") + " (" + (err && (err.code || err.message) || "unknown") + ")");
          recaptchaVerifier.render().then(function (widgetId) {
            if (window.grecaptcha) window.grecaptcha.reset(widgetId);
          });
        });
    });

    authCodeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearAuthCodeError();
      var code = authCode.value.trim();
      if (!pendingConfirmationResult || !/^\d{6}$/.test(code)) {
        showAuthCodeError(tr("invalidCode"));
        return;
      }
      authVerifyCodeBtn.disabled = true;
      pendingConfirmationResult.confirm(code).then(function () {
        authVerifyCodeBtn.disabled = false;
        justVerified = true;
      }, function () {
        authVerifyCodeBtn.disabled = false;
        showAuthCodeError(tr("wrongCode"));
      });
    });

    authChangePhoneBtn.addEventListener("click", showPhoneStep);
  }

  // Registering the service worker here (even inside the native Capacitor
  // app) is what makes push notifications/reminders work there at all -
  // pushManager.subscribe() and the "push" event both need an active SW
  // registration.
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("tasks-sw.js").then(function (reg) {
        // A new SW version can finish installing and take over (via
        // skipWaiting + clients.claim in tasks-sw.js) while this exact page
        // instance is still open - e.g. an installed PWA resumed from the
        // background instead of getting a true cold reload. That alone
        // doesn't refresh anything already rendered (images, this script's
        // own in-memory state), so without an explicit reload here, a
        // pushed fix can silently activate in the background while the
        // visible page keeps showing the stale version indefinitely.
        var reloadedForUpdate = false;
        // None of this app's inline-edit fields (task text, report cells,
        // chat input, site-log names...) autosave keystroke-by-keystroke -
        // they only commit on blur/Enter. Force-reloading out from under an
        // in-progress edit with no warning would silently discard whatever
        // hadn't been committed yet, so defer the reload until the
        // currently-focused field (if any) loses focus, which is exactly
        // when its edit, if any, has already committed.
        function reloadOnce() {
          if (reloadedForUpdate) return;
          reloadedForUpdate = true;
          var active = document.activeElement;
          var isEditing = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable);
          if (!isEditing) { window.location.reload(); return; }
          document.addEventListener("focusout", function onBlur() {
            document.removeEventListener("focusout", onBlur, true);
            window.location.reload();
          }, true);
        }
        navigator.serviceWorker.addEventListener("controllerchange", reloadOnce);
        if (reg.waiting) reloadOnce();
        reg.addEventListener("updatefound", function () {
          var installing = reg.installing;
          if (!installing) return;
          installing.addEventListener("statechange", function () {
            if (installing.state === "activated") reloadOnce();
          });
        });
        reg.update().catch(function () {});
      }).catch(function () {});
    });
  }

  // Automated tests only (tests/specs): a test page defines
  // window.__itaskTestHooks before load to reach a few internals that have
  // no UI of their own. Never defined in real use, so this does nothing.
  if (typeof window.__itaskTestHooks === "function") {
    window.__itaskTestHooks({
      mergeSharedArrayByLocalChanges: mergeSharedArrayByLocalChanges,
      // swaps in an in-memory stand-in for Supabase (tests/specs/helpers)
      setBackendForTest: function (client, phone) {
        supabaseClient = client;
        myPhoneNumber = phone;
      },
      updateSharedSheetDataSafely: updateSharedSheetDataSafely,
      loadMyOfficeGroups: loadMyOfficeGroups,
      checkPendingProjectInvites: checkPendingProjectInvites,
      verifyCalendarLinks: function () { return calVerifyLinks(true); },
      parseVoiceCommand: parseVoiceCommand,
      loadTeam: loadTeam,
      financeOwnerPhones: function () { return financeOwnerPhones(); },
      loadSharedSheets: loadSharedSheets,
      // another member's change to a shared task arriving (as a refresh would)
      updateSharedTaskForTest: function (sheetId, taskId, mutate) {
        var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
        var task = sheet && sheet.tasks.find(function (t) { return t.id === taskId; });
        if (!task) return;
        mutate(task);
        sheet._syncedData = JSON.parse(JSON.stringify(Object.assign({}, sheet._syncedData, { tasks: sheet.tasks })));
        render();
      },
      addSharedSheetForTest: function (sheet) {
        sheet.siteLogs = (sheet.siteLogs || []).map(normalizeSiteLog);
        sharedSheets.push(sheet);
        data.activeSheetId = sheet.id;
        render();
      }
    });
  }
})();
