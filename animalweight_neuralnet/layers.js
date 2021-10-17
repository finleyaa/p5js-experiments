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
			this.weights.push(random(0, 0.5))
		}
	} else if (typeof weights === "object"){
		this.weights = weights
	}
	
	this.update = function(){
		this.data = input.neurons
		this.neurons = []
		var weightsCounter = 0
		for (var n = 0; n < this.size; n++){
			var amount = 0
			for (var i = 0; i < this.data.length; i++){
				amount += this.data[i] * this.weights[weightsCounter]
				weightsCounter++
			}
			this.neurons.push(amount)
		}
	}
	
	this.changeWeights = function(){
		
		var error = desiredWeight - outputLayer.neurons[0]
		var counter = 0
		for (var i = 0; i < this.weights.length; i++){
			this.weights[i] += error * this.data[counter] * lConstant
			counter++
			if (counter == this.data.length){
				counter = 0
			}
			// if (error != 0){
				// console.log(error)
			// }
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
			this.weights.push(random(0, 0.5))
		}
	} else if (typeof weights === "object"){
		this.weights = weights
	}
	
	this.update = function(){
		this.data = input.neurons
		this.neurons = []
		var weightsCounter = 0
		for (var n = 0; n < this.size; n++){
			var amount = 0
			for (var i = 0; i < this.data.length; i++){
				amount += this.data[i] * this.weights[weightsCounter]
				weightsCounter++
			}
			amount = amount ^ 2
			this.neurons.push(amount)
		}
	}
	
	this.changeWeights = function(){
		
		var error = desiredWeight - outputLayer.neurons[0]
		var counter = 0
		for (var i = 0; i < this.weights.length; i++){
			this.weights[i] += error * this.data[counter] * lConstant
			counter++
			if (counter == this.data.length){
				counter = 0
			}
		}
		
	}
	
}