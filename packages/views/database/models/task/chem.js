import {Model} from 'objection';
import Task from './task.js';
import {Chemical} from '../index.js';

/**
 * Shared properties for chemical tasks
 * @alias module:app/models.ChemicalTask
 * @extends module:app/models.Task
 * @property {number} [product] used for this task
 * @property {string} [type]
 * @property {number} [applicationRate] of the product
 * @property {number} [waterToMixRatio] - water:mix ratio
 * @property {string} [plantLocation]
 * @property {number} [entryInterval] - how long before the field can be entered
 * @property {Object} [harvestInterval] - how long before it can be 
 * consumed by humans
 */
export default class ChemicalTask extends Task {
	static get tableName() {return 'ChemicalTask'}
	static get label() {return 'chemical-tasks'}

	/** @type {Date} how long before the field can be entered */
	get entryInterval() {return new Date(this.entry_interval)}
	set entryInterval(date) {this.entry_interval = date.getTime()}

	/** 
	 * @type {Date} how long before it can be consumed by humans 
	 */
	get harvestInterval() {return new Date(this.harvest_interval)}
	set harvestInterval(date) {this.harvest_interval = date.getTime()}

	static get jsonSchema() {
		return {
			type: 'object',
			properties: Object.assign({}, super.jsonSchema.properties, {
				product: {type: 'integer'},
				type: {type: 'string'},
				applicationRate: {type: 'number'},
				waterToMixRatio: {type: 'number'},
				plantLocation: {type: 'string'},
				entry_interval: {type: 'number'},
				harvest_interval: {type: 'number'},
			})
		}
	}

	static get relationMappings() {
		return Object.assign({
			chemProduct: {
				relation: Model.OneToOneRelation,
				modelClass: Chemical,
				join: {
					from: 'ChemicalTask.product',
					to: 'Chemical.id'
				}
			}
		}, super.relationMappings);
	}
}

const percentageSchema = {
	type: 'number',
	minimum: 0, maximum: 1
}

/**
 * Task for fertilizing a field
 * @alias module:app/models.Fertilizing
 * @extends module:app/models.ChemicalTask
 * @property {string} [type] - one of compost or NPK
 * @property {string} [plantLocation] - one of spot or broadcast
 * @property {number} [tc] - percentage of TC
 * @property {number} [n03] - percentage of N03
 * @property {number} [nh4] - percentage of NH4
 * @property {number} [k20] - percentage of K20
 * @property {number} [p205] - percentage of P205
 */
export class Fertilizing extends ChemicalTask {
	static get tableName() {return 'Fertilizing'}
	static get label() {return 'fertilizing'}

	static get jsonSchema() {
		return {
			type: 'object',
			properties: Object.assign({}, super.jsonSchema.properties, {
				type: {
					type: 'string',
					oneOf: ['compost', 'npk']
				},
				plantLocation: {
					type: 'string',
					oneOf: ['spot', 'broadcast']
				},
				tc: percentageSchema,
				n03: percentageSchema,
				nh4: percentageSchema,
				k20: percentageSchema,
				p205: percentageSchema
			})
		}
	}
}

/**
 * Task for pest control for a field
 * @alias module:app/models.PestControl
 * @extends module:app/models.ChemicalTask
 * @property {string} [type] - one of spray or biocontrol
 * @property {string} [plantLocation] - one of foliar or root
 * @property {Object} [activeIngredients]
 * @property {number} [percentOfActiveIngredients]
 */
export class PestControl extends ChemicalTask {
	static get tableName() {return 'PestControl'}
	static get label() {return 'pest-control'}

	static get jsonSchema() {
		return {
			type: 'object',
			properties: Object.assign({}, super.jsonSchema.properties, {
				type: {
					type: 'string',
					oneOf: ['spray', 'biocontrol']
				},
				plantLocation: {
					type: 'string',
					oneOf: ['foliar', 'root']
				},
				activeIngredients: {type: 'object'},
				percentOfActiveIngredients: percentageSchema
			})
		}
	}
}