var fs = require('fs');
var configHelper = require('./configuration-helper.js');


var IS_DEBUG = false,
    REPORT_PATH = "test-result.js",
    TEST_RESULT_PATH = "backstop_data/html_report/config.js";

var Report = function () { };
var log = function (msg) {
    IS_DEBUG && console.log(msg);
}
//TODO add checking for type of str

Report.prototype.makeJSON = function (str) {
    var report = str.replace(/^report\(/gm, '').replace(/\);$/gm, '');
    return JSON.parse(report);
}
//return str to JSONP
Report.prototype.makeJSONP = function (str) {
    var JSONP = 'report(' + str + ');';
    return JSONP;
}
//return latest test result in JSON format */
Report.prototype.getResultTest = function (path) {
    var path = path || REPORT_PATH;
    // return fs.readFileSync(path, 'utf8');
    return this.makeJSON(fs.readFileSync(path, 'utf8'));
}
var isReportExist = function () {
    return fs.existsSync(REPORT_PATH);
}
// save JSON as JSONP to report file
Report.prototype.saveReport = function (json) {
    return fs.writeFileSync(REPORT_PATH, this.makeJSONP(JSON.stringify(json, null, ' ')), 'utf8')
}

Report.prototype.getAllScenarious = function (scenArray) {
    return scenArray.map(function (test) {
        return test.label
    })
}
Report.prototype.getAllApplicableTest = function (rootTest) {
    var configuration = JSON.parse(configHelper.getConfiguration());
    var allScenarious = this.getAllScenarious(configuration.scenarios);
    log('rootTest->' + rootTest);
    log('rootTest.test->' + rootTest.test);
    return rootTest.tests.filter(function (value) {
        log('value = ' + value.pair.label)
        return allScenarious.indexOf(value.pair.label) > -1;
    })
}

Report.prototype.filterTestPairs = function (testPairs, filter) {
    return testPairs.filter(function (value) {
        log('filter 1 ->' + value.pair.label);
        log('filter 1 ->' + filter.label);
        log('filter 2 ->' + value.pair.reference);
        log('filter 2 ->' + filter.reference);
        return value.pair.label == filter.label && value.pair.reference == filter.reference;
    })
}
Report.prototype.updateCustomReport = function (tests, latestRes) {
    var _this = this;
    tests.forEach(function (currentValue, index, array) {
        let updatedTest = _this.filterTestPairs(latestRes.tests, {
            label: currentValue.pair.label,
            reference: currentValue.pair.reference
        })
        log(updatedTest);
        if (updatedTest.length) {
            array[index] = updatedTest[0];
        }
    })
    return tests;
}


Report.prototype.copyResult = function () {
    var latestRes = this.getResultTest(TEST_RESULT_PATH);
    log('copy-test = ' + latestRes);
    this.saveReport(this.getResultTest(TEST_RESULT_PATH));
}

Report.prototype.startUpdate = function () {
    if (isReportExist()) {
        var latestResult = this.getResultTest(TEST_RESULT_PATH),
            customReport = this.getResultTest();
        log('customReport-->' + customReport);
        var testList = this.getAllApplicableTest(customReport);
        log('applicable=' + testList)
        var updatedTestRes = this.updateCustomReport(testList, latestResult);
        customReport.tests = updatedTestRes;
        log('21----------|>' + updatedTestRes);
        this.saveReport(customReport);
    } else {
        this.saveReport(
            getResultTest()
        );
    }
}
Report.prototype.updateResult = function (filter) {
    log('filterVal = ' + filter)
    if (filter) {
        this.startUpdate();
    } else {
        this.copyResult()
    }
}

module.exports = new Report();