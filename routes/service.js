var express = require('express');
var backstop = require('backstopjs');
var router = express.Router();
var reportHelper = require('./utils/report-helper.js');

router.get('/', function (req, res, next) {
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
        .then(function (val) {
            reportHelper.updateResult(filterVal)
            answer = 'Done ok';
            res.json({ "answer": answer })
        })
        .catch(function (reason) {
            reportHelper.updateResult(filterVal);
            answer = 'Error ' + reason;
            res.json({ "answer": answer })
        })


});

module.exports = router;