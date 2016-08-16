import {createElement as h} from 'react'; /** @jsx h */
import {connect} from 'react-redux';
import {reduxForm, Field, propTypes, formValueSelector} from 'redux-form';

import EmployeeSection from './employee/index.js';
import ResearcherSection from './researcher/index.js';

import Address from './address.js';

const Form = ({handleSubmit, addressValue, roleValue}) => (
	<form onSubmit={handleSubmit}>
		<label>
			<span className='label-body'>Name</span>
			<Field component='input' type='text' name='name' />
		</label>
		<label>
			<span className='label-body'>Name</span>
			<Field component='input' type='text' name='role' list='role-list' />
			<datalist id='role-list'>
				<option value='Employee' />
				<option value='Researcher' />
			</datalist>
		</label>
		<label>
			<span className='label-body'>Email</span>
			<Field component='input' type='email' name='email' />
		</label>
		<label>
			<span className='label-body'>Phone Number</span>
			<Field component='input' type='tel' name='phone' />
		</label>
		<Field component={Address} 
			name='addressPhysical' 
			addressValue={addressValue}
			label='Physical Address'
		/>
		<Field component={Address} 
			name='addressMailing' 
			addressValue={addressValue}
			label='Mailing Address'
		/>

		{roleValue === 'Employee' ? EmployeeSection : null}
		{roleValue === 'Researcher' ? ResearcherSection : null}
	</form>
)

Form.propTypes = propTypes;

const ReduxForm = reduxForm({
	form: 'contact'
})(Form);

const selector = formValueSelector('contact');
export default connect(
	state => {
		const addressValue = 
			selector(state, 'addressPhysical') || selector(state, 'addressMailing');
		const roleValue = selector(state, 'role');

		return {
			addressValue,
			roleValue
		};
	}
)(ReduxForm);