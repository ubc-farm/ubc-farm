import { createElement, SFC } from 'react'; /** @jsx createElement */
import { VictoryChart, VictoryBar } from 'victory';

export interface CalorieBar {
	plant: string;
	calories: number;
}

/**
 * Displays calories produced by the farm, corresponding to each crop grown.
 */
const CalorieBarChart: SFC<{ data: CalorieBar[] }> = ({ data }) => (
	<VictoryChart>
		<VictoryBar
			data={data}
			horizontal
			x="plant"
			y="calories"
		/>
	</VictoryChart>
);

export default CalorieBarChart;
