/// <reference types="googlemaps" />

import * as PouchDB from 'pouchdb';

/**
 * Creates a map on the #googleMap element
 */
export function createMap(style?: google.maps.MapOptions): google.maps.Map;

/**
 * Observes a PouchDB database and adds any new documents to the Google Map
 * data layer, or deleted them if removed.
 */
export function observeDatabase<T extends PouchDB.Core.Encodable>(
	db: PouchDB.Database<T>,
	mapDataLayer: google.maps.Data,
	options?: {
		toFeature?: (doc: T) => GeoJSON.Feature<any>,
		allDocsOptions?: PouchDB.Core.AllDocsOptions,
		changeOptions?: PouchDB.Core.ChangesOptions,
	}
): Promise<PouchDB.Core.Changes<T>>

export function defaultToFeature<T extends GeoJSON.GeometryObject>(
	doc: { _id: string, geometry: T }
): GeoJSON.Feature<T>;
