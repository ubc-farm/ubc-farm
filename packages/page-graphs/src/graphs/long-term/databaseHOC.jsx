import { createElement, PropTypes, Component } from 'react';
/** @jsx createElement */

const db = new PouchDB('long-term');
function loadYearData(year) {
	return db.allDocs({
		startkey: `${year}-`,
		endkey: `${year}-\uffff`,
		include_docs: true,
	}).then(docs => docs.rows);
}

function updateState() {
	return loadData(this.props.year)
		.then(data => this.setState({ data }));
}

/**
 * Higher Order Component that wraps the given component so that it receives
 * data from the long-term database. Its data will represent a given year.
 * @param {React.Component} component
 * @returns {React.Component}
 */
export default function databaseHOC(component) {
	return class DatabaseComponent extends Component {
		static get propTypes() {
			return { year: PropTypes.number };
		}
		static get defaultProps() {
			return { year: new Date().getFullYear() };
		}

		constructor(props) {
			super(props);
			this.state = { data: [] };
		}

		componentDidMount() { updateState.call(this); }
		componentWillReceiveProps(nextProps) {
			if (nextProps.year !== this.props.year) { updateState.call(this); }
		}

		render() { return createElement(component, this.state); }
	}
}
