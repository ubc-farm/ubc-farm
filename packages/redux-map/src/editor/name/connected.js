import { connect } from 'react-redux';
import { setSelectedName } from '../../redux/actions/index.js';
import { selectedTaskObject } from '../../redux/selectors.js';
import LocationSelect from './input.js';

export default connect(
	state => {
		const selected = selectedTaskObject(state);
		return {
			value: selected ? selected.name : '',
			disabled: !selected,
			placeholder: selected ? selected.type : '',
		};
	},
	dispatch => ({
		onChange({ target }) {
			dispatch(setSelectedName(target.value));
		},
	})
)(LocationSelect);
