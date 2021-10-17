var stars = []

var speed;

function setup() {
  createCanvas(1920, 1080);
  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  speed = map(mouseX, 0, width, 0, 100);
  colorMode(RGB)
  
  fill(80)
  background(0, 0, 0, 75)
  
  push()
  
  translate(width / 2, height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  
  pop()
  DrawShip()
}

// Daniel Shiffman
// Code for: https://youtu.be/17WoOqgXsRM

function DrawShip(){
	noStroke()
	fill(219, 254, 255, 10)
	rect(0, 0, width, height)
	fill(81)
	rect(0, height - height / 9, width, height)
	rect(0, 0, width, height / 7)
	fill(51)
	triangle(0, 0, 0, height * 2, width / 6, 0)
	triangle(width, 0, width, height * 2, width - width / 6, 0)	
}

function Star() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.pz = this.z;
  this.minsize = 0
  this.maxsize = 5
  this.hu = random(255)
  this.large = false
  if (random(1) < 0.002){
	this.large = true
	this.minsize = 0
	this.maxsize = 250
  }

  this.update = function() {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  }

  this.show = function() {
	colorMode(HSB)
    //fill(this.hu, 255, 255)
	fill(255, 0, map(this.z, 0, width, 255, 0))
    noStroke();
	strokeWeight(1)
	
    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);
	var r = map(this.z, 0, width, this.maxsize, this.minsize);
    ellipse(sx, sy, r, r);

    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(255);
	line(px, py, sx, sy);

  }
}