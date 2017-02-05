import { polygonCentroid } from 'd3-polygon';
import db from '../db.js';

const { InfoWindow, Data } = window.google.maps;

// on polygon click, open info window at field centroid
export default function createInfoWindow(dataLayer) {
	const infoWindow = new InfoWindow();

	if (!(dataLayer instanceof Data)) {
		throw new TypeError('dataLayer is not an instance of google.maps.Data');
	}

	dataLayer.addListener('click', async (feature) => {
		const polygon = feature.getGeometry();

		const [lng, lat] = polygonCentroid(polygon.getAt(0).getArray());
		infoWindow.setPostion({ lat, lng });
		infoWindow.open();

		const { name } = await db.get(feature.getId());
		infoWindow.setContent(name);
	});

	return infoWindow;
}
