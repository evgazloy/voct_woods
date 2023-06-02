var set = new Array();
var tbl = [[]];
var gmode = 0;
var dict = new Dict("save");

outlets = 3;

function clear()
{
	for(var i = 0; i < 12; i++)
		set[i] = 0;
	
	var l = new Array();
	for(var i = 0; i < 12; i++) {
		tbl[i] = [];
		for(var j = 0; j < 13; j++) {
			l.push(i);
			l.push(j);
			tbl[i][j] = 0.;
		}
	}
	
	outlet(0, "disablecell", l);
	outlet(0, "clear");
	gmode = 0.;
	refr();
}

function refr()
{	
	for(var i = 0; i < 12; i++) {
		for(var j = 0; j < 13; j++) {
			var t;
			if(gmode)
				t = tbl[i][j];
			else
				t = tbl[i][j] > 0. ? 1. : 0.;
				
			outlet(1, i, j, t);
		}
	}
	outlet(2, "set", gmode);
}

function add(ind, n)
{
	ind--;
	if(set[ind] != 0)
		return;
		
	var t = n[0];
	
	var l = new Array();
	l.push(ind);
	l.push(12);
	
	for(var i = 0; i < 12; i++) {
		if(set[i] != 0) {
			if(t == "e") {
				l.push(i);
				l.push(ind);
			}
			if(set[i] == 2) {
				l.push(ind);
				l.push(i);
			}
		}
	}
	
	if(t == "g")
		set[ind] = 1;
	else
		set[ind] = 2;
	
	outlet(0, "enablecell", l);
	outlet(1, ind, 12, 1);
	tbl[ind][12] = 1.;
}

function del(ind, n)
{
	ind--;
	if(set[ind] == 0)
		return;
	
	var l = new Array();
	l.push(ind);
	l.push(12);
	
	set[ind] = 0;
	
	for(var i = 0; i < 12; i++) {
		if(set[i] != 0) {
			l.push(i);
			l.push(ind);
			l.push(ind);
			l.push(i);
			outlet(1, i, ind, 0);
			outlet(1, ind, i, 0);
			tbl[i][ind] = 0.;
			tbl[ind][i] = 0.;
		}
	}
	outlet(1, ind, 12, 0);
	outlet(0, "disablecell", l);
	tbl[ind][12] = 0.;
}

function ssave()
{
	dict.replace("mtrx::gmode", gmode);
	for(var i = 0; i < 13; i++) {
		var a = new Array();
		for(var j = 0; j < 12; j++) {
			a.push(tbl[j][i]);
		}
		dict.replace("mtrx::" + i, a);
	}
}

function load()
{
	var oa = new Array();
	
	gmode = dict.get("mtrx::gmode");
	for(var i = 0; i < 13; i++) {
		var a = dict.get("mtrx::" + i);
		
		for(var j = 0; j < a.length; j++)
			tbl[j][i] = a[j];
	}
	refr();
}

function gain(g)
{
	gmode = g;
	
	outlet(0, "dialmode", g * 2);
	refr();
}

function setcell(h, v, val)
{
	if(val != tbl[h][v]) {
		tbl[h][v] = val;
		outlet(1, h, v, val);
	}
}