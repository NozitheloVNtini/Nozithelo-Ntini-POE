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

//gallery lightbox
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

// General Contact Form Validation
const generalForm = document.getElementById("general-contact");

if (generalForm) {
    const fullname = document.getElementById("general-fullname");
    const email = document.getElementById("general-email");
    const phone = document.getElementById("general-phone");
    const notes = document.getElementById("general-notes");

    function clearErrors() {
        document.querySelectorAll(".error").forEach(el => el.remove());
        [fullname, email, phone, notes].forEach(input => {
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

    function validateForm() {
        let isValid = true;
        clearErrors();

        const nameValue = fullname.value.trim();
        const emailValue = email.value.trim();
        const phoneValue = phone.value.trim();
        const notesValue = notes.value.trim();

        const nameRegex = /^[A-Za-z\s'-]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
        const phoneRegex = /^0\d{9}$/;

        if (!nameValue) {
            showError(fullname, "Full name is required.");
            isValid = false;
        } else if (!nameRegex.test(nameValue)) {
            showError(fullname, "Invalid name format.");
            isValid = false;
        }

        if (!emailValue) {
            showError(email, "Email is required.");
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            showError(email, "Invalid email format. Ensure it includes a valid domain like .com or .co.za");
            isValid = false;
}

          if (!phoneValue) {
              showError(phone, "Phone number is required.");
              isValid = false;
          } 
          else if (!phoneRegex.test(phoneValue)) {
              showError(phone, "Must start with 0 and be exactly 10 digits.");
              isValid = false;
          }

        if (notesValue.length > 0 && notesValue.length < 10) {
            showError(notes, "Message too short.");
            isValid = false;
        }

        return isValid;
    }

    generalForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const data = {
            general_name: fullname.value,
            general_email: email.value,
            general_phone: phone.value,
            general_notes: notes.value
        };

        emailjs.send("service_chefnozy", "template_q6g8fjw", data)
            .then(() => {
                alert("Message sent successfully!");
                generalForm.reset();
                clearErrors();
            })
            .catch(err => {
                console.error(err);
                alert("Failed to send message.");
            });
    });
}


// Catering Enquiry Form Validation
const cateringForm = document.querySelector("#catering-form form");

if (cateringForm) {

    const cName = document.getElementById("catering-name");
    const cEmail = document.getElementById("catering-email");
    const cPhone = document.getElementById("catering-phone");
    const cDate = document.getElementById("catering-eventdate");
    const cGuests = document.getElementById("catering-guests");
    const cService = document.getElementById("catering-service");
    const cNotes = document.getElementById("catering-notes");

    function clearErrors() {
        document.querySelectorAll(".error").forEach(el => el.remove());
        [cName, cEmail, cPhone, cDate, cGuests, cService, cNotes]
            .forEach(i => i && (i.style.border = ""));
    }

    function showError(input, message) {
        const error = document.createElement("small");
        error.classList.add("error");
        error.style.color = "red";
        error.textContent = message;

        input.style.border = "2px solid red";
        input.parentNode.appendChild(error);
    }

    function validateCatering() {
        let isValid = true;
        clearErrors();

        const nameValue = cName.value.trim();
        const emailValue = cEmail.value.trim();
        const phoneValue = cPhone.value.trim();
        const dateValue = cDate.value;
        const guestsValue = cGuests.value;

        const nameRegex = /^[A-Za-z\s'-]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
        const phoneRegex = /^0\d{9}$/;

        if (!nameValue || !nameRegex.test(nameValue)) {
            showError(cName, "Invalid name.");
            isValid = false;
        }

        if (!emailValue) {
          showError(cEmail, "Email is required.");
          isValid = false;
      } else if (!emailRegex.test(emailValue)) {
          showError(cEmail, "Invalid email format. Ensure it includes a valid domain like .com or .co.za");
          isValid = false;
}

        if (!phoneValue) {
            showError(cPhone, "Phone number is required.");
            isValid = false;
        } 
        else if (!/^0\d{9}$/.test(phoneValue)) {
            showError(cPhone, "Must start with 0 and be exactly 10 digits.");
            isValid = false;
        }

        // Calculate minimum date (3 days from today)
            const minDate = new Date();
            minDate.setDate(minDate.getDate() + 3);

            // Format to YYYY-MM-DD
            const minDateStr = minDate.toISOString().split('T')[0];

            if (!dateValue) {
                showError(cDate, "Select date.");
                isValid = false;
            } else if (dateValue < minDateStr) {
                showError(cDate, "Bookings must be at least 3 days from today.");
                isValid = false;
}
        if (guestsValue < 1) {
            showError(cGuests, "At least 1 guest.");
            isValid = false;
        }

        if (!cService.value) {
            showError(cService, "Select service.");
            isValid = false;
        }

        return isValid;
    }

    cateringForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateCatering()) return;

        const data = {
            catering_name: cName.value,
            catering_email: cEmail.value,
            catering_phone: cPhone.value,
            catering_eventdate: cDate.value,
            catering_guests: cGuests.value,
            catering_service: cService.value,
            catering_notes: cNotes.value
        };

        emailjs.send("service_chefnozy", "template_l02ns5i", data)
            .then(() => {
                alert("Catering request sent successfully!");
                cateringForm.reset();
                clearErrors();
            })
            .catch(err => {
                console.error(err);
                alert("Something went wrong.");
            });
    });
}
