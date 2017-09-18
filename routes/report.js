var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    fs.readFile('../backstop_datahtml_report/config.js', (err, data) => {
        if (err) throw res.send(err);
        res.json(data);
        // console.log(data);
    });
});

module.exports = router;