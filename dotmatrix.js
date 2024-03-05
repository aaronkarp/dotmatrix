import { mapSize, characterMap, rowMap } from "./charmap.js";

export default class DotMatrix {
  _container;
  _message;
  _cols;
  _rows;

  constructor(container, message, cols = 20, rows = 3) {
    this._container = document.querySelector(container);
    this._message = message;
    this._cols = cols;
    this._rows = rows;
  }

  _generateStrArr() {
    const str = this._message.split(" ");
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
          line = this._centerLine(line);
          lines.push(line);
          break;
        }
      } else {
        line = this._centerLine(line);
        lines.push(line);
        if (wordCount === str.length) {
          line = this._centerLine(line);
          lines.push(line);
        }
      }
    }
    return lines;
  }

  _centerLine(strToCtr) {
    const spaces = this._cols - strToCtr.length;

    const start = strToCtr.length + Math.ceil(spaces / 2);
    strToCtr = strToCtr.padStart(start, " ");
    strToCtr = strToCtr.padEnd(cols, " ");

    return strToCtr;
  }

  _generateMarkup() {}

  sizeDots() {
    const dotDimension =
      _container.offsetWidth * (1 / this._cols) * (1 / mapSize.cols);
    document.documentElement.style.setProperty(
      "--dot-width",
      `${dotDimension}px`
    );
  }
}
