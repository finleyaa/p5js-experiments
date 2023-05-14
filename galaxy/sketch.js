const stars = []
const constellationMakers = []

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  window.addEventListener('resize', () => {
    resizeCanvas(window.innerWidth, window.innerHeight)
  })

  for (let i = 0; i < 1000; i++) {
    stars.push(new Star(random(), random(), random()))
  }

  for (let i = 0; i < 1; i++) {
    constellationMakers.push(new ConstellationMaker('Constellation ' + i, stars))
  }
}

function draw() {
  background(0)

  stars.forEach(star => {
    star.draw()
  })

  constellationMakers.forEach(constellationMaker => {
    constellationMaker.draw()
  })
}