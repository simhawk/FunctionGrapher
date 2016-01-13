//Main
(function() {
	var canvas = new fabric.Canvas("my-canvas", {
		selection: false
	});

	//dependencies
	ResizeController.canvas = canvas;
	ResizeController.grid = Grid;
	Grid.canvas = canvas;

	//initialization
	Grid.updateGrid();
	ResizeController.resizeCanvas();
})();