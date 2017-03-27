import { snakeCase } from 'lodash-es';
import { id } from '@ubc-farm/utils';
import { floatToCents } from '@ubc-farm/money';
import { person } from './uris.js';

export default function transform(input) {
	const role = snakeCase(input.role);
	const base = Object.assign(
		{ _id: person({ id: id(''), role }) },
		input,
		{ role }
	);

	switch (base.role) {
		case 'employee':
			return Object.assign(base, {
				pay: floatToCents(base.pay),
			});

		case 'researcher':
			return Object.assign(base, {
				coursesTaught: typeof base.coursesTaught === 'string'
					? coursesTaught
					: coursesTaught.split(/\\r?\\n/),
			});

		default: return base;
	}
}
