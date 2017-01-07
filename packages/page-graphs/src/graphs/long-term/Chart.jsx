import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import {
  VictoryChart,
  VictoryLine,
	VictoryScatter,
} from 'victory';

const Chart = ({ data }) => {
	const props = { data, x: '_id' };
	return (
		<VictoryChart>
			<VictoryLine {...props} y="numEmployed" />
			<VictoryScatter {...props} y="numEmployed" />

			<VictoryLine {...props} y="waterUsed" />
			<VictoryScatter {...props} y="waterUsed" />

			<VictoryLine {...props} y="revenue" />
			<VictoryScatter {...props} y="revenue" />
		</VictoryChart>
	);
}

Chart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		numEmployed: PropTypes.number,
		waterUsed: PropTypes.number,
		revenue: PropTypes.number,
	})),
}

export default Chart;
