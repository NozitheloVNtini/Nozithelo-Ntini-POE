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