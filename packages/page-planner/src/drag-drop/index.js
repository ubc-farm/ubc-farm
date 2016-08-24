import { render } from 'react-dom';
import { createElement as h } from 'react'; /** @jsx h */

import TaskPanel from './drag-drop/panel.js';
import initDragListeners from './drag-drop/ondrag.js';

initDragListeners();

render(
	<TaskPanel />,
	document.getElementById('tasklist-mount')
);
