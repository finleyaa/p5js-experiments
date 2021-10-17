var population
var lifespan = 400
var count
var target
var gen
var maxfitpoints = []

function setup() {
	createCanvas(windowWidth, windowHeight)
	population = new Population()
	count = 0
	gen = 1
	target = createVector(width/2, 50)
}

function draw() {
	background(51)
	
	population.run()
	ellipse(target.x, target.y, 16)
	stroke(255)
	fill(255)
	textSize(23)
	textAlign(LEFT, TOP)
	text(count, 10, 10)
	text("Generation: " + gen, 10, 40)
	
	count++
	
	if (count == lifespan){
		population.evaluate()
		population.selection()
		count = 0
		gen++
	}
	push()
	stroke(255, 0, 0)
	strokeWeight(4)
	
	for (var i = 0; i < maxfitpoints.length - 1; i += 5){
		var point1 = maxfitpoints[i]
		point(point1.x, point1.y)
	}
	pop()
	
}