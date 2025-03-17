let playerShip;
let playerShipRotation = 0; // Variable to store rotation for playerShip
const debug = false;
let gameManager;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameManager = new GameManager();
  gameManager.setup();
}

function draw() {
  background(220);
  gameManager.draw();
  gameManager.update();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
