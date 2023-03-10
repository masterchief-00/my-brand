const API_URL = "https://kwizera-api.onrender.com";
// const API_URL = "http://localhost:5000";

const openMenu = document.getElementsByClassName("open-menu");
const closeMenu = document.getElementsByClassName("close-menu");
const horizontalMenu = document.getElementsByClassName("horizontal-menu");
const blogsTable = document.getElementById("blogs");
const messagesCard = document.getElementById("messages-card");
const blogsCard = document.getElementById("blogs-card");
const projectsCard = document.getElementById("pojects-card");

const messagesContainer = document.querySelector(".messages");

const submitBlog = document.getElementById("form-button-blog");
const submitProject = document.getElementById("form-button-project");

let base64String = "";

const errorBags = document.getElementsByClassName("error-bag");

let currentUser = {};
let current_blog_id = "";

if (checkCookie("user_details")) {
  let userDetails = JSON.parse(getCookie("user_details"));

  if (userDetails.role !== "admin") location.href = "../index.html";

  currentUser.name = userDetails.names;
  currentUser.email = userDetails.email;
  currentUser.role = userDetails.role;
} else {
  location.href = "../index.html";
}

if (document.readyState !== "loading") {
  console.log("document ready...");
  initFn();
} else {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      console.log("document ready");
      initFn();
    },
    false
  );
}

document.getElementById("blog-image").addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    // convert file to base64 String
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
  };
  reader.readAsDataURL(file);
});

function initFn() {
  let path = window.location.pathname;
  let page = path.split("/").pop();

  if (page === "adminPanel.html" || page === "adminpanel") {
    loadBlogTitles();
    loadCards();
  }
  if (page === "messages.html" || page === "messages") {
    loadMessages();
  }
  if (
    page === "blogUpdate.html" ||
    page === "blogUpdate" ||
    page === "blogupdate"
  ) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    if (params.id) {
      current_blog_id = params.id;

      loadBlog(tinyMCE.get("update-body"));
    }
  }
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

function validateBlogAddForm(e) {
  e.preventDefault();
  let errors_detected = 0;

  for (let element of errorBags) {
    element.style.display = "none";
  }

  if (!checkText(document.blogAddForm.title)) {
    for (let element of errorBags) {
      if (element.id === "title") {
        element.textContent = "Invalid title!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.blogAddForm.title.value.length < 10) {
    for (let element of errorBags) {
      if (element.id === "title") {
        element.textContent =
          "The title field can't be less than 10 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (!checkText(document.blogAddForm.category)) {
    for (let element of errorBags) {
      if (element.id === "category") {
        element.textContent = "Invalid category!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.blogAddForm.category.value.length < 5) {
    for (let element of errorBags) {
      if (element.id === "category") {
        element.textContent =
          "The category field can't be less than 5 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  tinyMCE.triggerSave();

  if (document.blogAddForm.body.value.length < 17) {
    for (let element of errorBags) {
      if (element.id === "body") {
        element.textContent =
          "The body field can't be less than 10 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  let filePath = document.blogAddForm.image.value;
  let allowedExtensions = /(\.png|\.jpeg|\.jpg|\.PNG|\.JPG)$/i;

  if (!allowedExtensions.exec(filePath)) {
    for (let element of errorBags) {
      if (element.id === "image") {
        element.textContent = "Only image files are supported!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (errors_detected > 0) {
    return false;
  } else {
    saveBlog();
    return true;
  }
}

function clearBlogAdd() {
  document.blogAddForm.title.value = "";
  document.blogAddForm.body.value = "";
  document.blogAddForm.image.value = "";
  document.blogAddForm.category.value = "";
}

function validateBlogUpdateForm(e) {
  e.preventDefault();
  let errors_detected = 0;

  for (let element of errorBags) {
    element.style.display = "none";
  }

  if (!checkText(document.blogUpdateForm.title)) {
    for (let element of errorBags) {
      if (element.id === "title") {
        element.textContent = "Invalid title!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  tinyMCE.triggerSave();

  if (document.blogUpdateForm.title.value.length < 17) {
    for (let element of errorBags) {
      if (element.id === "title") {
        element.textContent =
          "The title field can't be less than 10 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (!checkText(document.blogUpdateForm.category)) {
    for (let element of errorBags) {
      if (element.id === "category") {
        element.textContent = "Invalid category!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.blogUpdateForm.category.value.length < 5) {
    for (let element of errorBags) {
      if (element.id === "category") {
        element.textContent =
          "The category field can't be less than 5 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.blogUpdateForm.body.value.length < 10) {
    for (let element of errorBags) {
      if (element.id === "body") {
        element.textContent =
          "The body field can't be less than 10 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  let filePath = document.blogUpdateForm.image.value;
  let allowedExtensions = /(\.png|\.jpeg|\.jpg|\.PNG|\.JPG)$/i;

  if (!allowedExtensions.exec(filePath)) {
    for (let element of errorBags) {
      if (element.id === "image") {
        element.textContent = "Only image files are supported!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (errors_detected > 0) {
    return false;
  } else {
    updateBlog();
    return true;
  }
}
function clearBlogUpdate() {
  document.blogUpdateForm.title.value = "";
  document.blogUpdateForm.body.value = "";
  document.blogUpdateForm.image.value = "";
}

function validateprojectAddForm(e) {
  e.preventDefault();
  let errors_detected = 0;

  for (let element of errorBags) {
    element.style.display = "none";
  }

  if (!checkText(document.projectAddForm.title)) {
    for (let element of errorBags) {
      if (element.id === "title") {
        element.textContent = "Invalid project title!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.projectAddForm.title.value.length < 8) {
    for (let element of errorBags) {
      if (element.id === "title") {
        element.textContent = "Invalid project title!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  let allTools = document.projectAddForm.tools.value.replace(/\s/g, "");
  let tools = allTools.split(",");

  if (tools.length < 1) {
    for (let element of errorBags) {
      if (element.id === "tools") {
        element.textContent = "Enter atleast one tool used!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.projectAddForm.tools.value === "") {
    for (let element of errorBags) {
      if (element.id === "tools") {
        element.textContent = "The tools field can't be left blank!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  tinyMCE.triggerSave();

  if (document.projectAddForm.description.value.length < 17) {
    for (let element of errorBags) {
      if (element.id === "description") {
        element.textContent =
          "The description field can't be less than 10 characters!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  let filePath = document.projectAddForm.image.value;
  let allowedExtensions = /(\.png|\.jpeg|\.jpg|\.PNG|\.JPG)$/i;

  if (!allowedExtensions.exec(filePath)) {
    for (let element of errorBags) {
      if (element.id === "image") {
        element.textContent = "Only image files are supported!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (errors_detected > 0) {
    return false;
  } else {
    saveProject();
    return true;
  }
}

function clearProjectUpdate() {
  document.projectAddForm.title.value = "";
  document.projectAddForm.description.value = "";
  document.projectAddForm.image.value = "";
  document.projectAddForm.tools.value = "";
}

function checkText(input) {
  const re = /^[A-Za-z 0-9]+$/;

  return re.test(input.value.trim());
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
/**-------------------------LOCALSTORAGE[WAS]--------------------------- */

function saveBlog() {
  const headers = new Headers();

  const form = document.forms.namedItem("blogAddForm");
  const formData = new FormData(form);

  headers.append("Accept", "application/json");

  submitBlog.disabled = true;
  submitBlog.style.opacity = 0.3;
  submitBlog.style.cursor = "not-allowed";

  fetch(`${API_URL}/blogs`, {
    method: "POST",
    mode: "cors",
    headers,
    credentials: "include",
    body: formData,
  })
    .then(async (response) => {
      if (response.ok) {
        clearBlogAdd();
        submitBlog.disabled = false;
        submitBlog.style.opacity = 1;
        submitBlog.style.cursor = "pointer";
        // location.reload();
      }
    })
    .catch((err) => {
      console.log(err);

      submitBlog.disabled = false;
      submitBlog.style.opacity = 1;
      submitBlog.style.cursor = "pointer";
    });
}

async function loadBlogTitles() {
  let all_blogs = [];
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  blogsTable.innerHTML = `
    <tr>
      <th>#</th>
      <th>TITLE</th>
      <th>ADDED</th>
      <th>ACTION</th>
    </tr>
    `;

  fetch(`${API_URL}/blogs`, {
    method: "GET",
    mode: "cors",
    headers,
  })
    .then(async (response) => {
      if (response.ok) {
        let data = await response.json();

        if (data) {
          all_blogs = [...data];

          blogsCard.innerHTML = all_blogs.length;
          let counter = 1;
          for (const blog of all_blogs) {
            blogsTable.innerHTML += `
      <tr>
        <td>${counter++}</td>
        <td>${blog.title}</td>
        <td>${moment(blog.date, "YYYY-MM-DDTHH:mm:ssZ").fromNow()}</td>
        <td>
          <div>
            <a href="./blogUpdate.html?id=${
              blog._id
            }" class="update-btn">Update</a>
            <a href="#" class="delete-btn" onclick="deleteBlog('${
              blog._id
            }')">Delete</a>
          </div>
        </td>
      </tr>
      `;
          }

          blogsCard.innerHTML = all_blogs.length ? all_blogs.length : 0;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteBlog(id) {
  const headers = new Headers();

  if (window.confirm("You're about to delete this blog, proceed?")) {
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    fetch(`${API_URL}/blogs/${id}`, {
      method: "DELETE",
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
}

function loadCards() {
  let unread_messages = 0;

  let all_messages = [];
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(`${API_URL}/queries`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers,
  })
    .then(async (response) => {
      if (response.ok) {
        let data = await response.json();

        if (data) {
          all_messages = [...data];

          for (const message of all_messages) {
            if (message.status === "UNREAD") {
              unread_messages++;
            }
          }
          messagesCard.innerHTML = unread_messages;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });

  fetch(`${API_URL}/projects`, {
    method: "GET",
    mode: "cors",
    headers,
  })
    .then(async (response) => {
      let data = await response.json();

      if (data) {
        let all_projects = [...data];

        projectsCard.innerHTML = all_projects.length;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadMessages() {
  let all_messages = [];
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(`${API_URL}/queries`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers,
  })
    .then(async (response) => {
      if (response.ok) {
        let data = await response.json();

        if (data) {
          all_messages = [...data];
          messagesContainer.innerHTML = "";
          for (const message of all_messages) {
            messagesContainer.innerHTML += `
            <div class="message">
              <div class="from">
                  <label class="name">${message.names}</label>
                  <div class="separator"></div>
                  <label>${moment(
                    message.date,
                    "YYYY-MM-DDTHH:mm:ssZ"
                  ).fromNow()}</label>
                  <div class="separator"></div>
                  <label>${message.email}</label>
                  <div class="separator"></div>
                  <label>${message.status}</label>
              </div>
              <div class="message-body">
                  <p>${message.body}</p>
                  <div>
                      <a href="#" onclick="deleteMessage('${
                        message._id
                      }')">Delete</a>
                      <a href="#" onclick="markRead('${message._id}')" ${
              message.status === "READ" ? 'class="button-disabled"' : ""
            }>Mark as read</a>
                  </div>
              </div>
            </div>
            `;
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function deleteMessage(id) {
  const headers = new Headers();

  if (window.confirm("You're about to delete this message, proceed?")) {
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    fetch(`${API_URL}/queries/${id}`, {
      method: "DELETE",
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
}

function markRead(id) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(`${API_URL}/queries/${id}/status`, {
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

function loadBlog(editor) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(`${API_URL}/blogs/${current_blog_id}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers,
  })
    .then(async (response) => {
      if (response.ok) {
        let blog = await response.json();

        document.blogUpdateForm.title.value = blog.title;
        document.blogUpdateForm.category.value = blog.category
          ? blog.category
          : "Category Not set";

        console.log(editor);
        tinyMCE.get("update-body").setContent(blog.body);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateBlog() {
  const headers = new Headers();

  const form = document.forms.namedItem("blogUpdateForm");
  const formData = new FormData(form);

  headers.append("Accept", "application/json");

  submitBlog.disabled = true;
  submitBlog.style.opacity = 0.3;
  submitBlog.style.cursor = "not-allowed";

  fetch(`${API_URL}/blogs/${current_blog_id}`, {
    method: "PUT",
    mode: "cors",
    headers,
    credentials: "include",
    body: formData,
  })
    .then(async (response) => {
      if (response.ok) {
        submitBlog.disabled = false;
        submitBlog.style.opacity = 1;
        submitBlog.style.cursor = "pointer";

        location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
      submitBlog.disabled = false;
      submitBlog.style.opacity = 1;
      submitBlog.style.cursor = "pointer";

      console.log();
    });
}

function saveProject() {
  const headers = new Headers();

  const form = document.forms.namedItem("projectAddForm");
  const formData = new FormData(form);

  headers.append("Accept", "application/json");

  submitProject.disabled = true;
  submitProject.style.opacity = 0.3;
  submitProject.style.cursor = "not-allowed";

  fetch(`${API_URL}/projects`, {
    method: "POST",
    mode: "cors",
    headers,
    credentials: "include",
    body: formData,
  })
    .then(async (response) => {
      if (response.ok) {
        submitProject.disabled = false;
        submitProject.style.opacity = 1;
        submitProject.style.cursor = "pointer";

        location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
      submitProject.disabled = false;
      submitProject.style.opacity = 1;
      submitProject.style.cursor = "pointer";
    });
}

function logout(e) {
  e.preventDefault();

  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

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
          location.reload();
        }
      }
    })
    .catch((err) => {
      console.log(err);
      location.reload();
    });
}
