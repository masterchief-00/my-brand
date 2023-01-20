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
const loginLinkDiv = document.getElementById("login-link");
const blogsContainer = document.getElementById("blogsContainer");

const single_blog_title = document.querySelector(".blog-main-title");
const single_blog_owner = document.querySelector(".blog-owner");
const single_blog_image = document.getElementById("single-blog-image");
const single_blog_body = document.querySelector(".blog-main-content");
const single_blog_date = document.querySelector(".blog-publish-date");

let horizontalMenuActive = false;
let auth_status = false;
let currentUser = {
  name: "",
  email: "",
};

const errorBags = document.getElementsByClassName("error-bag");

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    if (params.id) {
      loadSingleBlog(params.id);
    }
    loadBlogs();
  },
  false
);

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

/**------------------------------------------------------------------------------------------------- */

function validateLoginForm(e) {
  e.preventDefault();
  let errors_detected = 0;

  for (let element of errorBags) {
    element.style.display = "none";
  }

  if (!checkEmail(document.loginForm.email)) {
    for (let element of errorBags) {
      if (element.id === "email-login") {
        element.textContent = "Invalid email format!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.loginForm.email.value === "") {
    for (let element of errorBags) {
      if (element.id === "email-login") {
        element.textContent = "The Email field can't be left blank!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.loginForm.password.value.length < 8) {
    for (let element of errorBags) {
      if (element.id === "pwd-login") {
        element.textContent = "The Password can't be less than 8 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.loginForm.password.value === "") {
    for (let element of errorBags) {
      if (element.id === "pwd-login") {
        element.textContent = "The Password field can't be left blank!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (errors_detected > 0) {
    return false;
  } else {
    if (
      authenticateUser(
        document.loginForm.email.value,
        document.loginForm.password.value
      )
    ) {
      auth_status = true;
    } else {
      auth_status = false;
    }
    return true;
  }
}

function validateSignupForm(e) {
  e.preventDefault();
  let errors_detected = 0;

  for (let element of errorBags) {
    element.style.display = "none";
  }

  if (document.signupForm.name.value.length < 3) {
    for (let element of errorBags) {
      if (element.id === "name-signup") {
        element.textContent = "The name field can't be less than 3 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (!checkName(document.signupForm.name)) {
    for (let element of errorBags) {
      if (element.id === "name-signup") {
        element.textContent = "That's not a valid name!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }
  if (document.signupForm.name.value === "") {
    for (let element of errorBags) {
      if (element.id === "name-signup") {
        element.textContent = "The name field can't be left blank!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (!checkEmail(document.signupForm.email)) {
    for (let element of errorBags) {
      if (element.id === "email-signup") {
        element.textContent = "Invalid email format!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.signupForm.email.value === "") {
    for (let element of errorBags) {
      if (element.id === "email-signup") {
        element.textContent = "The Email field can't be left blank!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.signupForm.password.value.length < 8) {
    for (let element of errorBags) {
      if (element.id === "pwd-signup") {
        element.textContent = "The Password can't be less than 8 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.signupForm.password.value === "") {
    for (let element of errorBags) {
      if (element.id === "pwd-signup") {
        element.textContent = "The Password field can't be left blank!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (
    document.signupForm.confirm_password.value !==
    document.signupForm.password.value
  ) {
    for (let element of errorBags) {
      if (element.id === "confpwd") {
        element.textContent = "You need to confirm the password!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (errors_detected > 0) {
    return false;
  } else {
    console.log("all good");
    saveUser();
    return true;
  }
}

function validateContactForm(e) {
  e.preventDefault();
  let errors_detected = 0;

  for (let element of errorBags) {
    element.style.display = "none";
  }

  if (!checkName(document.contactForm.name)) {
    for (let element of errorBags) {
      if (element.id === "name") {
        element.textContent = "That's not a valid name!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.contactForm.name.value === "") {
    for (let element of errorBags) {
      if (element.id === "name") {
        element.textContent = "The name field can't be left blank!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (!checkEmail(document.contactForm.email)) {
    for (let element of errorBags) {
      if (element.id === "email") {
        element.textContent = "Invalid email format!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.contactForm.email.value === "") {
    for (let element of errorBags) {
      if (element.id === "email") {
        element.textContent = "The Email field can't be left blank!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (!checkText(document.contactForm.message)) {
    for (let element of errorBags) {
      if (element.id === "message") {
        element.textContent = "The message is invalid!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (
    document.contactForm.message.value === "" ||
    document.contactForm.message.value.length < 5
  ) {
    for (let element of errorBags) {
      if (element.id === "message") {
        element.textContent =
          "The message field can't be less than 5 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (errors_detected > 0) {
    return false;
  } else {
    sendMessage();
    return true;
  }
}

function validateBlogComment(e) {
  e.preventDefault();
  let errors_detected = 0;

  for (let element of errorBags) {
    element.style.display = "none";
  }

  if (!checkText(document.commentForm.comment)) {
    for (let element of errorBags) {
      if (element.id === "comment") {
        element.textContent = "Invalid comment!";
        element.style.display = "flex";
      }
    }

    errors_detected++;
  }

  if (document.commentForm.comment.value === "") {
    for (let element of errorBags) {
      if (element.id === "comment") {
        element.textContent =
          "The comment field can't be less than 5 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (errors_detected > 0) {
    return false;
  } else {
    console.log("all good");
    return true;
  }
}

function validateReplyForm(e) {
  e.preventDefault();
  let errors_detected = 0;

  for (let element of errorBags) {
    element.style.display = "none";
  }

  if (!checkText(document.replyForm.reply)) {
    for (let element of errorBags) {
      if (element.id === "reply") {
        element.textContent = "Invalid reply!";
        element.style.display = "flex";
      }
    }

    errors_detected++;
  }

  if (document.replyForm.reply.value === "") {
    for (let element of errorBags) {
      if (element.id === "reply") {
        element.textContent =
          "The reply field can't be less than 5 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (errors_detected > 0) {
    return false;
  } else {
    console.log("all good");
    return true;
  }
}

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(input.value.trim());
}

function checkName(input) {
  const re = /^[A-Za-z ]+$/;

  return re.test(input.value.trim());
}

function checkText(input) {
  const re = /^[A-Za-z 0-9]+$/;

  return re.test(input.value.trim());
}
function clearSignupForm() {
  document.signupForm.name.value = "";
  document.signupForm.email.value = "";
  document.signupForm.password.value = "";
  document.signupForm.confirm_password.value = "";
}
/**---------------------------------LOCALSTORAGE---------------------------------- */

function saveUser() {
  let newUser = {
    name: document.signupForm.name.value,
    email: document.signupForm.email.value,
    password: document.signupForm.password.value,
  };

  if (localStorage.getItem("users") === null) {
    let all_users = [];
    all_users.push(newUser);

    localStorage.setItem("users", JSON.stringify(all_users));

    clearSignupForm();
  } else {
    let all_users = [...JSON.parse(localStorage["users"])];
    all_users.push(newUser);

    localStorage.setItem("users", JSON.stringify(all_users));

    clearSignupForm();
  }
}

function authenticateUser(email, password) {
  let all_users = [...JSON.parse(localStorage["users"])];
  for (const user of all_users) {
    if (user.email === email && user.password === password) {
      console.log("LOGGED IN!");
      currentUser.name = user.name;
      currentUser.email = user.email;

      localStorage.setItem("current_user", JSON.stringify(currentUser));

      loginLinkDiv.innerHTML = `
        <label>Hello, ${currentUser.name}</label>
      `;
      return true;
    }
  }

  return false;
}

function loadBlogs() {
  let all_blogs = [...JSON.parse(localStorage["blogs"])];
  blogsContainer.innerHTML = "";

  for (const blog of all_blogs) {
    blogsContainer.innerHTML += `
    <div class="blog">
    <img src="data:image/jpg;base64,${blog.image}" alt="blog" />
    <label class="blog-title">${blog.title}</label>
    <div class="blog-tiny-details">
      <label class="blog-date">${blog.date}</label>
      <div class="blog-reactions">
        <label><i class="fa-solid fa-comments"></i> 21</label>
        <label><i class="fa-solid fa-thumbs-up"></i> 234</label>
      </div>
    </div>
    <div class="blue-line"></div>
    <p>
      ${blog.body.substring(0, 135)}...\n
    </p>
    <a href="blogDetails.html?id=${blog.id}" class="blog-full">READ MORE</a>
  </div>
    `;
  }
}

function loadSingleBlog(id) {
  let all_blogs = [...JSON.parse(localStorage["blogs"])];

  for (const blog of all_blogs) {
    if (blog.id === id.trim()) {
      single_blog_title.innerHTML = blog.title;
      single_blog_image.src = `data:image/jpg;base64,${blog.image}`;
      single_blog_owner.innerHTML = blog.author;
      single_blog_body.innerHTML = blog.body;
      single_blog_date.innerHTML = `PUBLISHED ON ${blog.date}`;
    }
  }
}

function cleanContactForm() {
  document.contactForm.name.value = "";
  document.contactForm.email.value = "";
  document.contactForm.message.value = "";
}
function sendMessage() {
  let message = {
    id: Date.now(),
    name: document.contactForm.name.value,
    email: document.contactForm.email.value,
    body: document.contactForm.message.value,
    date: new Date().toLocaleString("en-GB", { timeZone: "UTC" }),
    status: "UNREAD",
  };

  if (localStorage.getItem("messages") === null) {
    let all_messages = [];
    all_messages.push(message);

    localStorage.setItem("messages", JSON.stringify(all_messages));

    cleanContactForm();
  } else {
    let all_messages = [...JSON.parse(localStorage["messages"])];
    all_messages.push(message);

    localStorage.setItem("messages", JSON.stringify(all_messages));

    cleanContactForm();
  }
}
