(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CanvasControl = function(canvas){

	canvas.on("mouse:move", function(event) {
		//console.log("x" + event.e.x);
		//console.log("y" + event.e.y);
	});
}

module.exports = CanvasControl;



},{}],2:[function(require,module,exports){
var GraphControl = {

	canvas: null,
	zoom: 1,
	xMin: -10,
	xMax: 10,
	yMin: -10,
	yMax: 10,
	numXPoints: 100,
	lines: [], //need this as global for deleting

	drawFunction: function(funcExpression) {

		//reomve previously drawn graph
		this.deleteGraph();

		var scope = {
			x: this.xMin
		};

		var points = [];

		for (var i = 0; i < this.numXPoints; i++) {

			var xGraph = i * (this.xMax - this.xMin) / this.numXPoints + this.xMin;
			scope.x = xGraph;

			var yGraph = math.eval(funcExpression, scope); // there was an error here

			//if the output is not outside of the canvas border
			if (yGraph > this.yMin && yGraph < this.yMax) {
				var point = this.convertCoorToPixels(xGraph, yGraph);
				points.push(point);
			}
			console.log("calc" + i);
		}

		for (var i = 1; i < points.length; i++) {
			var point = points[i];
			var prevPoint = points[i - 1];
			console.log(i);
			var line = new fabric.Line([prevPoint.pixelX, prevPoint.pixelY, point.pixelX, point.pixelY], {
				stroke: "#ccc",
				strokeWidth: 5,
				selectable: false
			});
			this.lines.push(line);
			this.canvas.add(line);
		}

	},

	deleteGraph: function() {
		this.lines.forEach(function(line) {
			GraphControl.canvas.remove(line);
		});
	},

	convertCoorToPixels: function(coorx, coory) {
		var width = GraphControl.canvas.width;
		var height = GraphControl.canvas.height;

		var pixelX = (coorx - this.xMin) / (this.xMax - this.xMin) * width;
		var pixelY = height - (coory - this.yMin) / (this.yMax - this.yMin) * height;

		return {
			pixelX,
			pixelY
		}
	}

};

module.exports = GraphControl;


/*
// Wait for the DOM to be ready using jQuery.
// This also ensures our variables do not pollute the global namespace,
// but rather are visible only within the function passed into jQuery here.
$(function (){

  // Get the 'canvas' DOM element based on its id using jQuery.
  var canvas = $('#myCanvas')[0],

      // Get the canvas context, which is a namespace for the Canvas API 
      // functions for drawing graphics. For Canvas API documentation see
      // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
      c = canvas.getContext('2d'),
      
      // 'n' is the number of discrete points used to approximate the 
      // continuous math curve defined by the math expression.
      n = 100,
      
      // Define the math "window", which is the visible region in 
      // "math coordinates" that gets projected onto the Canvas.
      xMin = -10,
      xMax = 10,
      yMin = -10,
      yMax = 10,
      
      // Initialize the Math.js library
      // see http://mathjs.org/
      math = mathjs(),

      // 'expr' will contain the math expression as a string.
      expr = '',

      // 'defaultExpr' is assigned to 'expr' if there is no expression in the 
      // URL hash when the page is loaded. Otherwise the URL hash value is 
      // assigned to 'expr' on page load.
      defaultExpr = 'sin(x+t)*x',

      // 'scope' defines the variables available inside the math expression.
      scope = {
        x: 0,
        t: 0
      },

      // 'tree' contains the parsed math expression as an abstract syntax tree.
      // see http://en.wikipedia.org/wiki/Abstract_syntax_tree
      tree,

      // Define a 'time' value that gets incremented every frame.
      // This is assigned to the 't' variable in the math expression scope.
      time = 0,
      timeIncrement = 0.1;

  // These are the main steps of the program.
  setExprFromHash();
  initTextField();
  startAnimation();

  // Update the math expression when the URL hash changes. This may occur from
  // use of back and forward buttons or by manually changing the URL hash.
  window.addEventListener('hashchange', setExprFromHash);

  // Sets the math expression from the URL hash value.
  // Uses the default expression if there is no URL hash value.
  function setExprFromHash(){

    var hash = getHashValue();
    if(hash){
      setExpr(hash);
    } else {
      setExpr(defaultExpr);
      setHashValue(expr);
    }

    // Update the text input to contain the updated expression.
    $('#inputField').val(expr);
  }

  // Sets the value of 'expr' and re-parses the expression into 'tree'.
  function setExpr(newExpr){
    expr = newExpr;
    tree = math.parse(expr, scope);
  }

  // Initializes the text field value to contain the expression.
  // Also sets up an event listener to track changes to the text.
  function initTextField(){

    // Get a jQuery selection for the input field.
    var input = $('#inputField');

    // Set the initial text value from the math expression.
    input.val(expr);
    
    // Listen for changes using jQuery.
    input.keyup(function (event) {
      setExpr(input.val());
      setHashValue(expr);
    });
  }

  // Kick off an animation loop that re-renders the plot
  // 60 times each second using requestAnimationFrame.
  // See http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  function startAnimation(){
    (function animloop(){
      requestAnimationFrame(animloop);
      render();
    }());
  }

  // This function is called each animation frame.
  function render(){
    // increment time
    time += timeIncrement;
    
    // redraw
    drawCurve();
  }

  // Plots the math expression curve on the canvas.
  function drawCurve(){
    // These variables are used inside the for loop.
    var i, 
        
        // These vary between xMin and xMax
        //                and yMin and yMax.
        xPixel, yPixel,
        
        // These vary between 0 and 1.
        percentX, percentY,
        
        // These are values in math coordinates.
        mathX, mathY;
    
    // Clear the canvas.
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    // Plot the math expression as a curve using the Canvas API:
    
    // This line of code begins the math curve path definition.
    c.beginPath();

    // 'n' is the number of points used to define the curve, which 
    // consists of (n - 1) straight line segments.
    for(i = 0; i < n; i++) {

      // 'i' varies between 0 and n - 1.
      // 'percentX' varies between 0 and 1.
      percentX = i / (n - 1);

      // 'mathX' varies between 'xMin' and 'xMax'.
      mathX = percentX * (xMax - xMin) + xMin;
     
      mathY = evaluateMathExpr(mathX);
      
      // Project 'mathY' from the interval ['yMin', 'yMax']
      // to the interval [0, 1].
      percentY = (mathY - yMin) / (yMax - yMin);
      
      // Flip Y to match canvas coordinates.
      percentY = 1 - percentY;
      
      // Project percentX and percentY to pixel coordinates.
      xPixel = percentX * canvas.width;
      yPixel = percentY * canvas.height;

      // The first time this line of code is run, it defines the first point
      // in the path, acting exactly like 'c.moveTo(xPixel, yPixel);'
      // Subsequently, this line of code adds a line segment to the curve path
      // between the previous and current points.
      c.lineTo(xPixel, yPixel);
    }
    // This line of code renders the curve path defined by the 'c.lineTo' calls
    // by filling it in with a single-pixel-wide outline, called a 'stroke'.
    c.stroke();
  }

  // Evaluates the current math expression based on the given 
  // values for 'mathX' and 'time' ('time' is global).
  // Returns a Y coordinate in math space.
  function evaluateMathExpr(mathX){

    // Set values on the scope visible inside the math expression.
    scope.x = mathX;
    scope.t = time;

    // Evaluate the previously parsed math expression with the
    // new values for 'x' and 't' and return it.
    return tree.eval();
  }


  // Gets the fragment identifier value.
  function getHashValue(){
    return location.hash.substr(1);
  }

  // Sets the fragment identifier value.
  function setHashValue(value){
    return location.hash = value;
  }
});

*/
},{}],3:[function(require,module,exports){
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




},{}],4:[function(require,module,exports){
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
},{"./GraphControl":2,"./Grid":3}],5:[function(require,module,exports){

var InputControl = require("./InputControl");
var Grid = require("./Grid");
var ResizeControl = require("./ResizeControl");
var CanvasControl = require("./CanvasControl");
var GraphControl = require("./GraphControl");

//Main
var canvas = new fabric.Canvas("my-canvas", {
	selection: false
});

fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

//dependencies
ResizeControl.canvas = canvas;
Grid.canvas = canvas;
GraphControl.canvas = canvas;
ResizeControl.grid = Grid;


CanvasControl(canvas);
InputControl();

//initialization
Grid.updateGrid();
ResizeControl.resizeCanvas();
GraphControl.drawFunction($("#function-input").attr("placeholder"));

},{"./CanvasControl":1,"./GraphControl":2,"./Grid":3,"./InputControl":4,"./ResizeControl":6}],6:[function(require,module,exports){
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
},{}]},{},[5]);
