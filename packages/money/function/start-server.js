/*eslint no-console: "off"*/

export default function startServer(server, name) {
	process.title = name;

	server.start().then(() => {
		console.log(`[+] ${name} server running at: ${server.info.uri}`);
	}).catch(err => {
		console.error(`[X] ${name} server issue: ${err}`)
	})
}