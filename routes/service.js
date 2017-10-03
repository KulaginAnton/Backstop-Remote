var express = require('express');
var backstop = require('backstopjs');
var router = express.Router();
var reportHelper = require('./utils/report-helper.js');
var configHelper = require('./utils/configuration-helper.js');

/* GET service listing. */


// var getLatestTest = function() {
//     fs.readdir('../backstop_data/var/', function(err, subfolder) {

//     })
// }

var TEST_RESULT_PATH = "backstop_data/html_report/config.js"
var getWholeResult = function() {
    return fs.readFileSync('../backstop_data/var/', function(err, subfolder) {

    })
}
var getTestScenarious = function() {
    return configHelper.getConfiguration('backstop_data/html_report/config.js', function(err, data) {
        if (err) throw res.send(err);
        return reportHelper.makeJSON(data).tests
    });
}
var isTestApplicable = function() {

}
var getTestResult = function(update) {
    var update = update || false;
    if (update) {

    } else {
        return reportHelper.makeJSON(reportHelper.getResultTest(TEST_RESULT_PATH))
    }
}



router.get('/', function(req, res, next) {
    let method = req.query.method || '',
        filterVal = req.query.filter || "",
        backstopDef,
        answer = '';
    //console.log('---------> ' + method + '/' + filterVal);
    var tesetRes = getTestResult();
    reportHelper.saveReport(reportHelper.makeJSONP(JSON.stringify(tesetRes, null, ' ')));
    return res.json(tesetRes);

    if (method === 'reference') {
        backstopDef = backstop('reference');
    } else if (method === 'approve') {
        backstop('approve', { filter: filterVal });
        backstopDef = Promise.resolve('Approve done');
    } else if (method === 'test') {
        backstopDef = backstop('test', { filter: filterVal })
    }
    backstopDef
        .then(function(val) {
            console.log('1---------->' + val);
            answer = 'Done ok';
            res.json({ "answer": answer })
        })
        .catch(function(reason) {
            console.log('2---------->' + reason);
            answer = 'Error ' + reason;
            res.json({ "answer": answer })
        })
});

module.exports = router;