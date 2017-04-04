import * as express from 'express';
import * as pouchExpress from 'express-pouchdb';
import { resolve } from 'path';

import {
	getEquipment,
	getInvoices,
	getLocations,
	getLongTerm,
	getPeople,
	getPlants,
	getTaskTypes,
	getTasks,
} from '@ubc-farm/databases';
import * as Pouch from 'pouchdb';
import * as find from 'pouchdb-find';
import * as transform from 'transform-pouch';

import listPagePackages from './listPagePackages';

const PouchDB: PouchDB.Static = <any> Pouch.plugin(find).plugin(transform)
	.defaults({ prefix: './db/' } as any);
function getDatabases(prefix?: string) {
	return Promise.all([
		getEquipment(prefix, PouchDB),
		getInvoices(prefix, PouchDB),
		getLocations(prefix, PouchDB),
		getLongTerm(prefix, PouchDB),
		getPeople(prefix, PouchDB),
		getPlants(prefix, PouchDB),
		getTaskTypes(prefix, PouchDB),
		getTasks(prefix, PouchDB),
	]);
}

/**
 * Creates and starts the server
 */
export default async function server(port = 8080, {
	useDB = true,
} = {}): Promise<express.Application> {
	const packages = await listPagePackages();

	const app = express();

	app.use(express.static(resolve(__dirname, '../www')));
	for (const { url, paths } of packages) {
		app.use(url, express.static(paths.www));
	}

	if (useDB) {
		app.use('/db', pouchExpress(PouchDB));
		await getDatabases();
	}

	await new Promise(resolve => app.listen(port, resolve));
	return app;
}
