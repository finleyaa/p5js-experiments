var oldX, oldY

function setup() {
	oldX = window.screenX
	oldY = window.screenY
}

function draw() {
	
	
	if (oldX != window.screenX || oldY != window.screenY){
		console.log("Moved")
		oldX = window.screenX
		oldY = window.screenY
	}
}