// Characters as map of binary strings
const characterMap = {
  "A": ["occbccc"],
  "B": ["qccqccq"],
  "C": ["ocfffco"],
  "D": ["qcccccq"],
  "E": ["bffqffb"],
  "F": ["bffqfff"],
  "G": ["ocf2cco"],
  "H": ["cccbccc"],
  "I": ["oeeeeeo"],
  "J": ["iiiicco"],
  "K": ["cyxjxyc"],
  "L": ["ffffffb"],
  "M": ["csttccc"],
  "N": ["czt1ccc"],
  "O": ["occccco"],
  "P": ["qccqfff"],
  "Q": ["occcty5"],
  "R": ["qccqxyc"],
  "S": ["ocfoico"],
  "T": ["beeeeee"],
  "U": ["cccccco"],
  "V": ["cccccde"],
  "W": ["cccttsc"],
  "X": ["ccdedcc"],
  "Y": ["cccdeee"],
  "Z": ["bihegfb"],
  ".": ["aaaaajj"],
  ",": ["aaaaagf"],
  "?": ["ociheae"],
  "!": ["eeeeeae"],
  "@": ["octst1o"],
  "#": ["adbdbda"],
  "$": ["erxowqe"],
  "%": ["jzheg1m"],
  "^": ["aaedcaa"],
  "&": ["kcdeuy5"],
  "+": ["aeeoeea"],
  "=": ["aababaa"],
  "*": ["atoboca"],
  "/": ["aihegfa"],
  "\\": ["afgehia"],
  "|": ["eeeeeee"],
  "\"": ["dddaaaa"],
  "'": ["eeeaaaa"],
  ":": ["aaeeaeg"],
  ";": ["aaeeaee"],
  "<": ["ihegehi"],
  ">": ["fgehegf"],
  "[": ["bfffffb"],
  "]": ["biiiiib"],
  "{": ["pggfggp"],
  "}": ["nhhihhn"],
  "(": ["pgggggp"],
  ")": ["nhhhhhn"],
  "1": ["ekeeeeo"],
  "2": ["ocihegb"],
  "3": ["ocioico"],
  "4": ["cccbiii"],
  "5": ["bffqiiq"],
  "6": ["offqcco"],
  "7": ["biheeee"],
  "8": ["occocco"],
  "9": ["occrico"],
  "0": ["oc1tzco"]
}

// Binary strings
const gridMap = {
  "a": "00000",
  "b": "11111",
  "c": "10001",
  "d": "01010",
  "e": "00100",
  "f": "10000",
  "g": "01000",
  "h": "00010",
  "i": "00001",
  "j": "11000",
  "k": "01100",
  "l": "00110",
  "m": "00011",
  "n": "11100",
  "o": "01110",
  "p": "00111",
  "q": "11110",
  "r": "01111",
  "s": "11011",
  "t": "10101",
  "u": "01011",
  "v": "11010",
  "w": "00101",
  "x": "10100",
  "y": "10010",
  "z": "11001",
  "1": "10011",
  "2": "10111",
  "3": "11101",
  "4": "10110",
  "5": "01101",
  "6": "01001"
}

const dotmatrix = (container, cols = 20, rows = 3) => {
  // Select the element where the sign will be mounted
  const containerEl = document.querySelector(container);

  // Create the main container for the sign and give it the dotMatrixSign class
  const signStructure = document.createElement('div');
  signStructure.classList.add('dotMatrixSign', 'hidden');

  // Generate the cells of the sign and add them to the main sign structure container
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');

      // Generate the actual dot matrix in each cell
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 7; c++) {
          const dot = document.createElement('div');

          const dotId = `c${j + 1}r${r + 1}d${c + 1}`;
          dot.setAttribute('id', dotId);
          if (r === 0 || r === 8 || c === 0 || c === 6) {
            dot.classList.add('dot--dark');
          } else {
            dot.classList.add('dot');
          }

          cell.appendChild(dot);
        }
      }

      const cellId = `c${j + cols * i}`;
      cell.classList.add('dotMatrix__cell');
      cell.setAttribute('id', cellId);

      // Calculate cell width
      cell.style.width = `${100 / cols}%`;

      // Add cell to sign structure
      signStructure.appendChild(cell);
    }
  }

  // Add the sign to the DOM
  containerEl.appendChild(signStructure);
  const dotDimension = signStructure.offsetWidth * (1 / cols) * (1 / 7);
  const allDots = document.querySelectorAll('.dot, .dot--dark');
  allDots.forEach(dot => {
    dot.style.width = dotDimension + 'px';
    dot.style.height = dotDimension + 'px';
  });
  signStructure.classList.remove('hidden');

  const padString = (padStr) => {
    let strLength = cols - padStr.length;
    if (strLength > 1) {
      for (let i = 1; i < (strLength / 2); i++) {
        padStr = ` ${padStr} `;
      }
    }
    return padStr;
  }

  const buildStringArray = (str) => {
    let subStr = '';
    let strArray = [];
    let tempStr = '';
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
      }
    }
    console.log(strArray);
  }

  const message = "I AM THE VERY MODEL OF A MODERN MAJOR GENERAL. I'VE INFORMATION VEGETABLE, ANIMAL, AND MINERAL.";
  
  buildStringArray(message.split(' '));
}