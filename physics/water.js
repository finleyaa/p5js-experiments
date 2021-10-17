function Water(x1, y1, x2, y2){
	
	this.density = 0.7 // What the force of objects should be multiplied by
	this.startPos = createVector(x1, y1)
	this.endPos = createVector(x2, y2)
	this.width = abs(x1 - x2)
	this.height = abs(y1 - y2)
	
	this.show = function(){
		noStroke()
		fill(0, 100, 200, 150)
		rectMode(CORNER)
		rect(this.startPos.x, this.startPos.y, this.width, this.height)
	}
	
	this.densityObjects = function(){
		for (var i = 0; i < particles.length; i++){
			if (particles[i].pos.x < x2 && particles[i].pos.x > x1 && particles[i].pos.y < y2 && particles[i].pos.y > y1 && dragging != particles[i]){
				if (!particles[i].buoyant){
					particles[i].acc = createVector(particles[i].acc.x * 0.9, particles[i].acc.y)
					particles[i].vel = createVector(particles[i].vel.x * 0.9, particles[i].vel.y * this.density)
				} else {
					var force = createVector(0, this.startPos.y - particles[i].pos.y)
					particles[i].acc = createVector(particles[i].acc.x * 0.9, abs(particles[i].acc) * 0.05)
					particles[i].vel = createVector(particles[i].vel.x * 0.9, particles[i].vel.y * this.density)
					force.setMag(map(particles[i].size, 5, 40, 1, 0.2))
					particles[i].applyForce(force)
				}
			}
		}
	}
	
}