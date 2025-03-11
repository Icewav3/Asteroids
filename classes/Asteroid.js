class Asteroid extends GameObject {
  /**
   * @param {p5.Vector} position
   * @param {p5.Vector} velocity
   * @param {number} rotation
   * @param {Collider} collider
   * @param {color} color
   * @param {int} size 3 = large, 2 = medium, 1 = small
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
    if (this.size >= 3) {
      //1st asteroid
      let asteroid1 = this.create(
        this.position,
        this.velocity,
        0,
        CircleCollider.constructCollider(this.collider.radius / 2),
        this.color,
        2,
      );
      //2nd asteroid
      let asteroid2 = this.create(
        this.position,
        -this.velocity,
        0,
        CircleCollider.constructCollider(this.collider.radius / 2),
        this.color,
        2,
      );
      return [asteroid1, asteroid2];
    } else if (this.size === 2) {
      //1st asteroid
      let asteroid1 = this.create(
        this.position,
        this.velocity,
        0,
        CircleCollider.constructCollider(this.collider.radius / 2),
        this.color,
        1,
      );
      //2nd asteroid
      let asteroid2 = this.create(
        this.position,
        -this.velocity,
        0,
        CircleCollider.constructCollider(this.collider.radius / 2),
        this.color,
        1,
      );
      return [asteroid1, asteroid2];
    } else if (this.size <= 1) {
      return [];
    }
    return asteroids;
  }

  checkCollision(collidingGameObject) {
    return super.checkCollision(collidingGameObject);
  }

  getPoints() {}
  //Factory Method
  static create(position, velocity, rotation, collider, color, size) {
    return new Asteroid(position, velocity, rotation, collider, color, size);
  }
}
