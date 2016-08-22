import test from 'tape';
import {domready, isReady} from '../'

test('domReady', {
	skip: typeof document === 'undefined'
}, t => {
	t.plan(2);
	domready.then(() => {
		if (document.readyState == 'interactive' 
		|| document.readyState == 'complete') {
			t.pass('Resolves when document is interactive');
		} else {
			t.fail('Resolved before document was ready')
		}
	})

	isReady(document).then(() => {
		if (document.readyState == 'interactive' 
		|| document.readyState == 'complete') {
			t.pass('Resolves when given document is interactive');
		} else {
			t.fail('Resolved before given document was ready')
		}
	})
})

test('isReady (already ready)', t => {
	t.plan(1);
	const objectWithReadyStateInteractive = {
		readyState: 'interactive'
	};

	isReady(objectWithReadyStateInteractive).then(() => {
		t.pass('Resolves for readystate interactive')
	});
})

test('isReady (ready event)', {
	skip: typeof Event === 'undefined'
}, t => {
	t.plan(1);
	let objectWithReadyStateLoading = {
		readyState: 'loading'
	};
	const readystatechange = new Event('readystatechange');

	isReady(objectWithReadyStateLoading).then(() => {
		t.pass('Reponds to readystatechange event')
	})

	objectWithReadyStateLoading.readyState = 'complete';
	objectWithReadyStateLoading.dispatchEvent(readystatechange);
})