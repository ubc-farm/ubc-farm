// Type definitions for transform-pouch v1.1.3
// Project: https://github.com/nolanlawson/transform-pouch
// Definitions by: Tiger Oakes <https://github.com/NotWoods>

/// <reference types="pouchdb-core" />

declare namespace PouchDB {
	interface Database<Content extends Core.Encodable> {
		/**
		 * Apply a *transform function* to documents before and after they
		 * are stored in the database. These functions are triggered invisibly
		 * for every `get()`, `put()`, `post()`, `bulkDocs()`, `allDocs()`,
		 * `changes()`, and also to documents added via replication.
		 */
		transform<StoredContent extends Core.Encodable>(transformers: {
			incoming?: (doc: Content) => StoredContent | Promise<StoredContent>,
			outgoing?: (doc: StoredContent) => Content | Promise<Content>,
		}): void
	}
}

declare module 'transform-pouch' {
	const plugin: PouchDB.Plugin;
	export = plugin;
}
