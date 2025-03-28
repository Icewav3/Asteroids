let player;
let asteroids = [];
let saucers = [];
let score;
let gameState = "mainMenu";
let currentLevel = 1;
const maxLevel = 5;
const minAsteroids = 3;
const asteroidIncrease = 2;
const defaultAsteroidSpeed = 1;
const largeAsteroidRadius = 30;
const mediumAsteroidRadius = 20;
const smallAsteroidRadius = 10;

let lastSaucerWave = 500;
let saucerWaveScoreInterval = 500;
const smallSaucerSize = 1;
const bigSaucerSize = 2;
const chanceOfSmallSaucer = 0.3;
//screenshake
let screenShake = false;
let screenShakeDuration = 100;
let screenShakeTimer;
//tutorial
let tutorialPassed = false;

class GameManager {
  constructor() {
    this.currentLevel = 1;
    this.asteroids = [];
    this.explosionSound = explosionSound;
    this.saucerSound = saucerSound;
    this.shootSound = shootSound;
    this.engineSound = engineSound;
    this.jumpSound = jumpSound;
    //key icons
    this.keyW = keyW;
    this.keyA = keyA;
    this.KeyD = keyD;
    this.keyS = keyS;
    this.keySpace = keySpace;
  }

  setup() {
    explosionSound.setVolume(0.3);
    saucerSound.setVolume(0.2);
    shootSound.setVolume(0.3);
    engineSound.setVolume(0.2);
    jumpSound.setVolume(0.5);

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
      0.2,
      0.05,
      jumpSound,
      engineSound,
      shootSound,
    );
  }

  update() {
    if (gameState === "mainMenu") {
      this.mainMenu();
    } else if (gameState === "gameOver") {
      this.gameOverMenu();
    } else if (gameState === "play") {
      if (tutorialPassed) {
        this.gameLoop();
      } else {
        this.tutorial();
      }
    }
  }

  tutorial() {
    // Set background
    background(0);

    // Title for the tutorial section
    fill(255);
    textSize(36);
    textAlign(CENTER, TOP);
    text("Controls", width / 2, 50);

    // Load and display keyboard images with descriptions
    const imageWidth = 100;
    const imageHeight = 100;
    const spacing = 120; // Vertical spacing between controls
    const startY = 150; // Starting Y position for the first control
    const textOffsetX = 150; // Horizontal distance between image and text

    // A key
    image(
      keyA,
      width / 2 - textOffsetX - imageWidth / 2,
      startY,
      imageWidth,
      imageHeight,
    );
    fill(255);
    textSize(24);
    textAlign(LEFT, CENTER);
    text("Turns left", width / 2 - textOffsetX / 2, startY + imageHeight / 2);

    // D key
    image(
      keyD,
      width / 2 - textOffsetX - imageWidth / 2,
      startY + spacing,
      imageWidth,
      imageHeight,
    );
    text(
      "Turns right",
      width / 2 - textOffsetX / 2,
      startY + spacing + imageHeight / 2,
    );

    // W key
    image(
      keyW,
      width / 2 - textOffsetX - imageWidth / 2,
      startY + spacing * 2,
      imageWidth,
      imageHeight,
    );
    text(
      "Thrusts forward",
      width / 2 - textOffsetX / 2,
      startY + spacing * 2 + imageHeight / 2,
    );

    // S key
    image(
      keyS,
      width / 2 - textOffsetX - imageWidth / 2,
      startY + spacing * 3,
      imageWidth,
      imageHeight,
    );
    text(
      "Teleports to a random location",
      width / 2 - textOffsetX / 2,
      startY + spacing * 3 + imageHeight / 2,
    );

    // Space
    image(
      keySpace,
      width / 2 - textOffsetX - imageWidth / 2,
      startY + spacing * 4,
      imageWidth,
      imageHeight,
    );
    text(
      "Shoots a bullet",
      width / 2 - textOffsetX / 2,
      startY + spacing * 4 + imageHeight / 2,
    );

    // Play button
    const buttonWidth = 200;
    const buttonHeight = 60;
    const buttonX = width / 2 - buttonWidth / 2;
    const buttonY = startY + spacing * 5 + 20;

    fill(0, 200, 0);
    rect(buttonX, buttonY, buttonWidth, buttonHeight);

    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Start Game", width / 2, buttonY + buttonHeight / 2);

    // button
    if (
      mouseIsPressed &&
      mouseX > buttonX &&
      mouseX < buttonX + buttonWidth &&
      mouseY > buttonY &&
      mouseY < buttonY + buttonHeight
    ) {
      tutorialPassed = true;
      this.player.respawn();
    }
  }
  gameLoop() {
    this.gameHud();
    //update player

    this.player.update();
    // check saucer spawn condition
    if (this.player.score >= lastSaucerWave) {
      lastSaucerWave += saucerWaveScoreInterval;
      this.spawnSaucers();
    }
    this.updateSaucers();
    //check collisions
    for (let i = this.asteroids.length - 1; i >= 0; i--) {
      const asteroid = this.asteroids[i];
      //UPDATE ASTEROIDS LIST
      this.updateAsteroidsList(asteroid, i);
      //PLAYER'S BULLETS COLLISION CHECKING
      this.checkPlayerBulletCollision(asteroid);
      //PLAYER ASTEROID COLLISION
      this.checkPlayerAsteroidCollision(asteroid);
      this.checkSaucerAsteroidCollision(asteroid);
    }
    //update asteroids
    if (!this.player.isActive) {
      //console.log("Game Over");
      gameState = "gameOver";
    } else if (this.asteroids.length > 0) {
      for (let asteroid of this.asteroids) {
        asteroid.update();
      }
    } else {
      //console.log("Level completed");
      currentLevel++;
      this.spawnAsteroids();
    }
  }

  draw() {
    if (screenShake) {
      translate(random(0, 6), random(0, 6));
    }
    this.player.draw();
    for (let asteroid of this.asteroids) {
      asteroid.draw();
    }
    // Draw saucers
    if (saucers && saucers.length > 0) {
      for (let saucer of saucers) {
        saucer.draw();
      }
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
      this.resetGame();
      //scene transition
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

  checkPlayerBulletCollision(object) {
    this.player.bullets.forEach((bullet) => {
      bullet.checkCollision(object);
    });
  }
  checkPlayerAsteroidCollision(asteroid) {
    if (this.player.checkCollision(asteroid) && !this.player.isInvincible) {
      this.player.takeDamage(1);
      this.startScreenShake();
      asteroid.isActive = false;
      //console.log("Collision detected between player and asteroid");
    }
  }
  updateAsteroidsList(asteroid, index) {
    if (!asteroid.isActive) {
      const splitAsteroids = asteroid.destroy();
      //add split asteroids to the list
      explosionSound.play();
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

  spawnSaucers() {
    //diceroll
    const isBigSaucer = random() > chanceOfSmallSaucer;
    const spawnAtEdge = random() > 0.5 ? 0 : width;
    const position = createVector(spawnAtEdge, random(height));

    // move across screen
    const velocityDirection = spawnAtEdge === 0 ? 1 : -1;
    const velocity = createVector(
      velocityDirection * random(1, 2),
      random(-0.5, 0.5),
    );

    const saucerSize = isBigSaucer ? bigSaucerSize : smallSaucerSize;
    const saucerColor = isBigSaucer ? color(255, 165, 0) : color(255, 0, 0);
    // Orange for big, red for small
    const colliderSize = isBigSaucer ? 30 : 15;
    const collider = CircleCollider.constructCollider(colliderSize);

    const shootDelay = 3000;

    // Create new saucer
    const saucer = new Saucer(
      position,
      velocity,
      0,
      0,
      collider,
      saucerColor,
      1,
      true,
      saucerSize,
      shootDelay,
    );
    saucers.push(saucer);
  }

  updateSaucers() {
    // Don't proceed if no saucers exist
    if (!saucers || saucers.length === 0) {
      return;
    }

    // Update each saucer and check for collisions
    for (let i = saucers.length - 1; i >= 0; i--) {
      const saucer = saucers[i];

      // Update saucer position and behavior
      saucer.update();
      saucer.tryShoot(this.player);

      // Check if player's bullets hit the saucer
      this.checkPlayerBulletCollision(saucer);

      // Check if saucer bullets hit the player
      if (saucer.bullets) {
        saucer.bullets.forEach((bullet) => {
          if (this.player.checkCollision(bullet) && !this.player.isInvincible) {
            this.player.takeDamage(1);
            this.startScreenShake();
            bullet.isActive = false;
          }
        });
      }

      // Check if saucer collides with player
      if (this.player.checkCollision(saucer) && !this.player.isInvincible) {
        this.player.takeDamage(1);
        this.startScreenShake();
        saucer.isActive = false;
      }

      // Remove inactive saucers
      if (!saucer.isActive) {
        saucer.destroy();
        this.explosionSound.play();
        const points = saucer.size > 1 ? 200 : 500;
        this.player.addScore(points);
        saucers.splice(i, 1);
      }
    }
  }

  checkSaucerAsteroidCollision(asteroid) {
    if (!saucers || saucers.length === 0) {
      saucerSound.stop();
      return;
    }
    if (!saucerSound.isPlaying()) {
      saucerSound.play();
    }

    for (let i = saucers.length - 1; i >= 0; i--) {
      const saucer = saucers[i];

      // Check collision between saucer and asteroid
      if (saucer.checkCollision(asteroid)) {
        saucer.isActive = false;
        asteroid.isActive = false;
      }

      // Check collision between saucer bullets and asteroids
      if (saucer.bullets) {
        saucer.bullets.forEach((bullet) => {
          if (bullet.checkCollision(asteroid)) {
            bullet.isActive = false;
            asteroid.isActive = false;
          }
        });
      }
    }
  }

  resetGame() {
    this.player.respawn();
    this.spawnAsteroids();
    this.currentLevel = 1;
    lastSaucerWave = 500;
    asteroids = [];
    saucers = [];
  }

  startScreenShake() {
    screenShake = true;
    screenShakeTimer = setTimeout(() => {
      this.screenShakeCallback();
    }, screenShakeDuration);
  }

  screenShakeCallback() {
    screenShake = false;
    clearTimeout(this.screenShakeTimer);
  }
}
