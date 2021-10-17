var img
var particles = []

function preload(){
	img = loadImage("assets/safari.jpg")
	//img = createCapture(VIDEO)
}

function setup() {
	createCanvas(img.width, img.height)
	for (var i = 0; i < 200; i++){
		particles.push(new Particle())
	}
}

function draw() {
	for (var i = 0; i < particles.length; i++){
		particles[i].update()
		particles[i].show()
	}
}