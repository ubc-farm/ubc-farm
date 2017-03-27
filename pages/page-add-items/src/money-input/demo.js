import { createElement } from 'react'; /** @jsx createElement */
import { Field, reduxForm, propTypes } from 'redux-form';

import MoneyInput from 'ubc-farm-inputs/money.js';

const NormalizingMoneyTest = ({ handleSubmit }) => (
	<form onSubmit={handleSubmit}>
		<Field
			component={MoneyInput}
			name="money"
			type="text"
		/>
	</form>
);

NormalizingMoneyTest.propTypes = propTypes;

export default reduxForm({
	form: 'test',
})(NormalizingMoneyTest);
