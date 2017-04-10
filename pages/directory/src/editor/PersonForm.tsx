import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Person } from '@ubc-farm/databases';
import { ReformedProps, InputProps } from './nestedReformed';

/**
 * Form with person fields
 */
const PersonForm: SFC<ReformedProps<Person, keyof Person>> = ({ bindInput }) => (
	<div>
		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Name</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<input className="input" type="text" {...bindInput('name')} />
					</div>
				</div>
			</div>
		</div>

		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Email</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<input className="input" type="email" {...bindInput('email')} />
					</div>
				</div>
			</div>
		</div>

		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Phone</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<input className="input" type="tel" {...bindInput('phone.number')} />
					</div>
				</div>
			</div>
		</div>

		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Mailing Address</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<textarea className="textarea" {...bindInput('addressMailing')} />
					</div>
				</div>
			</div>
		</div>

		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Physical Address</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<textarea className="textarea" {...bindInput('addressPhysical')} />
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default PersonForm;
