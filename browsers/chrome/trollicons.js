(function() {
	$('#fbDockChat').live('DOMNodeInserted', function(event) {
		var n = $(event.target);
		console.log(n);
	});
})();