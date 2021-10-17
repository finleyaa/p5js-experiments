function Pole(x, y, letter){
	
	this.blocks = []
	this.pos = createVector(x, y)
	this.letter = letter
	
	this.show = function(){
		
		fill(178, 98, 1)
		rectMode(CENTER)
		rect(this.pos.x, this.pos.y, width * 0.24, height / 50)
		rect(this.pos.x, this.pos.y - height * 0.45, width / 70, height * 0.88)
		
	}
	
	this.addBlock = function(size){
		var block = new Block(this.pos.x, this.pos.y - this.blocks.length * (height / 25) - height / 33, size, this)
		this.blocks.push(block)
	}
	
}