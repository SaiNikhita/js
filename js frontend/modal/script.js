"use strict";
let showModals = document.querySelectorAll(".show-modal");
let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
let close = document.querySelector(".close-modal");

function unhideModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function hideModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

for (let showModal of showModals) {
  console.log(showModal);
  showModal.addEventListener("click", unhideModal);
}

close.addEventListener("click", function () {
  if (!modal.classList.contains("hidden")) hideModal();
});

overlay.addEventListener("click", function () {
  if (!modal.classList.contains("hidden")) hideModal();
});

document.addEventListener("keydown", function (event) {
  console.log(event);
  if (event.key == "Escape" && !modal.classList.contains("hidden")) hideModal();
});
