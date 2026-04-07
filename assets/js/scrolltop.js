/* ─────────────────────────────────────────
   SCROLL-TO-TOP + JOIN BUTTON SYNC
   Both buttons appear when hero .btn-join
   scrolls out of view
───────────────────────────────────────── */
(function() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  const joinFixed = document.querySelector('.btn-join-fixed');
  const heroJoin  = document.querySelector('.btn-join');

  if (!scrollBtn || !heroJoin) return;

  function onScroll() {
    const rect = heroJoin.getBoundingClientRect();
    const heroGone = rect.bottom < 0;
    scrollBtn.classList.toggle('visible', heroGone);
    if (joinFixed) joinFixed.classList.toggle('visible', heroGone);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
