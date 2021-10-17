var population = []

var possibleMoves = ["U1", "U2", "U3", "L1", "L2", "L3", "D1", "D2", "D3", "R1", "R2", "R3", "LF", "LM", "LB", "RF", "RM", "RB"]

var frontFaceTemplate = ["R", "R", "R",
						 "R", "R", "R",
						 "R", "R", "R"]
var topFaceTemplate = ["W", "W", "W",
					   "W", "W", "W",
					   "W", "W", "W"]
var leftFaceTemplate = ["G", "G", "G",
						"G", "G", "G",
						"G", "G", "G"]
var rightFaceTemplate = ["B", "B", "B",
						 "B", "B", "B",
						 "B", "B", "B"]
var bottomFaceTemplate = ["Y", "Y", "Y",
						  "Y", "Y", "Y",
						  "Y", "Y", "Y"]
var backFaceTemplate = ["O", "O", "O",
						"O", "O", "O",
						"O", "O", "O"]
				
var fittestIndex, count
var maxCount = 1000000

function setup() {
	createRandomSet(20)
	count = 0
	while (count < maxCount) {
		run()
		count++
	}
	console.log("Done")
}

function run(){
		fittestIndex = 0
		var fittestValue = 0
		var frontFace = frontFaceTemplate.slice()
		var topFace = topFaceTemplate.slice()
		var leftFace = leftFaceTemplate.slice()
		var rightFace = rightFaceTemplate.slice()
		var bottomFace = bottomFaceTemplate.slice()
		var backFace = backFaceTemplate.slice()
		
		for (var i = 0; i < population.length; i++){
			var member = population[i]
			for (var j = 0; j < member.length; j++){
				if (member[j] == "U1" || member[j] == "U2" || member[j] == "U3"){
					if (member[j] == "U1"){
						var values = [0, 3, 6]
					} else if (member[j] == "U2"){
						var values = [1, 4, 7]
					} else {
						var values = [2, 5, 8]
					}
					var tempFrontFace = frontFace.slice()
					var tempBottomFace = bottomFace.slice()
					var tempBackFace = backFace.slice()
					var tempTopFace = topFace.slice()
					for (var x = 0; x < 3; x++){
						frontFace[values[x]] = tempBottomFace[values[x]]
						bottomFace[values[x]] = tempBackFace[values[2 - x]]
						backFace[values[x]] = tempTopFace[values[2 - x]]
						topFace[values[x]] = tempFrontFace[values[x]]
					}
				} else if (member[j] == "D1" || member[j] == "D2" || member[j] == "D3"){
					if (member[j] == "D1"){
						var values = [0, 3, 6]
					} else if (member[j] == "D2"){
						var values = [1, 4, 7]
					} else {
						var values = [2, 5, 8]
					}
					var tempFrontFace = frontFace.slice()
					var tempBottomFace = bottomFace.slice()
					var tempBackFace = backFace.slice()
					var tempTopFace = topFace.slice()
					for (var x = 0; x < 3; x++){
						frontFace[values[x]] = tempTopFace[values[x]]
						bottomFace[values[x]] = tempFrontFace[values[x]]
						backFace[values[x]] = tempBottomFace[values[2 - x]]
						topFace[values[x]] = tempBackFace[values[2 - x]]
					}
				} else if (member[j] == "L1" || member[j] == "L2" || member[j] == "L3"){
					if (member[j] == "L1"){
						var values = [0, 1, 2]
					} else if (member[j] == "L2"){
						var values = [3, 4, 5]
					} else {
						var values = [6, 7, 8]
					}
					var tempFrontFace = frontFace.slice()
					var tempBackFace = backFace.slice()
					var tempLeftFace = leftFace.slice()
					var tempRightFace = rightFace.slice()
					for (var x = 0; x < 3; x++){
						frontFace[values[x]] = tempRightFace[values[x]]
						rightFace[values[x]] = tempBackFace[values[2 - x]]
						backFace[values[x]] = tempLeftFace[values[2 - x]]
						leftFace[values[x]] = tempFrontFace[values[x]]
					}				
				} else if (member[j] == "R1" || member[j] == "R2" || member[j] == "R3"){
					if (member[j] == "R1"){
						var values = [0, 1, 2]
					} else if (member[j] == "R2"){
						var values = [3, 4, 5]
					} else {
						var values = [6, 7, 8]
					}
					var tempFrontFace = frontFace.slice()
					var tempBackFace = backFace.slice()
					var tempLeftFace = leftFace.slice()
					var tempRightFace = rightFace.slice()
					for (var x = 0; x < 3; x++){
						frontFace[values[x]] = tempLeftFace[values[x]]
						rightFace[values[x]] = tempFrontFace[values[x]]
						backFace[values[x]] = tempRightFace[values[2 - x]]
						leftFace[values[x]] = tempBackFace[values[2 - x]]
					}
				} else if (member[j] == "LF" || member[j] == "LM" || member[j] == "LB" || member[j] == "RF" || member[j] == "RM" || member[j] == "RB"){
					if (member[j] == "LF" || member[j] == "RF"){
						var values = [6, 7, 8]
					} else if (member[j] == "LM" || member[j] == "RM"){
						var values = [3, 4, 5]
					} else {
						var values = [0, 1, 2]
					}
					var tempFrontFace = frontFace.slice()
					var tempBackFace = backFace.slice()
					var tempLeftFace = leftFace.slice()
					var tempRightFace = rightFace.slice()
					var tempBottomFace = bottomFace.slice()
					var tempTopFace = topFace.slice()
					for (var x = 0; x < 3; x++){
						if (member[j] == "LF" || member[j] == "LM" || member[j] == "LB"){
							rightFace[values[x]] = tempBottomFace[values[x]]
							topFace[values[x]] = tempRightFace[values[x]]
							leftFace[values[x]] = tempTopFace[values[x]]
							bottomFace[values[x]] = tempLeftFace[values[x]]
						} else if (member[j] == "RF" || member[j] == "RM" || member[j] == "RB"){
							rightFace[values[x]] = tempTopFace[values[x]]
							topFace[values[x]] = tempLeftFace[values[x]]
							leftFace[values[x]] = tempBottomFace[values[x]]
							bottomFace[values[x]] = tempRightFace[values[x]]
						}
					}
					if (member[j] == "LF"){
						frontFace[0] = tempFrontFace[2]
						frontFace[1] = tempFrontFace[5]
						frontFace[2] = tempFrontFace[8]
						frontFace[3] = tempFrontFace[1]
						frontFace[5] = tempFrontFace[7]
						frontFace[6] = tempFrontFace[0]
						frontFace[7] = tempFrontFace[3]
						frontFace[8] = tempFrontFace[6]
					} else if (member[j] == "RF"){
						frontFace[0] = tempFrontFace[6]
						frontFace[1] = tempFrontFace[3]
						frontFace[2] = tempFrontFace[0]
						frontFace[3] = tempFrontFace[7]
						frontFace[5] = tempFrontFace[1]
						frontFace[6] = tempFrontFace[8]
						frontFace[7] = tempFrontFace[5]
						frontFace[8] = tempFrontFace[2]
					} else if (member[j] == "LB"){
						backFace[0] = tempBackFace[2]
						backFace[1] = tempBackFace[5]
						backFace[2] = tempBackFace[8]
						backFace[3] = tempBackFace[1]
						backFace[5] = tempBackFace[7]
						backFace[6] = tempBackFace[0]
						backFace[7] = tempBackFace[3]
						backFace[8] = tempBackFace[6]
					} else if (member[j] == "RB"){
						backFace[0] = tempBackFace[6]
						backFace[1] = tempBackFace[3]
						backFace[2] = tempBackFace[0]
						backFace[3] = tempBackFace[7]
						backFace[5] = tempBackFace[1]
						backFace[6] = tempBackFace[8]
						backFace[7] = tempBackFace[5]
						backFace[8] = tempBackFace[2]
					}
				}
			}
			var fitnessCount = 0
			var colour = frontFace[4]
			for (var j = 0; j < 9; j++){
				if (frontFace[j] == colour){
					fitnessCount++
				}
			}
			colour = rightFace[4]
			for (var j = 0; j < 9; j++){
				if (rightFace[j] == colour){
					fitnessCount++
				}
			}
			colour = backFace[4]
			for (var j = 0; j < 9; j++){
				if (backFace[j] == colour){
					fitnessCount++
				}
			}
			colour = leftFace[4]
			for (var j = 0; j < 9; j++){
				if (leftFace[j] == colour){
					fitnessCount++
				}
			}
			colour = topFace[4]
			for (var j = 0; j < 9; j++){
				if (topFace[j] == colour){
					fitnessCount++
				}
			}
			colour = bottomFace[4]
			for (var j = 0; j < 9; j++){
				if (bottomFace[j] == colour){
					fitnessCount++
				}
			}
			if (fitnessCount > fittestValue){
				fittestValue = fitnessCount
				fittestIndex = i
			}
		}
		
		if (count < maxCount){
			mutateFittest(fittestIndex)
		}
	
}

function mutateFittest(indexOfFittest){
	var member = population[indexOfFittest]
	var tempPopulation = []
	for (var x = 0; x < population.length; x++){
		var tempMember = member.slice()
		for (var i = 0; i < member.length; i++){
			if (random(1) < 0.1){
				tempMember[i] = possibleMoves[floor(random(possibleMoves.length))]
			}
		}
		tempPopulation.push(tempMember)
	}
	population = tempPopulation.slice()
}

function createRandomSet(size){
	
	for (var i = 0; i < size; i++){
		var member = []
		for (var j = 0; j < 20; j++){
			member.push(possibleMoves[floor(random(possibleMoves.length))])
		}
		population.push(member)
	}
	
}

function draw() {

}