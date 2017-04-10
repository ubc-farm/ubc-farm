import { createElement } from 'react'; /** @jsx createElement */
import { Polygon } from 'react-google-maps';
import { toPosition, restProps } from './utils.js';

export default function FieldPolygon(props) {
	if (!props.location.geometry) return null;
	const paths = props.location.geometry.coordinates
		.map(linearRing => linearRing.map(toPosition));

	return (
		<Polygon
			geodesic
			paths={paths}
			title={props.location.name}
			{...restProps(props, 'location')}
		/>
	);
}
