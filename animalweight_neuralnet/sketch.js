var inputLayer, hiddenLayer, outputLayer
var weights = {}
var desiredWeight
var lConstant = 0.00000000000000000000000000000001

function preload(){
	weights = loadJSON("animalWeights.json")
}

function setup() {
	inputLayer = new InputLayer([0])
	hiddenLayer1 = new HiddenLayer(7, 7, inputLayer)
	hiddenLayer2 = new HiddenLayer(7, 49, hiddenLayer1)
	hiddenLayer3 = new HiddenLayer(7, 49, hiddenLayer2)
	outputLayer = new OutputLayer(1, 7, hiddenLayer3)
	for (var n = 0; n < 20; n++){
		for (var i = 0; i < Object.keys(weights).length; i++){
			desiredWeight = weights[i][0]
			inputLayer.update([weights[i][1]])
			hiddenLayer1.update()
			hiddenLayer2.update()
			hiddenLayer3.update()
			outputLayer.update()
			console.log(outputLayer.neurons[0])
			hiddenLayer1.changeWeights()
			hiddenLayer2.changeWeights()
			hiddenLayer3.changeWeights()
			outputLayer.changeWeights()
		}
	}
}

function draw() {
	
}

function test(bodyWeight){
	inputLayer.update([bodyWeight])
	hiddenLayer1.update()
	hiddenLayer2.update()
	hiddenLayer3.update()
	outputLayer.update()
	console.log(outputLayer.neurons[0])
}