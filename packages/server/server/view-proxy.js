import { config } from '../../views/package.json';
import setOptions from './options.js';

/** Used as default route so it can return 404 pages */
export default {
	method: 'GET',
	path: '/{path*}',
	handler: {
		proxy: setOptions(config),
	},
};
