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
            })
			.wait(1000)
    }

    if (clickSelector) {
        var selectors = clickSelector.split(",")
		selectors.forEach(element => {
            chromy
            .wait(element)
            .click(element)
        });
    }

    if (postInteractionWait) {
        chromy.wait(postInteractionWait);
    }
};