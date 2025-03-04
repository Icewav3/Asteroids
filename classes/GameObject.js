class GameObject {
    /**
     * Creates a new instance of the object with the specified parameters.
     *
     * @param {p5.Vector} position - The position of the object as a vector.
     * @param {p5.Vector} [velocity=createVector(0, 0)] - The velocity of the object as a vector. Defaults to a vector with zero magnitude.
     * @param {number} rotation - The rotation of the object in radians or degrees.
     * @param {list} vertices - The vertices of the polygon
     * @param {boolean} isActive - Indicates whether the object is active.
     */
  constructor(position, velocity = createVector(0, 0), rotation, vertices, color, isActive){
    this.position = position;
    this.velocity = velocity;
    this._rotation = rotation;
    this.vertices = vertices;
    this.normals = normals; //todo
    this.color = color;
    this._isActive = isActive;
    }

    update(){
      if(this._isActive){
          this.position += this.velocity;
      }
    }

    draw(){
      if(this._isActive){
        push();
        fill(this.color);
        beginShape();
        for (let v of this.vertices) {
          vertex(v.x + this.position.x, v.y + this.position.y);
        }
        endShape(CLOSE);
        pop();
      }
    }

    checkPolygonCollision(gameObject){
      let min = Infinity, max = -Infinity;

      for (let v of gameObject.vertices) {
        let projection = v.add(this.position).dot(this.normal); // Project the vertex onto the axis
        if (projection < min) min = projection;
        if (projection > max) max = projection;
      }

      return [min, max]; // Return the min/max projection range
    }

    destroy(){

    }
}