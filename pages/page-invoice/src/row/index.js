import { createElement, PropTypes } from 'react'; /** @jsx createElement */

import Row from './row.js';
import ItemField from './item.js';
import DescriptionField from './description.js';
import UnitCostField from './unitcost.js';
import QuantityField from './quantity.js';
import PriceDisplay from './price.js';
import RenderRows from './body.js';

export const RowContainer = ({ member, index }) => (
	<Row parentIndex={index}>
		<ItemField parent={member} />
		<DescriptionField parent={member} />
		<UnitCostField parent={member} />
		<QuantityField parent={member} />
		<PriceDisplay parent={member} />
	</Row>
);

RowContainer.propTypes = {
	member: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
};

export default props => <RenderRows {...props} component={RowContainer} />;
