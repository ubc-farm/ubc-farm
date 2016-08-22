import { createElement, PropTypes } from 'react'; /** @jsx createElement */

const firstEntry = object => {
	// eslint-disable-next-line guard-for-in
	for (const key in object) return [key, object[key]];
	throw new Error(`Object ${object} has no keys`);
};

const DurationInput = ({ input: { value, name, onChange } }) => {
	const [durationType, durationValue] = firstEntry(value);
	const setState = newState => onChange(Object.assign({}, value, newState));

	const s = durationValue === 1 ? '' : 's';

	return (
		<div className="duration-input">
			<input
				type="number" size="1"
				step="1" min="0" max="999"
				name={`${name}-value`}
				onChange={e => setState({ [durationType]: e.target.value })}
				value={durationValue}
			/>
			<select
				name={`${name}-type`}
				value={durationType}
				onChange={e => onChange({ [e.target.value]: durationValue })}
			>
				<option value="seconds">second{s}</option>
				<option value="minutes">minute{s}</option>
				<option value="hours">hour{s}</option>
				<option value="days">day{s}</option>
				<option value="weeks">week{s}</option>
				<option value="months">month{s}</option>
				<option value="years">year{s}</option>
			</select>
		</div>
	);
};

DurationInput.propTypes = {
	input: PropTypes.shape({
		value: PropTypes.object,
		onChange: PropTypes.func,
		name: PropTypes.string,
	}).isRequired,
};

export default DurationInput;
export const defaultValue = { years: 1 };
