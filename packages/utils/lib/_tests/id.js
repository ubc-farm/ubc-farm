import { id } from '../';

test('Unique ID generation', () => {
	const generated = new Set();

	for (let i = 0; i < 100; i++) {
		const newId = id();
		expect(generated.has(newId)).toBeFalsy();
		generated.add(newId);
	}
});
