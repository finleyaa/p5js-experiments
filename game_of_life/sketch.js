var blocksize = 20
var columns, rows, xStep, yStep
var cells = []
var running
var clearButton, title, p
var savedBoard = []

function setup() {
	title = createElement("h1", "Conway's Game of Life")
	running = false
	p = createP("Running: " + running)
	//createCanvas(windowWidth - (windowWidth % blocksize), windowHeight - (windowHeight % blocksize))
	createCanvas(800, 800)
	p.position(width + 10, 40)
	clearButton = createButton("Clear")
	clearButton.mousePressed(clearBoard)
	clearButton.position(width + 10, 80)
	clearButton.size(47 * 2, 21 * 2)
	clearButton.style("font-size", 20)
	clearButton.style("font-weight", "bold")
	columns = floor(width / blocksize)
	rows = floor(height / blocksize)
	xStep = width / columns
	yStep = height / rows
}

function draw() {
	background(51)
	
	stroke(255)
	p.html("Running: " + running)
	
	for (var x = 0; x < width; x += xStep){
		for (var y = 0; y < height; y += yStep){
			line(x, 0, x, height)
			line(0, y, width, y)
		}
	}
	
	for (var i = cells.length - 1; i >= 0; i--){
		rect(cells[i].x, cells[i].y, blocksize, blocksize)
	}
	
	if (running){
		var toadd = []
		
		for (var x = 0; x < width; x += xStep){
			for (var y = 0; y < height; y += yStep){
				var vect = createVector(x, y)
				var neighbours = 0
				var cell = false
				for (var i = 0; i < cells.length; i++){
					if (dist(vect.x, vect.y, cells[i].x, cells[i].y) <= sqrt(2) * blocksize && dist(vect.x, vect.y, cells[i].x, cells[i].y) > 1){
						neighbours++
					}
				}
				for (var i = 0; i < cells.length; i++){
					if (cells[i].x == vect.x && cells[i].y == vect.y){
						cell = true
					}
				}
				if (neighbours == 2 && cell){
					toadd.push(vect)
				} else if (neighbours == 3){
					toadd.push(vect)
				}
			}
		}
		
		cells = []
		for (var i = 0; i < toadd.length; i++){
			cells.push(toadd[i])
		}
	}
}

function clearBoard(){
	cells = []
}

function mousePressed(){
	if (mouseX < width && mouseY < height){
		var filled = false
		var index = 0
		for (var i = 0; i < cells.length; i++){
			if (cells[i].x == mouseX - mouseX % blocksize && cells[i].y == mouseY - mouseY % blocksize){
				filled = true
				index = i
			}
		}
		if (mouseButton == LEFT){
			if (filled === false){
				cells.push(createVector(mouseX - mouseX % blocksize, mouseY - mouseY % blocksize))
			}
		} else if (mouseButton == RIGHT){
			if (filled === true){
				cells.splice(index, 1)
			}
		}
	}
	
	return false
}

function mouseDragged(){
	if (mouseX < width && mouseY < height){
		var filled = false
		var index = 0
		for (var i = 0; i < cells.length; i++){
			if (cells[i].x == mouseX - mouseX % blocksize && cells[i].y == mouseY - mouseY % blocksize){
				filled = true
				index = i
			}
		}
		if (mouseButton == LEFT){
			if (filled === false){
				cells.push(createVector(mouseX - mouseX % blocksize, mouseY - mouseY % blocksize))
			}
		} else if (mouseButton == RIGHT){
			if (filled === true){
				cells.splice(index, 1)
			}
		}
	}
	
	return false
}

function keyPressed(){
	running = !running
	if (running == false){
		cells = savedBoard
	} else {
		savedBoard = cells
	}
}