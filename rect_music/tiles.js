function StartTile(x, y, type){
	
	this.rotation = 0
	this.angle = map(this.rotation, 0, 3, 0, 270)
	this.pos = createVector(x + scl / 2, y + scl / 2)
	this.bass = false
	if (type == 1){
		this.bass = true
	}
	
	this.step = frameRateSlider.value()
	
	this.show = function(){
		fill(255)
		rectMode(CENTER)
		rect(this.pos.x, this.pos.y, scl, scl)
		push()
		fill(0)
		angleMode(DEGREES)
		translate(this.pos.x, this.pos.y)
		rotate(this.angle)
		translate(0, -scl / 4)
		ellipse(0, 0, scl / 4)
		if (this.bass){
			noFill()
			arc(0, -scl * 0.05, scl / 2, scl * 0.6, 0, 180)
		}
		pop()
	}
	
	this.rotate = function(){
		this.rotation++
		if (this.rotation > 3){
			this.rotation = 0
		}
		this.angle = map(this.rotation, 0, 3, 0, 270)
	}
	
	this.start = function(){
		soundTiles.push(new SoundTile(this))
	}
	
	this.checkArea = function(){
		return 0
	}
	
}

function BounceTile(x, y, type){
	
	this.rotation = 0
	this.angle = map(this.rotation, 0, 3, 0, 270)
	this.pos = createVector(x + scl / 2, y + scl / 2)
	this.bass = false
	if (type == 1){
		this.bass = true
	}
	
	this.show = function(){
		fill(255)
		rectMode(CENTER)
		rect(this.pos.x, this.pos.y, scl, scl)
		push()
		fill(0)
		angleMode(DEGREES)
		translate(this.pos.x, this.pos.y)
		rotate(this.angle)
		translate(0, -scl / 4)
		rect(0, 0, scl / 4, scl / 4)
		if (this.bass){
			// line(-scl * 0.3, -scl / 10, -scl * 0.3, scl * 0.3)
			// line(-scl * 0.3, scl * 0.3, scl * 0.3, scl * 0.3)
			// line(scl * 0.3, scl * 0.3, scl * 0.3, -scl / 10)
			noFill()
			arc(0, -scl * 0.05, scl / 2, scl * 0.6, 0, 180)
		}
		pop()
	}
	
	this.rotate = function(){
		this.rotation++
		if (this.rotation > 3){
			this.rotation = 0
		}
		this.angle = map(this.rotation, 0, 3, 0, 270)
	}
	
	this.remove = function(){
		return 1
	}
	
	this.checkArea = function(){
		for (var i = 0; i < soundTiles.length; i++){
			var tileX = soundTiles[i].pos.x
			var tileY = soundTiles[i].pos.y
			if (tileX == this.pos.x && tileY == this.pos.y){
				if (this.bass){
					soundTiles[i].changeDirectionBass(this.rotation)
				} else {
					soundTiles[i].changeDirection(this.rotation)
				}
			}
		}
	}
	
	this.start = function(){
		return 0
	}
	
}

function SoundTile(starter){
	
	this.direction = starter.rotation
	this.vel = vectors[this.direction]
	this.pos = starter.pos.copy()
	this.sound = notes[this.direction]
	this.step = starter.step
	if (starter.bass){
		this.sound = notesBass[this.direction]
	}
	this.osc1 = new p5.Oscillator()
	if (reverb.checked()){
		this.reverb = new p5.Reverb()
		this.reverb.process(this.osc1, reverbSlider.value(), 1)
	}
	//this.osc2 = new p5.Oscillator()
	//this.osc3 = new p5.Oscillator()
	
	this.osc1.connect(filter1)
	
	this.osc1.freq(this.sound)
	
	this.osc1.amp(volumeSlider.value())
	
	this.osc1.start()
	
	this.reverbChanged = function(){
		if (reverb.checked()){
			this.reverb = new p5.Reverb()
			
			this.osc.disconnect()
			
			this.reverb.process(this.osc1, reverbSlider.value(), 2)
		} else {
			this.reverb = 0
		}
	}
	
	this.show = function(){
		fill(0, 255, 0, 60)
		rectMode(CENTER)
		rect(this.pos.x, this.pos.y, scl, scl)
	}
	
	this.update = function(){
		this.pos.add(this.vel)
	}
	
	this.changeDirection = function(dir){
		this.direction = dir
		this.vel = vectors[this.direction]
		
		this.sound = notes[this.direction]
		
		this.osc1.freq(this.sound)
	}
	
	this.changeDirectionBass = function(dir){
		this.direction = dir
		this.vel = vectors[this.direction]
		
		this.sound = notesBass[this.direction]		
		this.osc1.freq(this.sound)
	}
	
	this.remove = function(){
		this.osc1.stop()
	}
}