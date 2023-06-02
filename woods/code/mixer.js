var dict = new Dict("save");

function ssave()
{
	for(var i = 0; i < 12; i++) {
		var l = patcher.getnamed("panl" + i);
		var r = patcher.getnamed("panr" + i);
		var f = patcher.getnamed("fad" + i);
		var sol = patcher.getnamed("solo" + i);
		var m = patcher.getnamed("mute" + i);
		
		var s = "mix::" + i;
		dict.replace(s + "::panl", l.getvalueof());
		dict.replace(s + "::panr", r.getvalueof());
		dict.replace(s + "::fad", f.getvalueof());
		dict.replace(s + "::solo", sol.getvalueof());
		dict.replace(s + "::mute", m.getvalueof());
	}
}

function sload()
{
	for(var i = 0; i < 12; i++) {
		var l = patcher.getnamed("panl" + i);
		var r = patcher.getnamed("panr" + i);
		var f = patcher.getnamed("fad" + i);
		var sol = patcher.getnamed("solo" + i);
		var m = patcher.getnamed("mute" + i);
		
		var s = "mix::" + i;
		l["int"](dict.get(s + "::panl"));
		r["int"](dict.get(s + "::panr"));
		f["float"](dict.get(s + "::fad"));
		sol["int"](dict.get(s + "::solo"));
		m["int"](dict.get(s + "::mute"));
	}
}

function clear()
{
	for(var i = 0; i < 12; i++) {
		var l = patcher.getnamed("panl" + i);
		var r = patcher.getnamed("panr" + i);
		var f = patcher.getnamed("fad" + i);
		var sol = patcher.getnamed("solo" + i);
		var m = patcher.getnamed("mute" + i);
		
		l["int"](-100);
		r["int"](100);
		f["float"](0.);
		sol["int"](0);
		m["int"](0);
	}
}