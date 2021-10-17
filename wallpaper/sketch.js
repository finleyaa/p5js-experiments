var cols, rows
var side, corna, cornb

function setup() {
	createCanvas(800, 800)
	corna = 10
	cornb = 10
	side = 100
}

function draw() {
	background(255)
	for (var i = 0; i < 50; i++){
		for (var j = 0; j < 50; j++){
			var x = corna + i * side / 100
			var y = cornb + j * side / 100
			var c = floor(pow(x, 2) + pow(y, 2))
			if (c % 4 == 0){
				stroke(100)
				point(i, j)
			} else if (c % 2 == 0){
				stroke(0)
				point(i, j)
			} else {
				stroke(51)
				point(i, j)
			}
		}
	}
	side += 0.1
}