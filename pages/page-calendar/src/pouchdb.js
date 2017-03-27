import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';

PouchDB.plugin(PouchFind);

const db = new PouchDB('event');

export default db;
export const ready = Promise.all([
	db.createIndex({ index: { fields: ['start'] } }),
	db.createIndex({ index: { fields: ['end'] } }),
]);
