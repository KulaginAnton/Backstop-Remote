var express = require('express');
var reportHelper = require('./utils/report-helper.js');
var configHelper = require('./utils/configuration-helper.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    return res.json(reportHelper.makeJSON(
        configHelper.getConfiguration('test-result.js')
    ))
});

module.exports = router;