import { createElement } from 'react'; /** @jsx createElement */
import { Marker } from 'react-google-maps';
import { getLocation } from '@ubc-farm/databases';
import { toPosition, restProps } from './utils.js';

export default function LocationMarker(props) {
	const position = getLocation(props.location);
	if (!Array.isArray(position)) return null;

	return (
		<Marker
			position={toPosition(position)}
			title={props.location.name}
			{...restProps(props)}
		/>
	);
}
