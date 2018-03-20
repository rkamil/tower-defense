var towers = (function (game) {
	var tower_list = game.towers;
	
	//stawianie nowej wieżyczki
	function place(selected_tower, x, y) {
		if (!selected_tower)
			return;
		
		var tower = Object.create(selected_tower);
		
		tower.cooldown = 0;
		tower.target = null;
		
		tower.x = x;
		tower.y = y;
		
		tower.center_x = x * 32 + 16;
		tower.center_y = y * 32 + 16;
		
		
		if (!checkPlace(x, y)) {
			game.credits -= selected_tower.cost;
			//game.selected_tower = 0;
			
			messages.hide();
			
			tower.scale = 1.4;
			Tweener.addTween(tower, {scale: 1, time: 1});
	
			tower_list.push(tower);
			
			//sprawdzenie, i ew połączenie wieżyczek
			checkMatchThree(tower.x, tower.y);

		}
	}
	
	//kasowanie
	function remove(tower) {
		for (var i in tower_list) {
			if (tower == tower_list[i])
				tower_list.splice(i, 1);
		}
	}
	
	//aktualizacja wieżyczek
	function update(dt) {
		for (var i in tower_list) {
			var tower = tower_list[i],
				enemies = game.enemies;
				
			//cooldown od strzelania
			tower.cooldown -= dt;
			if (tower.cooldown < 0) tower.cooldown = 0;
				
			//zaniechanie ataku, jak za daleko
			if (tower.target && distance(tower.target.x+16, tower.target.y+16, tower.center_x, tower.center_y) > tower.range) {
				tower.target = null;
			}
			
			//namierzanie wroga
			if (!tower.target) {
				var new_target = null;
				
				for (var j in enemies) {
					var enemy = enemies[j];
					
					if (distance(tower.center_x, tower.center_y, enemy.x+16, enemy.y+16) <= tower.range) {
						if (!new_target) new_target = enemy;
						
						if (distance(tower.center_x, tower.center_y, enemy.x+16, enemy.y+16) >
							distance(tower.center_x, tower.center_y, new_target.x+16, new_target.y+16)) {
								new_target = enemy;
							}
					}
				}
				
				tower.target = new_target;
			}
			
			
			//strzelanie
			if (tower.cooldown == 0 && tower.target && tower.dmg) {
				tower.target.hp -= tower.dmg;
				tower.cooldown = 1 / tower.rate;
				
				bullets.create(tower, tower.target);
			}
			
			//spowalnianie
			if (tower.slow) {
				
				for (var k in enemies) {
					var enemy = enemies[k];
					
					if (distance(tower.center_x, tower.center_y, enemy.x+16, enemy.y+16) <= tower.range) {
						enemy.speed = enemy.__proto__.speed * tower.slow;
					}
				}
				
			}
		}
	}
	
	//rysowanie wieżyczek
	function draw() {

		//wieżyczki
		for (var i in tower_list) {
			var tower = tower_list[i];
			
			app.layer
				.save()
				.translate(tower.x * 32 + 16, tower.y * 32 + 16)
				.scale(tower.scale, tower.scale)
				.fillStyle(tower.color)
				.fillCircle(0, 0, 15)
				.restore();
		}
		
		//zasięg
		for (var i in tower_list) {
			var tower = tower_list[i],
				mouse = getMousePos();
				
			if (mouse.x >= tower.x * 32 && mouse.x <= (tower.x * 32) + 32 && 
				mouse.y >= tower.y * 32 && mouse.y <= (tower.y * 32) + 32) {
				
				if (game.selected_tower)
					continue;
				
				app.layer
					.save()
					.lineWidth(2)
					.strokeStyle(tower.color)
					.fillStyle(tower.color)
					.strokeCircle((tower.x * 32) + 16, (tower.y * 32) + 16, tower.range)
					.a(0.2)
					.fillCircle((tower.x * 32) + 16, (tower.y * 32) + 16, tower.range)
					.restore();
			}
		}
		
		//podglądowa wieżyczka
		if (game.selected_tower) {
			var tower = game.selected_tower,
				mouse = getMousePos();
			
			mouse.x = Math.floor(mouse.x / 32) * 32;
			mouse.y = Math.floor(mouse.y / 32) * 32;
			
			if (checkPlace(mouse.x / 32, mouse.y / 32)) {
				app.layer
					.save()
					.fillStyle('red')
					.a(1)
					.fillRect(mouse.x, mouse.y, 32, 32)
					.restore();
			}
			
			app.layer
				.save()
				.fillStyle(tower.color)
				.fillCircle(mouse.x + 16, mouse.y + 16, 15)
				.restore();
				
			app.layer
				.save()
				.lineWidth(2)
				.strokeStyle(tower.color)
				.fillStyle(tower.color)
				.strokeCircle(mouse.x + 16, mouse.y + 16, tower.range)
				.a(0.2)
				.fillCircle(mouse.x + 16, mouse.y + 16, tower.range)
				.restore();
		}
	}
	
	function checkMatchThree(x, y) {		
		
	}
	
	
	return {
		place: place,
		update: update,
		draw: draw,
		remove: remove
	}
})(TDGame);

towers.Tower = {};
towers.Tower.scale = 1;

//prosta wieżyczka
towers.Basic = Object.create(towers.Tower);
towers.Basic.dmg = 2.2;
towers.Basic.rate = 0.8;
towers.Basic.range = 80;
towers.Basic.cost = 0;
towers.Basic.color = '#f1c40f';

//snajperska wieżyczka
towers.Sniper = Object.create(towers.Tower);
towers.Sniper.dmg = 12.5;
towers.Sniper.rate = 0.4;
towers.Sniper.range = 200;
towers.Sniper.cost = 0;
towers.Sniper.color = '#9b59b6';

//szybka wieżyczka
towers.Rapid = Object.create(towers.Tower);
towers.Rapid.dmg = 0.7;
towers.Rapid.rate = 10;
towers.Rapid.range = 55;
towers.Rapid.cost = 0;
towers.Rapid.color = '#c0392b';

//spowalniająca wieżyczka
towers.Freezer = Object.create(towers.Tower);
towers.Freezer.dmg = 0;
towers.Freezer.slow = 0.5;
towers.Freezer.rate = 0;
towers.Freezer.range = 100;
towers.Freezer.cost = 0;
towers.Freezer.color = '#3498db';
