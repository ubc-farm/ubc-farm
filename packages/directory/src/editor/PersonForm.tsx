import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Person } from '@ubc-farm/databases';
import { ReformedProps } from './nestedReformed';

/**
 * Form with person fields
 */
const PersonForm: SFC<ReformedProps<Person>> = ({ bindInput }) => (
	<fieldset>
		<input type="text" {...bindInput<string>('name')} />
		<input type="email" {...bindInput<string>('email')} />
		<input type="tel" {...bindInput<string>('phone.number')} />
		<textarea {...bindInput<string>('addressMailing')} />
		<textarea {...bindInput<string>('addressPhysical')} />
	</fieldset>
);

export default PersonForm;
