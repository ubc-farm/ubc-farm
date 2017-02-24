// Type definitions for pouchdb-find v0.10.5
// Project: https://github.com/nolanlawson/pouchdb-find
// Definitions by: Tiger Oakes <https://github.com/NotWoods>

/// <reference types="pouchdb-core" />

declare namespace PouchDB {
	namespace Find {
		type SortOrder = 'asc' | 'desc';

		interface CreateIndexOptions {
			index: {
				fields: string[];
				name?: string;
				ddoc?: string;
				type?: 'json';
			}
		}

		interface CreateIndexResult {
			result: 'created' | 'exists';
		}

		interface Index {
			ddoc: string | null;
			name: string;
			type: string;
			def: {
				fields: { [index: string]: SortOrder }[];
			};
		}

		interface GetIndexesResult {
			indexes: Index[];
		}

		interface Selector {
			$lt?: any;
			$gt?: any;
			$lte?: any;
			$gte?: any;
			$eq?: any;
			$ne?: any;
			$exists?: boolean;
			$type?: 'null' | 'boolean' | 'number' | 'string' | 'array' | 'object';
			$in?: any[];
			$and?: Selector[];
			$nin?: any[];
			$all?: any[];
			$size?: any;
			$or?: Selector[];
			$nor?: Selector[];
			$mod?: number;
			$regex: RegExp;
			$elemMatch: any;
		}

		type Field = { [index: string]: string | Selector };

		interface Request {
			selector: Field | Selector;
			fields?: string[];
			sort?: { [index: string]: SortOrder }[];
			limit?: number;
			skip?: number;
		}
	}

	interface Database<Content extends Core.Encodable> {

		/**
		 * Create an index if it doesn't exist, or do nothing if it already exists.
		 * @param {string[]} index.index.fields is a list of fields to index
		 * @param {string} [index.index.name] name of the index, auto-generated if you don't include it
		 * @param {string} [index.index.ddoc] design document name (i.e the part after `'_design/'`, auto-generated if you don't include it)
		 * @param {string} [index.index.type] only supports `'json'`, and it's also the default
		 */
		createIndex(
			index: Find.CreateIndexOptions
		): Promise<Find.CreateIndexResult>;
		createIndex(
			index: Find.CreateIndexOptions,
			callback: (error: Error | null, result: Find.CreateIndexResult) => void
		): void;

		/**
		 * Get a list of all the indexes you've created.
		 * Also tells you about the special `_all_docs` index,
		 * i.e. the default index on the `_id` field.
		 */
		getIndexes(): Promise<Find.GetIndexesResult>;
		getIndexes(
			callback: (error: Error | null, result: Find.GetIndexesResult) => void
		): void;

		/**
		 * Delete an index and clean up any leftover data on the disk
		 * @param {Index} index Definition of an index to delete. You can pass it in exactly as you received it from the `getIndexes()` API. You cannot delete the built-in `_all_docs` index.
		 */
		deleteIndex(index: Find.Index): Promise<any>;
		deleteIndex(
			index: Find.Index,
			callback: (error: Error | null, result: any) => void
		): void;

		/**
		 * Query the API to find some documents.
		 */
		find(request: Find.Request): Promise<{ docs: Content[] }>;
		find(
			request: Find.Request,
			callback: (error: Error | null, result: { docs: Content[] }) => void
		): void;
	}
}

declare module 'pouchdb-find' {
	const plugin: PouchDB.Plugin;
	export = plugin;
}
