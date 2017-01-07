import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { VictoryChart, VictoryBar } from 'victory';

const Chart = ({ data }) => (
	<VictoryChart>
		<VictoryBar
			data={data}
			horizontal
			x="name"
			y="calories"
		/>
	</VictoryChart>
);

Chart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		calories: PropTypes.number.isRequired,
	})),
}

export default Chart;
