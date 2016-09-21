import { createElement } from 'react'; /** @jsx createElement */
import { MenuGroup } from 'ribbon-toolbar';

import Add from './buttons/add.js';

const EditorGroup = props => (
	<MenuGroup {...props} title="Editor">
		<Add />
	</MenuGroup>
);

export default EditorGroup;
