function CurveCreator(x, y){
	
	this.pos = createVector(x, y)
	this.circangle = 0
	this.pointangle = 0
	this.size = width / 6
	this.pointhist = []
	
	this.show = function(){
		angleMode(DEGREES)
		noFill()
		push()
		// translate(width / 2, height / 2)
		// ellipse(0, 0, height * 0.8)
		// rotate(this.circangle)
		// translate(0, -height * 0.8 / 2 + this.size / 2)
		//ellipse(0, 0, this.size)
		translate(this.pos.x, this.pos.y)
		rotate(this.pointangle)
		strokeWeight(4)
		point(0, -this.size / 2)
		pop()
		this.circangle++
		this.pointangle++
		this.pos.add(createVector(1, 0))
	}
	
}