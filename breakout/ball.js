function Ball(){
	
	this.pos = createVector(width/2, height/2)
	this.vel = createVector(0, 5)
	this.r = 10
	
	this.update = function(){
		this.pos.add(this.vel)
	}
	
	this.show = function(){
		noStroke()
		
		ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
	}
	
	this.applyForce = function(force){
		this.vel = force
	}
	
}