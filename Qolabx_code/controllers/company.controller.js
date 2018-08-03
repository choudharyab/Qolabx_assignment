var Company=require('../models/company');
var multer = require('multer');
var path = require('path');


module.exports.addcompany=function(req,res)
{
    //console.log(req.body);
   new  Company({
    company_name:req.body.company_name,
    profile_description:req.body.profile_description,
    establishment_date:req.body.establishment_date,
    company_website_url:req.body.company_website_url,
    company_images:req.file.filename
   })
    .save()
    .then(function(company){
        res.json({
            type: true,
            data: company
        });
    })
    .catch(function(err){
        console.log(err.stack);
        res.status(400).json({error: err.message});
    });
}

var storage = multer.diskStorage({
    destination: './public/uploads/company_images',
    
     filename: function(req, file, callback){
        callback(null, 'company_images'+ Date.now() +path.extname(file.originalname));
        
     }
 });
 
 function checkFileType(file, callback){
     var fileTypes = /jpeg|jpg|png/;
     var extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
     var mimeType = fileTypes.test(file.mimetype);
   
     if(mimeType && extName){
       return callback(null,true);
     }else{
       callback('Error: Images Only!');
     }
 }
 
 upload= multer({
     storage: storage,
     limits: {fileSize: 2000000},
     fileFilter: function(req, file, callback){
         checkFileType(file, callback);
        //copy();
     }
 }).any();
 

 
module.exports.uploadFile = function(req, res, next)
{
    console.log('uploadfile called..!');
    upload(req, res, (err) => {
        if(err){
        	console.log(err);
          res.status(400).json({message:'Not a valid image'});
        } 
        else {
        
         next();
        }
    });
};


module.exports.companylist=function(req,res)
{
    Company.forge()
           .fetchAll()
           .then(function(company){
               res.json({
                   type:true,
                   data:company
               })
           })
           .catch(function(err){
               res.json({
                   type:false,
                   data:err
               })
           })
};

module.exports.updateCompany = function(req, res){
   var img1='';
    if(req.files!==null && req.files!==undefined)
    {
         //img1=req.file.filename
         img1=req.file.filename
    }else{
        img1=req.body.img
    }
    Company.forge({id: req.params.id})
    .fetch()
    .then(function(company){
        if(company){
            company.save({
              company_name:req.body.company_name,
              profile_description:req.body.profile_description,
              establishment_date:req.body.establishment_date,
              company_website_url:req.body.company_website_url,
              company_images:img1
            })
            .then(function(company){
                res.json({
                    type: true,
                    data: company
                });
            });
        }else{
            res.status(404).json({
                type: false,
                error: 'company having id ' + req.params.id +' does not exist'
            });
        }
    })    
    .catch(function(err){
        console.log(err.stack);
        res.status(400).json({error: err.message});
    });
};

module.exports.deleteCompany = function(req, res){
    Company.forge({id: req.params.id})
    .fetch()
    .then(function(company){
        if(company){
            company.destroy();
            res.json(company);
        }else{
            res.json({
                type: false,
                error: 'company having id ' + req.params.id +' does not exist'
            });
        }
    })
    .catch(function(err){
        console.log(err.stack);
        res.status(400).json({error: err.message});
    });
};