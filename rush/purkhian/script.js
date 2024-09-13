document.getElementById("hamburgerIcon").addEventListener("click", function () {
  const navbarList = document.getElementById("navbarList");
  if (navbarList.style.display === "none" || navbarList.style.display === "") {
    navbarList.style.display = "flex";
  } else {
    navbarList.style.display = "none";
  }
});

window.addEventListener("resize", function () {
  const navbarList = document.getElementById("navbarList");
  if (window.innerWidth > 600) {
    navbarList.style.display = "flex";
  } else {
    navbarList.style.display = "none";
  }
});
