import {createElement as h} from 'react'; /** @jsx h */
import {Field} from 'redux-form';

import EmergencyField from './emergency.js';
import WorkingDays from './working-days.js';

const EmployeeSection = () => (
	<fieldset name='employee_info'>
		<label>
			<span className='label-body'>Hourly Pay</span>
			<Field component='input' type='number' name='hourlyPay' />
		</label>
		<label>
			<span className='label-body'>Full or Part Time</span>
			<Field component='input' type='checkbox' name='fullOrPartTime' />
		</label>
		<EmergencyField />
		<WorkingDays />
	</fieldset>
)

export default EmployeeSection;