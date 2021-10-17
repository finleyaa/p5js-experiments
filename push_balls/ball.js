function Ball(){
	this.pos = createVector(random(width), random(height))
	this.d = random(10, 20)
	
	this.show = function(){
		colorMode(HSB)
		var dis = dist(width/2, height/2, this.pos.x, this.pos.y)
		var centredis = dist(width/2, height/2, 0, 0)
		var colour = map(dis, 0, centredis, 0, 255)
		noStroke()
		fill(colour, 255, 255)
		ellipse(this.pos.x, this.pos.y, this.d, this.d)
	}
	
	this.touched = function(vector){
		vector = vector.mult(10)
		this.pos.add(vector)
	}
}