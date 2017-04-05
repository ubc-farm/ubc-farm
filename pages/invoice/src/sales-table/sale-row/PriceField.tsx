import { createElement, SFC } from 'react'; /** @jsx createElement */
import { salePrice, Sale } from '@ubc-farm/databases';
import { centsToString } from '@ubc-farm/money';

const PriceField: SFC<{ sale: Sale }> = ({ sale }) => (
	<td className="price-col">
		{centsToString(salePrice(sale))}
	</td>
);

export default PriceField;
