var inputLayer
var layer1
var outputLayer
var colours
var desiredColour
var outputError
var lConstantSlider
var colour1Slider, colour2Slider, desiredSlider
var previousResults = [0, 0]
var testing = true
var maxRand = 0.5

function setup() {
	createCanvas(windowWidth, windowHeight - 100)
	lConstantSlider = createSlider(0, 0.000003, 0.000001, 0.000000001)
	colour1Slider = createSlider(1, 255, random(1, 256), 1)
	colour2Slider = createSlider(1, 255, random(1, 256), 1)
	desiredSlider = createSlider(1, 255, random(1, 256), 1)
	colours = [colour1Slider.value(), colour2Slider.value()]
	desiredColour = desiredSlider.value()
	bestResult = desiredColour
	desiredSlider.position((width * 0.75) - (desiredSlider.size().width / 2), height * 0.5 + 70)
	colour1Slider.position((width * 0.25) - (colour1Slider.size().width / 2), height * 0.25 - 90)
	colour2Slider.position((width * 0.25) - (colour2Slider.size().width / 2), height * 0.75 - 90)
	inputLayer = new InputLayer(colours)
	colour1Slider.changed(updateInputLayer)
	colour2Slider.changed(updateInputLayer)
	layer1 = new HiddenLayer(4, [random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand)], inputLayer)
	layer2 = new HiddenLayer(4, [random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand)], layer1)
	layer3 = new HiddenLayer(4, [random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand)], layer2)
	layer4 = new HiddenLayer(4, [random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand), random(0, maxRand)], layer3)
	outputLayer = new OutputLayer(1, [random(0, 1), random(0, 1), random(0, 1), random(0, 1)], layer4)
	layer1.update()
	layer2.update()
	layer3.update()
	layer4.update()
	outputLayer.update()
	previousResults[0]++
	if (outputLayer.neurons[0] == desiredColour){
		previousResults[1]++
	}
}

function updateInputLayer(){
	if (!testing){
		colours = [colour1Slider.value(), colour2Slider.value()]
	}
	inputLayer.update(colours)
}

function draw() {
	//desiredColour = desiredSlider.value()
	background(51)
	colorMode(HSB)
	stroke(0)
	strokeWeight(5)
	line(width * 0.25, height * 0.25, width * 0.5, height * 0.16)
	line(width * 0.25, height * 0.25, width * 0.5, height * 0.5)
	line(width * 0.25, height * 0.25, width * 0.5, height * 0.84)
	line(width * 0.25, height * 0.75, width * 0.5, height * 0.16)
	line(width * 0.25, height * 0.75, width * 0.5, height * 0.5)
	line(width * 0.25, height * 0.75, width * 0.5, height * 0.84)
	
	line(width * 0.5, height * 0.16, width * 0.75, height * 0.5)
	line(width * 0.5, height * 0.5, width * 0.75, height * 0.5)
	line(width * 0.5, height * 0.84, width * 0.75, height * 0.5)
	
	strokeWeight(1)
	fill(colours[0], 100, 255)
	ellipse(width * 0.25, height * 0.25, 100)
	
	fill(colours[1], 100, 255)
	ellipse(width * 0.25, height * 0.75, 100)
	
	fill(outputLayer.neurons[0], 100, 255)
	ellipse(width * 0.75, height * 0.5, 100)
	
	fill(layer1.neurons[0], 100, 255)
	ellipse(width * 0.5, height * 0.16, 100)
	
	fill(layer1.neurons[1], 100, 255)
	ellipse(width * 0.5, height * 0.5, 100)
	
	fill(layer1.neurons[2], 100, 255)
	ellipse(width * 0.5, height * 0.84, 100)
	
	fill(255)
	stroke(0)
	textAlign(CENTER)
	textSize(32)
	text(floor(outputLayer.neurons[0]), width * 0.75, height * 0.5 - 80)
	fill(255)
	stroke(0)
	textAlign(LEFT, TOP)
	textSize(32)
	text("Iteration: " + previousResults[0], 0, 0)
	text("Percentage Correct: " + (previousResults[1] / previousResults[0] * 100).toFixed(2) + "%", 0, 30)
	text("Desired value: " + desiredColour, 0, 60)
	text("Error: " + (desiredColour - outputLayer.neurons[0]).toFixed(2), 0, 90)
	if (testing){
		if (floor(outputLayer.neurons[0]) == floor(desiredColour)){
			previousResults[1]++
		}
		layer1.changeWeights()
		layer2.changeWeights()
		layer3.changeWeights()
		layer4.changeWeights()
		outputLayer.changeWeights()
	}
	textSize(12)
	text(layer1.weights[0].toFixed(2), width * 0.25 + (width * 0.5 - width * 0.25) / 2, height * 0.25 + (height * 0.16 - height * 0.25) / 2)
	text(layer1.weights[1].toFixed(2), width * 0.25 + (width * 0.5 - width * 0.25) / 2, height * 0.75 + (height * 0.16 - height * 0.75) / 2)
	text(layer1.weights[2].toFixed(2), width * 0.25 + (width * 0.5 - width * 0.25) / 2, height * 0.25 + (height * 0.5 - height * 0.25) / 2)
	text(layer1.weights[3].toFixed(2), width * 0.25 + (width * 0.5 - width * 0.25) / 2, height * 0.75 + (height * 0.5 - height * 0.75) / 2)
	text(layer1.weights[4].toFixed(2), width * 0.25 + (width * 0.5 - width * 0.25) / 2, height * 0.25 + (height * 0.84 - height * 0.25) / 2)
	text(layer1.weights[5].toFixed(2), width * 0.25 + (width * 0.5 - width * 0.25) / 2, height * 0.75 + (height * 0.84 - height * 0.75) / 2)
	text(outputLayer.weights[0].toFixed(2), width * 0.5 + (width * 0.75 - width * 0.5) / 2, height * 0.16 + (height * 0.5 - height * 0.16) / 2)
	text(outputLayer.weights[1].toFixed(2), width * 0.5 + (width * 0.75 - width * 0.5) / 2, height * 0.5 + (height * 0.5 - height * 0.5) / 2)
	text(outputLayer.weights[2].toFixed(2), width * 0.5 + (width * 0.75 - width * 0.5) / 2, height * 0.84 + (height * 0.5 - height * 0.84) / 2)
	layer1.update()
	layer2.update()
	layer3.update()
	layer4.update()
	outputLayer.update()
	if (testing){
		previousResults[0]++
		colours = [random(1, 255), random(1, 255)]
		updateInputLayer()
	}
}

function keyPressed(){
	testing = !testing
}