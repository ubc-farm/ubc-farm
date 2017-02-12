import { createElement, Component } from 'react'; /** @jsx createElement */
import { chain, omit } from 'lodash';
import LocationSelect from './LocationSelect.jsx';

export default function DBWrapper(...dbs) {
	return class WrappedLocationSelect extends Component {
		constructor(props) {
			super(props);
			this.state = { options: [] };
			this.changes = [];

			for (const db of dbs) {
				db.allDocs({ include_docs: true })
					.then(res => chain(res.rows).keyBy('id').mapValues('doc.name'))
					.then(items => this.setState({
						options: Object.assign({}, this.state.options, items)
					}));

				const changes = db.changes({
					since: 'now',
					include_docs: true,
					live: true,
				}).on('change', ({ id, deleted, doc }) => {
					if (deleted) {
						this.setState({ options: omit(this.state.options, id) });
					} else {
						this.setState({
							options: Object.assign({}, this.state.options, { [id]: doc.name })
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
			return <LocationSelect {...this.props} {...this.state} />;
		}
	};
}
