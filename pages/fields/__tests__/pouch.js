jest.mock('../src/db.js', () => ({
	changes() {
		return { on: () => {} };
	},
	find() {
		const docs = [
			{
				_id: 'first',
				geometry: { type: 'Polygon' },
				_rev: 'abcd-efgh',
			},
		];
		return { docs };
	}
}));

describe('pouch', () => {
	test('importFields', () => {

	});

	test('watchChanges', () => {

	});
});
