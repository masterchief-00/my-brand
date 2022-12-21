const downArrow = document.getElementById("down-arrow");
const rightArrow = document.getElementById("right-arrow");
const btnViewWork = document.getElementsByClassName("btn-view-work");
const toTop = document.getElementsByClassName("back-to-top");
const modal = document.getElementById("modal");
const loginSection = document.getElementById("login-section");
const signupSection = document.getElementById("signup-section");

// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

btnViewWork[0].addEventListener("mouseover", function () {
  rightArrow.style.transform = "rotate(90deg)";
});

btnViewWork[0].addEventListener("mouseout", function () {
  rightArrow.style.transform = "rotate(0deg)";
});

toTop[0].addEventListener("click", function () {
  window.location = "#landing-page";
});

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  // Get current scroll position
  let scrollY = window.pageYOffset;

  // Now we loop through sections to get height, top and ID values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");

    /*
      - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
      - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
      */
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".links a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".links a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}

function toggleModal() {
  if (modal.style.display === "flex") {
    modal.style.display = "none";
    loginSection.style.display = "none";
    signupSection.style.display = "none";
  } else {
    modal.style.display = "flex";
    loginSection.style.display = "flex";
  }
}

function toggleSection() {
  if (loginSection.style.display === "flex") {
    loginSection.style.display = "none";
    signupSection.style.display = "flex";
  } else {
    loginSection.style.display = "flex";
    signupSection.style.display = "none";
  }
}
