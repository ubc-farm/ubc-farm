/**
 * Namespace for UBC Farm scripts
 * @namespace
 */
var farm = {
	/**
	 * Namespace for functions that create elements
	 * @namespace
	 */
	element: {},
	
	/**
	 * Namespace for utlity functions
	 * @namespace
	 */
	utils: {
		/**
		 * Resolves when the DOM is ready to interact with
		 * @type {Promise<void>}
		 */
		domReady: new Promise(function(resolve) {
			function checkState() {
				if (document.readyState != 'loading') resolve();
			}
			document.addEventListener('readystatechange', checkState);
			checkState();
		})
	}
}