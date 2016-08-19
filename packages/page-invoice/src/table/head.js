import { connect } from 'react-redux';
import { Head } from 'ubc-farm-table-base';

import {
	columnSelector,
	selectedLengthSelector,
	dataLengthSelector,
} from '../redux/selectors.js';
import { toggleSelectAll } from '../redux/actions.js';

export default connect(
	state => ({
		columns: columnSelector(state),
		selectedLength: selectedLengthSelector(state),
		dataLength: dataLengthSelector(state),
	}),
	dispatch => ({
		onCheckboxChange() { dispatch(toggleSelectAll()); },
	})
)(Head);
