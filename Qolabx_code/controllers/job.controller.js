var JobPost = require('../models/jobPost');
var JobPostActivity=require('../models/jobPostActivity');
var JobPostSkill=require('../models/jobPostSkill');
var JobLocation=require('../models/jobLocation');
var JobType=require('../models/jobType');
var UserAccount=require('../models/userAccount');
var UserType=require('../models/userType');

module.exports.createjob=function(req,res)
{
    var data=req.body;
    if(data.user_type_name=='Admin' || data.user_type_name=='Employee')
    {
      
      new JobPost({
          user_id:data.user_id,
          job_type_id:data.job_type_id,
          company_id:data.company_id,
          created_date:data.created_date,
          job_description:data.job_description,
          is_Active:'inactive'
      })
      .save()
      .then(function(jobpost){
          if(jobpost)
          {
              new JobPostActivity({
                user_account_id:data.user_id,
                job_post_id:jobpost.id,
                apply_date:data.apply_date,
              })
              .save()
              .then(function(activity){
                  if(activity)
                  {
                      new JobPostSkill({
                        skill_set_id:data.skill_set_id,
                        job_post_id:jobpost.id,
                        skill_level:data.skill_level
                      })
                      .save()
                      .then(function(skill){
                          new JobLocation({
                            job_post_id:jobpost.id,
                            street_address:data.street_address,
                            city:data.city,
                            state:data.state,
                            country:data.country,
                            zip:data.zip
                          })
                          .save()
                          .then(function(added){
                              res.json({
                                  type:true,
                                  msg:"Job Created Successfully"
                              })
                          })
                      })
                  }
              })
          }
      })
      .catch(function(err){
          res.json({
              type:false,
              msg:err
          })
      })
    }
};



module.exports.listjob=function(req,res)
{
    JobPost.forge()
           .fetchAll({
               withRelated:['user','job_type','company']
           })
           .then(function(alljob){
               res.json({
                   type:true,
                   data:alljob
               })
           })
           .catch(function(err){
                res.json({
                    type:false,
                    data:err
                })
           })
}