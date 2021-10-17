function Platform(x1, y1, x2, y2){
	
	this.startPos = createVector(x1, y1)
	this.endPos = createVector(x2, y2)
	this.gradient = (y1 - y2) / (x1 - x2)
	this.yintercept = createVector(0, y1 - this.gradient * x1)
	this.normal = createVector(-(this.endPos.y - this.startPos.y), this.endPos.x - this.startPos.x)
	this.normal.setMag(1)
	
	this.show = function(){
		strokeWeight(6)
		stroke(0)
		line(this.startPos.x, this.startPos.y, this.endPos.x, this.endPos.y)
		stroke(255, 0, 0)
		line(this.startPos.x + this.normal.x, this.startPos.y + this.normal.y, this.startPos.x, this.startPos.y)
		// line(this.yintercept.x, this.yintercept.y, this.startPos.x, this.startPos.y)
	}
	
	this.checkParticles = function(){
		for (var i = 0; i < particles.length; i++){
			// check for balls and apply normal force
			var part = particles[i]
			if (dragging != part){
				var expectedY = floor(part.pos.x * this.gradient + this.yintercept.y - part.size / 2)
				// console.log(expectedY, part.pos.y)
				if (abs(expectedY - part.pos.y) < 5 && part.pos.x < this.endPos.x && part.pos.x > this.startPos.x){
					console.log("IN POSITION")
					part.pos = createVector(part.pos.x, expectedY)
					var dotp = part.vel.x * this.normal.x + part.vel.y * this.normal.y
					var force = createVector(dotp * this.normal.x, dotp * this.normal.y)
					part.vel = createVector(part.vel.x - force.x, part.vel.y - force.y)
				}
			}
		}
	}
	
}