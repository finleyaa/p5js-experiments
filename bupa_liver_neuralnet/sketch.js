var inputLayer = [0, 0, 0, 0, 0, 0, 1] // Last one is bias
var hiddenLayer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] // Last one is bias
var outputLayer = [0]

// Weights
var IHWeights = []
var HOWeights = []

// Generic settings
var learningRate = 0.1 // 0.5 for tanh / 1 for sigmoid (best values)
var epochs = 100000

// Data to train from
var data

// Data to test on
var dataTest

var target = 0

var errors = []

function preload(){
	data = loadTable("liverdata_train.txt", "csv")
	dataTest = loadTable("liverdata_test.txt", "csv")
}

function setup() {
	
	data = data.getArray()
	dataTest = dataTest.getArray()
	
	// Setting up random weights
	for (var i = 0; i < inputLayer.length * hiddenLayer.length - 1; i++){
		IHWeights[i] = Math.round(random(-1, 1) * 1000) / 1000
	}
	for (var i = 0; i < hiddenLayer.length * outputLayer.length; i++){
		HOWeights[i] = Math.round(random(-1, 1) * 1000) / 1000
	}
	
	// Start training
	for (var e = 0; e < epochs; e++){
		// Forward Feed
		// Input the data
		var dataSelection = data[floor(random(data.length))]
		inputLayer[0] = map(dataSelection[0], 50, 110, -1, 1)
		inputLayer[1] = map(dataSelection[1], 0, 150, -1, 1)
		inputLayer[2] = map(dataSelection[2], 0, 200, -1, 1)
		inputLayer[3] = map(dataSelection[3], 0, 100, -1, 1)
		inputLayer[4] = map(dataSelection[4], 0, 210, -1, 1)
		inputLayer[5] = map(dataSelection[5], 0, 20, -1, 1)
		
		target = map(dataSelection[6], 1, 2, -1, 1)
		
		// Reset layers
		hiddenLayer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
		outputLayer = [0]
		
		// Calculate hidden layer
		for (var i = 0; i < hiddenLayer.length - 1; i++){
			for (var n = 0; n < inputLayer.length; n++){
				hiddenLayer[i] += inputLayer[n] * IHWeights[i + ((hiddenLayer.length - 1) * n)]
			}
		}
		
		for (var i = 0; i < hiddenLayer.length - 1; i++){
			hiddenLayer[i] = Math.tanh(hiddenLayer[i])
			// hiddenLayer[i] = 1 / (1 + exp(-hiddenLayer[i]))
		}
		
		// Calculate output layer
		for (var i = 0; i < hiddenLayer.length; i++){
			outputLayer[0] += hiddenLayer[i] * HOWeights[i]
		}
		
		outputLayer[0] = Math.tanh(outputLayer[0])
		// outputLayer[0] = 1 / (1 + exp(-outputLayer[0]))
		
		// Back Propagation
		// Calculate the error
		var err = 0.5 * pow(target - outputLayer[0], 2)
		
		errors.push(err)
		
		// Calculate derr/dout
		var outErr = outputLayer[0] - target
		
		// Calculate derivative of the output
		var deltaOutput = tanh_derivative(outputLayer[0])
		// var deltaOutput = sig_derivative(outputLayer[0])
		
		// Calculate delta weights
		var deltaWeights = []
		for (var i = 0; i < hiddenLayer.length; i++){
			deltaWeights.push(outErr * deltaOutput * hiddenLayer[i])
		}
		
		// Calculate derr/dnet
		var deltaErrorNet = outErr * deltaOutput
		
		// Calculate delta hidden error
		var deltaHiddenErr = []
		for (var i = 0; i < hiddenLayer.length - 1; i++){
			deltaHiddenErr.push(deltaErrorNet * HOWeights[i])
		}
		
		// Calculate delta hidden values
		var deltaHidden = []
		for (var i = 0; i < hiddenLayer.length - 1; i++){
			deltaHidden.push(tanh_derivative(hiddenLayer[i]))
			// deltaHidden.push(sig_derivative(hiddenLayer[i]))
		}
		
		// Calculate the weight change
		var weightChange = []
		for (var i = 0; i < hiddenLayer.length - 1; i++){
			for (var n = 0; n < inputLayer.length; n++){
				weightChange[i + ((hiddenLayer.length - 1) * n)] = inputLayer[n] * deltaHidden[i] * deltaHiddenErr[i]
			}
		}
		
		// Update the weights
		for (var i = 0; i < IHWeights.length; i++){
			IHWeights[i] -= weightChange[i] * learningRate
		}
		for (var i = 0; i < HOWeights.length; i++){
			HOWeights[i] -= deltaWeights[i] * learningRate
		}
		learningRate *= 0.9999
	}
	
	console.log("Training Complete!")
	
	createCanvas(windowWidth, windowHeight)
	background(255)
	
	strokeWeight(4)
	
	testTrainData()
	
}

function testData(){
	var correct = 0
	var results = []
	var percentErr = []
	for (var i = 0; i < dataTest.length; i++){
		var result = test(dataTest[i][0], dataTest[i][1], dataTest[i][2], dataTest[i][3], dataTest[i][4], dataTest[i][5])
		if (result > 0 && dataTest[i][6] == "2" || result < 0 && dataTest[i][6] == "1"){
			correct++
			results.push([result, true])
		} else {
			results.push([result, false])
		}
		percentErr.push(result / map(dataTest[i][6], 1, 2, -1, 1) * 100)
	}
	console.log(round((correct / dataTest.length) * 100) + "% correct.")
	var errSum = 0
	for (var i = 0; i < percentErr.length; i++){
		errSum += percentErr[i]
	}
	console.log(abs(round(errSum / percentErr.length)) + "% error (average).")
	
	for (var i = 0; i < results.length - 1; i++){
		stroke(0)
		strokeWeight(1)
		line(width / results.length * i, height / 2 - (height / 4 * results[i][0]), width / results.length * (i + 1), height / 2 - (height / 4 * results[i + 1][0]))
		if (results[i][1]){
			stroke(255, 0, 0)
		}
		strokeWeight(4)
		point(width / results.length * i, height / 2 - (height / 4 * results[i][0]))
		stroke(0)
		if (results[i + 1][1]){
			stroke(255, 0, 0)
		}
		point(width / results.length * i + 1, height / 2 - (height / 4 * results[i + 1][0]))
		stroke(0, 100, 200)
		line(width / results.length * i, height / 2 - (height / 4 * map(dataTest[i][6], 1, 2, -1, 1)), width / results.length * (i + 1), height / 2 - (height / 4 * map(dataTest[i + 1][6], 1, 2, -1, 1)))
	}
}

function testTrainData(){
	var correct = 0
	var results = []
	var percentErr = []
	for (var i = 0; i < data.length; i++){
		var result = test(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5])
		if (result > 0 && data[i][6] == "2" || result < 0 && data[i][6] == "1"){
			correct++
			results.push([result, true])
		} else {
			results.push([result, false])
		}
		percentErr.push(result / map(data[i][6], 1, 2, -1, 1) * 100)
	}
	console.log(round((correct / data.length) * 100) + "% correct.")
	var errSum = 0
	for (var i = 0; i < percentErr.length; i++){
		errSum += percentErr[i]
	}
	console.log(abs(round(errSum / percentErr.length)) + "% error (average).")
	
	for (var i = 0; i < results.length - 1; i++){
		stroke(0)
		strokeWeight(1)
		line(width / results.length * i, height / 2 - (height / 4 * results[i][0]), width / results.length * (i + 1), height / 2 - (height / 4 * results[i + 1][0]))
		if (results[i][1]){
			stroke(255, 0, 0)
		}
		strokeWeight(4)
		point(width / results.length * i, height / 2 - (height / 4 * results[i][0]))
		stroke(0)
		if (results[i + 1][1]){
			stroke(255, 0, 0)
		}
		point(width / results.length * i + 1, height / 2 - (height / 4 * results[i + 1][0]))
		stroke(0, 100, 200)
		line(width / results.length * i, height / 2 - (height / 4 * map(data[i][6], 1, 2, -1, 1)), width / results.length * (i + 1), height / 2 - (height / 4 * map(data[i + 1][6], 1, 2, -1, 1)))
	}
}

function test(num1, num2, num3, num4, num5, num6){
	// Forward Feed
	// Input the data
	inputLayer[0] = map(num1, 50, 110, -1, 1)
	inputLayer[1] = map(num2, 0, 150, -1, 1)
	inputLayer[2] = map(num3, 0, 200, -1, 1)
	inputLayer[3] = map(num4, 0, 100, -1, 1)
	inputLayer[4] = map(num5, 0, 210, -1, 1)
	inputLayer[5] = map(num6, 0, 20, -1, 1)
	
	// Reset layers
	hiddenLayer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
	outputLayer = [0]
		
	// Calculate hidden layer
	for (var i = 0; i < hiddenLayer.length - 1; i++){
		for (var n = 0; n < inputLayer.length; n++){
			hiddenLayer[i] += inputLayer[n] * IHWeights[i + ((hiddenLayer.length - 1) * n)]
		}
	}
	
	for (var i = 0; i < hiddenLayer.length - 1; i++){
		hiddenLayer[i] = Math.tanh(hiddenLayer[i])
		// hiddenLayer[i] = 1 / (1 + exp(-hiddenLayer[i]))
	}
	
	// Calculate output layer
	for (var i = 0; i < hiddenLayer.length; i++){
		outputLayer[0] += hiddenLayer[i] * HOWeights[i]
	}
	
	outputLayer[0] = Math.tanh(outputLayer[0])
	// outputLayer[0] = 1 / (1 + exp(-outputLayer[0]))
	
	// Print the output
	// console.log(outputLayer[0])
	return outputLayer[0]
}

function tanh_derivative(z){
	return (1 - pow(z, 2))
}

function sig_derivative(z){
	return (z * (1 - z))
}