import 'es7-object-polyfill';
import { name, version } from '../../package.json';
import * as catalog from './catalog.js';
import * as inventory from './inventory.js';

/* eslint-disable import/prefer-default-export */

export function register(server, opts, next) {
	server.route(Object.values(catalog));
	server.route(Object.values(inventory));
	server.route({
		method: 'GET',
		path: '/{param?}',
		handler: { directory: { path: './public' } },
		config: { files: { relativeTo: __dirname } },
	});
	next();
}

register.attributes = { name, version };
