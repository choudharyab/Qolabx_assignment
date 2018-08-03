var userAccount = require('../models/userAccount');
var userType = require('../models/userType');
var SeekerProfile=require('../models/seekerProfile');
var SeekerSkill=require('../models/seekerSkill');
var ExperienceDetails=require('../models/experienceDetails');
var EducationDetails=require('../models/educationDetails');
var multer = require('multer');
var path = require('path');

/* create user type*/
module.exports.addusertype= function(req, res){
    userType.forge(req.body)
    .save()
    .then(function(user){
        res.json({
            type: true,
            data: user
        });
    })
    .catch(function(err){
        console.log(err.stack);
        res.status(400).json({error: err.message});
    });
};

/***create user account*****/
module.exports.adduserccount= function(req, res){
  
    userAccount.forge({ email: req.body.email})
    .fetch()
    .then(function(admin){
        if(admin){         
            res.json({
                type: false,
                error: 'It looks like you have already registered email id'
            });
        }else{
                
    new userAccount({
        user_type_id:data.user_type_id,
        email:data.email,
        password:data.password,
        date_of_birth:data.date_of_birth,
        gender:data.gender,
        is_active:"active",
        contact:data.contact,
        user_image:req.file.filename

   }) 
    .save()
    .then(function(user){
        res.json({
            type: true,
            data: user
        });
    })
    .catch(function(err){
        console.log(err.stack);
        res.status(400).json({error: err.message});
    });
}
}) 
};

module.exports.updateUser = function(req, res){
    userAccount.forge({id: req.params.id})
    .fetch()
    .then(function(user){
        if(user){
            user.save({
        user_type_id:data.user_type_id,
        email:data.email,
        password:data.password,
        date_of_birth:data.date_of_birth,
        gender:data.gender,
        is_active:"active",
        contact:data.contact,
        user_image:req.file.filename 
            })
            .then(function(updatedUser){
                  
                res.json({
                    type:true,
                    data:updatedUser
                });
            });
        }else{
            res.json({
                type: false,
                error: 'User having id ' + req.params.id +' does not exist'
            });
        }
    })    
    .catch(function(err){
        console.log(err.stack);
        res.status(400).json({error: err.message});
    });
};

module.exports.applyjob=function(req,res)
{
    var data=req.body;
    var skill=data.skills;
    if(data.user_type_name=='JobSeeker')
    {
     new SeekerProfile({
        user_account_id:data.user_id,
        first_name:data.first_name,
        last_name:data.last_name,
        experience:data.experience,
        current_salary:data.current_salary,
        expected_salary:data.expected_salary

     })
     .save()
     .then(function(seeker){
        for(var i=0;i<skill.length;i++){
            SeekerSkill.forge({
                seeker_profile_id: seeker.id,
                skill_set_id: skill[i]
            })
            .save()
            .then(function(skilled){
                new EducationDetails({
                    user_account_id:data.user_id,
                    certificate_degree_name	:data.certificate_degree_name,
                    Institute_university_name:data.Institute_university_name,
                    starting_date:data.starting_date,
                    completion_date:data.completion_date,
                    percentage:data.percentage
                })
                .save()
                .then(function(details){
                    new ExperienceDetails({
                        user_account_id:data.user_id,
                        is_current_job:data.is_current_job,
                        start_date:data.start_date,
                        end_date:data.end_date,
                        job_title:data.job_title,
                        job_location_city:data.job_location_city,
                        description:data.description,
                        company_name:data.company_name
                    })
                    .save()
                    .then(function(added){
                        res.json({
                            type:true,
                            data:"Job Applied Successfully"
                        })
                    })
                })
                
            })
        }
     })
     .catch(function(err){
         res.json({
             type:false,
             data:err
         })
     })
    }
}

var storage = multer.diskStorage({
    destination: './public/uploads/user_images',
  
     filename: function(req, file, callback){
        callback(null, 'user_images'+ Date.now() +path.extname(file.originalname));
       
     }
 });
 
 function checkFileType1(file, callback){
     var fileTypes = /jpeg|jpg|png/;
     var extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
     var mimeType = fileTypes.test(file.mimetype);
   
     if(mimeType && extName){
       return callback(null,true);
     }else{
       callback('Error: Images Only!');
     }
 }
 
 upload1= multer({
     storage: storage,
     limits: {fileSize: 2000000},
     fileFilter: function(req, file, callback){
         checkFileType1(file, callback);
        
     }
 }).any();
 

 
module.exports.uploadFile1= function(req, res, next)
{
    console.log('uploadfile called..!');
    upload1(req, res, (err) => {
        if(err){
        	console.log(err);
          res.status(400).json({message:'Not a valid image'});
        } 
        else {
        
         next();
        }
    });
};



module.exports.listUser=function(req,res)
{
    userAccount.forge()
               .fetchAll()
               .then(function(user){
                   res.json({
                       type:true,
                       data:user
                   })
               })
               .catch(function(err){
                   res.json({
                       type:false,
                       data:err
                   })
               })
};

module.exports.deleteUser = function(req, res){
    userAccount.forge({id: req.params.id})
    .fetch()
    .then(function(user){
        if(user){
            user.destroy();
            res.json(user);
        }else{
            res.json({
                type: false,
                error: 'User having id ' + req.params.id +' does not exist'
            });
        }
    })
    .catch(function(err){
        console.log(err.stack);
        res.status(400).json({error: err.message});
    });
};