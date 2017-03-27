import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { Field, reduxForm, propTypes, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import { applyGridDataToActive, buildGrid } from '../redux/actions/index.js';
import { activeGridSelector } from '../redux/selectors.js';
import { defaultGrid } from '../map/utils/index.js';
import AngleDial from './angle-dial.js';
import Submit from './submit-button.js';

let GridForm = ({ handleSubmit, pristine, submitting, angleValue }) => (
	<form onSubmit={handleSubmit} id="grid-form">
		<section id="grid-angle">
			<label>
				<h5>Grid Angle</h5>
				<Field
					name="angle" component="input"
					type="number"
					min={0} max={360}
					step="any"
					className="angle-field"
				/>
			</label>
			<AngleDial angle={angleValue || 0} />
		</section>

		<section id="grid-size">
			<label>
				<h5>Grid Width</h5>
				<Field
					name="baseWidth" component="input"
					type="number"
					min={0}	step="any"
				/>
			</label>
			<label>
				<h5>Grid Height</h5>
				<Field
					name="baseHeight" component="input"
					type="number"
					min={0}	step="any"
				/>
			</label>
		</section>
		<Submit disabled={pristine} loading={submitting} />
	</form>
);

GridForm.propTypes = Object.assign({}, propTypes, {
	angleValue: PropTypes.number,
});

GridForm = reduxForm({
	form: 'grid',
	enableReinitialize: true,
})(GridForm);

const valueSelector = formValueSelector('grid');
export default connect(
	state => ({
		angleValue: valueSelector(state, 'angle'),
		initialValues: activeGridSelector(state) || defaultGrid,
	}),
	dispatch => ({
		onSubmit(formData) {
			console.log(formData);
			dispatch(applyGridDataToActive(formData));
			return dispatch(buildGrid());
		},
	}),
	(stateProps, dispatchProps, ownProps) => {
		const result = Object.assign({}, stateProps, dispatchProps, ownProps);
		if (ownProps.angleValue == null) result.angleValue = stateProps.angleValue;
		return result;
	}
)(GridForm);

