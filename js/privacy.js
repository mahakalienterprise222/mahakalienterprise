/* ============================================
   PRIVACY PAGE JS — privacy.js
   Sticky TOC active link highlighting
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const tocLinks  = document.querySelectorAll('.toc-link');
  const sections  = document.querySelectorAll('.policy-section[id]');

  if (!tocLinks.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, {
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(s => observer.observe(s));
});
