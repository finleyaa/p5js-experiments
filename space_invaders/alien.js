function Alien(x, y){
	this.x = x
	this.y = y
	
	this.show = function(){
		ellipse(this.x, this.y, 50, 50)
	}
}