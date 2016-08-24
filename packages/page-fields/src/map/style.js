/* global google*/

export const color = {
	primary: 'rgb(59, 166, 72)',
	accent: 'rgb(47, 123, 130)',
	gray: '#999',
	light: '#ddd',
};

export const field = {
	normal: {
		fillOpacity: 0.5,
		strokeOpacity: 1,
		fillColor: color.primary,
		strokeColor: color.primary,
		zIndex: 1,
	},
	selected: {
		fillOpacity: 0.1,
	},
	resizable: {
		editable: true,
	},
};

export const map = {
	center: { lat: 49.249568, lng: -123.237155 },
	zoom: 17,
	mapTypeId: google.maps.MapTypeId.SATELLITE,
	fullscreenControl: true,
	scaleControl: true,
	mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
	tilt: 0,
};

export const grid = {
	normal: {
		zIndex: 2,
		fillOpacity: 0.0,
		strokeOpacity: 0.5,
		fillColor: color.gray,
		strokeColor: color.light,
	},
	hover: {
		fillOpacity: 0.4,
	},
	selected: {
		zIndex: 3,
		fillOpacity: 0.5,
		strokeOpacity: 0.9,
		fillColor: color.accent,
		strokeColor: color.accent,
	},
};
