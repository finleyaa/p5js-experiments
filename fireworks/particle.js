function Particle(x ,y, firework, large, hu){
	
	this.pos = createVector(x, y)
	this.firework = firework
	this.lifespan = 255
	this.hu = hu
	this.large = large
	
	if (firework){
		this.vel = createVector(random(-2, 2), random(-15, -12))
	} else {
		this.vel = p5.Vector.random2D()
		if (this.large){
			this.vel.mult(random(12, 15))
		} else {
			this.vel.mult(random(6, 10))
		}
	}
	this.acc = createVector(0, 0)
	
	this.applyForce = function(force){
		this.acc.add(force)
	}
	
	this.update = function(){
		if (!this.firework){
			this.vel.mult(0.95)
			this.lifespan -= 4
		}
		this.vel.add(this.acc)
		this.pos.add(this.vel)
		this.acc.mult(0)
	}
	
	this.done = function(){
		if (this.lifespan < 0){
			return true
		} else {
			return false
		}
	}
	
	this.show = function(){
		colorMode(HSB)
		if (!this.firework){
			strokeWeight(2)
			if (this.large){
				strokeWeight(4)
			}
			stroke(this.hu, 255, this.lifespan)
		} else {
			strokeWeight(4)
			if (this.large){
				strokeWeight(8)
			}
			stroke(this.hu, 255, 255)
		}
		point(this.pos.x, this.pos.y)
	}
	
}