var effects = (function (game) {
	var effect_list = game.effects;
	
	//tworzenie nowych efektów
	function create(type, x, y) {
		
		if (type == effects.Splash) {
			var splash = Object.create(effects.Effect);
			
			splash.x = x;
			splash.y = y;
			splash.color = 'white';
			
			effect_list.push(splash);
			
			Tweener.addTween(splash, {scale: 2, alpha: 0, time: 0.5, onComplete: function () {
				remove(splash);
			}});
		}
		
	}
	
	//kasowanie
	function remove(effect) {
		for (var i in effect_list) {
			if (effect == effect_list[i])
				effect_list.splice(i, 1);
		}
	}
	
	//rysowanie
	function draw() {
		for (var i in effect_list) {
			var effect = effect_list[i];
			
			app.layer
				.save()
				.fillStyle(effect.color)
				.a(effect.alpha)
				.translate(effect.x, effect.y)
				.scale(effect.scale, effect.scale)
				.fillCircle(0, 0, 16)
				.restore();
		}
	}
	
	return {
		create: create,
		remove: remove,
		draw: draw
	};
})(TDGame);

effects.Effect = {};
effects.Effect.x = null;
effects.Effect.y = null;
effects.Effect.scale = 1;
effects.Effect.alpha = 1;
effects.Effect.color = null;


effects.Splash = 1;
