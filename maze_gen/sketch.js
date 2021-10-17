var cellsize = 20
var cols, rows
var current
var grid = []
var stack = []
var count = 0

function setup() {
	createCanvas(800, 800)
	cols = floor(width / cellsize)
	rows = floor(height / cellsize)
	for (var j = 0; j < rows; j++){
		for (var i = 0; i < cols; i++){
			grid.push(new Cell(i, j))
		}
	}
	
	current = grid[0]
}

function draw() {
	background(51)
	if (current.x == 0 && current.y == 0 || mouseIsPressed){
		for (var i = 0; i < grid.length; i++){
			grid[i].show()
		}
		// saveCanvas("testing.jpg")
		// noLoop()
	}
	count++;
	
	current.visited = true
	current.current()
	
	var next = current.selectNeighbour()
	//console.log(current.x, current.y, next.x, next.y)
	
	if (next){
		next.visited = true
		
		stack.push(current)
		
		removeWalls(current, next)
		
		current = next
	} else if (stack.length > 0){
		current = stack.pop()
	}
}

function removeWalls(a, b){
	var x = a.x - b.x
	if (x === 1){
		a.walls[3] = false
		b.walls[1] = false
	} else if (x === -1){
		a.walls[1] = false
		b.walls[3] = false
	}
	var y = a.y - b.y
	if (y === 1){
		a.walls[0] = false
		b.walls[2] = false
	} else if (y === -1){
		a.walls[2] = false
		b.walls[0] = false
	}
}

