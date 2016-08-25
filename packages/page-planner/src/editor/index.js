import { createElement } from 'react'; /** @jsx createElement */

import LocationSelect from './location/connected.js';

const EditorPanel = () => (
	<form>
		<h3>Location</h3>
		<LocationSelect />
	</form>
);

export default EditorPanel;
