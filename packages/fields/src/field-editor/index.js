import { createMap } from '@ubc-farm/map-utils';

import createControls from './controls.jsx';
import setMode from './setMode.js';
import styler from './styler.js';

export default function setupEditorMap(setProperty, defaultMode) {
	const map = createMap();
	map.data.setStyle(styler);

	function handleChange(newField) {
		if (newField === null) {
			setProperty('geometry', null);
			return;
		}

		newField.toGeoJson(json => setProperty('geometry', json.geometry));
	}

	const renderControls = createControls(map);
	setMode(defaultMode, { data: map.data, renderControls, handleChange });

	return function rerenderField({ geometry, _id }) {
		map.data.addGeoJson({
			name: 'Feature',
			geometry,
			id: _id,
		});
	};
}
