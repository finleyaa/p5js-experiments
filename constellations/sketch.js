var dots = []

function setup() {
	createCanvas(windowWidth, windowHeight)
	for (var i = 0; i < 200; i++){
		dots.push(new Dot())
	}
}

function draw() {
	background(0)
	for (var i = 0; i < dots.length; i++){
		dots[i].update()
		dots[i].checkNeighbours()
		dots[i].draw()
	}
}