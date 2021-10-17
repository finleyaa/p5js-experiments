function Paddle(){
	
	this.pos = createVector(width/2, height - 5)
	this.width = 100
	this.height = 10
	
	this.update = function(){
		this.pos = createVector(mouseX, this.pos.y)
		if (mouseX > width - this.width / 2){
			this.pos = createVector(width - this.width / 2, this.pos.y)
		} else if (mouseX < this.width / 2){
			this.pos = createVector(0 + this.width / 2, this.pos.y)
		}
	}
	
	this.show = function(){
		noStroke()
		rectMode(CENTER)
		rect(this.pos.x, this.pos.y, 100, 10)
	}
	
}