import { createElement as h } from 'react'; /** @jsx h */

import store from '../redux/index.js';
import Form from './form.js';

const Sidebar = () => (
	<aside className="map-aside">
		<Form store={store} />
	</aside>
);

export default Sidebar;
