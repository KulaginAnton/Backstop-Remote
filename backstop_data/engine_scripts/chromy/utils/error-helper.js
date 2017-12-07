var fs = require('fs');
var util = require('util');
var ERROR_FILE_NAME = "error-list.json";
var ErrorHelper = function () { };
ErrorHelper.prototype.save = function (json) {
    return fs.writeFileSync(ERROR_FILE_NAME, JSON.stringify(json, null, 6))
}
ErrorHelper.prototype.isErrorExist = function (testName) {
    return this.get().findIndex(function (element) {
        return element.testName == testName;
    }) > -1
}
ErrorHelper.prototype.get = function (path) {
    var path = path || ERROR_FILE_NAME,
        response = "[]";
    if (fs.existsSync(path)) {
        response = JSON.parse(fs.readFileSync(path, 'utf8') || response);
    }
    console.log('response-->' + response);
    return response;
}
ErrorHelper.prototype.push = function (error) {
    var existingErrors = this.get();
    if (existingErrors.length == 0 || !this.isErrorExist(error.testName)) {
        existingErrors.push(error);
        this.save(existingErrors);
    }

}
ErrorHelper.prototype.clear = function () {
    this.save({});
}
ErrorHelper.prototype.delete = function (index) {
    this.save(this.get().splice(index, 1));
}
module.exports = new ErrorHelper();