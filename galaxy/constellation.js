class ConstellationMaker {

  constructor (name, stars) {
      this.name = name
      this.stars = stars

      this.findConstellation()
  }

  findConstellation () {
    this.constellation = []
    // pick a random star
    let star = random(this.stars)
    const maxDist = 0.2
    const maxStars = random(3, 30)
    while (star && this.constellation.length < maxStars) {
      this.constellation.push(star) // add the star to the constellation
      // find the closest star to the current star
      star = this.stars.reduce((closest, current) => {
        if (current === star) return closest // skip the current star
        if (this.constellation.includes(current)) return closest // skip stars already in the constellation (prevent loops)
        let d = dist(star.x, star.y, current.x, current.y)
        if (d < closest.d && d < maxDist) {
          closest.d = d
          closest.star = current
        }
        return closest
      }, { star: null, d: maxDist }).star
    }
  }

  draw () {
    stroke(255, 255, 255, 100)
    strokeWeight(1)
    noFill()
    beginShape()
    this.constellation.forEach(star => {
      vertex(star.sx, star.sy)
    })
    endShape()
  }

}