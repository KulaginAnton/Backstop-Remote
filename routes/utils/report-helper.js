var fs = require('fs');
var util = require('util');
var configHelper = require('./configuration-helper.js');


var IS_DEBUG = false,
    REPORT_PATH = "test-result.js",
    TEST_RESULT_PATH = "backstop_data/html_report/config.js";

var Report = function() {};

var log = function(msg) {
    IS_DEBUG && console.log(util.inspect(msg, false, null));
}

//TODO add checking for type of str
Report.prototype.makeJSON = function(str) {
        var report = str.replace(/^report\(/gm, '').replace(/\);$/gm, '');
        return JSON.parse(report);
    }
    //return str to JSONP with 'report function'
Report.prototype.makeJSONP = function(str) {
        return /^report/.test(str) ? str : 'report(' + str + ');';
    }
    //return latest test result in JSON format */
Report.prototype.getResultTest = function(path) {
    var path = path || REPORT_PATH,
        response = 'report({});';
    if (fs.existsSync(path)) {
        response = fs.readFileSync(path, 'utf8')
    }
    return this.makeJSON(response);
}
var isReportExist = function() {
        return fs.existsSync(REPORT_PATH);
    }
    // save JSON as JSONP to report file
Report.prototype.saveReport = function(json) {
    return fs.writeFileSync(REPORT_PATH, this.makeJSONP(JSON.stringify(json, null, 6)), 'utf8')
}

Report.prototype.getAllScenarious = function(scenArray) {
    return scenArray.map(function(test) {
        return test.label
    })
}
Report.prototype.getAllApplicableTest = function(rootTest) {
    var configuration = JSON.parse(configHelper.getConfiguration());
    var allScenarious = this.getAllScenarious(configuration.scenarios);
    log('rootTest->' + rootTest);
    log('rootTest.test->' + rootTest.test);
    return rootTest.tests.filter(function(value) {
        log('value = ' + value.pair.label)
        return allScenarious.indexOf(value.pair.label) > -1;
    })
}

Report.prototype.filterTestPairs = function(testPairs, filter) {
    return testPairs.filter(function(value) {
        log('filter 1 ->' + value.pair.label);
        log('filter 1 ->' + filter.label);
        log('filter 2 ->' + value.pair.reference);
        log('filter 2 ->' + filter.reference);
        return value.pair.label == filter.label && value.pair.reference == filter.reference;
    })
}
Report.prototype.updateCustomReport = function(tests, latestRes) {
    var _this = this;
    var isUpdated = false;
    tests.forEach(function(currentValue, index, array) {
        let updatedTest = _this.filterTestPairs(latestRes.tests, {
            label: currentValue.pair.label,
            reference: currentValue.pair.reference
        })
        log(updatedTest);
        if (updatedTest.length) {
            array[index] = updatedTest[0];
            isUpdated = true;
        }
    })
    if (!isUpdated) {
        tests.push();
    }
    return tests;
}


Report.prototype.copyResult = function() {
    var latestRes = this.getResultTest(TEST_RESULT_PATH);
    log('copy-test = ' + latestRes);
    this.saveReport(this.getResultTest(TEST_RESULT_PATH));
}

Report.prototype.isTestRunnedBefore = function(testLabel) {
    var testLabel = testLabel,
        configuration = JSON.parse(configHelper.getConfiguration()),
        customReport = this.getResultTest(),
        configurationLabels = configuration.scenarios.map(function(el) {
            return el.label
        });
    log(customReport)
    return customReport.tests.some(function(element, index, array) {
        return element.pair.label.indexOf(testLabel) > -1
    })
}

Report.prototype.startUpdate = function(filter) {
    if (isReportExist()) {
        var latestResult = this.getResultTest(TEST_RESULT_PATH),
            customReport = this.getResultTest();
        if (!this.isTestRunnedBefore(filter)) {
            log('latestResult-->' + latestResult);
            customReport.tests = customReport.tests.concat(latestResult.tests);
        } else {
            log('customReport-->' + customReport);
            var testList = this.getAllApplicableTest(customReport);
            log('applicable=' + testList)
            var updatedTestRes = this.updateCustomReport(testList, latestResult);
            customReport.tests = updatedTestRes;
            log('----------|>' + updatedTestRes);

        }
        this.saveReport(customReport);

    } else {
        this.copyResult();
    }
}
Report.prototype.updateResult = function(filter) {
    log('filterVal = ' + filter)
    if (filter) {
        this.startUpdate(filter);
    } else {
        this.copyResult()
    }
}
Report.prototype.removeResultOfTest = function(scenarios) {
    var customReport = this.getResultTest();
    var listLabelsNewScenarios = scenarios.map(function(elem, index, array) {
        return elem.label
    })
    log(listLabelsNewScenarios);
    var newTest = customReport.tests.filter(function(elem, index, array) {
        return listLabelsNewScenarios.indexOf(elem.pair.label) > -1
    })
    log(newTest);

    customReport.tests = newTest;
    this.saveReport(customReport);

}

module.exports = new Report();