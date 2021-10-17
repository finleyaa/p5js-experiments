function Particle(x, y, size, buoyant){
	
	this.pos = createVector(x, y)
	this.vel = createVector(0, 0)
	this.acc = createVector(0, 0)
	this.size = size
	this.buoyant = buoyant
	
	this.applyForce = function(force){
		this.acc.add(force)
	}
	
	this.update = function(){
		this.vel.add(this.acc)
		this.vel = createVector(this.vel.x * airResistance, this.vel.y)
		this.pos.add(this.vel)
		this.acc.mult(0)
		
		if (this.pos.x - this.size / 2 < 0){
			this.pos = createVector(this.size / 2, this.pos.y)
			this.vel = createVector(-(this.vel.x * kineticAfterBounce), this.vel.y)
		}
		if (this.pos.x + this.size / 2 > width){
			this.pos = createVector(width - this.size / 2, this.pos.y)
			this.vel = createVector(-(this.vel.x * kineticAfterBounce), this.vel.y)
		}
		if (this.pos.y - this.size / 2 < 0){
			this.pos = createVector(this.pos.x, this.size / 2)
			this.vel = createVector(this.vel.x, -(this.vel.y * kineticAfterBounce))
		}
		if (this.pos.y + this.size / 2 > height){
			this.pos = createVector(this.pos.x, height - this.size / 2)
			this.vel = createVector(this.vel.x, -(this.vel.y * kineticAfterBounce))
		}
		
		if (this.vel.y < 1 && this.vel.y > -1){
			this.vel = createVector(this.vel.x * friction, this.vel.y)
		}
	}
	
	this.show = function(){
		stroke(0)
		strokeWeight(1)
		fill(0)
		if (this.buoyant){
			fill(0, 100, 200)
		}
		ellipse(this.pos.x, this.pos.y, this.size)
	}
	
}