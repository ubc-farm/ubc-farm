# Interface
```typescript
type Date = number; // date as unix timestamp in milliseconds

interface Sale {
	item: string;
	description: string; // empty string by default
	unitCost: number; // stored as cents
	quantity: number;
}

interface Invoice {
	_id: number; // invoice #
	_rev: string;
	isPurchase: boolean; // if true, the invoice represents something the farm
	                     // bought instead of something the farm sold. false by default.
	date: Date;
	items: Sale[];
	channel: string;
	notes: string; // empty string by default
}
```
