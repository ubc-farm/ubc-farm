# Interface
```typescript
interface Plant {
	_id: string; // latin name of the plant
	_rev: string;
	name?: Index<string>; // common name of the plant
	calories?: number;
}
```
