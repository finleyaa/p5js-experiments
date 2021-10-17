function Char(name, x, y, spriteFolder) {
	this.name = name;
	this.pos = createVector(x, y);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.spriteFolder = spriteFolder;
	this.sprites = [];
	this.canDoubleJump = true;
	this.touchFloor = true;
	this.frameCounter = 1;
	this.frameMax = 6;
	this.lastFrameChange = 0;
	
	this.loadSprites = function() {
		for (var i = 1; i <= this.frameMax; i++) {
			this.sprites.push(loadImage(this.spriteFolder + i + ".png"));
		}
		this.lastFrameChange = millis();
	}
	
	this.update = function() {
		this.acc.y += 0.9;
		
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.vel.x = min(5, this.vel.x);
		this.vel.mult(0.9);
		if (this.pos.y > windowHeight) {
			this.pos.y = windowHeight;
			this.touchFloor = true;
			this.canDoubleJump = true;
		}
	}
	
	this.draw = function() {
		image(this.sprites[this.frameCounter - 1], this.pos.x, this.pos.y - 35);
		if (abs(millis() - this.lastFrameChange) >= 50) {
			this.lastFrameChange = millis();
			this.frameCounter += 1;
			if (this.frameCounter > this.frameMax) {
				this.frameCounter = 1;
			}
		}
	}
	
	this.move = function(dir) {
		this.acc.x += dir * 0.5;
	}
	
	this.jump = function() {
		console.log(this.touchFloor);
		if (this.touchFloor) {
			this.touchFloor = false;
			this.acc.y -= 30;
		} else if (this.canDoubleJump) {
			this.canDoubleJump = false;
			this.acc.y -= 30;
		}
	}
	
	this.checkCollisions = function(platforms) {
		for (var i = 0; i < platforms.length; i++) {
			var checkValue = platforms[i].pos.y - this.pos.y;
			var percent = 35 * 0.3;
			if (checkValue <= 0 && checkValue >= -percent) {
				if (this.pos.x + 30 >= platforms[i].pos.x && this.pos.x <= platforms[i].pos.x + platforms[i].len){
					this.pos.y = platforms[i].pos.y;
					this.touchFloor = true;
					this.canDoubleJump = true;
				}
			}
		}
	}
	
	this.checkEnemies = function(enemies) {
		for (var i = 0; i < enemies.length; i++) {
			
		}
	}
}