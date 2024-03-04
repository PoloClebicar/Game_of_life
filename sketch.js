const width = 700;
const height = 700;

const cellNumMax = 50;

const gridSizeX = width/cellNumMax;
const gridSizeY = (height - (height/10))/cellNumMax;

let currentX = 0;
let currentY = 0;

let running = true;

let rows = new Array(cellNumMax);
let fullGrid = new Array(cellNumMax);
let fullGridBuffer = new Array(cellNumMax);

let a, b, c, d, e, f , g, h;

let count = 0;
let bCount = 0;

function setup() {
  createCanvas(width, height);
  frameRate(8);

  let pauseButton = createButton('PAUSE');
  pauseButton.position((width/2) - 100, height - (height/10)/1.5);

  let resetButton = createButton('RESET');
  resetButton.position((width/2) + 100, height - (height/10)/1.5);

  // Use the button to change the background color.
  pauseButton.mousePressed(() => {
    running = !running;
  });

  resetButton.mousePressed(() => {
  for(j = 0; j < cellNumMax; j++){
    for(i = 0; i < cellNumMax; i++){
      if( i === Math.floor(cellNumMax/2) && j > 3 && j < cellNumMax - 3){
      rows[i] = 1;
      }else{
      rows[i] = 0;
      }

    }
    fullGrid[j] = rows.slice();
  }
  });

  for(j = 0; j < cellNumMax; j++){
    for(i = 0; i < cellNumMax; i++){
      if( i === Math.floor(cellNumMax/2) && j > 3 && j < cellNumMax - 3){
      rows[i] = 1;
      }else{
      rows[i] = 0;
      }

    }
    fullGrid[j] = rows.slice();
  }
}

function draw() {

  switch (running) {
    case true:
      background(12 , 98, 145);
      for(i = 0; i < cellNumMax; i++){
        for(j = 0; j < cellNumMax; j++){
          if(fullGrid[i][j]){
            fill(255);
          }else{
            fill(12 , 98, 145);
          }
          stroke(12, 98, 145);
          rect(currentX, currentY, gridSizeX, gridSizeY);
        currentX += gridSizeX;
      }
      currentX = 0;
      currentY += gridSizeY;
      }
      currentY = 0;
      break;
      case false:
      

      break;
    default:
      break;
  }

  gameOfLife();
 }

function randomize() {
  return Math.floor(Math.random() * 2);
}

function gameOfLife() {
  let sum = 0;
  for(j = 0; j < cellNumMax; j++){
    for(i = 0; i < cellNumMax; i++){
      sum = 0;
      sum += fullGrid[(j - 1 + cellNumMax) % cellNumMax][(i - 1 + cellNumMax) % cellNumMax];
      sum += fullGrid[(j - 1 + cellNumMax) % cellNumMax][(i  + cellNumMax) % cellNumMax];
      sum += fullGrid[(j - 1 + cellNumMax) % cellNumMax][(i + 1 + cellNumMax) % cellNumMax];

      sum += fullGrid[(j + cellNumMax) % cellNumMax][(i - 1 + cellNumMax) % cellNumMax];
      sum += fullGrid[(j + cellNumMax) % cellNumMax][(i + 1 + cellNumMax) % cellNumMax];

      sum += fullGrid[(j + 1 + cellNumMax) % cellNumMax][(i - 1 + cellNumMax) % cellNumMax];
      sum += fullGrid[(j + 1 + cellNumMax) % cellNumMax][(i + cellNumMax) % cellNumMax];
      sum += fullGrid[(j + 1 + cellNumMax) % cellNumMax][(i + 1 + cellNumMax) % cellNumMax];

     switch (fullGrid[j][i]) {
      case 0:
        if(sum === 3){
            rows[i] = 1;
          }else{
            rows[i] = 0;
          }
        break;
      case 1:
          if(sum === 3 || sum === 2){
            rows[i] = 1;
          }else{
            rows[i] = 0;
          }
        break;
      default:
        break;
     } 
    }
    fullGridBuffer[j] = rows.slice();
  }
  fullGrid = fullGridBuffer.slice();
}

