import { polygonArea, polygonCentroid } from 'd3-polygon';

export function getLocation({ location, geometry }) {
	if (location) return location;
	else if (geometry) return polygonCentroid(geometry.coordinates[0]);
	else return null;
}

export function getLocationString(field) {
	const location = getLocation(field);
	if (typeof location === 'string') return location;
	else if (location === null) return '';

	const [lng, lat] = location.map(n => n.toPrecision(2));
	return `Lat: ${lat}, Long: ${lng}`;
}

export function getArea({ area, geometry }) {
	if (area) return area;
	else if (geometry) return polygonArea(geometry.coordinates[0]) * 0.000247105;
	else return null;
}

export function getAcres(field) {
	const mSquared = getArea(field);

	if (mSquared === null) return '';
	return `${mSquared} ac`
}
