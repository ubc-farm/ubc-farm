import { connect } from 'react-redux';
import { setSelectedLocation } from '../../redux/actions/index.js';
import getOptions from './options.js';
import getInput from './task.js';
import LocationSelect from './select.js';

export default connect(
	state => Object.assign({ options: getOptions(state) }, getInput(state)),
	dispatch => ({
		onChange({ target }) {
			dispatch(setSelectedLocation(target.value));
		},
	})
)(LocationSelect);
