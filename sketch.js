let playerShip;
let playerShipRotation = 0; // Variable to store rotation for playerShip
const debug = false;
let gameManager;
let engineSound;
let explosionSound;
let saucerSound;
let jumpSound;
let shootSound;

function preload() {
  explosionSound = loadSound("Audio/kenney/Explosion.mp3");
  saucerSound = loadSound("Audio/kenney/Saucer.mp3");
  shootSound = loadSound("Audio/kenney/ShootSound.mp3");
  engineSound = loadSound("Audio/kenney/EngineSound.mp3");
  jumpSound = loadSound("Audio/kenney/JumpSound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameManager = new GameManager({
    explosionSound,
    saucerSound,
    shootSound,
    engineSound,
    jumpSound,
  });

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
