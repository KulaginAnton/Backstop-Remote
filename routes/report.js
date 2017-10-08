var express = require('express');
var reportHelper = require('./utils/report-helper.js');
var configHelper = require('./utils/configuration-helper.js');
var router = express.Router();


var CONF_PATH = 'test-result.js';
/* GET users listing. */
router.get('/', function (req, res, next) {
    var config,
        status = 200;
    try {
        config = reportHelper.makeJSON(configHelper.getConfiguration(CONF_PATH));
    } catch (e) {
        config = { 'error': e.message }
        status = 208
    } finally {
        return res
            .status(status)
            .json(config)
    }
});

module.exports = router;