document.addEventListener("DOMContentLoaded", () => {
  let lastScrollY = window.scrollY;
  const nav = document.querySelector(".main-nav");

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      nav.classList.add("nav-hidden");
    } else {
      nav.classList.remove("nav-hidden");
    }

    lastScrollY = currentScrollY;
  });
});