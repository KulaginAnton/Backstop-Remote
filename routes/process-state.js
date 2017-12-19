var express = require('express');
var errorHelper = require('../backstop_data/engine_scripts/chromy/utils/error-helper.js');
var router = express.Router();
var app = express();
var processState = require('./utils/process-state.js');

/* GET  data */
router.get('/', function (req, res, next) {
    return res.json({ 'state': processState.getState() });
});

/* POST */
router.post('/reset-state', function (req, res, next) {
    processState.setState(false);
});
module.exports = router;