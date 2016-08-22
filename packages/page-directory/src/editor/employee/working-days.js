import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { Field } from 'redux-form';

const WorkingDayItem = ({ input }) => (
	<div className="working-day-container">
		<input
			type="checkbox"
			hidden
			className="working-days-checkbox"
			{...input}
			id={input.name}
		/>
		<label
			className="working-days-button"
			role="checkbox"
			aria-checked={input.checked}
			htmlFor={input.name}
		>
			{input.name.charAt('working_'.length).toUpperCase()}
		</label>
	</div>
);

WorkingDayItem.propTypes = {
	input: PropTypes.object,
};

const WorkingDays = () => (
	<fieldset name="working_days" className="working_days">
		<Field component={WorkingDayItem} name="working_sunday" />
		<Field component={WorkingDayItem} name="working_monday" />
		<Field component={WorkingDayItem} name="working_tuesday" />
		<Field component={WorkingDayItem} name="working_wednesday" />
		<Field component={WorkingDayItem} name="working_thursday" />
		<Field component={WorkingDayItem} name="working_friday" />
		<Field component={WorkingDayItem} name="working_saturday" />
	</fieldset>
);

export default WorkingDays;
