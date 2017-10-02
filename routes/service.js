var express = require('express');
var backstop = require('backstopjs');
var router = express.Router();


/* GET service listing. */
router.get('/', function(req, res, next) {
    let method = req.query.method || '',
        filterVal = req.query.filter || "",
        backstopDef,
        answer = '';
    console.log('---------> ' + method);
    if (method === 'reference') {
        backstopDef = backstop('reference');
    } else if (method === 'approve') {
        backstop('approve');
        backstopDef = Promise.resolve('Approve done');
    } else if (method === 'test') {
        backstopDef = backstop('test')
    }
    backstopDef
        .then(function(val) {
            console.log('1---------->' + val);
            answer = 'Done ok';
            res.json({ "answer": answer })
        })
        .catch(function(reason) {
            console.log('1---------->' + reason);
            answer = 'Error ' + reason;
            res.json({ "answer": answer })
        })
});

module.exports = router;