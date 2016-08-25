import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { omit } from 'ubc-farm-utils';
import {
	toRangeString,
	toDateString,
	toTimeString,
} from 'ubc-farm-utils/calendar/index.js';

function insertLineBreaks(children) {
	const result = [];
	for (const [i, value] of children.entries()) {
		if (i !== 0) result.push(<br />);
		result.push(value);
	}
	return result;
}

/**
 * Returns a react element using the RangeString function to build
 * the string.
 */
const RangeText = props => {
	const { forceDate, twelveHour } = props;

	let { start, end } = props;

	if (start == null) return null;

	if (end == null) {
		return (
			<time dateTime={start.toUTCString()}>
				{toDateString(start, { shortMonth: true })}
				<br />
				{toTimeString(start, { amPm: true, twelve: twelveHour })}
			</time>
		);
	}

	[start, end] = toRangeString(start, end, { forceDate, twelveHour });

	return (
		<span
			className="time"
			{...omit(props, ['start', 'end', 'forceDate', 'twelveHour'])}
		>
			<time dateTime={start.utc}>{insertLineBreaks(start.text)}</time>
			<time dateTime={end.utc}>{insertLineBreaks(end.text)}</time>
		</span>
	);
};

RangeText.propTypes = {
	start: PropTypes.instanceOf(Date),
	end: PropTypes.instanceOf(Date),
	forceDate: PropTypes.bool,
	twelveHour: PropTypes.bool,
};

export default RangeText;
