import { createElement, SFC } from 'react'; /** @jsx createElement */
import { VictoryChart, VictoryAxis, VictoryArea } from 'victory';
import { LongTermData, getX } from './components';

const Sales: SFC<LongTermData> = ({ data }) => {
	return (
		<VictoryChart>
			<VictoryAxis
				scale="time"
				label="Date"
			/>
			<VictoryAxis
				dependentAxis
				tickFormat={x => `$${x / 100}`}
			/>

			<VictoryArea
				data={data} x={getX} y="revenue"
				style={{ data: { fill: 'darkblue' } }}
			/>
			<VictoryArea
				data={data} x={getX} y="expenses"
				style={{ data: { fill: 'firebrick' } }}
			/>
		</VictoryChart>
	);
}

export default Sales;
