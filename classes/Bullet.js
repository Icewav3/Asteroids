class Bullet extends GameObject {
  /**
   * Creates a new instance of Bullet with the specified parameters.
   *
   * @param {p5.Vector} position - The position of the bullet as a vector.
   * @param {p5.Vector} [velocity=createVector(0, 0)] - The velocity of the bullet as a vector. Defaults to a vector with zero magnitude.
   * @param {number} rotation - The rotation of the bullet in radians or degrees.
   * @param {number} angularVelocity - The angular velocity of the bullet.
   * @param {Collider} collider - The collider for this bullet.
   * @param {color} color - The color of the bullet.
   * @param {float} drag - The drag coefficient for the bullet.
   * @param {boolean} isActive - Indicates whether the bullet is active.
   */
  constructor(
    position,
    velocity = createVector(0, 0),
    rotation = 0,
    angularVelocity = 0,
    collider = CircleCollider.constructCollider(5), // Smaller default collider for bullets
    color,
    drag = 1,
    isActive = true,
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

    // Add any bullet-specific properties here
  }

  getPosition() {
    return super.getPosition();
  }

  getRotation() {
    return super.getRotation();
  }

  getVelocity() {
    return super.getVelocity();
  }

  update() {
    super.update();
    // Add any bullet-specific update logic here
  }

  draw() {
    super.draw();
    // Add any bullet-specific drawing logic here
  }

  checkCollision(collidingGameObject) {
    return super.checkCollision(collidingGameObject);
  }

  screenWrap(value, max) {
    return super.screenWrap(value, max);
  }
}
