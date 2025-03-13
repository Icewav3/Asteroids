// TODO collisions not working

let player;
let asteroids;
let score;
let gameOver;
let gameWon;
let gameStarted;
let gameOverSound;
let gameWonSound;
const maxLevel = 5;
const minAsteroids = 3;
const asteroidIncrease = 2;
const defaultAsteroidSpeed = 3;
const largeAsteroidRadius = 30;
class GameManager {
  constructor() {
    this.currentLevel = 1;
    this.asteroids = [];
  }

  setup() {
    //spawn asteroids
    this.spawnAsteroids();
    //spawn player
    this.player = new Ship(
      createVector(width / 2, height / 2),
      createVector(0, 0),
      0,
      0,
      new CircleCollider(10),
      color(255, 255, 0),
      3,
      0.97,
    );
  }

  update() {
    //update player
    this.player.update();
    //check collisions
    for (let asteroid of this.asteroids) {
      if (asteroid.isActive && this.player.checkCollision(asteroid)) {
        //collision
        this.player.takeDamage(1);
        console.log("Collision detected between player and asteroid");
      }
    }
    //update asteroids
    if (this.asteroids.length >= 0) {
      for (let asteroid of this.asteroids) {
        asteroid.update();
      }
    } else {
      console.log("Level completed");
      this.currentLevel++;
      this.spawnAsteroids();
    }
  }

  draw() {
    this.player.draw();
    for (let asteroid of this.asteroids) {
      asteroid.draw();
    }
  }

  spawnAsteroids() {
    let numAsteroids = Math.max(
      minAsteroids,
      this.currentLevel * asteroidIncrease,
    );
    for (let i = 0; i < numAsteroids; i++) {
      const position = createVector(random(width), random(height));
      const velocity = createVector(
        random(-1 * defaultAsteroidSpeed, defaultAsteroidSpeed),
        random(-defaultAsteroidSpeed, defaultAsteroidSpeed),
      );
      const rotation = random(0);
      const angularVelocity = random(-1, 1);
      const collider = CircleCollider.constructCollider(largeAsteroidRadius);
      const asteroidColor = color(150);
      const asteroid = new Asteroid(
        position,
        velocity,
        rotation,
        angularVelocity,
        collider,
        asteroidColor,
        30,
      );

      this.asteroids.push(asteroid);
    }
  }
}
