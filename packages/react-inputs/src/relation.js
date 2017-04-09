import { Component, createElement } from 'react';
import VirtualizedSelect from 'react-virtualized-select';

/**
 * Select component that lets the user select an item from a list of rows in
 * some PouchDB database. The result is returned as the _id of that row.
 */
export default class RelationSelect extends Component {
	static get defaultProps() {
		return {
			nameKey: 'name',
			changes: true,
			multi: false,
		};
	}
	constructor(props) {
		super(props);

		this.state = { options: new Map(), loading: true };
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
			this.setState({ loading: true });
			this.initDatabaseSubscription();
		}
	}

	componentWillUnmount() {
		if (this.changes) this.changes.cancel();
	}

	getNameKey() {
		return this.props.nameKey || 'name';
	}

	initDatabaseSubscription() {
		const ready = this.db.allDocs({ include_docs: true }).then(({ rows }) => {
			const options = rows.reduce(
				(map, { doc }) => map.set(doc._id, doc[this.getNameKey()]),
				new Map(),
			);

			this.setState({ options });
		})
		.catch((err) => { this.docError = err; })
		.then(() => this.setState({ loading: false }));

		if (this.props.changes) {
			this.changes = this.db.changes({
				live: true,
				include_docs: true,
			}).on('change', async (res) => {
				await ready;
				if (res.deleted) {
					this.setState((prevState) => {
						const options = new Map(prevState.options);
						options.delete(res.id);
						return { options };
					});
				} else {
					this.setState(prevState => ({
						options: new Map(prevState.options)
							.set(res.id, res.doc[this.getNameKey()]),
					}));
				}
			});
		}
	}

	render() {
		const options = [];
		this.state.options.forEach((value, label) => options.push({ value, label }));

		return createElement(
			VirtualizedSelect,
			Object.assign(this.props, {
				options,
				isLoading: this.state.loading,
			})
		);
	}
}
