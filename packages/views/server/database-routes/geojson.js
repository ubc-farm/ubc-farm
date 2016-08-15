import {Field} from '../../database/index.js';
import {
	Feature,
	FeatureCollection
} from '../../utils/geojson.js';
import {transformReply} from './transformer.js';
import {print, shallow} from './transformer-validation.js';

const Joi = require('joi') //eslint-disable-line import/no-commonjs

/**
 * Retrieve fields as a GeoJSON Feature Collection
 */
export function geojson(request, reply) {
	const query = Field.query()
		.map(({polygon, parent, grid, $id}) => 
			new Feature(polygon, {parent, grid}, $id()))
		.then(features => new FeatureCollection(features).toJSON())

	return transformReply(query, request, reply);
}

function featureToField(feature) {
	const {id, properties, geometry} = feature;
	const path = geometry.coordinates, {parent, grid} = properties || {};
	
	let field = {path, parent};
	if (id) field.id = id;
	if (grid) {
		field.gridWidths = [grid.baseWidth, ...grid.specificWidths || []];
		field.gridHeights = [grid.baseHeight, ...grid.specificHeights || []];
	}	
	
	return field;
}

export function geojsonAdd(request, reply) {
	const {payload} = request;
	let insertQuery = [];

	switch (payload.type) {
		case 'FeatureCollection': {
			for (const feature of payload.features) 
				insertQuery.push(featureToField(feature));
			break;
		}
		case 'Feature': 
			insertQuery[0] = featureToField(payload);
			break;
		case 'Polygon': {
			const path = payload.coordinates;
			insertQuery[0] = {path};
			break;
		}
	}

	const query = Field.query.insert(insertQuery)
		.then(inserted => ({ id: inserted[Field.idColumn] }));

	return transformReply(query, request, reply);
}

const polygonSchema = Joi.object().keys({
	type: Joi.string().valid('Polygon').required(),
	coordinates: Joi.array().min(1).items(
		Joi.array().min(3).items(
			Joi.array().min(2).items(Joi.number())
		)
	).required()
});

const featureSchema = Joi.object().keys({
	type: Joi.string().valid('Feature').required(),
	geometry: polygonSchema,
	properties: {
		parent: Joi.string().optional(),
		grid: Joi.object().keys({
			baseWidth: Joi.number(),
			baseHeight: Joi.number(),
			specificWidths: Joi.array().items(Joi.number()).optional(),
			specificHeights: Joi.array().items(Joi.number()).optional()
		}).requiredKeys('baseWidth', 'baseHeight').optional()
	}
}).requiredKeys('geometry', 'properties');

const featureCollectionSchema = Joi.object().keys({
	type: Joi.string().valid('FeatureCollection').required(),
	features: Joi.array().items(featureSchema).required()
});

export default [
	{
		method: 'GET',
		path: '/api/fields/geojson',
		handler: geojson,
		config: {
			response: {
				schema: Joi.any()
					.when(Joi.ref('$query.shallow'), {is: false, 
						then: featureCollectionSchema	
					})
			}
		}
	},
	{
		method: 'POST',
		path: '/api/fields/geojson',
		handler: geojsonAdd,
		config: {
			validate: {
				payload: Joi.alternatives().try(
					featureCollectionSchema, 
					featureSchema, 
					polygonSchema
				),
				query: {
					print, shallow
				}
			}
		}
	},
]
