// Create 16 rows of sub-containers
let container = document.querySelector('.container');
container.style.cssText = `display:flex;align-items:center;
flex-direction:column;gap:0px;`;
// Default size of square div array
let rows = 16;
let columns = 16;
// Generate canvas on load
document.addEventListener("DOMContentLoaded", makeCanvas(rows, columns));

// Generate the div array
function makeCanvas (rows, columns) {

  // Calculate size based on viewport width
  let vw = window.innerWidth;
  size = Math.min(((vw * 0.8) / rows),  (960 / rows));

  for (let i = 0; i < rows; i++) {
    // Generate rows
    let newRow = document.createElement('div');
    container.appendChild(newRow);
    newRow.classList.add(`sub-container-row-${i}`);
    if (newRow.classList.contains('sub-container-row-0')) {
      newRow.style.cssText = `display:flex;flex:none;justify-content:flex-start;
      margin:1% auto 0px auto;width:80vw;height:0px;padding-top:6%;`
    } else {   // Different layouts for not the first row
      newRow.style.cssText = `display:flex;flex:none;justify-content:flex-start;
      margin:auto;width:80vw;height:0px;padding-top:${size}px;` 
      // Padding-top controls gaps between each row
    }
    // Generate cells in current row
    for (let j = 0; j < columns; j++) {
      let newCell = document.createElement('div');
      newRow.appendChild(newCell);
      newCell.classList.add(`row-${i}-cell-${j}`);
      newCell.classList.add(`pixel`);

      // Generate cells
      if (newRow.classList.contains(`row-0-cell-${j}`)) {
        newCell.style.cssText = `display:flex;flex:none;width:${size}px;height:${size}px;background-color:white;
        z-index:1;aspect-ratio:1/1;`
      } else {  // margin controls gaps between each column
        newCell.style.cssText = `display:flex;flex:none;width:${size}px;height:${size}px;background-color:white;
        z-index:1;aspect-ratio:1/1;`
      }
      newCell.addEventListener('mouseover', cellMouseOver)
    }
    const br = document.createElement('br');
    newRow.appendChild(br);
  }
}

// Reset button functionality
const resetBtn = document.querySelector('.resetButton');
resetBtn.addEventListener('click', resetCanvas);

// ChangeSize button functionality
const cSBtn = document.querySelector('.changeSize');
cSBtn.addEventListener('click', changeSize);

// Toggle hover effect that leaves trail on pixles
let eraserActive = 0;
let rainbowActive = 0;
let strokeColor = 'black';
function cellMouseOver (e) {
  let hoveredCell = document.querySelector(`.${this.classList[0]}`);
  if (eraserActive) {
    hoveredCell.style.backgroundColor = 'white';
  } else if (rainbowActive) {
    hoveredCell.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  } else {
    hoveredCell.style.backgroundColor = strokeColor;
  }
}

// Toggle eraser
const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', erase);

// Toggle rainbow mode
const rainbowBtn = document.querySelector('.rainbow');
rainbowBtn.addEventListener('click', rainbow);

// Set every pixel back to color white
function resetCanvas (e) {
  let pixelList = document.querySelectorAll('.pixel');
  pixelList.forEach (pixel => pixel.style.backgroundColor = 'white')
}

// Toggle on eraser
function erase (e) {
  if (eraserActive) {
    eraser.classList.replace('eraserOn', 'eraserOff');
    eraserActive = 0;
  } else {
    eraserActive = 1;
    if (eraser.classList.contains('eraserOff')) {
      eraser.classList.replace('eraserOff', 'eraserOn');
    }
  }
}

// Toggle on rainbow mode
function rainbow (e) {
  if (rainbowActive) {
    rainbowBtn.classList.replace('rainbowOn', 'rainbowOff');
    rainbowActive = 0;
  } else {
    rainbowActive = 1;
    if (rainbowBtn.classList.contains('rainbowOff')) {
      rainbowBtn.classList.replace('rainbowOff', 'rainbowOn');
    }
  }
}

// Prompts user for desired canvas size
function changeSize (e) {
  let desiredSize = parseInt(window.prompt('Enter size (1-100)'));
  if (desiredSize == null || desiredSize == 'null' || 
      desiredSize == '' || typeof desiredSize !== 'number' ||
      isNaN(desiredSize)) return;
  if (desiredSize > 100) {
    desiredSize = 100;
  } else if (desiredSize < 1) {
    desiredSize = 1;
  } else {
    // Clear old canvas
    let oldCanvas = document.querySelector('.container');
    oldCanvas.innerHTML = '';
    makeCanvas(desiredSize, desiredSize);
  }
}