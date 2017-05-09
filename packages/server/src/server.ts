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

const PouchDB: PouchDB.Static = <any> Pouch.plugin(find)
	.plugin(transform)
	.defaults({ prefix: './db/' } as any);

/** Opens all the databases */
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
 * Creates and launches a static web server.
 * Files are loaded from the www folder, along with files from other page packages.
 * The returned promise resolves once the server begins listening on the provided
 * port.
 * @param port - port to run the server
 * @param useDB - if false, the database isn't loaded to the `db` path
 */
export default async function server(port = 8080, {
	useDB = true,
} = {}): Promise<express.Application> {
	const packages = await listPagePackages();

	const app = express(); // Create an express server

	// Add the static files from this server package, under the root URL
	app.use(express.static(resolve(__dirname, '../www')));
	for (const { url, paths } of packages) {
		// Add the static files from each page package, under a subURL specified
		// in PageData
		app.use(url, express.static(paths.www));
	}

	// Use pouch-express to load the databases under the '/db' path
	if (useDB) {
		app.use('/db', pouchExpress(PouchDB));
		await getDatabases();
	}

	await new Promise(resolve => app.listen(port, resolve));
	return app;
}
