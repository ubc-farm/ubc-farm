/**
 * Filters the difference between the Grid Cell items
 * and the Polygon Field items.
 */
export function isGridCell(feature) {
	return feature.getProperty('isGridCell') !== undefined;
}

/**
 * Checks if a feature is a Polygon field.
 * Grid Cells have no ID property.
 */
export function isField(feature) {
	return feature.getProperty('isGridCell') === undefined
	&& feature.getId() !== undefined;
}

/**
 * Checks if a feature is newly drawn by checking if it has
 * any properties or an ID
 */
export function isNewlyDrawn(feature) {
	if (feature.getId() !== undefined) return false;
	if (feature.getGeometry().getType() !== 'Polygon') return false;

	let result = true;
	feature.forEachProperty(() => { result = false });
	return result;
}