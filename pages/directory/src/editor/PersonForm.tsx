import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Person } from '@ubc-farm/databases';
import { Field, ReformedProps } from '@ubc-farm/react-inputs';

/**
 * Form with person fields
 */
const PersonForm: SFC<ReformedProps<Person>> = ({ bindInput }) => (
	<div>
		<Field label="Name" name="name">
			<input className="input" type="text" {...bindInput('name')} />
		</Field>

		<Field label="Email" name="email">
			<input className="input" type="email" {...bindInput('email')} />
		</Field>

		<Field label="Phone" name="phone.number">
			<input className="input" type="tel" {...bindInput('phone.number')} />
		</Field>

		<Field label="Mailing Address" name="addressMailing">
			<textarea className="textarea" {...bindInput('addressMailing')} />
		</Field>

		<Field label="Physical Address" name="addressMailing">
			<textarea className="textarea" {...bindInput('addressPhysical')} />
		</Field>
	</div>
);

export default PersonForm;
