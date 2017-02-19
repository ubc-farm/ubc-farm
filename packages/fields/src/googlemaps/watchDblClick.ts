function navigateToFeaturePage(feature: google.maps.Data.Feature) {
	const id = feature.getId();
	window.location.href = `./info?id=${id}`;
}

export default function watchDblClick(dataLayer: google.maps.Data) {
	const listener = dataLayer.addListener(
		'dblclick', ({ feature }: google.maps.Data.MouseEvent) => navigateToFeaturePage(feature));
	return () => listener.remove();
}
