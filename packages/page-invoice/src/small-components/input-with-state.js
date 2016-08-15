import {createElement as h, PureComponent, PropTypes} from 'react'; 
/** @jsx h */

const stop = e => e.stopPropagation();

/**
 * Wraps an input so that updates when focus is lost, instead of
 * every keystroke. This is mainly used for inputs where the typed in values
 * need to be converted to internal values and internal values need to be 
 * converted back. Changing every keystroke has unintended consequences for the
 * user as the input becomes annoying to use, so changing when focus is lost 
 * works better.
 */
export default class UpdateOnBlur extends PureComponent {
	static get propTypes() {return {
		value: PropTypes.string,
		placeholder: PropTypes.string
	}}
	
	constructor(props) {
		super(props);

		this.state = {
			placeholder: props.placeholder,
			value: props.value
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({value: nextProps.value});
	}

	handleChange(e) {
		this.setState({value: e.target.value})
	}
	handleBlur() {
		this.props.onBlur(this.state.value);
	}

	render() {
		return (
			<input type='text' onClick={stop} 
				{...this.props}
				value={this.state.value || ''}
				placeholder={this.state.placeholder}
				onChange={this.handleChange}
				onBlur={this.handleBlur}
			/>
		);
	}
}