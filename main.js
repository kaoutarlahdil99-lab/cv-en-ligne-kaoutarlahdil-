// Custom cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function animFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animFollower);
})();

document.querySelectorAll('a, button, .clickable, .astat, .skill-item, .exp-card, .contact-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '18px'; cursor.style.height = '18px';
    follower.style.width = '54px'; follower.style.height = '54px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px'; cursor.style.height = '10px';
    follower.style.width = '36px'; follower.style.height = '36px';
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .reveal-child');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// Modal open
document.querySelectorAll('.clickable').forEach(el => {
  el.addEventListener('click', () => {
    const id = el.dataset.modal;
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      modal.querySelectorAll('.viz-bar-fill, .viz-tool-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }, 120);
  });
});

// Modal close
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    closeModal(btn.closest('.modal-overlay'));
  });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
});

function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  modal.querySelectorAll('.viz-bar-fill, .viz-tool-fill').forEach(bar => bar.style.width = '0');
}

// Hero title animate on load
document.querySelectorAll('.title-line').forEach((line, i) => {
  line.style.opacity = '0';
  line.style.transform = 'translateY(40px)';
  line.style.transition = `opacity 0.8s ease ${0.2 + i * 0.15}s, transform 0.8s ease ${0.2 + i * 0.15}s`;
  setTimeout(() => {
    line.style.opacity = '1';
    line.style.transform = 'translateY(0)';
  }, 100);
});
