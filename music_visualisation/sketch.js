var music
var fft = new p5.FFT()

function preload(){
	music = loadSound("music2.mp3")
}

function setup() {
	createCanvas(windowWidth, windowHeight)
	music.play()
}

function draw() {
	background(0)
	
	var spectrum = fft.analyze()
	strokeWeight(3)
	noFill()
	beginShape()
	for (var i = 0; i < spectrum.length / 2; i++){
		stroke(255)
		angleMode(DEGREES)
		var startingPos = p5.Vector.fromAngle(map(i, 0, (spectrum.length - 1) / 2, 0, TWO_PI))
		startingPos.setMag(200)
		var vect = p5.Vector.fromAngle(map(i, 0, (spectrum.length - 1) / 2, 0, TWO_PI))
		vect.setMag(spectrum[i])
		vertex(width / 2 + vect.x + startingPos.x, height / 2 + vect.y + startingPos.y)
	}
	endShape(CLOSE)
	strokeWeight(1)
	beginShape()
	for (var i = spectrum.length / 2; i < spectrum.length; i++){
		stroke(255)
		angleMode(DEGREES)
		var startingPos = p5.Vector.fromAngle(map(i, (spectrum.length - 1) / 2, spectrum.length - 1, 0, TWO_PI))
		startingPos.setMag(50)
		var vect = p5.Vector.fromAngle(map(i, (spectrum.length - 1) / 2, spectrum.length - 1, 0, TWO_PI))
		vect.setMag(spectrum[i])
		vertex(width / 2 + vect.x + startingPos.x, height / 2 + vect.y + startingPos.y)
	}
	endShape(CLOSE)
}