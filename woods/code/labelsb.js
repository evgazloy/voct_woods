mgraphics.init();
mgraphics.relative_coords = 1;
mgraphics.autofill = 0;

var names = [];
for(var i = 0; i < 13; i++)
	names[i] = "-";

function paint() {
	var aspect = calcAspect();
  	with (mgraphics) {
		set_source_rgba(0.769, 0.875, 0.890, 1.000);
		select_font_face("Ableton Sans Bold");
		
		if(aspect > 1.) {
			rotate(Math.PI / 2.);
	
			for(var i = 0; i < 12; i++) {
				move_to(-aspect, 1.075 + i * (aspect / 6.));
				text_path((i+1).toString() + " " + names[i]);
				fill();
			}
		}
		else {
			for(var i = 0; i < 13; i++) {
				move_to(-aspect, 0.875 - i * (1. / 6.57));
				var t = (i+1).toString() + " " + names[i];
				if(i == 12)
					t = "Output";
					
				text_path(t);
				fill();
			}
		}
  	}
}

function calcAspect() {
	var width = this.box.rect[2] - this.box.rect[0];
	var height = this.box.rect[3] - this.box.rect[1];
  	return width / height;
}

function add(ind, n)
{
	ind--;	
	names[ind] = n;
	refresh();
}

function del(ind, n)
{
	ind--;
	names[ind] = "-";
	refresh();
}

function clear()
{
	for(var i = 0; i < 12; i++)
		names[i] = "-";
		
	refresh();
}