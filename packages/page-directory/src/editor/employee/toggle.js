import { createElement as h, PropTypes } from 'react'; /** @jsx h */

const TextToggle = ({ input, offText, onText }) => (
	<div>
		<input type="checkbox" {...input} id={input.name} />
		<label htmlFor={input.name}>
			{(input.checked || input.value) ? onText : offText}
		</label>
	</div>
);

TextToggle.propTypes = {
	input: PropTypes.object,
	offText: PropTypes.node.isRequired,
	onText: PropTypes.node.isRequired,
};

export default TextToggle;
