import PouchDB from 'pouchdb';
import replication from 'pouchdb-replication-stream';
import memory from 'pouchdb-adapter-memory';

export default PouchDB.plugin(replication).plugin(memory);
