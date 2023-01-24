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

let horizontalMenuActive = false;
let auth_status = false;

let current_blog_id = "";
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
      current_blog_id = params.id;
      loadSingleBlog(current_blog_id);
      loadComments(current_blog_id);
      loadSimilarBlogs(current_blog_id);
    } else {
      loadBlogs();
    }
    if (localStorage["current_user"]) {
      let current_user = JSON.parse(localStorage["current_user"]);
      loginLinkDiv.innerHTML = `
    <label class="greet-user">Hello, ${current_user.name}</label>
    <a href="#" class="logoutBtn" onclick="logout(event)">Log out</a>
  `;
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

function validateReplyForm(e, comment_id, commenter) {
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
    return false;
  } else {
    saveReply(comment_id, commenter, inputField);
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
  let current_user = localStorage["current_user"]
    ? JSON.parse(localStorage["current_user"])
    : {};

  for (const user of all_users) {
    if (user.email === email && user.password === password) {
      console.log("LOGGED IN!");
      currentUser.name = user.name;
      currentUser.email = user.email;

      localStorage.setItem("current_user", JSON.stringify(currentUser));

      loginLinkDiv.innerHTML = `
      <label class="greet-user">Hello, ${current_user.name}</label>
      <a href="#" class="logoutBtn" onclick="logout(event)">Log out</a>
    `;
      toggleModal();
      location.reload();
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
        <label><i class="fa-solid fa-thumbs-up"></i> ${
          blog.likes ? blog.likes.length : 0
        }</label>
      </div>
    </div>
    <label class="blog-date">${blog.category.toUpperCase()}</label>

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
  let current_user = JSON.parse(localStorage["current_user"]);

  let liked = false;

  if (localStorage["current_user"]) {
    likeBtn.style.opacity = 1;
    likeBtn.style.cursor = "pointer";
    commentAs.innerHTML = `Commenting as ${current_user.name}`;
  } else {
    location.href = "index.html";
  }

  for (const blog of all_blogs) {
    if (blog.id === id.trim()) {
      single_blog_category.innerHTML = blog.category.toUpperCase();
      single_blog_title.innerHTML = blog.title;
      single_blog_image.src = `data:image/jpg;base64,${blog.image}`;
      single_blog_owner.innerHTML = blog.author;
      single_blog_body.innerHTML = blog.body;
      single_blog_date.innerHTML = `PUBLISHED ON ${blog.date}`;
      likeBtn.addEventListener(
        "click",
        function () {
          like(id);
        },
        false
      );
      if (blog.likes) {
        for (const liker of blog.likes) {
          if (liker === current_user.email) {
            liked = !liked;
          }
        }
      }
    }
  }
  likeBtn.innerHTML = liked ? "Unlike" : "Like";
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
function cleanCommentForm() {
  document.commentForm.comment.value = "";
}
function saveComment() {
  let user = JSON.parse(localStorage["current_user"]);
  let newComment = {
    id: user.email + "_" + current_blog_id + "_" + Date.now(),
    blog_id: current_blog_id,
    name: user.name,
    body: document.commentForm.comment.value,
    date: new Date().toLocaleString("en-GB", { timeZone: "CAT" }),
    likes: [],
  };

  if (localStorage.getItem("comments") === null) {
    let all_comments = [];
    all_comments.push(newComment);

    localStorage.setItem("comments", JSON.stringify(all_comments));

    cleanCommentForm();
    location.reload();
  } else {
    let all_comments = [...JSON.parse(localStorage["comments"])];
    all_comments.push(newComment);

    localStorage.setItem("comments", JSON.stringify(all_comments));
    cleanCommentForm();
    location.reload();
  }
}

function loadComments(blog_id) {
  let all_comments = localStorage["comments"]
    ? [...JSON.parse(localStorage["comments"])].reverse()
    : [];

  let filtered_comments = all_comments.filter(
    (item) => item.blog_id === blog_id
  );

  commentsContainer.innerHTML = `
    <label class="comments-count">${filtered_comments.length} Comment(s)</label>
  `;
  commentsCounter.innerHTML = `${filtered_comments.length} COMMENT(S)`;
  for (const comment of filtered_comments) {
    commentsContainer.innerHTML += `
      <div class="comment">
        <div class="commenter">
          <label class="commenter-name">${comment.name}</label>
          <div class="separator"></div>
          <label class="commenter-time">${moment(
            comment.date,
            "DD/MM/YYYY, hh:mm:ss"
          ).fromNow()}</label>
        </div>
        <div class="comment-body">
          <p>${comment.body}</p>
        </div>
        <div>
          <a href="#" class="comment-likes ${boldenLikeBtn(
            comment.id
          )}" onclick="likeComment('${comment.id}')">${countLikes(
      "comment",
      comment.id
    )} Likes</a>
          <label> | </label>
          <a href="#" class="comment-likes">${countReplies(
            comment.id
          )} replies</a>
        </div>
        
        <div class="replies">
            <form
            id="replyField"
            name="replyForm"
            onsubmit="return(validateReplyForm(event,'${comment.id}','${
      comment.name
    }'))"
            >
            <textarea
              name="reply"
              placeholder="Your reply..."
              id="${comment.id}"
            ></textarea>
            <label class="error-bag" id="reply-${comment.id}"
              >ERROR: Invalid reply</label
            >

            <button type="submit">Reply</button>
            </form>
            <div class="the-replies">
              ${getReplies(comment.id)}
            </div>
        </div>

        <div class="line-separator"></div>
      </div>
      `;
  }
}
function getReplies(comment_id) {
  if (localStorage["replies"]) {
    let all_replies = [...JSON.parse(localStorage["replies"])];

    let filtered_replies = all_replies.filter(
      (item) => item.comment_id === comment_id
    );
    let large_string = "";

    for (const reply of filtered_replies) {
      large_string += `
      <div class="reply">
      <div class="replier">
        <label class="replier-name">${reply.name}</label>
        <div class="separator"></div>
        <label class="replier-time">${moment(
          reply.date,
          "DD/MM/YYYY, hh:mm:ss"
        ).fromNow()}</label>
      </div>
      <div class="replier-body">
        <p>
          <label class="reply-to">@${reply.commenter}</label>
            ${reply.body}
          </p>
      </div>
      <div>
        <a href="#" class="comment-likes ${boldenLikeBtn(
          reply.id
        )}" onclick="likeReply('${reply.id}')">${countLikes(
        "reply",
        reply.id
      )} Likes</a>
        </div>
    </div>
      `;
    }
    return large_string;
  }
  return "";
}
function saveReply(comment_id, commenter, input) {
  let user = JSON.parse(localStorage["current_user"]);

  let newReply = {
    id: user.email + "_reply_" + comment_id + "_" + Date.now(),
    comment_id: comment_id,
    name: user.name,
    commenter: commenter,
    body: input.value,
    date: new Date().toLocaleString("en-GB", { timeZone: "CAT" }),
    likes: [],
  };

  if (localStorage.getItem("replies") === null) {
    let all_replies = [];
    all_replies.push(newReply);

    localStorage.setItem("replies", JSON.stringify(all_replies));

    location.reload();
  } else {
    let all_replies = [...JSON.parse(localStorage["replies"])];

    all_replies.push(newReply);
    localStorage.setItem("replies", JSON.stringify(all_replies));
    location.reload();
  }
}

function like(blog_id) {
  let all_blogs = [...JSON.parse(localStorage["blogs"])];
  let current_user = JSON.parse(localStorage["current_user"]);
  let unlike = false;

  for (const blog of all_blogs) {
    if (blog.id === blog_id) {
      if (blog.likes) {
        for (const liker of blog.likes) {
          if (liker === current_user.email) {
            let index = blog.likes.indexOf(current_user.email);
            blog.likes.splice(index, 1);
            unlike = true;
            break;
          }
        }
        if (!unlike) {
          blog.likes.push(current_user.email);
        }
      } else {
        blog.likes = [];
        blog.likes.push(current_user.email);
      }
    }
  }
  localStorage.setItem("blogs", JSON.stringify(all_blogs));
  location.reload();
}

function likeComment(comment_id) {
  let all_comments = [...JSON.parse(localStorage["comments"])];
  let current_user = JSON.parse(localStorage["current_user"]);
  let unlike = false;

  for (const comment of all_comments) {
    if (comment.id === comment_id) {
      if (comment.likes) {
        for (const liker of comment.likes) {
          if (liker === current_user.email) {
            let index = comment.likes.indexOf(current_user.email);
            comment.likes.splice(index, 1);
            unlike = true;
            break;
          }
        }
        if (!unlike) {
          comment.likes.push(current_user.email);
        }
      } else {
        comment.likes = [];
        comment.likes.push(current_user.email);
      }
    }
  }
  localStorage.setItem("comments", JSON.stringify(all_comments));
  location.reload();
}

function likeReply(reply_id) {
  let all_replies = [...JSON.parse(localStorage["replies"])];
  let current_user = JSON.parse(localStorage["current_user"]);
  let unlike = false;

  for (const reply of all_replies) {
    if (reply.id === reply_id) {
      if (reply.likes) {
        for (const liker of reply.likes) {
          if (liker === current_user.email) {
            let index = reply.likes.indexOf(current_user.email);
            reply.likes.splice(index, 1);
            unlike = true;
            break;
          }
        }
        if (!unlike) {
          reply.likes.push(current_user.email);
        }
      } else {
        reply.likes = [];
        reply.likes.push(current_user.email);
      }
    }
  }
  localStorage.setItem("replies", JSON.stringify(all_replies));
  location.reload();
}

function countLikes(type, id) {
  if (type === "comment") {
    let all_comments = [...JSON.parse(localStorage["comments"])];

    for (const comment of all_comments) {
      if (comment.id === id) {
        return comment.likes.length;
        classValue = "bolden";
      }
    }
  }
  if (type === "reply") {
    let all_replies = [...JSON.parse(localStorage["replies"])];

    for (const reply of all_replies) {
      if (reply.id === id) {
        return reply.likes.length;
      }
    }
  }
}

function countReplies(comment_id) {
  let all_replies = localStorage["replies"]
    ? [...JSON.parse(localStorage["replies"])]
    : [];
  let counter = 0;
  for (const reply of all_replies) {
    if (reply.comment_id === comment_id) {
      counter++;
    }
  }

  return counter;
}
function boldenLikeBtn(id) {
  let all_comments = localStorage["comments"]
    ? [...JSON.parse(localStorage["comments"])]
    : [];
  let all_replies = localStorage["replies"]
    ? [...JSON.parse(localStorage["replies"])]
    : [];
  let current_user = JSON.parse(localStorage["current_user"]);
  let classValue = "";

  for (const comment of all_comments) {
    if (comment.id === id) {
      if (comment.likes) {
        for (const liker of comment.likes) {
          if (liker === current_user.email) {
            classValue = "bolden";
          }
        }
      }
    }
  }

  for (const reply of all_replies) {
    if (reply.id === id) {
      if (reply.likes) {
        for (const liker of reply.likes) {
          if (liker === current_user.email) {
            console.log("reply= " + id);
            classValue = "bolden";
          }
        }
      }
    }
  }

  return classValue;
}

function loadSimilarBlogs(id) {
  let all_blogs = localStorage["blogs"]
    ? [...JSON.parse(localStorage["blogs"])]
    : [];
  similarBlogsContainer.innerHTML = "";
  let category = "";
  let counter = 0;

  for (const blog of all_blogs) {
    if (blog.id === id) {
      category = blog.category;
      break;
    }
  }

  for (const blog of all_blogs) {
    if (blog.category === category && blog.id !== id) {
      similarBlogsContainer.innerHTML += `
      <div class="similar-topic">
      <img src="data:image/jpg;base64,${blog.image}" alt="blog-img" />
      <label class="title-similar-topic"
        >${blog.title}</label
      >
      <a href="blogDetails.html?id=${blog.id}" class="link-similar-topic">READ MORE</a>
    </div>
      `;
      counter++;
    }
  }

  if (counter < 1) {
    similarBlogsContainer.innerHTML = "<label> Nothing yet, sorry!</label>";
  }
}

function logout(e) {
  e.preventDefault();

  localStorage.removeItem("current_user");
  location.reload();
}
