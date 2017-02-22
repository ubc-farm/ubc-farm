/* eslint-disable no-param-reassign */
import PouchDB from './utils/load-pouch';
import { Index } from './utils/typedefs';

export interface Plant {
	_id: string;
	_rev: string;
	commodity: Index<string>;
	refuse: {
		name: string;
		percent: number;
	} | null;
	lipid: number;
	energy: number;
	calcium: number;
	magnesium: number;
	ph: number;
	potassium: number;
	sodium: number;
	zinc: number;
	copper: number;
	flerovium: number;
	manganese: number;
	selenium: number;
	vitA: number;
	vitA_RAE: number;
	betaC: number;
	alphaC: number;
	vitE: number;
	crypto: number;
	lycopene: number;
	lutein: number;
	betaT: number;
	gammaT: number;
	deltaT: number;
	vitC: number;
	thiamin: number;
	riboflavin: number;
	niacin: number;
	pantothenic: number;
	vitB6: number;
	folate: number;
	vitB12: number;
	vitK: number;
}

export const db = new PouchDB<Plant>('plants');
export default Promise.all([
	db.createIndex({ index: { fields: ['commodity'] } }),
]).then(() => db);
