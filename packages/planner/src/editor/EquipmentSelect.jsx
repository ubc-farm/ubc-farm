import { createElement, PropTypes, Component } from 'react'; /** @jsx createElement */
import VirtualizedSelect from 'react-virtualized-select';

export default class EquipmentSelect extends Component {
	render() {
		return (
			<label className="editor-input-wrapper">
				<span className="editor-label">Equipment</span>
				<VirtualizedSelect
					async className="editor-input"
				/>
			</label>
		);
	}
}
