//EquarionParser
var EquationParser = (function(){
	var $_functionInput = $("#function-input");
	var functionString = $_functionInput.getAttribute("placeholder") || "z^2"; // if default is not set, then use z^2

	return {
		functionString,
	}
})();


 