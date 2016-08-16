import store from '../redux/index.js';

import './get-api.js';
import connect from './connector.js';
import {field} from './style.js';

export function defaultStyler(mapData) {
	const selectedStyle = Object.assign({}, field.normal, field.selected);
	mapData.setStyle(feature => {
		if (feature.getProperty('activeField')) return selectedStyle;
		else return field.normal;
	});
}

export default function defaultConnector(mapData) {
	connect(mapData, store);
	defaultStyler(mapData);
}