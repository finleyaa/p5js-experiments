var cols = 50
var rows = 50
var agents = []
var forceField = []
var xOffset, yOffset

function setup() {
	createCanvas(windowWidth, windowHeight)
	start()
}

function start() {
	forceField = []
	agents = []
	
	xOffset = random(1000)
	yOffset = random(1000)
	
	for (var i = 0; i < 1000; i++){
		agents.push(new Agent())
	}
	
	var tempX = xOffset
	var tempY = yOffset
	
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			forceField.push(new Force(i, j, tempX, tempY))
			tempY += 0.004
		}
		tempX += 0.004
		tempY = yOffset
	}
	
	background(0)
}

function draw() {
	for (var i = 0; i < forceField.length; i++){
		forceField[i].findAgents()
		forceField[i].pushAgents()
		forceField[i].update()
		// forceField[i].draw()
	}
	for (var i = 0; i < agents.length; i++){
		agents[i].update()
		agents[i].draw()
	}
}

function mousePressed(){
	if (mouseButton == LEFT){
		start()
	}
}