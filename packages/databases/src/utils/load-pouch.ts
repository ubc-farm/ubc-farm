/// <reference path="../../../custom-types/pouchdb-find/index.d.ts" />
/// <reference path="../../../custom-types/transform-pouch/index.d.ts" />

import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import transform from 'transform-pouch';

export default PouchDB.plugin(find).plugin(transform);
