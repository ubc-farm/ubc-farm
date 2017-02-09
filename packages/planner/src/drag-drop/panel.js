import { createElement as h } from 'react'; /** @jsx h */
import TaskTile from './tile.js';
import { taskTypeMap as taskDictionary } from '../redux/selectors.js';

const TaskPanel = () => {
	let tiles = [];

	for (const [name, color] of taskDictionary()) {
		tiles.push(<TaskTile name={name} color={color} key={name} />);
	}

	return <div>{tiles}</div>;
};

export default TaskPanel;
