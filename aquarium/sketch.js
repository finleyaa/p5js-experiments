var fishes = []

function setup() {
	createCanvas(windowWidth, windowHeight)
	for (var i = 0; i < 30; i++){
		fishes.push(new Fish())
	}
}

function draw() {
	background(100, 210, 255)
	
	for (var i = 0; i < fishes.length; i++){
		fishes[i].update()
		fishes[i].show()
	}
}