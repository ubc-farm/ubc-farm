import {createElement} from 'react' /** @jsx createElement */
import { Field, reduxForm } from 'redux-form'

import MoneyInput from './input.js';

const NormalizingMoneyTest = ({handleSubmit}) => (
	<form onSubmit={handleSubmit}>
		<Field component={MoneyInput} 
			name='money'
			type='text'
		/>
	</form>
) 

export default reduxForm({
	form: 'test'
})(NormalizingMoneyTest)