import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
	locationsList,
	selectedTask,
	taskListSelector,
} from '../../redux/selectors.js';
import { setSelectedLocation } from '../../redux/actions/index.js';

const LocationSelect = ({ value, disabled, onChange, options }) => (
	<select {...{ value, disabled, onChange }}>
		<option value="" disabled />
		{Array.from(options, ([id, { name }]) => (
			<option value={id} key={id}>{name}</option>
		))}
	</select>
);

LocationSelect.propTypes = {
	options: PropTypes.instanceOf(Map),
	value: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};


const selectedTaskObject = createSelector(
	selectedTask,
	taskListSelector,
	(selectedId, list) => list.get(selectedId)
);

export default connect(
	state => {
		const selected = selectedTaskObject(state);
		let value = '';
		let disabled = false;

		if (selected != null) value = selected.locationId;
		else disabled = true;

		return { value, disabled, options: locationsList(state) };
	},
	dispatch => ({
		onChange({ target }) {
			dispatch(setSelectedLocation(target.value));
		},
	})
)(LocationSelect);
