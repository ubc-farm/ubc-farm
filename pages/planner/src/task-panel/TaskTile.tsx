import {
	createElement, PropTypes, Component,
	DragEvent, ValidationMap,
} from 'react'; /** @jsx createElement */
import { classlist as cx } from '@ubc-farm/utils';

interface TaskTileProps { color: string, name: string }
interface TaskTileState { dragging: boolean };

export default class TaskTile extends Component<TaskTileProps, TaskTileState> {
	static propTypes: ValidationMap<any>
	ref: HTMLSpanElement

	constructor(props: TaskTileProps) {
		super(props);

		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleDragEnd = this.handleDragEnd.bind(this);

		this.state = { dragging: false };
	}

	componentDidMount() {
		this.ref.style.setProperty('--theme-color', this.props.color);
	}

	handleDragStart(e: DragEvent<HTMLSpanElement>) {
		this.setState({ dragging: true });
		e.dataTransfer.dropEffect = 'copy';
		e.dataTransfer.setData('text/plain', this.props.name);
	}

	handleDragEnd(e: DragEvent<HTMLSpanElement>) {
		e.preventDefault();
		this.setState({ dragging: false });
	}

	render() {
		const { name } = this.props;
		const { dragging } = this.state;

		return (
			<span
				className={cx('task-tile', name, { dragging })}
				ref={(s) => { this.ref = s; }}
				draggable
				onDragStart={this.handleDragStart}
				onDragEnd={this.handleDragEnd}
			>
				{name}
			</span>
		);
	}
}

TaskTile.propTypes = {
	color: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};
