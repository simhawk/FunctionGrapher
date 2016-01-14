//ResizeController
var ResizeController = {
	canvas: null,
	grid: null,
	initial: true,
	resize_grid: true,

	resizeCanvas: function() {
		if (ResizeController.canvas) {
			ResizeController.canvas.setHeight($(window).height() - $("header").height()/2);
			ResizeController.canvas.setWidth($(window).width());
			ResizeController.canvas.renderAll();
		}

		if (ResizeController.grid && (ResizeController.resize_grid || ResizeController.initial)) {
			ResizeController.grid.updateGrid();
			ResizeController.initial = false;
		}
	}
};

$(window).on('resize', function() {
	ResizeController.resizeCanvas();
});

module.exports = ResizeController;