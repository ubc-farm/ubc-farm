import {createElement as h} from 'react'; /** @jsx h */
import {Field, propTypes} from 'redux-form';

const WorkingDayItem = ({input}) => (
	<div>
		<input type='checkbox' hidden
			{...input} id={input.name}
		/>
		<label className='working-days-button'
			aria-role='checkbox'
			aria-checked={input.checked}
			htmlFor={input.name}
		>
			{input.name.charAt('working_'.length + 1).toUpperCase()}
		</label>
	</div>
);

WorkingDayItem.propTypes = propTypes

const WorkingDays = () => (
	<fieldset name='working_days' className='working_days'>
		<Field component={WorkingDayItem} name='working_sunday' />
		<Field component={WorkingDayItem} name='working_monday' />
		<Field component={WorkingDayItem} name='working_tuesday' />
		<Field component={WorkingDayItem} name='working_wednesday' />
		<Field component={WorkingDayItem} name='working_thursday' />
		<Field component={WorkingDayItem} name='working_friday' />
		<Field component={WorkingDayItem} name='working_saturday' />
	</fieldset>
)

export default WorkingDays;