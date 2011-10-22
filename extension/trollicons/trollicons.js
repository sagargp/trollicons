(function() {
	jQuery.noConflict();
	var changing = false;

	/* depending on where we are (fb or gmail) define a "replacement node" that we can just use later */
	if (/facebook/.test(window.location.href)) {
		var nodes = {};
		nodes['div#fbDockChat'] = '.fbChatMessage'; // the docked chat window messages
		nodes['div#contentArea'] = '.storyContent'; // items in the feeds
		nodes['div#MessagingMessages'] = '.MessagingMessage'; // chat messages in the inbox

		var imgNode = (function(key, img) {
				return "<span style=\"display:none\">" + key + "</span><img src=\"" + chrome.extension.getURL(img) + "\"/ style=\"background-position: 0px 0px\" alt=\":)\">";
			});
	}
	/*
	* else if (/google/.test(window.location.href)) {
	*   console.debug('gmail plugin is experimental');
	* 	var chatNode = 'div.nH.Hd';
	* 	var messageNode = '.tReiP';
	* 	var imgNode = (function(key, img) {
	* 			return "<img src=\"" + chrome.extension.getURL(img) + "\" style=\"background-image: url(" + chrome.extension.getURL(img) + ");\"/ alt=\":)\">";
	* 		});
	* }
	*/
	else {
		console.debug('not facebook');
	}


  /* now do the actual replacement of said node (defined above) */

  // this is just going to match any simple strings wrapped in square brackets (ie. [balls] not [hello world])
	var re = new RegExp("\[[a-z]+\]", "g");

  // go through the nodes we care about
	jQuery.each(nodes, function(chatNode, messageNode) {
	  console.debug("### chatNode = " + chatNode);
	  console.debug("### messageNode = " + messageNode);

		jQuery('body').delegate(chatNode, 'DOMNodeInserted', function(event) {

      // we don't want to respond to the "change" event casued by our own replacement code
			if (changing == false)
				changing = true;
			else
				return;

      // loop through all the messages in the chat window and replace the text with our icons
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