# Interface
```typescript
type DateString = string; // Y-MM-DD string representing date
type Cents = number; // money represented as cents

interface LongTermEntry {
	_id: DateString;
	_rev: string;
	numEmployed: number;
	waterUsed: number; // in liters
	revenue: Cents;
	expenses: Cents;
}
```
