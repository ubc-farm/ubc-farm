import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import NumEmployed from '../src/long-term/NumEmployed.tsx';
import Sales from '../src/long-term/Sales.tsx';
import data from './demo-data.js';

storiesOf('NumEmployed', module)
	.add('demo data', () => (
		<NumEmployed data={data} />
	));

storiesOf('Sales', module)
	.add('demo data', () => (
		<Sales data={data} />
	));
