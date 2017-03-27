import 'es7-object-polyfill';
import { name, version } from '../../package.json';
import * as events from './events.js';

/* eslint-disable import/prefer-default-export */

export function register(server, opts, next) {
	server.route(Object.values(events));
	server.route({
		method: 'GET',
		path: '/{param?}',
		handler: { directory: { path: './public' } },
		config: { files: { relativeTo: __dirname } },
	});
	next();
}

register.attributes = { name, version };
