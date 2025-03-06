class CircleCollider extends Collider {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  //failsafe
  checkCollision(position, otherGameObject) {
    if (otherGameObject.collider instanceof CircleCollider) {
      return this.checkCircleCollision(position, otherGameObject);
    }
    return false;
  }

  checkCircleCollision(position, otherGameObject) {
    // Distance between centers
    let distance = p5.Vector.dist(position, otherGameObject.position);
    // Sum of radii
    let radiusSum = this.radius + otherGameObject.collider.radius;
    // Collision if distance is less than sum of radii
    //todo wtf is this
    return distance < radiusSum;
  }

  draw(color) {
    push();
    stroke(color || 255);
    noFill();
    circle(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.radius * 2,
    );
    pop();
  }

  static constructCollider(radius) {
    return new CircleCollider(radius);
  }
}
