function Ship(){
	this.x = width/2
	this.y = height - 45
	
	this.show = function(){
		rectMode(CENTER)
		rect(this.x, this.y, 20, 50)
	}
	
	this.move = function(dir){
		if ((this.x + dir * 5) > 0 && (this.x + dir * 5) < width){
			this.x += dir * 5
		}
	}
}