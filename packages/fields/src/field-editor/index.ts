import { createMap } from '@ubc-farm/map-utils';

import createControls from './controls.tsx';
import setMode from './setMode.js';
import styler from './styler.ts';

export default function setupEditorMap(
	setProperty: (key: string, value: any) => void,
	defaultMode: symbol,
) {
	const map: google.maps.Map = createMap();
	map.data.setStyle(styler);

	function handleChange(newField: google.maps.Data.Feature) {
		if (newField === null) {
			setProperty('geometry', null);
			return;
		}

		newField.toGeoJson(json => setProperty('geometry', json.geometry));
	}

	const renderControls = createControls(map);
	setMode(defaultMode, { data: map.data, renderControls, handleChange });

	return function rerenderField({ geometry, _id }: { geometry: GeoJSON.DirectGeometryObject, _id: string }) {
		map.data.addGeoJson({
			name: 'Feature',
			geometry,
			id: _id,
		});
	};
}
