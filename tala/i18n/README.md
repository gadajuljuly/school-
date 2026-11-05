# Languages (עברית / العربية / English)

The whole app works in one language at a time, chosen in the top bar or on the sign-in screen:
screens, mapping, goal bank, plan, printout, Excel and the ✨ writing helper.

- `../i18n.js` – the current language (`LANG`) and `T(text)`.
- `ui.js` – screen texts: `"original": [he, ar, en]`, `""` = the original itself.
- `materials.js` – the professional materials (goal bank, mapping items, interim assessment,
  assessment tools, methods, recommendations), in the same form.

## Adding new materials
1. Add the texts to `../materials.js` in the language of the source document (Arabic documents in
   Arabic, Hebrew documents in Hebrew), with stable ids as for the existing items.
2. Add an entry for every new text to `materials.js` here with the other two languages,
   using the terms of the existing entries.
3. Texts with blanks keep them: `صف ___` / `כיתה ___` / `grade ___`, and
   `كلمة في الدقيقة` / `מילים בדקה` / `words per minute` (filled in by the app).
