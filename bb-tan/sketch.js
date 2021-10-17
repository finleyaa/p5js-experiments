var tiles = []
var scl = 600 / 10 // 10 Columns, 13 Rows
var balls = []
var ballsReleased = false
var gameOver = false

function setup() {
	createCanvas(600, 780)
	for (var i = 0; i < floor(random(1, 5)); i++){
		tiles.push(new Tile(floor(random(0, 10)), floor(random(0, 2)), round(random(1, 2))))
	}
	balls.push(new Ball())
}

function draw() {
	colorMode(RGB)
	background(0)
	
	for (var i = 0; i < tiles.length; i++){
		tiles[i].draw()
	}
	
	if (ballsReleased){
		
	}
}

function nextRound(){
	for (var i = 0; i < tiles.length; i++){
		tiles[i].pos.add(createVector(0, scl))
		if (tiles[i].pos.y / scl == 12){
			gameOver = true
			console.log("Lost")
		}
		
	}
	for (var i = 0; i < floor(random(1, 11)); i++){
		tiles.push(new Tile(floor(random(0, 10)), 0, ceil(random(balls.length / random(1, 2), balls.length))))
	}
}