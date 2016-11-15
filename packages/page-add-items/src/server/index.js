import { name, version } from '../../package.json';

export function register(server, opts, next) {
	server.route();

	next();
}

register.attributes = { name, version };
