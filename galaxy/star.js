class Star {

  constructor (x, y, z, size = 4) {
    this.x = x
    this.y = y
    this.z = z
    this.size = size

    this.blinking = false
    this.blinkCount = 0
  }

  draw () {
    // slightly yellowish white
    fill(255, 255, 240)
    noStroke()

    // random blinking
    if (random() < 0.0001 && !this.blinking && this.blinkCount === 0) {
      this.blinking = true
    }
    
    this.sx = map(this.x, 0, 1, 0, width) // sx = screen x
    this.sy = map(this.y, 0, 1, 0, height) // sy = screen y
    this.r = map(this.z, 0, 1, this.size, 0) // r = radius based on z and size

    const maxBlinkCount = 10
    if (this.blinking) {
      this.blinkCount++
      if (this.blinkCount > maxBlinkCount) {
        this.blinking = false
      }
    } else {
      if (this.blinkCount > 0) {
        this.blinkCount--
      }
    }
    let r = map(this.blinkCount, 0, maxBlinkCount, this.r, this.r * 2)
    ellipse(this.sx, this.sy, r, r)
  }

}