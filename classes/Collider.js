class Collider {
    constructor(gameObject) {
        this.gameObject = gameObject;
    }

    // To be implemented by derived classes
    checkCollision(otherCollider) {
        throw new Error("Method checkCollision must be implemented by derived classes");
    }
}
