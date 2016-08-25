import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { omit } from 'ubc-farm-utils';
import { toRangeString } from 'ubc-farm-utils/calendar/index.js';

/**
 * Returns a react element using the RangeString function to build
 * the string.
 */
const RangeText = props => {
	const { forceDate, twelveHour } = props;

	let { start, end } = props;
	[start, end] = toRangeString(start, end, { forceDate, twelveHour });

	const insertLineBreaks = children => children.reduce((text, val, i) => {
		if (i !== 0) text.push(<br />);
		text.push(val);
		return text;
	}, []);

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
	start: PropTypes.instanceOf(Date).isRequired,
	end: PropTypes.instanceOf(Date).isRequired,
	forceDate: PropTypes.boolean,
	twelveHour: PropTypes.boolean,
};

export default RangeText;
