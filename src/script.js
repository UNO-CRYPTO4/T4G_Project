// ============ MOBILE NAV TOGGLE ============
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Close mobile nav when a link is clicked
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
  });
});

// ============ STICKY HEADER SHADOW ============
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 4px 18px rgba(44, 17, 9, 0.18)';
  } else {
    header.style.boxShadow = '0 2px 12px rgba(44, 17, 9, 0.08)';
  }
});

// ============ SEARCH FORM ============
const searchPanel = document.getElementById('searchPanel');

searchPanel.addEventListener('submit', (e) => {
  e.preventDefault();

  const destination = document.getElementById('destination').value.trim();
  const travelers = document.getElementById('travelers').value.trim();
  const checkin = document.getElementById('checkin').value.trim();
  const checkout = document.getElementById('checkout').value.trim();

  if (!destination) {
    document.getElementById('destination').focus();
    document.getElementById('destination').placeholder = 'Please enter a destination';
    return;
  }

  console.log('Search submitted:', { destination, travelers, checkin, checkout });

  // Scroll to packages as a stand-in "results" section
  document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
});

// ============ BOOK NOW BUTTONS ============
document.querySelectorAll('.book-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.pkg-card');
    const packageName = card.querySelector('h3').textContent;
    alert(`Thanks for your interest in "${packageName}"! Our team will reach out to help you book this trip.`);
  });
});

// ============ SCROLL REVEAL ANIMATION ============
const revealTargets = document.querySelectorAll('.dest-card, .pkg-card, .badge');

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