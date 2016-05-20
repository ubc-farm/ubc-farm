/** @namespace google.maps */

/**
 * @typedef {Object} google.maps.LatLngLiteral
 * @property {number} lat - latitude in degrees
 * @property {number} lng - longitude in degrees
 * @see https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngLiteral
 */

/**
 * Represents a field
 * @class
 * @param {google.maps.Polygon|google.maps.LatLngLiteral[]} polygon or path
 * @param {string} name of the field
 * @param {Object} [grid]
 * @param {number} [grid.base=0] - ID of the edge the grid aligns to
 * @param {number[]} [grid.widths=[]] - widths for each column
 * @param {number[]} [grid.heights=[]] - heights for each row
 */
function Field(polygon, name, grid) {
	if (Array.isArray(polygon)) {
		this.path = polygon;
	} else {
		this.polygon = polygon;
		polygon.fieldObj = this;
	}
	
	this.name = name || "";
	this.grid_base = grid.base || 0;
	this.grid_widths = grid.widths || [];
	this.grid_heights = grid.heights || [];
}

/** 
 * @type google.maps.PolygonOptions 
 * @static
 */
Field.polygonOptions = {
	editable: true,
	fillOpacity: 0.7,
	fillColor: 'rgb(59, 166, 72)',
	strokeOpacity: 1,
	strokeColor: 'rgb(59, 166, 72)'
}

/**
 * Converts the field's polygon into a path
 * @returns {google.maps.LatLngLiteral[]} 
 */
Field.prototype.toPath = function() {
	var array = [];
	var path = this.polygon.getPath();
	path.forEach(function(latLng) {
		array.push(latLng.toJSON());
	})
	this.path = array;
	return array;
}

/**
 * Converts the field's path into a polygon
 * @param {google.maps.Map} map to attach polygon to
 * @returns {google.maps.Polygon} 
 */
Field.prototype.toPolygon = function(map) {
	var opts = Field.polygonOptions;
	opts.paths = this.path;
	if (map) opts.map = map;
	var polygon = new google.maps.Polygon(opts);
	this.polygon = polygon;
	return polygon;
}

/**
 * Opens the edit panel for this field
 */
Field.prototype.edit = function() {
	
}

/**
 * Send field data to a worker to save it
 */
Field.prototype.save = function() {
	
}

/**
 * Change the base ID of the grid
 * @param {number} base 
 */
Field.prototype.editGridBase = function(base) {
	
}

/**
 * Change the widths/heights specified
 * @param {Object[]} size
 * @param {boolean} size[].isWidth - true for width, false for height
 * @param {number} size[].newLength
 */
Field.prototype.editGridLength = function(lengths) {
	
}

/**
 * Responds to a new polygon drawing creating a field
 * from the polygon and editing it
 * @listens polygonComplete
 * @this google.maps.DrawingManager
 */
Field.onComplete = function(polygon) {
	var f = new Field(polygon);
	f.edit();
}

/**
 * Opens polygon for editing when clicked
 * @listens click
 * @this google.maps.Polygon
 */
Field.onClick = function() {
	this.fieldObj.edit();
}

/**
 * Sets the new base with the edge that was clicked on.
 * Intended to only listen when the user specifies they want
 * to edit the base.
 * @listens click
 * @this google.maps.Polygon
 * @param {google.maps.PolyMouseEvent} e
 * @param {number} e.edge - id of the clicked edge
 */
Field.clickEdge = function(e) {
	if (e.edge) {
		this.fieldObj.editGrid({base: e.edge});
	}
}

/**
 * Update the field's lengths or base when the polygon is edited
 * @listens insert_at
 * @listens remove_at
 * @listens set_at
 * @this google.maps.Polygon
 * @param {number} id - index where node was changed
 * @param {*} [element] - element that was removed/previously here
 */
Field.editAt = function(id, element) {
	
}

/**
 * Updated once map is loaded 
 * @type google.maps.DrawManager
 */
var drawManager = {
	drawingControl: false,
	polygonOptions: Field.polygonOptions
}

/*
# Polygon events:
- polygonComplete (DrawingManager) - when someone finishes drawing a polygon
- insert_at (Polygon.Path) - node inserted
- remove_at (Polygon.Path) - node removed
- set_at (Polygon.Path) - node moved

mouse events contain the edge, path, and vertex clicked
*/

loadMap.promise.then(function() {
	drawManager = new google.maps.drawing.DrawingManager(drawManager);
})