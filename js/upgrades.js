var upgrades = (function (game) {
	
	//maksymalne poziomy ulepszeń
	var max_levels = {
		enemySpeed: 5,
		levelHardness: 4,
		
		towerDmg: 7,
		towerRate: 7,
		towerRange: 7
	};
	
	//koszty ulepszeń (lv1)
	var level_costs = {
		enemySpeed: 20,
		levelHardness: 250,
		
		towerDmg: 10,
		towerRate: 10,
		towerRange: 10,
		
		basicTower: 10,
		rapidTower: 20,
		freezerTower: 40,
		sniperTower: 100
	};

	//ulepszenie
	function upgrade(what) {
		
	}

	return {
		upgrade: upgrade
	};
})(TDGame);
