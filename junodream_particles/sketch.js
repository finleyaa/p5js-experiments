const SHOW_FRAMERATE = false
const BACKGROUND_START_COLOR = [255, 249, 222]
const NOISE_SCALE = 0.01
const NOISE_SPEED = 4
const FLOW_FIELD_DENSITY = 10
const PAPER_NOISE_DENSITY = 1

let currentBgColor = BACKGROUND_START_COLOR
const particles = []
let paperImage = null

function setup() {
  pixelDensity(1)
  createCanvas(window.innerWidth, window.innerHeight)
  
  const paperNoise = {}
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      paperNoise[`${x},${y}`] = Math.random()
    }
  }
  
  const setupPaper = () => {
    paperImage = createImage(width, height)
    paperImage.loadPixels()
    for (let x = 0; x < width; x += PAPER_NOISE_DENSITY) {
      for (let y = 0; y < height; y += PAPER_NOISE_DENSITY) {
        const noiseVal = paperNoise[`${x},${y}`]
        const alpha = map(noiseVal, 0, 1, 0, 60)
        paperImage.set(x, y, [255, 255, 255, alpha])
      }
    }
    paperImage.updatePixels()
  }

  setupPaper()
  noiseDetail(8, 0.3)

  window.addEventListener('resize', () => {
    resizeCanvas(window.innerWidth, window.innerHeight)
    setupPaper()
  })

  for (let i = 0; i < 4; i++) {
    particles.push(new Particle(Math.random() * width, Math.random() * height))
  }
}

function draw() {
  background(currentBgColor)

  if (SHOW_FRAMERATE) {
    // write the framerate in the top left corner
    fill(0)
    noStroke()
    text(frameRate().toFixed(2), 10, 20)
  }

  if (Math.random() < 0.02 || particles.length <= 1) {
    // add a new particle
    particles.push(new Particle(Math.random() * width, Math.random() * height))
  }

  particles.forEach(particle => {
    particle.update()
    if (particle.isBackground) {
      currentBgColor = particle.color
      particle.size = 0
      particle.shrinking = true
    }
    particle.show()
    const noiseVal = noise((particle.pos.x + (frameCount * NOISE_SPEED)) * NOISE_SCALE, (particle.pos.y - (frameCount * NOISE_SPEED)) * NOISE_SCALE, frameCount * NOISE_SPEED * NOISE_SCALE)
    const angle = map(noiseVal, 0.5, 1, 0, TWO_PI)
    const vector = p5.Vector.fromAngle(angle)
    vector.setMag(1)
    particle.applyForce(vector)
    if (particle.size === 0 && particle.shrinking || particle.offscreen()) {
      // remove particle
      const index = particles.indexOf(particle)
      if (index > -1) {
        particles.splice(index, 1)
      }
    }
  })

  // draw noise faded on top
  image(paperImage, 0, 0)
}