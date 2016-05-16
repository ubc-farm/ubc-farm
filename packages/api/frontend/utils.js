var domReady = new Promise(function(resolve) {
	function checkState() {
		if (document.readyState != 'loading') resolve();
	}
	document.addEventListener('readystatechange', checkState);
	checkState();
})