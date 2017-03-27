import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import TableBase, { Column } from '@ubc-farm/table-base';
import { startCase } from 'lodash-es';

const DirectoryBase = ({ tableData, onHeaderClick, headerClassNames = {} }) => (
	<TableBase tableData={tableData} keyField="_id">
		<Column
			field="role"
			format={startCase}
			onHeaderClick={() => onHeaderClick('role')}
			headerClassName={headerClassNames.role}
		>
			ID
		</Column>
		<Column
			field="email"
			onHeaderClick={() => onHeaderClick('email')}
			headerClassName={headerClassNames.email}
		>
			Email
		</Column>
		<Column
			field="phoneNumber"
			format={(phone) => {
				if (phone && phone.length >= 10) {
					const p = phone.slice(-10);
					const prefix = phone.slice(0, -10);

					const number = `(${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6, 10)}`;
					return prefix ? `+${prefix} ${number}` : number;
				} else {
					return phone;
				}
			}}
			onHeaderClick={() => onHeaderClick('phoneNumber')}
			headerClassName={headerClassNames.phoneNumber}
		>
			Phone
		</Column>
		<Column
			field="addressMailing"
			format={(addressMailing, { addressPhysical }) => {
				const address = addressMailing || addressPhysical;
				if (typeof address === 'string' || address == null) return address;

				const { addressLocality, addressRegion, postalCode } = address;
				return [
					address.streetAddress,
					`${addressLocality}, ${addressRegion} ${postalCode}`,
				].join('\n');
			}}
			onHeaderClick={() => onHeaderClick('addressMailing')}
			headerClassName={headerClassNames.address}
		>
			Address
		</Column>
	</TableBase>
);

DirectoryBase.propTypes = {
	tableData: PropTypes.arrayOf(PropTypes.object),
	onHeaderClick: PropTypes.func.isRequired,
	headerClassNames: PropTypes.shape({
		role: PropTypes.string,
		email: PropTypes.string,
		phoneNumber: PropTypes.string,
		address: PropTypes.string,
	}),
}

export default DirectoryBase;
