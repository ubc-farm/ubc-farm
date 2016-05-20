// needs maps

/**
 * @param {google.maps.Map} [map] - assigned to DrawingManager
 * @returns {google.maps.drawing.DrawingManager}
 */
drawManager = function(map) {
	return new google.maps.drawing.DrawingManager({
		drawingControl: false,
		polygonOptions: {
			editable: true,
			fillOpacity: 0.7,
			fillColor: 'rgb(59, 166, 72)',
			strokeOpacity: 1,
			strokeColor: 'rgb(59, 166, 72)',
			map: map
		}
	})
}

/*
# Polygon events:
- polygonComplete (DrawingManager) - when someone finishes drawing a polygon
- insert_at (Polygon.Path) - node inserted
- remove_at (Polygon.Path) - node removed
- set_at (Polygon.Path) - node moved
*/