var circ

function setup() {
	createCanvas(windowWidth, windowHeight)
	// circ = new CurveCreator(width / 2, (height / 2) - (height * 0.8 / 2) + width / 12)
	circ = new CurveCreator(width / 12, height - width / 12)
}

function draw() {
	//background(255)
	stroke(0)
	circ.show()
}