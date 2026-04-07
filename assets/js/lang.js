/* ─────────────────────────────────────────
   LANGUAGE SWITCH (FR / EN)
───────────────────────────────────────── */
(function() {
  const STORAGE_KEY = 'pm-lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'fr';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    /* Translate all elements with data-fr / data-en */
    document.querySelectorAll('[data-fr][data-en]').forEach(el => {
      el.textContent = el.getAttribute('data-' + lang);
    });

    /* Translate placeholders */
    document.querySelectorAll('[data-placeholder-fr][data-placeholder-en]').forEach(el => {
      el.placeholder = el.getAttribute('data-placeholder-' + lang);
    });

    /* Update toggle buttons */
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    /* Dispatch event for typewriter */
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  /* Initialize on DOM ready */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
    });
    applyLang(currentLang);
  });
})();
