import { createElement, SFC } from 'react';
import { configureStore } from '@ubc-farm/database-utils';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

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
 */
export default function createList(db: PouchDB.Database<any>): SFC<object> {
	const store = configureStore(db, {
		changeFilter(doc) { return !doc._id.startsWith('_design/'); }
	});

	const PouchList: SFC<object> = props =>
		createElement(ConnectedTable, Object.assign({ store, getTdProps }, props));
	return PouchList;
}
