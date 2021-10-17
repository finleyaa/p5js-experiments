function Node(type, static, setX, setY){
	
	this.type = type
	this.static = static
	this.pos = createVector(x, y)
	if (setX && setY){
		this.pos = createVector(setX, setY)
	}
	this.size = guiBoundX / 2 - 20
	this.linkpoints = [createVector(this.pos.x, this.pos.y + this.size * 0.25), createVector(this.pos.x, this.pos.y + this.size * 0.75)]
	
	x += this.size + this.size / 6
	
	if (x + this.size + this.size / 6 > guiBoundX){
		x = 5
		y += this.size + 50
	}
	
	this.show = function(){
		if (type === 1){
			drawAnd(this.pos.copy(), this.size)
		} else if (type === 2){
			drawOr(this.pos.copy(), this.size)
		} else if (type === 3){
			drawXOr(this.pos.copy(), this.size)
		}
		stroke(0)
		strokeWeight(5)
		point(this.linkpoints[0].x, this.linkpoints[0].y)
		point(this.linkpoints[1].x, this.linkpoints[1].y)
		strokeWeight(1)
	}
	
}

function drawAnd(pos, size){
	angleMode(DEGREES)
	stroke(0)
	fill(156)
	line(pos.x, pos.y + size * 0.75, pos.x + size / 6, pos.y + size * 0.75)
	line(pos.x, pos.y + size * 0.25, pos.x + size / 6, pos.y + size * 0.25)
	pos.add(createVector(size / 6, 0))
	line(pos.x, pos.y, pos.x, pos.y + size)
	arc(pos.x, pos.y + size / 2, size, size, 270, 90)
	textAlign(CENTER)
	fill(255)
	textSize(18)
	textFont("Candara")
	text("AND", pos.x + size / 4, pos.y + size + 20)
	pos.add(createVector(size / 2, size / 2))
	line(pos.x, pos.y, pos.x + size / 6, pos.y)
}
function drawXOr(pos, size){
	angleMode(DEGREES)
	stroke(0)
	fill(156)
	line(pos.x, pos.y + size * 0.75, pos.x + size / 8 + size * 0.2, pos.y + size * 0.75)
	line(pos.x, pos.y + size * 0.25, pos.x + size / 8 + size * 0.2, pos.y + size * 0.25)
	pos.add(createVector(size / 8, 0))
	beginShape()
	vertex(pos.x, pos.y)
	bezierVertex(pos.x + size * 0.4, pos.y, pos.x + size * 0.8, pos.y, pos.x + size, pos.y + size / 2)
	bezierVertex(pos.x + size * 0.8, pos.y + size, pos.x + size * 0.4, pos.y + size, pos.x, pos.y + size)
	bezierVertex(pos.x + size * 0.4, pos.y + size * 0.33, pos.x + size * 0.4, pos.y + size * 0.66, pos.x, pos.y)
	endShape()
	pos.add(createVector(-(size / 10), 0))
	noFill()
	bezier(pos.x, pos.y, pos.x + size * 0.33, pos.y + size * 0.33, pos.x + size * 0.33, pos.y + size * 0.66, pos.x, pos.y + size)
	textAlign(CENTER)
	fill(255)
	textSize(18)
	textFont("Candara")
	text("XOR", pos.x + size / 2, pos.y + size + 20)
}

function drawOr(pos, size){
	angleMode(DEGREES)
	stroke(0)
	fill(156)
	line(pos.x, pos.y + size * 0.75, pos.x + size / 8 + size * 0.2, pos.y + size * 0.75)
	line(pos.x, pos.y + size * 0.25, pos.x + size / 8 + size * 0.2, pos.y + size * 0.25)
	pos.add(createVector(size / 8, 0))
	beginShape()
	vertex(pos.x, pos.y)
	bezierVertex(pos.x + size * 0.4, pos.y, pos.x + size * 0.8, pos.y, pos.x + size, pos.y + size / 2)
	bezierVertex(pos.x + size * 0.8, pos.y + size, pos.x + size * 0.4, pos.y + size, pos.x, pos.y + size)
	bezierVertex(pos.x + size * 0.2, pos.y + size * 0.75, pos.x + size * 0.4, pos.y + size  / 2, pos.x + size * 0.2, pos.y + size / 4)
	endShape(CLOSE)
	textAlign(CENTER)
	fill(255)
	textSize(18)
	textFont("Candara")
	pos.sub(createVector(size / 8, 0))
	text("OR", pos.x + size / 2, pos.y + size + 20)
}