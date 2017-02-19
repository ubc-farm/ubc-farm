import { getLocation } from '@ubc-farm/databases';
const { InfoWindow, Data } = google.maps;

// on polygon click, open info window at field centroid
export default function createInfoWindow(dataLayer, db) {
	const infoWindow = new InfoWindow();

	if (!(dataLayer instanceof Data)) {
		throw new TypeError('dataLayer is not an instance of google.maps.Data');
	}

	dataLayer.addListener('click', ({ feature }) => {
		feature.toGeoJson((json: GeoJSON.Feature<GeoJSON.Polygon>) => {
			const location: string | [number, number] | null = getLocation({
				location: feature.properties.location,
				geometry: feature.geometry
			});

			if (Array.isArray(location)) {
				const [lng, lat] = location;
				infoWindow.setPosition({ lat, lng });
			}
			infoWindow.open();
		});

		db.get(feature.getId())
			.then(doc => infoWindow.setContent(doc.name));
	});

	return infoWindow;
}
