// sticky navigation tab when scrolling up
document.addEventListener("DOMContentLoaded", () => {
  let lastScrollY = window.scrollY;
  const nav = document.querySelector(".main-nav");

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      nav.classList.remove("open"); // close hamburger menu
      nav.classList.add("nav-hidden");
    } else {
      nav.classList.remove("nav-hidden");
    }

    lastScrollY = currentScrollY;
  });
});

// hamburger menu on mobile screen
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".nav-toggle");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
});