var mousePos, pos, vel, drag, strength, target

function setup() {
	createCanvas(windowWidth, windowHeight)
	mousePos = createVector(0, 0)
	target = createVector(0, 0)
	pos = createVector(0, 0)
	vel = createVector(0, 0)
	
	drag = 0.76 // take some of the spring force away
	strength = 0.1 // stronger springs have lower spring force
}

function draw() {
	background("rgba(16, 0, 0, 0.4)")
	
	mousePos.set(mouseX, mouseY)
	target = mousePos // we are trying to reach the mouse position
	
	var force = p5.Vector.sub(target, pos) // get the distance between the balls current position and the mouse
	force.mult(strength) // the higher the strength, the lower the force
	vel.mult(drag) // remove the velocity from the spring over time
	vel.add(force)
	pos.add(vel)
	
	ellipse(pos.x, pos.y, 50)
}