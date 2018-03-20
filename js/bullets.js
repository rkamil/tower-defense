var bullets = (function (game) {
	var bullet_list = game.bullets;
	
	//tworzenie nowych pocisków
	function create(tower, target) {
		var bullet = {};
		
		bullet.tower = tower;
		bullet.target = target;
		bullet.lifetime =  0.2;

		bullet_list.push(bullet);
	}
	
	//usuwanie pocisków
	function remove(bullet) {
		for (var i in bullet_list) {
			if (bullet === bullet_list[i])
				bullet_list.splice(i, 1);
		}
	}
	
	//aktualizacja pocisków
	function update(dt) {
		for (var i in bullet_list) {

			var bullet = bullet_list[i];
			
			bullet.lifetime -= dt;
			
			if (bullet.lifetime <= 0)
				remove(bullet);
		}
	}
	
	//rysowanie pocisków
	function draw() {
		for (var i in bullet_list) {
			var bullet = bullet_list[i],
				sinus = Math.sin(bullet.lifetime * 100) * 4,
				tower = bullet.tower,
				target = bullet.target,
				color = Math.random() > 0.8 ? 'white' : tower.color;

			app.layer
				.save()
				.lineWidth(4 + sinus)
				.strokeStyle(tower.color)
				.lineCap('round')
				.strokeLine(tower.center_x, tower.center_y, target.x + 16, target.y + 16)
				.restore()
		}
	}
	
	
	return {
		create: create,
		remove: remove,
		update: update,
		draw: draw
	};
})(TDGame);

//typy pocisków
bullets.BEAM = 1;
bullets.WAVE = 2;
