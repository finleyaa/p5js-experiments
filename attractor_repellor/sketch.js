var forceObjects = []
var particles = []

function setup() {
	createCanvas(windowWidth, windowHeight)
	// for (var i = 0; i < 5; i++){
		// forceObjects.push(new ForceObject(random(width), random(height), true))
		// forceObjects.push(new ForceObject(random(width), random(height), true))
	// }
	// forceObjects.push(new ForceObject(random(width), random(height), true))
	for (var i = 0; i < 1; i++){
		particles.push(new Particle(random(width), random(height)))
	}
	// background(51)
}

function draw() {
	background(51)
	for (var i = 0; i < forceObjects.length; i++){
		forceObjects[i].show()
	}
	for (var i = 0; i < particles.length; i++){
		particles[i].checkForces(forceObjects)
		particles[i].update()
		particles[i].show()
	}
}

function mousePressed(){
	if (mouseButton == LEFT){
		forceObjects.push(new ForceObject(mouseX, mouseY, true))
	} else {
		forceObjects.push(new ForceObject(mouseX, mouseY, false))
	}
}