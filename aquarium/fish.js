function Fish(){
	
	this.pos = createVector(random(width), random(height))
	this.vel = createVector(0, 0)
	this.xoff = random(1000)
	this.yoff = random(1000)
	this.dna = new DNA()
	this.maxspeed = this.dna.maxspeed
	this.height = this.dna.width // flipped because of rotate
	this.width = this.dna.height // flipped because of rotate
	
	this.update = function(){
		
		var vx = map(noise(this.xoff), 0, 1, -this.maxspeed, this.maxspeed)
		var vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed)
		
		this.vel = createVector(vx, vy)
		
		this.xoff += 0.01
		this.yoff += 0.01
		
		this.pos.add(this.vel)
		
		if (this.pos.x > width){
			this.pos = createVector(0, this.pos.y)
		} else if (this.pos.x < 0){
			this.pos = createVector(width, this.pos.y)
		} else if (this.pos.y > height){
			this.pos = createVector(this.pos.x, 0)
		} else if (this.pos.y < 0){
			this.pos = createVector(this.pos.x, height)
		}
	}
	
	this.show = function(){
		push()
		if (this.dna.carnivore){
			stroke(255, 0, 0)
		} else {
			stroke(255)
		}
		colorMode(HSB)
		fill(this.dna.hu, 255, 90)
		translate(this.pos.x, this.pos.y)
		rotate(this.vel.heading() + radians(90))
		triangle(0, 0 + this.height / 3, 0 + this.width / 3, 0 + this.height * 0.7, 0 - this.width / 3, 0 + this.height * 0.7)
		fill(this.dna.hu, 255, 255)
		triangle(0 - this.width / 2, 0 + this.height / 2, 0 - this.width / 2 + this.width, 0 + this.height / 2, 0, 0 - this.height / 2)
		fill(this.dna.hu, 255, 80)
		triangle(0 + this.width / 10, 0 + this.height / 2.2, 0 + this.width / 4, 0 + this.height / 8, 0 - this.width / 4, 0 + this.height / 8)
		pop()
	}
	
	this.follow = function(){
		
	}
	
}