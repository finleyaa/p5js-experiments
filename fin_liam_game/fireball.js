function Fireball(x, y, xvel, yvel) {
	this.sprite = loadImage("sprites/fireball/1.png");
	this.pos = createVector(x, y);
	this.vel = createVector(xvel, yvel);
	
	this.update = function() {
		this.pos.add(this.vel);
	}
	
	this.draw = function() {
		image(this.sprite, this.pos.x, this.pos.y - this.sprite.height);
	}
}