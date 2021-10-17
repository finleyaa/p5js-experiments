var blobs = []
var blob
var grav

function setup() {
	createCanvas(600, 600)
	slider = createSlider(0, 4, 0.5, 0.1)
	for (var i = 0; i < 1; i++){
		blob = new Blob(0, 0)
		blob.applyForce(createVector(random(10), random(10)))
		blobs.push(blob)
	}
}

function draw() {
	background(51)
	grav = slider.value()
	
	for (var i = 0; i < blobs.length; i++){
		blobs[i].applyForce(createVector(0, slider.value()))
		blobs[i].update(grav)
		blobs[i].show()
	}
}

function mousePressed(){
	var blobclick = new Blob(mouseX, mouseY)
	blobclick.applyForce(createVector(random(10), random(10)))
	blobs.push(blobclick)
}