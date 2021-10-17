function Platform(x, y, length) {
	this.pos = createVector(x, y);
	this.len = length;
	
	this.draw = function() {
		strokeWeight(4);
		line(this.pos.x, this.pos.y, this.pos.x + this.len, this.pos.y);
	}
}