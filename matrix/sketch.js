var streams = []
var symbolSize = 26

function setup() {
	createCanvas(windowWidth, windowHeight)
	textSize(symbolSize)
	// textStyle(BOLD)
	for (var i = 0; i < windowWidth / textWidth(String.fromCharCode(12449 + floor(random(88)))); i++){
		streams.push(new Stream(i * textWidth(String.fromCharCode(12449 + floor(random(88)))), random(-1000, 0)))
	}
}

function draw() {
	background(0)
	for (var i = 0; i < streams.length; i++){
		streams[i].update()
	}
}

function Symbol(x, y, speed){
	
	this.pos = createVector(x, y)
	this.speed = speed
	this.symbol = 0
	this.colour = [136.47, 100, 100]
	
	this.update = function(){
		this.pos.add(createVector(0, this.speed))
		if (this.pos.y > height){
			this.pos = createVector(this.pos.x, 0)
		}
		if (random(1) < 0.1){
			this.newSymbol()
		}
	}
	
	this.newSymbol = function(){
		this.symbol = String.fromCharCode(12449 + floor(random(88)))
	}
	
	this.newSymbol()
	
	this.show = function(){
		colorMode(HSB)
		stroke(this.colour)
		fill(this.colour)
		textSize(symbolSize)
		text(this.symbol, this.pos.x, this.pos.y)
	}
	
}

function Stream(x, y){
	
	this.x = x
	this.y = y
	this.symbols = []
	this.speed = random(10, 20)
	this.size = random(5, 30)
	
	var y = 0
	var bright = 100
	for (var i = 0; i < this.size; i++){
		this.symbols.push(new Symbol(this.x, this.y + y, this.speed))
		if (y == 0){
			this.symbols[i].colour = [0, 0, 100]
		}
		this.symbols[i].colour = [this.symbols[i].colour[0], this.symbols[i].colour[1], map(i, 0, this.size, 100, 20)]
		y -= 33
	}
	
	this.update = function(){
		for (var i = 0; i < this.symbols.length; i++){
			this.symbols[i].update()
			this.symbols[i].show()
		}
	}
	
}