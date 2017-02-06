function navigateToFeaturePage(feature) {
	const id = feature.getId();
	window.location.href = `./info?id=${id}`;
}

export default function watchDblClick(dataLayer) {
	const listener = dataLayer.addListener('dblclick', navigateToFeaturePage);
	return () => listener.remove();
}