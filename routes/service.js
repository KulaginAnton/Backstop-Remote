var express = require('express');
var backstop = require('backstopjs');
var router = express.Router();


/* GET service listing. */
router.get('/', function(req, res, next) {
    let method = req.query.method || '',
        backstopDef,
        answer = '';
    console.log('---------> ' + method);
<<<<<<< .merge_file_a10256
    // console.log(req);
    //return;
    if (method === 'reference') {
        backstopDef = backstop('reference')
    } else if (method === 'approve') {
        backstopDef == backstop('approve')
    } else if (method === 'test') {
        backstopDef = backstop('test')
    }
    console.log(backstopDef);
=======
    if (method === 'reference') {
        backstopDef = backstop('reference')
    } else if (method === 'approve') {
        backstopDef = Promise.resolve('Approve done');
    } else if (method === 'test') {
        backstopDef = backstop('test')
    }
>>>>>>> .merge_file_a06548
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