import { connect } from 'react-redux';
import { selectedTaskObject } from '../../redux/selectors.js';
import RangeText from './range-text.js';

export default connect(
	state => {
		/* eslint-disable camelcase */
		const { start_time, end_time } = selectedTaskObject(state) || {};

		return {
			start: start_time != null ? new Date(start_time) : undefined,
			end: end_time != null ? new Date(end_time) : undefined,
		};
	}
)(RangeText);
