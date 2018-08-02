var express = require('express');
var router = express.Router();

var userController = require('../controllers/user.controller');

router.post('/apply_job',userController.applyjob);





module.exports = router;