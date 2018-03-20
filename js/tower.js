function Tower() {}

function BasicTower() {}
BasicTower.prototype = new Tower;
BasicTower.dmg = 2;
BasicTower.rate = 0.8;
BasicTower.range = 80;
BasicTower.cost = 10;
BasicTower.color = '#f1c40f';

function SniperTower() {}
SniperTower.prototype = new Tower;
SniperTower.dmg = 10;
SniperTower.rate = 0.4;
SniperTower.range = 200;
SniperTower.cost = 100;
SniperTower.color = '#9b59b6';

function RapidTower() {}
RapidTower.prototype = new Tower;
RapidTower.dmg = 0.5;
RapidTower.rate = 10
RapidTower.range = 50;
RapidTower.cost = 40;
RapidTower.color = '#c0392b';

