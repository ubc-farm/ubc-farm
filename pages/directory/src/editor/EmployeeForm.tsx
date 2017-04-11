import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Employee } from '@ubc-farm/databases';
import { MoneyInput } from '@ubc-farm/react-inputs';
import { Field, ReformedProps } from '@ubc-farm/react-inputs';

/**
 * Form with employee fields
 */
const EmployeeForm: SFC<ReformedProps<Employee>> = ({ bindInput }) => (
	<div>
		<Field label="Pay" name="pay">
			<MoneyInput className="input" {...bindInput('pay')} />
		</Field>

		<Field label="Employment Type" name="employmentType">
			<div className="select is-fullwidth">
				<select {...bindInput('employmentType')}>
					<option value=""></option>
					<option value="fullTime">Full Time</option>
					<option value="partTime">Part Time</option>
				</select>
			</div>
		</Field>
	</div>
);

export default EmployeeForm;
