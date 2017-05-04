import { createElement } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import configureStore from './internal-store/configureStore.js';

/** Wrapper around ReactTable for redux */
const ConnectedTable = connect(
	state => ({ data: state.data || [] })
)(ReactTable);

/**
 * Generates click events for rows in the table
 * @param {any} state
 * @param {{row:{_id: string}}} rowInfo
 * @returns {{onClick: () => void)}}
 */
function getTdProps(state, rowInfo) {
	return {
		onClick() {
			if (!rowInfo) return;
			window.location.href = `./edit?id=${rowInfo.row._id}`;
		}
	};
}

/**
 * Table element to display items from a PouchDB database.
 * @param {PouchDB.Database} db
 * @returns {React.StatelessComponent}
 */
export default function createList(db) {
	const store = configureStore(db, {
		changeFilter(doc) { return !doc._id.startsWith('_design/'); }
	});

	const PouchList = props => createElement(ConnectedTable,
		Object.assign({ store, getTdProps }, props)
	);

	return PouchList;
}
