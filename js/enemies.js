var enemies = (function (game) {
	var enemy_list = game.enemies;
	
	//tworzenie nowych wrogów
	function create(type) {
		var enemy = Object.create(type);
		
		//kolor
		/*
		enemy.color = randomColor({
			luminosity: 'bright',
			hue: 'red'
		});*/
		
		//pozycja startowa
		enemy.x = game.level.path[0][0] * 32;
		enemy.y = game.level.path[0][1] * 32;
		
		//następny checkpoint
		enemy.next_chk = 1;
		
		enemy_list.push(enemy);
	}
	
	//usuwanie wrogów
	function remove(enemy) {
		for (var i in enemy_list) {
			if (enemy === enemy_list[i])
				enemy_list.splice(i, 1);
		}
	}
	
	//aktualizacja wrogów
	function update(dt) {
		var path = game.level.path;
		
		for (var i in enemy_list) {
			var enemy = enemy_list[i],
				point = path[enemy.next_chk] || null;
				
			//ruch po ścieżce
			if (point) {
				var p_x = point[0] * 32,
					p_y = point[1] * 32;
				
				var vec_len = Math.sqrt((p_x - enemy.x) * (p_x - enemy.x) + (p_y - enemy.y) * (p_y - enemy.y)),
					vx = Math.floor((p_x - enemy.x) / vec_len),
					vy = Math.floor((p_y - enemy.y) / vec_len);
			
				enemy.x += vx * enemy.speed * dt;
				enemy.y += vy * enemy.speed * dt;
				
				if (distance(enemy.x, enemy.y, p_x, p_y) < enemy.speed / 100) {
					enemy.x = p_x;
					enemy.y = p_y;
					enemy.next_chk++;
				}
			}
			
			//zadawanie obrażeń
			var last_p = path[path.length-1];
		
			if (enemy.x == last_p[0] * 32 && enemy.y == last_p[1] * 32) {
				game.lives--;
				
				//czyszczenie referencji - celu
				for (var j in game.towers) {
					if (game.towers[j].target == enemy) {
						game.towers[j].target = null;
					}
				}
				
				enemies.remove(enemy);
			}
			
			//umieranie
			if (enemy.hp <= 0) {
				game.credits += enemy.reward;
				
				//eksplozja
				effects.create(effects.Splash, enemy.x + 16, enemy.y + 16);
				
				//czyszczenie referencji - celu
				for (var j in game.towers) {
					if (game.towers[j].target == enemy) {
						game.towers[j].target = null;
					}
				}
				for (var k in game.bullets) {
					if (game.bullets[k].target == enemy) {
						bullets.remove(game.bullets[k]);
					}
				}
				
				enemies.remove(enemy);
			}
			
			
			//domyślna prędkość  ruchu	
			enemy.speed = enemy.__proto__.speed;
			
		}
	}
	
	//rysowanie wrogów
	function draw() {
		var time = Date.now(),
			sinus = Math.sin(time / 150) * 1.5;
		
		for (var i in enemy_list) {
			var enemy = enemy_list[i];
			
			//wróg
			app.layer
				.save()
				.fillStyle(enemy.color)
				.fillCircle(Math.round(enemy.x + 16), Math.round(enemy.y + 16), 12 + sinus)
				.restore();
				
			//ilość hp
			app.layer
				.save()
				.font('12px Verdana')
				.textAlign('center')
				.textBaseline('center')
				.fillStyle('white')
				.fillText(((Math.ceil(enemy.hp)) ? Math.ceil(enemy.hp) : 1), enemy.x + 16, enemy.y + 20)
				.restore();
		}
	}
	
	return {
		create: create,
		remove: remove,
		update: update,
		draw: draw
	};
})(TDGame);

enemies.Enemy = {};

//normalni wrogowie
enemies.Creep = Object.create(enemies.Enemy);
enemies.Creep.hp = 10;
enemies.Creep.speed = 100;
enemies.Creep.reward = 5;
enemies.Creep.color = 'green';

enemies.Sprinter = Object.create(enemies.Enemy);
enemies.Sprinter.hp = 8;
enemies.Sprinter.speed = 250;
enemies.Sprinter.reward = 5;
enemies.Sprinter.color = 'blue';

enemies.Tank = Object.create(enemies.Enemy);
enemies.Tank.hp = 45;
enemies.Tank.speed = 45;
enemies.Tank.reward = 30;
enemies.Tank.color = 'bronze';

//specjalni wrogowie
enemies.Troll = Object.create(enemies.Enemy);
enemies.Troll.hp = 20;
enemies.Troll.speed = 100;
enemies.Troll.reward = 0;

enemies.HeavyTank = Object.create(enemies.Enemy);
enemies.HeavyTank.hp = 250;
enemies.HeavyTank.speed = 40;
enemies.HeavyTank.reward = 150;

