import { createElement } from 'react'; /** @jsx createElement */

import Switch from './switch.js';
import Counter from './count.js';
import { AddButton, DeleteButton } from './buttons.js';

export default () => (
	<Switch
		unselectedElement={<AddButton />}
		selectedElement={[
			<Counter />,
			<DeleteButton />,
		]}
	/>
);
