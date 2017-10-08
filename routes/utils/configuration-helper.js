var fs = require('fs');
var Configuration = function () { };
//TODO add checking for type of str
var CONF_PATH = "backstop.json";
Configuration.prototype.getConfiguration = function (path) {
    var path = path || CONF_PATH;
    if (!fs.existsSync(path)) {
        throw new Error(`Configuration file ${path} doesn\`t exist`);
    }
    return fs.readFileSync(path, 'utf8');
}

module.exports = new Configuration();