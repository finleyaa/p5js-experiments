var shapes = []
var scl = 80
var change = 1

function setup() {
	createCanvas(windowWidth - windowWidth % scl, windowHeight - windowHeight % scl)
	stroke(255)
	var x = scl / 2
	var y = scl / 2
	for (var i = 0; i < (width / scl) * (height / scl); i++){
		shapes.push(new Shape(x, y))
		x += scl
		if (x > width){
			x = scl / 2
			y += scl
		}
		console.log(x, y)
	}
}

function draw() {
	background(0)
	for (var i = 0; i < shapes.length; i++){
		shapes[i].show()
	}
	if (change == 1){
		scl += 2
		if (scl == 80 * 4){
			change = -1
		}
	} else {
		scl -= 2
		if (scl == 80){
			change = 1
		}
	}
}

function Shape(x, y){
	
	this.pos = createVector(x, y)
	this.circpos = createVector(x + scl / 2, y + scl / 2)
	this.hue1 = [53.9, true]
	this.hue2 = [0, true]
	this.hue3 = [212, true]
	
	this.show = function(){
		colorMode(HSB)
		strokeWeight(2)
		stroke(this.hue1[0], 89, 80)
		ellipse(this.pos.x, this.pos.y, scl)
		rectMode(CENTER)
		noFill()
		// rect(this.pos.x, this.pos.y, scl * 0.8, scl * 0.8)
		stroke(this.hue2[0], 89, 80)
		rect(this.pos.x, this.pos.y, scl, scl)
		stroke(this.hue3[0], 89, 80)
		// rect(this.circpos.x, this.circpos.y, scl / 2, scl / 2)
		ellipse(this.circpos.x, this.circpos.y, scl / 2)
		if (this.hue1[1]){
			this.hue1[0]++
		} else {
			this.hue1[0]--
		}
		if (this.hue1[0] >= 255 || this.hue1[0] <= 0){
			this.hue1[1] = !this.hue1[1]
		}
		
		if (this.hue2[1]){
			this.hue2[0]++
		} else {
			this.hue2[0]--
		}
		if (this.hue2[0] >= 255 || this.hue2[0] <= 0){
			this.hue2[1] = !this.hue2[1]
		}
		
		if (this.hue3[1]){
			this.hue3[0]++
		} else {
			this.hue3[0]--
		}
		if (this.hue3[0] >= 255 || this.hue3[0] <= 0){
			this.hue3[1] = !this.hue3[1]
		}
	}
	
}