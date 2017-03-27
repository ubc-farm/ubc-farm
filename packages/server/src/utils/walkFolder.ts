/**
 * Walks a folder and calls the callback with the path of every file and subfile
 * in the folder. If a value is returned from the callback, and array of all the
 * returned values will be resolved. Filepaths are resolved to be absolute.
 * @param folder
 * @param callback
 */
export default async function walkFolder<T>(
	folder: string, callback: (path: string) => T
): Promise<T[]> {

}
