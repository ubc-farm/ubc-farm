function addRevExpBars(row, revenue, expense, max) {
	var revPercent = revenue/max, expPercent = expense/max;
	
	var revBar = document.createElement("div");
	revBar.className = 'finance-bar rev-bar';
	revBar.style.width = 'calc(' + revPercent + ' * 100%)';
	
	var expBar = document.createElement('div');
	expBar.className = 'finance-bar exp-bar';
	expBar.style.width = 'calc(' + expPercent + ' * 100%)';
	
	var frag = document.createDocumentFragment();
	frag.appendChild(revBar);
	frag.appendChild(expBar);
	return frag;
}

domReady.then(function() {
	rows = document.getElementsByClassName('finance-row');
})