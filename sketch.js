let obj1, playerShip;
let playerShipRotation = 0; // Variable to store rotation for playerShip
const debug = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create two GameObject instances with circle colliders
  obj1 = new GameObject(
    createVector(200, 200), // Position
    createVector(0, 2), // Velocity
    0, // Rotation
    new CircleCollider(null, 30), // Circle collider with radius 30
    color(255, 0, 0), // Color
  );
  obj1.collider.gameObject = obj1; // Connect collider to game object

  playerShip = new Ship(
    createVector(width / 2, height / 2), // Position (updated to start at mouse position)
    createVector(0, -5), // Static, so no velocity
    0, // Rotation
    new CircleCollider(null, 40), // Circle collider with radius 40
    color(0, 255, 0), // Color
    3,
    1,
  );
  playerShip.collider.gameObject = playerShip; // Connect collider to game object
  playerShip.score = 100;
  print(
    "current score: " +
      playerShip.score +
      " current health: " +
      playerShip.health +
      "",
  );
  print("Adding score to player");
  playerShip.addScore(10000);
  print("Added score to player");
  print(
    "current score: " +
      playerShip.score +
      " current health: " +
      playerShip.health +
      "",
  );
}

function draw() {
  background(220);

  // Update obj1's position
  obj1.update();
  obj1.draw();
  playerShip.update();
  playerShip._rotation = playerShipRotation;
  playerShip.draw();
  print(obj1);
  let isColliding = obj1.checkCollision(playerShip);

  if (isColliding) {
    playerShip.takeDamage(1);
  }
  noStroke();
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text(
    isColliding ? "Collision Detected!" : "No Collision",
    width / 2,
    height - 30,
  );
  if (debug) {
    // Debug logging!
    textSize(14);
    fill(0);
    text(
      `Object 1: x=${Math.round(obj1.position.x)}, y=${Math.round(obj1.position.y)}, radius=${obj1.collider.radius}`,
      150,
      30,
    );
    text(
      `Object 2: x=${Math.round(playerShip.position.x)}, y=${Math.round(playerShip.position.y)}, radius=${playerShip.collider.radius}`,
      150,
      50,
    );
    text(
      `Distance between centers: ${Math.round(p5.Vector.dist(obj1.position, playerShip.position))}`,
      180,
      70,
    );
    text(
      `Sum of radii: ${obj1.collider.radius + playerShip.collider.radius}`,
      130,
      90,
    );
  }
}

function mouseWheel(event) {
  playerShipRotation += event.delta > 0 ? 0.1 : -0.1; // Adjust rotation by mouse wheel
  return false; // Prevent page scrolling
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
