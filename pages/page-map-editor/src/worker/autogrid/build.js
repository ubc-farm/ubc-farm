import { Feature, FeatureCollection } from 'ubc-farm-utils/class/geojson/index.js';
import { read, write } from '../jsts/geojson-parser.js';
import autoGrid from './autogrid.js';

/**
 * Build a field and return its grid
 * @param {GeoJSON.Feature} feature for field
 * @param {Object} feature.id - id of the field, set as cell parent
 * @param {Object} feature.properties.grid - passed to AutoGrid gridOptions
 * @return {FeatureCollection} array of cell polygons
 */
export default function buildGrid(feature) {
	const field = feature.id;
	const polygon = read(feature.geometry);

	const features = [];

	for (const cell of autoGrid(polygon, feature.properties.grid)) {
		if (cell.getGeometryType() !== 'Polygon') continue;

		const geometry = write(cell);
		const properties = {
			isGridCell: true,
			parent: field,
		};
		const cellFeature = new Feature(geometry, properties);

		features.push(cellFeature);
	}

	return new FeatureCollection(features);
}
