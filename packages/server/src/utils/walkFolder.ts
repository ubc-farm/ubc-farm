import { entryStream, EntryInfo } from './denodeify';

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

	return entryStream(
		{ root: folder },
		(info: EntryInfo) => results.push(callback(info)),
	)
	.then(() => Promise.all(results));
}
