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
      if (["wedding", "birthday", "corporate", "conference", "buffet", "catering"].includes(eventType)) {
        recommendation = `
          <h3>Recommended Service:</h3>
          <p>Event Catering</p>
          <p>Perfect for weddings, celebrations and large gatherings.</p>
        `;
      } else if (["anniversary", "dinner", "date night", "date"].includes(eventType)) {
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

      // Toggle the has-results class based on whether there's content
  if (recommendation && recommendation.trim() !== "<p>Please select a valid event type to get recommendations.</p>") {
    recommendationDiv.classList.add("has-results");
  } else {
    recommendationDiv.classList.remove("has-results");
  }

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

// Contact and enquiry form user interface, validation and success message


// General Contact Form Validation
const form = document.getElementById("general-contact");

const fullname = document.getElementById("general-fullname");
const email = document.getElementById("general-email");
const phone = document.getElementById("general-phone");
const notes = document.getElementById("general-notes");

// helper: clear old errors
function clearErrors() {
    document.querySelectorAll(".error").forEach(el => el.remove());

    [fullname, email, phone, notes].forEach(input => {
        input.style.border = "";
    });
}

// helper: show error under input
function showError(input, message) {
    const error = document.createElement("small");
    error.classList.add("error");
    error.style.color = "red";
    error.textContent = message;

    input.style.border = "2px solid red";
    input.parentNode.appendChild(error);
}

// validation rules
function validateForm() {
    let isValid = true;

    clearErrors();

    // FULL NAME
    const nameValue = fullname.value.trim();
    const nameRegex = /^[A-Za-z\s'-]+$/;

    if (nameValue.length === 0) {
        showError(fullname, "Full name is required.");
        isValid = false;
    } else if (nameValue.length < 2) {
        showError(fullname, "Full name must be at least 2 characters.");
        isValid = false;
    } else if (!nameRegex.test(nameValue)) {
        showError(fullname, "Only letters, spaces, apostrophes and hyphens allowed.");
        isValid = false;
    }

    // EMAIL
    const emailValue = email.value.trim();

    if (emailValue.length === 0) {
        showError(email, "Email address is required.");
        isValid = false;
    } else if (!emailValue.includes("@") || emailValue.includes("..")) {
        showError(email, "Please enter a valid email address.");
        isValid = false;
    }

    // PHONE
    const phoneValue = phone.value.trim();
    const phoneRegex = /^0\d{9}$/;

    if (phoneValue.length === 0) {
        showError(phone, "Contact number is required.");
        isValid = false;
    } else if (!phoneRegex.test(phoneValue)) {
        showError(phone, "Must start with 0 and be exactly 10 digits.");
        isValid = false;
    }

    // MESSAGE (optional but validated if filled)
    const notesValue = notes.value.trim();

    if (notesValue.length > 0 && notesValue.length < 10) {
        showError(notes, "Message must be at least 10 characters.");
        isValid = false;
    } else if (notesValue.length > 500) {
        showError(notes, "Message cannot exceed 500 characters.");
        isValid = false;
    }

    return isValid;
}

// submit handler
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
        alert("Form submitted successfully!");
        form.reset();
        clearErrors();
    }
});

//catering form
const cateringForm = document.querySelector("#catering-form form");

const cName = document.getElementById("catering-name");
const cEmail = document.getElementById("catering-email");
const cPhone = document.getElementById("catering-phone");
const cDate = document.getElementById("catering-eventdate");
const cGuests = document.getElementById("catering-guests");
const cService = document.getElementById("catering-service");
const cNotes = document.getElementById("catering-notes");

function clearErrors() {
    document.querySelectorAll(".error").forEach(el => el.remove());

    [cName, cEmail, cPhone, cDate, cGuests, cService, cNotes].forEach(input => {
        if (input) input.style.border = "";
    });
}

function showError(input, message) {
    const error = document.createElement("small");
    error.classList.add("error");
    error.style.color = "red";
    error.textContent = message;

    input.style.border = "2px solid red";
    input.parentNode.appendChild(error);
}


//validation
function validateCateringForm() {
    let isValid = true;

    clearErrors();

    // NAME
    const nameValue = cName.value.trim();
    const nameRegex = /^[A-Za-z\s'-]+$/;

    if (nameValue.length === 0) {
        showError(cName, "Full name is required.");
        isValid = false;
    } else if (!nameRegex.test(nameValue)) {
        showError(cName, "Only letters, spaces, apostrophes and hyphens allowed.");
        isValid = false;
    }

    // EMAIL
    const emailValue = cEmail.value.trim();

    if (emailValue.length === 0) {
        showError(cEmail, "Email is required.");
        isValid = false;
    } else if (!emailValue.includes("@") || emailValue.includes("..")) {
        showError(cEmail, "Enter a valid email address.");
        isValid = false;
    }

    // PHONE
    const phoneValue = cPhone.value.trim();
    const phoneRegex = /^0\d{9}$/;

    if (phoneValue.length === 0) {
        showError(cPhone, "Contact number is required.");
        isValid = false;
    } else if (!phoneRegex.test(phoneValue)) {
        showError(cPhone, "Must start with 0 and be exactly 10 digits.");
        isValid = false;
    }

    // EVENT DATE (FIXED RELIABLY)
    if (!cDate.value) {
        showError(cDate, "Event date is required.");
        isValid = false;
    } else {
        const selectedDate = new Date(cDate.value + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            showError(cDate, "Event date cannot be in the past.");
            isValid = false;
        }
    }

    // GUESTS
    if (cGuests.value === "" || cGuests.value < 1) {
        showError(cGuests, "Number of guests must be at least 1.");
        isValid = false;
    }

    // SERVICE
    if (cService.value === "") {
        showError(cService, "Please select a service type.");
        isValid = false;
    }

    // NOTES (optional rule)
    const notesValue = cNotes.value.trim();

    if (notesValue.length > 0 && notesValue.length < 10) {
        showError(cNotes, "Notes must be at least 10 characters.");
        isValid = false;
    }

    return isValid;
}


// submit handler
if (cateringForm) {
    cateringForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (validateCateringForm()) {
            clearErrors();

            alert("Catering request submitted successfully!");

            cateringForm.reset();
        }
    });
} else {
    console.error("Catering form not found. Check your HTML ID.");
}


//debug

console.log("Catering form script loaded");