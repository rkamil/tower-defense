function distance(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function checkpoint(x, y) {
	this.x = x;
	this.y = y;
}

function isPointOnLine(ax, ay, bx, by, xCheck, yCheck) {
	if( ax < bx) {
		if((xCheck < ax) || (xCheck > bx))
			return false;
	} 
	else {
		if( (xCheck < bx) || (xCheck > ax))
			return false;
	}
	if( ay < by) {
		if( (yCheck < ay) || (yCheck > by))
			return false;
	}
	else {
		if( (yCheck < by) || (yCheck > ay))
			return false;
	}
	var test1 = (yCheck - ay) * (bx - ax),
		test2 = (by - ay) * (xCheck - ax); 
	if( test1 != test2)
               return false; 
	return true;
}
