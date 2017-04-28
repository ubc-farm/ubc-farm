import { Component, createElement } from 'react';

const identity = doc => doc;

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
 * @param {function|any} [transformer] a function that transforms a document
 * into a value stored in a prop for the child component. (object, string) => T
 * @param {any} [options]
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
export default function connectAll(transformer, options) {
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
		getDisplayName = name => `PouchConnect(${name})`,
		allDocsOptions = { include_docs: true },
		changesOptions = { include_docs: true, live: true },
	} = options || {};

	const changesOpts = Object.assign({}, changesOptions, { since: 'now' });

	return function wrapWithConnect(WrappedComponent) {
		const displayName = getDisplayName(
			typeof WrappedComponent === 'string'
				? 'Component'
				: WrappedComponent.displayName || WrappedComponent.name
		);

		class ConnectAll extends Component {
			constructor(props) {
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
				const ready = (async () => {
					try {
						const res = await this.db.allDocs(allDocsOptions);
						const map = res.rows.map(row => [row.id, transformer(row.doc, row.id)]);

						let rows;
						if (useMap) rows = new Map(map);
						else {
							rows = {};
							map.forEach(([k, v]) => { rows[k] = v; });
						}

						this.setState({ [rowKey]: rows });
					} catch (err) {
						this.docError = err;
					}

					this.setState({ [loadingKey]: false });
				})();

				if (changes) {
					this.changes = this.db.changes(changesOpts)
					.on('change', async (res) => {
						await ready;
						if (res.deleted) this.removeRow(res.id);
						else this.updateRow(res.id, transformer(res.doc, res.id));
					});
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

		return ConnectAll;
	};
}
