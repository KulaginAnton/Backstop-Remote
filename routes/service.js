var express = require('express');
var backstop = require('backstopjs');
var router = express.Router();
var reportHelper = require('./utils/report-helper.js');

router.get('/', function(req, res, next) {
    let method = req.query.method || '',
        filterVal = req.query.filter || "",
        backstopDef;

    backstopDef = backstop(method, {
        filter: filterVal,
    });
    if (method == 'approve') {
        backstopDef = Promise.resolve('done');
    }

    backstopDef
        .then(function(val) {
            if (method !== 'approve') {
                reportHelper.updateResult(filterVal)
            }
            res.json({ "answer": 'Done ok' })
        })
        .catch(function(reason) {
            if (method !== 'approve') {
                reportHelper.updateResult(filterVal)
            }
            res.json({ "answer": 'Error ' + reason })
        })


});

module.exports = router;