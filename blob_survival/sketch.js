var b = []
var food = []
var showFood
var replicateChance

function setup() {
	createCanvas(600, 600)
	for (var i = 0; i < 30; i++){
		b.push(new Blob(true))
	}
	for (var i = 0; i < 5; i++){
		food.push(new Food())
	}
	showFood = true
	replicateChance = 0.0002
}

function draw() {
	background(51)
	
	for (var i = b.length - 1; i > 0; i--){
		b[i].update()
		b[i].show()
		if (random(1) <= replicateChance){
			b.push(new Blob(false, b[i].pos, b[i].size))
		}
		if (showFood){
			for (var n = food.length - 1; n > 0; n--){
				if (dist(food[n].pos.x, food[n].pos.y, b[i].pos.x, b[i].pos.y) <= b[i].r){
					food.splice(n, 1)
					b[i].eatFood()
				}
			}
		}
		if (b[i].lifespan <= 0){
			b.splice(i, 1)
		}
	}
	
	if (random(1) < 0.02){
		showFood = true
		for (var i = 0; i < 5; i++){
			food.push(new Food())
		}
	}
	if (showFood){
		if (food.length === 0){
			showFood = false
		}
		for (i = food.length - 1; i > 0; i--){
			food[i].show()
		}
	}
}