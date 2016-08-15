import {parse} from 'url';
import {config as staticObj} from 'ubc-farm-static-server/package.json';
import {config as viewObj} from 'ubc-farm-views-server/package.json';

export const host = 'localhost';
export const protocol = 'http';

export const options = {
	passThrough: true,
	xforward: true
}

export default function(request, reply) {
	const {pathname} = parse(request.path);
	
	function useConnection(connection) {
		const {host = 'localhost', port, protocol = 'http'} = connection;
		if (port === undefined) throw Error('Missing port');
		const opts = Object.assign({}, options, { host, port, protocol });
		return reply.proxy(opts);
	}

	const [, subfolder] = pathname.split('/');
	switch (subfolder) {
		case 'analytics.js':
		case 'css': 
			return useConnection(staticObj);

		default: return useConnection(viewObj);
	}
}