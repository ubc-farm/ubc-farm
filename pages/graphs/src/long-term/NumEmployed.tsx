import { createElement, SFC } from 'react'; /** @jsx createElement */
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';
import { LongTermData, getX } from './components';

const NumEmployed: SFC<LongTermData> = ({ data }) => {
	return (
		<VictoryChart>
			<VictoryAxis
				scale="time"
				label="Date"
			/>
			<VictoryAxis
				dependentAxis
				label="# Employed"
			/>

			<VictoryLine data={data} x={getX} y="numEmployed" />
		</VictoryChart>
	);
}

export default NumEmployed;
