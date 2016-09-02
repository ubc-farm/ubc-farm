import test from 'tape';
import { stringToCents, floatToCents } from '../src/index.js';

test('Converts number types', t => {
	t.equal(floatToCents(0), 0, 'value is 0 cents for parameter 0');
	t.equal(floatToCents(1), 100, 'value is 100 cents for parameter 1');

	t.equal(floatToCents(1.99), 199, 'value is 199 cents for param 1.99');
	t.equal(floatToCents(2.509, { trunc: false }), 250.9,
		'Fractional cents result in a fractional money value');

	t.equal(floatToCents(-1), -100, 'value is -100 cents for param -1');
	t.equal(floatToCents(-1.1234, { trunc: false }), -112.34,
		'Negative fractional cents are parsed properly');

	t.end();
});

test('Converts string types', t => {
	t.equal(stringToCents('0'), 0, '0 string returns 0');
	t.equal(stringToCents('3'), 300, 'string 3 returns 300 cents');

	t.equal(stringToCents('-1'), -100, 'string -1 returns -100 cents');
	t.equal(stringToCents('(1)'), -100,
		'numbers wrapped in parenthesis are negative');

	t.equal(stringToCents('$1.00'), 100,
		'non-number (besides -, (, ), and .) are stripped');

	t.equal(stringToCents('1.999', { trunc: false }), 199.9,
		'fractional cent strings work properly');

	t.equal(stringToCents('1.2.3.4', { trunc: false }), 123.4,
		'extra decimal points after the first are removed');

	t.equal(stringToCents('2.9'), 290, 'Smaller fractions are parsed correctly');

	t.end();
});
