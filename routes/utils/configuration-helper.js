var fs = require('fs');
var Configuration = function () { };
//TODO add checking for type of str
var CONF_PATH = "backstop.json";

var _typeof = function (elem) {
    return Object.prototype.toString.call(elem)
}

var makeSelectorsArray = function (selectors) {
    var res = selectors;
    console.log(_typeof(selectors))
    if (_typeof(selectors) !== "[object Array]") {
        console.log(selectors)
        res = selectors.split(',');
    }
    return res;
}

var updateScenariosType = function (scenarios) {
    scenarios.forEach(function (element, index, array) {
        array[index] = makeSelectorsArray(array[index].selectors)
    }, this);
    return scenarios;
}

Configuration.prototype.getConfiguration = function (path) {
    var path = path || CONF_PATH;
    if (!fs.existsSync(path)) {
        throw new Error(`Configuration file ${path} doesn\`t exist`);
    }
    return fs.readFileSync(path, 'utf8');
}
Configuration.prototype.saveConfiguration = function (configuration, PATH_TO_FILE) {
    var REPORT_PATH = PATH_TO_FILE || CONF_PATH;
    return fs.writeFileSync(REPORT_PATH, JSON.stringify(configuration, null, ' '))
}
Configuration.prototype.updateScenarios = function (scenarios) {
    var path = path || CONF_PATH;
    var newConfig = JSON.parse(this.getConfiguration());

    console.log(console.log('------>1' + newConfig));
    newConfig.scenarios = updateScenariosType(scenarios);
    console.log("---------->2" + newConfig.scenarios)
    this.saveConfiguration(newConfig);
}

module.exports = new Configuration();