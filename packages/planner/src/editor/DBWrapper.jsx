import { createElement, Component } from 'react'; /** @jsx createElement */
import { chain, omit } from 'lodash';

/**
 * @param {string} key prop key to store database entries in
 * @param {string|function} transformer function called with each row
 * (row, id) => T
 * @param {...PouchDB} dbs pouch databases to connect
 * @returns {function} React.Component => React.Component
 */
export default function DBWrapper(key, transformer, ...dbs) {
	return ReactComponent => class WrappedComponent extends Component {
		constructor(props) {
			super(props);
			this.state = { [key]: {} };
			this.changes = [];

			for (const db of dbs) {
				db.allDocs({ include_docs: true })
					.then(res => chain(res.rows).keyBy('id').mapValues(transformer))
					.then(items => this.setState({
						[key]: Object.assign({}, this.state[key], items)
					}));

				const changes = db.changes({
					since: 'now',
					include_docs: true,
					live: true,
				}).on('change', ({ id, deleted, doc }) => {
					if (deleted) {
						this.setState({ [key]: omit(this.state[key], id) });
					} else {
						this.setState({
							[key]: Object.assign({}, this.state[key], { [id]: doc.name })
						});
					}
				});

				this.changes.push(changes);
			}
		}

		componentWillUnmount() {
			this.changes.forEach(changes => changes.cancel());
		}

		render() {
			return <ReactComponent {...this.props} {...this.state} />;
		}
	};
}
