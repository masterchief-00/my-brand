// const API_URL = "https://kwizera-api.onrender.com";
const API_URL = "http://localhost:5000";

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
const similarBlogsContainer = document.querySelector(".similar-blogs");

const single_blog_category = document.querySelector(".blog-category");
const single_blog_title = document.querySelector(".blog-main-title");
const single_blog_owner = document.querySelector(".blog-owner");
const single_blog_image = document.getElementById("single-blog-image");
const single_blog_body = document.querySelector(".blog-main-content");
const single_blog_date = document.querySelector(".blog-publish-date");

const commentsContainer = document.querySelector(".all-comments");
const commentsCounter = document.querySelector(".comments-count");
const commentAs = document.getElementById("comment-as");
const likeBtn = document.querySelector(".like-btn");

const projectDetailsTitle = document.getElementsByClassName(
  "title-project-details"
);
const projectDetailsDesc = document.getElementsByClassName(
  "project-details-desc"
);
const projectDetailsTools = document.getElementsByClassName("tools-used");
const projectDetailsGallery =
  document.getElementsByClassName("project-gallery");

let horizontalMenuActive = false;
let auth_status = false;

let current_blog_id = "";
let currentUser = {
  name: "",
  email: "",
  role: "",
};

let projectsContainer = document.getElementById("gallery-3d");

const errorBags = document.getElementsByClassName("error-bag");

const submitContact = document.getElementById("contact-submit");
const submitButtonLogin = document.getElementById("form-button-login");
const submitButtonSignup = document.getElementById("form-button-signup");

const logoutBtn = document.getElementsByClassName("logoutBtn");

const submitComment = document.getElementById("form-button-comment");

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    if (checkCookie("user_details")) {
      let userDetails = JSON.parse(getCookie("user_details"));

      let dashboardBtn = "";
      if (userDetails.role === "admin") {
        dashboardBtn = `<a href="./dashboard/adminPanel.html" class="toDashboard">Dashboard</a>`;
      }

      loginLinkDiv.innerHTML = `
      <label class="greet-user">Hello, ${userDetails.names}</label>
      <a href="#" class="logoutBtn" onclick="logout(event)">Log out</a>
      ${dashboardBtn}
    `;
    }

    if (params.id) {
      current_blog_id = params.id;

      let path = window.location.pathname;
      let page = path.split("/").pop();

      if (
        page === "projectDetails.html" ||
        page === "projectDetails" ||
        page === "projectdetails"
      ) {
        loadSingleProject(params.id);
      }

      if (
        page === "blogDetails.html" ||
        page === "blogDetails" ||
        page === "blogdetails"
      ) {
        loadSingleBlog(current_blog_id);
        loadComments(current_blog_id);
        loadSimilarBlogs(current_blog_id);
      }
    } else {
      loadBlogs();
      loadProjects();
    }
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
    console.log("error");
    return false;
  } else {
    saveComment();
    return true;
  }
}

function validateReplyForm(e, comment_id) {
  e.preventDefault();

  let errors_detected = 0;
  let inputField = document.getElementById(comment_id);

  for (let element of errorBags) {
    element.style.display = "none";
  }

  if (!checkText(inputField)) {
    for (let element of errorBags) {
      if (element.id === "reply-" + comment_id) {
        element.textContent = "Invalid reply!";
        element.style.display = "flex";
      }
    }

    errors_detected++;
  }

  if (inputField.value === "") {
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
    console.log("validation");
    return false;
  } else {
    saveReply(comment_id, inputField);
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
  const re = /^[A-Za-z?.!, 0-9]+$/;

  return re.test(input.value.trim());
}
function clearSignupForm() {
  document.signupForm.name.value = "";
  document.signupForm.email.value = "";
  document.signupForm.password.value = "";
  document.signupForm.confirm_password.value = "";
}
/**---------------------------------LOCALSTORAGE[NOT ANYMORE HAHAHA!]---------------------------------- */

function saveUser() {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  submitButtonSignup.disabled = true;
  submitButtonSignup.style.opacity = 0.3;
  submitButtonSignup.style.cursor = "not-allowed";

  fetch(`${API_URL}/users/signup`, {
    method: "POST",
    mode: "cors",
    headers,
    body: JSON.stringify({
      names: document.signupForm.name.value,
      email: document.signupForm.email.value,
      password: document.signupForm.password.value,
      // conf_password: document.signupForm.confirm_password.value,
    }),
  })
    .then(async (response) => {
      if (response.ok) {
        clearSignupForm();
        submitButtonSignup.disabled = false;
        submitButtonSignup.style.opacity = 1;
        submitButtonSignup.style.cursor = "pointer";
      }
    })
    .catch((err) => {
      console.log(err);
      submitButtonSignup.disabled = false;
      submitButtonSignup.style.opacity = 1;
      submitButtonSignup.style.cursor = "pointer";
    });
}

function authenticateUser(email, password) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  submitButtonLogin.disabled = true;
  submitButtonLogin.style.opacity = 0.3;
  submitButtonLogin.style.cursor = "not-allowed";

  fetch(`${API_URL}/users/login`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(async (response) => {
      if (response.ok) {
        let data = await response.json();

        const userDetails = {
          names: data.user.names,
          email: data.user.email,
          role: data.user.role,
        };
        setCookie("user_details", JSON.stringify(userDetails), 1);

        currentUser.name = data.user.names;
        currentUser.email = data.user.email;
        currentUser.role = data.user.role;

        let dashboardBtn = "";
        if (currentUser.role === "admin") {
          dashboardBtn = `<a href="./dashboard/adminPanel.html" class="toDashboard">Dashboard</a>`;
        }

        loginLinkDiv.innerHTML = `
      <label class="greet-user">Hello, ${currentUser.name}</label>
      <a href="#" class="logoutBtn" onclick="logout(event)">Log out</a>
      ${dashboardBtn}
    `;
        submitButtonLogin.disabled = false;
        submitButtonLogin.style.opacity = 1;
        submitButtonLogin.style.cursor = "pointer";

        toggleModal();
        location.reload();
        return true;
      }
    })
    .catch((err) => {
      console.log(err);

      submitButtonLogin.disabled = false;
      submitButtonLogin.style.opacity = 1;
      submitButtonLogin.style.cursor = "pointer";

      return false;
    });
}
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cname) {
  let tmp = getCookie(cname);

  if (tmp === "") return false;

  return true;
}
function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
async function loadBlogs() {
  let all_blogs = [];
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(`${API_URL}/blogs`, {
    method: "GET",
    mode: "cors",
    headers,
  })
    .then(async (response) => {
      let data = await response.json();

      if (data) {
        all_blogs = [...data];

        if (all_blogs.length < 1) {
          blogsContainer.innerHTML = `
        <label class="nothing-yet">Sorry, no blogs uploaded yet!</label>
        <label class="nothing-yet">Sorry, no blogs uploaded yet!</label>
        <label class="nothing-yet">Sorry, no blogs uploaded yet!</label>
        `;
        } else {
          blogsContainer.innerHTML = "";
        }

        for (const blog of all_blogs) {
          blogsContainer.innerHTML += `
          <div class="blog">
          <img src="${blog.image}" alt="blog" />
          <label class="blog-title">${blog.title}</label>
          <div class="blog-tiny-details">
            <label class="blog-date"> ${moment(
              blog.date,
              "YYYY-MM-DDTHH:mm:ssZ"
            ).fromNow()}</label>
            <div class="blog-reactions">
              <label><i class="fa-solid fa-comments"></i> 24</label>
              <label><i class="fa-solid fa-thumbs-up"></i> ${
                blog.likes ? blog.likes.length : 0
              }</label>
            </div>
          </div>
          <label class="blog-date">${blog.author.toUpperCase()}</label>
      
          <div class="blue-line"></div>
          <p>
            ${blog.body.substring(0, 135)}...\n
          </p>
          <a href="blogDetails.html?id=${
            blog._id
          }" class="blog-full">READ MORE</a>
        </div>
          `;
        }
      } else {
        console.log("Error: no blogs returned!");

        blogsContainer.innerHTML = `
        <label class="nothing-yet">Sorry, no blogs uploaded yet!</label>
        <label class="nothing-yet">Sorry, no blogs uploaded yet!</label>
        <label class="nothing-yet">Sorry, no blogs uploaded yet!</label>
        `;
      }
    })
    .catch((err) => {
      console.log(err);

      blogsContainer.innerHTML = `
        <label class="nothing-yet">Sorry, no blogs uploaded yet!</label>
        <label class="nothing-yet">Sorry, no blogs uploaded yet!</label>
        <label class="nothing-yet">Sorry, no blogs uploaded yet!</label>
        `;
    });
}

function loadSingleProject(id) {
  let the_project = {};

  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(`${API_URL}/projects/${id}`, {
    method: "GET",
    mode: "cors",
    headers,
  })
    .then(async (response) => {
      if (response.ok) {
        let data = await response.json();

        if (data) {
          the_project = { ...data };
          console.log(the_project.title);
          projectDetailsTitle[0].innerHTML = the_project.title;
          projectDetailsDesc[0].innerHTML = the_project.description;
          projectDetailsTools[0].innerHTML = "";
          projectDetailsGallery[0].innerHTML = "";

          let tools = the_project.tools.trim();
          tools = tools.replace(/\s/g, "");
          tools = tools.split(",");

          for (const tool of tools) {
            projectDetailsTools[0].innerHTML += `
              <label>${tool}</label>
            `;
          }

          let images = the_project.image.trim();
          images = images.replace(/\s/g, "");
          images = images.split(",");

          images.splice(images.length - 1, 1);
          for (const image of images) {
            projectDetailsGallery[0].innerHTML += `
              <img src="${image}" alt="img" />
            `;
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadSingleBlog(id) {
  let the_blog = {};
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(`${API_URL}/blogs/${id}`, {
    method: "GET",
    mode: "cors",
    headers,
  })
    .then(async (response) => {
      let data = await response.json();

      if (data) {
        the_blog = { ...data };

        single_blog_category.innerHTML = the_blog.category;
        single_blog_title.innerHTML = the_blog.title;
        single_blog_image.src = the_blog.image;
        single_blog_owner.innerHTML = the_blog.author;
        single_blog_body.innerHTML = the_blog.body;
        single_blog_date.innerHTML = `PUBLISHED ${moment(
          the_blog.date,
          "YYYY-MM-DDTHH:mm:ssZ"
        ).fromNow()}`;
        likeBtn.addEventListener(
          "click",
          function () {
            like(id);
          },
          false
        );

        let liked = false;

        if (currentUser.name !== "") {
          likeBtn.style.opacity = 1;
          likeBtn.style.cursor = "pointer";
          commentAs.innerHTML = `Commenting as ${currentUser.name}`;
        } else {
          location.href = "index.html";
        }

        for (const liker of the_blog.likes) {
          if (liker.email === currentUser.email) {
            liked = !liked;
          }
        }

        likeBtn.innerHTML = liked ? "Unlike" : "Like";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function cleanContactForm() {
  document.contactForm.name.value = "";
  document.contactForm.email.value = "";
  document.contactForm.message.value = "";
}
function sendMessage() {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  submitContact.disabled = true;
  submitContact.style.opacity = 0.3;
  submitContact.style.cursor = "not-allowed";
  fetch(`${API_URL}/queries`, {
    method: "POST",
    mode: "cors",
    headers,
    body: JSON.stringify({
      names: document.contactForm.name.value,
      email: document.contactForm.email.value,
      body: document.contactForm.message.value,
    }),
  })
    .then(async (response) => {
      if (response.ok) {
        cleanContactForm();
        submitContact.disabled = false;
        submitContact.style.opacity = 1;
        submitContact.style.cursor = "pointer";
      }
    })
    .catch((err) => {
      console.log(err);
      submitContact.disabled = false;
      submitContact.style.opacity = 1;
      submitContact.style.cursor = "pointer";
    });
}
function cleanCommentForm() {
  document.commentForm.comment.value = "";
}
function saveComment() {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  submitComment.disabled = true;
  submitComment.style.opacity = 0.3;
  submitComment.style.cursor = "not-allowed";

  fetch(`${API_URL}/blogs/${current_blog_id}/comments`, {
    method: "POST",
    mode: "cors",
    headers,
    credentials: "include",
    body: JSON.stringify({
      comment: document.commentForm.comment.value,
    }),
  })
    .then(async (response) => {
      if (response.ok) {
        cleanCommentForm();

        submitComment.disabled = false;
        submitComment.style.opacity = 1;
        submitComment.style.cursor = "pointer";
        location.reload();
      }
    })
    .catch((err) => {
      console.log(err);

      submitComment.disabled = false;
      submitComment.style.opacity = 1;
      submitComment.style.cursor = "pointer";
    });
}

function loadComments(blog_id) {
  const headers = new Headers();
  let allComments = [];

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(`${API_URL}/blogs/${blog_id}/comments`, {
    method: "GET",
    mode: "cors",
    headers,
    credentials: "include",
  }).then(async (response) => {
    if (response.ok) {
      let data = await response.json();
      if (data) {
        allComments = [...data];

        commentsContainer.innerHTML = `
    <label class="comments-count">${allComments.length} Comment(s)</label>
  `;
        commentsCounter.innerHTML = `${allComments.length} COMMENT(S)`;

        for (const comment of allComments) {
          let replies = "";
          if (comment.all_replies) {
            for (const reply of comment.all_replies) {
              let bolden_reply = "";
              for (const liker of reply.likes) {
                if (liker.email === currentUser.email) {
                  bolden_reply = "bolden";
                }
              }

              replies += `
            <div class="reply">
            <div class="replier">
              <label class="replier-name">${reply.names}</label>
              <div class="separator"></div>
              <label class="replier-time">${moment(
                reply.date,
                "YYYY-MM-DDTHH:mm:ssZ"
              ).fromNow()}</label>
            </div>
            <div class="replier-body">
              <p>
                <label class="reply-to">@${comment.names}</label>
                  ${reply.comment}
                </p>
            </div>
            <div>
              <a href="#" class="comment-likes ${bolden_reply}" onclick="likeComment(event,'${
                reply._id
              }')">${reply.likes.length} Likes</a>
              </div>
          </div>
            `;
            }
          }

          let bolden = "";
          for (const liker of comment.likes) {
            if (liker.email === currentUser.email) {
              bolden = "bolden";
            }
          }
          let repliesCount = comment.all_replies
            ? comment.all_replies.length
            : 0;

          commentsContainer.innerHTML += `
            <div class="comment">
              <div class="commenter">
                <label class="commenter-name">${comment.names}</label>
                <div class="separator"></div>
                <label class="commenter-time">${moment(
                  comment.date,
                  "YYYY-MM-DDTHH:mm:ssZ"
                ).fromNow()}</label>
              </div>
              <div class="comment-body">
                <p>${comment.comment}</p>
              </div>
              <div>
                <a href="#" class="comment-likes ${bolden}" onclick="likeComment(event,'${
            comment._id
          }')">${comment.likes.length} Likes</a>
                <label> | </label>
                <a href="#" class="comment-likes">${repliesCount} replies</a>
              </div>
              
              <div class="replies">
                  <form
                  id="replyField"
                  name="replyForm"
                  onsubmit="return(validateReplyForm(event,'${comment._id}'))"
                  >
                  <textarea
                    name="reply"
                    placeholder="Your reply..."
                    id="${comment._id}"
                  ></textarea>
                  <label class="error-bag" id="reply-${comment._id}"
                    >ERROR: Invalid reply</label
                  >
      
                  <button id="form-button-reply" type="submit">Reply</button>
                  </form>
                  <div class="the-replies">
                    ${replies}
                  </div>
              </div>
      
              <div class="line-separator"></div>
            </div>
            `;
        }
      }
    }
  });
}

function saveReply(comment_id, input) {
  const headers = new Headers();
  const submitReply = document.getElementById("form-button-reply");

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  submitReply.disabled = true;
  submitReply.style.opacity = 0.3;
  submitReply.style.cursor = "not-allowed";

  fetch(`${API_URL}/comments/${comment_id}/reply`, {
    method: "POST",
    mode: "cors",
    headers,
    credentials: "include",
    body: JSON.stringify({
      comment: input.value,
    }),
  })
    .then(async (response) => {
      if (response.ok) {
        submitReply.disabled = false;
        submitReply.style.opacity = 1;
        submitReply.style.cursor = "pointer";
        location.reload();
      }
    })
    .catch((err) => {
      console.log(err);

      submitReply.disabled = false;
      submitReply.style.opacity = 1;
      submitReply.style.cursor = "pointer";
      location.reload();
    });
}

function like(blog_id) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(`${API_URL}/blogs/${blog_id}/likes`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers,
  })
    .then(async (response) => {
      if (response.ok) {
        location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeComment(e, comment_id) {
  e.preventDefault();
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(`${API_URL}/comments/${comment_id}/likes`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers,
  })
    .then(async (response) => {
      if (response.ok) {
        location.reload();
        // console.log(response.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadSimilarBlogs(id) {
  let counter = 0;

  let all_blogs = [];
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(`${API_URL}/blogs/${id}/similar`, {
    method: "GET",
    mode: "cors",
    headers,
  })
    .then(async (response) => {
      if (response.ok) {
        let data = await response.json();

        if (data) {
          all_blogs = [...data];
          similarBlogsContainer.innerHTML = "";
          for (const blog of all_blogs) {
            if (blog._id !== id) {
              similarBlogsContainer.innerHTML += `
            <div class="similar-topic">
            <img src="${blog.image}" alt="blog-img" />
            <label class="title-similar-topic"
              >${blog.title}</label
            >
            <a href="blogDetails.html?id=${blog._id}" class="link-similar-topic">READ MORE</a>
          </div>
            `;
              counter++;
            }
          }

          if (counter < 1) {
            similarBlogsContainer.innerHTML =
              "<label> Nothing yet, sorry!</label>";
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
      similarBlogsContainer.innerHTML = "<label> Nothing yet, sorry!</label>";
    });
}

function logout(e) {
  e.preventDefault();

  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  logoutBtn[0].disabled = true;
  logoutBtn[0].style.opacity = 0.3;
  logoutBtn[0].style.cursor = "not-allowed";

  fetch(`${API_URL}/users/logout`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers,
  })
    .then(async (response) => {
      if (response.ok) {
        if (checkCookie("user_details")) {
          delete_cookie("user_details");
        }

        logoutBtn[0].disabled = false;
        logoutBtn[0].style.opacity = 1;
        logoutBtn[0].style.cursor = "pointer";
        location.reload();
      }
    })
    .catch((err) => {
      console.log(err);

      logoutBtn[0].disabled = false;
      logoutBtn[0].style.opacity = 1;
      logoutBtn[0].style.cursor = "pointer";

      location.reload();
    });
}

function loadProjects() {
  let all_projects = [];
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(`${API_URL}/projects`, {
    method: "GET",
    mode: "cors",
    headers,
  })
    .then(async (response) => {
      let data = await response.json();

      if (data) {
        all_projects = [...data];

        if (all_projects.length < 1) {
          projectsContainer.innerHTML = "<label>Nothing yet, sorry</label>";
        } else {
          projectsContainer.innerHTML = "";
        }

        for (const project of all_projects) {
          let tool_string = "";
          let project_tools = "";

          let tools = project.tools.trim();
          tools = tools.replace(/\s/g, "");
          tools = tools.split(",");

          if (tools.length > 1) {
            for (const tool of tools) {
              tool_string += tool + "/";
            }
          } else {
            tool_string = tools[0];
          }

          project_tools =
            tool_string[tool_string.length - 1] === "/"
              ? tool_string.substring(0, tool_string.length - 1)
              : tool_string;

          project_images = project.image;
          project_images = project_images.split(",");

          projectsContainer.innerHTML += `
        <div class="project">
          <div class="project-details">
            <label class="project-title">${project.title}</label>
            <label class="project-sub-title">${project_tools}</label>
            <a href="projectDetails.html?id=${project._id}">LEARN MORE</a>
          </div>
          <img src="${project_images[0]}" alt="img1" />
        </div>
        `;
        }
      }
    })
    .catch((err) => {
      projectsContainer.innerHTML = "<label>Nothing yet, sorry</label>";
    });
}
