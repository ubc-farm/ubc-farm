import PouchDB from './pouch.js';
import parseCSVFile from './parseCSVFile.js';

/**
 * Creates the output dump file for the given GTFS file, and resolves once
 * complete. Tries to use 'memory' adapter for PouchDB, which requires a plugin.
 * @param {() => stream.Readable | Promise<stream.Readable>} getInputStream
 * @param {() => stream.Writable | Promise<stream.Writable>} getOutputStream
 * @param {() => stream.Readable | Promise<stream.Readable>} [getOldOutput]
 * @param {Function} [transformer]
 * @returns {Promise<void>}
 */
export default async function createOutputDump(
	getInputStream,
	getOutputStream,
	getOldOutput,
	transformer = doc => doc,
) {
	const db = new PouchDB({ name: 'csv_temp', adapter: 'memory' });

	if (getOldOutput) {
		await db.load(await getOldOutput());
	}

	const [input, output] = await Promise.all([getInputStream(), getOutputStream()]);
	await parseCSVFile(input, output, transformer, db);
	await db.destory();
}
