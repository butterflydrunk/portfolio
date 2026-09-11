/* ═══════════════════════════════════════════
   PREMIUM UI EFFECTS (PASTEL NIGHT AESTHETIC)
   Portfolio: Mekan Mammedov
═══════════════════════════════════════════ */

/* ── Scroll progress bar ── */
const scrollBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  if (!scrollBar) return;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
}, { passive: true });

/* ── Welcome back toast (return visitors) ── */
(function welcomeBack() {
  const toast = document.getElementById('welcomeToast');
  if (!toast) return;
  const key = 'mekan_portfolio_visits';
  const visits = parseInt(localStorage.getItem(key) || '0', 10) + 1;
  localStorage.setItem(key, String(visits));

  if (visits > 1) {
    const msgs = [
      'Welcome back to the Command Center ✨',
      'System status: All high-load & RAG nodes operational 🚀',
      'Good to see you again! Explore recent architecture cases ✨',
    ];
    toast.textContent = msgs[(visits - 2) % msgs.length];
    setTimeout(() => toast.classList.add('show'), 2000);
    setTimeout(() => toast.classList.remove('show'), 6500);
  }
})();

/* ── 3D tilt on cards (Hero Terminal & About Photo) ── */
function applyTilt(elId) {
  const card = document.getElementById(elId);
  if (!card || window.matchMedia('(max-width:900px)').matches || ('ontouchstart' in window) || navigator.maxTouchPoints > 0) return;

  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02,1.02,1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale3d(1,1,1)';
  });
  card.style.transition = 'transform .35s cubic-bezier(.03,.98,.52,.99)';
}
applyTilt('tiltCard');
applyTilt('aboutPhotoCard');

/* ── Magnetic buttons ── */
document.querySelectorAll('.magnetic').forEach((btn) => {
  if (window.matchMedia('(max-width:900px)').matches || ('ontouchstart' in window) || navigator.maxTouchPoints > 0) return;
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ── Card shine on hover ── */
document.querySelectorAll('.project-card, .about-card, .skill-cat, .exp-card, .glass-card, .hero-panel, .about-photo-frame').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  });
});

/* ── Parallax orbs follow scroll ── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    orb.style.transform = `translateY(${y * (0.04 + i * 0.02)}px)`;
  });
}, { passive: true });

/* ── Typing cursor in terminal ── */
const termBlink = document.querySelector('.t-blink');
if (termBlink) {
  setInterval(() => {
    termBlink.style.opacity = termBlink.style.opacity === '0' ? '1' : '0';
  }, 530);
}

/* ── FROST / PASTEL NIGHT PARTICLE CANVAS ── */
(function initParticleCanvas() {
  const canvas = document.getElementById('frost-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Pastel Night Color Palette
  const palette = [
    { r: 184, g: 154, b: 202 }, // Lilac
    { r: 212, g: 160, b: 170 }, // Rose
    { r: 142, g: 184, b: 200 }, // Ice Mint
    { r: 236, g: 232, b: 244 }, // White/Silver
  ];

  let W = 0, H = 0, frame = 0;
  const flakes = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkFlake() {
    const roll = Math.random();
    const type = roll < 0.5 ? 'petal' : roll < 0.85 ? 'crystal' : 'speck';
    const col = palette[Math.floor(Math.random() * palette.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      type,
      col,
      size: type === 'speck' ? Math.random() * 1.5 + 0.8
        : type === 'petal' ? Math.random() * 4.5 + 3.5
        : Math.random() * 5.5 + 4.5,
      vx: (Math.random() - 0.5) * 0.45,
      vy: Math.random() * 0.55 + 0.35,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.02,
      alpha: Math.random() * 0.45 + 0.25,
    };
  }

  function init() {
    resize();
    const count = reduced ? 18 : Math.min(65, Math.floor(W / 24));
    flakes.length = 0;
    for (let i = 0; i < count; i++) flakes.push(mkFlake());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      f.y += f.vy;
      f.x += f.vx + Math.sin(frame * 0.015 + i) * 0.2;
      f.rot += f.vRot;

      if (f.y > H + 20) { f.y = -15; f.x = Math.random() * W; }
      if (f.x < -20) f.x = W + 15;
      if (f.x > W + 20) f.x = -15;

      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rot);
      ctx.fillStyle = `rgba(${f.col.r},${f.col.g},${f.col.b},${f.alpha})`;

      if (f.type === 'speck') {
        ctx.beginPath();
        ctx.arc(0, 0, f.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (f.type === 'petal') {
        ctx.beginPath();
        ctx.ellipse(0, 0, f.size * 1.2, f.size * 0.65, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        const s = f.size;
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.3, -s * 0.3);
        ctx.lineTo(s, 0);
        ctx.lineTo(s * 0.3, s * 0.3);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.3, s * 0.3);
        ctx.lineTo(-s, 0);
        ctx.lineTo(-s * 0.3, -s * 0.3);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  init();
  requestAnimationFrame(draw);
})();
