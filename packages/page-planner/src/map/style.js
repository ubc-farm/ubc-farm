import { fieldStyle } from 'ubc-farm-page-fields/src/map/index.js';
import { data } from './map.js';

const { normal } = fieldStyle;

data.setStyle(feature => Object.assign({}, normal, {
	title: feature.getProperty('name'),
}));

export default normal;
