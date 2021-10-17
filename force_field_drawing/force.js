function Force(col, row, xoffset, yoffset){
	
	this.pos = createVector(width / cols * col, height / rows * row)
	this.dir = map(noise(this.xoffset, this.yoffset), 0, 1, 0, 360)
	this.xoffset = xoffset
	this.yoffset = yoffset
	this.closeAgents = []
	
	this.findAgents = function(){
		this.closeAgents = []
		for (var i = 0; i < agents.length; i++){
			if (agents[i].pos.x < this.pos.x + width / cols && agents[i].pos.x > this.pos.x && agents[i].pos.y < this.pos.y + height / rows && agents[i].pos.y > this.pos.y){
				this.closeAgents.push(agents[i])
			}
		}
	}
	
	this.pushAgents = function(){
		for (var i = 0; i < this.closeAgents.length; i++){
			angleMode(DEGREES)
			this.closeAgents[i].applyForce(p5.Vector.fromAngle(this.dir))
		}
	}
	
	this.update = function(){
		this.xoffset += 0.0002
		this.yoffset += 0.0002
		this.dir = map(noise(this.xoffset, this.yoffset), 0, 1, 0, 360)
	}
	
	this.draw = function(){
		stroke(0, 255, 0, 255)
		strokeWeight(4)
		line(this.pos.x + width / cols / 2, this.pos.y + height / rows / 2, this.pos.x + width / cols / 2 + this.dir.x, this.pos.y + height / rows / 2 + this.dir.y)
		point(this.pos.x, this.pos.y)
	}
	
}