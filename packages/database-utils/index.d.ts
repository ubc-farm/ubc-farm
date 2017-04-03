import * as PouchDB from 'pouchdb';
import * as React from 'react';

interface ConnectAllOptions {
	rowKey?: string;
	loadingKey?: string;
	changes?: boolean;
	useMap?: boolean;
	useArray?: boolean;
	getDisplayName?: (name: string) => string;
	allDocsOptions?: PouchDB.Core.AllDocsWithKeyOptions | PouchDB.Core.AllDocsWithKeysOptions | PouchDB.Core.AllDocsWithinRangeOptions;
	changesOptions?: PouchDB.Core.ChangesOptions;
}

/**
 * Connects a React component to a PouchDB database. Each row from the database
 * is set to the component under the 'rows' prop, or whatever custom rowKey
 * is specified in the options. If options.useMap is set to true, 'rows' will
 * be a Map where the document ID is the key and the transformed document is
 * the value. Otherwise, a plain object is used with the same keys and values.
 * The component must have the 'db' prop and contain some database.
 * By default, include_docs is set to true.
 * The database connection is read only. To edit items in the database, it must
 * be done externally. Changes to the database are automatically reflected in
 * the component.
 *
 * @param transformer a function that transforms a document
 * into a value stored in a prop for the child component. (object, string) => T
 * @param options
 * @param options.rowKey
 * @param options.loadingKey
 * @param options.changes
 * @param options.useMap
 * @param options.getDisplayName Used to set the component's
 * display name. string => string. Normally wraps the name with `PouchConnect()`.
 * @param options.allDocsOptions Options passed to db.allDocs().
 * @param options.changesOptions Options passed to db.changes().
 * @returns A higher order component.
 * React.Component => React.Component
 */
export function connectAll<Content, Value>(
	transformer?: (doc: Content, id: string) => Value | null | undefined,
	options?: ConnectAllOptions
): (WrappedComponent: React.ReactType) => React.ComponentClass<any>
export function connectAll<Content>(
	options?: ConnectAllOptions
): (WrappedComponent: React.ReactType) => React.ComponentClass<any>
