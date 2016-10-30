import * as Joi from 'joi';
import lookupItem from './lookupItem.js';
import { name, version } from '../package.json';

const cache = {
	privacy: 'public',
	expiresIn: 3.6e+6, // 1hr
};

const url = Joi.string().uri({ schema: 'https' }).allow(null);

const lookupRoutes = [
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
			validate: { params: { latinName: Joi.string() } },
			response: { schema: { info: url, image: url } },
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
			},
			response: { schema: url },
		},
	},
];

export function register(server, { prefix = '/plants' }, done) {
	server.route(lookupRoutes);
	done();
}

register.attributes = {	name, version };
