/** Promisified version of Data.Feature.toGeoJson() */
export default function toGeoJson(feature) {
	return new Promise(resolve => feature.toGeoJson(resolve));
}