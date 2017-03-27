export function rebuildGeoJson(feature, newId, newProperties) {
	const newFeature = Object.assign({}, feature, {
		id: newId,
		properties: {},
	});

	Object.assign(newFeature.properties, newProperties);

	return newFeature;
}

/**
 * Recreates a Data.Feature on the given map.data
 * with the desired ID and properties.
 * Features need to be rebuilt to assign IDs to them.
 * @returns {google.maps.Data.Feature}
 */
export default function rebuildMapFeature(mapData, mapFeature, id, props) {
	const properties = {};
	mapFeature.forEachProperty((value, key) => { properties[key] = value; });
	Object.assign(properties, props);

	const newFeature = {
		id,
		properties,
		geometry: mapFeature.getGeometry(),
	};

	mapData.remove(mapFeature);
	return mapData.add(newFeature);
}
