function Ball(x, y){
	
	this.pos = createVector(x, y)
	this.vel = createVector(0, 0)
	
	this.update = function(){
		if (this.pos.x > width || this.pos.x < 0) this.vel = createVector(-this.vel.x, this.vel.y)
		if (this.pos.y > height || this.pos.y < 0) this.vel = createVector(this.vel.x, -this.vel.y)
	}

	this.release = function(dir){
		this.vel = createVector(-dir.x, -dir.y)
		this.vel.setMag(4)
	}
	
}