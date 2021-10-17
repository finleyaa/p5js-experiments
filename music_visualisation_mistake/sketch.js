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
	strokeWeight(4)
	noFill()
	beginShape()
	for (var i = 0; i < spectrum.length; i++){
		stroke(255)
		angleMode(DEGREES)
		var vect = p5.Vector.fromAngle(map(i, 0, 1023, 0, 360))
		vect.setMag(spectrum[i])
		vertex(width / 2 + vect.x, height / 2 + vect.y)
		// vertex(width / spectrum.length * i, height - height / 255 * spectrum[i])
		// line(width / spectrum.length * i, height - height / 255 * spectrum[i], width / spectrum.length * i + 20, height - height / 255 * spectrum[i + 20])
	}
	endShape(OPEN)
}