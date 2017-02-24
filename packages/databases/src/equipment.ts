/* eslint-disable no-param-reassign */
import PouchDB from './utils/load-pouch';
import { ID } from './utils/typedefs';

export interface Equipment {
	_id: ID;
	_rev: string;
	name: string;
}

export default async function getEquipment() {
	const db = new PouchDB<Equipment>('equipment');
	await Promise.all([
		db.createIndex({ index: { fields: ['name'] } }),
	]);

	return db;
}
