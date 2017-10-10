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
            });
    }

    if (clickSelector) {
        // function outerFunc() {
        //     return (function(sel) {
        //         return sel;
        //     })(clickSelector);
        // }
        // chromy
        //     .wait(clickSelector)
        //     .defineFunction(outerFunc)
        //     .evaluate(() => {
        //         console.log('---------->test1=' + outerFunc());
        //         return document.querySelector(clickSelector).click()
        //     })
        chromy
            .wait(clickSelector)
            .click(clickSelector);
    }
};