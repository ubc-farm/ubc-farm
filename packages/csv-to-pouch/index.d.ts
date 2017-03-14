/**
 * Creates the output dump file for the given GTFS file, and resolves once
 * complete. Tries to use 'memory' adapter for PouchDB, which requires a plugin.
 */
export default function createOutputDump(
	getInputStream: () => NodeJS.ReadableStream,
	getOutputStream: () => NodeJS.WritableStream,
	getOldOutput?: () => NodeJS.ReadableStream,
	transformer?: (row: object) => object,
): Promise<void>
