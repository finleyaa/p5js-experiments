var G = 50

function ForceObject(x, y, attractor){
	
	this.pos = createVector(x, y)
	this.attractor = attractor
	
	this.show = function(){
		stroke(255)
		if (this.attractor){
			stroke(0, 255, 0)
		}
		strokeWeight(10)
		point(this.pos.x, this.pos.y)
	}
	
}

function Particle(x, y){
	
	this.pos = createVector(x, y)
	this.prevPos = createVector(x, y)
	this.vel = createVector(0, 0)
	this.acc = createVector(0, 0)
	
	this.applyForce = function(force){
		this.acc.add(force)
	}
	
	this.update = function(){
		this.prevPos = this.pos.copy()
		
		this.vel.add(this.acc)
		this.pos.add(this.vel)
		this.acc.mult(0)
	}
	
	this.show = function(){
		stroke(255)//, 25)
		strokeWeight(4)
		point(this.pos.x, this.pos.y)
		// line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y)
	}
	
	this.checkForces = function(forceobjects){
		for (var i = 0; i < forceobjects.length; i++){
			var obj = forceobjects[i]
			var force = p5.Vector.sub(obj.pos, this.pos)
			var dsquared = force.magSq()
			dsquared = constrain(dsquared, 5, 50)
			force.setMag(G / dsquared)
			if (!forceobjects[i].attractor){
				force.mult(-1)
			}
			this.applyForce(force)
		}
	}
	
}