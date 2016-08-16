import * as column from './columnlist.js';

export default fetch('/api/directory')
.then(response => response.json())
.then(json => {
	let map = new Map();

	for (const key in json) {
		let value = json[key];
		switch (value.role) {
			case 'Restaurant': value.icon = 'restaurant'; break;
			case 'Employee': value.icon = 'business'; break;
			case 'Customer': value.icon = 'person'; break;
			case 'Supplier': value.icon = 'business_center'; break;
		}

		let row = new WeakMap();
		for (const k in value) {
			if (k in column) row.set(column[k], value[k]);
		}

		map.set(key, row);
	}

	return map;
});