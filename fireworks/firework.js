function Firework(){
	
	this.hu = random(255)
	if (random(1) < 0.2){
		this.firework = new Particle(random(width), height, true, true, this.hu)
		this.large = true
	} else {
		this.firework = new Particle(random(width), height, true, false, this.hu)
		this.large = false
	}
	this.exploded = false
	this.particles = []
	
	this.done = function(){
		if (this.exploded && this.particles.length == 0){
			return true
		} else {
			return false
		}
	}
	
	this.update = function(){
		if (!this.exploded){
			this.firework.applyForce(grav)
			this.firework.update()
			if (this.firework.vel.y >= 0){
				this.exploded = true
				this.explode()
			}
		}
		for (var i = this.particles.length - 1; i >= 0; i--){
			this.particles[i].applyForce(grav)
			this.particles[i].update()
			if (this.particles[i].done()){
				this.particles.splice(i, 1)
			}
		}
	}
	
	this.explode = function(){
		var maxamount = 100
		if (this.large){
			maxamount = 500
		}
		for (var i = 0; i < maxamount; i++){
			this.particles.push(new Particle(this.firework.pos.x, this.firework.pos.y, false, this.large, this.hu))
		}
	}
	
	this.show = function(){
		if (!this.exploded){
			this.firework.show()
		}
		for (var i = 0; i < this.particles.length; i++){
			this.particles[i].show()
		}
	}
	
}