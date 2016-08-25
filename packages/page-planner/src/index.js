import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/index.js';

import timeline, { listen } from './timeline/index.js';
import TaskPanel, { init } from './drag-drop/index.js';
import Editor from './editor/index.js';
import { fetchLocations } from './redux/actions/index.js';

render(
	<Provider store={store}><TaskPanel /></Provider>,
	document.getElementById('tasklist-mount')
);

init(timeline);
listen(store);

render(
	<Provider store={store}><Editor /></Provider>,
	document.getElementById('editor-mount')
);

store.dispatch(fetchLocations());

export default store;
