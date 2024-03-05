import DotMatrix from "./dotmatrix.js";

const sign = new DotMatrix(
  "#dotmatrixContainer",
  "ELEANOR IS READING THE PERCY JACKSON SERIES!",
  20,
  3
);
sign.render();

const messages = [
  "Sequester Grundleplinth MD",
  "Beezer Twelve Washingbeard",
  "We gonna be eatin' like Diane Keaton",
  "We gonna Drax. Them. Sklounst.",
  "Insubordinate and churlish.",
  "I'm just hungry and talking about the galaxy and food",
];

let count = 0;

setInterval(() => {
  sign.setMessage(messages[count]);
  count++;
  if (count === messages.length) count = 0;
}, 5000);

window.addEventListener("resize", sign.sizeDots.bind(sign));
