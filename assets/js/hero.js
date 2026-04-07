/* ─────────────────────────────────────────
   HERO TYPEWRITER — Multilingual
───────────────────────────────────────── */
(function() {
  const titleEl = document.getElementById('heroTitle');
  const subEl   = document.getElementById('heroSub');
  const heroLeft = document.querySelector('.hero-left');

  const HERO_CONTENT = {
    fr: {
      titles: [
        { before: 'La messagerie professionnelle ', highlight: 'made in Cameroun', after: '' },
        { before: 'Vos données restent ', highlight: 'au Cameroun', after: ', entre vos mains.' },
        { before: 'Simple, rapide et ', highlight: '100 % souveraine', after: '.' },
      ],
      subs: [
        'Rejoignez les entreprises, universités et administrations qui font confiance à Pyramid Mail pour leurs communications du quotidien.',
        'Une messagerie conçue pour les réalités africaines, accessible partout, même en mode hors-ligne.',
        'Pyramid Mail, la première solution de communication professionnelle née au Cameroun.',
      ]
    },
    en: {
      titles: [
        { before: 'The professional messaging app ', highlight: 'made in Cameroon', after: '' },
        { before: 'Your data stays ', highlight: 'in Cameroon', after: ', in your hands.' },
        { before: 'Simple, fast and ', highlight: '100% sovereign', after: '.' },
      ],
      subs: [
        'Join the companies, universities and administrations that trust Pyramid Mail for their daily communications.',
        'A messaging app built for African realities, accessible everywhere, even offline.',
        'Pyramid Mail, the first professional communication solution born in Cameroon.',
      ]
    }
  };

  const STORAGE_KEY = 'pm-lang';
  const SPEED_TYPE = 45, SPEED_DEL = 22, PAUSE_END = 2200, PAUSE_START = 350;

  function lang() { return localStorage.getItem(STORAGE_KEY) || 'fr'; }
  function titles() { return HERO_CONTENT[lang()].titles; }
  function subs()   { return HERO_CONTENT[lang()].subs; }

  let tIdx = 0, tChar = 0, sChar = 0, phase = 'title';
  let paused = false;
  let pendingTimer = null;

  function titleFull() { const t = titles()[tIdx]; return (t.before + t.highlight + t.after).length; }
  function subFull()   { return subs()[tIdx].length; }

  function renderTitle(n) {
    const t = titles()[tIdx];
    const full = t.before + t.highlight + t.after;
    const typed = full.substring(0, n);
    const bLen = t.before.length, hLen = t.highlight.length;
    let html = n <= bLen ? typed
             : n <= bLen + hLen ? t.before + '<span class="tw-highlight">' + typed.substring(bLen) + '</span>'
             : t.before + '<span class="tw-highlight">' + t.highlight + '</span>' + typed.substring(bLen + hLen);
    titleEl.innerHTML = html + '<span class="tw-cursor"></span>';
  }

  function renderSub(n) {
    subEl.innerHTML = subs()[tIdx].substring(0, n) + '<span class="tw-cursor2"></span>';
  }

  function showFull() {
    renderTitle(titleFull());
    renderSub(subFull());
  }

  function resetTypewriter() {
    if (pendingTimer) clearTimeout(pendingTimer);
    tIdx = 0; tChar = 0; sChar = 0; phase = 'title';
    renderTitle(0);
    renderSub(0);
    pendingTimer = setTimeout(tick, 300);
  }

  function scheduleTickFn(delay) {
    if (pendingTimer) clearTimeout(pendingTimer);
    if (paused) return;
    pendingTimer = setTimeout(tick, delay);
  }

  function tick() {
    if (paused) return;
    if (phase === 'title') {
      renderTitle(++tChar);
      if (tChar >= titleFull()) { phase = 'sub'; scheduleTickFn(PAUSE_START); return; }
      scheduleTickFn(SPEED_TYPE);
    } else if (phase === 'sub') {
      renderSub(++sChar);
      if (sChar >= subFull()) { phase = 'del-sub'; scheduleTickFn(PAUSE_END); return; }
      scheduleTickFn(SPEED_TYPE * 0.55);
    } else if (phase === 'del-sub') {
      renderSub(--sChar);
      if (sChar <= 0) { phase = 'del-title'; scheduleTickFn(80); return; }
      scheduleTickFn(SPEED_DEL * 0.4);
    } else if (phase === 'del-title') {
      renderTitle(--tChar);
      if (tChar <= 0) { tIdx = (tIdx + 1) % titles().length; phase = 'title'; scheduleTickFn(PAUSE_START); return; }
      scheduleTickFn(SPEED_DEL);
    }
  }

  /* ── Pause au survol ── */
  if (heroLeft) {
    heroLeft.addEventListener('mouseenter', () => {
      paused = true;
      if (pendingTimer) clearTimeout(pendingTimer);
      showFull();
    });
    heroLeft.addEventListener('mouseleave', () => {
      paused = false;
      scheduleTickFn(PAUSE_START);
    });
  }

  /* ── Language change listener ── */
  window.addEventListener('langchange', () => { resetTypewriter(); });

  renderTitle(0);
  renderSub(0);
  setTimeout(tick, 800);
})();

/* ══════════════════════════════════════
   HERO CAROUSEL — Auto-rotate + manual
══════════════════════════════════════ */
(function() {
  const slides    = document.querySelectorAll('#heroCarousel .slide');
  const dots      = document.querySelectorAll('.hero-dot');
  const INTERVAL  = 4500;
  let current     = 0;
  let autoTimer   = null;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { showSlide(current + 1); }

  function resetAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(next, INTERVAL);
  }

  /* expose global handlers for inline onclick */
  window.heroChangeSlide = function(delta) {
    showSlide(current + delta);
    resetAuto();
  };

  window.heroGoTo = function(n) {
    showSlide(n);
    resetAuto();
  };

  resetAuto();
})();
