import { basename, resolve } from 'path';
import parseData from './utils/parseData';
import walkFolder from './utils/walkFolder';

/**
 * YAML and JSON data files in the data folder represent information that is
 * provided to the handlebars templates. `readData` returns all the data in that
 * folder. The keys of the returned object correspond to the filenames of each
 * file in the data folder.
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
