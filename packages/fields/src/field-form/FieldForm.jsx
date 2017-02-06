import { createElement, PropTypes, Component } from 'react'; /** @jsx createElement */
import { getLocationString, getArea } from '../fieldData.js';

class FieldForm extends Component {
	bindInput(name) {
		switch (name) {
			case 'location':
				return {
					name,
					value: getLocationString(this.props.model),
					onChange: e => this.props.setProperty(name, e.target.value),
				};
			case 'area':
				return {
					name,
					value: getArea(this.props.model),
					onChange: e => this.props.setProperty(name, e.target.value),
				};
			default:
				return {
					name,
					value: this.props.model[name],
					onChange: e => this.props.setProperty(name, e.target.value),
				};
		}
	}

	render() {
		return (
			<form onSumbit={this.props.onSubmit}>
				<label htmlFor="form-name">Field Name</label>
				<input type="text" id="form-name" required {...this.bindInput('name')} />

				<label htmlFor="form-location">Location</label>
				<input type="text" id="form-location" {...this.bindInput('location')} />
				<label htmlFor="form-location">ac</label>

				<label htmlFor="form-area">Area</label>
				<input type="number" id="form-area" {...this.bindInput('area')} />
			</form>
		);
	}
}

FieldForm.propTypes = {
	model: PropTypes.shape({
		name: PropTypes.string.isRequired,
		geometry: PropTypes.shape({
			type: PropTypes.oneOf(['Feature']),
			coordinates: PropTypes.arrayOf(
				PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
			),
		}),
		location: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.number)]),
		area: PropTypes.number,
	}).isRequired,
	setProperty: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default FieldForm;
