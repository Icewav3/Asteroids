let obj1, obj2;
let obj2Rotation = 0; // Variable to store rotation for obj2
const debug = true;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create two GameObject instances with circle colliders
    obj1 = new GameObject(
        createVector(200, 200),   // Position
        createVector(0, 0),       // Velocity
        0,                        // Rotation
        new CircleCollider(null, 30), // Circle collider with radius 30
        color(255, 0, 0)          // Color
    );
    obj1.collider.gameObject = obj1; // Connect collider to game object

    obj2 = new GameObject(
        createVector(mouseX, mouseY), // Position (updated to start at mouse position)
        createVector(0, 0),          // Static, so no velocity
        0,                           // Rotation
        new CircleCollider(null, 40), // Circle collider with radius 40
        color(0, 0, 255)             // Color
    );
    obj2.collider.gameObject = obj2; // Connect collider to game object
}

function draw() {
    background(220);

    // Update obj1's position
    obj1.update();
    obj1.draw();

    // Update obj2 to follow the mouse position and apply rotation
    obj2.position.set(mouseX, mouseY); // Follow mouse position
    obj2._rotation = obj2Rotation;     // Apply rotation (note: using _rotation from your class)
    obj2.draw();

    // Display collision debug information using the new collision system
    let isColliding = obj1.checkCollision(obj2);

    // Display collision status on the canvas
    noStroke();
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text(
        isColliding ? "Collision Detected!" : "No Collision",
        width / 2,
        height - 30
    );
    if (debug){
        // Debug logging!
        textSize(14);
        fill(0);
        text(`Object 1: x=${Math.round(obj1.position.x)}, y=${Math.round(obj1.position.y)}, radius=${obj1.collider.radius}`, 150, 30);
        text(`Object 2: x=${Math.round(obj2.position.x)}, y=${Math.round(obj2.position.y)}, radius=${obj2.collider.radius}`, 150, 50);
        text(`Distance between centers: ${Math.round(p5.Vector.dist(obj1.position, obj2.position))}`, 180, 70);
        text(`Sum of radii: ${obj1.collider.radius + obj2.collider.radius}`, 130, 90);
    }
}

function mouseWheel(event) {
    obj2Rotation += event.delta > 0 ? 0.1 : -0.1; // Adjust rotation by mouse wheel
    return false; // Prevent page scrolling
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}