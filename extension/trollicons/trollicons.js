(function()
{
	jQuery.noConflict();
	var changing = false;
	var nodes = {};

	/* depending on where we are (fb or gmail) define a "replacement node" that we can just use later */
	if (/facebook/.test(window.location.href))
  {
		nodes['div.conversation'] = '.fbChatConvItem .messages span'; // chat messages in the inbox
		nodes['li.webMessengerMessageGroup'] = 'span'; // the docked chat window messages

		var imgNode = (function(key, img)
      {
		  	return "<span style=\"display:none\">" + key + "</span><img src=\"" + chrome.extension.getURL(img) + "\"/ style=\"background-position: 0px 0px\" alt=\":)\">";
		  });
	}
	else
  {
		console.debug('not facebook');
	}

  /****
   * now do the actual replacement of said node (defined above) 
   ****/

  // this is just going to match any lower case single word in square brackets (ie. [foo] not [hello world])
	var re = new RegExp("\[[a-z]+\]", "g");

  // go through the nodes we care about
	jQuery.each(nodes, function(chatNode, messageNode)
  {
	  console.debug("### chatNode = " + chatNode);
	  console.debug("### messageNode = " + messageNode);

    // When the DOM inserts a new node (message) under the chatNode node, do the icon filtering
		jQuery('body').delegate(chatNode, 'DOMNodeInserted', function(event)
    {
      // we don't want to respond to the "change" event casued by our own replacement code
			if (changing == false)
				changing = true;
			else
				return;

      // loop through all the messages in the chat window and replace the text with our icons
			var messages = jQuery(chatNode + " " + messageNode);

			jQuery.each(messages, function()
      {
				var oldText = jQuery(this).html();
				var newText = oldText;
				var matches = oldText.match(re);
				var message = this;

				if (matches)
        {
					jQuery.each(matches, function()
          {
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
