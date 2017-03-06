/* eslint-disable no-param-reassign */
import PouchDB from './utils/load-pouch';
import { ID, Cents, DateNum } from './utils/typedefs';
import moment from 'moment';

// TODO may need to modify
interface Item {
	label?: string;
	product?: string;
	description?: string;
	unit?: string;
	lifeSpan?: moment.Duration;
	salvageValue?: Cents;
	barcode?: string;
	supplier?: string;
	sku?: string;
	quantity?: number;
	entryDate?: DateNum;
	location?: ID;
}

interface Fertilizer extends Item {
	label: 'fertilizer';
	composition?: {
		tc?: number;
		n03?: number;
		nh4?: number;
		k20?: number;
		p205?: number;
	};
	h20MixRatio?: string;
}

interface Pesticide extends Item {
	label: 'pesticide';
	activeIngredients?: { [ingredient: string]: number };
	applicationLocation?: string;
	h20MixRatio?: string;
	entryInterval?: moment.Duration;
	harvestInterval?: moment.Duration;
}

interface Seeds extends Item {
	label: 'seeds';
	spacing?: {
		width?: number
		length?: number
	},
	depth?: number
	seedsPerHole?: string
	daysToMaturity?: number
	predictedYield?: number
	nutrientRequiement?: {
		n?: number
		p?: number
		k?: number
	}
}

export interface Equipment extends Item {
	_id: ID;
	_rev: string;
	name?: string;
	label: 'equipment';
}

export default async function getEquipment() {
	const db = new PouchDB<Equipment>('equipment');
	await Promise.all([
		db.createIndex({ index: { fields: ['name'] } }),
	]);

	return db;
}
