module.exports = function(chromy, scenario) {
    var hoverSelector = scenario.hoverSelector;
    var clickSelector = scenario.clickSelector;
    var postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]
    if (hoverSelector) {
        chromy
            .wait(hoverSelector)
            .rect(hoverSelector)
            .result(function(rect) {
                chromy.mouseMoved(rect.left, rect.top);
				 if (postInteractionWait) {
                    chromy.wait(parseInt(postInteractionWait));
                }
            })
    }

    if (clickSelector) {
		var selectors = clickSelector.split(",")
		selectors.forEach(element => {
            chromy
            .wait(element)
			.evaluate((clickSelector) => {
                if (jQuery){
                    let _$ = jQuery,
                        _clickSelector = clickSelector.toString();
                    _$(_clickSelector).trigger('mousedown')
                }
			},[clickSelector])
			if (postInteractionWait) {
                chromy.wait(parseInt(postInteractionWait));
            }
        });
    }


};