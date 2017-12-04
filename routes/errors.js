var express = require('express');
var errorHelper = require('../backstop_data/engine_scripts/chromy/utils/error-helper.js');
var router = express.Router();


/* GET  data */
router.get('/', function(req, res, next) {
    var errors,
        status = 200;
    try {
        errors = errorHelper.get();
    } catch (e) {
        errors = { 'error': e.message }
        status = 208
    } finally {
        return res
            .status(status)
            .send(errors);
    }
});

/* POST */
router.post('/', function(req, res, next) {
    let errors = req.body || [];
    var config,
        status = 200;
    try {
        errorHelper.save(errors);
    } catch (e) {
        errors = { 'error': e.message }
        status = 208
    } finally {
        return res
            .status(status)
            .json(errors);
    }
});

module.exports = router;