"use strict";

let num = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

function disableInput() {
  document.querySelector(".check").disabled = true;
  document.querySelector(".guess").disabled = true;
}

function enableInput() {
  document.querySelector(".check").disabled = true;
  document.querySelector(".guess").disabled = true;
}

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  if (!guess) {
    document.querySelector(".message").textContent = "No number";
  } else if (guess === num) {
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").textContent = num;
    document.querySelector(".message").textContent = "That's right";
    disableInput();
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  } else {
    --score;
    if (score > 0) {
      document.querySelector(".message").textContent =
        guess < num ? "Lower" : "Higher";
      document.querySelector(".score").textContent = score;
      document.querySelector(".guess").value = "";
    } else {
      document.querySelector(".message").textContent = "You lose";
      document.querySelector(".score").textContent = score;
      document.querySelector(".number").textContent = num;
      document.querySelector("body").style.backgroundColor = "#500";
      disableInput();
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  document.querySelector(".number").textContent = "?";
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".score").textContent = 20;
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".check").disabled = false;
  document.querySelector(".guess").disabled = false;
  score = 20;
  num = Math.trunc(Math.random() * 20) + 1;
});
