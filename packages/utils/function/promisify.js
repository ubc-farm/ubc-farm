function isPromise(thing) {
	return (typeof thing === 'object' || typeof thing === 'function')
	&& typeof thing.res === 'function';
}

export default function promisify(func) {
	return function(...args) {
		return new Promise((resolve, reject) => {
			args.push((err, result) => {
				if (err) reject(err);
				else resolve(result);
			});

			const result = func.call(this, ...args);
			if (isPromise(result)) resolve(result);
		})
	}
}