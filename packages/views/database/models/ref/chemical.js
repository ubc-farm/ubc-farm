import {Model} from 'objection';
import {ChemicalTask} from '../index.js';

/**
 * A chemical product, such as fertilizer or herbicide.
 * @alias module:app/models.Chemical
 * @property {string} [type] - fertilizer/pest control/etc
 * @property {string} [productName]
 * @property {Object} [composition]
 */
export default class Amendment extends Model {
	static get tableName() {return 'Chemical'}
	static get label() {return 'chemicals'}

	static get relationMappings() {
		return {
			/** 
			 * Tasks where the chemical is used
			 * @memberof! module:app/models.Chemical#
			 * @type {module:app/models.ChemicalTask[]} 
			 */
			usage: {
				relation: Model.OneToManyRelation,
				modelClass: ChemicalTask,
				join: {
					from: 'Chemical.id',
					to: 'ChemicalTask.product'
				}
			}
		}
	}
}