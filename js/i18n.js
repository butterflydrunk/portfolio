/* ═══════════════════════════════════════════
   BILINGUAL i18n ENGINE (RU ⇄ EN)
   Auto-detects visitor locale (US/UK/EU -> EN, CIS -> RU)
═══════════════════════════════════════════ */

let currentLang = 'ru';

function detectInitialLanguage() {
  const saved = localStorage.getItem('mekan-lang');
  if (saved === 'ru' || saved === 'en') return saved;

  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  // If Russian, Belarusian, Ukrainian, Kazakh -> Russian
  if (browserLang.startsWith('ru') || browserLang.startsWith('be') || browserLang.startsWith('uk') || browserLang.startsWith('kk')) {
    return 'ru';
  }
  // Default to English for international & US visitors
  return 'en';
}

function getTranslation(path, lang = currentLang) {
  const keys = path.split('.');
  let obj = TRANSLATIONS[lang];
  for (const k of keys) {
    if (!obj || obj[k] === undefined) return null;
    obj = obj[k];
  }
  return obj;
}

function applyLanguage(lang) {
  if (lang !== 'ru' && lang !== 'en') lang = 'en';
  currentLang = lang;
  localStorage.setItem('mekan-lang', lang);
  document.documentElement.setAttribute('lang', lang);

  // 1. Text translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getTranslation(key, lang);
    if (val !== null) el.textContent = val;
  });

  // 2. HTML translations (preserving strong, em, code tags)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const val = getTranslation(key, lang);
    if (val !== null) el.innerHTML = val;
  });

  // 3. Input placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const val = getTranslation(key, lang);
    if (val !== null) el.setAttribute('placeholder', val);
  });

  // 4. Update language button UI
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.innerHTML = lang === 'en'
      ? '<span class="lang-flag">🌐</span> <span class="lang-code">EN</span>'
      : '<span class="lang-flag">🌐</span> <span class="lang-code">RU</span>';
    langBtn.setAttribute('title', lang === 'en' ? 'Switch to Russian' : 'Switch to English');
  }

  const mobileLangBtn = document.getElementById('mobileLangBtn');
  if (mobileLangBtn) {
    mobileLangBtn.innerHTML = lang === 'en' ? '🌐 Language: English' : '🌐 Язык: Русский';
  }

  // 5. Notify script.js to update dynamic phrases (decrypt text, terminal, chat KB)
  if (typeof onLanguageChanged === 'function') {
    onLanguageChanged(lang);
  }
}

function toggleLanguage() {
  applyLanguage(currentLang === 'ru' ? 'en' : 'ru');
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const initial = detectInitialLanguage();
  applyLanguage(initial);

  const btn = document.getElementById('langToggleBtn');
  if (btn) btn.addEventListener('click', toggleLanguage);

  const mBtn = document.getElementById('mobileLangBtn');
  if (mBtn) mBtn.addEventListener('click', toggleLanguage);
});
