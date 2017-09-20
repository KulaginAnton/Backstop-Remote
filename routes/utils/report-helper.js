var Report = function() {};
//TODO add checking for type of str
Report.prototype.makeJSON = function(str) {
    var report = str.replace(/^report\(/gm, '').replace(/\);$/gm, '');
    return JSON.parse(report);
}
Report.prototype.makeJSONP = function(str) {
    var JSONP = 'report(' + str + ');';
    return JSONP
}
module.exports = new Report();