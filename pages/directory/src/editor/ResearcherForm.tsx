import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Researcher } from '@ubc-farm/databases';
import { Field } from '@ubc-farm/react-inputs';
import { ReformedProps, InputProps } from './nestedReformed';

/**
 * Form with researcher fields
 */
const ResearcherForm: SFC<ReformedProps<Researcher, keyof Researcher>> = ({ bindInput }) => (
	<div>
		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Position</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<input className="input" type="text" {...bindInput('position')} />
					</div>
				</div>
			</div>
		</div>

		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Faculty</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<input className="input" type="text" {...bindInput('faculty')} />
					</div>
				</div>
			</div>
		</div>

		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Department</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<input className="input" type="text" {...bindInput('department')} />
					</div>
				</div>
			</div>
		</div>

		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Lab Website</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<input className="input" type="url" {...bindInput('labWebsite')} />
					</div>
				</div>
			</div>
		</div>

		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Expertise</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<textarea className="textarea" {...bindInput('expertise')} />
					</div>
				</div>
			</div>
		</div>

		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Courses Taught</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<textarea className="textarea" {...bindInput('coursesTaught')} />
					</div>
				</div>
			</div>
		</div>

		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label className="label">Projects</label>
			</div>
			<div className="field-body">
				<div className="field">
					<div className="control">
						<textarea className="textarea" {...bindInput('projects')} />
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default ResearcherForm;
