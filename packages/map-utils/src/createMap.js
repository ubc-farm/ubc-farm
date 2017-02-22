const { Map, MapTypeId, MapTypeControlStyle } = window.google.maps;

const defaultStyle = {
	center: { lat: 49.249568, lng: -123.237155 },
	zoom: 17,
	mapTypeId: MapTypeId.SATELLITE,
	fullscreenControl: true,
	scaleControl: true,
	mapTypeControlOptions: {
		style: MapTypeControlStyle.DROPDOWN_MENU,
	},
	tilt: 0,
};

/**
 * Creates a map on the #googleMap element
 */
export default function createMap(style = defaultStyle) {
	return new Map(document.getElementById('googleMap'), style);
}
