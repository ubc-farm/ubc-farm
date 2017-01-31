import { connect } from 'react-redux';
import { applyGridDataToActive, buildGrid } from '../redux/actions/index.js';
import { activeGridSelector } from '../redux/selectors.js';
import GridForm from './grid-form.js';

export default connect(
	state => ({
		initialValue: activeGridSelector(state),
	}),
	dispatch => ({
		onSubmit(data) {
			dispatch(applyGridDataToActive(data));
			return dispatch(buildGrid());
		},
	})
)(GridForm);
