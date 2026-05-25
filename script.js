// === GENERATE ASCII BACKGROUND ===
(function generateAsciiBg() {
  const bg = document.querySelector('.ascii-bg');
  if (!bg) return;

  const chars = ['·', '˚', '✧', '｡', '  ', '✦', '  ', '  ', '  ', '｡', '·', '⋆', '  ', '  ', '  ', '  ',
                 '  ', '  ', '  ', '  ', '☆', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '];
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

  window.addEventListener('resize', () => {
    const newCols = Math.ceil(window.innerWidth / 16);
    const newRows = Math.ceil(window.innerHeight / 25);
    const newLines = [];
    for (let y = 0; y < newRows; y++) {
      let line = '';
      for (let x = 0; x < newCols; x++) {
        line += chars[Math.floor(Math.random() * chars.length)];
      }
      newLines.push(line);
    }
    bg.textContent = newLines.join('\n');
  });
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
      if (entry.target.classList.contains('section-title')) {
        entry.target.classList.add('revealed');
      }
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.work-item, .about-intro, .about-details, .contact-block, .section-title').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// === PARALLAX HERO ===
const heroName = document.querySelector('.hero-name');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      if (heroName) {
        heroName.style.transform = `translateY(${scrolled * 0.04}px)`;
        heroName.style.opacity = Math.max(0, 1 - scrolled / 800);
      }
      ticking = false;
    });
    ticking = true;
  }
});

// === WORK ITEM HOVER — glow intensifies ===
document.querySelectorAll('.work-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    if (glow) {
      glow.style.width = '400px';
      glow.style.height = '400px';
      glow.style.background = 'radial-gradient(circle, rgba(232,58,71,0.12) 0%, transparent 70%)';
    }
  });
  item.addEventListener('mouseleave', function() {
    if (glow) {
      glow.style.width = '300px';
      glow.style.height = '300px';
      glow.style.background = 'radial-gradient(circle, rgba(232,58,71,0.06) 0%, transparent 70%)';
    }
  });
});
