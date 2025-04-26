const menuToggle = document.querySelector(".menu-toggle");
const navContainer = document.querySelector(".nav-links-container");
const closeBtn = document.querySelector(".close-btn");

menuToggle.addEventListener("click", () => {
  navContainer.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  navContainer.classList.remove("open");
});
