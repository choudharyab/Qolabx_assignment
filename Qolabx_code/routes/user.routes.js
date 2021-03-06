var express = require('express');
var router = express.Router();

var userController = require('../controllers/user.controller');

router.post('/apply_job',userController.applyjob);

router.post('/addusertype',userController.addusertype);

router.post('/adduserccount',userController.adduserccount,userController.uploadFile1);

router.get('/listUser',userController.listUser);

router.put('/edit/:id', userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);




module.exports = router;