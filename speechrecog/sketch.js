var recog = new p5.SpeechRec()

function setup() {
	recog.onResult = showResult
	recog.start()
}

function draw() {
    
}

function showResult(){
	text(recog.resultString, 0, 0)
}