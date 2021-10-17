function Blob(orig, pos, size){
	
	if (orig){
		this.pos = createVector(random(width), random(height))
		this.size = map(int(random(1,4)), 1, 3, 30, 80)
	} else {
		this.pos = pos.copy()
		this.size = size
	}
	this.speed = map(this.size, 30, 80, 10, 1)
	this.vel = createVector(random(-1 * this.speed, this.speed), random(-1 * this.speed, this.speed))
	this.r = this.size / 2
	this.lifespan = 1
	
	this.update = function(){
		if (random(1) < 0.1){
			this.vel = createVector(random(-1 * this.speed, this.speed), random(-1 * this.speed, this.speed))
		}
		
		this.pos.add(this.vel)
		
		if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height){
			this.vel.mult(-1)
		}
		
		this.lifespan -= 0.001
	}
	
	this.eatFood = function(){
		this.lifespan = 1
	}
	
	this.show = function(){
		colorMode(HSB)
		noStroke()
		fill(0, 0, 100, this.lifespan)
		ellipse(this.pos.x, this.pos.y, this.size, this.size)
		colorMode(RGB)
	}
	
}