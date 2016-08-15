import test from 'tape';
import required from '../required'

test('required', t => {
	t.plan(4);

	function simpleFunc(foo = required()) {}
	try {
		simpleFunc();
		t.fail('Error did not throw')
	} catch (e) {
		t.assert(e instanceof TypeError, 'TypeError threw for missing parameter')
	}

	try {
		simpleFunc('bar');
		t.pass(`Error didn't throw since the parameter was specified`)
	} catch (e) {
		t.fail('Error threw despite the parameter being specified')
	}

	function complexFunc(a = required(), options) {}
	try {
		complexFunc(undefined);
		t.fail('Error did not throw when passed undefined as the parameter')
	} catch (e) {
		t.assert(e instanceof TypeError, 'TypeError threw for undefined parameter')
	}

	try {
		complexFunc('b');
		t.pass("Error didn't throw for the specified parameter and " 
			+ "unspecified optional parameter");
	} catch(e) {
		t.fail('Error threw despite required parameter being specified')
	}
})

test('required message', t => {
	t.plan(2);

	function func(foo = required('foo')) {}
	try {
		foo();
	} catch (e) {
		t.assert(e.toString().includes('foo'), 
			'Error message contains message parameter');
		t.assert(e.toString().includes(' foo'), 
			'Error message contains space between default message and parameter');
	}
})