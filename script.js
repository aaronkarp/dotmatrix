import { mapSize, characterMap, rowMap } from "./charmap.js";

const dotmatrix = (container, message, cols = 20, rows = 3) => {
  const padString = (padStr) => {
    const spaces = cols - padStr.length;

    const start = padStr.length + Math.floor(spaces / 2);
    padStr = padStr.padStart(start, " ");
    padStr = padStr.padEnd(cols, " ");

    return padStr;
  };

  const buildStringArray = (str) => {
    str = str.split(" ");
    let subStr = "";
    let strArray = [];
    let tempStr = "";
    let wordCount = 0;
    for (const word of str) {
      wordCount++;
      tempStr = `${subStr} ${word}`.trim();
      if (tempStr.length <= cols) {
        subStr = tempStr;
        if (wordCount === str.length) {
          subStr = padString(subStr);
          strArray.push(subStr);
          break;
        }
      } else {
        subStr = padString(subStr);
        strArray.push(subStr);
        subStr = word;
        if (wordCount === str.length) {
          subStr = padString(subStr);
          strArray.push(subStr);
        }
      }
    }
    return strArray;
  };

  const renderChar = (char, cell) => {
    const charPlan = `a${characterMap[char]}a`;
    for (let r = 0; r < charPlan.length; r++) {
      const rowPlan = `0${rowMap[charPlan[r]]}0`;
      for (let d = 0; d < rowPlan.length; d++) {
        const dot = document.createElement("div");
        dot.classList.add(rowPlan[d] === "0" ? "dot--dark" : "dot");
        cell.appendChild(dot);
      }
    }
  };

  // Select the element where the sign will be mounted
  const containerEl = document.querySelector(container);

  // Format the message
  const messageArr = buildStringArray(message);

  // Create the main container for the sign and give it the dotMatrixSign class
  const signStructure = document.createElement("div");
  signStructure.classList.add("dotMatrixSign", "hidden");

  // Generate the cells of the sign and add them to the main sign structure container
  for (let i = 0; i < messageArr.length; i++) {
    for (let j = 0; j < messageArr[i].length; j++) {
      const cell = document.createElement("div");
      // Generate the actual dot matrix in each cell
      renderChar(messageArr[i][j], cell);
      cell.classList.add("dotMatrix__cell");

      // Calculate cell width
      cell.style.width = `${100 / cols}%`;

      // Add cell to sign structure
      signStructure.appendChild(cell);
    }
  }

  // Add the sign to the DOM
  containerEl.appendChild(signStructure);

  // Calculate the width of each dot (container width / (1 / columns in sign) / (1 / columns per character)px
  const dotDimension =
    signStructure.offsetWidth * (1 / cols) * (1 / mapSize.cols);
  const allDots = document.querySelectorAll(".dot, .dot--dark");
  allDots.forEach((dot) => {
    dot.style.width = dotDimension + "px";
    dot.style.height = dotDimension + "px";
  });
  signStructure.classList.remove("hidden");
};

dotmatrix(
  "#dotmatrixContainer",
  "ELEANOR IS READING THE PERCY JACKSON SERIES!",
  20,
  3
);
