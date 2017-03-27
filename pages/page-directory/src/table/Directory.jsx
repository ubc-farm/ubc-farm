import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
	dispatch => bindActionCreators({
		onHeaderClick: setSortColumn,
	}, dispatch),
)(DirectoryBase);
