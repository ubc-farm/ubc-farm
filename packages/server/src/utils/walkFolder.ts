import { readdir, stat } from './fs-awaitable';
import { join } from 'path';

type Resolveable<T> = Promise<T> | T;
type WallCallback<T> = (path: string) => Resolveable<T>;

/**
 * Walks a folder and calls the callback with the path of every file and subfile
 * in the folder. If a value is returned from the callback, and array of all the
 * returned values will be resolved. Filepaths are resolved to be absolute.
 * @param folder
 * @param callback
 */
function walkFolder<T>(
	folder: string,
	resultList: Resolveable<T>[],
	callback: WallCallback<T>,
): Promise<T[]>
function walkFolder<T>(
	folder: string,
	callback: WallCallback<T>,
): Promise<T[]>
async function walkFolder<T>(
	folder: string,
	_resultList: any,
	cb?: WallCallback<T>,
): Promise<T[]> {
	const files = await readdir(folder);
	let resultList: Resolveable<T>[] = cb ? _resultList : [];
	const callback: WallCallback<T> = cb ? cb : _resultList;

	await Promise.all(files.map(async file => {
		const filepath = join(folder, file);
		const stats = await stat(filepath);
		if (stats.isDirectory()) {
			const subfolderResults = await walkFolder(filepath, resultList, callback);
			resultList.push(...subfolderResults);
		} else {
			const result = callback(filepath);
			resultList.push(result);
		}
	}))

	return Promise.all(resultList);
}

export default walkFolder;
