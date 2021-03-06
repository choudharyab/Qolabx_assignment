var express = require('express');
var router = express.Router();

var companyController = require('../controllers/company.controller');

router.post('/addcompany',companyController.addcompany);

router.get('/companylist',companyController.uploadFile,companyController.companylist);

router.put('/updatecompany/:id',companyController.uploadFile,companyController.updateCompany);

router.delete('/delete/:id', companyController.deleteCompany);

module.exports = router;