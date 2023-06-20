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

    this.isLarge = false
    if (Math.random() < 0.05) {
      this.isLarge = true
      this.maxSize = map(Math.random(), 0, 1, 200, 1000)
      this.maxSpeed *= 2
      this.isStationary = false
    } else {
      this.isStationary = Math.random() < 0.05 // 5% chance of being stationary which means it grows fully before moving
    }

    this.becomingBackground = false
    this.isBackground = false

    this.sizeSpeed = this.maxSize / 3 / 60
  }

  update () {
    if (!this.shrinking) {
      this.size = Math.min(this.size + this.sizeSpeed, this.maxSize)
      if (this.size >= this.maxSize && this.isLarge && Math.random() < 0.7 && !this.becomingBackground) {
          this.becomingBackground = true
          this.maxSize = Math.max(height, width)
          this.sizeSpeed = this.maxSize / 3 / 60
      } else if (this.size >= this.maxSize && this.becomingBackground) {
        this.isBackground = true
      }
      
      if (Math.random() < 0.005 && !this.isStationary && !this.becomingBackground) {
        this.shrinking = true
      }
    } else {
      this.size -= this.sizeSpeed
      if (this.size <= 0) {
        this.size = 0
      }
    }

    if (this.isStationary && this.size >= this.maxSize) {
      this.isStationary = false
    }
    if (this.isStationary) return

    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
    this.acc.mult(0)

    if (this.isLarge) {
      const buffer = this.maxSize * 3
      if (this.pos.x > width + buffer) this.pos.x = -buffer
      if (this.pos.x < -buffer) this.pos.x = width + buffer
      if (this.pos.y > height + buffer) this.pos.y = -buffer
      if (this.pos.y < -buffer) this.pos.y = height + buffer
    }

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

  offscreen () {
    const buffer = this.maxSize * 3
    if (this.pos.x > width + buffer || this.pos.x < -buffer || this.pos.y > height + buffer || this.pos.y < -buffer) {
      return true
    }
  }
}