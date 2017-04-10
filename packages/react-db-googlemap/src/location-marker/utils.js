export function toPosition([lng, lat]) {
	return { lat, lng };
}

export function restProps(props, ...toOmit) {
	const copy = Object.assign({}, props);
	delete copy.location;
	for (const key of toOmit) {
		delete copy[key];
	}
	return copy;
}
