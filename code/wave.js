sketch.default2d();

var asp = calcAsp();
var lines = [];

clear();

function calcAsp()
{
	var width = this.box.rect[2] - this.box.rect[0];
 	var height = this.box.rect[3] - this.box.rect[1];
 	return width/height;
}

function draw()
{
	with(sketch) {
		glclearcolor(0., 0., 0., 0.);
		glclear();
		glcolor([0., 0., 0., 1.]);
		
		for(var i = 0; i < 12; i++) {
			for(var j = 0; j < lines[i].length; j++) {
				if(lines[i][j] == -1)
					continue;
					
				var x = -asp + (lines[i][j] * asp * 2.);

				moveto(x, -1);
				lineto(x, 1);
			}
		}
	}
	refresh();
}

function line()
{
	var a = arrayfromargs(arguments);
	lines[a[0]] = a.slice(1);
	draw();
}

function onresize()
{
	asp = calcAsp();
	draw();
}

function clear()
{
	for(var i = 0; i < 12; i++)
		lines[i] = [-1];
		
	draw();
}