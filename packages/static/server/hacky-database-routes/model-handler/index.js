import getter from './getter.js';
import poster from './poster.js';
import deleter from './deleter.js';
import patcher from './patcher.js';

/**
 * Route handler function attached to a hapi server.
 * Uses the 'model' property in the route options to reference
 * an Objection.js Model, which is then queried and results are returned
 * in a format similar to Firebase's database JSON
 */
export default function handler(route, options) {
	switch(route.method.toLowerCase()) {
		case 'get': return getter(route, options);
		case 'post': return poster(route, options);
		case 'delete': return deleter(route, options);
		case 'put': case 'patch':	
			return patcher(route, options);
	}
}