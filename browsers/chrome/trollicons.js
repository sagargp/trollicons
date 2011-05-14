(function() {
	jQuery.noConflict();
	var changing = false;
	jQuery('body').delegate('div#fbDockChat', 'DOMNodeInserted', function(event) {
		if (changing == false)
			changing = true;
		else
			return;

		var re = new RegExp("\[[a-z]+\]", "g");
		var messages = jQuery(".fbChatMessage");
		jQuery.each(messages, function() {
			var oldText = jQuery(this).text();
			var newText = oldText;
			var matches = oldText.match(re);
			var message = this;
			if (matches) {
				jQuery.each(matches, function() {
					var key = this.substring(1, this.length-1);
					var img = rages[key];
					
					newText = newText.replace("[" + key + "]", "<span style=\"display:none\">" + key + "</span><img src=\"" + chrome.extension.getURL("img/" + img) + "\"/ style=\"background-position: 0px 0px\" alt=\":)\">");
					console.debug(key + " --> " + img);
				});
				console.debug("new: " + newText);
				jQuery(message).html(newText);
			}
		});
		
		changing = false;
	});
})();


