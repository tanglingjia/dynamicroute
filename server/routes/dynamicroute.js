var express = require('express');
var routeData = require('../views/routedata');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(routeData);
});

module.exports = router;
