import * as express from 'express';
import * as pouchExpress from 'express-pouchdb';
import { resolve } from 'path';
import * as db from '@ubc-farm/databases';

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
			db.getEquipment(),
			db.getInvoices(),
			db.getLocations(),
			db.getLongTerm(),
			db.getPeople(),
			db.getPlants(),
			db.getTaskTypes(),
			db.getTasks(),
		]);
	}

	await new Promise(resolve => app.listen(port, resolve));
	return app;
}
