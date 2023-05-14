/**
 * Each constellation is a collection of stars
 * The stars must form a connected graph
 * The stars must be within a certain distance of each other
 */

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
    const maxStars = random(10, 30)
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

    console.log(this.constellation.length)

    // find the convex hull of the constellation
    const hull = []
    const leftMost = this.constellation.reduce((leftmost, current) => {
      if (current.x < leftmost.x) return current
      return leftmost
    })
    let currentPoint = leftMost
    hull.push(currentPoint) // add the leftmost point to the hull
    do {
      // find the next point in the hull
      let nextPoint = this.constellation.reduce((next, current) => {
        if (current === currentPoint) return next // skip the last point we added to the hull
        const a = p5.Vector.sub(createVector(next.x, next.y), createVector(currentPoint.x, currentPoint.y)) // vector from the current best candidate to the last one we added to the hull
        const b = p5.Vector.sub(createVector(current.x, current.y), createVector(currentPoint.x, currentPoint.y)) // vector from the one we're checking to the last one we added to the hull
        const cross = a.cross(b)
        if (cross.z < 0) {
          next = current
        }
        return next
      })
      hull.push(nextPoint)
      currentPoint = nextPoint
    } while (currentPoint !== leftMost)
    this.constellation = hull
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

    stroke(255, 0, 0)
    strokeWeight(4)
  }

}