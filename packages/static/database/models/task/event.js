import {Model} from 'objection';
import Task from './task.js';
import {Sale, Person} from '../index.js';

/**
 * Represents an event held at the farm
 * @alias module:app/models.Event
 * @extends Task
 * @property {string} [type]
 * @property {string} name of the event
 * @property {number} [estimatedAttendeeAmount]
 * @property {number[]} [targetAgeGroup] - int4range
 * @property {string} [ticketId] - id for sale data for tickets to this event
 * @property {string} [contactId] - id for the person to contact for this event
 */
export default class Event extends Task {
	static get tableName() {return 'Event'}
	static get label() {return 'events'}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['start_time', 'end_time'],
			properties: Object.assign({}, super.jsonSchema.properties, {
				type: {type: 'string'},
				name: {type: 'string'},
				estimatedAttendeeAmount: {type: 'integer'},
				targetAgeGroup: {type: 'array'},
				ticketId: {type: 'integer'},
				contactId: {type: 'integer'}
			})
		}
	}

	static get relationMappings() {
		return Object.assign({
			/** 
			 * Contains ticket sale data for this event
			 * @memberof! module:app/models.Event#
			 * @type {module:app/models.Sale} 
			 */
			ticket: {
				relation: Model.OneToOneRelation,
				modelClass: Sale,
				join: {
					from: 'Event.ticketId',
					to: 'Sale.id'
				}
			},
			/** 
			 * Represents a person to contact about this event
			 * @memberof! module:app/models.Event#
			 * @type {module:app/models.Person} 
			 */
			contact: {
				relation: Model.OneToOneRelation,
				modelClass: Person,
				join: {
					from: 'Event.contactId',
					to: 'Person.id'
				}
			}
		}, super.relationMappings);
	}
}