const downArrow = document.getElementById("down-arrow");
const rightArrow = document.getElementById("right-arrow");
const btnViewWork = document.getElementsByClassName("btn-view-work");

btnViewWork[0].addEventListener("mouseover", function () {
  rightArrow.style.transform = "rotate(90deg)";
});

btnViewWork[0].addEventListener("mouseout", function () {
  rightArrow.style.transform = "rotate(0deg)";
});
