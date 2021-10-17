var balls = []

function setup() {
	createCanvas(windowWidth, windowHeight)
	for (var i = 0; i < 1000; i++){
		balls.push(new Ball())
	}
	angleMode(DEGREES)
}

function draw() {
	background(51)
	for (var i = 0; i < balls.length; i++){
		balls[i].show()
	}
	if (mouseIsPressed){
		for (var i = 0; i < balls.length; i++){
			if (dist(balls[i].pos.x, balls[i].pos.y, mouseX, mouseY) < 100){
				var opp = balls[i].pos.y - mouseY
				var adj = balls[i].pos.x - mouseX
				balls[i].touched(p5.Vector.fromAngle(radians(atan2(opp, adj))))
			}
		}
	}
}

// function mouseClicked(){
	// for (var i = 0; i < balls.length; i++){
		// if (dist(balls[i].pos.x, balls[i].pos.y, mouseX, mouseY) < 100){
			// var opp = balls[i].pos.y - mouseY
			// var adj = balls[i].pos.x - mouseX
			// balls[i].touched(p5.Vector.fromAngle(radians(atan2(opp, adj))))
		// }
	// }
// }