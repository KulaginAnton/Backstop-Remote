var fs = require('fs');
var Configuration = function() {};
//TODO add checking for type of str
var CONF_PATH = "backstop.json";
Configuration.prototype.getConfiguration = function(path) {
    var path = path || CONF_PATH;
    return fs.readFileSync(path, 'utf8');
}

module.exports = new Configuration();