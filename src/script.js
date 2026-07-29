// ============ MOBILE NAV TOGGLE ============
// (unchanged logic — header/nav is identical on every page, so this
// still just works. Only added a null-guard in case a page ever
// loads this file without the header markup.)
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
const searchPanel = document.getElementById('searchPanel');

if (searchPanel) {
  searchPanel.addEventListener('submit', (e) => {
    e.preventDefault();

    const destinationEl = document.getElementById('destination');
    const travelersEl = document.getElementById('travelers');
    const checkinEl = document.getElementById('checkin');
    const checkoutEl = document.getElementById('checkout');

    const destination = destinationEl ? destinationEl.value.trim() : '';
    const travelers = travelersEl ? travelersEl.value.trim() : '';
    const checkin = checkinEl ? checkinEl.value.trim() : '';
    const checkout = checkoutEl ? checkoutEl.value.trim() : '';

    if (!destination) {
      if (destinationEl) {
        destinationEl.focus();
        destinationEl.placeholder = 'Please enter a destination';
      }
      return;
    }

    console.log('Search submitted:', { destination, travelers, checkin, checkout });

    // Scroll to packages as a stand-in "results" section (home page only)
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ============ BOOK NOW BUTTONS ============
document.querySelectorAll('.book-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.pkg-card');
    const heading = card ? card.querySelector('h3') : null;
    const packageName = heading ? heading.textContent : 'this package';
    alert(`Thanks for your interest in "${packageName}"! Our team will reach out to help you book this trip.`);
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


/* =====================================================================
   EVERYTHING BELOW THIS LINE IS NEW — added for the interior pages.
   Nothing above this line has been changed.
   ===================================================================== */

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

// ============ PASSWORD SHOW/HIDE TOGGLE (login + signup) ============
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