var poles = []
var scl = 0.20
var movingBlock = 0
var blocksAmount = 4

function setup() {
	createCanvas(windowWidth, windowHeight)
	poles.push(new Pole(windowWidth * 0.2, height - height / 100))
	poles.push(new Pole(windowWidth * 0.50, height - height / 100))
	poles.push(new Pole(windowWidth * 0.8, height - height / 100))
	for (var i = 0; i < blocksAmount; i++){
		poles[0].addBlock(width * scl)
		scl -= 0.03
	}
}

function draw() {
	background(255)
	for (var i = 0; i < poles.length; i++){
		poles[i].show()
		for (var n = 0; n < poles[i].blocks.length; n++){
			poles[i].blocks[n].show()
		}
	}
	if (poles[2].blocks.length == blocksAmount){
		fill(0)
		textAlign(CENTER, CENTER)
		textSize(32)
		text("YOU WIN!", width / 2, 20)
		noDraw()
	}
}

function mouseDragged(){
	for (var i = 0; i < poles.length; i++){
		for (var n = 0; n < poles[i].blocks.length; n++){
			var block = poles[i].blocks[n]
			if (movingBlock == 0 || movingBlock == block){
				if (poles[i].blocks[poles[i].blocks.length - 1] == block && mouseX < block.pos.x + block.size / 2 && mouseX > block.pos.x - block.size && mouseY > block.pos.y - height / 50 && mouseY < block.pos.y + height / 50){
					block.pos = createVector(mouseX, mouseY)
					movingBlock = block
					break
				}
			}
		}
	}
}

function mouseReleased(){
	if (movingBlock != 0){
		var block = movingBlock
		for (var t = 0; t < poles.length; t++){
			if (block.parent != poles[t]){
				if (poles[t].pos.x < block.pos.x + block.size / 2 && poles[t].pos.x > block.pos.x - block.size / 2){
					if (poles[t].blocks.length != 0){
						if (poles[t].blocks[poles[t].blocks.length - 1].size > block.size){
							poles[t].addBlock(block.size)
							block.parent.blocks.splice(block.parent.blocks.length - 1, 1)
						}
					} else {
						poles[t].addBlock(block.size)
						block.parent.blocks.splice(block.parent.blocks.length - 1, 1)
					}
				}
			}
		}
		block.pos = createVector(block.parent.pos.x, block.parent.pos.y - (block.parent.blocks.length - 1) * (height / 25) - height / 33)
		
		movingBlock = 0
	}
}