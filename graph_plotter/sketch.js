var points = []
var scl = 10

function setup() {
	createCanvas(windowWidth, windowHeight)
	var yNum = height / 2 / scl
	for (var j = 0; j < height; j += scl){
		textSize(40)
		// text(yNum, width / 2 - 20, j)
		yNum--
	}
	for (var x = -width / 2; x < width / 2; x++){
		var y = floor((101 * exp(-0.04 * x)) - 1)
		points.push(createVector(x * scl, (height - y * scl)))
	}
}

function draw() {
	line(width / 2, 0, width / 2, height)
	line(0, height / 2, width, height / 2)
	strokeWeight(5)
	translate(width / 2, -height / 2)
	for (var i = 1; i < points.length; i++){
		line(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y)
		if (points[i].x / scl == 100){
			textSize(40)
			text(points[i].x / scl, points[i].x, points[i].y)
		}
	}
}