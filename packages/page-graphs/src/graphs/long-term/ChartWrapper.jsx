import { createElement, PropTypes, Component } from 'react';
import Chart from './Chart.jsx';
/** @jsx createElement */

const db = new PouchDB('long-term');

export default class ChartWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [] };
	}

	loadData(year) {
		return db.allDocs({
			startkey: `${year}-`,
			endkey: `${year}-\uffff`,
			include_docs: true,
		}).then(docs => docs.rows);
	}

	updateState() {
		return loadData(this.props.year)
			.then(data => this.setState({ data }));
	}

	componentDidMount() { updateState(); }
	componentWillReceiveProps(nextProps) {
		if (nextProps.year !== this.props.year) { updateState(); }
	}

	render() { return <Chart {...this.state} />; }
}

ChartWrapper.propTypes = {
	year: PropTypes.number,
};

ChartWrapper.defaultProps = {
	year: new Date().getFullYear(),
};

