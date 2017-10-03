var fs = require('fs');
var Report = function() {};
//TODO add checking for type of str
var REPORT_PATH = "test-result.js";
Report.prototype.makeJSON = function(str) {
    var report = str.replace(/^report\(/gm, '').replace(/\);$/gm, '');
    return JSON.parse(report);
}
Report.prototype.makeJSONP = function(str) {
        var JSONP = 'report(' + str + ');';
        return JSONP;
    }
    //return latest test result in JSONP format */
Report.prototype.getResultTest = function(path, callback) {
    var path = path || REPORT_PATH;
    return fs.readFileSync(path, 'utf8');
    //return this.makeJSON(str).scenarios;
}
Report.prototype.isReportExist = function() {
    return fs.existsSync(REPORT_PATH);
}
Report.prototype.saveReport = function(json) {
    return fs.writeFileSync(REPORT_PATH, json, 'utf8')
}

module.exports = new Report();