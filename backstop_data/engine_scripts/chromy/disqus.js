module.exports = function(chromy, scenario) {
    var postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]
	chromy.evaluate(() => {
		if (jQuery){
			jQuery('.disqus').css(
				{
				'height': '355px',
				'overflow': 'hidden'
				}
			)
		}

	//debugger;
            /* var css = 'div#placement-bottom { display: none; }',
					head = document.head || document.getElementsByTagName('head')[0],
					style = document.createElement('style');

				style.type = 'text/css';
				if (style.styleSheet){
				  style.styleSheet.cssText = css;
				} else {
				  style.appendChild(document.createTextNode(css));
				}

				head.appendChild(style);
				*/
			})
			if (postInteractionWait) {
                chromy.wait(parseInt(postInteractionWait));
            }

};