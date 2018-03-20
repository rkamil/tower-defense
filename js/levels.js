var levels = [];

levels.push({
	name: 'Pierwszy poziom',
	lives: 10,
	credits: 150,
	waves: [
		['Sprinter:3', 'Creep:5', 'Tank:2'],
		['Sprinter:20'],
		['Tank:10'],
		['Sprinter:20', 'Creep:15', 'Tank:10'],
		['Sprinter:30', 'Tank:20']
	],
	path: [
		[-1, 12],
		[12, 12],
		[12, 2],
		[22, 2],
		[22, 8],
		[-1, 8]
		/*[-1, 14],
		[24, 14],
		[24, 0],
		[-1, 0]*/
	]
});
