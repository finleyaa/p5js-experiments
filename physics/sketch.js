var particles = []
var waterAreas = []
var platforms = []
var grav = 0.2
var dragging = 0
var kineticAfterBounce = 0.4
var friction = 0.98
var airResistance = 0.98
var drawStart = 0
var particleSelector
var drawSelector

function setup() {
	createCanvas(windowWidth, windowHeight)
	particleSelector = createSelect()
	particleSelector.position(10, 10)
	particleSelector.option("Normal")
	particleSelector.option("Buoyant")
	drawSelector = createSelect()
	drawSelector.position(90, 10)
	drawSelector.option("Water")
	drawSelector.option("Platform")
	for (var i = 0; i < 4; i++){
		particles.push(new Particle(random(width), random(height), random(5, 40), true))
		particles[i].applyForce(random(3), random(3))
	}
	// platforms.push(new Platform(width / 3, height / 3, width / 3 + 40, height / 3 - 10))
	// waterAreas.push(new Water(width / 2 - 100, 0, width / 2 + 70, height))
}

function draw() {
	background(255)
	
	for (var i = 0; i < particles.length; i++){
		if (particles[i] != dragging){
			particles[i].applyForce(createVector(0, grav * (particles[i].size * 0.08))) // Gravity
		}
	}
	
	for (var i = 0; i < platforms.length; i++){
		platforms[i].show()
		platforms[i].checkParticles()
	}
	
	for (var i = 0; i < waterAreas.length; i++){
		waterAreas[i].densityObjects()
	}
	
	for (var i = 0; i < particles.length; i++){
		particles[i].update()
		particles[i].show()
		for (var n = 0; n < particles.length; n++){
			if (dist(particles[i].pos.x, particles[i].pos.y, particles[n].pos.x, particles[n].pos.y) <= particles[i].size / 2 + particles[n].size / 2 && particles[i] != particles[n]){
				var bounceVectI = createVector(-(particles[n].pos.x - particles[i].pos.x), -(particles[n].pos.y - particles[i].pos.y))
				var bounceVectN = createVector((particles[n].pos.x - particles[i].pos.x), (particles[n].pos.y - particles[i].pos.y))
				bounceVectI.setMag(map(particles[n].size, 5, 40, 0.1, 2))
				bounceVectN.setMag(map(particles[i].size, 5, 40, 0.1, 2))
				if (particles[i] != dragging){
					particles[i].applyForce(bounceVectI.mult(kineticAfterBounce))
				}
				if (particles[n] != dragging){
					particles[n].applyForce(bounceVectN)
				}
			}
		}
	}
	for (var i = 0; i < waterAreas.length; i++){
		waterAreas[i].show()
	}
}

function mousePressed(){
	if (mouseButton == CENTER){
		if (particleSelector.value() == "Normal" && !keyIsDown(16)){
			var particle = new Particle(mouseX, mouseY, random(5, 40), false)
		} else if (particleSelector.value() == "Buoyant" || keyIsDown(16)){
			var particle = new Particle(mouseX, mouseY, random(5, 40), true)
		}
		particles.push(particle)
	} else if (mouseButton == RIGHT){
		drawStart = createVector(mouseX, mouseY)
	}
}

function mouseDragged(){
	if (mouseButton == LEFT){
		for (var i = 0; i < particles.length; i++){
			if (dist(mouseX, mouseY, particles[i].pos.x, particles[i].pos.y) <= particles[i].size / 2 && dragging == 0 || dragging == particles[i]){
				particles[i].pos = createVector(mouseX, mouseY)
				particles[i].vel.mult(0)
				dragging = particles[i]
			}
		}
	}
}

function mouseReleased(){
	if (dragging != 0){
		var force = createVector(mouseX - pmouseX, mouseY - pmouseY)
		force.setMag(20)
		dragging.applyForce(force)
		dragging = 0
	}
	if (drawStart != 0){
		if (drawSelector.value() == "Water"){
			waterAreas.push(new Water(drawStart.x, drawStart.y, mouseX, mouseY))
		} else if (drawSelector.value() == "Platform"){
			if (drawStart.x < mouseX){
				platforms.push(new Platform(drawStart.x, drawStart.y, mouseX, mouseY))	
			} else {
				platforms.push(new Platform(mouseX, mouseY, drawStart.x, drawStart.y))
			}
		}
		drawStart = 0
	}
}