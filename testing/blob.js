function Blob(x, y){
	
	this.vel = createVector(0, 0)
	this.acc = createVector(0, 0)
	this.pos = createVector(x, y)
	
	this.applyForce = function(force){
		this.acc.add(force)
	}
	
	this.update = function(grav){
		console.log(this.pos.x)
		console.log(this.pos.y)
		this.vel.add(this.acc)
		this.pos.add(this.vel)
		this.acc.mult(0)
		
		if (this.pos.x >= width || this.pos.x < 0){
			this.vel = createVector(-this.vel.x + (1.6 * grav), this.vel.y)
		} else if (this.pos.y >= height || this.pos.y < 0){
			this.vel = createVector(this.vel.x, -this.vel.y + (1.6 * grav))
		}
	}

	this.show = function(){
		ellipse(this.pos.x, this.pos.y, 15, 15)
	}
	
}