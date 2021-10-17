var weights = []
var perc
var inputs = []
var c = 0.01
var training = []
var count = 0

function setup() {
	createCanvas(400, 400)
	perc = new Perceptron(3)
	
	for (var i = 0; i < 2000; i++){
		var x = random(-width/2, width/2)
		var y = random(-height/2, height/2)
		var answer = 1
		if (y < f(x)){
			answer = -1
		}
		training[i] = new Trainer(x, y, answer)
	}
}

function draw() {
	background(255)
	translate(width/2, height/2)
	
	perc.train(training[count].inputs, training[count].answer)
	count = (count + 1) % training.length
	
	for (var i = 0; i < count; i++){
		stroke(0)
		var guess = perc.feedforward(training[i].inputs)
		if (guess > 0){
			noFill()
		} else {
			fill(0)
		}
		ellipse(training[i].inputs[0], training[i].inputs[1], 8, 8)
	}
}

function Trainer(x, y, a){
	this.inputs = []
	this.answer
	
	inputs[0] = x
	inputs[1] = y
	inputs[2] = 1
	answer = a
}

function f(x){
	return 2*x+1
}

function Perceptron(n){
	for (var i = 0; i < n; i++){
		weights[i] = random(-1, 1)
	}
	
	this.feedforward = function(inputs){
		var sum = 0
		for (var i = 0; i < weights.length; i++){
			sum += inputs[i] * weights[i]
		}
		return activate(sum)
	}

	this.train = function(inputs, desired){
		var guess = this.feedforward(inputs)
		
		var error = desired - guess
		
		for (var i = 0; i < weights.length; i++){
			weights[i] += c * error * inputs[i]
		}
	}
}

function activate(sum){
	if (sum > 0){
		return 1
	} else {
		return -1
	}
}