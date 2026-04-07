/* ─────────────────────────────────────────
   MOBILE NAV DRAWER
───────────────────────────────────────── */
(function() {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('navDrawer');

  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    drawer.classList.toggle('open');
  });

  window.closeDrawer = function() {
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
  };
})();

/* ─────────────────────────────────────────
   NAV LINKS — injection "Rejoindre" au scroll
───────────────────────────────────────── */
(function() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  const SCROLL_THRESHOLD = 80;
  let ctaInjected = false;

  function injectCta() {
    if (ctaInjected) return;
    const cta = document.createElement('a');
    cta.href = '#waitlist';
    cta.className = 'nav-cta';
    const lang = localStorage.getItem('pm-lang') || 'fr';
    cta.textContent = lang === 'en' ? 'Join' : 'Rejoindre';
    cta.setAttribute('data-fr', 'Rejoindre');
    cta.setAttribute('data-en', 'Join');
    navLinks.appendChild(cta);
    ctaInjected = true;
  }

  function removeCta() {
    if (!ctaInjected) return;
    const cta = navLinks.querySelector('.nav-cta');
    if (cta) cta.remove();
    ctaInjected = false;
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      injectCta();
    } else {
      removeCta();
    }
  }, { passive: true });

  window.addEventListener('langchange', (e) => {
    const injectedCta = navLinks.querySelector('.nav-cta');
    if (injectedCta) {
      injectedCta.textContent = e.detail.lang === 'en' ? 'Join' : 'Rejoindre';
    }
  });
})();