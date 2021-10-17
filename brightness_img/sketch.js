var img
var cols, rows
var scl = 3

function preload(){
	img = loadImage("assets/cliff.jpg")
}

function setup() {
	createCanvas(img.width, img.height)
	cols = floor(width / scl)
	rows = floor(height / scl)
}

function draw() {
	background(51)
	for (var j = 0; j < rows; j++){
		for (var i = 0; i < cols; i++){
			var pixel = img.get(i * scl, j * scl)
			var pixelBrightness = (0.2126 * pixel[0] + 0.7152 * pixel[1] + 0.0722 * pixel[2])
			var size = map(pixelBrightness, 0, 100, 1, scl * 0.64)
			rectMode(CENTER)
			rect(i * scl + scl / 2, j * scl + scl / 2, size, size)
		}
	}
}