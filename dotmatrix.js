import { mapSize, characterMap, rowMap } from "./charmap.js";

export default class DotMatrix {
  _parentElement;
  _message;
  _cols;
  _rows;
  _dotWidth;
  _cellWidth;

  constructor(container, message, cols = 20, rows = 3) {
    this._parentElement = document.querySelector(container);
    this._message = message;
    this._cols = cols;
    this._rows = rows;
  }

  render() {
    this.sizeDots();
    this._clear();
    this._parentElement.innerHTML = this._generateMarkup();
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _generateStrArr() {
    const str = this._message.toUpperCase().split(" ");
    let line = "";
    let tempLine = "";
    let lines = [];
    let wordCount = 0;

    for (const word of str) {
      wordCount++;
      tempLine = `${line} ${word}`.trim();
      if (tempLine.length <= this._cols) {
        line = tempLine;
        if (wordCount === str.length) {
          lines.push(this._centerLine(line));
          break;
        }
      } else {
        lines.push(this._centerLine(line));
        line = word;
        if (wordCount === str.length) {
          lines.push(this._centerLine(line));
        }
      }
    }
    return lines;
  }

  _centerLine(strToCtr) {
    const spaces = this._cols - strToCtr.length;

    const start = strToCtr.length + Math.ceil(spaces / 2);
    strToCtr = strToCtr.padStart(start, " ");
    strToCtr = strToCtr.padEnd(this._cols, " ");

    return strToCtr;
  }

  _generateChar(char) {
    let markup = "";
    const charPlan = `a${characterMap[char]}a`;
    charPlan.split("").forEach((row) => {
      const rowPlan = `0${rowMap[row]}0`;
      rowPlan
        .split("")
        .forEach(
          (dot) =>
            (markup += `<div class="dot${dot === "0" ? "--dark" : ""}"></div>`)
        );
    });
    return markup;
  }

  _generateMarkup() {
    const textArr = this._generateStrArr();
    let markup = '<div class="dotMatrixSign">';

    textArr.forEach((row) => {
      row.split("").forEach((char) => {
        markup += `<div class="dotMatrix__cell">${this._generateChar(
          char
        )}</div>`;
      });
    });

    markup += "</div>";
    return markup;
  }

  sizeDots() {
    this._dotWidth =
      this._parentElement.offsetWidth * (1 / this._cols) * (1 / mapSize.cols);
    document.documentElement.style.setProperty(
      "--dot-width",
      `${this._dotWidth}px`
    );
    this._cellWidth = 100 / this._cols;
    document.documentElement.style.setProperty(
      "--cell-width",
      `${this._cellWidth}%`
    );
  }

  setMessage(message) {
    this._message = message;
    this.render();
  }
}
