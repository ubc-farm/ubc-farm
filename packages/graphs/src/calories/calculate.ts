import { getLocations, getPlants, Field } from '@ubc-farm/databases';

/**
 * Creates a map of crop varieties and their total quantity in the farm.
 */
async function getCropQuantities(
	fieldDB: PouchDB.Database<Field>
): Promise<Map<string, number>> {
	const { docs } = await fieldDB.find({
		selector: { crop: { $exists: true } },
		fields: ['crop.variety', 'crop.quantity'],
	});

	return docs.reduce((map, doc: Field) => {
		const { variety, quantity = 0 } = doc.crop;
		if (!variety) return map;

		return map.set(variety, (map.get(variety) || 0) + quantity);
	}, new Map());
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

	return rows.map(plant => ({
		plant: plant.commodity,
		calories: plant.energy * (cropAmounts.get(plant._id) || 0),
	}))
	.sort((a, b) => a.calories - b.calories);
}
