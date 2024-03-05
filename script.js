import DotMatrix from "./dotmatrix.js";

const sign = new DotMatrix(
  "#dotmatrixContainer",
  "ELEANOR IS READING THE PERCY JACKSON SERIES!",
  20,
  3
);
sign.render();

setTimeout(() => {
  sign.setMessage(`I'm just hungry and talking about the galaxy and trains.`);
}, 6000);

window.addEventListener("resize", sign.sizeDots.bind(sign));
