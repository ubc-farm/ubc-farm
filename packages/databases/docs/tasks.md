# Interface
```typescript
type ID = string;
type Date = number; // date as unix timestamp in milliseconds

interface Task {
	_id: ID;
	_rev: string;
	type: Index<ID>; // ID of some type
	location: Index<ID>; // ID of a location
	name?: string; // name of the task
	start?: Index<Date>;
	end?: Index<Date>;
	allDay: boolean;
	done: boolean;
}
```
