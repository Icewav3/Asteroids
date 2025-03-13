let playerShip;
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
  gameManager.update();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
