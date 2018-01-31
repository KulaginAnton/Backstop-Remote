module.exports = function(chromy, scenario) {
    var hoverSelector = scenario.hoverSelector;
    var clickSelector = scenario.clickSelector;
    var postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]

    if (clickSelector) {
		var selectors = clickSelector.split(",")
		selectors.forEach(element => {
            let _data=element.split('{:}')
            chromy
            .wait(_data[0])
            if (_data.length>1){
                chromy
                .insert(_data[0], _data[1])
            }else{
                chromy
                .click(_data[0])
            }
			if (postInteractionWait) {
                chromy.wait(parseInt(postInteractionWait));
            }
        });
    }


};