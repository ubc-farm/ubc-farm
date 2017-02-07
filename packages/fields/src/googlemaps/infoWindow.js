import db from '../db.js';
import { getLocation } from '../fieldData.js';

const { InfoWindow, Data } = window.google.maps;

// on polygon click, open info window at field centroid
export default function createInfoWindow(dataLayer) {
	const infoWindow = new InfoWindow();

	if (!(dataLayer instanceof Data)) {
		throw new TypeError('dataLayer is not an instance of google.maps.Data');
	}

	dataLayer.addListener('click', ({ feature }) => {
		feature.toGeoJson((json) => {
			const [lng, lat] = getLocation(json);
			infoWindow.setPostion({ lat, lng });
			infoWindow.open();
		});

		db.get(feature.getId())
			.then(doc => infoWindow.setContent(doc.name));
	});

	return infoWindow;
}
