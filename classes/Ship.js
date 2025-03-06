class Ship extends GameObject {
  constructor(
    position = createVector(width / 2, height / 2),
    velocity,
    rotation,
    collider,
    color,
    startingHealth,
    drag,
    isInvincible = false,
    isActive = true,
  ) {
    super(position, velocity, rotation, collider, color, drag, isActive);
    this.startingHealth = startingHealth;
    this.isInvincible = isInvincible;
    this.health = startingHealth;
    this.score = 0;
    this.lastHealthMilestone = 0;
    //this.collider = new CircleCollider(this, radius);
  }

  update() {
    super.update();
  }

  draw() {
    // Wrap the entire position of the ship
    const wrappedX = super.screenWrap(this.position.x, width);
    const wrappedY = super.screenWrap(this.position.y, height);

    push();
    fill(255, 255, 0);
    noStroke();

    // Now calculate the vertices relative to the wrapped position
    triangle(
      wrappedX,
      wrappedY - 20,
      wrappedX - 15,
      wrappedY + 10,
      wrappedX + 15,
      wrappedY + 10,
    );
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
    if (!this.isInvincible) {
      //if not invincible
      this.health -= incomingDamage;
      if (this.health <= 0) {
        this.die();
      }
      this.isInvincible = true;
      print("Invincibility timer started");
      setTimeout(() => this.invincibilityTimerCallback(), 1000);
    } else {
      print("Protected from incoming damage");
    }
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
}
