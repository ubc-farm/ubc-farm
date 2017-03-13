import PromiseWritable from './PromiseWritable';
import streamDone from './streamDone.js';

/**
 * Loads an entire stream's contents into a buffer in memory
 * @param {stream.Readable} stream
 * @returns {Promise<Buffer>}
 */
export default async function streamToBuffer(stream) {
	const chunks = [];

	const output = new PromiseWritable({
		decodeStrings: true,
		write(chunk) { chunks.push(chunk); },
	});

	await streamDone(stream.pipe(output));

	return Buffer.concat(chunks);
}
