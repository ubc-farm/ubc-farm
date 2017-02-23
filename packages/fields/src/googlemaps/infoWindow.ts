import * as PouchDB from 'pouchdb';
import { getLocation } from '@ubc-farm/databases';
const { InfoWindow, Data } = google.maps;

/**
 * on polygon click, open info window at field centroid
 */
export default function createInfoWindow(
	dataLayer: google.maps.Data,
	db: PouchDB.Database<{ name: string }>
) {
	const infoWindow = new InfoWindow();

	if (!(dataLayer instanceof Data)) {
		throw new TypeError('dataLayer is not an instance of google.maps.Data');
	}

	dataLayer.addListener('click', ({ feature }: google.maps.Data.MouseEvent) => {
		feature.toGeoJson((json: GeoJSON.Feature<GeoJSON.Polygon>) => {
			const location: string | [number, number] | null = getLocation({
				location: json.properties && json.properties.location,
				geometry: json.geometry
			});

			if (Array.isArray(location)) {
				const [lng, lat] = location;
				infoWindow.setPosition({ lat, lng });
			}
			infoWindow.open();
		});

		db.get(feature.getId().toString())
			.then(doc => infoWindow.setContent(doc.name));
	});

	return infoWindow;
}
