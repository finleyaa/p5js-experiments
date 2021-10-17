var recog = new p5.SpeechRec()
var speech = new p5.Speech()

function setup() {
	createCanvas(windowWidth, windowHeight)
	textAlign(CENTER)
	textSize(32)
	speech.setVolume(0.1)
	// speech.setLanguage("en-UK")
	recog.onResult = showResult
	recog.start()
}

function draw() {

}

function showResult(){
	text(recog.resultString, width/2, height/2)
	speech.speak(recog.resultString)
	if (recog.resultString == "computer sleep"){
		sleepPC()
	}
}

function sleepPC(){
	WshShell = new ActiveXObject("WScript.Shell");
    WshShell.Run("c:/windows/system32/notepad.exe", 1, false);
}

function keyPressed(){
	background(255)
	recog.onResult = showResult
	recog.start()
}