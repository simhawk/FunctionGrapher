
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
