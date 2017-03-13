import parse from 'csv-parse';
import transform from 'stream-transform';
import batch from 'stream-batch';
import PouchDB from './pouch.js';
import createPouchStream from './createPouchStream';
import streamDone from './streamDone.js';

/**
 * Parse a CSV file and saves a PouchDB replication file to the output stream.
 * 'pouchdb-replication-stream' must be loaded as a PouchDB plugin
 * @param {stream.Readable} input
 * @param {stream.Writable} output
 * @param {function} transformer
 * @param {PouchDB} [db]
 * @returns {Promise<void>} resolves when output has been written
 */
export default async function parseCSVFile(input, output, transformer, db) {
	let tempDatabase = false;
	if (!db) {
		db = new PouchDB({
			name: 'csv_temp',
			adapter: 'memory',
		});
		tempDatabase = true;
	}

	if (typeof db.dump !== 'function') {
		throw new TypeError('Database does not have dump function, '
			+ 'use the pouchdb-replication-stream plugin.');
	}

	const parsingStream = input
		.pipe(parse({
			columns: true,
			ltrim: true,
			rtrim: true,
			skip_empty_lines: true,
		}))
		.pipe(transform(transformer))
		.pipe(batch({
			maxWait: 100,
			maxItems: 50,
		}))
		.pipe(createPouchStream(db));

	await streamDone(parsingStream);
	await db.dump(output);
	if (tempDatabase) await db.destroy();
}
