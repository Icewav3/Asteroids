class GameObject {
    /**
     * Creates a new instance of the object with the specified parameters.
     *
     * @param {p5.Vector} position - The position of the object as a vector.
     * @param {p5.Vector} [velocity=createVector(0, 0)] - The velocity of the object as a vector. Defaults to a vector with zero magnitude.
     * @param {number} rotation - The rotation of the object in radians or degrees.
     * @param {number} radius - The radius of the object.
     * @param {boolean} isActive - Indicates whether the object is active.
     */
  constructor(position, velocity = createVector(0, 0), rotation, radius, isActive){
    this.position = position;
    this.velocity = velocity;
    this._rotation = rotation;
    this._radius = radius;
    this._isActive = isActive;
    }
}