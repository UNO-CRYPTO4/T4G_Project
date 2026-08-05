// ============ MOBILE NAV TOGGLE ============
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });
}

// ============ STICKY HEADER SHADOW ============
const header = document.getElementById('siteHeader');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 18px rgba(44, 17, 9, 0.18)';
    } else {
      header.style.boxShadow = '0 2px 12px rgba(44, 17, 9, 0.08)';
    }
  });
}

// ============ SEARCH FORM (home hero) ============
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('searchPanel');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const destination = document.getElementById('destination')?.value.trim() || '';
    const travelers = document.getElementById('travelers')?.value || '';
    const checkin = document.getElementById('checkin')?.value || '';
    const checkout = document.getElementById('checkout')?.value || '';

    if (!destination) {
      alert('Please enter a destination.');
      return;
    }
    if (checkin && checkout && checkout < checkin) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    const params = new URLSearchParams({ destination, travelers, checkin, checkout });

    // Works whether the form lives at the site root (index.html) or inside /pages/
    const inPagesFolder = window.location.pathname.includes('/pages/');
    const resultsUrl = inPagesFolder ? 'results.html' : 'pages/results.html';

    window.location.href = `${resultsUrl}?${params.toString()}`;
  });
});

// ============ SCROLL REVEAL ANIMATION ============
const revealTargets = document.querySelectorAll('.dest-card, .pkg-card, .badge, .dest-card-full, .pillar, .stat-item, .auth-why-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ============ DESTINATION PAGE SEARCH ============
const destSearchPanel = document.getElementById('destSearchPanel');
if (destSearchPanel) {
  destSearchPanel.addEventListener('submit', (e) => {
    e.preventDefault();
    const showcase = document.getElementById('destShowcase');
    if (showcase) showcase.scrollIntoView({ behavior: 'smooth' });
  });
}

// ============ TOURS PAGE SEARCH ============
const toursSearchBtn = document.getElementById('toursSearchBtn');
if (toursSearchBtn) {
  toursSearchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const grid = document.getElementById('toursGrid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  });
}

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = document.getElementById('contactName');
    const name = nameEl ? nameEl.value.trim() : '';
    alert(`Thanks${name ? ', ' + name : ''}! Your message has been sent — our travel experts will get back to you shortly.`);
    contactForm.reset();
  });
}

// ============ LOGIN FORM ============
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login submitted (demo only — connect this to your backend).');
  });
}

// ============ SIGNUP FORM ============
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const agreeEl = document.getElementById('agreeTerms');
    if (agreeEl && !agreeEl.checked) {
      alert('Please agree to the Terms & Conditions and Privacy Policy to continue.');
      return;
    }
    alert('Account created (demo only — connect this to your backend).');
  });
}

// ============ PASSWORD SHOW/HIDE TOGGLE ============
document.querySelectorAll('.toggle-pass').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const input = toggle.closest('.auth-input').querySelector('input');
    if (!input) return;
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    toggle.classList.toggle('fa-eye', showing);
    toggle.classList.toggle('fa-eye-slash', !showing);
  });
});