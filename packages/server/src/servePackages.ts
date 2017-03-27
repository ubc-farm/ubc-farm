import express from 'express';
import { resolve } from 'path';
import listPackages from './listPackages';

export default async function serveStatic(app: express): Promise<void> {
	const packageListPromise = listPackages();
	const mainWWW = resolve(__dirname, '../www');
	app.use(express.static(mainWWW));

	const packages = await packageListPromise;
	for (const [packageName, path] of packages) {
		app.use(`/${packageName}`, express.static(path));
	}
}
