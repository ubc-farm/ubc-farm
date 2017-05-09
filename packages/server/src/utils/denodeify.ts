import * as denodeify from 'denodeify';

import {
	readFile,
	writeFile,
	Stats,
} from 'fs';
import * as entryStream from 'readdirp';
import * as resolve from 'resolve';

/**
 * Functions in this module use promises rather than callbacks.
 */

type FileDescriptor = string | Buffer | number;

interface ReadFile {
	(file: FileDescriptor, encoding?: null): Promise<Buffer>
	(file: FileDescriptor, encoding: string): Promise<string>
}

/** Promise-returning version of `fs.readFile` */
const readFileAsync = denodeify(readFile) as ReadFile;

interface WriteFile {
	(file: FileDescriptor, data: string, encoding?: string | null): Promise<void>
	(file: FileDescriptor, data: Buffer | Uint8Array): Promise<void>
}

/** Promise-returning version of `fs.writeFile` */
const writeFileAsync = denodeify(writeFile) as WriteFile;

export interface EntryInfo {
	parentDir: string,
	fullParentDir: string,
	name: string,
	path: string,
	fullPath: string,
	stat: Stats,
}

type Filter = string | string[] | ((entryInfo: EntryInfo) => boolean);

/**
 * Promise-returning version of `require('readdirp')`
 * @param fileProcessed called when a file is found
 */
const entryStreamAsync = denodeify(entryStream) as (
	options: {
		root?: string,
		fileFilter?: Filter,
		directoryFilter?: Filter,
		depth?: number,
		entryType?: 'files' | 'directories' | 'both' | 'all',
		lstat?: boolean,
	},
	fileProcessed: (entryInfo: EntryInfo) => void,
) => Promise<EntryInfo[]>;

/** Promise-returning version of `require('resolve')` */
const resolveAsync = denodeify(resolve) as (id: string, opts?: {
	basedir?: string,
	package?: any,
	extensions?: string[],
	readFile?: Function,
	isFile?: (file: string, cb: (err, is: boolean) => void) => void,
	packageFilter?: (pkg: any) => any,
	pathFilter?: (pkg: any, path: string, relativePath: string) => string,
	paths?: string[],
	moduleDirectory?: string | string[],
}) => Promise<string>;

export {
	readFileAsync as readFile,
	writeFileAsync as writeFile,
	entryStreamAsync as entryStream,
	resolveAsync as resolve,
}
