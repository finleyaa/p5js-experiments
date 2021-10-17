function Tree(x, y, time){
	
	this.branches = []
	this.pos = createVector(x, y)
	
	
}

function Branch(startpos, endpos){
	
	this.pos = startpos.copy()
	this.endpos = endpos.copy()
	
	this.draw = function(){
		stroke()
	}
	
}