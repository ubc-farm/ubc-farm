import { getLocations, getPlants, Field } from '@ubc-farm/databases';

/**
 * Creates a map of crop varieties and their total quantity in the farm.
 */
async function getCropQuantities(
	fieldDB: PouchDB.Database<Field>
): Promise<Map<string, number>> {
	// Get all documents with a crop property
	const { docs } = await fieldDB.find({
		selector: { crop: { $exists: true } },
		fields: ['crop.variety', 'crop.quantity'],
	});

	const amountsOfCrops = new Map<string, number>();
	for (const doc of docs) {
		// Skip items without a variety property
		if (!doc.crop || !doc.crop.variety) continue;
		const { variety, quantity = 0 } = doc.crop;

		// Add the quantity to the total quantity calculated so far for this
		// crop variety
		let totalSoFar = amountsOfCrops.get(variety) || 0;
		totalSoFar += quantity;
		amountsOfCrops.set(variety, totalSoFar);
	}

	return amountsOfCrops;
}

/**
 * Calculates the total calories generated in the farm, using data about plants
 * and their quantities in the farm.
 */
export default async function calculateFarmCalorieCount() {
	const [fieldDB, plantDB] = await Promise.all([getLocations(), getPlants()]);
	const cropAmounts = await getCropQuantities(fieldDB);

	const { rows } = await plantDB.allDocs({
		keys: [...cropAmounts.keys()],
		include_docs: true,
	});

	return rows.map(plant => {
		if (!plant.doc)
			throw new Error('Missing doc property. Did you use `include_docs`?');

		return {
			plant: plant.doc.commodity,
			calories: plant.doc.energy * (cropAmounts.get(plant.id) || 0),
		};
	})
	.sort((a, b) => a.calories - b.calories);
}
