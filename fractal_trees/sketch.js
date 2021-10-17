var slider
var reducer

function setup(){
	createCanvas(600, 600)
	slider = createSlider(0, 180, 45, 0.1)
	reducer = 0.6
}

function draw(){
	background(51)
	translate(300, height)
	stroke(255)
	angleMode(DEGREES)
	branch(150)
}

function branch(len){
	line(0, 0, 0, -len)
	translate(0, -len)
	if (len > 10){
		push()
		rotate(slider.value())
		branch(len*reducer)
		pop()
		push()
		rotate(-slider.value())
		branch(len*reducer)
		// pop()
		// push()
		// rotate(slider.value()/1.5)
		// branch(len*reducer)
		// pop()
		// push()
		// rotate(-slider.value()/1.5)
		// branch(len*reducer)
		// pop()
		// push()
		// rotate(-slider.value()/4)
		// branch(len*reducer)
		pop()
		// rotate(slider.value()/4)
		// branch(len*reducer)
	}
}