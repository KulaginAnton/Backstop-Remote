module.exports = function(chromy, scenario) {
    var hoverSelector = scenario.hoverSelector;
    var clickSelector = scenario.clickSelector;
    var postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]
	function removeAllSelected(clickSelector){
		if (jQuery){
			let _$ = jQuery;
			_$(clickSelector).closest('select').find('option').attr('selected','');
			_$(clickSelector).attr('selected','selected');
			_$(clickSelector).change();
		}
	}
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
			.defineFunction(removeAllSelected)
			.evaluate((clickSelector) => {
                if (jQuery){
                    let _$ = jQuery,
                        _clickSelector = clickSelector.toString();
                    _$(_clickSelector).closest('select').find('option').attr('selected','');
                    _$(_clickSelector).attr('selected','selected');
                    _$(_clickSelector).change();
                }
			},[clickSelector])
			if (postInteractionWait) {
                chromy.wait(parseInt(postInteractionWait));
            }
        });
    }


};