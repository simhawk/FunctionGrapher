//Input Control
$(document).ready(function() {

	//cache Dom
	var $functionInput = $("#function-input");
	var $gridOn = $('input[name="grid-on"]');


	//Function Input box
	$functionInput.change(function() {
		var new_function = parseInt($functionInput.val()) || "Error";
		EquationParser.functionString = new_function;
	});

	//Switch that turns the grid on/off
	$gridOn.on('switchChange.bootstrapSwitch', function(event, state) {
		Grid.showGrid = state;
		Grid.updateGrid();
	});
	
	$gridOn.bootstrapSwitch();
});