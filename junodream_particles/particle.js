const sizeSpeed = 0.3

class Particle {
  constructor (x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
    this.maxSpeed = map(Math.random(), 0, 1, 3, 6)
    this.maxSize = map(Math.random(), 0, 1, 5, 20)
    this.size = 0
    this.color = [Math.random() * 255, Math.random() * 255, Math.random() * 255]
    this.shrinking = false
    this.previousPositions = []
  }

  update () {
    if (!this.shrinking) {
      this.size = Math.min(this.size + sizeSpeed, this.maxSize)
      if (Math.random() < 0.005) {
        this.shrinking = true
      }
    } else {
      this.size -= sizeSpeed
      if (this.size <= 0) {
        this.size = 0
      }
    }

    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
    this.acc.mult(0)

    if (this.pos.x > width) this.pos.x = 0
    if (this.pos.x < 0) this.pos.x = width
    if (this.pos.y > height) this.pos.y = 0
    if (this.pos.y < 0) this.pos.y = height

    this.previousPositions.push(this.pos.copy())
    // higher speed and bigger size means a bigger trail
    // (speed + size) / 2
    while (this.previousPositions.length > (this.vel.mag() + this.size) * 0.3) {
      this.previousPositions.shift()
    }
  }

  applyForce (force) {
    this.acc.add(force)
  }

  show () {
    stroke(this.color)
    strokeWeight(this.size)
    point(this.pos.x, this.pos.y)
    this.previousPositions.forEach((pos, index) => {
      strokeWeight(this.size - ((this.previousPositions.length - index) * 0.5))
      point(pos.x, pos.y)
    })
  }
}