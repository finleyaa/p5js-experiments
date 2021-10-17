const points = []
const pointsAmount = 100
// const z = width / 2
// let zDirection = 1

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  strokeWeight(10)
  for (let i = 0; i < pointsAmount; i++) {
    points.push(createVector(random(width), random(height), random(width)))
    point(points[i])
  }
}

function draw() {
  loadPixels()
  let pd = pixelDensity()
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const distances = []
      for (let i = 0; i < points.length; i++) {
        const v = points[i]
        const z = width / 2
        const d = dist(x, y, z, points[i].x, points[i].y, points[i].z)
        distances.push(d)
      }
      const n = 0
      const sorted = sort(distances)
      // const noiseColor = color(map(sorted[n], 0, max(height, width) / 4, 0, 255))
      const r = map(sorted[0], 0, width / 4, 0, 255)
      const g = map(sorted[1], 0, width / 4, 0, 255)
      const b = map(sorted[4], 0, width / 4, 0, 255)
      
      const index = (x + y * width) * 4
      pixels[index] = r
      pixels[index + 1] = g
      pixels[index + 2] = b
      pixels[index + 3] = 255
    }
  }
  updatePixels()
  console.log('done')
  // z += zDirection
  // if (z > width) {
  //   zDirection = -1
  //   z = width
  // } else if (z < 0) {
  //   zDirection = 1
  //   z = 0
  // }
  noLoop()
}