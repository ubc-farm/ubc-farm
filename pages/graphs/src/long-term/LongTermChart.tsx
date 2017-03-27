import { createElement, SFC } from 'react'; /** @jsx createElement */
import { VictoryChart, VictoryLine, VictoryScatter } from 'victory';
import { LongTermEntry } from '@ubc-farm/databases';

/**
 * Displays data stored in the long-term database. Shows a line chart with
 * number of people employed, water used, and revenue.
 */
const LongTermChart: SFC<{ data: LongTermEntry[] }> = ({ data }) => {
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

export default LongTermChart;
