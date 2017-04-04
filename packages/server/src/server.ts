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
import listPagePackages from './listPagePackages';

function getDatabases(prefix?: string) {
	return Promise.all([
		getEquipment(prefix),
		getInvoices(prefix),
		getLocations(prefix),
		getLongTerm(prefix),
		getPeople(prefix),
		getPlants(prefix),
		getTaskTypes(prefix),
		getTasks(prefix),
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
		app.use('/db', pouchExpress());
		await getDatabases('./db/');
	}

	await new Promise(resolve => app.listen(port, resolve));
	return app;
}
