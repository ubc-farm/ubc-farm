# Interface
```typescript
type ID = string;
type Date = number; // date as unix timestamp in milliseconds

interface Task {
	_id: ID;
	_rev: string;
	type: ID; // ID of some type
	location: ID; // ID of a location
	name?: string; // name of the task
	start?: Date;
	end?: Date;
	allDay: boolean;
	done: boolean;
}
```
