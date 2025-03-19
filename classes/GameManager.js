let player;
let asteroids;
let saucers;
let score;
let gameState = "mainMenu";
let gameStarted;
let gameOverSound;
let gameWonSound;
const maxLevel = 5;
const minAsteroids = 3;
const asteroidIncrease = 2;
const defaultAsteroidSpeed = 1;
const largeAsteroidRadius = 30;
const mediumAsteroidRadius = 20;
const smallAsteroidRadius = 10;

let saucerWave = 1;
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
    if (gameState === "mainMenu") {
      this.mainMenu();
    } else if (gameState === "gameOver") {
      this.gameOverMenu();
    } else if (gameState === "play") {
      this.gameHud();
      //update player
      this.player.update();
      //check collisions
      for (let i = this.asteroids.length - 1; i >= 0; i--) {
        const asteroid = this.asteroids[i];
        //UPDATE ASTEROIDS LIST
        this.updateAsteroidsList(asteroid, i);
        //PLAYER'S BULLETS COLLISION CHECKING
        this.checkPlayerBulletCollision(asteroid);
        //PLAYER ASTEROID COLLISION
        this.checkPlayerAsteroidCollision(asteroid);
      }
      //update asteroids
      if (!this.player.isActive) {
        console.log("Game Over");
        gameState = "gameOver";
      } else if (this.asteroids.length >= 0) {
        for (let asteroid of this.asteroids) {
          asteroid.update();
        }
      } else {
        console.log("Level completed");
        this.currentLevel++;
        this.spawnAsteroids();
      }
    }
  }

  draw() {
    this.player.draw();
    for (let asteroid of this.asteroids) {
      asteroid.draw();
    }
  }

  spawnAsteroids() {
    this.asteroids = [];
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
  mainMenu() {
    background(0);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(48);
    text("Asteroids", width / 2, height / 3);

    // Draw play button
    const buttonWidth = 200;
    const buttonHeight = 60;
    const buttonX = width / 2 - buttonWidth / 2;
    const buttonY = height / 2;

    fill(0, 200, 0);
    rect(buttonX, buttonY, buttonWidth, buttonHeight);

    fill(255);
    textSize(24);
    text("Play", width / 2, buttonY + buttonHeight / 2);

    // Handle mouse press for play button
    if (
      mouseIsPressed &&
      mouseX > buttonX &&
      mouseX < buttonX + buttonWidth &&
      mouseY > buttonY &&
      mouseY < buttonY + buttonHeight
    ) {
      gameState = "play";
    }
  }

  gameOverMenu() {
    background(0);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(48);
    text("Final Score: " + this.player.getScore(), width / 2, height / 3);

    // Draw play button
    const buttonWidth = 200;
    const buttonHeight = 60;
    const buttonX = width / 2 - buttonWidth / 2;
    const buttonY = height / 2;

    fill(0, 200, 0);
    rect(buttonX, buttonY, buttonWidth, buttonHeight);

    fill(255);
    textSize(24);
    text("Retry", width / 2, buttonY + buttonHeight / 2);

    // Handle mouse press for play button
    if (
      mouseIsPressed &&
      mouseX > buttonX &&
      mouseX < buttonX + buttonWidth &&
      mouseY > buttonY &&
      mouseY < buttonY + buttonHeight
    ) {
      //scene transition
      this.player.respawn();
      this.spawnAsteroids();
      this.currentLevel = 1;
      gameState = "play";
    }
  }

  gameHud() {
    push();
    textAlign(CENTER, TOP);
    fill(0);
    textSize(24);
    text("Score: " + this.player.score, width / 2, 20);
    text("Health: " + this.player.health, width / 2, 50);
    pop();
  }

  spawnSaucers() {
    return;
  }

  checkPlayerBulletCollision(object) {
    this.player.bullets.forEach((bullet) => {
      bullet.checkCollision(object);
    });
  }
  checkPlayerAsteroidCollision(asteroid) {
    if (this.player.checkCollision(asteroid) && !this.player.isInvincible) {
      this.player.takeDamage(1);
      asteroid.isActive = false;
      console.log("Collision detected between player and asteroid");
    }
  }
  updateAsteroidsList(asteroid, index) {
    if (!asteroid.isActive) {
      const splitAsteroids = asteroid.destroy();
      //add split asteroids to the list
      if (splitAsteroids && splitAsteroids.length > 0) {
        this.asteroids.push(...splitAsteroids);
        // "..." = COOL OPERATOR THAT SPREADS THEM
      }
      let score = asteroid.getScore();
      this.player.addScore(score);
      //remove the asteroid that was split
      this.asteroids.splice(index, 1);
    }
  }
}
