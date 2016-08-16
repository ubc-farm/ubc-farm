import store from '../redux/index.js';

import './get-api.js';
import connect from './connector.js';
import {field} from './style.js';

export function defaultStyler(map) {
	const selectedStyle = Object.assign({}, field.normal, field.selected);
	map.data.setStyle(feature => {
		if (feature.getProperty('activeField')) return selectedStyle;
		else return field.normal;
	});
}

export default function defaultConnector(map) {
	connect(map.data, store);
	defaultStyler(map)	
}