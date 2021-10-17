var afinn = {}

function preload(){
	afinn = loadJSON("AFINN/AFINN-111.json")
}

function setup() {
	noCanvas()
	
	var txt = select("#txt")
	txt.input(typing)
	
	function typing(){
		var textinput = txt.value()
		var words = textinput.split(/\W/)
		var score = 0
		for (var i = 0; i < words.length; i++){
			var word = words[i].toLowerCase()
			if (afinn.hasOwnProperty(word)){
				score += Number(afinn[word])
			}
		}
		select("#score").html("Score: " + score)
		select("#comparative").html("Comparative: " + score / words.length)
		if (Math.sign(score / words.length) == 1){
			select("#posneg").html("<b>Positive")
		} else if (Math.sign(score / words.length) == -1){
			select("#posneg").html("<b>Negative")
		} else {
			select("#posneg").html("<b>N/A")
		}
	}
}