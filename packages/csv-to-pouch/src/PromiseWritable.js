import { Writable } from 'stream';

/**
 * Writable stream constructor that uses async functions for write rather
 * than callbacks. Create a stream as `new PromiseWritable(opts)`.
 */
export default class PromiseWritable extends Writable {
	constructor(options) {
		const write = (chunk, encoding, next) =>
			Promise.resolve(options.write(chunk, encoding)).then(() => next(), next);
		const writev = (chunks, next) =>
			Promise.resolve(options.writev(chunks)).then(() => next(), next);

		const superOpts = Object.assign({}, options);
		if (options.write) superOpts.write = write;
		if (options.writev) superOpts.writev = writev;

		super(superOpts);
	}
}
