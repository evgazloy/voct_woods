var nodes = [];

for(var i = 0; i < 12; i ++)
	nodes[i] = -1;

outlets = 4;
var stored_ind = 0;
var types_count = 8;

function msg_int(ind)
{
	stored_ind = ind;
	ind--;
	if(nodes[ind] != -1) {
		outlet(0, "active", 0);
		outlet(1, "active", 1);
		
		for(var j = 0; j < types_count; j++)
			outlet(2, "enableitem", j, 1);
			
		outlet(2, nodes[ind]);
		
		for(var j = 0; j < types_count; j++)
			outlet(2, "enableitem", j, 0);
			
		outlet(3, "active", 1);
	}
	else {
		outlet(0, "active", 1);
		outlet(1, "active", 0);
		
		for(var j = 0; j < types_count; j++)
			outlet(2, "enableitem", j, 1);
		
		outlet(3, "active", 0);
	}
}

function add(ind, eff)
{
	stored_ind = ind;
	nodes[ind - 1] = eff;
	msg_int(ind);
}

function del(ind, eff)
{
	stored_ind = ind;
	nodes[ind - 1] = -1;
	msg_int(ind);
}

function clear()
{
	for(var i = 0; i < 12; i++)
		nodes[i] = -1;
		
	msg_int(stored_ind);
}