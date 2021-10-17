var lConstant = 1

function InputLayer(data){
	
	this.neurons = data
	
	this.update = function(newData){
		this.neurons = newData
	}
	
}

function HiddenLayer(size, weights, input){
	
	this.neurons = []
	this.size = size
	this.data = input.neurons
	if (typeof weights === "number"){
		this.weights = []
		for (var i = 0; i < weights; i++){
			this.weights.push(random(-1, 1))
		}
	} else if (typeof weights === "object"){
		this.weights = weights
	}
	
	this.update = function(){
		this.data = input.neurons
		this.neurons = []
		var dataNum = 0
		var amounts = []
		for (var i = 0; i < this.weights.length; i++){
			if (i % this.size == 0 && i != 0){
				dataNum++
			}
			// console.log("Hidden Layer: Data: " + this.data[dataNum] + ", Weight: " + this.weights[i])
			amounts.push(this.data[dataNum] * this.weights[i])
		}
		for (var i = 0; i < this.size; i++){
			var amount = amounts[i] + amounts[i + this.size]
			// amount += 0.8
			this.neurons.push(sigmoid(amount))
		}
	}
	
}

function OutputLayer(size, weights, input){
	
	this.neurons = []
	this.size = size
	this.data = input.neurons
	if (typeof weights === "number"){
		this.weights = []
		for (var i = 0; i < weights; i++){
			this.weights.push(random(-1, 1))
		}
	} else if (typeof weights === "object"){
		this.weights = weights
	}
	
	this.update = function(){
		this.data = input.neurons
		this.neurons = []
		var dataNum = 0
		var amounts = []
		for (var i = 0; i < this.weights.length; i++){
			if (i % this.size == 0 && i != 0){
				dataNum++
			}
			// console.log("Output Layer: Data: " + this.data[dataNum] + ", Weight: " + this.weights[i])
			amounts.push(this.data[dataNum] * this.weights[i])
		}
		// console.log(amounts)
		var amount = 0
		for (var i = 0; i < amounts.length; i++){
			amount += amounts[i]
		}
		// amount += 1.2
		this.neurons.push(sigmoid(amount))
	}
	
}

function sig_derivative(z){
	
	return z * (1.0 - z)
	
}

function sigmoid(z){
	
	return 1.0 / (1.0 + exp(-z))
	
}

function changeWeights(inputLayer, hiddenLayers, outputLayer){
	
	var input = inputLayer
	var hid = hiddenLayers
	var out = outputLayer
	var deltaWeights = []
	
	var deltaOutSum = 0
	var outError = (target - out.neurons[0])
	for (var i = 0; i < out.neurons.length; i++){
		deltaOutSum += sig_derivative(out.neurons[i])
	}
	
	deltaOutSum *= outError
	
	// console.log("Delta Out Sum: " + deltaOutSum)
	
	var deltaWeights = []
	
	var cur = hid[hid.length - 1]
	for (var n = 0; n < cur.neurons.length; n++){
		deltaWeights.push(deltaOutSum / cur.neurons[n])
	}
	
	// for (var i = 0; i < deltaWeights.length; i++){
		// outputLayer.weights[i] += deltaWeights[i] * lConstant
	// }
	
	// console.log(outputLayer.weights)
	
	var deltaHidSums = []
	
	for (var i = 0; i < hid.length; i++){
		var cur = hiddenLayers[i]
		for (var n = 0; n < cur.neurons.length; n++){
			deltaHidSums.push(deltaOutSum / out.weights[n] * sig_derivative(cur.neurons[n]))
			// console.log("Data: " + sig_derivative(cur.neurons[n]) + " Weight: " + cur.weights[n])
		}
	}
	
	// console.log("Hid Sums: ")
	// console.log(deltaHidSums)
	
	var weightChange = []
	
	for (var i = 0; i < hid.length; i++){
		for (var n = 0; n < input.neurons.length; n++){
			for (var x = 0; x < deltaHidSums.length; x++){
				weightChange.push(deltaHidSums[x] / input.neurons[n])
			}
		}
	}
	
	// console.log(weightChange)
	
	var newHiddenWeights = []
	
	for (var i = 0; i < hid.length; i++){
		var tempWeights = []
		// var counter = 0
		for (var n = 0; n < weightChange.length; n++){
			tempWeights[n] = hid[i].weights[n] + weightChange[n] * lConstant
			// console.log(counter)
			// counter += 2
			// if (counter > hid[i].weights.length - 1){
				// counter = 1
			// }
		}
		newHiddenWeights.push(tempWeights)
	}
	
	
	// console.log("New weights:")
	// console.log(newHiddenWeights)
	
	for (var i = 0; i < hid.length; i++){
		hid[i].weights = newHiddenWeights[i]
	}
	for (var i = 0; i < deltaWeights.length; i++){
		outputLayer.weights[i] += deltaWeights[i] * lConstant
	}
	
}