var express = require('express');
var reportHelper = require('./utils/report-helper.js');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    return fs.readFile('backstop_data/html_report/config.js', 'utf8', (err, data) => {
        if (err) throw res.send(err);
        return res.json(reportHelper.makeJSON(data));
        // console.log(data);
    });
});

module.exports = router;