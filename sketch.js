let obj1, playerShip;
let playerShipRotation = 0; // Variable to store rotation for playerShip
const debug = false;
let gameManager;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameManager = new GameManager();
  gameManager.setup();

  gameManager.player.score = 100;
  print(
    "current score: " +
      gameManager.player.score +
      " current health: " +
      gameManager.player.health +
      "",
  );
  print("Adding score to player");
  gameManager.player.addScore(10000);
  print("Added score to player");
  print(
    "current score: " +
      gameManager.player.score +
      " current health: " +
      gameManager.player.health +
      "",
  );
}

function draw() {
  background(220);
  gameManager.draw();
}

function mouseWheel(event) {
  playerShipRotation += event.delta > 0 ? 0.1 : -0.1; // Adjust rotation by mouse wheel
  return false; // Prevent page scrolling
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
