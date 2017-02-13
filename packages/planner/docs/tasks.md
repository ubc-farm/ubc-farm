# Interface
```typescript
interface Task {
	_id: string; // `${type}/${location}/${hash}`
	_rev: string;
	type: string; // ID of some type
	location: string; // ID of a location
	name?: string; // name of the task
	start_time: number; // Date as milliseconds
	end_time: number; // Date as milliseconds
}
```
