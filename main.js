/* ═══════════════════════════════════════════════
   Harsh Vimal Portfolio — Main JavaScript
   Premium micro-interactions & animations
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initScrollReveal();
  initNavigation();
  initResumeModal();
  initSmoothScroll();
});

/* ── Typewriter Effect ── */
function initTypewriter() {
  const el = document.getElementById('type-text');
  if (!el) return;

  const roles = [
    'Computer Science Student',
    'Frontend Developer',
    'Problem Solver',
    'AI Enthusiast',
    'Future Software Engineer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function tick() {
    const current = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      el.textContent = current.substring(0, charIdx);
    } else {
      charIdx++;
      el.textContent = current.substring(0, charIdx);
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }

    setTimeout(tick, speed);
  }

  setTimeout(tick, 800);
}

/* ── Scroll Reveal (IntersectionObserver) ── */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stagger children
          const children = entry.target.querySelectorAll('.glass-card, .edu-item');
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.1}s`;
            child.classList.add('visible');
          });
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* ── Navigation: scrolled state + active link ── */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const toggle = document.getElementById('nav-toggle');
  const linksContainer = document.getElementById('nav-links');

  // Scroll class
  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlight
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop;
      if (window.scrollY >= top - 160) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Mobile toggle
  if (toggle && linksContainer) {
    toggle.addEventListener('click', () => {
      linksContainer.classList.toggle('open');
      toggle.classList.toggle('open');
    });

    // Close on link click (mobile)
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        linksContainer.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }
}

/* ── Resume Modal ── */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtn = document.getElementById('view-resume-btn');
  const closeBtn = document.getElementById('modal-close');

  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ── Smooth Scroll for anchor links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 72; // navbar height
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}
