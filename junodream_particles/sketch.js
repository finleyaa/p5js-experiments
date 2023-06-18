const SHOW_FRAMERATE = false
const BACKGROUND_START_COLOR = [255, 249, 222]
const NOISE_SCALE = 0.01
const NOISE_SPEED = 4
const FLOW_FIELD_DENSITY = 10

let currentBgColor = BACKGROUND_START_COLOR
const particles = []

function setup() {
  pixelDensity(1)
  createCanvas(window.innerWidth, window.innerHeight)
  noiseDetail(8, 0.3)

  window.addEventListener('resize', () => {
    resizeCanvas(window.innerWidth, window.innerHeight)
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

  // draw the noise
  // loadPixels()
  // for (let x = 0; x < width; x++) {
  //   for (let y = 0; y < height; y++) {
  //     const noiseVal = noise(x * NOISE_SCALE, y * NOISE_SCALE, frameCount * NOISE_SPEED * NOISE_SCALE)
  //     const adjustedNoiseVal = map(noiseVal, 0, 1, 0, 0.5)
  //     const color = map(adjustedNoiseVal, 0, 1, 0, 255)
  //     set(x, y, [color, color, color, 255])
  //   }
  // }
  // updatePixels()

  if (Math.random() < 0.01 || particles.length <= 1) {
    // add a new particle
    particles.push(new Particle(Math.random() * width, Math.random() * height))
  }

  particles.forEach(particle => {
    particle.update()
    particle.show()
    const noiseVal = noise((particle.pos.x + (frameCount * NOISE_SPEED)) * NOISE_SCALE, (particle.pos.y - (frameCount * NOISE_SPEED)) * NOISE_SCALE, frameCount * NOISE_SPEED * NOISE_SCALE)
    const angle = map(noiseVal, 0.5, 1, 0, TWO_PI)
    const vector = p5.Vector.fromAngle(angle)
    vector.setMag(1)
    particle.applyForce(vector)
    if (particle.size === 0 && particle.shrinking) {
      // remove particle
      const index = particles.indexOf(particle)
      if (index > -1) {
        particles.splice(index, 1)
      }
    }
  })
}