import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Employee } from '@ubc-farm/databases';
import { Field } from '@ubc-farm/react-inputs';
import { ReformedProps, InputProps } from './nestedReformed';

/**
 * Form with employee fields
 */
const EmployeeForm: SFC<ReformedProps<Employee, keyof Employee>> = ({ bindInput }) => (
	<fieldset>
		<Field type="text" {...bindInput('pay')}>Pay</Field>
		<div className="field-container">
			<label htmlFor="employmentType-input">Employment Type</label>
			<select
				id="employmentType-input"
				{...bindInput('employmentType') as InputProps<string>}
			>
				<option value=""></option>
				<option value="fullTime">Full Time</option>
				<option value="partTime">Part Time</option>
			</select>
		</div>
	</fieldset>
);

export default EmployeeForm;
