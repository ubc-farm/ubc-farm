import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import NumEmployed from '../src/long-term/NumEmployed.tsx';
import Sales from '../src/long-term/Sales.tsx';
import data from './demo-data.js';

function wrapDiv(story) {
	return <div>{story()}</div>;
}

storiesOf('NumEmployed', module)
	.addDecorator(wrapDiv)
	.add('demo data', () => (
		<NumEmployed data={data} />
	));

storiesOf('Sales', module)
	.addDecorator(wrapDiv)
	.add('demo data', () => (
		<Sales data={data} />
	));
