"use strict";

const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const dice = document.querySelector(".dice");
const roll = document.querySelector(".btn--roll");
const reset = document.querySelector(".btn--new");
const hold = document.querySelector(".btn--hold");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const players = [player0, player1];
let scores = [0, 0];
let current = [0, 0];
let currentPlayer = 0;

function resetGame() {
  scores[0] = 0;
  scores[1] = 0;
  current[0] = 0;
  current[1] = 0;
  currentPlayer = 0;
  updateDisplayValues();
  dice.classList.add("hidden");
  const winner = document.querySelector(".player--winner");
  if (winner) winner.classList.remove("player--winner");
  roll.disabled = false;
  hold.disabled = false;
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
}

function updateDisplayValues() {
  score0.textContent = scores[0];
  score1.textContent = scores[1];
  current0.textContent = current[0];
  current1.textContent = current[1];
}

function rollDice() {
  const num = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${num}.png`;
  dice.classList.remove("hidden");
  return num;
}

function updateCurrent(player, value, reset = false) {
  if (reset) current[player] = value;
  else current[player] += value;
  updateDisplayValues();
}

function updateScore(player) {
  scores[player] += current[player];
  updateDisplayValues();
  if (scores[player] >= 10) finishGame();
}

function switchPlayer() {
  players[currentPlayer].classList.remove("player--active");
  currentPlayer = (currentPlayer + 1) % 2;
  players[currentPlayer].classList.add("player--active");
}

function finishGame() {
  players[currentPlayer].classList.add("player--winner");
  roll.disabled = true;
  hold.disabled = true;
}

resetGame();

roll.addEventListener("click", function () {
  let rolledNum = rollDice();
  console.log(rolledNum);
  if (rolledNum !== 1) {
    updateCurrent(currentPlayer, rolledNum);
  } else {
    updateCurrent(currentPlayer, 0, true);
    switchPlayer();
  }
});

hold.addEventListener("click", function () {
  updateScore(currentPlayer);
  updateCurrent(currentPlayer, 0, true);
  switchPlayer();
});

reset.addEventListener("click", resetGame);
