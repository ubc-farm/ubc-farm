import { createElement } from 'react'; /** @jsx createElement */
import ReactDOM from 'react-dom';
import { Table } from 'ubc-farm-table-base';
import apiData from './get-api.js';
import columns from './columnlist.js';

export default function Table() {
	return (
		<Provider store={store}>
			<Table />
		</Provider>
	);
}
