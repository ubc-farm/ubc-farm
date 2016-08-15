import {Model} from 'objection';
import {Person as Company, Equipment} from '../index.js';

/**
 * Stores data about a type of item, such as its worth. More specific data,
 * like the quantity and storage location, is found in the Equipment table.
 * Items are meant to be reference information about any type of item rather
 * than a specific tractor or single apple.
 * @alias module:app/models.Item
 * @property {string} [name]
 * @property {string} [sku]
 * @property {string} [barcode]
 * @property {string} [supplierId] - id of the supplier of this item
 * @property {Object} [lifespan] - interval representing lifespan
 * @property {number} [value] - monentary value
 * @property {number} [salvageValue] 
 */
export default class Item extends Model {
	static get tableName() {return 'Item'}
	static get label() {return 'items'}

	static get relationMappings() {
		return {
			/** 
			 * Info about the supplier
			 * @type {module:app/models.Person}
			 * @memberof! module:app/models.Item# 
			 */
			supplier: {
				relation: Model.OneToOneRelation,
				modelClass: Company,
				join: {
					from: 'Item.supplierId',
					to: 'Person.id'
				}
			},
			/** 
			 * Equipment instances of this Item
			 * @type {module:app/models.Equipment[]}
			 * @memberof! module:app/models.Item# 
			 */
			equipment: {
				relation: Model.OneToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'Item.id',
					to: 'Equipment.product'
				}
			}
		}
	}
}
