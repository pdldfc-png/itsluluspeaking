// === SCROLL REVEAL — staggered, smooth ===
const revealEls = document.querySelectorAll('.work-row, .exp-card, .about-lead, .about-col');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = `opacity 0.55s cubic-bezier(0.25, 0.1, 0.25, 1) ${i * 0.04}s, transform 0.55s cubic-bezier(0.25, 0.1, 0.25, 1) ${i * 0.04}s`;
  observer.observe(el);
});

// === NAV SCROLL STATE ===
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.pageYOffset;

  // Subtle nav shadow on scroll
  if (y > 20) {
    nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
  } else {
    nav.style.boxShadow = 'none';
  }

  lastScroll = y;
}, { passive: true });

// === HERO PARALLAX ===
const hero = document.querySelector('.hero h1');
const heroLead = document.querySelector('.hero-lead');

window.addEventListener('scroll', () => {
  const y = window.pageYOffset;
  if (hero && y < 800) {
    hero.style.transform = `translateY(${y * 0.03}px)`;
    hero.style.opacity = Math.max(0.4, 1 - y / 600);
  }
  if (heroLead && y < 600) {
    heroLead.style.transform = `translateY(${y * 0.05}px)`;
    heroLead.style.opacity = Math.max(0, 1 - y / 400);
  }
}, { passive: true });

// === WORK ROW CLICK FEEDBACK ===
document.querySelectorAll('.work-row').forEach(row => {
  row.addEventListener('mousedown', function() {
    this.style.transform = 'scale(0.985)';
  });
  row.addEventListener('mouseup', function() {
    this.style.transform = '';
  });
  row.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// === EXPERTISE CARD HOVER FEEDBACK ===
document.querySelectorAll('.exp-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    const icon = this.querySelector('.exp-icon');
    if (icon) icon.style.opacity = '1';
  });
  card.addEventListener('mouseleave', function() {
    const icon = this.querySelector('.exp-icon');
    if (icon) icon.style.opacity = '0.6';
  });
});
