var Grid = require("./Grid");
var GraphControl = require("./GraphControl");

var InputControl = function() {

	//cache Dom
	var $functionInput = $("#function-input");
	var $gridOnButton = $('input[name="grid-on"]');
	var $bezierButton = $("#bezier-button");

	//Function Input box
	$functionInput.change(function() {
		var function_expression = $functionInput.val();
		GraphControl.drawFunction(function_expression);
	});

	//Switch that turns the grid on/off
	$gridOnButton.on('switchChange.bootstrapSwitch', function(event, state) {
		Grid.showGrid = state;
		Grid.updateGrid();
	});

	$gridOnButton.bootstrapSwitch();


	//disable the enter when selecting the box
	$(window).keydown(function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});


};

module.exports = InputControl;