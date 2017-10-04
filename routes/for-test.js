var express = require('express');
var reportHelper = require('./utils/report-helper.js');
var configHelper = require('./utils/configuration-helper.js');
var router = express.Router();



var RESULT_TEST_PATH = 'backstop_data/html_report/config.js';

var getAllScenarious = function(scenArray) {
    return scenArray.map(function(test) {
        return test.label
    })
}
var getAllApplicableTest = function(rootTest) {
    var configuration = JSON.parse(configHelper.getConfiguration());
    var allScenarious = getAllScenarious(configuration.scenarios);
    return rootTest.tests.filter(function(value) {
        console.log('value = ' + value.pair.label)
        return allScenarious.indexOf(value.pair.label) > -1;
    })
}

var getLatestTest = function() {
    return reportHelper.makeJSON(reportHelper.getResultTest(RESULT_TEST_PATH));
}
var cusomTestReport = function() {
    return reportHelper.makeJSON(reportHelper.getResultTest());
}

var filterTestPairs = function(testPairs, filter) {
    return testPairs.filter(function(value) {
        console.log('filter 1 ->' + value.pair.label);
        console.log('filter 1 ->' + filter.label);
        console.log('filter 2 ->' + value.pair.reference);
        console.log('filter 2 ->' + filter.reference);
        return value.pair.label == filter.label && value.pair.reference == filter.reference;
    })
}

var updateCustomReport = function(tests, latestRes) {
    tests.forEach(function(currentValue, index, array) {
        let updatedTest = filterTestPairs(latestRes.tests, {
            label: currentValue.pair.label,
            reference: currentValue.pair.reference
        })
        console.log(updatedTest);
        if (updatedTest.length) {
            array[index] = updatedTest[0];
        }
    })
    return tests;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    //Get JSON result of latest test
    var latestRes = getLatestTest();
    if (reportHelper.isReportExist()) {
        var customReport = cusomTestReport();
        //filtered tests
        var tests = getAllApplicableTest(customReport);
        var updatedTestRes = updateCustomReport(tests, latestRes);
        customReport.tests = updatedTestRes;
        console.log('12----------|>' + tests);
        console.log('21----------|>' + updatedTestRes);
        reportHelper.saveReport(
            reportHelper.makeJSONP(JSON.stringify(customReport, null, ' '))
        );
    } else {
        reportHelper.saveReport(
            reportHelper.getResultTest()
        );
    }
    return res.json(updatedTestRes);
});

module.exports = router;