import {createElement} from 'react'; /** @jsx createElement */
import {Column} from 'ubc-farm-table-base';
import {Money} from 'ubc-farm-utils';

export const name = new Column({columnKey: 'name', compareFunc: true});

export const icon = new Column({
	columnKey: 'icon',
	title: '',
	compareFunc: true,
	toElement(value) {
		return this.super_toElement(
			<i className='material-icons'>{value}</i>
		);
	},
	align: 'center'
});

export const role = new Column({columnKey: 'role', compareFunc: true});

export const hourlyPay = new Column({
	columnKey: 'hourlyPay',
	toElement(cents) {
		let value;
		if (cents !== undefined) value = new Money(cents).toString();
		return this.super_toElement(value);
	},
	compareFunc(a = 0, b = 0) { return b - a; },
	align: 'right'
});

export default [name, icon, role, hourlyPay];