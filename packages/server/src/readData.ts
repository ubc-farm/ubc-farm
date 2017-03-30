import { basename, resolve } from 'path';
import parseData from './utils/parseData';
import walkFolder from './utils/walkFolder';

/**
 * Loads data from the data directory and returns it.
 */
export default async function readData(): Promise<{ [filename: string]: any }> {
	const result: { [filename: string]: any } = {};

	await walkFolder(
		resolve(__dirname, '../data'),
		async entryInfo => {
			const data = await parseData(entryInfo.fullParentDir);
			result[basename(entryInfo.name)] = data;
		}
	);

	return result;
}
