import {render} from 'react-dom';
import {createElement as h} from 'react'; /** @jsx h */
import {domready} from 'ubc-farm-utils';

import Toolbar from './toolbar/toolbar.js';
import Sidebar from './sidebar/sidebar.js';

export {default} from './map/index.js';
export {default as store} from './redux/index.js';

domready.then(() => {
	render(<Toolbar />, document.getElementById('toolbar-mount'));
	render(<Sidebar />, document.getElementById('aside-mount'));
});
