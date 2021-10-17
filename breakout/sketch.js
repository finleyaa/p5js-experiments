var paddle
var ball
var blocks = []

function setup() {
	createCanvas(500, 500)
	paddle = new Paddle()
	ball = new Ball()
	for (var i = 0; i < 18; i++){
		if (i < 6){
			blocks.push(new Block(i * width/6, 0))
		} else if (i < 12){
			blocks.push(new Block(i * width/6 - width, height / 20 + 2))	
		} else {
			blocks.push(new Block(i * width/6 - width * 2, (height / 20) * 2 + 4))
		}
	}
}

function draw() {
	colorMode(RGB)
	background(51)
	
	noStroke()
	fill(255)
	
	ball.update()
	ball.show()
	paddle.update()
	paddle.show()
	for (var i = 0; i < blocks.length; i++){
		rectMode(CORNER)
		blocks[i].show()
	}
	
	checkBounce()
	
	for (var i = blocks.length - 1; i >= 0; i--){
		if (blocks[i].hit(ball)){
			blocks.splice(i, 1)
			ball.applyForce(createVector(ball.vel.x + random(-2, 2), -ball.vel.y))
		}
	}
	
	if (blocks.length === 0){
		winGame()
	}
	
	// console.log(dist(paddle.pos.x, paddle.pos.y, ball.pos.x, ball.pos.y))
}

function winGame(){
	colorMode(RGB)
	noStroke()
	ball.vel = createVector(0,0)
	fill(51)
	rect(0, 0, width, height - 50)
	stroke(0)
	fill(255)
	textAlign(CENTER)
	textSize(52)
	text("You win!", width/2, height/2)
}

function endGame(){
	colorMode(RGB)
	noStroke()
	ball.vel = createVector(0,0)
	fill(51)
	rect(0, 0, width, height - 50)
	stroke(0)
	fill(255)
	textAlign(CENTER)
	textSize(52)
	text("Game over!", width/2, height/2)
}

function checkBounce(){
	
	if (ball.pos.x <= paddle.pos.x + 50 && ball.pos.x >= paddle.pos.x - 50 && ball.pos.y >= paddle.pos.y - 5 && ball.pos.y < height){
		ball.applyForce(createVector(ball.vel.x, -ball.vel.y))
	} else if (ball.pos.x >= width || ball.pos.x <= 0) {
		ball.applyForce(createVector(-ball.vel.x, ball.vel.y))
	} else if (ball.pos.y <= 0){
		ball.applyForce(createVector(ball.vel.x + random(-2, 2), -ball.vel.y))
	} else if (ball.pos.y >= height){
		endGame()
	}
	
}