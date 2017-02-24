import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Employee } from '@ubc-farm/databases';
import { ReformedProps } from './nestedReformed';

/**
 * Form with employee fields
 */
const EmployeeForm: SFC<ReformedProps<Employee>> = ({ bindInput }) => (
	<fieldset>
		<input type="text" {...bindInput<string>('pay')} />
		<select {...bindInput<'fullTime' | 'partTime'>('employmentType')}>
			<option value=""></option>
			<option value="fullTime">Full Time</option>
			<option value="partTime">Part Time</option>
		</select>
	</fieldset>
);

export default EmployeeForm;
