import {Model} from 'objection';
import {Polygon} from '../../utils/geojson.js';
import {Plant, Scouting} from './index.js';

/**
 * Represents a field or sub-field in the farm with crops. If parentField is 
 * specified, the field is a sub-field. 
 * @alias module:app/models.Field
 * @property {float[][]} path - [x,y] coordinates of the field's path
 * @property {float[]} [gridWidths]
 * @property {float[]} [gridHeights]
 * @property {string} [parent] field id
 */
export default class Field extends Model {
	static get tableName() {return 'Field'}
	static get label() {return 'fields'}

	/** @type {module:lib/geojson.Polygon} */
	get polygon() {return new Polygon(this.path);}
	set polygon(value) {this.path = value.toJSON().coordinates;}

	get grid() {
		const [baseWidth, ...specificWidths] = this.gridWidths;
		const [baseHeight, ...specificHeights] = this.gridHeights;
		return {
			baseWidth, baseHeight,
			specificWidths, specificHeights
		};
	}

	static get relationMappings() {
		return {
			/** 
			 * Crops growing in this field
			 * @memberof! module:app/models.Field# 
			 * @type {module:app/models.Crop}
			 */
			crops: {
				relation: Model.OneToManyRelation,
				modelClass: Crop,
				join: {
					from: 'Field.id',
					to: 'Crop.fieldId'
				}
			},
			/** 
			 * The containing field, if applicable 
			 * @memberof! module:app/models.Field#
			 * @type {module:app/models.Field}
			 */
			parentField: {
				relation: Model.OneToOneRelation,
				modelClass: Field,
				join: {
					from: 'Field.parent',
					to: 'Field.id'
				}
			},
			/** 
			 * Fields within this one, if applicable
			 * @memberof! module:app/models.Field#
			 * @type {module:app/models.Field[]} 
			 */
			childFields: {
				relation: Model.OneToManyRelation,
				modelClass: Field,
				join: {
					from: 'Field.id',
					to: 'Field.parent'
				}
			}
		}
	}
}

/**
 * Data for a crop growing in a field, including the type of plant it it and
 * historical data like scouting.
 * @alias module:app/models.Crop
 * @property {string} type of plant growing in this field.
 * @property {string} fieldId of the field this crop grows in
 * @property {string} predictedNutrientReq - predicted nutrient requirements
 * @proeprty {Date} [expectedHarvest]
 */
export class Crop extends Model {
	static get tableName() {return 'Crop'}

	static get jsonSchema() {return {
		type: 'object',
		properties: {
			type: {type: 'string'},
			fieldId: {type: 'integer'},
			quantity: {type: 'integer'}
		}
	}}

	static get relationMappings() {
		return {
			/** 
			 * The type of plant
			 * @memberof! module:app/models.Crop#
			 * @type {module:app/models.Plant} 
			 */
			variety: {
				relation: Model.OneToOneRelation,
				modelClass: Plant,
				join: {
					from: 'Crop.type',
					to: 'Plant.id'
				}
			},
			/** 
			 * The field this crop grows in
			 * @memberof! module:app/models.Crop#
			 */
			field: {
				relation: Model.OneToOneRelation,
				modelClass: Field,
				join: {
					from: 'Crop.fieldId',
					to: 'Field.id'
				}
			},
			/** 
			 * Scouting logs
			 * @memberof! module:app/models.Crop# 
			 */
			scouting: {
				relation: Model.OneToManyRelation,
				modelClass: Scouting,
				join: {
					from: 'Crop.id',
					to: 'Scouting.crop'
				}
			}
		}
	}
}