var img
var res = 0.5

function preload(){
	img = loadImage("")
}

function setup() {
	createCanvas(img.width, img.height)
}

function draw() {
	background(0)
	for (var i = 0; i < img.width / res; i++){
		for (var j = 0; j < img.height / res; j++){
			triangle(i * 0.5 * )
		}
	}
}