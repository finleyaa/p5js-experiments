var guiBoundX
var nodes = []
var x
var y
var dragging = 0

function setup() {
	createCanvas(windowWidth, windowHeight)
	guiBoundX = width / 6
	x = 5
	y = 5
	var type = 1
	for (var i = 0; i < 3; i++){
		nodes[i] = new Node(type, true)
		type++
	}
}

function draw() {
	background(51)
	drawGUI()
	fill(255)
	ellipse(guiBoundX / 2, height - guiBoundX / 3, guiBoundX - 100)
	textAlign(CENTER, CENTER)
	textSize(16)
	fill(0)
	text("DRAG TO DELETE", guiBoundX / 2, height - guiBoundX / 3)
	for (var i = 0; i < nodes.length; i++){
		nodes[i].show()
	}
}

function drawGUI(){
	fill(70)
	stroke(0)
	rect(0, 0, guiBoundX, height)
}

function mouseDragged(){
	
	for (var i = 0; i < nodes.length; i++){
		var node = nodes[i]
		if (mouseX < node.pos.x + guiBoundX / 2 && mouseX > node.pos.x && mouseY < node.pos.y + guiBoundX / 2 && mouseY > node.pos.y){
			if (dragging == i || dragging == -1){
				if (node.static){
					nodes.push(new Node(node.type, false, mouseX - guiBoundX / 4, mouseY - guiBoundX / 4))
					dragging = nodes.length - 1
				} else {
					node.pos = createVector(mouseX - guiBoundX / 4, mouseY - guiBoundX / 4)
					node.linkpoints = [createVector(node.pos.x, node.pos.y + node.size * 0.25), createVector(node.pos.x, node.pos.y + node.size * 0.75)]
					dragging = i
				}
			}
		}
	}
	
}

function mouseReleased(){
	if (mouseX < guiBoundX / 2 + (guiBoundX - 100) / 2 && mouseX > guiBoundX / 2 - (guiBoundX - 100) / 2 && mouseY < height - guiBoundX / 3 + (guiBoundX - 100) / 2 && mouseY > height - guiBoundX / 3 - (guiBoundX - 100) / 2){
		if (dragging != -1){
			nodes.splice(dragging, 1)
		}
	} else if (mouseX < guiBoundX && dragging != -1){
		if (!nodes[dragging].static){
			nodes[dragging].pos.x = guiBoundX
		}
	}
	dragging = -1
}