import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Researcher } from '@ubc-farm/databases';
import { Field } from '@ubc-farm/react-inputs';
import { ReformedProps } from './nestedReformed';

/**
 * Form with researcher fields
 */
const ResearcherForm: SFC<ReformedProps<Researcher>> = ({ bindInput }) => (
	<fieldset>
		<Field type="text" {...bindInput<string>('position')}>Position</Field>
		<Field type="text" {...bindInput<string>('faculty')}>Faculty</Field>
		<Field type="text" {...bindInput<string>('department')}>Department</Field>
		<Field type="url" {...bindInput<string>('labWebsite')}>Lab Website</Field>
		<div className="field-container">
			<label htmlFor="expertise">Expertise</label>
			<textarea id="expertise" {...bindInput<string>('expertise')} />
		</div>
		<div className="field-container">
			<label htmlFor="coursesTaught">Courses Taught</label>
			<textarea id="coursesTaught" {...bindInput<string>('coursesTaught')} />
		</div>
		<div className="field-container">
			<label htmlFor="projects">Projects</label>
			<textarea id="projects" {...bindInput<string>('projects')} />
		</div>
	</fieldset>
);

export default ResearcherForm;
