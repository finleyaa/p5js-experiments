function Shot(x, y){
	this.x = x
	this.y = y
	
	this.update = function(){
		this.y -= 10
	}
	
	this.show = function(){
		ellipse(this.x, this.y, 10, 10)
	}
}