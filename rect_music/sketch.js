var cols, rows
var scl = 40
var tiles = []
//var chords = [[261.6, 329.6, 392.0], [349.23, 440.00, 523.25], [392.00, 493.88, 587.33], [523.25, 659.25, 783.99]]
var notes = [196.00, 246.94, 293.66, 349.23]
var notesBass = [49.00, 61.7, 73.4, 87.3]
var vectors
var filter1
var selectedTile
var width
var selector
var soundTiles = []
var showCounter = 0
var started = false
var frameRateSlider
var volumeSlider
var reverb
var reverbSlider
var editStepSlider

function setup() {
	//frameRate(5)
	createCanvas(windowWidth - windowWidth % scl, windowHeight - windowHeight % scl - scl * 2)
	vectors = [createVector(0, -1 * scl), createVector(1 * scl, 0), createVector(0, 1 * scl), createVector(-1 * scl, 0)]
	filter1 = new p5.LowPass()
	filter1.freq(50)
	cols = width / scl
	rows = height / scl
	selectedTile = 0
	selector = createSelect()
	selector.option("Start Tile")
	selector.option("Start Tile (Bass)")
	selector.option("Bounce Tile")
	selector.option("Bounce Tile (Bass)")
	selector.changed(tileTypeChanged)
	frameRateSlider = createSlider(1, 25, 12, 1)
	volumeSlider = createSlider(0, 1, 0.1, 0.01)
	volumeSlider.mouseMoved(updateAmp)
	reverb = createCheckbox("Reverb", false)
	reverb.changed(reverbChanged)
	reverbSlider = createSlider(1, 5, 1, 1)
	reverbSlider.mouseMoved(reverbChanged)
	editStepSlider = createSlider(1, 25, 0, 1)
	editStepSlider.position(width * 0.4, height + (windowHeight - height) * 0.4)
	editStepSlider.hide()
}

function reverbChanged(){
	for (var i = 0; i < soundTiles.length; i++){
		soundTiles[i].reverbChanged()
	}
}

function updateAmp(){
	for (var i = 0; i < soundTiles.length; i++){
		soundTiles[i].osc1.amp(volumeSlider.value())
	}
}

function stepEdited(tile){
	tiles[tile].step = editStepSlider.value()
}

function tileTypeChanged(){
	if (selector.value() == "Start Tile"){
		selectedTile = 0
	} else if (selector.value() == "Bounce Tile"){
		selectedTile = 1
	} else if (selector.value() == "Bounce Tile (Bass)"){
		selectedTile = 2
	} else if (selector.value() == "Start Tile (Bass)"){
		selectedTile = 3
	}
}

function draw() {
	stroke(0)
	for (var i = 0; i < tiles.length; i++){
		tiles[i].checkArea()
	}
	background(51)
	for (var i = 0; i < rows; i++){
		line(0, i * scl, width, i * scl)
	}
	for (var i = 0; i < cols; i++){
		line(i * scl, 0, i * scl, height)
	}
	
	for (var i = 0; i < tiles.length; i++){
		tiles[i].show()
	}
	for (var i = 0; i < soundTiles.length; i++){
		soundTiles[i].show()
	}
		
	for (var i = 0; i < soundTiles.length; i++){
		
		if (showCounter % soundTiles[i].step == 0){
		soundTiles[i].update()
		}
	}
	showCounter++
}

function mousePressed(){
	if (mouseButton == LEFT && mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0){
		var filled = [false, 0]
		
		for (var i = 0; i < tiles.length; i++){
			var tileX = tiles[i].pos.x - scl / 2
			var tileY = tiles[i].pos.y - scl / 2
			var x = mouseX - mouseX % scl
			var y = mouseY - mouseY % scl
			if (tileX == x && tileY == y){
				filled = [true, i]
				break
			}
		}
		if (!filled[0]){
			if (selectedTile == 0){
				tiles.push(new StartTile(mouseX - mouseX % scl, mouseY - mouseY % scl, 0))
			} else if (selectedTile == 1){
				tiles.push(new BounceTile(mouseX - mouseX % scl, mouseY - mouseY % scl, 0))
			} else if (selectedTile == 2){
				tiles.push(new BounceTile(mouseX - mouseX % scl, mouseY - mouseY % scl, 1))
			} else if (selectedTile == 3){
				tiles.push(new StartTile(mouseX - mouseX % scl, mouseY - mouseY % scl, 1))
			}
		} else {
			editStepSlider.value(tiles[filled[1]].step)
			editStepSlider.show()
			editStepSlider.mouseMoved(function(){ stepEdited(i)})
		}
	} else if (mouseButton == CENTER){
		var x = mouseX - mouseX % scl
		var y = mouseY - mouseY % scl
		for (var i = 0; i < tiles.length; i++){
			if (x == tiles[i].pos.x - scl / 2 && y == tiles[i].pos.y - scl / 2){
				tiles[i].rotate()
			}
		}
	} else if (mouseButton == RIGHT){
		var x = mouseX - mouseX % scl
		var y = mouseY - mouseY % scl
		for (var i = 0; i < tiles.length; i++){
			if (x == tiles[i].pos.x - scl / 2 && y == tiles[i].pos.y - scl / 2){
				tiles.splice(i, 1)
			}
		}
	}
}

function keyPressed(){
	
	if (!started){
		soundTiles = []
		for (var i = 0; i < tiles.length; i++){
			tiles[i].start()
		}
		started = true
		reverb.hide()
		reverbSlider.hide()
	} else {
		for (var i = 0; i < soundTiles.length; i++){
			soundTiles[i].remove()
		}
		soundTiles = []
		started = false
		reverb.show()
		reverbSlider.show()
	}
	
}