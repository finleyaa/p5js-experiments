function Rocket(dna){
	
	if (dna){
		this.dna = dna
	} else {
		this.dna = new DNA()
	}
	
	this.pos = createVector(width/2, height)
	this.vel = createVector(0, -1)
	this.acc = createVector(0, 0)
	this.fitness = 0
	this.completed = false
	this.crashed = false
	this.points = []
	this.points.push(this.pos.copy())
	this.finishtime = lifespan

	this.calcFitness = function(){
		var d = dist(this.pos.x, this.pos.y, target.x, target.y)
		this.fitness = map(d, 0, width, width, 0)
		this.fitness /= this.finishtime / 100
		
		if (this.completed){
			this.fitness *= 10
		} else if (this.crashed){
			this.fitness /= 10
		}
		this.fitness = pow(this.fitness, 4)
	}
	
	this.applyForce = function(force){
		this.acc.add(force)
	}
	
	this.update = function(){
		
		if (dist(this.pos.x, this.pos.y, target.x, target.y) < 10){
			this.pos = target.copy()
			this.completed = true
			this.finishtime = count
		}
		if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
			this.crashed = true
		}
		
		this.applyForce(this.dna.genes[count])
		if (!this.completed && !this.crashed){
			this.vel.add(this.acc)
			this.pos.add(this.vel)
			this.acc.mult(0)
			this.vel.limit(4)
			
			this.points.push(this.pos.copy())
		}
	}
	
	this.show = function(){
		push()
		noStroke()
		rectMode(CENTER)
		var d = dist(this.pos.x, this.pos.y, target.x, target.y)
		var color = map(d, 0, width, 0, 255)
		colorMode(HSB)
		fill(color, 255, 255, 150)
		translate(this.pos.x, this.pos.y)
		rotate(this.vel.heading())
		rect(0, 0, 50, 10)
		pop()
		stroke(255)
	}
	
}