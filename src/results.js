document.addEventListener("DOMContentLoaded", () => {
  // Home form
  const homeForm = document.getElementById("searchPanel");
  if (homeForm) {
    homeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      redirectToResults({
        destination: document.getElementById("destination")?.value,
        travelers: document.getElementById("travelers")?.value,
        checkin: document.getElementById("checkin")?.value,
        checkout: document.getElementById("checkout")?.value
      });
    });
  }

  // Destination form
  const destForm = document.getElementById("destSearchPanel");
  if (destForm) {
    destForm.addEventListener("submit", (e) => {
      e.preventDefault();
      redirectToResults({
        destination: document.getElementById("destSearch")?.value,
        travelers: document.getElementById("destTravelers")?.value,
        checkin: document.getElementById("destCheckin")?.value,
        checkout: document.getElementById("destCheckout")?.value
      });
    });
  }

  // Tours button (search packages)
  const toursBtn = document.getElementById("toursSearchBtn");
  if (toursBtn) {
    toursBtn.addEventListener("click", () => {
      redirectToResults({
        destination: "All Destinations",
        travelers: "Any",
        checkin: "",
        checkout: ""
      });
    });
  }

  // Results page
  if (window.location.pathname.includes("results.html")) {
    const params = new URLSearchParams(window.location.search);
    const destination = params.get("destination");
    const travelers = params.get("travelers");
    const checkin = params.get("checkin");
    const checkout = params.get("checkout");

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
      <h2>Your Search</h2>
      <p><strong>Destination:</strong> ${destination || "Not provided"}</p>
      <p><strong>Travelers:</strong> ${travelers || "Not provided"}</p>
      <p><strong>Check-in:</strong> ${checkin || "Not provided"}</p>
      <p><strong>Check-out:</strong> ${checkout || "Not provided"}</p>
    `;

    const packages = [
      { name: "Maldives Escape", location: "Maldives", price: "$1690", nights: "4 Nights / 5 Days" },
      { name: "Greece Getaway", location: "Greece", price: "$2500", nights: "5 Nights / 6 Days" },
      { name: "Swiss Adventure", location: "Switzerland", price: "$3880", nights: "6 Nights / 7 Days" },
      { name: "Thailand Discovery", location: "Thailand", price: "$1200", nights: "3 Nights / 4 Days" },
      { name: "Tokyo Drift", location: "Tokyo", price: "$1889", nights: "4 Nights / 5 Days" },
      { name: "Santorini Escape", location: "Santorini", price: "$2000", nights: "5 Nights / 6 Days" },
      { name: "Paris Lights", location: "Paris", price: "$1500", nights: "3 Nights / 4 Days" },
      { name: "Dubai Luxury", location: "Dubai", price: "$1000", nights: "4 Nights / 5 Days" },
      { name: "Cape Town Adventure", location: "Cape Town", price: "$900", nights: "4 Nights / 5 Days" },
      { name: "New York Buzz", location: "New York", price: "$2500", nights: "5 Nights / 6 Days" }
    ];

    const filtered = packages.filter(pkg =>
      destination && pkg.location.toLowerCase().includes(destination.toLowerCase())
    );

    const list = filtered.length > 0 ? filtered : packages;

    resultsDiv.innerHTML += "<h2>Available Packages</h2>";
    list.forEach(pkg => {
      resultsDiv.innerHTML += `
        <div class="pkg-card">
          <h3>${pkg.name}</h3>
          <p>${pkg.nights}</p>
          <p>From <strong>${pkg.price}</strong> per person</p>
          <button class="book-btn" onclick="redirectToCheckout('${pkg.name}','${pkg.price}','${pkg.nights}')">Book Now</button>
        </div>
      `;
    });
  }

  // Checkout page
  if (window.location.pathname.includes("checkout.html")) {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "Selected package";
    const price = params.get("price") || "Contact us for a quote";
    const nights = params.get("nights") || "Tailored itinerary";

    const checkoutDiv = document.getElementById("checkout");
    checkoutDiv.innerHTML = `
      <h2>Booking: ${name}</h2>
      <p><strong>Package:</strong> ${nights}</p>
      <p><strong>Price:</strong> ${price}</p>

      <form id="bookingForm">
        <label>Name: <input type="text" id="custName" required></label><br>
        <label>Email: <input type="email" id="custEmail" required></label><br>
        <label>Phone: <input type="tel" id="custPhone" required></label><br>
        <button type="submit">Confirm Booking</button>
      </form>
      <a href="results.html" class="back-results">← Back to Results</a>
    `;

    document.getElementById("bookingForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const customerName = document.getElementById("custName")?.value.trim() || "traveler";
      const thankYouParams = new URLSearchParams({
        name,
        price,
        nights,
        customer: customerName
      });

      alert(`Booking confirmed for ${customerName}! We’ll send your itinerary details shortly.`);
      window.location.href = `thankyou.html?${thankYouParams.toString()}`;
    });
  }

  // Thank you page
  if (window.location.pathname.includes("thankyou.html")) {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "your selected package";
    const price = params.get("price") || "Contact us for a quote";
    const nights = params.get("nights") || "Tailored itinerary";
    const customer = params.get("customer") || "traveler";

    const thankyouDiv = document.getElementById("thankyou");
    if (thankyouDiv) {
      thankyouDiv.innerHTML = `
        <div class="confirmation-card">
          <p class="confirmation-badge">Booking Confirmed</p>
          <h2>Thank you, ${customer}!</h2>
          <p>Your request for <strong>${name}</strong> has been received.</p>
          <div class="summary-box">
            <p><strong>Package:</strong> ${name}</p>
            <p><strong>Duration:</strong> ${nights}</p>
            <p><strong>Price:</strong> ${price}</p>
          </div>
          <p>We’ll contact you shortly with your itinerary and next steps.</p>
          <a href="../index.html" class="back-home">Return to Home</a>
        </div>
      `;
    }
  }
});

// Helpers
function redirectToResults({ destination, travelers, checkin, checkout }) {
  const inPagesFolder = window.location.pathname.includes('/pages/');
  const resultsUrl = inPagesFolder ? 'results.html' : 'pages/results.html';
  const queryString = `?destination=${encodeURIComponent(destination || "")}&travelers=${encodeURIComponent(travelers || "")}&checkin=${checkin || ""}&checkout=${checkout || ""}`;
  window.location.href = `${resultsUrl}${queryString}`;
}

function redirectToCheckout(name, price, nights) {
  const inPagesFolder = window.location.pathname.includes('/pages/');
  const checkoutUrl = inPagesFolder ? 'checkout.html' : 'pages/checkout.html';
  const queryString = `?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&nights=${encodeURIComponent(nights)}`;
  window.location.href = `${checkoutUrl}${queryString}`;
}


(function () {
  const grid = document.getElementById('toursGrid');
  const emptyState = document.getElementById('toursEmptyState');
  const searchBtn = document.getElementById('toursSearchBtn');
  if (!grid) return;

  const destSelect = document.getElementById('filterDestination');
  const typeSelect = document.getElementById('filterType');
  const durationSelect = document.getElementById('filterDuration');
  const budgetSelect = document.getElementById('filterBudget');

  function applyFilters() {
    const dest = destSelect.value;
    const type = typeSelect.value;
    const duration = durationSelect.value;
    const budget = budgetSelect.value;

    const cards = grid.querySelectorAll('.tour-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const matches =
        (dest === 'all' || card.dataset.destination === dest) &&
        (type === 'all' || card.dataset.type === type) &&
        (duration === 'all' || card.dataset.duration === duration) &&
        (budget === 'all' || card.dataset.budget === budget);

      card.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  [destSelect, typeSelect, durationSelect, budgetSelect].forEach(select => {
    if (select) select.addEventListener('change', applyFilters);
  });

  if (searchBtn) {
    searchBtn.addEventListener('click', applyFilters);
  }
})();

/* ===========================================
        UNO TOURS REVIEW SYSTEM
=========================================== */

const modal = document.getElementById("reviewModal");
const openBtn = document.getElementById("openReviewModal");
const closeBtn = document.getElementById("closeReviewModal");
const form = document.getElementById("reviewForm");
const stars = document.querySelectorAll(".star-rating span");
const ratingInput = document.getElementById("selectedRating");
const previewImage = document.getElementById("previewImage");
const imageInput = document.getElementById("reviewImage");
const postcardGrid = document.querySelector(".postcard-grid");

if (modal && openBtn && closeBtn && form && stars.length > 0 && ratingInput && previewImage && imageInput && postcardGrid) {
  /* ===========================================
              OPEN MODAL
  =========================================== */
  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  /* ===========================================
              CLOSE MODAL
  =========================================== */
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  /* ===========================================
              STAR RATING
  =========================================== */
  stars.forEach(star => {
    star.addEventListener("click", () => {
      const rating = star.dataset.rating;
      ratingInput.value = rating;
      stars.forEach(s => s.classList.remove("active"));
      for (let i = 0; i < rating; i++) {
        stars[i].classList.add("active");
      }
    });
  });

  /* ===========================================
              IMAGE PREVIEW
  =========================================== */
  imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  });

  /* ===========================================
              SUBMIT REVIEW
  =========================================== */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("travelerName").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const title = document.getElementById("reviewTitle").value.trim();
    const review = document.getElementById("reviewText").value.trim();
    const date = document.getElementById("travelDate").value;
    const rating = ratingInput.value;

    if (!rating) {
      alert("Please select a rating.");
      return;
    }

    if (review.length < 40) {
      alert("Please write a longer review.");
      return;
    }

    let starsHTML = "";
    for (let i = 0; i < rating; i++) {
      starsHTML += "★";
    }
    for (let i = rating; i < 5; i++) {
      starsHTML += "☆";
    }

    let image = "";
    if (previewImage.src !== "") {
      image = previewImage.src;
    }

    const card = document.createElement("article");
    card.className = "postcard";
    card.innerHTML = `
        <div class="postcard-photo">
            <div class="img-placeholder img-placeholder--sq">`;
    postcardGrid.appendChild(card);
    closeModal();
    form.reset();
    previewImage.src = "";
    previewImage.style.display = "none";
    alert("Thank you! Your review has been submitted.");
  });
}



if (modal && openBtn && closeBtn && form && stars.length > 0 && ratingInput && previewImage && imageInput && postcardGrid) {

/* ===========================================
            CLOSE MODAL
=========================================== */

function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

}

closeBtn.addEventListener("click", closeModal);



window.addEventListener("click", (e) => {

    if (e.target === modal) {

        closeModal();

    }

});



/* ===========================================
            STAR RATING
=========================================== */

stars.forEach(star => {

    star.addEventListener("click", () => {

        const rating = star.dataset.rating;

        ratingInput.value = rating;

        stars.forEach(s => {

            s.classList.remove("active");

        });

        for (let i = 0; i < rating; i++) {

            stars[i].classList.add("active");

        }

    });

});



/* ===========================================
            IMAGE PREVIEW
=========================================== */

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        previewImage.src = e.target.result;

        previewImage.style.display = "block";

    };

    reader.readAsDataURL(file);

});



/* ===========================================
            SUBMIT REVIEW
=========================================== */

form.addEventListener("submit", function (e) {

    e.preventDefault();



    const name = document.getElementById("travelerName").value.trim();

    const destination = document.getElementById("destination").value.trim();

    const title = document.getElementById("reviewTitle").value.trim();

    const review = document.getElementById("reviewText").value.trim();

    const date = document.getElementById("travelDate").value;

    const rating = ratingInput.value;



    if (!rating) {

        alert("Please select a rating.");

        return;

    }



    if (review.length < 40) {

        alert("Please write a longer review.");

        return;

    }



    let starsHTML = "";

    for (let i = 0; i < rating; i++) {

        starsHTML += "★";

    }

    for (let i = rating; i < 5; i++) {

        starsHTML += "☆";

    }



    let image = "";



    if (previewImage.src !== "") {

        image = previewImage.src;

    }



    const card = document.createElement("article");

    card.className = "postcard";



    card.innerHTML = `

        <div class="postcard-photo">

            <div class="img-placeholder img-placeholder--sq">

                <img src="${image}" alt="${name}">

            </div>

            <span class="seal">

                ${starsHTML}

            </span>

        </div>

        <blockquote>

            <h3 style="margin-bottom:10px;font-family:'Cormorant Garamond';color:#1d3c35;">

                ${title}

            </h3>

            <p>"${review}"</p>

        </blockquote>

        <footer>

            <span class="signature">

                ${name}

            </span>

            <span class="postmark">

                ${destination} · ${date}

            </span>

        </footer>

    `;



    postcardGrid.prepend(card);



    closeModal();



    showSuccess();



    form.reset();



    previewImage.style.display = "none";



    ratingInput.value = "";



    stars.forEach(star => {

        star.classList.remove("active");

    });



    card.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

});



/* ===========================================
        SUCCESS MESSAGE
=========================================== */

function showSuccess() {

    const success = document.createElement("div");



    success.className = "review-success";



    success.innerHTML = `

        <h2>✓</h2>

        <h3>Stamped Into The Guest Ledger</h3>

        <p>

            Thank you for sharing your unforgettable journey.

        </p>

    `;



    document.body.appendChild(success);



    setTimeout(() => {

        success.classList.add("show");

    }, 50);



    setTimeout(() => {

        success.classList.remove("show");



        setTimeout(() => {

            success.remove();

        }, 400);



    }, 3200);

}

/* ===========================================
   TRUST STAMPS ANIMATION
=========================================== */

const stamps = document.querySelectorAll(".stamp");

if (stamps.length) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

            }

        });

    }, {

        threshold: 0.3

    });

    stamps.forEach(stamp => observer.observe(stamp));

}

const counters = document.querySelectorAll(".count");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.dataset.target;
        const current = +counter.innerText;

        const increment = Math.ceil(target / 80);

        if (current < target) {

            counter.innerText = Math.min(current + increment, target);

            requestAnimationFrame(updateCounter);

        }

    };

    updateCounter();

});

if (openBtn && modal) {
    // modal code
}

if (form) {
    // review form code
}

}
