var posneg
var afinn = {}
var scoredWords = []
var score

function preload(){
	afinn = loadJSON("AFINN/AFINN-111.json")
}

function setup(){
	createCanvas(windowWidth, windowHeight)
	posneg = undefined
	select("canvas").drop(dropped)
}

function draw(){
	background(51)
	
	if (scoredWords.length === 0){
		textAlign(CENTER)
		textSize(72)
		stroke(255)
		fill(255)
		text("DROP A FILE", width/2, height/2)
	} else {
		displayData()
	}
}

function displayData(){
	colorMode(RGB)
	var x = 15
	var y = 10
	for (var i = 0; i < scoredWords.length; i++){
		var arr = scoredWords[i]
		var word = scoredWords[i][0]
		var wordScore = scoredWords[i][1]
		if (wordScore > 0){
			fill(0, 255, 0)
			stroke(0)
			strokeWeight(4)
		} else if (wordScore < 0){
			fill(255, 0, 0)
			stroke(0)
			strokeWeight(4)
		}
		
		textFont("Trebuchet MS")
		textSize(30)
		rect(x - 10, y - 3, textWidth(word) + 20, 40, 20)
		
		fill(0)
		strokeWeight(1)
		textAlign(LEFT, TOP)
		text(word, x, y)
		
		x += textWidth(word) + textSize()
		if (i + 1 != scoredWords.length){
			if (x + textWidth(scoredWords[i + 1][0]) + 19 > width){
				y += 50
				x = 15
			}
		}
	}
	
	y += 100
	strokeWeight(10)
	textSize(60)
	textAlign(CENTER)
	textFont("Impact")
	stroke(0)
	if (score > 0){
		fill(0, 255, 0)
		text("POSITIVE", width/2, y)
	} else if (score < 0){
		fill(255, 51, 51)
		text("NEGATIVE", width/2, y)
	}
}

function dropped(file){
	var input = file.data
	var words = input.split(/\W/)
	score = 0
	scoredWords = []
	for (var i = 0; i < words.length; i++){
		var word = words[i].toLowerCase()
		if (afinn.hasOwnProperty(word)){
			score += Number(afinn[word])
			scoredWords.push([word, afinn[word]])
		}
	}
	//console.log(scoredWords)
}