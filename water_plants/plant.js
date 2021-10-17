function Plant(x, y){
	
	this.branches = []
	this.pos = createVector(x, y)
	this.vel = createVector(0, 0)
	this.acc = createVector(0, 0)
	
	this.applyForce = function(force){
		this.acc.add(force)
	}
	
	this.update = function(){
		
		this.vel.add(this.acc)
		this.pos.add(this.vel)
		this.acc.mult(0)
		
		for (var i = 0; i < this.branches.length; i++){
			this.branches[i].update()
		}
		
	}
	
	this.addBranch = function(branch){
		this.branches.push(branch)
	}
	
	this.draw = function(){
		for (var i = 0; i < this.branches.length; i++){
			this.branches[i].draw()
		}
	}
	
}