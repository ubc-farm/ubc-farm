import { createElement, SFC } from 'react'; /** @jsx createElement */
import { VictoryChart, VictoryAxis } from 'victory';
import { LongTermData, LongTermLine, DateAxis } from './components';

const WaterUsed: SFC<LongTermData> = ({ data }) => {
	return (
		<VictoryChart>
			<DateAxis />
			<VictoryAxis
				dependentAxis
				label="Water Used"
			/>

			<LongTermLine data={data} y="waterUsed" />
		</VictoryChart>
	);
}

export default WaterUsed;
