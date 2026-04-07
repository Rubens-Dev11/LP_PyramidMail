/* ─────────────────────────────────────────
   ADVANTAGES CAROUSEL
───────────────────────────────────────── */
(function() {
  const DURATION = 4000;
  let cur = 0;
  let timer;
  const track = document.getElementById('advSlideTrack');
  const items = document.querySelectorAll('.feature-item');
  const dots  = document.querySelectorAll('.adv-dot');
  const count = items.length;

  function advGoTo(idx) {
    items[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = (idx + count) % count;
    items[cur].classList.add('active');
    dots[cur].classList.add('active');
    const slideHeight = track.querySelector('.adv-slide').offsetHeight;
    track.style.transform = `translateY(-${cur * slideHeight}px)`;
    items.forEach(el => {
      const bar = el.querySelector('.adv-progress');
      bar.style.animation = 'none';
      el.offsetHeight;
      bar.style.animation = '';
    });
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => advGoTo(cur + 1), DURATION);
  }

  items.forEach((el, i) => el.addEventListener('click', () => { advGoTo(i); startTimer(); }));
  dots.forEach((dot, i) => dot.addEventListener('click', () => { advGoTo(i); startTimer(); }));

  advGoTo(0);
  startTimer();
})();
