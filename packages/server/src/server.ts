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
		app.use(express.static(url, paths.www));
	}

	if (useDB) {
		app.use('/db', pouchExpress());
		await Promise.all([
			getEquipment(),
			getInvoices(),
			getLocations(),
			getLongTerm(),
			getPeople(),
			getPlants(),
			getTaskTypes(),
			getTasks(),
		]);
	}

	await new Promise(resolve => app.listen(port, resolve));
	return app;
}
