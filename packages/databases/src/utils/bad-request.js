export default class BadRequestError extends Error {
	constructor(message = 'Invalid document') {
		super(message);

		this.error = true;
		this.status = 400;
		this.name = 'bad_request';
		this.message = message;
	}
}
