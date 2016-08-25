import { createElement } from 'react'; /** @jsx createElement */

import EquipmentSection from './equipment/pane.js';
import LocationSelect from './location/connected.js';
import TimeDisplay from './time/connected.js';

const EditorPanel = () => (
	<form className="panel">
		<h3>Equipment Used</h3>
		<EquipmentSection />

		<h3>Time</h3>
		<TimeDisplay />

		<h3>Location</h3>
		<LocationSelect />
	</form>
);

export default EditorPanel;
