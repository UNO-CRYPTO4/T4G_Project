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
    const name = params.get("name");
    const price = params.get("price");
    const nights = params.get("nights");

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
      window.location.href = "thankyou.html";
    });
  }
});

// Helpers
function redirectToResults({ destination, travelers, checkin, checkout }) {
  const queryString = `?destination=${encodeURIComponent(destination || "")}&travelers=${encodeURIComponent(travelers || "")}&checkin=${checkin || ""}&checkout=${checkout || ""}`;
  window.location.href = "results.html" + queryString;
}

function redirectToCheckout(name, price, nights) {
  const queryString = `?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&nights=${encodeURIComponent(nights)}`;
  window.location.href = "checkout.html" + queryString;
}
