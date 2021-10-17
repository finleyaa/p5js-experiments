function Particle(){
	
	this.pos = createVector(random(width), random(height))
	this.vel = createVector(0, 0)
	this.acc = createVector(0, 0)
	this.xoff = random(1000)
	this.yoff = random(1000)
	this.px = this.pos.x
	this.py = this.pos.y
	
	this.applyForce = function(force){
		this.acc.add(force)
	}
	
	this.update = function(){
		var vect = createVector(noise(this.xoff), noise(this.yoff))
		vect.setMag(10)
		
		this.applyForce(vect)
		
		this.xoff += -0.01
		this.yoff += -0.01
		
		this.vel.add(this.acc)
		this.px = this.pos.x
		this.py = this.pos.y
		this.pos.add(this.vel)
		this.vel.limit(1)
		this.acc.mult(0)
		
		if (this.pos.x > width){
			this.pos = createVector(-5, this.pos.y)
			this.px = this.pos.x
			this.py = this.pos.y
		} else if (this.pos.x < 0){
			this.pos = createVector(width + 5, this.pos.y)
			this.px = this.pos.x
			this.py = this.pos.y
		}
		
		if (this.pos.y > height){
			this.pos = createVector(this.pos.x, -5)
			this.px = this.pos.x
			this.py = this.pos.y
		} else if (this.pos.y < 0){
			this.pos = createVector(this.pos.x, height + 5)
			this.px = this.pos.x
			this.py = this.pos.y
		}
	}
	
	this.show = function(){
		var colour = img.get(this.pos.x, this.pos.y)
		//colour = (min(colour[0], colour[1], colour[2]) + max(colour[0], colour[1], colour[2])) / 2
		// colour = (0.21 * colour[0] + 0.72 * colour[1] + 0.07 * colour[2])
		// stroke(colour, colour, colour)
		// fill(colour, colour, colour)
		stroke(colour[0], colour[1], colour[2])
		fill(colour[0], colour[1], colour[2])
		//strokeWeight(10)
		line(this.px, this.py, this.pos.x, this.pos.y)
		ellipse(this.pos.x, this.pos.y, 5, 5)
	}
	
}