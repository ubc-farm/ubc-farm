import {createElement as h} from 'react' /** @jsx h */

import store from '../redux/index.js';
import ConnectedToolbar from './connected.js';

const Toolbar = () => (
	<aside className='map-aside'>
		<ConnectedToolbar store={store} />
	</aside>
);

export default Toolbar;