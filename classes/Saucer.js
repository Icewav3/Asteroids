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
    // Add any Saucer-specific properties here
  }

  update() {
    super.update();
    // Add any Saucer-specific update logic here
  }

  draw() {
    // Draw a simple saucer
    push();
    noStroke();
    fill(this.color || "gray"); // Use the color if provided, otherwise default to gray

    // Body of the saucer (ellipse)
    ellipse(this.position.x, this.position.y, 40, 20);

    // Dome of the saucer (smaller ellipse)
    fill("lightblue");
    ellipse(this.position.x, this.position.y - 8, 20, 10);
    pop();
  }

  checkCollision(collidingGameObject) {
    return super.checkCollision(collidingGameObject);
  }
}
