let player;
let asteroids = [];
let score;
let gameOver;
let gameWon;
let gameStarted;
let gameOverSound;
let gameWonSound;
let currentLevel;
const maxLevel = 5;
const minAsteroids = 3;
const asteroidIncrease = 2;
const defaultAsteroidSpeed = 1;
const largeAsteroidRadius = 3;
class GameManager {
  constructor() {
    this.setup();
  }

  setup() {
    //spawn asteroids
    this.spawnAsteroids();
    //spawn player
    this.player = new Ship(
      createVector(width / 2, height / 2),
      createVector(0, 0),
      0,
      new CircleCollider(this, 10),
      color(255, 255, 0),
      3,
      0.95,
    );
  }

  update() {
    for (let asteroid of this.asteroids) {
      if (
        this.asteroid.isActive &&
        this.player.isActive &&
        this.player.checkCollision(asteroid)
      ) {
        //collision
        this.player.takeDamage(1);
        console.log("Collision detected between player and asteroid");
      }
    }
  }

  spawnAsteroids() {
    let numAsteroids = Math.max(minAsteroids, currentLevel * asteroidIncrease);
    for (let i = 0; i < numAsteroids; i++) {
      const position = createVector(random(width), random(height));
      const velocity = createVector(
        random(-1 * defaultAsteroidSpeed, defaultAsteroidSpeed),
        random(-defaultAsteroidSpeed, defaultAsteroidSpeed),
      );
      const rotation = random(0);
      const collider = CircleCollider.constructCollider(largeAsteroidRadius);
      const color = color(150);
      const asteroid = new Asteroid(
        position,
        velocity,
        rotation,
        collider,
        color,
        3,
      );

      this.asteroids.push(asteroid);
    }
  }
}
