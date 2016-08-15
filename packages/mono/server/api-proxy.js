import {config as connection} from 'ubc-farm-api/package.json';
import {options} from './proxy.js';

const {host = 'localhost', protocol = 'http', port} = connection;
if (port === undefined) throw Error('Missing port');

export const handler = Object.assign({}, options, {
	host, protocol, port
});

export default {
	method: [
		'GET', 'POST', 'PUT',
		'DELETE', 'PATCH', 'OPTIONS'
	],
	path: '/api/{path*}',
	handler: {proxy: handler}
};