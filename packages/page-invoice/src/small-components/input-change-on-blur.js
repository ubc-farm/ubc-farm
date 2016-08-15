import {Component, PropTypes, cloneElement} from 'react';

/**
 * Wraps an input so that updates when focus is lost, instead of
 * every keystroke. This is mainly used for inputs where the typed in values
 * need to be converted to internal values and internal values need to be 
 * converted back. Changing every keystroke has unintended consequences for the
 * user as the input becomes annoying to use, so changing when focus is lost 
 * works better.
 */
export default class UpdateOnBlur extends Component {
	static get propTypes() {return {
		value: PropTypes.any.isRequired,
		onBlur: PropTypes.func.isRequired,
		inputProps: PropTypes.object,
		children: PropTypes.element
	}}

	constructor(props) {
		super(props);
		this.state = {renderedValue: props.value};
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({renderedValue: nextProps.value});
	}

	handleChange(e) {
		this.setState({renderedValue: e.target.value});
	}

	render() {
		let props = {
			onChange: this.handleChange,
			value: this.state.renderedValue
		};

		for (const key in this.props) {
			switch (key) {
				case 'children': case 'rowKey': case 'column': break;
				default: props[key] = this.props[key];
			}
		}


		return cloneElement(this.props.children, props);
	}
}