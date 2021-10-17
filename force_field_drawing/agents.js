function Agent(){
	angleMode(DEGREES)
	var position = p5.Vector.fromAngle(random(360))
	position.setMag(random(400))
	
	this.pos = createVector(width / 2 + position.x, height / 2 + position.y)
	this.vel = createVector(0, 0)
	this.acc = createVector(0, 0)
	this.prevPos = this.pos.copy()
	this.doDraw = true
	
	this.applyForce = function(force){
		this.acc.add(force)
		this.acc.limit(5)
	}
	
	this.update = function(){
		this.doDraw = true
		this.prevPos = this.pos.copy()
		
		this.vel.add(this.acc)
		this.vel.limit(10)
		this.pos.add(this.vel)
		this.acc.mult(0)
		
		if (this.pos.x > width){
			this.pos = createVector(0, this.pos.y)
			this.doDraw = false
		}
		if (this.pos.x < 0){
			this.pos = createVector(width, this.pos.y)
			this.doDraw = false
		}
		if (this.pos.y > height){
			this.pos = createVector(this.pos.x, 0)
			this.doDraw = false
		}
		if (this.pos.y < 0){
			this.pos = createVector(this.pos.x, height)
			this.doDraw = false
		}
	}
	
	this.draw = function(){
		if (this.doDraw){
			strokeWeight(1)
			stroke(255, 10)
			line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
		}
	}
	
}