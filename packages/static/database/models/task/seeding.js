import {Model} from 'objection';
import Task from './task.js';
import {Crop, Plant, Item} from '../index.js';

/**
 * Task for seeding and transplating
 * @alias module:app/models.Seeding
 * @extends module:app/models.Task
 * @property {string} crop affected/created by this task
 * @property {string} [variety] of plant
 * @property {string} [product] name of seed bags/product
 * @property {string} [methodUsed] - one of broadcast/direct drill
 * @property {Object} [spacingBetweenHoles] - expressed as {width, height} in cm
 * @property {float} [depthOfHoles] in cm
 * @property {float} [seedsPerHole]
 * @property {float} [gramsApplied] - amount applied to area
 * @property {float} [germinationPercentage] - between 0 and 1
 * @property {float} [seedsPerGram]
 * @property {float} [predictedYield] in kg
 * @property {Object} [daysToMaturity] - an interval
 * @property {Object} [npkReq] - Required N, P, and K amounts
 */
export default class Seeding extends Task {
	static get tableName() {return 'Seeding'}
	static get label() {return 'seeding'}

	/**
	 * @param {number} area as m^2
	 * @returns {number} amount of holes in given area
	 */
	getNumberOfHoles(area) {
		const cmSquared = this.spacingBetweenHoles.x * this.spacingBetweenHoles.y;
		return area / (cmSquared * 1e-4);
	}

	/**
	 * @param {number} area as m^2
	 * @returns {number} density of seeds
	 */
	getDensity(area) {
		if (this.seedsPerHole && this.spacingBetweenHoles) {
			return (
				this.getNumberOfHoles(area) * 
				this.seedsPerHole * 
				this.germinationPercentage
			) / area;
		} else if (this.seedsPerGram && this.gramsApplied) {
			return (
				this.seedsPerGram *
				this.gramsApplied *
				this.germinationPercentage
			) / area;
		} 
	}

	static get relationMappings() {
		return Object.assign({
			seeded: {
				relation: Model.OneToOneRelation,
				modelClass: Crop,
				join: {
					from: 'Seeding.crop',
					to: 'Crop.id'
				}
			},
			seedVariety: {
				relation: Model.OneToOneRelation,
				modelClass: Plant,
				join: {
					from: 'Seeding.variety',
					to: 'Plant.id'
				}
			},
			seedProduct: {
				relation: Model.OneToOneRelation,
				modelClass: Item,
				join: {
					from: 'Seeding.product',
					to: 'Item.id'
				}
			}
		}, super.relationMappings);
	}
}