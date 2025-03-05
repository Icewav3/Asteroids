let obj1, obj2;
let obj2Rotation = 0; // Variable to store rotation for obj2

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create two GameObject instances with some sample data
    obj1 = new GameObject(
        createVector(200, 200), // Position
        createVector(0, 0),     // Velocity
        0,                      // Rotation
        [
            createVector(-20, -20),
            createVector(20, -20),
            createVector(20, 20),
            createVector(-20, 20)
        ],                      // Vertices
        color(255, 0, 0),       // Color
    );

    obj2 = new GameObject(
        createVector(mouseX, mouseY), // Position (updated to start at mouse position)
        createVector(0, 0),          // Static, so no velocity
        0,                           // Rotation
        [
            createVector(-30, -30),
            createVector(30, -30),
            createVector(30, 30),
            createVector(-30, 30)
        ],                           // Vertices
        color(0, 0, 255),            // Color
    );
}

function draw() {
    background(220);

    // Update obj1's position
    obj1.update();
    obj1.draw();

    // Update obj2 to follow the mouse position and apply rotation
    obj2.position.set(mouseX, mouseY); // Follow mouse position
    obj2.rotation = obj2Rotation;     // Apply rotation
    obj2.draw();

    // Display collision debug information
    let isColliding = obj1.checkPolygonCollision(obj1, obj2);

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
}

// Listen to mouseWheel event to rotate obj2
function mouseWheel(event) {
    obj2Rotation += event.delta > 0 ? 0.1 : -0.1; // Adjust rotation by mouse wheel
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}