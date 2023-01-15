const openMenu = document.getElementsByClassName("open-menu");
const closeMenu = document.getElementsByClassName("close-menu");
const horizontalMenu = document.getElementsByClassName("horizontal-menu");

const errorBags = document.getElementsByClassName("error-bag");

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

  // if (!checkText(document.blogAddForm.body)) {
  //   for (let element of errorBags) {
  //     if (element.id === "body") {
  //       element.textContent = "Invalid body!";
  //       element.style.display = "flex";
  //     }
  //   }
  //   errors_detected++;
  // }

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
    console.log("all good");
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

  if (document.blogUpdateForm.title.value.length < 10) {
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

  if (document.projectAddForm.title.value === "") {
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

  if (!checkText(document.projectAddForm.description)) {
    for (let element of errorBags) {
      if (element.id === "description") {
        element.textContent = "Invalid body!";
        element.style.display = "flex";
      }
    }
    errors_detected++;
  }

  if (document.projectAddForm.description.value.length < 10) {
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
}

function checkText(input) {
  const re = /^[A-Za-z 0-9]+$/;

  return re.test(input.value.trim());
}
