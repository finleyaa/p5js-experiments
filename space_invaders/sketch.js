var ship
var shots = []
var aliens = []

function setup() {
	createCanvas(800, 600)
	ship = new Ship()
	for (var i = 0; i < 11; i++){
		aliens.push(new Alien(70 * i + 40, 50))
	}
}

function draw() {
	background(51)
	
	noStroke()
	
	if (keyIsDown(LEFT_ARROW)){
		ship.move(-1)
	} else if (keyIsDown(RIGHT_ARROW)){
		ship.move(1)
	}
	
	for (var i = shots.length - 1; i >= 0; i--){
		shots[i].update()
		shots[i].show()
	}
	
	for (var n = aliens.length - 1; n >= 0; n--){
		aliens[n].show()
		for (var i = shots.length - 1; i >= 0; i--){
			if (dist(aliens[n].x, aliens[n].y, shots[i].x, shots[i].y) <= 25){
				aliens.splice(n, 1)
				shots.splice(i, 1)
			} else if (shots[i].y < 0 || shots[i].y > height){
				shots.splice(i, 1)
			}
		}
	}
	
	ship.show()
}

function keyPressed(){
	if (key == " "){
		shots.push(new Shot(ship.x, ship.y - 25))
		console.log("SHOT")
	}
}