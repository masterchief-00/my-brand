const openMenu = document.getElementsByClassName("open-menu");
const closeMenu = document.getElementsByClassName("close-menu");
const horizontalMenu = document.getElementsByClassName("horizontal-menu");
const blogsTable = document.getElementById("blogs");
const blogsCard = document.getElementById("blogs-card");
const messagesContainer = document.querySelector(".messages");

let base64String = "";

const errorBags = document.getElementsByClassName("error-bag");

let current_user = JSON.parse(localStorage["current_user"]);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    let path = window.location.pathname;
    let page = path.split("/").pop();

    if (page === "adminPanel.html") {
      loadBlogTitles();
      loadCards();
    }
    if (page === "messages.html") {
      loadMessages();
    }
  },
  false
);

document.getElementById("blog-image").addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    // convert file to base64 String
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
  };
  reader.readAsDataURL(file);
});

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
  // e.preventDefault();
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

  if (document.blogAddForm.date.value === "") {
    for (let element of errorBags) {
      if (element.id === "date") {
        element.textContent = "Invalid date!";
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
  document.blogAddForm.date.value = "";
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

  if (document.blogUpdateForm.date.value === "") {
    for (let element of errorBags) {
      if (element.id === "date") {
        element.textContent = "Invalid date!";
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
function clearBlogUpdate() {
  document.blogUpdateForm.title.value = "";
  document.blogUpdateForm.body.value = "";
  document.blogUpdateForm.image.value = "";
  document.blogUpdateForm.date.value = "";
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
    console.log("all good");
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
/**-------------------------LOCALSTORAGE--------------------------- */

function saveBlog() {
  let newBlog = {
    id: slugify(document.blogAddForm.title.value),
    title: document.blogAddForm.title.value,
    body: document.blogAddForm.body.value,
    date: document.blogAddForm.date.value,
    image: base64String,
    author: current_user.name,
  };

  if (localStorage.getItem("blogs") === null) {
    let all_blogs = [];
    all_blogs.push(newBlog);

    localStorage.setItem("blogs", JSON.stringify(all_blogs));
    clearBlogAdd();
  } else {
    let all_blogs = [...JSON.parse(localStorage["blogs"])];
    all_blogs.push(newBlog);

    localStorage.setItem("blogs", JSON.stringify(all_blogs));
    clearBlogAdd();
  }
}

function loadBlogTitles() {
  if (localStorage["blogs"] !== null) {
    let all_blogs = [...JSON.parse(localStorage["blogs"])];
    blogsTable.innerHTML = `
    <tr>
      <th>#</th>
      <th>TITLE</th>
      <th>DATE ADDED</th>
      <th>ACTION</th>
    </tr>
    `;
    let counter = 1;
    for (const blog of all_blogs) {
      blogsTable.innerHTML += `
      <tr>
        <td>${counter++}</td>
        <td>${blog.title}</td>
        <td>${blog.date}</td>
        <td>
          <div>
            <a href="./blogUpdate.html?id=${
              blog.id
            }" class="update-btn">Update</a>
            <a href="#" class="delete-btn" onclick="deleteBlog('${
              blog.id
            }')">Delete</a>
          </div>
        </td>
      </tr>
      `;
    }
  }
}

function deleteBlog(id) {
  let all_blogs = [...JSON.parse(localStorage["blogs"])];
  let filtered_blogs = [];
  let title = id.trim();

  if (window.confirm("You're about to delete this blog, proceed?")) {
    for (const blog of all_blogs) {
      if (blog.id === title) {
        filtered_blogs = [...all_blogs.filter((item) => item.id !== title)];
      }
    }

    localStorage.setItem("blogs", JSON.stringify(filtered_blogs));
    location.reload();
  }
}

function loadCards() {
  let all_blogs = [...JSON.parse(localStorage["blogs"])];
  blogsCard.innerHTML = all_blogs.length;
}

function loadMessages() {
  if (localStorage.getItem("messages") !== null) {
    let all_messages = [...JSON.parse(localStorage["messages"])];
    messagesContainer.innerHTML = "";
    for (const message of all_messages) {
      messagesContainer.innerHTML += `
      <div class="message">
        <div class="from">
            <label class="name">${message.name}</label>
            <div class="separator"></div>
            <label>${moment(
              message.date,
              "DD/MM/YYYY, hh:mm:ss"
            ).fromNow()}</label>
            <div class="separator"></div>
            <label>${message.email}</label>
        </div>
        <div class="message-body">
            <p>${message.body}</p>
            <div>
                <a href="#" onclick="deleteMessage(${message.id})">Delete</a>
                <a href="#">Mark as read</a>
            </div>
        </div>
      </div>
      `;
    }
  }
}
function deleteMessage(id) {
  let all_messages = [...JSON.parse(localStorage["messages"])];
  let filtered_messages = [];

  if (window.confirm("You're about to delete this blog, proceed?")) {
    for (const message of all_messages) {
      if (message.id === id) {
        filtered_messages = [...all_messages.filter((item) => item.id !== id)];
      }
    }

    localStorage.setItem("messages", JSON.stringify(filtered_messages));
    location.reload();
  }
}
