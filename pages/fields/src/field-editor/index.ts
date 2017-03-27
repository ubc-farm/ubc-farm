import { createMap } from '@ubc-farm/map-utils';

import createControls from './controls';
import setMode from './setMode';
import styler from './styler';

export default function setupEditorMap(
	setProperty: (key: string, value: any) => void,
	defaultMode?: symbol,
) {
	const map: google.maps.Map = createMap();
	map.data.setStyle(styler);

	function handleChange(newField: google.maps.Data.Feature | null) {
		if (newField === null) {
			setProperty('geometry', null);
			return;
		}

		newField.toGeoJson((json: GeoJSON.Feature<GeoJSON.Polygon>) =>
			setProperty('geometry', json.geometry));
	}

	const renderControls = createControls(map);
	setMode(defaultMode, { data: map.data, renderControls, handleChange });

	return function rerenderField({ geometry, _id }: {
		geometry?: GeoJSON.Polygon,
		_id: string,
	}) {
		if (!geometry) return;
		map.data.addGeoJson({
			name: 'Feature',
			geometry,
			id: _id,
		});
	};
}
