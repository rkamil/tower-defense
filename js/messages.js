var messages = (function () {
	var obj = {},
		message = '',
		font_height = 18;
	
	//pokaż wiadomość
	obj.show = function (msg) {
		message = msg;
	}
	
	//schowaj wiadomość
	obj.hide = function () {
		message = '';
	}
	
	//rysowanie powiadomień
	obj.draw = function () {
		if (message) {
			app.layer
				.save()
				.font(font_height + 'px Verdana')
				.fillStyle('white')
				.textAlign('center')
				.textBaseline('top')
				.wrappedText(message, 800/2, 0, 800, font_height)
				.restore();
		}
	}
	
	return obj;
})();
