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
    this.lastHealthMilestone = 0;
    this.isActive = true;
    this.isInvincible = false;

    //Input variables
    this.rotationPower = rotationPower || 0.05;
    this.thrustPower = thrustPower || 0.2;
  }

  update() {
    this.handleControls();
    super.update();
  }

  draw() {
    // Wrap the entire position of the ship
    const wrappedX = super.screenWrap(this.position.x, width);
    const wrappedY = super.screenWrap(this.position.y, height);

    push();
    translate(wrappedX, wrappedY);
    fill(255, 255, 0);
    noStroke();
    rotate(this._rotation);
    triangle(0, -20, -15, 10, 15, 10);
    pop();
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
    let dead = false;
    if (!this.isInvincible) {
      //if not invincible
      this.health -= incomingDamage;
      if (this.health <= 0) {
        this.die();
        dead = true;
      }
      this.isInvincible = true;
      print("Invincibility timer started");
      setTimeout(() => this.invincibilityTimerCallback(), 3000);
    } else {
      print("Protected from incoming damage");
    }
    return dead;
  }

  invincibilityTimerCallback() {
    this.isInvincible = false;
    console.log("Invincibility timer expired");
  }

  addScore(points) {
    this.score += points;
    if (this.score >= this.lastHealthMilestone + 10000) {
      this.health += 1;
      this.lastHealthMilestone += 10000;
    }
  }

  die() {
    print("Game Over");
    print("Your score was: " + this.score);
    this.resetPosition();
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
      //todo warp
    }
  }
}
