//Grid
var Grid = (function(){
	var canvas = null;
	var gridWidth = 50;
	var lines = [];
	var showGrid = true;

	updateGrid = function() {
		if (this.showGrid) {
			_drawGrid();
		} else {
			_deleteGrid();
		}
	};

	_drawGrid = function() {
		var line;
		// //draw vertical lines
		for (var i = 0; i < Grid.canvas.width; i += Grid.gridWidth) {
			line = new fabric.Line([i, 0, i, Grid.canvas.height], {
				stroke: '#ccc',
				selectable: false
			});
			lines.push(line);
			Grid.canvas.add(line);
			Grid.canvas.sendToBack(line);
		}

		// //draw horizontal lines
		for (var i = 0; i < Grid.canvas.height; i += Grid.gridWidth) {
			line = new fabric.Line([0, i, Grid.canvas.width, i], {
				stroke: '#ccc',
				selectable: false
			});
			lines.push(line);
			Grid.canvas.add(line);
			Grid.canvas.sendToBack(line);
		}
	};


	_deleteGrid = function() {
		lines.forEach(function(line) {
			Grid.canvas.remove(line);
		});
	};

	return {
		canvas,
		gridWidth, 
		showGrid, 
		updateGrid
	}
})();
