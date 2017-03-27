import { createElement as h } from 'react'; /** @jsx h */
import { Field } from 'redux-form';

import Toggle from './toggle.js';
import EmergencyField from './emergency.js';
import WorkingDays from './working-days.js';

const EmployeeSection = () => (
	<fieldset name="employee_info">
		<label>
			<span className="label-body">Hourly Pay</span>
			<Field component="input" type="number" name="hourlyPay" />
		</label>
		<Field
			defaultValue={false}
			component={Toggle}
			name="fullOrPartTime"
			offText="Is part time"
			onText="Is full time"
		/>
		<EmergencyField />
		<WorkingDays />
	</fieldset>
);

export default EmployeeSection;
