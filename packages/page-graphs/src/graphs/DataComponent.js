import { PropTypes, Component } from 'react';

/**
 * Adds lifecycle methods for updating a component based on a
 * year property, which defaults to the current year.
 */
export default class DataComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [] };
	}

	loadData() {}
	handleLoadData(callback) {
		return Promise.resolve(this.loadData())
			.then(data => this.setState({ data }, callback));
	}

	componentDidMount() { this.handleLoadData(); }
}
