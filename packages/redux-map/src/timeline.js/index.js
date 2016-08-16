import Timeline from 'vis-timeline'; //eslint-disable-line 
import {domready} from 'ubc-farm-utils';
import timelineOptions from './options.js';
import getGroups from './groups.js';

export default Promise.all([getGroups, domready])
.then(([groups]) => 
	new Timeline(
		document.getElementById('timeline-mount'),
		[],
		groups,
		timelineOptions
	)
);