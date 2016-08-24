import { createElement as h } from 'react'; /** @jsx h */
import TaskTile from './tile.js';
import Tasks from './tasklist.js';

const TaskPanel = () => {
	let tiles = [];

	for (const [name, color] of Tasks) {
		tiles.push(<TaskTile name={name} color={color} />);
	}

	return <div>{tiles}</div>;
};

export default TaskPanel;
