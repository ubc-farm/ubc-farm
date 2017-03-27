import { createElement, PropTypes } from 'react'; /** @jsx createElement */

export default function ToggleButton(props) {
	const copy = Object.assign({}, props);
	Reflect.deleteProperty(copy, 'pressed');

	return <button aria-pressed={props.pressed} {...copy} />;
}

ToggleButton.propTypes = { pressed: PropTypes.bool };
ToggleButton.defaultProps = { pressed: false };
