/* eslint-disable no-param-reassign */
// import csvFileToPouch from 'csv-to-pouch';
import Pouch from './utils/load-pouch';
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
	iron: number;
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
	pollDep: number;
}

function convertRow(row: { [key: string]: string }): Plant {
	let refuse;
	if (row.Refuse === 'NA') {
		refuse = null;
	} else {
		refuse = { name: row.Refuse, percent: parseFloat(row.Percentrefuse) / 100 };
	}

	return {
		_id: row['Crop map file name'],
		_rev: '',
		commodity: row.Commodity,
		refuse,
		lipid: parseFloat(row.Lipid),
		energy: parseFloat(row.Energy),
		calcium: parseFloat(row.Ca),
		iron: parseFloat(row.Fe),
		magnesium: parseFloat(row.Mg),
		ph: parseFloat(row.Ph),
		potassium: parseFloat(row.K),
		sodium: parseFloat(row.Na),
		zinc: parseFloat(row.Zn),
		copper: parseFloat(row.Cu),
		flerovium: parseFloat(row.Fl),
		manganese: parseFloat(row.Mn),
		selenium: parseFloat(row.Se),
		vitA: parseFloat(row.VitA),
		vitA_RAE: parseFloat(row.VitA_RAE),
		betaC: parseFloat(row.betaC),
		alphaC: parseFloat(row.alphaC),
		vitE: parseFloat(row.VitE),
		crypto: parseFloat(row.Crypto),
		lycopene: parseFloat(row.Lycopene),
		lutein: parseFloat(row.Lutein),
		betaT: parseFloat(row.betaT),
		gammaT: parseFloat(row.gammaT),
		deltaT: parseFloat(row.deltaT),
		vitC: parseFloat(row.VitC),
		thiamin: parseFloat(row.Thiamin),
		riboflavin: parseFloat(row.Riboflavin),
		niacin: parseFloat(row.Niacin),
		pantothenic: parseFloat(row.Pantothenic),
		vitB6: parseFloat(row.VitB6),
		folate: parseFloat(row.Folate),
		vitB12: parseFloat(row.VitB12),
		vitK: parseFloat(row.VitK),
		pollDep: parseFloat(row['poll.dep']),
	};
}

export default async function getPlants(prefix = '', PouchDB = Pouch) {
	const db = new PouchDB<Plant>(prefix + 'plants');
	await Promise.all([
		db.createIndex({ index: { fields: ['commodity'] } }),
	]);

	const { total_rows } = await db.allDocs({ limit: 0 });
	if (total_rows > 0) return db;

	// TODO: Load CSV data into the plant database
	return db;
}

