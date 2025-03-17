class Ship extends GameObject {
  constructor(
    position = createVector(width / 2, height / 2),
    velocity,
    rotation,
    angularVelocity,
    collider,
    color,
    startingHealth,
    drag,
    thrustPower,
    rotationPower,
  ) {
    super(position, velocity, rotation, angularVelocity, collider, color, drag);
    this.startingHealth = startingHealth;
    this.health = startingHealth;
    this.score = 0;
    this.lastHealthMilestone = 10000;
    this.isActive = true;
    this.isInvincible = false;

    //Input variables
    this.rotationPower = rotationPower || 0.05;
    this.thrustPower = thrustPower || 0.2;
    this.invincibilityTime = 3000;
    this.shootDelay = 1000;
    this.bulletLifetime = 1000;
    this.bulletVelocityMult = 10;
    this.bullets = [];
    this.canShoot = true;
  }

  update() {
    this.handleControls();
    this.updateBullets();
    super.update();
  }

  draw() {
    // Wrap the entire position of the ship
    const wrappedX = super.screenWrap(this.position.x, width);
    const wrappedY = super.screenWrap(this.position.y, height);
    const wrappedPosition = createVector(wrappedX, wrappedY);
    this.drawBullets();

    push();
    translate(wrappedX, wrappedY);
    fill(255, 255, 0);
    noStroke();
    rotate(this._rotation);
    //if invincible blink
    if (!this.isInvincible) {
      fill(255, 255, 0);
      noStroke();
    } else {
      noFill();
      stroke(255, 255, 0);
    }
    triangle(0, -20, -15, 10, 15, 10);
    //debug:
    //this.collider.draw(wrappedPosition);
    pop();
  }

  getScore() {
    return this.score;
  }
  respawn() {
    this.resetPosition();
    this.isActive = true;
    this.health = this.startingHealth;
    this.score = 0;
  }
  resetPosition() {
    this.position = new p5.Vector(width / 2, height / 2);
    this.velocity = new p5.Vector(0, 0);
    this._rotation = 0;
  }

  /**
   * @param collidingGameObject {GameObject}
   * @returns {boolean}
   */
  checkCollision(collidingGameObject) {
    return super.checkCollision(collidingGameObject);
  }

  takeDamage(incomingDamage) {
    console.log("Incoming damage: " + incomingDamage);
    console.log("Health before: " + this.health);
    this.health -= incomingDamage;
    console.log("Health after: " + this.health);

    if (this.health <= 0) {
      this.isActive = false;
    }

    this.isInvincible = true;
    this.invincibilityTimer();
  }
  invincibilityTimer() {
    this.isInvincible = true;
    print("Invincibility timer started");
    setTimeout(() => this.invincibilityTimerCallback(), this.invincibilityTime);
  }

  invincibilityTimerCallback() {
    this.isInvincible = false;
    console.log("Invincibility timer expired");
  }

  addScore(points) {
    this.score += points;
    if (this.score >= this.lastHealthMilestone) {
      this.health += 1;
      this.lastHealthMilestone += 10000;
    }
  }

  // Bullets
  shoot() {
    if (this.canShoot) {
      this.canShoot = false;
      this.timerId = setTimeout(() => {
        this.shootCallback();
      }, this.shootDelay);
      // Calculate vector
      let bulletVector = p5.Vector.fromAngle(this._rotation - PI / 2);
      // Set position
      let bulletPosition = bulletVector.copy();
      // Move bullet to the tip of the playership
      bulletPosition.mult(20);
      // Add ship position
      bulletPosition.add(this.position);
      // Calculate velocity
      let bulletVelocity = bulletVector.copy();
      //Mult by multiplier
      bulletVelocity.mult(this.bulletVelocityMult);

      let bullet = new Bullet(
        bulletPosition,
        bulletVelocity,
        this._rotation,
        0,
        CircleCollider.constructCollider(3),
        "yellow",
        1,
        true,
        this.bulletLifetime,
      );
      this.bullets.push(bullet);
    }
  }

  shootCallback() {
    this.canShoot = true;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  updateBullets() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      if (bullet.isActive) {
        bullet.update();
      } else {
        this.bullets.splice(i, 1);
      }
    }
  }

  drawBullets() {
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw();
    }
  }

  handleControls() {
    // A
    if (keyIsDown(65)) {
      this._rotation -= this.rotationPower;
    }
    // D
    if (keyIsDown(68)) {
      this._rotation += this.rotationPower;
    }
    // W
    if (keyIsDown(87)) {
      let thrust = p5.Vector.fromAngle(this._rotation - PI / 2);
      thrust.mult(this.thrustPower);
      this.velocity.add(thrust);
    }
    // S
    if (keyIsDown(83)) {
      //TODO warp
    }

    // Space
    if (keyIsDown(32)) {
      this.shoot();
    }
  }
}
