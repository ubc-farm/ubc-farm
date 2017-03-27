/* global google */
import { id as randomID } from 'ubc-farm-utils';
import store from '../redux/index.js';
import { activatePolygon, addingMode } from '../redux/actions/index.js';

/**
 * Used by map.data to generate features for newly
 * drawn geometries.
 * @param {google.maps.Data.Geometry} geometry drawn by user
 * @returns {google.maps.Data.Feature} to add to the map
 */
export default function factory(geometry) {
	if (geometry.getType() !== 'Polygon') return undefined;
	store.dispatch(addingMode(false));

	const id = randomID();
	const properties = { isUnsaved: true };

	setTimeout(() => { store.dispatch(activatePolygon(id)); }, 0);
	return new google.maps.Data.Feature({ id, properties, geometry });
}
