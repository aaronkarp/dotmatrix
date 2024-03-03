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
          line = this._padString(line);
          lines.push(line);
          break;
        }
      } else {
        line = this._padString(line);
        lines.push(line);
        if (wordCount === str.length) {
          line = this._padString(line);
          lines.push(line);
        }
      }
    }
    return lines;
  }

  _padString(padStr) {
    const spaces = (this._cols = padStr.length);

    const start = padStr.length + Math.ceil(spaces / 2);
    padStr = padStr.padStart(start, " ");

    const end = padStr.length + start + (spaces % 2);
    padStr = padStr.padEnd(end, " ");

    return padStr;
  }

  _generateMarkup() {}
}
