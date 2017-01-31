/** @file Creates farm namespace and utility scripts */

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
	 * Namespace for functions that create page views
	 * @namespace
	 */
	page: {},
	
	/**
	 * Namespace for utlity functions
	 * @namespace
	 */
	utils: {
		/**
		 * Resolves when the DOM is ready to interact with
		 * @type {Promise<void>}
		 * @author Jake Archibald
		 * @see {@link https://github.com/jakearchibald/offline-wikipedia}
		 */
		domReady: new Promise(function(resolve) {
			function checkState() {
				if (document.readyState != 'loading') resolve();
			}
			document.addEventListener('readystatechange', checkState);
			checkState();
		}),
		
		/**
		 * Creates a promise that can be resolved from the outside.
		 * Used for async scripts and their onload attributes.
		 * @class
		 * @return {{promise: Promise<any>, resolve: function, reject: function}}
		 */
		Deferred: function() {
			this.promise = new Promise(function(resolve, reject) {
				this.reject = reject;
				this.resolve = resolve;
			})
		}
	}
}