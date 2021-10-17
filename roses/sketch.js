var nSlider
var dSlider
var k

function setup() {
	createCanvas(windowWidth, windowHeight)
	nSlider = createSlider(1, 10, 5)
	dSlider = createSlider(1, 10, 5)
	nSlider.position(10, 10)
	dSlider.position(10, 40)
}

function draw() {
	k = nSlider.value() / dSlider.value()
	background(0)
	translate(width / 2, height / 2)
	stroke(255)
	strokeWeight(4)
	noFill()
	beginShape()
	for (var i = 0; i < TWO_PI * dSlider.value(); i += 0.01){
		var r = 200 * cos(k * i)
		var x = r * cos(i)
		var y = r * sin(i)
		vertex(x, y)
	}
	endShape()
}