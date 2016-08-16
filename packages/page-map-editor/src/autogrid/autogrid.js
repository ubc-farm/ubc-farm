import {createRectangle, getNextPoints} from './autocell.js';

/**
 * Used to check if polygons are equal
 */
function equivalentPolygons(one, two) {
	return one.equalsExact(two, .00001);
}

/**
 * Using flood-fill algorithm, fill the container with grid rectangles.
 * @param {jsts.geom.Polygon} container - polygon to fill with grid
 * @param {Object} [gridOptions]
 * @param {number} [gridOptions.baseWidth] - width of each cell
 * @param {number} [gridOptions.baseHeight] - height of each cell
 * @param {number} [gridOptions.angle] of the grid
 * @returns {Generator}
 * @yields {jsts.geom.Polygon} grid cell
 * @throws if container isn't a jsts geometry
 */
export default function* AutoGrid(container, gridOptions) {
	if (!('getGeometryType' in container))
		throw TypeError('AutoGrid container must be a JSTS geometry');

	const {baseWidth = 2.0, baseHeight = 2.0, angle} = gridOptions;
	const widths = gridOptions.specificWidths;
	const heights = gridOptions.specificHeights;

	const cells = [], queue = [];
	queue.push({pos: container.getCoordinate(), row: 0, col: 0});

	while (queue.length > 0) {
		const {pos, row, col} = queue.shift();
		const width = widths[row] || baseWidth; 
		const height = heights[col] || baseHeight; 
		const cell = createRectangle({position: pos, width, height, angle});

		if (!cells.some(existing => equivalentPolygons(cell, existing))) {
			if (container.contains(cell)) 
				yield cell;
			else if (container.intersects(cell)) 
				yield cell.intersection(container);
			else 
				continue;

			cells.push(cell);

			const {north, south, east, west} = 
				getNextPoints({polygon: cell, x: width, y: height, angle});

			queue.push({pos: west, row: row -1, col});
			queue.push({pos: east, row: row +1, col});
			queue.push({pos: north, row, col: col +1});
			queue.push({pos: south, row, col: col -1});
		}
	}
}