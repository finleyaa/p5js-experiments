function Population(){
	this.rockets = []
	this.popsize = 25
	this.matingpool = []
	this.fittestpoints
	
	for (var i = 0; i < this.popsize; i++){
		this.rockets[i] = new Rocket()
	}
	
	this.evaluate = function(){
		
		var maxFit = 0
		
		for (var i = 0; i < this.popsize; i++){
			this.rockets[i].calcFitness()
			if (this.rockets[i].fitness > maxFit){
				maxFit = this.rockets[i].fitness
				this.fittestpoints = this.rockets[i].points
			}
		}
		
		for (var i = 0; i < this.popsize; i++){
			this.rockets[i].fitness /= maxFit
		}
		
		this.matingpool = []
		for (var i = 0; i < this.popsize; i++){
			var n = this.rockets[i].fitness * 100
			for (var j = 0; j < n; j++){
				this.matingpool.push(this.rockets[i])
			}
		}
	}
	
	this.selection = function(){
		var newRockets = []
		for (var i = 0; i < this.rockets.length; i++){
			var parentA = random(this.matingpool).dna
			var parentB = random(this.matingpool).dna
			var child = parentA.crossover(parentB)
			child.mutate()
			newRockets[i] = new Rocket(child)
		}
		this.rockets = newRockets
		maxfitpoints = this.fittestpoints
	}
	
	this.run = function(){
		for (var i = 0; i < this.rockets.length; i++){
			this.rockets[i].update()
			this.rockets[i].show()
		}
	}
	
}