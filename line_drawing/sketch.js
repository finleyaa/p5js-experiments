var points = []
var maxDisp = 50
var px, py

function setup() {
	createCanvas(windowWidth, windowHeight)
	frameRate(20)
	background(230)
	noFill()
}

function draw() {
	if (points.length >= 3){
		
		stroke(random(100))
		strokeWeight(random(0.2))
		px = points[0][0] + random(-maxDisp + random(-maxDisp / 4, maxDisp / 4), maxDisp + random(-maxDisp / 4, maxDisp / 4))
		py = points[0][1] + random(-maxDisp + random(-maxDisp / 4, maxDisp / 4), maxDisp + random(-maxDisp / 4, maxDisp / 4))
		for (var i = 0; i < points.length - 1; i++){
			// var x1 = points[i + 1][0] + random(-maxDisp + random(-maxDisp / 4, maxDisp / 4), maxDisp + random(-maxDisp / 4, maxDisp / 4))
			// var y1 = points[i + 1][1] + random(-abs(points[i + 1][1] - py) / 2, abs(points[i + 1][1] - py) / 2)
			// var x2 = points[i + 1][0] + random(-maxDisp + random(-maxDisp / 4, maxDisp / 4), maxDisp + random(-maxDisp / 4, maxDisp / 4))
			// var y2 = points[i + 1][1] + random(-abs(points[i + 1][1] - py) / 4, abs(points[i + 1][1] - py) / 4)
			var x3 = points[i + 1][0] + random(-maxDisp + random(-maxDisp / 4, maxDisp / 4), maxDisp + random(-maxDisp / 4, maxDisp / 4))
			var y3 = points[i + 1][1] + random(-maxDisp + random(-maxDisp / 4, maxDisp / 4), maxDisp + random(-maxDisp / 4, maxDisp / 4))
			line(px, py, x3, y3)
			// bezier(px, py, x1, y1, x2, y2, x3, y3)
			px = x3
			py = y3
		}
		
	}
}

function mousePressed(){
	points.push([mouseX, mouseY])
}

function keyPressed(){
	noLoop()
}