import {config as connection} from 'ubc-farm-api/package.json';
import setOptions from './options.js';

export const handler = setOptions(connection);

export default {
	method: [
		'GET', 'POST', 'PUT',
		'DELETE', 'PATCH', 'OPTIONS'
	],
	path: '/api/{path*}',
	handler: {proxy: handler}
};