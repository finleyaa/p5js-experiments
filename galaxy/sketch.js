const stars = []
let constellationMaker = null

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  window.addEventListener('resize', () => {
    resizeCanvas(window.innerWidth, window.innerHeight)
  })

  for (let i = 0; i < 1000; i++) {
    stars.push(new Star(random(), random(), random()))
  }

  constellationMaker = new ConstellationMaker('Ursa Major', stars)
}

function draw() {
  background(0)

  stars.forEach(star => {
    star.draw()
  })

  constellationMaker.draw()
}