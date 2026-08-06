// ============ MOBILE NAV TOGGLE ============
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof Node && !mainNav.contains(target) && !navToggle.contains(target)) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
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

// ============ PACKAGE BOOK NOW BUTTONS ============
function getPackageDetails(button) {
  const card = button.closest('article');
  if (!card) return null;
  const name = card.querySelector('.pkg-info h3')?.textContent.trim() || 'Travel Package';
  const nights = card.querySelector('.pkg-nights')?.textContent.trim() || '';
  const priceText = card.querySelector('.pkg-price strong')?.textContent.trim() || '';
  const price = priceText.startsWith('$') ? priceText : priceText ? `$${priceText}` : '';
  return { name, nights, price };
}

function redirectToCheckout(name, price, nights) {
  const inPagesFolder = window.location.pathname.includes('/pages/');
  const checkoutUrl = inPagesFolder ? 'checkout.html' : 'pages/checkout.html';
  const queryString = `?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&nights=${encodeURIComponent(nights)}`;
  window.location.href = `${checkoutUrl}${queryString}`;
}

document.querySelectorAll('.book-btn, .book-btn1').forEach(button => {
  button.addEventListener('click', () => {
    const pkg = getPackageDetails(button);
    if (!pkg) return;
    redirectToCheckout(pkg.name, pkg.price, pkg.nights);
  });
});

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


/* ==========================================
   UNO TOURS PREMIUM REVIEWS JAVASCRIPT
========================================== */


/* ===============================
   SCROLL REVEAL ANIMATION
================================ */


const revealElements = document.querySelectorAll(
    ".review-card, .tour-stats, .reviews-cta"
);


const reviewRevealObserver = new IntersectionObserver(
    (entries, observer)=>{


        entries.forEach(entry=>{


            if(entry.isIntersecting){


                entry.target.classList.add("show");


                observer.unobserve(entry.target);


            }


        });


    },
    {
        threshold:0.2
    }
);



revealElements.forEach(element=>{


    element.classList.add("hidden");


    reviewRevealObserver.observe(element);


});






/* ===============================
   STATISTICS COUNTER ANIMATION
================================ */



const counters = document.querySelectorAll(
    ".stat-item h3"
);


let counterStarted = false;



const counterObserver = new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting && !counterStarted){


counterStarted = true;



counters.forEach(counter=>{


    let target = counter.innerText;


    let number = parseInt(
        target.replace(/\D/g,"")
    );


    let suffix = target.replace(
        /[0-9]/g,
        ""
    );



    let count = 0;



    let speed = number / 80;



    let updateCounter = ()=>{


        if(count < number){


            count += speed;


            counter.innerText =
            Math.ceil(count) + suffix;



            setTimeout(
                updateCounter,
                25
            );


        }

        else{


            counter.innerText =
            number + suffix;


        }


    };



    updateCounter();



});



}



});

},
{
    threshold:0.5
});




const statsSection =
document.querySelector(".tour-stats");



if(statsSection){

counterObserver.observe(statsSection);

}







/* ===============================
   CARD 3D HOVER EFFECT
================================ */


const cards =
document.querySelectorAll(".review-card");



cards.forEach(card=>{


card.addEventListener(
"mousemove",
(e)=>{


let rect =
card.getBoundingClientRect();



let x =
e.clientX - rect.left;



let y =
e.clientY - rect.top;



let centerX =
rect.width / 2;



let centerY =
rect.height / 2;



let rotateX =
(y-centerY) / 20;



let rotateY =
(centerX-x) / 20;



card.style.transform =
`
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)
`;



});





card.addEventListener(
"mouseleave",
()=>{


card.style.transform =
"translateY(0)";


});


});








/* ===============================
   BUTTON RIPPLE EFFECT
================================ */



const button =
document.querySelector(".cta-button");



if(button){


button.addEventListener(
"click",
function(e){


let ripple =
document.createElement("span");



ripple.classList.add(
"ripple"
);



this.appendChild(ripple);



setTimeout(()=>{


ripple.remove();


},600);



});


}