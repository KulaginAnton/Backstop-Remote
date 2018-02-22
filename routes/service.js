//import { setTimeout } from 'core-js/library/web/timers';

var express = require('express');
var backstop = require('backstopjs');
var router = express.Router();
var reportHelper = require('./utils/report-helper.js');
var processState = require('./utils/process-state.js');
var configHelper = require('./utils/configuration-helper.js');

router.get('/', function (req, res, next) { 
    if (processState.getState()) {
        return res.json({ "answer": 'Backstop already in use' })
    }
    let method = req.query.method || '',
        filterVal = req.query.filter || "",
        backstopDef;

    processState.setState(true);
    backstopDef = backstop(method, {
        filter: filterVal,
        config:configHelper.getFilteredConfig()
    });
    if (method == 'approve') {
        backstopDef = Promise.resolve('done');
    }
    backstopDef
        .then(function (val) {
            if (method !== 'approve') {
                reportHelper.updateResult(filterVal)
            }
            processState.setState(false)
        })
        .catch(function (reason) {
            if (method !== 'approve') {
                reportHelper.updateResult(filterVal)
            }
            processState.setState(false)
        })
    return res.json({ "answer": 'Tests are started' })

});

module.exports = router;