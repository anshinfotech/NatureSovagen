const navbarToggler = () => {
  const menuBtn = document.getElementById("menuBtn");
  const navList = document.querySelector(".nav-list");

  menuBtn.addEventListener("click", function () {
    if (navList.classList.contains("active-navbar")) {
      navList.classList.remove("active-navbar");
    } else {
      navList.classList.add("active-navbar");
    }
  });
};

document.addEventListener("DOMContentLoaded", navbarToggler);
