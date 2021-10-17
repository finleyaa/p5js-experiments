var slidermin
var slidermax
var palette = [];

function setup() {
	createCanvas(360, 360)
	pixelDensity(1)
	slidermin = createSlider(-10, 10, 2, 0.1)
	slidermax = createSlider(-10, 10, 2, 0.1)
	generatePalette()
}

function draw() {
	var maxiterations = 50
	loadPixels()
	for (var x = 0; x < width; x++){
		for (var y = 0; y < height; y++){
			
			var a = map(x, 0, width, -slidermin.value(), slidermax.value())
			var b = map(y, 0, height, -slidermin.value(), slidermax.value())
			
			var ca = a
			var cb = b
			
			var n = 0
			
			while (n < maxiterations){
				var aa = a * a - b * b
				var bb = 2 * a * b
				
				a = aa + ca
				b = bb + cb
				
				if (abs(a + b) > 16){
					break
				}
				
				n++
			}
			
			//var bright = map(n, 0, maxiterations, 0, 1)
			//bright = map(sqrt(bright), 0, 1, 0, 255)
			var color;
			if (n == maxiterations) {
				color = { r:0, g:0, b:0}; // Black
			} else {
				var index = Math.floor((n / (maxiterations-1)) * 255);
				color = palette[index];
			}
			//var bright = map(n % 16, 0, maxiterations % 16, 0, 255)
			
			var pix = (x + y * width) * 4
			pixels[pix + 0] = color.r
			pixels[pix + 1] = color.b
			pixels[pix + 2] = color.g
			pixels[pix + 3] = 255
		}
	}
	updatePixels()
	
}
function generatePalette() {
    // Calculate a gradient
    var roffset = 24;
    var goffset = 0;
    var boffset = 16;
    for (var i=0; i<256; i++) {
        palette[i] = { r:roffset, g:goffset, b:boffset};

        if (i < 64) {
            roffset += 3;
        } else if (i<128) {
            goffset += 3;
        } else if (i<192) {
            boffset += 3;
        }
    }
}