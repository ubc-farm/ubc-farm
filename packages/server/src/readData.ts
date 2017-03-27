import { basename } from 'path';
import parseData from './utils/parseData';
import walkFolder from './utils/walkFolder';

/**
 * Loads data from the data directory and returns it.
 */
export default async function readData(): Promise<{ [filename: string]: any }> {
	const dataset = await walkFolder('_data', async filepath => {
		const data = await parseData(filepath);
		return { filepath, data };
	});

	return dataset.reduce((obj, { filepath, data }) => {
		obj[basename(filepath)] = data;
		return obj;
	}, {});
}
