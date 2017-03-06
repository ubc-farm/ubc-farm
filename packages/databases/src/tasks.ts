/* eslint-disable no-param-reassign */
import moment from 'moment';
import PouchDB from './utils/load-pouch';
import { ID, Index, DateNum } from './utils/typedefs';

export interface Task {
	_id: ID;
	_rev: string;
	type?: Index<ID>;
	location?: Index<ID>;
	name?: string;
	start?: Index<DateNum>;
	end?: Index<DateNum>;
	allDay?: boolean;
	done?: boolean;
}

export function getTaskStart(task: Task) {
	if (!task.start) return null;

	const start = moment(task.start);
	if (task.allDay) start.startOf('day');

	return start;
}

export function getTaskEnd(task: Task) {
	let end: moment.Moment;
	if (!task.end) {
		if (!task.start) return null;
		end = moment(task.start).add(1, 'hour');
	} else {
		end = moment(task.end);
	}

	if (task.allDay) end.endOf('day');
	return end;
}

export function getTaskRange(task: Task): moment.Moment[] | null {
	const start = getTaskStart(task);
	const end = getTaskEnd(task);
	if (start == null || end == null) return null;

	return [start, end];
}

export default async function getTasks() {
	const db = new PouchDB<Task>('tasks');

	await Promise.all([
		db.createIndex({ index: { fields: ['type'] } }),
		db.createIndex({ index: { fields: ['location'] } }),
		db.createIndex({ index: { fields: ['start'] } }),
		db.createIndex({ index: { fields: ['end'] } }),
	]);

	db.transform({
		incoming(doc: Task): Task {
			doc.allDay = doc.allDay || false;
			doc.done = doc.done || false;

			return doc;
		},
	});

	return db;
}
