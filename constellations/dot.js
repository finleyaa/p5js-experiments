var maxDist = 200

function Dot(){
	
	this.connNeighbours = []
	this.pos = createVector(random(windowWidth), random(windowHeight))
	this.acc = createVector(0, 0)
	this.vel = createVector(0, 0)
	this.speed = random(6, 8)
	this.xoffset = random(1000)
	this.yoffset = random(1000)
	
	this.update = function(){
		this.acc = createVector(map(noise(this.xoffset), 0, 1, -this.speed, this.speed), map(noise(this.yoffset), 0, 1, -this.speed, this.speed))
		
		for (var i = 0; i < dots.length; i++){
			if (dist(dots[i].pos.x, dots[i].pos.y, this.pos.x, this.pos.y) < 200){
				var addForce = p5.Vector.sub(dots[i].pos, this.pos)
				addForce.setMag(map(dist(dots[i].pos.x, dots[i].pos.y, this.pos.x, this.pos.y), 0, 200, 0.5, 0))
				
				this.acc.add(addForce)
			}
		}
		
		this.vel.add(this.acc)
		this.vel.setMag(5)
		
		this.acc.mult(0)
		
		this.xoffset += 0.01
		this.yoffset += 0.01
		
		this.pos.add(this.vel)
		
		if (this.pos.x > width) this.pos = createVector(0, this.pos.y)
		if (this.pos.x < 0) this.pos = createVector(width, this.pos.y)
		if (this.pos.y > height) this.pos = createVector(this.pos.x, 0)
		if (this.pos.y < 0) this.pos = createVector(this.pos.x, height)
	}
	
	this.checkNeighbours = function(){
		this.connNeighbours = []
		for (var i = 0; i < dots.length; i++){
			if (dist(dots[i].pos.x, dots[i].pos.y, this.pos.x, this.pos.y) < maxDist){
				this.connNeighbours.push(dots[i].pos.copy())
			}
		}
	}
	
	this.draw = function(){
		stroke(255)
		strokeWeight(1)
		fill(255)
		this.zoffset += 0.01
		ellipse(this.pos.x, this.pos.y, 12)
		
		for (var i = 0; i < this.connNeighbours.length; i++){
			var distance = dist(this.connNeighbours[i].x, this.connNeighbours[i].y, this.pos.x, this.pos.y)
			var alpha = map(distance, 20, maxDist, 255, 0)
			
			stroke(255, alpha)
			strokeWeight(3)
			line(this.connNeighbours[i].x, this.connNeighbours[i].y, this.pos.x, this.pos.y)
		}
	}
	
}