import { getLocation, Field } from '@ubc-farm/databases';
const { InfoWindow, Data } = google.maps;

interface FieldFeature extends GeoJSON.Feature<GeoJSON.Polygon> {
	properties: { [K in keyof Field]: Field[K] }
}

/**
 * on polygon click, open info window at field centroid
 */
export default function createInfoWindow(
	dataLayer: google.maps.Data,
	db: PouchDB.Database<Partial<Field>>
) {
	const infoWindow = new InfoWindow();

	if (!(dataLayer instanceof Data)) {
		throw new TypeError('dataLayer is not an instance of google.maps.Data');
	}

	dataLayer.addListener('click', ({ feature }: google.maps.Data.MouseEvent) => {
		feature.toGeoJson((json: FieldFeature) => {
			const location = getLocation({
				location: json.properties && json.properties.location,
				geometry: json.geometry
			});

			if (Array.isArray(location)) {
				const [lng, lat] = location;
				infoWindow.setPosition({ lat, lng });
			}
			infoWindow.open();
		});

		db.get(feature.getId().toString()).then(doc => {
			infoWindow.setContent(doc.name || '');
		});
	});

	return infoWindow;
}
