import * as entryStream from 'readdirp';
import { Stats } from 'fs';

export interface EntryInfo {
	parentDir: string,
	fullParentDir: string,
	name: string,
	path: string,
	fullPath: string,
	stat: Stats
}

type Resolveable<T> = Promise<T> | T;
type WallCallback<T> = (entry: EntryInfo) => Resolveable<T>;

/**
 * Walks a folder and calls the callback with the path of every file and subfile
 * in the folder. If a value is returned from the callback, and array of all the
 * returned values will be resolved. Filepaths are resolved to be absolute.
 * @param folder
 * @param callback
 */
export default function walkFolder<T>(
	folder: string,
	callback: WallCallback<T>,
): Promise<T[]> {
	let results: Resolveable<T>[];

	return new Promise((resolve, reject) => entryStream(
		{ root: folder },
		(info: EntryInfo) => results.push(callback(info)),
		(err) => {
			if (err) reject(err);
			else resolve();
		},
	))
	.then(() => Promise.all(results));
}
