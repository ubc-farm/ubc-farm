import * as Joi from 'joi';
import lookupItem from './lookupItem.js';
import * as pkg from '../package.json';

const url = Joi.string().uri('https');

export function register(server, { prefix = '/plants' }, done) {
	const cache = {
		privacy: 'public',
		expiresIn: 3.6e+6, // 1hr
	};

	server.route([
		{
			method: 'GET',
			path: '/{latinName}',
			handler({ params: { latinName } }, reply) {
				return reply(lookupItem(latinName))
					.type('application/json');
			},
			config: {
				cache,
				cors: true,
				validate: {
					params: { latinName: Joi.string() },
					payload: { info: url, image: url },
				},
			},
		},
		{
			method: 'GET',
			path: '/{latinName}/{property}',
			handler({ params: { latinName, property } }, reply) {
				return reply(
					lookupItem(latinName).then(plantData => plantData[property])
				);
			},
			config: {
				cache,
				cors: true,
				validate: {
					params: {
						latinName: Joi.string(),
						property: Joi.string().only('info', 'image'),
					},
					payload: url,
				},
			},
		},
	]);
	done();
}

register.attributes = {	pkg };
