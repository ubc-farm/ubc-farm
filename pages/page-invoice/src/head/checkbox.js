import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import Checkbox from 'ubc-farm-inputs/checkbox.js';

import { selectedLength, allSelected } from '../redux/selectors.js';
import { toggleSelectAll } from '../redux/actions/index.js';

const HeaderCheckbox = props => (
	<th className="align-center">
		<Checkbox {...props} />
	</th>
);

export default connect(
	state => ({
		checked: allSelected(state),
		indeterminate: !allSelected(state) && selectedLength(state) > 0,
	}),
	dispatch => ({
		onChange() { dispatch(toggleSelectAll());	},
	})
)(HeaderCheckbox);
