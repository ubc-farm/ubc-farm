import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Researcher } from '@ubc-farm/databases';
import { ReformedProps } from './nestedReformed';

/**
 * Form with researcher fields
 */
const ResearcherForm: SFC<ReformedProps<Researcher>> = ({ bindInput }) => (
	<fieldset>
		<input type="text" {...bindInput<string>('position')} />
		<input type="text" {...bindInput<string>('faculty')} />
		<input type="text" {...bindInput<string>('department')} />
		<input type="url" {...bindInput<string>('labWebsite')} />
		<textarea {...bindInput<string>('expertise')} />
		<textarea {...bindInput<string>('coursesTaught')} />
		<textarea {...bindInput<string>('projects')} />
	</fieldset>
);

export default ResearcherForm;
