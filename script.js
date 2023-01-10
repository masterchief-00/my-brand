const downArrow = document.getElementById("down-arrow");
const rightArrow = document.getElementById("right-arrow");
const btnViewWork = document.getElementsByClassName("btn-view-work");
const toTop = document.getElementsByClassName("back-to-top");
const modal = document.getElementById("modal");
const loginSection = document.getElementById("login-section");
const signupSection = document.getElementById("signup-section");
const openMenu = document.getElementsByClassName("open-menu");
const closeMenu = document.getElementsByClassName("close-menu");
const horizontalMenu = document.getElementsByClassName("horizontal-menu");
let horizontalMenuActive = false;

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
      !horizontalMenuActive
        ? document
            .querySelector(".links a[href*=" + sectionId + "]")
            .classList.add("active")
        : document
            .querySelector(".horizontal-menu a[href*=" + sectionId + "]")
            .classList.add("active");
    } else {
      !horizontalMenuActive
        ? document
            .querySelector(".links a[href*=" + sectionId + "]")
            .classList.remove("active")
        : document
            .querySelector(".horizontal-menu a[href*=" + sectionId + "]")
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

function toggleMenu(e) {
  e.preventDefault();
  if (openMenu[0].style.display !== "none") {
    openMenu[0].style.display = "none";
    closeMenu[0].style.display = "flex";
    horizontalMenu[0].style.height = "330px";
    horizontalMenuActive = true;
  } else {
    openMenu[0].style.display = "flex";
    closeMenu[0].style.display = "none";
    horizontalMenu[0].style.height = 0;
    horizontalMenuActive = false;
  }
}

/**-------------------------------- ANIMATION ------------------------------------ */

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (
        entry.target.className === "page-title-about" ||
        entry.target.className === "page-title-projects" ||
        entry.target.className === "page-title-contact" ||
        entry.target.className === "page-title-blogs"
      ) {
        entry.target.classList.add("page-title-animation");
      }

      if (
        entry.target.className === "line-about" ||
        entry.target.className === "line-projects" ||
        entry.target.className === "line-blogs" ||
        entry.target.className === "line-contact"
      ) {
        entry.target.classList.add("line-animation");
      }

      if (
        entry.target.className === "pentagon-1" ||
        entry.target.className === "pentagon-2" ||
        entry.target.className === "pentagon-3" ||
        entry.target.className === "pentagon-4"
      ) {
        entry.target.classList.add("pentagon-animation");
      }

      if (
        entry.target.className === "talk-1" ||
        entry.target.className === "talk-2" ||
        entry.target.className === "talk-2" ||
        entry.target.className === "talk-3" ||
        entry.target.className === "talk-4"
      ) {
        entry.target.classList.add("talk-animation");
      }

      if (entry.target.className === "fella") {
        entry.target.classList.add("fella-animation");
      }

      if (entry.target.className === "skills") {
        entry.target.classList.add("skills-animation");
      }

      if (entry.target.classList[0] === "bar") {
        entry.target.classList.add("skill-1-animation");
      }

      if (
        entry.target.className === "project-1" ||
        entry.target.className === "project-2" ||
        entry.target.className === "project-3" ||
        entry.target.className === "project-4" ||
        entry.target.className === "project-5" ||
        entry.target.className === "project-6"
      ) {
        entry.target.classList.add("project-animation");
      }
    }
  });
});

observer.observe(document.querySelector(".page-title-about"));
observer.observe(document.querySelector(".line-about"));

observer.observe(document.querySelector(".page-title-projects"));
observer.observe(document.querySelector(".line-projects"));

observer.observe(document.querySelector(".page-title-blogs"));
observer.observe(document.querySelector(".line-blogs"));

observer.observe(document.querySelector(".page-title-contact"));
observer.observe(document.querySelector(".line-contact"));

observer.observe(document.querySelector(".pentagon-1"));
observer.observe(document.querySelector(".pentagon-2"));
observer.observe(document.querySelector(".pentagon-3"));
observer.observe(document.querySelector(".pentagon-4"));

observer.observe(document.querySelector(".talk-1"));
observer.observe(document.querySelector(".talk-2"));
observer.observe(document.querySelector(".talk-3"));
observer.observe(document.querySelector(".talk-4"));

observer.observe(document.querySelector(".fella"));
observer.observe(document.querySelector(".skills"));

observer.observe(document.querySelector(".w-1"));
observer.observe(document.querySelector(".w-2"));
observer.observe(document.querySelector(".w-3"));
observer.observe(document.querySelector(".w-4"));
observer.observe(document.querySelector(".w-5"));
observer.observe(document.querySelector(".w-6"));
observer.observe(document.querySelector(".w-7"));
observer.observe(document.querySelector(".w-8"));

observer.observe(document.querySelector(".project-1"));
observer.observe(document.querySelector(".project-2"));
observer.observe(document.querySelector(".project-3"));
observer.observe(document.querySelector(".project-4"));
observer.observe(document.querySelector(".project-5"));
observer.observe(document.querySelector(".project-6"));
