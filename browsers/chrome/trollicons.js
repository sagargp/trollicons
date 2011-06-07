(function() {
	jQuery.noConflict();
	var changing = false;
	
	if (/facebook/.test(window.location.href)) {
		var nodes = {};
		nodes['div#fbDockChat'] = '.fbChatMessage';
		nodes['div#contentArea'] = '.storyContent'; 

		var imgNode = (function(key, img) {
				return "<span style=\"display:none\">" + key + "</span><img src=\"" + chrome.extension.getURL("img/" + img) + "\"/ style=\"background-position: 0px 0px\" alt=\":)\">";
			});
	} else if (/google/.test(window.location.href)) {
		var chatNode = 'div.nH.Hd';
		var messageNode = '.tReiP';
		var imgNode = (function(key, img) {
				return "<img src=\"" + chrome.extension.getURL("img/" + img) + "\" style=\"background-image: url(" + chrome.extension.getURL("img/" + img) + ");\"/ alt=\":)\">";
			});
	} else {
		console.debug('not facebook or gmail');
	}
	

	var re = new RegExp("\[[a-z]+\]", "g");

	jQuery.each(nodes, function(chatNode, messageNode) {
		jQuery('body').delegate(chatNode, 'DOMNodeInserted', function(event) {
			if (changing == false)
				changing = true;
			else
				return;

			var messages = jQuery(messageNode);
			jQuery.each(messages, function() {
				var oldText = jQuery(this).html();
				var newText = oldText;
				var matches = oldText.match(re);
				var message = this;
				if (matches) {
					jQuery.each(matches, function() {
						var key = this.substring(1, this.length-1);
						var img = rages[key];
						
						if (!img)
							return true; // this is the same as 'continue' in a $.each()

						newText = newText.replace("[" + key + "]", imgNode(key, img));
						console.debug('replaced -->' + this + '<-- with ' + newText);
					});
					jQuery(message).html(newText);
				}
			});
		
			changing = false;
		});
	});
})();


