import { name, version } from '../../package.json';

import api from './table.js';
import views from './views.js';

export function register(server, opts, next) {
	server.route(api);
	server.route(views);
	next();
}

register.attributes = { name, version };
