# @ubc-farm/map-utils
Functions for working with the Google Maps JavaScript API

## `createMap(style?: MapOptions) => Map`
Creates a Google Map map in the 'googleMap' div. Default styles are applied
unless they are overriden.

## `observeDatabase(db: PouchDB, mapDataLayer: Data, options?: Object) => Promise<EventEmitter>`
Observes a PouchDB database and adds documents from it to the data layer
provided. Live changes are listened to, and the map is updated to reflect it
automatically.

```typescript
interface Options {
	toFeature?: (Object, id) => GeoJSON.Feature;
	allDocsOptions?: Object;
	changeOptions?: Object;
}
```
`toFeature` transforms a document to a GeoJSON Feature that is added to the map.
By default, it looks for a `geometry` and `_id` property and uses them for the
feature's geometry and id fields. Additonal fields are placed inside properties.
This behaviour is also exported as **`defaultToFeature`**.
If null is returned instead of a feature, then the object will be ignored.

The EventEmitter returned listens for changes in the database. Call `.cancel()`
to turn it off.
