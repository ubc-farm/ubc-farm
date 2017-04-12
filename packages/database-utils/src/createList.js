import { createElement } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import configureStore from './internal-store/configureStore.js';

const ConnectedTable = connect(
	state => ({ data: state.data || [] })
)(ReactTable);

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
 * @param {PouchDB} db
 * @returns {React.SFC<any>}
 */
export default function createList(db) {
	const store = configureStore(db, {
		changeFilter(doc) { return !doc._id.startsWith('_design/'); }
	});

	const PouchList = props =>
		createElement(ConnectedTable, Object.assign({ store, getTdProps }, props));
	return PouchList;
}
