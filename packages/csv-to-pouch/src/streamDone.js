/**
 * Returns a promise that resolves when a stream closes
 * @param {stream.Writable} stream
 * @returns {Promise}
 */
export default function streamDone(stream) {
	return new Promise((resolve, reject) =>
		stream.on('finish', resolve).on('error', reject)
	);
}
