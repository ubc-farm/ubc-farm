import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import transform from 'transform-pouch';

PouchDB.plugin(find);
PouchDB.plugin(transform);
export default PouchDB;
