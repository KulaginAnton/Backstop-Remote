// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

var express = require('express');
var path = require('path');
var router = express.Router();
 
// serve angular front end files from root path
router.use('/', express.static('dist', { redirect: false }));
 
// rewrite virtual urls to angular app to enable refreshing of internal pages
router.get('*', function (req, res, next) {
    res.sendFile(path.resolve('dist/index.html'));
});
 
module.exports = router;