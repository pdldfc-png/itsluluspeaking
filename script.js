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

// Smooth follow with requestAnimationFrame
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

// === SCROLL REVEAL WITH STAGGER ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Reveal section title lines
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

// === PARALLAX HERO (rAF for performance) ===
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

// === WORK ITEM HOVER — dynamic glow intensity ===
document.querySelectorAll('.work-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    if (glow) {
      glow.style.width = '400px';
      glow.style.height = '400px';
      glow.style.background = 'radial-gradient(circle, rgba(184,169,201,0.12) 0%, transparent 70%)';
    }
  });
  item.addEventListener('mouseleave', function() {
    if (glow) {
      glow.style.width = '300px';
      glow.style.height = '300px';
      glow.style.background = 'radial-gradient(circle, rgba(184,169,201,0.08) 0%, transparent 70%)';
    }
  });
});
