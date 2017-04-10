import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Employee } from '@ubc-farm/databases';
import { MoneyInput } from '@ubc-farm/react-inputs';
import { ReformedProps, InputProps } from './nestedReformed';

/**
 * Form with employee fields
 */
const EmployeeForm: SFC<ReformedProps<Employee, keyof Employee>> = ({ bindInput }) => (
	<div>
		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Pay</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<MoneyInput {...bindInput('pay')} />
					</div>
				</div>
			</div>
		</div>

		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Employment Type</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<div className="select is-fullwidth">
							<select {...bindInput('employmentType')}>
								<option value=""></option>
								<option value="fullTime">Full Time</option>
								<option value="partTime">Part Time</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default EmployeeForm;
