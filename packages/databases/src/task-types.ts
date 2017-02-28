/* eslint-disable no-param-reassign,no-use-before-define */
import startCase from 'lodash/startCase';
import PouchDB from './utils/load-pouch';

export interface TaskType {
	_id: string; // Type name
	_rev: string;
	color: string;
}

/**
 * Returns name of task in Start Case
 */
export function taskTypeName(taskType: TaskType | string) {
	const id = typeof taskType === 'string' ? taskType : taskType._id;
	return startCase(id);
}

export default async function getTaskTypes() {
	const db = new PouchDB<TaskType>('task-types');

	const { total_rows } = await db.allDocs({ limit: 0 });
	if (total_rows === 0) await createDefaultTypes(db);

	return db;
}

export function createDefaultTypes(db: PouchDB.Database<TaskType>) {
	return db.bulkDocs(<TaskType[]> [
		{ _id: 'seeding', color: '#33691e' },
		{ _id: 'irrigation', color: '#01579b' },
		{ _id: 'pest-control', color: '#b71c1c' },
		{ _id: 'transplanting', color: '#827717' },
		{ _id: 'soil-sampling', color: '#3e2723' },
		{ _id: 'scouting:-harvest', color: '#311b92' },
		{ _id: 'scouting:-pests', color: '#880e4f' },
		{ _id: 'fertilizing', color: '#275b29' },
	]);
}
