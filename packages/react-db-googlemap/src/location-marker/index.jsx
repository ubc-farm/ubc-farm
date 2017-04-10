import { createElement } from 'react'; /** @jsx createElement */
import { restProps } from './utils.js';
import LocationMarker from './LocationMarker.jsx';
import FieldPolygon from './FieldPolygon.jsx';

function isField({ location: { _id }, type }) {
	if (_id && _id.startsWith('field/')) return true;
	else if (type && type === 'field') return true;
	else return false;
}

export default function DBMarker(props) {
	const childProps = restProps(props, 'type');
	return createElement(
		isField(props) ? FieldPolygon : LocationMarker,
		childProps
	);
}
