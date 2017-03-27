import { computeOffset as offset } from 'spherical-geometry-js';
import { geom, algorithm } from 'jsts';
import factory from '../jsts/factory.js';

const {Coordinate} = geom;
const {Angle: {toDegrees, toRadians, normalize, PI_OVER_2}} = algorithm;

export function getPerpendicularAngle(angle) {
	const perpendicularRadians = toRadians(angle) - (PI_OVER_2 * -1) ;
	return toDegrees(normalize(perpendicularRadians));
}

/**
 * Builds a rectanglular polygon clockwise from the properties given
 * @param {Coordinate} options.position - the bottom left corner 
 * of the rectangle
 * @param {number} options.width - width of the rectangle
 * @param {number} options.height - height of the rectangle
 * @param {number} options.angle - angle between left and right corners
 * of the rectangle.
 * @returns {Polygon} the new rectangle
 */
export function createRectangle({
	position, width = 2, height = 2, angle = 0,
}) {
	const perpendicularAngle = getPerpendicularAngle(angle);

	const bottomLeft = {x: position.x, y: position.y};
	const topLeft = offset(bottomLeft, height, perpendicularAngle);
	const topRight = offset(topLeft, width, angle);
	const bottomRight = offset(topRight, height, (perpendicularAngle + 180) % 360)
	
	const path = [bottomLeft, topLeft, topRight, bottomRight, bottomLeft]
		.map(({x, y}) => new Coordinate(x, y))
	const line = factory.createLinearRing(path);

	return factory.createPolygon(line);
}

/**
 * Returns an object containing north, south, east, and west coordinates
 * offset from the rectangle. Expects a clockwise simple rectangle.
 */
export function getNextPoints({ polygon, x = 2, y = 2, angle = 0 }) {
	const perpendicular = getPerpendicularAngle(angle);
	const [start, northPoint, , westPoint] = polygon.getCoordinates();
	const startPosition = {x: start.x, y: start.y};

	const eastPosition = offset(startPosition, x, (angle + 180) % 360);
	const southPosition = offset(startPosition, y, (perpendicular + 180) % 360);

	const eastPoint = new Coordinate(eastPosition.x, eastPosition.y);
	const southPoint = new Coordinate(southPosition.x, southPosition.y);

	return {
		north: northPoint,
		south: southPoint,
		east: eastPoint,
		west: westPoint
	};
} 