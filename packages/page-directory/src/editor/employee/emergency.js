import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {Field} from 'redux-form';

const Emergency = () => (
	<fieldset name='emergency_info'>
		<legend>Emergency Contact</legend>
		<label>
			<span className='label-body'>Name</span>
			<Field component='input' name='emergencyContactName' type='text' />
		</label>
		<label>
			<span className='label-body'>Phone</span>
			<Field component='input' name='emergencyContactNumber' type='tel' />
		</label>
	</fieldset>
)

export default Emergency;