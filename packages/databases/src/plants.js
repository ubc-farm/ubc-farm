/* eslint-disable no-param-reassign */
import PouchDB from './utils/load-pouch.js';

export const db = new PouchDB('plants');
export default Promise.all([
	db.createIndex({ index: { fields: ['name'] } }),
]).then(() => db);
