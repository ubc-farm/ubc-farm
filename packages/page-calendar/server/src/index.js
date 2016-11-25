// import 'es7-object-polyfill';
import { name, version } from '../../package.json';

/* eslint-disable import/prefer-default-export */

export function register(server, opts, next) {
	server.route({
		method: 'GET',
		path: '/{param?}',
		handler: { directory: { path: '../public' } },
		config: { files: { relativeTo: __dirname } },
	});
	next();
}

register.attributes = { name, version };
