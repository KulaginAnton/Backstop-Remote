var express = require('express');
var backstop = require('backstopjs');
var router = express.Router();
var reportHelper = require('./utils/report-helper.js');
var cmd = require('node-cmd');
var Promise = require('bluebird');

router.get('/', function(req, res, next) {
    let method = req.query.method || '',
        filterVal = req.query.filter || "",
        backstopDef,
        answer = '';

    if (method === 'reference') {
        backstopDef = backstop('reference');
    } else if (method === 'approve') {
        var localFilter = filterVal ? 'backstop approve --filter=' + filterVal : 'backstop approve';
        // const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })
        // backstopDef = new Promise((resolve, reject) => {
        //     getAsync(localFilter)
        //         .then(data => {
        //             console.log('cmd then 1', data)
        //             resolve('Approve done');
        //             return data;
        //         }).catch(err => {
        //             reject('Approve fail');
        //             console.log('cmd err', err)
        //         })
        // });
        // backstopDef = new Promise(function(resolve, reject) {
        console.log('---------->' + filterVal);
        backstop('approve', { filter: filterVal })
        backstopDef = Promise.resolve('done');
        // setTimeout(function() { resole('done') }, 1000)
        // }.bind(this))



        console.log('--------->' + localFilter);
        //cmd.run(localFilter);

        // backstopDef = backstop('test', {
        //     filter: filterVal,
        // })
    } else if (method === 'test') {
        backstopDef = backstop('test', {
            filter: filterVal,
        })
    }
    backstopDef
        .then(function(val) {
            if (method !== 'approve') {
                reportHelper.updateResult(filterVal)
            }
            answer = 'Done ok';
            res.json({ "answer": answer })
        })
        .catch(function(reason) {
            if (method !== 'approve') {
                reportHelper.updateResult(filterVal)
            }
            answer = 'Error ' + reason;
            res.json({ "answer": answer })
        })


});

module.exports = router;