import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Person } from '@ubc-farm/databases';
import { Field } from '@ubc-farm/react-inputs';
import { ReformedProps } from './nestedReformed';

/**
 * Form with person fields
 */
const PersonForm: SFC<ReformedProps<Person>> = ({ bindInput }) => (
	<fieldset>
		<Field type="text" {...bindInput<string>('name')}>Name</Field>
		<Field type="email" {...bindInput<string>('email')}>Email</Field>
		<Field type="tel" {...bindInput<string>('phone.number')}>Phone</Field>
		<div className="field-container">
			<label htmlFor="addressMailing">Mailing Address</label>
			<textarea id="addressMailing" {...bindInput<string>('addressMailing')} />
		</div>
		<div className="field-container">
			<label htmlFor="addressPhysical">Physical Address</label>
			<textarea id="addressPhysical" {...bindInput<string>('addressPhysical')} />
		</div>
	</fieldset>
);

export default PersonForm;
