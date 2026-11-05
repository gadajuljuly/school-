/* Languages: Hebrew, Arabic, English. One language for the whole app: screens, mapping,
 * goal bank, plan, printout, Excel and the AI helper.
 * Texts are written once (in the language of their source material) and translated through
 * the dictionaries in i18n/*.js: TR[original] = [he, ar, en] ('' = the original itself). */
'use strict';

const LANGS = [
  { id: 'he', name: 'עברית', dir: 'rtl' },
  { id: 'ar', name: 'العربية', dir: 'rtl' },
  { id: 'en', name: 'English', dir: 'ltr' },
];
const LANG = (() => {
  const saved = localStorage.getItem('tala.lang');
  return LANGS.some(l => l.id === saved) ? saved : 'he';
})();
const LANG_INDEX = { he: 0, ar: 1, en: 2 }[LANG];
const TR = Object.create(null);

// Translate a text into the current language (the text itself when it is already in it).
function T(key) {
  const e = TR[key];
  return (e && e[LANG_INDEX]) || key;
}
function setLang(id) {
  localStorage.setItem('tala.lang', id);
  location.reload();
}
document.documentElement.lang = LANG;
document.documentElement.dir = LANGS.find(l => l.id === LANG).dir;
