import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import nestedReformed from './nestedReformed.js';

const WorkingDays = ({ bindInput }) => (
	<fieldset>
		<legend>Working Days</legend>
		{moment.weekdays().map((name, day) => (
			<label>
				<input type="checkbox" {...bindInput(`workingDays[${day}]`)} />
				<span>{name}</span>
			</label>
		))}
	</fieldset>
);

WorkingDays.propTypes = {
	model: PropTypes.shape({
		workingDays: PropTypes.arrayOf(PropTypes.bool),
	}).isRequired,
	setModel: PropTypes.func.isRequired,
};

export default nestedReformed(WorkingDays);
