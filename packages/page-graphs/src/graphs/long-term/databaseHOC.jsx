import { createElement, PropTypes, Component } from 'react';
import PouchDB from 'pouchdb';
import DataComponent from '../DataComponent.js';
/** @jsx createElement */

const db = new PouchDB('long-term');
function loadYearData(year) {
	return db.allDocs({
		startkey: `${year}-`,
		endkey: `${year}-\uffff`,
		include_docs: true,
	}).then(docs => docs.rows);
}

/**
 * Higher Order Component that wraps the given component so that it receives
 * data from the long-term database. Its data will represent a given year.
 * @param {React.Component} component
 * @returns {React.Component}
 */
export default function databaseHOC(component) {
	return class DatabaseComponent extends DataComponent {
		static get propTypes() {
			return { year: PropTypes.number };
		}
		static get defaultProps() {
			return { year: new Date().getFullYear() };
		}

		loadData() {
			return loadYearData(this.props.year);
		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.year !== this.props.year) { this.handleLoadData(); }
		}

		render() { return createElement(component, this.state); }
	}
}
