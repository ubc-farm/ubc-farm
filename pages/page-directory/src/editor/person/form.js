import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { connect } from 'react-redux';
import { reduxForm, Field, propTypes, formValueSelector } from 'redux-form';

import Address from './address.js';
import submit from '../submit.js';

const Form = ({ handleSubmit, addressValue, id }) => (
	<form onSubmit={handleSubmit} id={id}>
		<label>
			<span className="label-body">Name</span>
			<Field component="input" type="text" name="name" />
		</label>
		<label>
			<span className="label-body">Role</span>
			<Field component="input" type="text" name="role" list="role-list" />
			<datalist id="role-list">
				<option value="Employee" />
				<option value="Researcher" />
			</datalist>
		</label>
		<label>
			<span className="label-body">Email</span>
			<Field component="input" type="email" name="email" />
		</label>
		<label>
			<span className="label-body">Phone Number</span>
			<Field component="input" type="tel" name="phone" />
		</label>
		<Field
			component={Address}
			name="addressPhysical"
			addressValue={addressValue}
			label="Physical Address"
		/>
		<Field
			component={Address}
			name="addressMailing"
			addressValue={addressValue}
			label="Mailing Address"
		/>
	</form>
);

Form.propTypes = Object.assign({}, propTypes, {
	addressValue: PropTypes.string,
});

const ReduxForm = reduxForm({
	form: 'new-person',
	onSubmit: submit,
})(Form);

export const selector = formValueSelector('new-person');

export default connect(
	state => {
		const addressValue =
			selector(state, 'addressPhysical') || selector(state, 'addressMailing');

		return { addressValue	};
	}
)(ReduxForm);
