var chars = [];
var platforms = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	chars.push(new Char("fin", 100, windowHeight - 5, "sprites/char/"));
	chars[0].loadSprites();
	platforms.push(new Platform(100, windowHeight - 100, 100));
	platforms.push(new Platform(400, windowHeight - 200, 100));
	platforms.push(new Platform(700, windowHeight - 100, 100));
	platforms.push(new Platform(100, windowHeight - 300, 100));
	platforms.push(new Platform(400, windowHeight - 400, 100));
	platforms.push(new Platform(700, windowHeight - 300, 100));
	platforms.push(new Platform(100, windowHeight - 500, 100));
	platforms.push(new Platform(400, windowHeight - 600, 100));
	platforms.push(new Platform(700, windowHeight - 500, 100));
}

function draw() {
	background(255);
	if (keyIsDown(LEFT_ARROW)){
		chars[0].move(-1);
	}
	if (keyIsDown(RIGHT_ARROW)) {
		chars[0].move(1);
	}
	for (var x = 0; x < chars.length; x++){
		chars[x].update();
		chars[x].checkCollisions(platforms);
		chars[x].draw();
	}
	for (var x = 0; x < platforms.length; x++){
		platforms[x].draw();
	}
}

function keyPressed() {
	if (keyCode == UP_ARROW){
		chars[0].jump();
	}
}