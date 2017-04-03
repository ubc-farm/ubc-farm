import { extname } from 'path';
import { safeLoad } from 'js-yaml';
import { readFile } from './denodeify';

/**
 * Loads and parses YAML and JSON files, and returns parsed content.
 * @param path to file
 */
export default async function parseData(path: string): Promise<any> {
	const data = await readFile(path, 'utf8');
	const extension = extname(path);

	switch (extension) {
		case '.yaml': case '.yml':
			return safeLoad(data);
		case '.json':
			return JSON.parse(data);
		default:
			throw new Error(`Invalid extension: ${extension}`);
	}
}
