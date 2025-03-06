class Asteroid extends GameObject {
  /**
   * @param {p5.Vector} position
   * @param {p5.Vector} velocity
   * @param {number} rotation
   * @param {Collider} collider
   * @param {color} color
   */
  constructor(position, velocity, rotation, collider, color, size) {
    super(position, velocity, rotation, collider, color, isActive);
    this.size = size;
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
  }

  split() {
    if (this.size > 1) {
    }
  }

  getPoints() {}
}
