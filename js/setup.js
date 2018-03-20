var TDGame = {},
	app = playground({
		width: 800,
		height: 480,
		
		create: function () {
			this.loadImages('path', 'grass');
		},
		
		ready: function () {
			document.getElementById('tdgame-loading').style.display = 'none';
			document.getElementById('tdgame-screen').style.display = 'block';
			document.getElementById('tdgame-ui').style.display = 'block';
			
			//przygotowanie gry
			
			
			this.setState(gamestate.GAME);
		},
		
		container: document.getElementById('tdgame-screen'),
	});

prepareGame();
