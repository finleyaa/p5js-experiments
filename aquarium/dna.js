var carnivorechance = 0.01

function DNA(){
	
	this.width = random(10, 50)
	this.height = map(this.width, 10, 50, 10, 20)
	this.maxspeed = random(3, 20)
	this.hu = random(0, 150)
	if (random(1) < carnivorechance){
		this.carnivore = true
	} else {
		this.carnivore = false
	}
	
}