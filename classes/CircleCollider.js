class CircleCollider extends Collider {
  constructor(gameObject, radius) {
    super(gameObject);
    this.radius = radius;
  }

  //failsafe
  checkCollision(otherCollider) {
    if (otherCollider instanceof CircleCollider) {
      return this.checkCircleCollision(otherCollider);
    }
    return false;
  }

  checkCircleCollision(otherCircleCollider) {
    // Distance between centers
    let distance = p5.Vector.dist(
      this.gameObject.position,
      otherCircleCollider.gameObject.position,
    );
    // Sum of radii
    let radiusSum = this.radius + otherCircleCollider.radius;
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
}
