//przygotowanie gry
function prepareGame() {
	TDGame.paused = false;
	
	TDGame.enemies = [];
	TDGame.towers = [];
	TDGame.bullets = [];
	TDGame.effects = [];
	
	TDGame.level = levels[0];
	
	TDGame.lives = TDGame.level.lives;
	TDGame.credits = TDGame.level.credits;
	TDGame.wave = 1;
	
	TDGame.selected_tower = 0;
}





//pauza
function pause() {
	TDGame.paused = true;
	document.getElementById('tdgame-paused').style.display = 'block';
}

//odpauzowanie
function unPause() {
	TDGame.paused = false;
	document.getElementById('tdgame-paused').style.display = 'none';
}

//aktualizacja UI
function updateUI() {
	document.getElementById('ui-lives').innerHTML = 'lives: ' + TDGame.lives;
	document.getElementById('ui-credits').innerHTML = 'credits: ' + TDGame.credits;
	document.getElementById('ui-waves').innerHTML = 'next wave: ' + (TDGame.wave ? TDGame.wave : 1) + '/' + TDGame.level.waves.length;
	
	if (TDGame.wave > TDGame.level.waves.length) 
		document.getElementById('ui-waves').innerHTML = 'next wave: none';
}

//spawn fali wrogów
function spawnEnemyWave() {
	var wave = TDGame.wave - 1,
		waves = TDGame.level.waves[wave],
		spawn_queue = [];

		//utworzenie kolejki spawnowania
		for (var i in waves) {
			var enemy = waves[i].split(':'),
				type = enemy[0],
				count = enemy[1];
				
				console.log(count);
			
			for (var j = 0; j < count; j++) {
				spawn_queue.push(type)
			}
		}
		
		//spawn wrogów
		for (var i in spawn_queue) {
			
			(function (type) {
				setTimeout(function () {
					
					var enemy_class = enemies[type];
					enemies.create(enemy_class);
					
				}, i * 500);
			})(spawn_queue[i])
			
		}

	if (wave < TDGame.level.waves.length)
		TDGame.wave++;
}

//wybranie wieży z menu
function selectTower(selected_tower) {
	if (selected_tower.cost > TDGame.credits)
		return;
	
	messages.show('PRESS LMB TO PLACE, RMB TO CANCEL')
	
	TDGame.selected_tower = selected_tower;
}

//czy miejsce jest wolne? (można postawić wieżę): true - zajęte
function checkPlace(x, y) {
	//czy mieści się na mapie
	if (x < 0 || x > 24 || y < 0 || y > 14)
		return true;
	
	//najpierw wieża
	for (var i in TDGame.towers) {
		var tower = TDGame.towers[i];
		
		if (x == tower.x && y == tower.y)
			return true;
	}
	
	//teraz ścieżka
	for (var i = 0; i < (TDGame.level.path.length - 1) ; i++) {
		var pa = TDGame.level.path[i],
			pb = TDGame.level.path[i+1];
			
		if (isPointOnLine(pa[0], pa[1], pb[0], pb[1], x, y))
			return true;
	}
	
	return false;
}

//pobranie pozycji myszy
function getMousePos() {
	var canvas = app.layer.canvas,
		x = app.mouse.x - canvas.offsetLeft,
		y = app.mouse.y - canvas.offsetTop;
	
	return {
		x: x,
		y: y
	};
}
