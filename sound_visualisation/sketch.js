var rectSize, circSize
var music, amp

function load(){
	loadSound("http://p5js.org/assets/examples/assets/lucky_dragons_-_power_melody.mp3", music)
}

function setup() {
	load()
	createCanvas(windowWidth, windowHeight)
	rectSize = 10
	circSize = 10
	amp = new p5.Amplitude()
	music.play()
}

function draw() {
	rectMode(CENTER)
	var level = amp.getLevel()
	level = map(level, 0, 1, 10, 500)
	rect(width / 2, height / 2, rectSize, rectSize)
	ellipse(width / 2, height / 2, circSize)
}