import { operation } from 'jsts';
import { Feature } from 'ubc-farm-utils/class/geojson/index.js';
import { read, write } from '../jsts/geojson-parser.js';
import getCommonParent from './common-parent.js';

const { union: { CascadedPolygonUnion } } = operation;

/**
 * Unites all the given polygons into a large polygon
 * @param {GeoJSON.Polygon[]} cells - array of cells
 * @returns {GeoJSON.Feature} the resulting polygon
 */
export default function mergeCells(cells) {
	const parentObserver = getCommonParent();

	const polygons = [];
	for (const cell of cells) {
		polygons.push(read(cell));

		parentObserver.next(cell.properties.parent);
	}

	const merged = CascadedPolygonUnion.union(polygons);
	const geometry = write(merged);

	const commonParent = parentObserver.return().value;

	return new Feature(geometry, { parent: commonParent });
}
