var puzzle
//var puzzleText = "530070000600195000098000060800060003400803001700020006060000280000419005000080079"
//var puzzleText = "79....3.......69..8...3..76.....5..2..54187..4..7.....61..9...8..23.......9....54"
//var puzzleText = "538.16.79...38.5412415......6.9.........35.9..9...4..26..2..93.129.4..5..5469...8"
//var puzzleText = "8..........36......7..9.2...5...7.......457.....1...3...1....68..85...1..9....4.."
var puzzleText = "900000000800004700403065001000000050002900080008070003600000470030000002010006000"
// var puzzleText = "..53.....8......2..7..1.5..4....53...1..7...6..32...8..6.5....9..4....3......97.."
// var puzzleText = "1....7.9..3..2...8..96..5....53..9...1..8...26....4...3......1..4......7..7...3.."
// var puzzleText = "2..3.....8.4.62..3.138..2......2.39.5.7...621.32..6....2...914.6.125.8.9.....1..2"
// var puzzleText = ".8....15.4.65.9.8......8..............2.4...33..8.1...9...7....6.......415.....9."
var puzzleCopy
var maxNum = 9
var stack = []
var current = 0
var solved = false
var numReached = 0
var cols, rows
var scl
var drawSolving = false

// function preload(){
	// puzzleText = loadStrings("puzzle.txt")
// }

function setup() {
	
	puzzle = Array.from(puzzleText)
	
	puzzleCopy = Array.from(puzzle)
	
	if (!drawSolving){
	
		while (!solved){
			
			if (puzzleCopy[current] == "0" || puzzle[current] == "0"){
			
				var notFilled = true
				
				var num = 1
				
				if (puzzleCopy[current] != "0"){
					num = int(puzzleCopy[current])
				}
				
				for (var i = num; i < 10; i++){
					
					var filled = false
					
					var x = current % 9
					var y = ceil(current / 9) - 1
					if (x == 0){
						y = ceil(current / 9)
					}
					
					for (var n = 0; n < 9; n++){
						if (puzzleCopy[y * 9 + n] == str(i)){
							filled = true
							break
						}
					}
					
					for (var n = 0; n < 9; n++){
						if (puzzleCopy[x + n * 9] == str(i)){
							filled = true
							break
						}
					}
					
					var gridArea = []
					gridArea[0] = floor(x / 3) * 3
					gridArea[1] = floor(y / 3) * 3
					
					for (var t = 0; t < 3; t++){
						for (var j = 0; j < 3; j++){
							if (puzzleCopy[gridArea[0] + t + ((gridArea[1] + j) * 9)] == str(i)){
								filled = true
							}
						}
					}
					
					
					if (!filled){
						stack.push(current)
						puzzleCopy[current] = str(i)
						current++
						notFilled = false
						break
					}
					
				}
				
				if (notFilled){
					puzzleCopy[current] = "0"
					current = stack.pop()
				}
				
			} else {
				current++
			}
			
			solved = true
			
			for (var i = 0; i < puzzleCopy.length; i++){
				if (puzzleCopy[i] == "0"){
					solved = false
				}
			}
			
		}
		
		console.log("SOLVED!")
		console.log(puzzleCopy)
		console.log(millis())
	
	}
	
	createCanvas(792, 792)
	
	cols = 9
	rows = 9
	scl = width / cols
	
}

function draw() {
	
	background(90)
	
	for (var i = 0; i < cols; i++){
		if (i % 3 == 0){
			strokeWeight(4)
		} else {
			strokeWeight(1)
		}
		line(i * scl, 0, i * scl, height)
	}
	
	for (var i = 0; i < rows; i++){
		if (i % 3 == 0){
			strokeWeight(4)
		} else {
			strokeWeight(1)
		}
		line(0, i * scl, width, i * scl)
	}
	
	textAlign(CENTER, CENTER)
	var row = 1
	var col = 1
	for (var i = 0; i < puzzle.length; i++){
		if (puzzleCopy[i] != "."){
			var number = puzzleCopy[i]
			textStyle(BOLD)
			textSize(40)
			if (number == "."){
				number = puzzleCopy[i]
				textStyle(NORMAL)
				textSize(32)
			}
			text(number, col * scl - scl / 2, row * scl - scl / 2)
		}
		col++
		if (col > 9){
			col = 1
			row++
		}
	}
	
	if (!solved && drawSolving){
		
		if (puzzleCopy[current] == "." || puzzle[current] == "."){
		
			var notFilled = true
			
			// console.log(current)
			
			var num = 1
			
			// console.log("loc:", current)
			// console.log("val:", puzzleCopy[current])
			
			if (puzzleCopy[current] != "."){
				num = int(puzzleCopy[current])
				// console.log("popped:", num)
			}
			
			for (var i = num; i < 10; i++){
				
				var filled = false
				
				var x = current % 9
				var y = ceil(current / 9) - 1
				if (x == 0){
					y = ceil(current / 9)
				}
				
				// console.log(x, y)
				
				for (var n = 0; n < 9; n++){
					if (puzzleCopy[y * 9 + n] == str(i)){
						// console.log("ERR1", current, i)
						filled = true
						break
					}
				}
				
				for (var n = 0; n < 9; n++){
					if (puzzleCopy[x + n * 9] == str(i)){
						// console.log("ERR2", current, i)
						filled = true
						break
					}
				}
				
				var gridArea = []
				gridArea[0] = floor(x / 3) * 3
				gridArea[1] = floor(y / 3) * 3
				
				for (var t = 0; t < 3; t++){
					for (var j = 0; j < 3; j++){
						if (puzzleCopy[gridArea[0] + t + ((gridArea[1] + j) * 9)] == str(i)){
							// console.log("ERR3", current, i)
							filled = true
						}
					}
				}
				
				
				if (!filled){
					stack.push(current)
					puzzleCopy[current] = str(i)
					// console.log("SUCCESS:", i)
					current++
					notFilled = false
					break
				}
				
			}
			
			if (notFilled){
				// console.log("POPPED")
				puzzleCopy[current] = "0"
				current = stack.pop()
			}
			
		} else {
			current++
		}
		
		solved = true
		
		for (var i = 0; i < puzzleCopy.length; i++){
			if (puzzleCopy[i] == "0"){
				solved = false
			}
		}
		
	}
	
}