var level = (function (game) {
	var points = 2;
	
	//wygenerowanie poziomu na podstawie ilości punktów
	function getPath() {
		return [
			[-1, 12],
			[12, 12],
			[12, 2],
			[22, 2],
			[22, 8],
			[-1, 8]
		];
	}
	
	//wygenerowanie fali
	function getWave() {
		
	}
	
	//rysowanie poziomu
	function draw() {
		var path = getPath();
		
		//podłoże
		app.layer.clear('#33394e');
		
		//ścieżka
		for (var i = 0; i < path.length; i++) {
			var current = path[i],
				next = path[i+1];
				
				if (next) {
					app.layer
						.save()
						.lineWidth(32)
						.lineCap('round')
						.strokeStyle('#1abc9c')
						.strokeLine(current[0] * 32 + 16, current[1] * 32 + 16, next[0] * 32 + 16, next[1] * 32 +16)
						.restore();
				}
		}
		
		for (var i = 0; i < path.length; i++) {
			var current = path[i],
				next = path[i+1];
				
				if (next) {
					app.layer
						.save()
						.lineWidth(30)
						.lineCap('round')
						.strokeStyle('#16a085')
						.strokeLine(current[0] * 32 + 16, current[1] * 32 + 16, next[0] * 32 + 16, next[1] * 32 +16)
						.restore();
				}
		}
	}
	
	return {
		draw: draw,
		getPath: getPath,
		getWave: getWave
	};
})(TDGame);
