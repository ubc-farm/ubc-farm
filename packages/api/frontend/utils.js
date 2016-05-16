/**
 * Resolves when the DOM is ready to interact with
 * @type {Promise<>}
 */
var domReady = new Promise(function(resolve) {
	function checkState() {
		if (document.readyState != 'loading') resolve();
	}
	document.addEventListener('readystatechange', checkState);
	checkState();
})