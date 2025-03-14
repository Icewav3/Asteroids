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
  }

  update() {
    this.handleControls();
    super.update();
  }

  draw() {
    // Wrap the entire position of the ship
    const wrappedX = super.screenWrap(this.position.x, width);
    const wrappedY = super.screenWrap(this.position.y, height);
    const wrappedPosition = createVector(wrappedX, wrappedY);
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
  respawn() {
    this.resetPosition();
    this.isActive = true;
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
      this.die();
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

  die() {
    print("Game Over");
    print("Your score was: " + this.score);
    this.isActive = false;
    this.health = this.startingHealth;
    this.score = 0;
    print("Reset score " + this.score);
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
      //TODO shoot
    }
  }
}
