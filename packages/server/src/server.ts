import * as express from 'express';
import { resolve } from 'path';

import listPagePackages from './listPagePackages';

/**
 * Creates and starts the server
 */
export default async function server(port = 8080): Promise<express.Application> {
	const packages = await listPagePackages();

	const app = express();

	app.use(express.static(resolve(__dirname, '../www')));
	for (const { url, paths } of packages) {
		app.use(express.static(`/${url}`, paths.www));
	}

	await new Promise(resolve => app.listen(port, resolve));
	return app;
}
