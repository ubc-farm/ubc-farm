import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Researcher } from '@ubc-farm/databases';
import { Field, ReformedProps } from '@ubc-farm/react-inputs';

/**
 * Form with researcher fields
 */
const ResearcherForm: SFC<ReformedProps<Researcher>> = ({ bindInput }) => (
	<div>
		<Field label="Position" name="position">
			<input className="input" type="text" {...bindInput('position')} />
		</Field>

		<Field label="Faculty" name="faculty">
			<input className="input" type="text" {...bindInput('faculty')} />
		</Field>

		<Field label="Department" name="department">
			<input className="input" type="text" {...bindInput('department')} />
		</Field>

		<Field label="Lab Website" name="labWebsite">
			<input className="input" type="text" {...bindInput('labWebsite')} />
		</Field>

		<Field label="Expertise" name="expertise">
			<input className="input" type="text" {...bindInput('expertise')} />
		</Field>

		<Field label="Courses Taught" name="coursesTaught">
			<textarea className="textarea" {...bindInput('coursesTaught')} />
		</Field>

		<Field label="Projects" name="projects">
			<textarea className="textarea" {...bindInput('projects')} />
		</Field>
	</div>
);

export default ResearcherForm;
