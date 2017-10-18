var express = require('express');
var router = express.Router();
// var cmd = require('node-cmd');
// var Promise = require('bluebird');

router.get('/', function(req, res, next) {
    return res.download('./backstop.json', 'backstop.json', function(err) {
        if (err) {
            // Handle error, but keep in mind the response may be partially-sent
            // so check res.headersSent
        } else {
            // decrement a download credit, etc.
        }
    });
});

module.exports = router;