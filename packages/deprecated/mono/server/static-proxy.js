import { config } from '../../static/package.json';
import setOptions from './options.js';

const proxy = setOptions(config);

export default [
	{
		method: 'GET',
		path: '/css/{path*}',
		handler: { proxy },
	},
	{
		method: 'GET',
		path: '/js/{path*}',
		handler: { proxy },
	},
];
