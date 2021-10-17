function Block(x, y){
	
	this.pos = createVector(x, y)
	this.hu = random(255)
	
	this.show = function(){
		colorMode(HSB)
		fill(this.hu, 255, 255)
		rect(this.pos.x, this.pos.y, width / 6, height / 20)
	}
	
	this.hit = function(ball){
		if (ball.pos.x >= this.pos.x && ball.pos.x <= this.pos.x + width / 6 && ball.pos.y >= this.pos.y && ball.pos.y <= this.pos.y + height / 20){
			return true
		} else {
			return false
		}
	}
	
}