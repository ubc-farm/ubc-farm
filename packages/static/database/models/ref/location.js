import {Model} from 'objection';
import {Field} from '../index.js';
import {Position} from '../../../utils/geojson.js';

/**
 * Represents a location. If field is specified, this location represents that
 * field.
 * @alias module:app/models.Location
 * @property {string} [name]
 * @property {float[]} [position] - a coordinate expressed as [x, y]
 * @property {string} [fieldId]
 */
export default class Location extends Model {
	static get tableName() {return 'Location'}
	static get label() {return 'locations'}

	/** @type {module:lib/geojson.Position} */
	get coord() {return Position.from(this.position);}
	set coord(value) {this.position = value.toJSON();}

	static get relationMappings() {
		return {
			field: {
				relation: Model.OneToOneRelation,
				modelClass: Field,
				join: {
					from: 'Location.fieldId',
					to: 'Field.id'
				}
			}
		}
	}
}