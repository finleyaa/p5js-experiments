function Food(){
	
	this.pos = createVector(random(width), random(height))
	
	this.show = function(){
		fill(193, 52, 52)
		ellipse(this.pos.x, this.pos.y, 10, 10)
	}
	
}