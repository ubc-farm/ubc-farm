const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

/**
 * A simple javascript utility for conditionally joining classNames together.
 * Slight ES6 adjustments from the fork.
 * @see https://github.com/JedWatson/classnames
 * @alias module:lib/utils.classlist
 */
export default function classList(...classes) {
	let list = [];
	for (let classname of classes) {
		if (!classname) continue; //skip falsy values
		
		const type = typeof classname;
		if (type === 'string' || type === 'number') 
			list.push(classname);
		else if (Array.isArray(classname)) 
			list.push( classList(...classname) );
		else if (type === 'object') {
			for (let key in classname) 
				if (has(classname, key) && classname[key]) list.push(key);
		}
	}
	return list.join(' ');
}