import {Model} from 'objection';
import {Sale, Item} from '../index.js';

/**
 * Used to represent a person or company, such as employees and customers. Can
 * be linked to a user account.
 * @alias module:app/models.Person
 * @property {string} name
 * @property {string} [role] of the person
 * @property {string} [email] - email address
 * @property {string} [phoneNumber]
 * @property {Object} [addressMailing], following addressSchema
 * @property {Object} [addressPhysical], following addressSchema
 */
export default class Person extends Model {
	static get tableName() {return 'Person'}
	static get label() {return 'people'}

	static get jsonSchema() {return {
		type: 'object',
		required: ['name'],
		properties: {
			id: {type: 'integer'},
			name: {type: 'string'},
			role: {
				type: 'string'
			},
			email: {
				type: 'string',
				pattern: '\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b',
				format: 'email'
			},
			phoneNumber: {
				type: 'string',
				minLength: 5,
				maxLength: 15
			},
			addressMailing: addressSchema,
			addressPhysical: addressSchema
		}
	}}

	static get relationMappings() {
		return {
			purchases: {
				relation: Model.OneToManyRelation,
				modelClass: Sale,
				join: {
					from: 'Person.id',
					to: 'Sale.customer'
				}
			},
			products: {
				relation: Model.OneToManyRelation,
				modelClass: Item,
				join: {
					from: 'Person.id',
					to: 'Item.supplier'
				}
			}
		}
	}
}

/**
 * Schema for objects used to represent an address.
 * @alias module:app/models.Person~addressSchema
 */
const addressSchema = {
	type: 'object',
	properties: {
		street: {type: 'string'},
		city: {type: 'string'},
		province: {type: 'string'},
		postalCode: {type: 'string', maxLength: 6},
		text: {type: 'string'}
	}
}