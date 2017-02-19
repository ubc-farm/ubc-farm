import PouchDB from 'pouchdb';
import { Component, PropTypes, createElement } from 'react';
import invariant from 'invariant';

interface ConnectAllOptions {
	rowKey?: string;
	loadingKey?: string;
	changes?: boolean;
	useMap?: boolean;
	getDisplayName?: (name: string) => string;
	allDocsOptions?: PouchDB.Core.AllDocsWithKeysOptions;
	changesOptions?: PouchDB.Core.AllDocsWithKeysOptions;
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
export default function connectAll(
	transformer = (doc: Object) => doc,
	options: ConnectAllOptions = {}
) {
	const {
		rowKey = 'rows',
		loadingKey = 'loading',
		changes = true,
		useMap = false,
		getDisplayName = name => `PouchConnect(${name})`,
		allDocsOptions = { include_docs: true },
		changesOptions = { include_docs: true, live: true },
	} = typeof transformer === 'function' ? options : transformer;

	invariant(
    typeof rowKey === 'string',
    `rowKey must be a string. Instead received ${JSON.stringify(rowKey)}`,
  );

	const changesOpts = Object.assign({}, changesOptions, { since: 'now' });

	return function wrapWithConnect(WrappedComponent) {
		invariant(
      typeof WrappedComponent === 'function',
      'You must pass a component to the function returned by ' +
      `connectAll. Instead received ${JSON.stringify(WrappedComponent)}`,
    );

		const displayName = getDisplayName(
			WrappedComponent.displayName || WrappedComponent.name || 'Component'
		);

		const propTypes = {
			db: PropTypes.instanceOf(PouchDB).isRequired,
		};

		class ConnectAll extends Component<any, any> {
			db: PouchDB.Static;
			changes: PouchDB.Core.Changes<Object> | null;
			docError: Error | null;

			constructor(props) {
				super(props);

				this.state = {
					[rowKey]: useMap ? new Map() : {},
					[loadingKey]: true,
				};
				this.db = props.db;
				this.changes = null;
				this.docError = null;

				invariant(this.db,
          'Could not find "db" in either the context or props of ' +
          `"${displayName}". Either wrap the root component in a <Provider>, ` +
          `or explicitly pass "db" as a prop to "${displayName}".`
        );

				this.initDatabaseSubscription();
			}

			componentWillReceiveProps(nextProps) {
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
					res.rows.map(row => [row.id, transformer(row.doc, row.id)])
				)
				.then((map) => {
					let rows;
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
							else this.updateRow(res.id, transformer(res.doc));
						})
					);
				}
			}

			removeRow(id) {
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

			updateRow(id, data) {
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

				return createElement(
					WrappedComponent,
					Object.assign({}, this.state, this.props),
				);
			}
		}

		ConnectAll.displayName = displayName;
		ConnectAll.propTypes = propTypes;

		return ConnectAll;
	};
}
