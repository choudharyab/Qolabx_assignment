var express = require('express');
var router = express.Router();

var jobController = require('../controllers/job.controller');

router.post('/create_job',jobController.createjob);

router.get('/alljob',jobController.listjob);

router.get('/deletepost/:id',jobController.deletepost);



module.exports = router;