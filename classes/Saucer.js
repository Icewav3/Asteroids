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
    this.fireDelay = fireDelay;
    this.bullet = null;
  }

  update() {
    super.update();
    // Add any Saucer-specific update logic here
  }

  draw() {
    const wrappedX = super.screenWrap(this.position.x, width);
    const wrappedY = super.screenWrap(this.position.y, height);
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
}
