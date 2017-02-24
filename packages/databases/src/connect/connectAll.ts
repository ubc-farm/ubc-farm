import PouchDB from 'pouchdb';
import { Component, PropTypes, createElement, SFC } from 'react';

interface ConnectAllOptions {
	rowKey?: string;
	loadingKey?: string;
	changes?: boolean;
	useMap?: boolean;
	useArray?: boolean;
	getDisplayName?: (name: string) => string;
	allDocsOptions?: PouchDB.Core.AllDocsOptions;
	changesOptions?: PouchDB.Core.AllDocsOptions;
}

const identity = (doc: any) => doc;

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
 * @param {function} [transformer] a function that transforms a document
 * into a value stored in a prop for the child component. (Object, string) => T
 * @param {Object} [options]
 * @param {string} [options.rowKey=rows]
 * @param {string} [options.loadingKey=loading]
 * @param {boolean} [options.changes=true]
 * @param {boolean} [options.useMap=false]
 * @param {function} [options.getDisplayName] Used to set the component's
 * display name. string => string. Normally wraps the name with `PouchConnect()`.
 * @param {function} [options.allDocsOptions] Options passed to db.allDocs().
 * @param {function} [options.changesOptions] Options passed to db.changes().
 * @returns {function} A higher order component.
 * React.Component => React.Component
 */
export default function connectAll<Content, Value>(
	transformer: (doc: Content | undefined, id: string) => Value | null | undefined,
	options: ConnectAllOptions = {}
) {
	if (typeof transformer !== 'function') {
		if (!options) options = transformer;
		transformer = identity;
	}

	const {
		rowKey = 'rows',
		loadingKey = 'loading',
		changes = true,
		useArray = false,
		useMap = options.useArray || false,
		getDisplayName = (name: string) => `PouchConnect(${name})`,
		allDocsOptions = { include_docs: true },
		changesOptions = { include_docs: true, live: true },
	} = options;

	const changesOpts = Object.assign({}, changesOptions, { since: 'now' });

	return function wrapWithConnect<P extends Object>(WrappedComponent: SFC<P>) {
		const displayName = getDisplayName(
			WrappedComponent.displayName || WrappedComponent.name || 'Component'
		);

		const propTypes = {
			db: PropTypes.instanceOf(PouchDB).isRequired,
		};

		type DBProp = { db: PouchDB.Database<Content> }

		class ConnectAll extends Component<P & DBProp, any> {
			static displayName: string;
			static propTypes: Object;

			db: PouchDB.Database<Content>;
			changes: PouchDB.Core.Changes<Object> | null;
			docError: Error | null;

			constructor(props: P & DBProp) {
				super(props);

				this.state = {
					[rowKey]: useMap ? new Map() : {},
					[loadingKey]: true,
				};
				this.db = props.db;
				this.changes = null;
				this.docError = null;

				this.initDatabaseSubscription();
			}

			componentWillReceiveProps(nextProps: P & DBProp) {
				if (this.db !== nextProps.db) {
					this.db = nextProps.db;
					this.docError = null;
					if (this.changes) this.changes.cancel();
					this.setState({ [loadingKey]: true });
					this.initDatabaseSubscription();
				}
			}

			componentWillUnmount() {
				if (this.changes) this.changes.cancel();
			}

			initDatabaseSubscription() {
				const ready = this.db.allDocs(allDocsOptions).then(res =>
					res.rows.map(row => <[string, Value]> [row.id, transformer(row.doc, row.id)])
				)
				.then((map) => {
					let rows: { [key: string]: Value } | Map<string, Value>;
					if (useMap) rows = new Map(map);
					else {
						rows = {};
						map.forEach(([k, v]) => { rows[k] = v; });
					}

					this.setState({ [rowKey]: rows });
				})
				.catch((err) => { this.docError = err; })
				.then(() => this.setState({ [loadingKey]: false }));

				if (changes) {
					this.changes = this.db.changes(changesOpts).on('change', res =>
						ready.then(() => {
							if (res.deleted) this.removeRow(res.id);
							else this.updateRow(res.id, transformer(res.doc, res.id));
						})
					);
				}
			}

			removeRow(id: string) {
				const rows = this.state[rowKey];
				let newRows;
				if (useMap) {
					newRows = new Map(rows);
					newRows.delete(id);
				} else {
					newRows = Object.assign({}, rows);
					delete newRows[id];
				}

				this.setState({ [rowKey]: newRows });
			}

			updateRow(id: string, data: Value | null | undefined) {
				if (data == null) return;

				const rows = this.state[rowKey];
				let newRows;
				if (useMap) {
					newRows = new Map(rows).set(id, data);
				} else {
					newRows = Object.assign({}, rows);
					newRows[id] = data;
				}

				this.setState({ [rowKey]: newRows });
			}

			render() {
				if (this.docError) throw this.docError;

				const childProps = Object.assign({}, this.state, this.props);
				if (useArray) {
					childProps[rowKey] = [...childProps[rowKey].values()];
				}

				return createElement(WrappedComponent, childProps);
			}
		}

		ConnectAll.displayName = displayName;
		ConnectAll.propTypes = propTypes;

		return ConnectAll;
	};
}
