const { MapTypeId, MapTypeControlStyle } = window.google.maps;

export default {
	defaultCenter: { lat: 49.249568, lng: -123.237155 },
	defaultZoom: 17,
	mapTypeId: MapTypeId.SATELLITE,
	fullscreenControl: true,
	scaleControl: true,
	mapTypeControlOptions: {
		style: MapTypeControlStyle.DROPDOWN_MENU,
	},
	tilt: 0,
};
