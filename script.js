/* ============================================================
   WALENTRA SOLUTIONS — Main JavaScript
   Premium Digital Agency Website
   ============================================================ */

'use strict';

// ── Utility: Select Elements ────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ============================================================
   LOADING SCREEN
   ============================================================ */
window.addEventListener('load', () => {
  const loader = $('#loader');
  if (!loader) return;
  // Hide after animation completes (~1.8s bar fill + 300ms delay)
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2000);
});

// Prevent scroll during load
document.body.style.overflow = 'hidden';

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
const scrollProgress = $('#scroll-progress');

function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop    = window.scrollY || document.documentElement.scrollTop;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${Math.min(progress, 100)}%`;
}

/* ============================================================
   NAVBAR BEHAVIOR
   ============================================================ */
const navbar      = $('#navbar');
const menuBtn     = $('#nav-menu-btn');
const mobileNav   = $('#nav-mobile');

function updateNavbar() {
  if (!navbar) return;
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Hamburger toggle
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav on link click
  $$('.nav-link, .btn', mobileNav).forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ── Active nav link on scroll ─────────────────────────────── */
const sections   = $$('section[id]');
const navLinks   = $$('.nav-links .nav-link');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

/* ============================================================
   SCROLL TO TOP BUTTON
   ============================================================ */
const scrollTopBtn = $('#scroll-top');

function updateScrollTopBtn() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================================ */
const animatedEls = $$('.fade-up, .fade-left, .fade-right, .scale-in');

const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve for performance
        animObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

animatedEls.forEach(el => animObserver.observe(el));

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
const statNums = $$('.stat-num[data-count]');

function animateCounter(el) {
  const target  = parseInt(el.getAttribute('data-count'), 10);
  const suffix  = el.getAttribute('data-suffix') || '';
  const duration = 2000; // ms
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statsSection = $('#stats');
let countersStarted = false;

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        statNums.forEach(el => animateCounter(el));
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

if (statsSection) statsObserver.observe(statsSection);

/* ============================================================
   SERVICES FILTER
   ============================================================ */
const filterBtns    = $$('.services-filter .filter-btn');
const serviceCards  = $$('#services-grid .service-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    // Update active state
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    // Filter cards
    serviceCards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      const show = filter === 'all' || categories.includes(filter);

      if (show) {
        card.style.display = '';
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = '';
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (!categories.includes(filter) && filter !== 'all') {
            card.style.display = 'none';
          }
        }, 300);
      }
    });
  });
});

/* ============================================================
   PORTFOLIO FILTER
   ============================================================ */
const portfolioBtns  = $$('.services-filter [data-portfolio]');
const portfolioCards = $$('#portfolio-grid .portfolio-card');

portfolioBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-portfolio');

    portfolioBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    portfolioCards.forEach(card => {
      const tag  = card.getAttribute('data-ptag') || '';
      const show = filter === 'all' || tag === filter;

      card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

      if (show) {
        card.style.display = '';
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = '';
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          if (tag !== filter && filter !== 'all') card.style.display = 'none';
        }, 350);
      }
    });
  });
});

/* ============================================================
   TESTIMONIALS CAROUSEL
   ============================================================ */
const track      = $('#testimonials-track');
const prevBtn    = $('#carousel-prev');
const nextBtn    = $('#carousel-next');
const dotsWrap   = $('#carousel-dots');
const cards      = $$('.testimonial-card', track || document);

let currentSlide    = 0;
let cardsPerView    = 3;
let autoplayTimer   = null;
let totalSlides     = 0;

function getCardsPerView() {
  if (window.innerWidth < 640)  return 1;
  if (window.innerWidth < 900)  return 2;
  return 3;
}

function buildDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className  = `carousel-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  }
}

function updateDots() {
  const dots = $$('.carousel-dot', dotsWrap || document);
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
    dot.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
  });
}

function goToSlide(index) {
  if (!track) return;
  currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
  const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 0; // card width + gap
  track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  updateDots();
}

function initCarousel() {
  if (!track || cards.length === 0) return;
  cardsPerView = getCardsPerView();
  totalSlides  = Math.max(1, cards.length - cardsPerView + 1);
  buildDots();
  goToSlide(0);
  startAutoplay();
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    const next = (currentSlide + 1) >= totalSlides ? 0 : currentSlide + 1;
    goToSlide(next);
  }, 5000);
}

function stopAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer);
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    stopAutoplay();
    goToSlide(currentSlide - 1 < 0 ? totalSlides - 1 : currentSlide - 1);
    startAutoplay();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    stopAutoplay();
    goToSlide((currentSlide + 1) >= totalSlides ? 0 : currentSlide + 1);
    startAutoplay();
  });
}

// Pause on hover
if (track) {
  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);
}

// Touch / swipe support
let touchStartX = 0;
let touchEndX   = 0;

if (track) {
  track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      stopAutoplay();
      if (diff > 0) {
        goToSlide((currentSlide + 1) >= totalSlides ? 0 : currentSlide + 1);
      } else {
        goToSlide(currentSlide - 1 < 0 ? totalSlides - 1 : currentSlide - 1);
      }
      startAutoplay();
    }
  });
}

// Re-init on resize (debounced)
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initCarousel, 200);
});

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
const faqItems = $$('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer   = item.querySelector('.faq-answer');

  if (!question || !answer) return;

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    faqItems.forEach(other => {
      other.classList.remove('open');
      const q = other.querySelector('.faq-question');
      if (q) q.setAttribute('aria-expanded', 'false');
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
    }
  });

  // Keyboard: Space / Enter
  question.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      question.click();
    }
  });
});

/* ============================================================
   CONTACT FORM
   ============================================================ */
const contactForm  = $('#contact-form');
const formSuccess  = $('#form-success');
const submitBtn    = $('#form-submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const inputs = $$('[required]', contactForm);
    let valid    = true;

    inputs.forEach(input => {
      const val = input.value.trim();
      if (!val || (input.type === 'email' && !isValidEmail(val))) {
        valid = false;
        showFieldError(input);
      } else {
        clearFieldError(input);
      }
    });

    if (!valid) return;

    // Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span>Sending...</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin" aria-hidden="true">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round"/>
        </svg>`;
    }

    // Simulate async submission (replace with real fetch in production)
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Show success
    contactForm.style.display    = 'none';
    if (formSuccess) formSuccess.classList.add('show');
  });

  // Real-time validation on blur
  $$('[required]', contactForm).forEach(input => {
    input.addEventListener('blur', () => {
      const val = input.value.trim();
      if (!val || (input.type === 'email' && !isValidEmail(val))) {
        showFieldError(input);
      } else {
        clearFieldError(input);
      }
    });
    input.addEventListener('input', () => clearFieldError(input));
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(input) {
  input.style.borderColor  = '#EF4444';
  input.style.boxShadow    = '0 0 0 3px rgba(239, 68, 68, 0.1)';
}

function clearFieldError(input) {
  input.style.borderColor  = '';
  input.style.boxShadow    = '';
}

/* ============================================================
   NEWSLETTER SUBSCRIPTION
   ============================================================ */
const nlInput = $('#footer-nl-input');
const nlBtn   = $('#footer-nl-btn');

if (nlBtn && nlInput) {
  nlBtn.addEventListener('click', () => {
    const email = nlInput.value.trim();
    if (!email || !isValidEmail(email)) {
      nlInput.style.borderColor = 'rgba(236,72,153,0.8)';
      nlInput.focus();
      return;
    }
    nlBtn.textContent  = '✓ Subscribed!';
    nlBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    nlInput.value      = '';
    nlInput.style.borderColor = '';
    nlInput.disabled   = true;
    nlBtn.disabled     = true;
  });

  nlInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') nlBtn.click();
  });
}

/* ============================================================
   PARALLAX EFFECT (Hero blobs)
   ============================================================ */
const blob1 = $('.hero-blob-1');
const blob2 = $('.hero-blob-2');
const blob3 = $('.hero-blob-3');

let ticking = false;

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      updateScrollProgress();
      updateNavbar();
      updateActiveNav();
      updateScrollTopBtn();

      // Parallax blobs
      if (blob1) blob1.style.transform = `translate(${sy * 0.03}px, ${sy * 0.04}px) scale(1)`;
      if (blob2) blob2.style.transform = `translate(${sy * -0.02}px, ${sy * 0.03}px) scale(1)`;
      if (blob3) blob3.style.transform = `translate(${sy * 0.015}px, ${sy * -0.025}px) scale(1)`;

      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ============================================================
   SMOOTH ANCHOR SCROLL
   ============================================================ */
$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = link.getAttribute('href');
    if (target === '#' || target === '#!') return;
    const el = $(target);
    if (el) {
      e.preventDefault();
      const navH   = navbar ? navbar.offsetHeight : 0;
      const top    = el.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   PROCESS STEP — HOVER ACTIVE
   ============================================================ */
const processSteps = $$('.process-step');

processSteps.forEach(step => {
  step.addEventListener('mouseenter', () => {
    processSteps.forEach(s => s.classList.remove('active'));
    step.classList.add('active');
  });
});

/* ============================================================
   SPIN ANIMATION (for loading button)
   ============================================================ */
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .spin { animation: spin 0.8s linear infinite; }
`;
document.head.appendChild(style);

/* ============================================================
   TRUSTED LOGO HOVER PAUSE — already in CSS via :hover
   ============================================================ */

/* ============================================================
   KEYBOARD NAVIGATION ENHANCEMENT
   ============================================================ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    // Close mobile nav
    if (mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    // Close all FAQs
    faqItems.forEach(item => {
      item.classList.remove('open');
      const q = item.querySelector('.faq-question');
      if (q) q.setAttribute('aria-expanded', 'false');
    });
  }
});

/* ============================================================
   INIT
   ============================================================ */
function init() {
  updateNavbar();
  updateScrollProgress();
  updateScrollTopBtn();
  initCarousel();

  // Trigger animations for elements in viewport on load
  setTimeout(() => {
    animatedEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  }, 100);
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
