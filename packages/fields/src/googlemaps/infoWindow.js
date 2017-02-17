const { InfoWindow, Data } = window.google.maps;

// on polygon click, open info window at field centroid
export default function createInfoWindow(dataLayer, db) {
	const infoWindow = new InfoWindow();

	if (!(dataLayer instanceof Data)) {
		throw new TypeError('dataLayer is not an instance of google.maps.Data');
	}

	dataLayer.addListener('click', ({ feature }) => {
		feature.toGeoJson((json) => {
			if (Array.isArray(json.location)) {
				const [lng, lat] = json.location;
				infoWindow.setPostion({ lat, lng });
			}
			infoWindow.open();
		});

		db.get(feature.getId())
			.then(doc => infoWindow.setContent(doc.name));
	});

	return infoWindow;
}
