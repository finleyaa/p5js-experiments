function Cell(x, y){
	this.x = x
	this.y = y
	this.visited = false
	this.walls = [true, true, true, true]
	
	this.show = function(){
		var i = this.x * cellsize
		var j = this.y * cellsize
		stroke(0)
		if (this.walls[0]){
			line(i, j, i + cellsize, j)
		}
		if (this.walls[1]){
			line(i + cellsize, j, i + cellsize, j + cellsize)
		}
		if (this.walls[2]){
			line(i + cellsize, j + cellsize, i, j + cellsize)
		}
		if (this.walls[3]){
			line(i, j + cellsize, i, j)
		}
		
		if (this.visited){
			noStroke()
			fill(255, 0, 0, 50)
			rect(i, j, cellsize, cellsize)
		}
	}
	
	this.current = function(){
		var i = this.x * cellsize
		var j = this.y * cellsize
		noStroke()
		fill(0, 255, 0, 100)
		rect(i, j, cellsize, cellsize)
	}
	
	this.selectNeighbour = function(){
		var neighbours = []
		
		var top = grid[index(x, y - 1)]
		var right = grid[index(x + 1, y)]
		var bottom = grid[index(x, y + 1)]
		var left = grid[index(x - 1, y)]
		
		if (top && !top.visited){
			neighbours.push(top)
		}
		if (right && !right.visited){
			neighbours.push(right)
		}
		if (bottom && !bottom.visited){
			neighbours.push(bottom)
		}
		if (left && !left.visited){
			neighbours.push(left)
		}
		if (neighbours.length > 0){
			var r = floor(random(0, neighbours.length))
			return neighbours[r]
		} else {
			return undefined
		}
	}
}

function index(i, j) {
	if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
		return -1;
	}
	return i + j * cols;
}