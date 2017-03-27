const base = Object.freeze({
	editable: false,
	fillColor: '#3ba648',
	fillOpacity: 0.5,
	strokeColor: '#3ba648',
});

const editable = Object.assign({}, base, {
	editable: true,
	strokeColor: 'white',
});

const deleted = Object.assign({}, base, {
	fillColor: 'black',
});

export default function styler(feature: google.maps.Data.Feature) {
	if (feature.getProperty('editable')) {
		return editable;
	} else if (feature.getProperty('deleted')) {
		return deleted;
	} else {
		return base;
	}
}
