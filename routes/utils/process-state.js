var fs = require('fs');
var util = require('util');


var STATE_FLAG = false;

var State = function () { };

State.prototype.setState = function (state) {
    STATE_FLAG = !!state;
}

State.prototype.getState = function () {
    return STATE_FLAG;
}

State.prototype.toggleState = function () {
    STATE_FLAG = !STATE_FLAG;
}

module.exports = new State();