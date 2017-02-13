# Interface
```typescript
interface Location {
	_id: string; // `${'field' || 'place'}/${hash}`
	_rev: string;
	name?: string; // name of the location
	geometry?: Object; // GeoJSON geometry object
	location?: number[]|string; // Either a string describing the location or coordinates.
	area?: number; // Only for fields
}
```
