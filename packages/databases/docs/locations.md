# Interface
```typescript
interface Location {
	_id: string; // `${'field' || 'place'}/${hash}`
	_rev: string;
	name: Index<string>; // name of the location
	geometry?: Object; // GeoJSON geometry object
	location?: Index<number[]|string>; // Either a string describing the
	                                   // location or coordinates.
}

interface Field extends Location {
	name: string; // name of the location
	area?: number; // Only for fields
	crop?: {
		variety: Index<string>; // name/id of the plant
		quantity: number;
	};
}
```
