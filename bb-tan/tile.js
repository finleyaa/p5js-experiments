function Tile(col, row, hits){
	this.pos = createVector(col * scl, row * scl)
	this.hue = map(this.pos.y / scl, 0, 9, 20, 150)
	
	this.draw = function(){
		
		this.hue = map(this.pos.y / scl, 0, 9, 20, 150)
		
		colorMode(HSB)
		strokeWeight(3)
		stroke(this.hue, 100, 100)
		noFill()
		rect(this.pos.x, this.pos.y, scl, scl)
		
		strokeWeight(1)
		fill(this.hue, 100, 100)
		textSize(20)
		textAlign(CENTER, CENTER)
		text(hits, this.pos.x + scl / 2, this.pos.y + scl / 2)
		
	}
}