var timer = (function () {
	var timer_list = [];
	
	//nowy licznik
	function start(cb, delay) {
		var obj = {};
		
		obj.cb = cb;
		obj.start = Date.now();
		obj.id = setTimeout(cb, delay);
		obj.remaining = delay;
		
		timer_list.push(obj);
	}
	
	//pauza wszystkich liczników
	function pause() {
		for (var i in timer_list) {
			var timer = timer_list[i];
			
			clearTimeout(timer.id);
			timer.remaining -= (Date.now() - timer.start);
		}
	}
	
	//wznowienie wszystkich liczników
	function resume() {
		for (var i in timer_list) {
			var timer = timer_list[i];
			
			timer.remaining -= (Date.now() - timer.start);
			
			if (timer.remaining <= 0)
				timer_list.splice(i, 1);
			
			timer.start = Date.now();
			clearTimeout(timer.id);
			timer.id = setTimeout(timer.cb, timer.remaining);
		}
	}
	
	return {
		start: start,
		pause: pause,
		resume: resume,
		list: timer_list
	};
})();
