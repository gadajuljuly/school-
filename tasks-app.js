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
    chatFileSavedToLibraryMsg: { he: "נשמר בספריית הפרויקט › הורדות", en: "Saved to the project library › Downloads", ar: "تم الحفظ في مكتبة المشروع › التنزيلات", ru: "Сохранено в библиотеке проекта › Загрузки" },
    chatFileSaveError: { he: "לא הצלחנו לשמור את הקובץ - נסו שוב", en: "Couldn't save the file - try again", ar: "تعذر حفظ الملف - حاول مرة أخرى", ru: "Не удалось сохранить файл - попробуйте ещё раз" },
    libraryFolderDownloads: { he: "הורדות", en: "Downloads", ar: "التنزيلات", ru: "Загрузки" },
    chatFileOpenError: { he: "לא הצלחנו לפתוח את הקובץ - נסו שוב", en: "Couldn't open the file - try again", ar: "تعذر فتح الملف - حاول مرة أخرى", ru: "Не удалось открыть файл - попробуйте ещё раз" },
    calInvitePushText: { he: "{name} הוסיף/ה אותך לאירוע:", en: "{name} added you to an event:", ar: "أضافك {name} إلى حدث:", ru: "{name} добавил(а) вас в событие:" },
    calInviteNoMembers: { he: "אין עוד משתתפים בפרויקט", en: "No other members in this project", ar: "لا يوجد أعضاء آخرون في المشروع", ru: "В проекте нет других участников" },
    calInviteSentMsg: { he: "האירוע נשלח ל־{n} משתתפים", en: "Event shared with {n} members", ar: "تمت مشاركة الحدث مع {n} أعضاء", ru: "Событие отправлено участникам: {n}" },
    calInviteClearedMsg: { he: "השיתוף בוטל", en: "Sharing removed", ar: "تم إلغاء المشاركة", ru: "Общий доступ отменён" },
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
            siteLogs: sheet.siteLogs || [], ended: sheet.ended || false, endedDate: sheet.endedDate || null, logoId: sheet.logoId || null
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
    var json = JSON.stringify(projects);
    if (json === lastNativeWidgetJson) return;
    lastNativeWidgetJson = json;
    nativeTaskAlarmPlugin.setWidgetData({
      projects: projects,
      title: tr("focusViewTitle"),
      emptyText: tr("focusViewEmpty")
    }).catch(function () { lastNativeWidgetJson = null; });
  }

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
        if (occ) calOpenEditor(occ);
        else showToast(tr("calEventMissingMsg"));
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

  function calRender() {
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
    var color = calColor(ev.color);
    chip.className = "cal-chip" + (ev.allDay ? "" : " timed");
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
        block.className = "cal-event-block";
        block.style.background = calColor(item.ev.color);
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
        dot.style.background = calColor(ev.color);
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
  function openImageViewer(url, name) {
    imageViewerImg.src = url;
    imageViewerImg.alt = name || "";
    imageViewerOverlay.hidden = false;
  }
  function closeImageViewer() {
    imageViewerOverlay.hidden = true;
    imageViewerImg.removeAttribute("src");
  }
  imageViewerOverlay.addEventListener("click", closeImageViewer);

  // ⬇ on a chat file: a copy goes into this project's library, in its
  // "הורדות" folder (created on first use).
  function ensureKeyedLibraryFolder(sheet, key) {
    var isIt = function (f) { return f.key === key; };
    return new Promise(function (resolve) {
      ensureLibraryFolders(sheet, function (folders) {
        var existing = folders.find(isIt);
        if (existing) { resolve(existing.id); return; }
        var newId = uid();
        if (sheet.shared) {
          applySharedLibraryFolders(sheet.id, function (liveFolders) {
            if (liveFolders.some(isIt)) return liveFolders;
            return liveFolders.concat([{ id: newId, key: key, name: null, files: [] }]);
          }).then(function (updated) {
            var folder = updated.find(isIt);
            resolve(folder ? folder.id : newId);
          });
        } else {
          var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
          if (!liveSheet.folders) liveSheet.folders = folders;
          var folder = liveSheet.folders.find(isIt);
          if (!folder) {
            folder = { id: newId, key: key, name: null, files: [] };
            liveSheet.folders.push(folder);
            saveData();
          }
          resolve(folder.id);
        }
      });
    });
  }
  function saveChatFileToLibrary(sheetId, m) {
    var sheet = sharedSheets.find(function (s) { return s.id === sheetId; });
    if (!sheet || !supabaseClient) return;
    var fileName = m.fileName || "file";
    showToast(tr("chatFileSavingMsg"));
    fetchFileBlob(m.fileUrl).then(function (blob) {
      return ensureKeyedLibraryFolder(sheet, "downloads").then(function (folderId) {
        var path = sheet.id + "/" + folderId + "/" + uid() + "-" + safeStorageFileName(fileName);
        return supabaseClient.storage.from(LIBRARY_BUCKET).upload(path, blob, { contentType: m.fileType || blob.type }).then(function (result) {
          if (result.error) throw result.error;
          var entry = { id: uid(), name: fileName, path: path, type: m.fileType || blob.type || "", size: blob.size || 0, uploadedAt: Date.now() };
          return addFileToLibraryFolder(sheet, folderId, entry);
        });
      });
    }).then(function () {
      showToast(tr("chatFileSavedToLibraryMsg"));
    }, function () {
      alert(tr("chatFileSaveError"));
    });
  }

  function refreshActiveChat() {
    if (!activeChatSheetId || !supabaseClient) return;
    supabaseClient.from(SHARED_TABLE).select("messages").eq("id", activeChatSheetId).maybeSingle()
      .then(function (result) {
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
    chatInput.focus();
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
        return supabaseClient.from(SHARED_TABLE).update({ messages: updated }).eq("id", sheetId)
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

  var DEFAULT_LIBRARY_FOLDER_KEYS = ["plans", "photos", "diaries", "reports", "procurementOrders", "attendanceReports", "toolsReports"];
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
          return supabaseClient.from(SHARED_TABLE).update({ messages: current }).eq("id", sheet.id);
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
          return supabaseClient.from(SHARED_TABLE).update({ data: updatedData }).eq("id", sheet.id);
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
        var item = document.createElement("div");
        item.className = "library-item";

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

        libraryFoldersGrid.appendChild(item);
      });
    });
  }

  function deleteLibraryFolder(sheet, folder) {
    var sheetId = sheet.id;
    var isShared = !!sheet.shared;
    var paths = (folder.files || []).map(function (f) { return f.path; });
    var removePromise = paths.length ? supabaseClient.storage.from(LIBRARY_BUCKET).remove(paths) : Promise.resolve();
    removePromise.then(function () {
      if (isShared) {
        return applySharedLibraryFolders(sheetId, function (folders) {
          return folders.filter(function (f) { return f.id !== folder.id; });
        });
      }
      var liveSheet = data.sheets.find(function (s) { return s.id === sheetId; });
      if (liveSheet && liveSheet.folders) {
        liveSheet.folders = liveSheet.folders.filter(function (f) { return f.id !== folder.id; });
        saveData();
      }
    }).then(function () {
      renderLibraryFolders();
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
    libraryGrid.classList.toggle("library-grid-rows", !!folder && (isProcurementOrdersFolder(folder) || isAttendanceReportsFolder(folder) || isToolsReportsFolder(folder)));
    libraryGrid.innerHTML = "";
    if (!files.length) {
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

      // Long-press (matching the folder grid's own long-press pattern) pops
      // up a share/delete action modal, so sharing a file doesn't need its
      // own always-visible button crowding the thumbnail grid.
      var filePressStartX = 0, filePressStartY = 0;
      var startFilePress = function (e) {
        if (e.target.closest("button")) return;
        var point = e.touches ? e.touches[0] : e;
        filePressStartX = point.clientX;
        filePressStartY = point.clientY;
        fileLongPressFired = false;
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(function () {
          fileLongPressFired = true;
          openLibraryFileActionModal(sheet, folder, entry);
        }, 1000);
      };
      var cancelFilePress = function () { clearTimeout(longPressTimer); };
      var moveFilePress = function (e) {
        var point = e.touches ? e.touches[0] : e;
        if (Math.abs(point.clientX - filePressStartX) > 10 || Math.abs(point.clientY - filePressStartY) > 10) {
          cancelFilePress();
        }
      };
      item.addEventListener("mousedown", startFilePress);
      item.addEventListener("mouseup", cancelFilePress);
      item.addEventListener("mouseleave", cancelFilePress);
      item.addEventListener("mousemove", moveFilePress);
      item.addEventListener("touchstart", startFilePress, { passive: true });
      item.addEventListener("touchend", cancelFilePress);
      item.addEventListener("touchmove", moveFilePress, { passive: true });

      libraryGrid.appendChild(item);
    });
  }

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
    libraryHeadTitle.textContent = folderDisplayName(folder);
    renderLibraryGrid();
    libraryFoldersView.hidden = true;
    libraryView.hidden = false;
    updateActiveFabHighlight();
  }
  function closeLibraryView() {
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

  function openLibraryFolderNameModal() {
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
    if (sheet.shared) {
      applySharedLibraryFolders(sheet.id, function (folders) { return (folders || []).concat([newFolder]); })
        .then(function () { renderLibraryFolders(); });
      return;
    }
    var liveSheet = data.sheets.find(function (s) { return s.id === sheet.id; });
    if (liveSheet) {
      liveSheet.folders = (liveSheet.folders || []).concat([newFolder]);
      saveData();
      renderLibraryFolders();
    }
  }
  libraryAddFolderBtn.addEventListener("click", openLibraryFolderNameModal);
  libraryFolderNameOkBtn.addEventListener("click", createLibraryFolder);
  libraryFolderNameCancelBtn.addEventListener("click", closeLibraryFolderNameModal);
  libraryFolderNameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); createLibraryFolder(); }
    if (e.key === "Escape") { closeLibraryFolderNameModal(); }
  });
  libraryFolderNameOverlay.addEventListener("click", function (e) {
    if (e.target === libraryFolderNameOverlay) closeLibraryFolderNameModal();
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
    logs.forEach(function (log, index) {
      var docEl = buildSiteLogGeneralPdfElement(sheet, log, log.number);
      if (index > 0) docEl.classList.add("pdf-doc-periodic-section");
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
  function renderSiteLogNameList(container, getEntries, addEntry, removeEntry, rerender) {
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
      renderSiteLogAttendanceColumns
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
      renderSiteLogContractorsList
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
  function visibleSheets() {
    return allSheets().filter(function (s) {
      if (s.id === HEAD_OFFICE_SHEET_ID) return isHeadOfficeMode && !viewingArchive;
      if (isHeadOfficeMode && !s.shared) return false;
      return !!s.ended === viewingArchive;
    });
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

  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = taskInput.value.trim();
    if (!text) return;
    pendingNewTaskText = text;
    addTypeOverlay.hidden = false;
  });

  function cycleStatus(id, inSheet) {
    var sheet = inSheet || activeSheet();
    var t = sheet.tasks.find(function (x) { return x.id === id; });
    if (t) {
      var wasDone = t.status === 2;
      t.status = (t.status + 1) % 3;
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
    if (state.viewMode === "chat") active = chatBtn;
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
          openOfficeProcurementView(t.targetSheetId, t.targetDate);
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
            openOfficeProcurementView(t.targetSheetId, t.targetDate);
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
    syncNativeWidget();

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
  function loadSharedSheets() {
    if (!supabaseClient || !myPhoneNumber) return Promise.resolve();
    return supabaseClient.from(SHARED_TABLE).select("*")
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

  function startSharedSheetsWatcher() {
    setInterval(refreshSharedSheetsIfIdle, 20000);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) refreshSharedSheetsIfIdle();
    });
    subscribeSharedProjectsRealtime();
  }

  // Pushes shared-project changes (a task, a chat message, a purchase
  // mark...) to every member's app the moment they happen, instead of
  // everyone waiting on the periodic poll above - that poll stays in
  // place as a fallback in case the websocket connection ever drops.
  // Debounced so a burst of several quick changes (e.g. someone editing
  // multiple tasks in a row) triggers one refresh, not one per change.
  var sharedProjectsRealtimeChannel = null;
  var realtimeRefreshTimer = null;
  function handleSharedProjectsRealtimeChange(payload) {
    clearTimeout(realtimeRefreshTimer);
    realtimeRefreshTimer = setTimeout(function () {
      // Same guard the polling path uses - don't yank a full task-list
      // rebuild out from under someone mid-edit; the next poll or
      // realtime event once they're idle will catch it up.
      if (!isEditingActively()) loadSharedSheets();
      var changedId = (payload && payload.new && payload.new.id) || (payload && payload.old && payload.old.id);
      if (activeChatSheetId && changedId === activeChatSheetId) refreshActiveChat();
    }, 150);
  }
  function subscribeSharedProjectsRealtime() {
    if (!supabaseClient || !supabaseClient.realtime || sharedProjectsRealtimeChannel) return;
    sharedProjectsRealtimeChannel = supabaseClient
      .channel("shared_projects_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: SHARED_TABLE }, handleSharedProjectsRealtimeChange)
      .subscribe();
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
