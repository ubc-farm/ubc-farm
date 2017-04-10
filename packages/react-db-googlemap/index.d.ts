import * as React from 'react';
import { Location, Field } from '@ubc-farm/databases';

interface LocationMarkerBasic {
	location: Location,
	type?: string,
	[P in google.maps.MarkerOptions]: google.maps.MarkerOptions[P],
}

interface LocationMarkerField {
	location: Field,
	type?: 'field',
	[P in google.maps.PolygonOptions]: google.maps.PolygonOptions[P],
}

type LocationMarkerProps = LocationMarkerBasic | LocationMarkerField;

/**
 * Creates either a marker or polygon, depending on the passed in location
 * object. Can override type with the type prop. Other props are passed
 * to the Marker/Polygon
 */
export const LocationMarker: React.ComponentClass<LocationMarkerProps>;
