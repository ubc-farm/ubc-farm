# Interface
```typescript
type Date = number; // date as unix timestamp in milliseconds

interface Sale {
	item: string;
	description: string;
	unitCost: number; // stored as cents
	quantity: number;
}

interface Invoice {
	_id: number; // invoice #
	_rev: string;
	date: Date;
	items: Sale[];
	channel: string;
	notes: string;
}
```
