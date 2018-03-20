var gamestate = {};

gamestate.GAME = {
	enter: function () {		
		this.meter = new FPSMeter();
		
		
		this.level = TDGame.level;
		
			
		
		
		
	},
	
	leave: function () {
		
	},
	
	step: function (dt) {
		
		//pauzowanie gry
		if (TDGame.paused)
			return;
		
		//aktualizacja interfejsu
		updateUI();
		
		//aktualizacja wrogów
		enemies.update(dt);
		
		//aktualizacja wieżyczek
		towers.update(dt);
		
		//aktualizacja pocisków
		bullets.update(dt);
			
	},
	
	render: function () {
		
		//pauzowanie gry
		if (TDGame.paused)
			return;
			
		//wyczyszczenie ekranu
		app.layer.clear();
		
		//narysowanie mapy
		level.draw();
		
		//rysowanie pocisków
		bullets.draw();
		
		//rysowanie wrogów
		enemies.draw();
		
		//rysowanie wieżyczek
		towers.draw();
		
		effects.draw();
		
		//rysowanie wiadomości
		messages.draw();
		
		//obliczenie fps
		this.meter.tick();
	},
	
	mousedown: function (e) {
		var mouse = getMousePos();
		
		mouse.x = Math.floor(mouse.x / 32);
		mouse.y = Math.floor(mouse.y / 32);
		
		
		if (e.button == 'left') {
			if (mouse.x >= 0 && mouse.x <= 24 && mouse.y >= 0 && mouse.y <= 14)
				towers.place(TDGame.selected_tower, mouse.x, mouse.y);
		}
			
		if (e.button == 'right' && TDGame.selected_tower) {
			messages.hide();
			TDGame.selected_tower = null;
		}
	}
}



document.getElementById('tower-basic').onmouseover = function () {
	if (!TDGame.selected_tower)
		messages.show('BASIC TOWER, COST: 10');
}

document.getElementById('tower-basic').onmouseout = function () {
	if (!TDGame.selected_tower)
		messages.hide();
}

document.getElementById('tower-rapid').onmouseover = function () {
	if (!TDGame.selected_tower)
		messages.show('RAPID TOWER, COST: 40');
}

document.getElementById('tower-rapid').onmouseout = function () {
	if (!TDGame.selected_tower)
		messages.hide();
}

document.getElementById('tower-sniper').onmouseover = function () {
	if (!TDGame.selected_tower)
		messages.show('SNIPER TOWER, COST: 100');
}

document.getElementById('tower-sniper').onmouseout = function () {
	if (!TDGame.selected_tower)
		messages.hide();
}

document.getElementById('tower-freezer').onmouseover = function () {
	if (!TDGame.selected_tower)
		messages.show('FREEZER TOWER, COST: 30');
}

document.getElementById('tower-freezer').onmouseout = function () {
	if (!TDGame.selected_tower)
		messages.hide();
}


document.getElementById('spawn-wave').onmouseover = function () {
	if (!TDGame.selected_tower)
		messages.show('CLICK TO START NEXT WAVE');
}

document.getElementById('spawn-wave').onmouseout = function () {
	if (!TDGame.selected_tower)
		messages.hide();
}


window.onblur = function () {
	//if (TDGame)
		//pause();
}
