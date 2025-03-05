// noinspection JSSuspiciousNameCombination

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
    constructor(position, velocity = createVector(0, 0), rotation, vertices, color, isActive = true) {
        this.position = position;
        this.velocity = velocity;
        this._rotation = rotation;
        this.vertices = vertices;
        this.color = color;
        this._isActive = isActive;

        this.normals = this.calculateNormals();
    }

    update() {
        if (this._isActive) {
            this.position = p5.Vector.add(this.position, this.velocity);
            //print(this.velocity)
        }
        else{
          print("This object isn't active dumbass")
        }
    }

    draw() {
        if (this._isActive) {
            push();
            fill(this.color);
            beginShape();
            for (let v of this.vertices) {
                vertex(v.x + this.position.x, v.y + this.position.y);
            }
            endShape(CLOSE);
            pop();
        }
        else{
          print("This object isn't active dumbass")
        }
    }

    calculateNormals() {
        let normals = [];
        for (let i = 0; i < this.vertices.length; i++) {
            // Get current vertex and next vertex
            let current = this.vertices[i];
            let next = this.vertices[(i + 1) % this.vertices.length];

            // Calculate edge vector
            let edge = p5.Vector.sub(next, current);

            // Calculate normal (perpendicular vector)
            let normal = createVector(-edge.y, edge.x).normalize();
            normals.push(normal);
        }
        return normals;
    }

    checkPolygonCollision(self, collidingGameObject) {
        let isColliding = true;
        let min1 = Infinity, max1 = -Infinity;
        let min2 = Infinity, max2 = -Infinity;
        let combinedNormals = self.normals.concat(collidingGameObject.normals);
        for (let i = 0; i < self.normals.length; i++) {
            for (let v of self.vertices) {
                let projection =  p5.Vector.add(v, self.position).dot(combinedNormals[i]); // Project the vertex onto
                // the axis
                if (projection < min1) min1 = projection;
                if (projection > max1) max1 = projection;
            }
            for (let v of collidingGameObject.vertices) {
                let projection =  p5.Vector.add(v, collidingGameObject.position).dot(combinedNormals[i]); // Project the vertex onto
                // the axis
                if (projection < min2) min2 = projection;
                if (projection > max2) max2 = projection;
            }
            isColliding &&= ((min1 < max2 && min1 > min2) || (min2 < max1 && min2 > min1))//&&= === (var = bool && bool)
        }
        return isColliding;
    }
}