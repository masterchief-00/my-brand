const openMenu = document.getElementsByClassName("open-menu");
const closeMenu = document.getElementsByClassName("close-menu");
const horizontalMenu = document.getElementsByClassName("horizontal-menu");

function toggleMenu(e) {
  e.preventDefault();
  if (openMenu[0].style.display !== "none") {
    openMenu[0].style.display = "none";
    closeMenu[0].style.display = "flex";
    horizontalMenu[0].style.height = "300px";
  } else {
    openMenu[0].style.display = "flex";
    closeMenu[0].style.display = "none";
    horizontalMenu[0].style.height = 0;
  }
}
