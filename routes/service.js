var express = require('express');
var backstop = require('backstopjs');
var router = express.Router();


/* GET service listing. */
router.get('/', function(req, res, next) {
    let method = req.query.method || '',
        filterVal = req.query.filter || "",
        backstopDef,
        answer = '';
    debugger;
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
            answer = 'Done ok';
            res.json({ "answer": answer })
        })
        .catch(function(reason) {
            answer = 'Error ' + reason;
            res.json({ "answer": answer })
        })
});

module.exports = router;