var fireworks = []
var grav
var bg

function setup() {
	createCanvas(windowWidth, windowHeight)
	colorMode(HSB)
	stroke(255)
	strokeWeight(4)
	grav = createVector(0, 0.2)
}

function draw() {
	colorMode(RGB)
	// if (fireworks.length == 0){
		// background(0, 0, 0)
	// }
	
	background("rgba(0, 0, 0, 0.098)")
	
	if (random(1) < 0.03){
		fireworks.push(new Firework())
	}
	
	for (var i = fireworks.length - 1; i >= 0; i--){
		fireworks[i].update()
		fireworks[i].show()
		if (fireworks[i].done()){
			fireworks.splice(i, 1)
		}
	}
}