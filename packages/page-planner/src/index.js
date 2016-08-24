import { render } from 'react-dom';
import { createElement as h } from 'react'; /** @jsx h */

import TimelineReady from './timeline/index.js';
import TaskPanel from './drag-drop/panel.js';
import bindListeners from './drag-drop/timeline-handler.js';

TimelineReady.then(TimelineComponent => {
	bindListeners(TimelineComponent);
	window.TimelineComponent = TimelineComponent;

	render(
		<TaskPanel />,
		document.getElementById('tasklist-mount')
	);
});
