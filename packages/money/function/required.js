/**
 * A function that can be used as the 'default value' of a parameter to quickly
 * throw TypeErrors for required parameters
 * @param {string} [message] - appends extra text to the error message.
 * @throws {TypeError} 
 * @alias module:lib/utils.required
 * @example
 * function foo(bar = required()) {
 *   //code that needs bar
 * }
 * 
 * foo() //TypeError: Missing required function parameter
 * @example
 * function hello(target = required('target')) {
 *   return 'Hello ' + target;
 * }
 * hello() //TypeError: Missing required function parameter target
 */
export default function required(message) {
	const append = message ? ` ${message}` : '';
	throw TypeError('Missing required function parameter' + append);
}