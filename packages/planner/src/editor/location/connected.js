import { connect } from 'react-redux';
import { setSelectedLocation } from '../../redux/actions/index.js';
import { selectedTaskObject, locationsList } from '../../redux/selectors.js';
import LocationSelect from './select.js';

export default connect(
	state => {
		const selected = selectedTaskObject(state);
		return {
			value: selected ? selected.locationId : '',
			disabled: !selected,
			options: locationsList(state),
		};
	},
	dispatch => ({
		onChange({ target }) {
			dispatch(setSelectedLocation(target.value));
		},
	})
)(LocationSelect);
