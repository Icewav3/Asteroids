class Ship extends GameObject{
    constructor(position, velocity, rotation, vertices, color, isActive, maxHealth, maxSpeed, isInvincible) {
        super(position, velocity, rotation, vertices, color, isActive);
        this.maxHealth = maxHealth;
        this.maxSpeed = maxSpeed;
        this.isInvincible = isInvincible;
    }

    update(){
        super.update();
    }
    draw(){
        super.draw();
    }
    checkPolygonCollision(gameObject){
        super.checkPolygonCollision(gameObject);
    }
    destroy(){
        super.destroy();
    }
}