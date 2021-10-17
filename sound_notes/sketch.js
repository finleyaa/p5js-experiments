var osc, osc1, osc2
var filter0, filter1, filter2

function setup() {
	
	filter0 = new p5.HighPass()
	filter1 = new p5.HighPass()
	filter2 = new p5.HighPass()
	
	filter0.freq(261.6)
	filter1.freq(329.6)
	filter2.freq(392.0)
	
	
	osc = new p5.Oscillator()
	osc1 = new p5.Oscillator()
	osc2 = new p5.Oscillator()
	osc.connect(filter0)
	osc1.connect(filter1)
	osc2.connect(filter2)
	osc.setType("sine")
	osc1.setType("sine")
	osc2.setType("sine")
	osc.freq(261.6)
	osc1.freq(329.6)
	osc2.freq(392.0)
	osc.amp(0.2)
	osc1.amp(0.2)
	osc2.amp(0.2)
	osc.start()
	osc1.start()
	osc2.start()
}

function draw() {

}