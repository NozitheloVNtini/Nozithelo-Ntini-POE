// js/script.js
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".nav-toggle");

  if (!nav || !toggle) return; // Safety check

  // Sticky navigation
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      nav.classList.remove("open");
      nav.classList.add("nav-hidden");
    } else {
      nav.classList.remove("nav-hidden");
    }
    lastScrollY = currentScrollY;
  });

  // Hamburger menu toggle
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
});




// Contact form user interface, validation and success message

//gallery lighbox
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");

  if (lightbox) {
    document.querySelectorAll(".gallery-img").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("show");
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("show");
    });
  }
});

  // Event Type Search
  const eventTypeInput = document.getElementById("event-type");
  const searchBtn = document.getElementById("search-btn");
  const recommendationDiv = document.getElementById("recommendation");

  if (eventTypeInput && searchBtn && recommendationDiv) {
    searchBtn.addEventListener("click", () => {
      const eventType = eventTypeInput.value.toLowerCase().trim();
      let recommendation = "";

      // Define service recommendations
      if (["wedding", "birthday", "corporate", "conference"].includes(eventType)) {
        recommendation = `
          <h3>Recommended Service:</h3>
          <p>Event Catering</p>
          <p>Perfect for weddings, celebrations and large gatherings.</p>
        `;
      } else if (["anniversary", "romantic dinner", "date night"].includes(eventType)) {
        recommendation = `
          <h3>Recommended Service:</h3>
          <p>Private Chef Experience</p>
          <p>Ideal for intimate dining experiences and special occasions.</p>
        `;
      } else if (["vegan", "vegetarian", "gluten free"].includes(eventType)) {
        recommendation = `
          <h3>Recommended Service:</h3>
          <p>Custom Menu Service</p>
          <p>Menus can be tailored to suit specific dietary requirements.</p>
        `;
      } else {
        recommendation = `
          <p>Please contact Chef Nozy for a customised recommendation.</p>
        `;
      }

      recommendationDiv.innerHTML = recommendation;
    });

    // Allow Enter key to trigger search
    eventTypeInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchBtn.click();
      }
    });
  };

// calculate estimate guest costs
document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.getElementById("calc-btn");
  const guestInput = document.getElementById("guest-input");
  const costOutput = document.getElementById("cost-output");
  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      const guests = parseInt(guestInput.value) || 0;
      const cost = guests * 350;
      costOutput.textContent = `Estimated Cost: R ${cost.toLocaleString()}`;
    });
  }
});

