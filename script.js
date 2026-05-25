// === ASCII BACKGROUND ===
(function generateAsciiBg() {
  const bg = document.querySelector('.ascii-bg');
  if (!bg) return;

  const chars = ['·', '˚', '✧', '｡', '  ', '✦', '  ', '  ', '  ', '｡', '·', '⋆', '  ', '  ', '  ', '  ',
                 '  ', '  ', '  ', '  ', '☆', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '];
  function render() {
    const cols = Math.ceil(window.innerWidth / 16);
    const rows = Math.ceil(window.innerHeight / 25);
    const lines = [];
    for (let y = 0; y < rows; y++) {
      let line = '';
      for (let x = 0; x < cols; x++) {
        line += chars[Math.floor(Math.random() * chars.length)];
      }
      lines.push(line);
    }
    bg.textContent = lines.join('\n');
  }
  render();
  window.addEventListener('resize', render);
})();

// === CURSOR GLOW ===
const glow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (glow) glow.classList.add('active');
});
document.addEventListener('mouseleave', () => {
  if (glow) glow.classList.remove('active');
});

function animateGlow() {
  currentX += (mouseX - currentX) * 0.08;
  currentY += (mouseY - currentY) * 0.08;
  if (glow) {
    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';
  }
  requestAnimationFrame(animateGlow);
}
animateGlow();

// === SCROLL REVEAL ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.work-card, .exp-card, .about-lead, .about-desc, .about-stats, .contact-block').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// === LOGO PARALLAX ON SCROLL ===
const logoSvg = document.querySelector('.logo-svg');
let logoScrolling = false;

window.addEventListener('scroll', () => {
  if (!logoScrolling) {
    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      if (logoSvg) {
        logoSvg.style.transform = `translateY(${scrolled * 0.03}px)`;
        logoSvg.style.opacity = Math.max(0.3, 1 - scrolled / 900);
      }
      logoScrolling = false;
    });
    logoScrolling = true;
  }
});

// === WORK CARD HOVER GLOW ===
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    if (glow) {
      glow.style.width = '400px';
      glow.style.height = '400px';
      glow.style.background = 'radial-gradient(circle, rgba(59,95,224,0.08) 0%, transparent 70%)';
    }
  });
  card.addEventListener('mouseleave', () => {
    if (glow) {
      glow.style.width = '300px';
      glow.style.height = '300px';
      glow.style.background = 'radial-gradient(circle, rgba(232,58,71,0.05) 0%, transparent 70%)';
    }
  });
});
