var express = require('express');
var backstop = require('backstopjs');
var router = express.Router();
var reportHelper = require('./utils/report-helper.js');
var configHelper = require('./utils/configuration-helper.js');

var IS_DEBUG = false;
var log = function(msg) {
    IS_DEBUG && console.log(msg);
}

/* GET service listing. */


// var getLatestTest = function() {
//     fs.readdir('../backstop_data/var/', function(err, subfolder) {

//     })
// }

// var getWholeResult = function() {
//     return fs.readFileSync('../backstop_data/var/', function(err, subfolder) {

//     })
// }
// var getTestScenarious = function() {
//     return configHelper.getConfiguration('backstop_data/html_report/config.js', function(err, data) {
//         if (err) throw res.send(err);
//         return reportHelper.makeJSON(data).tests
//     });
// }
// var isTestApplicable = function() {

// }

var RESULT_TEST_PATH = 'backstop_data/html_report/config.js';
var TEST_RESULT_PATH = "backstop_data/html_report/config.js"


var getAllScenarious = function(scenArray) {
    return scenArray.map(function(test) {
        return test.label
    })
}
var getAllApplicableTest = function(rootTest) {
    var configuration = JSON.parse(configHelper.getConfiguration());
    var allScenarious = getAllScenarious(configuration.scenarios);

    log('rootTest->' + rootTest);
    log('--------------------------');
    log('rootTest.test->' + rootTest.test);
    return rootTest.tests.filter(function(value) {
        log('value = ' + value.pair.label)
        return allScenarious.indexOf(value.pair.label) > -1;
    })
}

var getLatestTest = function() {
    return reportHelper.makeJSON(reportHelper.getResultTest(RESULT_TEST_PATH));
}
var cusomTestReport = function() {
    log('1customReport = ' + reportHelper.getResultTest());
    log('2customReport = ' + reportHelper.makeJSON(
        reportHelper.getResultTest()
    ));
    return reportHelper.makeJSON(reportHelper.getResultTest());
}

var filterTestPairs = function(testPairs, filter) {
    return testPairs.filter(function(value) {
        log('filter 1 ->' + value.pair.label);
        log('filter 1 ->' + filter.label);
        log('filter 2 ->' + value.pair.reference);
        log('filter 2 ->' + filter.reference);
        return value.pair.label == filter.label && value.pair.reference == filter.reference;
    })
}

var updateCustomReport = function(tests, latestRes) {
    tests.forEach(function(currentValue, index, array) {
        let updatedTest = filterTestPairs(latestRes.tests, {
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


var copyResult = function() {
    var latestRes = reportHelper.makeJSON(
        reportHelper.getResultTest(RESULT_TEST_PATH)
    );
    log('copy-test = ' + reportHelper.getResultTest(RESULT_TEST_PATH));
    reportHelper.saveReport(reportHelper.getResultTest(RESULT_TEST_PATH));
}
var getTestResult = function(update) {
    var update = update || false;
    if (update) {
        copyResult();
    } else {
        startUpdate();
    }
}
var updateResult = function(filter) {
    log('filterVal = ' + filter)
    if (filter) {
        startUpdate();
    } else {
        copyResult()
    }
}

var startUpdate = function() {
    var latestRes = getLatestTest();
    if (reportHelper.isReportExist()) {
        var customReport = cusomTestReport();
        //filtered tests
        log('customReport-->' + customReport);
        var tests = getAllApplicableTest(customReport);
        log('applicable=' + tests)
        var updatedTestRes = updateCustomReport(tests, latestRes);
        customReport.tests = updatedTestRes;
        log('12----------|>' + tests);
        log('21----------|>' + updatedTestRes);
        reportHelper.saveReport(
            reportHelper.makeJSONP(JSON.stringify(customReport, null, ' '))
        );
    } else {
        reportHelper.saveReport(
            reportHelper.getResultTest()
        );
    }
}



router.get('/', function(req, res, next) {
    let method = req.query.method || '',
        filterVal = req.query.filter || "",
        backstopDef,
        answer = '';

    if (method === 'reference') {
        backstopDef = backstop('reference');
    } else if (method === 'approve') {
        backstop('approve', { filter: filterVal });
        backstopDef = Promise.resolve('Approve done');
    } else if (method === 'test') {
        backstopDef = backstop('test', {
            filter: filterVal,
            config: 'backstop.json'
        })
    }
    backstopDef
        .then(function(val) {
            // log('1---------->' + val);
            updateResult(filterVal)
            answer = 'Done ok';
            res.json({ "answer": answer })
        })
        .catch(function(reason) {
            //  log('2---------->' + reason);
            updateResult(filterVal);
            answer = 'Error ' + reason;
            res.json({ "answer": answer })
        })


});

module.exports = router;