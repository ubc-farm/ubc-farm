import {Model} from 'objection';
import Person from './person.js';

/**
 * Represents a researcher working at the farm. Extends person with extra
 * faculty data, and links to ResearchProjects.
 * @alias module:app/models.Researcher
 * @extends module:app/models.Person
 * @property {string} [position]
 * @property {string} [faculty] such as 'Land and Food Systems' or 'Science'
 * @property {string} [department] such as 'Applied Biology' or 'Mathematics'
 * @property {string} [labWebsite]
 * @property {string} [expertise]
 * @property {string[]} [coursesTaught]
 * @property {string} [projects]
 */
export default class Researcher extends Person {
	static get tableName() {return 'Researcher'}
	static get label() {return 'researchers'}

	static get relationMappings() {
		return Object.assign({
			/** 
			 * Projects where this researcher is a lead 
			 * @memberof! module:app/models.Researcher#
			 * @type {module:app/models.ResearchProject[]}
			 */
			projects: {
				relation: Model.OneToManyRelation,
				modelClass: ResearchProject,
				join: {
					from: 'Researcher.id',
					to: 'ResearchProject.researcher'
				}
			},
			/** 
			 * Projects where this researcher is a partner
			 * @memberof! module:app/models.Researcher# 
			 * @type {module:app/models.ResearchProject[]}
			 */
			partnerProjects: {
				relation: Model.ManyToManyRelation,
				modelClass: ResearchProject,
				join: {
					from: 'Researcher.id',
					through: {
						modelClass: ResearchPartner,
						from: 'ResearchPartner.person',
						to: 'ResearchPartner.project'
					},
					to: 'ResearchProject.id'
				}
			}
		}, super.relationMappings);
	}
}

/**
 * Represents a research project at the farm, with a lead researcher and 
 * possible partner researchers and members.
 * @alias module:app/models.ResearchProject
 * @property {string} researcher - id of the lead researcher
 * @property {string} [title] of the project
 * @property {Date[]} [date] - range indicating start and end date of project
 * @property {number} [postDocs=0], number of
 * @property {number} [phds=0], number of
 * @property {number} [masters=0], number of
 * @property {number} [bachelors=0], number of
 * @property {number} [others=0] - number of other people working on the project
 * @property {number} [grantValue] 
 * @property {string} [grantSource]
 * @property {string[]} [publications=[]]  
 */
export class ResearchProject extends Model {
	static get tableName() {return 'ResearchProject'}

	/**
	 * @returns {number} the total number of members working on the project
	 */
	memberCount() {
		return this.postDocs + this.phds 
		     + this.masters + this.bachelors
				 + this.others;
	}

	static get relationMappings() {
		return {
			/** 
			 * Link to the lead researcher
			 * @type {module:app/models.Researcher}
			 * @memberof! module:app/models.ResearchProject#
			 */
			lead: {
				relation: Model.OneToOneRelation,
				modelClass: Researcher,
				join: {
					from: 'ResearchProject.researcher',
					to: 'Researcher.id'
				}
			},
			/** 
			 * Links to the partner researchers
			 * @type {module:app/models.Researcher}
			 * @memberof! module:app/models.ResearchProject# 
			 */
			partners: {
				relation: Model.ManyToManyRelation,
				modelClass: Researcher,
				join: {
					from: 'ResearchProject.id',
					through: {
						modelClass: ResearchPartner,
						from: 'ResearchPartner.project',
						to: 'ResearchPartner.person'
					},
					to: 'Researcher.id'
				}
			}
		}
	}
}

/**
 * Helper table to join ResearchProjects with their partner Researchers
 */
export class ResearchPartner extends Model {
	static get tableName() {return 'ResearchPartner'}

	static get relationMappings() {
		return {
			researcher: {
				relation: Model.OneToManyRelation,
				modelClass: Researcher,
				join: {
					from: 'ResearchPartner.person',
					to: 'Researcher.id'
				}
			},
			researchProject: {
				relation: Model.OneToManyRelation,
				modelClass: ResearchProject,
				join: {
					from: 'ResearchPartner.project',
					to: 'ResearchProject.id'
				}
			}
		}
	}
}