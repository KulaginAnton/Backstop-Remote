var express = require('express');
var configHelper = require('./utils/configuration-helper.js');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    var config,
        status = 200;
    try {
        console.log('try')
        config = configHelper.getConfiguration();
    } catch (e) {
        console.log('vatch')
        config = { 'error': e.message }
        status = 208
    } finally {
        console.log('finally')
        return res
            .status(status)
            .json(JSON.parse(config));
    }
});

module.exports = router;