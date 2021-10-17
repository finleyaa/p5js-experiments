function Block(x, y, size, parent){
	
	this.pos = createVector(x, y)
	this.parent = parent
	this.size = size
	
	this.show = function(){
		fill(178, 98, 1)
		rectMode(CENTER)
		rect(this.pos.x, this.pos.y, size, height / 25)
	}
	
}