import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { getDatabase } from '../redux/people.js';
import { getSortColumn, getSortDirection, setSortColumn } from '../redux/sort.js';
import DirectoryBase from './DirectoryBase.jsx';

export default connect(
	state => ({
		tableData: getDatabase(state),
		headerClassNames: {
			[getSortColumn(state)]: `Directory-Column--sort-${getSortDirection(state)}`,
		},
	}),
	dispatch => ({ onHeaderClick(e) {
		console.log(e.target);
		dispatch(setSortColumn(e.target.name));
	} })
)(DirectoryBase);
