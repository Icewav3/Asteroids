class Saucer extends GameObject {
  /**
   * Creates a new instance of Saucer.
   *
   * @param {p5.Vector} position - The position of the saucer as a vector.
   * @param {p5.Vector} [velocity=createVector(0, 0)] - The velocity of the saucer as a vector.
   * @param {number} [rotation=0] - The rotation of the saucer in radians or degrees.
   * @param {number} [angularVelocity=0] - The angular velocity of the saucer.
   * @param {Collider} [collider=CircleCollider.constructCollider(10)] - The collider for this saucer.
   * @param {color} [color] - The color of the saucer.
   * @param {float} [drag=1] - The drag applied to the saucer's movement.
   * @param {boolean} [isActive=true] - Indicates whether the saucer is active.
   * @param {number} [size=1] - Scale factor for the saucer's size
   * @param {number} [fireDelay=3] - Time in seconds between shots
   */
  constructor(
    position,
    velocity = createVector(0, 0),
    rotation = 0,
    angularVelocity = 0,
    collider = CircleCollider.constructCollider(10),
    color,
    drag = 1,
    isActive = true,
    size = 1,
    fireDelay = 3,
  ) {
    super(
      position,
      velocity,
      rotation,
      angularVelocity,
      collider,
      color,
      drag,
      isActive,
    );
    this.size = size;
    this.shootDelay = 1000;
    this.bulletLifetime = 1000;
    this.bulletVelocityMult = 10;
    this.bullets = [];
    this.canShoot = true;
  }

  update() {
    super.update();
    this.updateBullets();
  }

  draw() {
    const wrappedX = super.screenWrap(this.position.x, width);
    const wrappedY = super.screenWrap(this.position.y, height);
    this.drawBullets();
    push();
    noStroke();
    fill(this.color || "orange");

    // Body of the saucer (ellipse)
    ellipse(wrappedX, wrappedY, 40, 20 * this.size);

    // Dome of the saucer (smaller ellipse)
    fill("lightblue");
    ellipse(wrappedX, wrappedY - 8 * this.size, 20 * this.size, 10 * this.size);
    pop();
  }

  checkCollision(collidingGameObject) {
    return super.checkCollision(collidingGameObject);
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
}
