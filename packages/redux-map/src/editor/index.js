import { createElement } from 'react'; /** @jsx createElement */

import LocationSelect from './location/connected.js';
import TimeDisplay from './time/connected.js';

const EditorPanel = () => (
	<form>
		<h3>Time</h3>
		<TimeDisplay />

		<h3>Location</h3>
		<LocationSelect />
	</form>
);

export default EditorPanel;
