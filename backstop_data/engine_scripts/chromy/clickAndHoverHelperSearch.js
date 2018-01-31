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
				console.log(parseInt(postInteractionWait));
                    chromy.wait(parseInt(postInteractionWait));
                }
            });
           
    }
	if (clickSelector) {
				console.log(parseInt(postInteractionWait));
        var selectors = clickSelector.split(",")
		selectors.forEach(element => {
            chromy
            .wait(element)
			.wait(1500)
            .click(element)
            if (postInteractionWait) {
			console.log(parseInt(postInteractionWait));
                chromy.wait(parseInt(postInteractionWait));
            }
        });

	}
  
};