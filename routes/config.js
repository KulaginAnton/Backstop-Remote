var express = require('express');
var configHelper = require('./utils/configuration-helper.js');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
    var config,
        status = 200;
    try {
        config = configHelper.getConfiguration();
    } catch (e) {
        config = { 'error': e.message }
        status = 208
    } finally {
        return res
            .status(status)
            .json(JSON.parse(config));
    }
});



/* POST users listing. */
router.post('/', function (req, res, next) {
    let scenarios = req.body || [];
    var config,
        status = 200;
    try {
        if (scenarios.lenght == 0) {
            throw new Error('Empty scenarios for updating')
        }
        console.log(scenarios)
        configHelper.updateScenarios(scenarios);
        config = configHelper.getConfiguration();
        console.log('---------->2' + config)
    } catch (e) {
        config = { 'error': e.message }
        status = 208
    } finally {
        return res
            .status(status)
            .json(JSON.parse(config));
    }
});

module.exports = router;