import { name, version } from '../../package.json';
import { list } from './validate.js';

export function register(server, opts, next) {
	server.route([
		{
			method: 'GET',
			path: '/inventory/json',
			handler(request, reply) {

			},
		},
		{
			method: 'GET',
			path: '/inventory/csv',
			handler(request, reply) {

			},
		},
		{
			method: 'POST',
			path: '/inventory/patch',
			handler(request, reply) {

			},
		},
	]);
}

register.attributes = { name, version }
