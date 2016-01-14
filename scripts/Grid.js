//Grid
var Grid = { 
	canvas: null,
	gridWidth: 50,
	lines: [],
	showGrid: true,

	updateGrid: function() {
		if (this.showGrid) {
			this.drawGrid();
		} else {
			this.deleteGrid();
		}
	},

	drawGrid: function() {
		var line;
		// //draw vertical lines
		for (var i = 0; i < Grid.canvas.width; i += Grid.gridWidth) {
			line = new fabric.Line([i, 0, i, Grid.canvas.height], {
				stroke: '#ccc',
				selectable: false
			});
			Grid.lines.push(line);
			Grid.canvas.add(line);
			Grid.canvas.sendToBack(line);
		}

		// //draw horizontal lines
		for (var i = 0; i < Grid.canvas.height; i += Grid.gridWidth) {
			line = new fabric.Line([0, i, Grid.canvas.width, i], {
				stroke: '#ccc',
				selectable: false
			});
			Grid.lines.push(line);
			Grid.canvas.add(line);
			Grid.canvas.sendToBack(line);
		}
	},

	deleteGrid: function() {
		Grid.lines.forEach(function(line) {
			Grid.canvas.remove(line);
		});
	},
};

module.exports = Grid;



