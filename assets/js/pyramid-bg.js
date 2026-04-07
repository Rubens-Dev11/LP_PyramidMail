/* ─────────────────────────────────────────
   SHARED PYRAMID CANVAS FACTORY
   Call makePyramidBg(canvasId, sectionEl)
───────────────────────────────────────── */
function makePyramidBg(canvasId, section) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const SIZE = 140;
  const COLS = 8;
  const ROWS = 7;
  const GAP  = 16;

  let W, H, t = 0;
  const cells = [];

  function buildCells() {
    cells.length = 0;
    const cellW = SIZE * 2 + GAP;
    const cellH = SIZE * 2 + GAP;
    const offsetX = (W - COLS * cellW) / 2 + SIZE;
    const offsetY = (H - ROWS * cellH * 0.72) / 2 + SIZE;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cx = offsetX + c * cellW + (r % 2 === 1 ? cellW / 2 : 0);
        const cy = offsetY + r * cellH * 0.72;
        cells.push({
          cx, cy,
          phase:    Math.random() * Math.PI * 2,
          speed:    0.25 + Math.random() * 0.45,
          baseAlpha: 0.03 + Math.random() * 0.07,
          pulseAmp:  0.03 + Math.random() * 0.055,
          size:     SIZE * (0.7 + Math.random() * 0.45),
        });
      }
    }
  }

  function resize() {
    W = canvas.width  = section.offsetWidth;
    H = canvas.height = section.offsetHeight;
    buildCells();
  }

  function drawDiamond(cx, cy, s, alpha, strokeAlpha) {
    ctx.beginPath();
    ctx.moveTo(cx,     cy - s);
    ctx.lineTo(cx + s, cy    );
    ctx.lineTo(cx,     cy + s);
    ctx.lineTo(cx - s, cy    );
    ctx.closePath();

    const grad = ctx.createRadialGradient(cx, cy - s * 0.3, 0, cx, cy, s);
    grad.addColorStop(0,   `rgba(154,206,232,${alpha * 0.55})`);
    grad.addColorStop(0.5, `rgba(0,135,202,${alpha * 0.28})`);
    grad.addColorStop(1,   `rgba(0,135,202,0)`);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = `rgba(0,135,202,${strokeAlpha})`;
    ctx.lineWidth = 1.1;
    ctx.stroke();

    /* top-right face highlight */
    ctx.beginPath();
    ctx.moveTo(cx, cy - s);
    ctx.lineTo(cx + s, cy);
    ctx.strokeStyle = `rgba(154,206,232,${strokeAlpha * 0.75})`;
    ctx.lineWidth = 0.55;
    ctx.stroke();

    /* top-left face */
    ctx.beginPath();
    ctx.moveTo(cx, cy - s);
    ctx.lineTo(cx - s, cy);
    ctx.strokeStyle = `rgba(154,206,232,${strokeAlpha * 0.35})`;
    ctx.lineWidth = 0.55;
    ctx.stroke();
  }

  let raf;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    t += 0.007;
    cells.forEach(cell => {
      const wave    = Math.sin(t * cell.speed + cell.phase);
      const alpha   = cell.baseAlpha + wave * cell.pulseAmp;
      const strokeA = alpha * 2.4;
      const s       = cell.size * (1 + wave * 0.04);
      drawDiamond(cell.cx, cell.cy, s, Math.max(0, alpha), Math.max(0.015, strokeA));
    });
    raf = requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  animate();
}

/* ─────────────────────────────────────────
   INIT ALL CANVASES (except video section)
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  makePyramidBg('heroPyramidCanvas',  document.querySelector('.hero-section'));
  makePyramidBg('waitlistCanvas',     document.querySelector('.waitlist-section'));
  makePyramidBg('advantageCanvas',    document.querySelector('.advantages-section'));
  makePyramidBg('featuresCanvas',     document.querySelector('.features-section'));
  makePyramidBg('faqPyramidCanvas',   document.querySelector('.faq-section'));
});
