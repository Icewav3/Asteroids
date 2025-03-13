class Asteroid extends GameObject {
  /**
   * @param {p5.Vector} position
   * @param {p5.Vector} velocity
   * @param {number} rotation
   * @param {float} angularVelocity
   * @param {Collider} collider
   * @param {color} color
   * @param {int} size 30 = large, 20 = medium, 10 = small
   * @param {boolean} isActive
   */
  constructor(
    position,
    velocity,
    rotation,
    angularVelocity,
    collider,
    color,
    size,
    isActive = true,
  ) {
    super(
      position,
      velocity,
      rotation,
      angularVelocity,
      collider,
      color,
      1,
      isActive,
    );
    this.size = size;
  }

  draw() {
    super.draw();
  }

  update() {
    super.update();
  }

  split() {
    if (this.size >= 30) {
      //1st asteroid
      let asteroid1 = Asteroid.createAsteroid(
        this.position,
        this.velocity.mult(2),
        0,
        random(-1, 1),
        CircleCollider.constructCollider(this.collider.radius / 2),
        this.color,
        20,
      );
      //2nd asteroid
      let asteroid2 = Asteroid.createAsteroid(
        this.position,
        this.velocity.mult(-2),
        0,
        random(-1, 1),
        CircleCollider.constructCollider(this.collider.radius / 2),
        this.color,
        20,
      );
      return [asteroid1, asteroid2];
    } else if (this.size === 20) {
      //1st asteroid
      let asteroid1 = Asteroid.createAsteroid(
        this.position,
        this.velocity,
        0,
        random(-1, 1),
        CircleCollider.constructCollider(this.collider.radius / 2),
        this.color,
        10,
      );
      //2nd asteroid
      let asteroid2 = Asteroid.createAsteroid(
        this.position,
        this.velocity.mult(-1),
        0,
        random(-1, 1),
        CircleCollider.constructCollider(this.collider.radius / 2),
        this.color,
        10,
      );
      return [asteroid1, asteroid2];
    } else if (this.size <= 10) {
      return [];
    }
    return asteroids;
  }

  checkCollision(collidingGameObject) {
    return super.checkCollision(collidingGameObject);
  }

  getPoints() {}
  //Factory Method
  static createAsteroid(
    position,
    velocity,
    rotation,
    angularVelocity,
    collider,
    color,
    size,
  ) {
    return new Asteroid(
      position,
      velocity,
      rotation,
      angularVelocity,
      collider,
      color,
      size,
    );
  }
}
