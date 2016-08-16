import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {Field, reduxForm, propTypes, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';

import {activeGridSelector} from '../redux/selectors.js'
import buildGrid from '../redux/action-build-grid.js';
import AngleDial from './angle-dial.js';
import Submit from './submit-button.js';

let _GridForm = ({handleSubmit, pristine, submitting, angleValue}) => (
	<form onSubmit={handleSubmit} id='grid-form'>
		<section id='grid-angle'>
			<label>
				<h5>Grid Angle</h5>
				<Field name='angle' component='input'
					type='number'
					min={0} max={360}
					step='any'
					className='angle-field'
				/>
				<AngleDial angle={angleValue} />
			</label>
		</section>

		<section id='grid-size'>
			<label>
				<h5>Grid Width</h5>
				<Field name='baseWidth' component='input'
					type='number'
					min={0}	step='any'
				/>
			</label>
			<label>
				<h5>Grid Height</h5>
				<Field name='baseHeight' component='input'
					type='number'
					min={0}	step='any'
				/>
			</label>
		</section>
		<Submit disabled={pristine} loading={submitting} />
	</form>
);

_GridForm.propTypes = Object.assign({}, propTypes, {
	angleValue: PropTypes.number
})

_GridForm = reduxForm({
	form: 'grid'
})(GridForm);

const valueSelector = formValueSelector('grid');
const GridForm = connect(
	state => ({
		initialValues: activeGridSelector(state),
		angleValue: valueSelector(state, 'angle')
	}),
	dispatch => ({
		onSubmit: formData => dispatch(buildGrid(undefined, formData))
	})
)(GridForm);

export default GridForm;

