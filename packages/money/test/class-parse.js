import test from 'tape';
import Money from '../src/index.js';

test('Returns NaN for unsupported types', t => {
	t.ok(isNaN(new Money()), 'undefined value is NaN');
	t.ok(isNaN(new Money(undefined)), 'undefined value is NaN');

	t.ok(isNaN(new Money(null)), 'null is NaN');

	t.ok(isNaN(new Money(false)), 'boolean false is NaN');
	t.ok(isNaN(new Money(true)), 'boolean true is NaN');

	t.ok(isNaN(new Money(Symbol())), 'symbol is NaN');

	t.end();
});

test('Converts number types', t => {
	t.equal(new Money(0).value, 0, 'value is 0 cents for parameter 0');
	t.equal(new Money(1).value, 100, 'value is 100 cents for parameter 1');

	t.equal(new Money(1.99).value, 199, 'value is 199 cents for param 1.99');
	t.equal(new Money(2.509).value, 250.9, 'Fractional cents result in a fractional money value');

	t.equal(new Money(-1).value, -100, 'value is -100 cents for param -1');
	t.equal(new Money(-1.1234).value, -112.34, 'Negative fractional cents are parsed properly');

	t.end();
});

test('Converts string types', t => {
	t.equal(new Money('0').value, 0, '0 string returns 0');
	t.equal(new Money('3').value, 300, 'string 3 returns 300 cents');

	t.equal(new Money('-1').value, -100, 'string -1 returns -100 cents');
	t.equal(new Money('(1)').value, -100, 'numbers wrapped in parenthesis are negative');

	t.equal(new Money('$1.00').value, 100, 'non-number (besides -, (, ), and .) are stripped');

	t.equal(new Money('1.999').value, 199.9, 'fractional cent strings work properly');

	t.equal(new Money('1.2.3.4').value, 123.4, 'extra decimal points after the first are removed');

	t.equal(new Money('2.9').value, 290, 'Smaller fractions are parsed correctly');

	t.end();
});

test('Tries to use valueOf()', t => {
	const fixture = { valueOf: () => 0 };

	function fixtureFunc() {}
	fixtureFunc.valueOf = () => '0';

	t.equal(new Money(fixture).value, 0, 'valueOf function is called for objects');
	t.equal(new Money(fixtureFunc).value, 0, 'valueOf function is called for functions');

	t.end();
});
