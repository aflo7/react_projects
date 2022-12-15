var express = require('express');
var router = express.Router();

// everything here starts with /users
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
