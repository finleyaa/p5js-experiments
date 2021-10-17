var inputLayer, hiddenLayer, outputLayer
var target = 0
var data = [[1, 1, 0], [-1, 1, 1], [1, -1, 1]]

function setup(){
	createCanvas(windowWidth, windowHeight)
	inputLayer = new InputLayer([data[0][0], data[0][1]])
	target = data[0][2]
	hiddenLayer = new HiddenLayer(3, 6, inputLayer)
	outputLayer = new OutputLayer(1, 3, hiddenLayer)
	hiddenLayer.update()
	outputLayer.update()
	console.log("Output: " + outputLayer.neurons[0])
	
	changeWeights(inputLayer, [hiddenLayer], outputLayer)
}

function test(num1, num2){
	inputLayer.update([num1, num2])
	hiddenLayer.update()
	outputLayer.update()
	console.log("Output: " + outputLayer.neurons[0])
}

function train(amount){
	for (var i = 0; i < amount; i++){
		inputLayer.update([data[i % 3][0], data[i % 3][1]])
		target = data[i % 3][2]
		hiddenLayer.update()
		outputLayer.update()
		changeWeights(inputLayer, [hiddenLayer], outputLayer)
	}
}

function draw(){
	background(255)
	strokeWeight(2)
	fill(0)
	stroke(255, 0, 0)
	line(width / 5, height / 3, width / 5 * 2.3, height / 5, 200)
	line(width / 5, height / 3, width / 5 * 2.3, height / 5 * 4, 200)
	line(width / 5, height / 3, width / 5 * 2.3, height / 5 * 2.5, 200)
	stroke(0, 255, 0)
	line(width / 5, height / 3 * 2, width / 5 * 2.3, height / 5, 200)
	line(width / 5, height / 3 * 2, width / 5 * 2.3, height / 5 * 4, 200)
	line(width / 5, height / 3 * 2, width / 5 * 2.3, height / 5 * 2.5, 200)
	stroke(0, 0, 255)
	line(width / 5 * 2.3, height / 5, width / 5 * 3.6, height / 2)
	line(width / 5 * 2.3, height / 5 * 4, width / 5 * 3.6, height / 2)
	line(width / 5 * 2.3, height / 5 * 2.5, width / 5 * 3.6, height / 2)
	stroke(0)
	fill(255)
	ellipse(width / 5, height / 3, 200)
	ellipse(width / 5, (height / 3) * 2, 200)
	ellipse(width / 5 * 2.3, height / 5, 200)
	ellipse(width / 5 * 2.3, height / 5 * 4, 200)
	ellipse(width / 5 * 2.3, height / 5 * 2.5, 200)
	ellipse(width / 5 * 3.6, height / 2, 200)
	textAlign(CENTER, CENTER)
	textSize(20)
	textStyle(BOLD)
	textFont("Franklin Gothic Medium")
	fill(0)
	stroke(0)
	fill(255, 0, 0)
	text(Math.round(hiddenLayer.weights[0] * 100) / 100, (width / 5 + width / 5 * 2.3) / 2, (height / 3 + height / 5) / 2 - 20)
	text(Math.round(hiddenLayer.weights[1] * 100) / 100, (width / 5 + width / 5 * 2.3) / 2, (height / 3 + height / 5 * 2.5) / 2 - 20)
	text(Math.round(hiddenLayer.weights[2] * 100) / 100, (width / 5 + width / 5 * 2.3) / 2, (height / 3 + height / 5 * 4) / 2 - 20)
	fill(0, 255, 0)
	text(Math.round(hiddenLayer.weights[3] * 100) / 100, (width / 5 + width / 5 * 2.3) / 2, (height / 3 * 2 + height / 5) / 2 - 20)
	text(Math.round(hiddenLayer.weights[4] * 100) / 100, (width / 5 + width / 5 * 2.3) / 2, (height / 3 * 2 + height / 5 * 2.5) / 2 - 20)
	text(Math.round(hiddenLayer.weights[5] * 100) / 100, (width / 5 + width / 5 * 2.3) / 2, (height / 3 * 2 + height / 5 * 4) / 2 - 20)
	fill(0, 100, 255)
	text(Math.round(outputLayer.weights[0] * 100) / 100, (width / 5 * 2.3 + width / 5 * 3.6) / 2, (height / 5 + height / 2) / 2 - 20)
	text(Math.round(outputLayer.weights[1] * 100) / 100, (width / 5 * 2.3 + width / 5 * 3.6) / 2, (height / 5 * 2.5 + height / 2) / 2 - 20)
	text(Math.round(outputLayer.weights[2] * 100) / 100, (width / 5 * 2.3 + width / 5 * 3.6) / 2, (height / 5 * 4 + height / 2) / 2 - 20)
	fill(0)
	noStroke()
	text(Math.round(inputLayer.neurons[0] * 100) / 100, width / 5, height / 3)
	text(Math.round(inputLayer.neurons[1] * 100) / 100, width / 5, height / 3 * 2)
	text(Math.round(hiddenLayer.neurons[0] * 100) / 100, width / 5 * 2.3, height / 5)
	text(Math.round(hiddenLayer.neurons[1] * 100) / 100, width / 5 * 2.3, height / 5 * 4)
	text(Math.round(hiddenLayer.neurons[2] * 100) / 100, width / 5 * 2.3, height / 5 * 2.5)
	text(Math.round(outputLayer.neurons[0] * 100) / 100, width / 5 * 3.6, height / 2)
}