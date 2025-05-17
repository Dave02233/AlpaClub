// TODO: Set up how many balls we want
const ballCount = 100;
// TODO: Set up x and y position variable to equal an empty array
const x = [];
const y = [];
// TODO: Set up speed, size and color variable to equal an empty array
const xSpeed = [];
const ySpeed = [];
const size = [];
const r = [];
const g = [];
const b = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // TODO: Create a for loop that iterates through i until it reaches the ball count value
  for(let i = 0; i < ballCount; i++) {
    // Inside the for loop:
    // TODO: Set x and y position to be the center
    x[i] = windowWidth / 2;
    y[i] = windowHeight / 2;
    // TODO: Set the speeds to be random
    //const rapporto = -5 + (Math.random() - 0) * ((4-(-5) / 1 - 0);
    xSpeed[i] = Math.random() * 10 - 5;
    ySpeed[i] = Math.random() * 10 - 5;
    // TODO: Set the size to be random
    size[i] = Math.random() * 60 - 10;
    // TODO: Set the colors to be random
    r[i] = Math.ceil(Math.random() * 255);
    g[i] = Math.ceil(Math.random() * 255);
    b[i] = Math.ceil(Math.random() * 255);
  }

}

function draw() {
  background(0, 50);
  
  // TODO: Iterate through a new for loop to change the properties in order to animate the balls
  for(let i = 0; i < ballCount; i++) {
    // Inside the for loop:
    // TODO: Increment speed for x position
    x[i] += xSpeed[i];
    // TODO: Increment speed for y position
    y[i] += ySpeed[i];
    
    // TODO: Reverse x direction if ball hits left or right sides
    const width = windowWidth;
    if(x[i] - size[i] < 0 || x[i] + size[i] >= width) {
      xSpeed[i] *= -1;
    }
    // TODO: Reverse y direction if ball hits top or bottom sides
    const height = windowWidth;
    if(x[i] - size[i] < 0 || x[i] + size[i] >= height) {
      ySpeed[i] *= -1;
    }
    // TODO: Set random R, G, B values
    //fill(r[i], g[i], b[i]);

    // TODO: Style to have no strokes
    noStroke();

    // TODO: Draw the bouncing balls
    ellipse(x[i], y[i], size[i])
  }
} 
