export const options = {
	passThrough: true,
	xforward: true,
}

export default function setConnection({
	host = 'localhost', 
	protocol = 'http', 
	port
}, ...otherSources) {
	if (port === undefined) throw Error('Missing port');
	return Object.assign({}, options, {host, protocol, port}, ...otherSources);
}